import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react';
import { getCsrfToken, useSession, getSession, signIn, signOut } from 'next-auth/client';
import {
    Button, Form, Input,
    Pagination, Select, message, Modal, Drawer, Upload,
    Skeleton, Checkbox, Tabs, DatePicker,
    Row, Col, Descriptions, Radio
} from "antd";
import { UploadOutlined, LoadingOutlined, ExclamationCircleOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { api } from "./../../libraries/api";
import moment, { lang } from 'moment';
import { Workbook } from 'exceljs'
import Link from 'next/link';
const { confirm } = Modal;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Search } = Input;

const Page = ({ session, formInputs }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("en");
    const [products, setProducts] = useState(formInputs.products);
    const [categories, setcategories] = useState(formInputs.categories);
    const [productImages, setProductImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [defaultTab, setDefaultTab] = useState("all");
    const [perPage, setperPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("_id");

    const [visible, setVisible] = useState(false);
    const [modalFormLoading, setModalFormLoading] = useState(false);
    const [mode, setMode] = useState('new');

    useEffect(() => {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + session.user.email.jwtToken;
        onSearch();
        loadCounterWidgetData();
    }, []);

    const onSearch = async (tab = "all", page = 1, sort = "date-new", category = false, promotion = false, published = false) => {
        let params = "";
        if (category) {
            params += "&category=" + category;
        }
        if (promotion) {
            params += "&promotion=" + promotion;
        }
        if (published) {
            params += "&published=" + published;
        }
        if (selectedDuration == "all") {
            params += "&range=all";
            params += "&start=" + moment("01/01/1970").format();
            params += "&end=" + moment().format();

        } else {
            params += "&range=" + selectedDuration;
            params += "&start=" + selectedDate[0].format();
            params += "&end=" + selectedDate[1].format();
        }
        setData([]);
        setLoading(true);
        api.get("rfq?query=" + searchQuery + params + "&sort=" + sort + "&tab=" + tab + "&per_page=" + perPage + "&page=" + page).then(({ data: result }) => {
            if (result.data.rfqs) {

                let rfqs = [];

                result.data.rfqs.forEach((rfq, idx) => {

                    rfqs.push({
                        key: rfq?._id,
                        name: rfq?.buyer?.firstName.en + " " + rfq?.buyer?.lastName.en,
                        no: rfq?.no,
                        date: moment(rfq?.createdAt).format("DD-MM-YYYY"),
                        status: rfq?.status
                    });
                });
                setData(rfqs);
                console.log("result.data.pagination.total", result.data.pagination.total)
                setTotalItems(result.data.pagination.total)
            } else {

            }
            setLoading(false);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const onSort = (sort) => {
        setSort(sort);
        onSearch(defaultTab, currentPage, sort);
    }


    const togglePicker = () => {
        setPickerOpen(!pickerOpen);
    };

    const disabledProduct = (id, status) => {

        confirm({
            title: 'Are you sure you want to ' + (status ? 'disable ' : 'enable ') + 'Product?',
            icon: <ExclamationCircleOutlined />,
            content: 'This will unlist product from store',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                return new Promise((resolve, reject) => {
                    changeSupplierStatus(id, status);
                    setTimeout(resolve, 1000);
                }).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const changeSupplierStatus = (id, status) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("status", !status);
        setLoading(true);
        api.post('products/publish', formData)
            .then(({ data: result }) => {
                setLoading(false);
                if (result.data) {
                    onSearch()
                    message.success("Product status changed!");

                } else {

                }
            })
            .catch(function (error) {
                setLoading(false);
                console.error(error.response);
                if (error.response.data !== undefined) {
                    message.error(error.response.data.error[0].msg);
                }
            });
    };


    const submitSearch = () => {
        onSearch()
    }

    const onSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const changeTab = async (key) => {
        await setperPage(10);
        await setCurrentPage(1)
        await setDefaultTab(key);
        onSearch(key);
    }

    const onPageChange = async page => {
        console.log(page);
        await setCurrentPage(page)
        onSearch(defaultTab, page);
    };

    const [productFilterVisible, setproductFilterVisible] = useState(false);
    const [productFilterFormLoading, setproductFilterFormLoading] = useState(false);
    const [productFilterFormTab, setproductFilterFormTab] = useState("category");
    const [productFilterForm] = Form.useForm();

    const changeProductFilterTab = async (key) => {
        await setproductFilterFormTab(key);
    }

    const loadProductFilterForm = async (filter) => {
        setproductFilterFormTab(filter)
        setproductFilterVisible(true)
    };

    const handleFilterFormCancel = async () => {
        onSearch(defaultTab, currentPage);
        setproductFilterVisible(false)
    };

    const handleProductFilterFormOk = async () => {
        productFilterForm
            .validateFields()
            .then((values) => {
                console.log(values);
                onSearch(defaultTab, currentPage, sort, values.category, values.hasPromotion, values.published);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });

        setproductFilterVisible(false)
    };

    const [passwordForm] = Form.useForm();
    const [importVisible, setImportVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [productTypes, setProductTypes] = useState(formInputs.productTypes);
    const [subCategories, setSubCategories] = useState(formInputs.subCategories);


    const [uploadFiles, setUploadFiles] = useState(undefined);
    const [selectedProductType, setSelectedProductType] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState(undefined);
    const [selectedSubCategory, setSelectedSubCategory] = useState(undefined);
    const [fileUploading, setFileUploading] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [totalRowsInExcel, setTotalRowsInExcel] = useState(0);
    const [passwordFormLoading, setPasswordFormLoading] = useState(false);


    const durationOptions = {
        7: t('last7Days'),
        14: t('last14Days'),
        28: t('last28Days'),
        90: t('last90Days'),
        month: t('thisMonth'),
        quarter: t('thisQuarter'),
        all: t('allTime'),
        custom: t('custom'),
    }
    const [pickerOpen, setPickerOpen] = useState(false);
    const [selectedDate, setselectedDate] = useState(null);
    const [selectedDuration, setselectedDuration] = useState('all');
    const [countersLoading, setCountersLoading] = useState(false);
    const [counterWidgetData, setCounterWidgetDate] = useState({
        total: { count: 0, value: 0, percentage: 0 },
        approved: { count: 0, value: 0, percentage: 0 },
        pending: { count: 0, value: 0, percentage: 0 },
        cancelled: { count: 0, value: 0, percentage: 0 },
        rejected: { count: 0, value: 0, percentage: 0 }
    });

    const handleDateChange = (datw) => {
        setselectedDuration("custom")
        setselectedDate(datw);
    };

    const dateRangeChange = (e) => {

        let value = e.target.value;
        setselectedDuration(e.target.value);
        let today = moment();
        let date = moment();

        if (value == "7") {
            date.subtract(7, 'day');
            setselectedDate([date, today])
        }

        if (value == "14") {
            date.subtract(14, 'day');
            setselectedDate([date, today])
        }

        if (value == "28") {
            date.subtract(28, 'day');
            setselectedDate([date, today])
        }

        if (value == "90") {
            date.subtract(90, 'day');
            setselectedDate([date, today])
        }

        if (value == "month") {
            date = moment().startOf('month');
            setselectedDate([date, today])
        }

        if (value == "quarter") {
            date = moment().startOf('quarter');
            setselectedDate([date, today])
        }

        if (value == "custom") {
            setselectedDate(null)
        }

        if (value == "all") {
            date = moment('01/01/1970')
            setselectedDate(null)
        }
    }

    const hideRangePicker = (e) => {
        setPickerOpen(false);
    }

    const submitPickerForm = () => {

        if (selectedDuration == "custom") {
            if (selectedDate == null) {
                message.error("Please choose date range");
                return;
            }
        }

        loadCounterWidgetData();
        onSearch();
    }

    const loadCounterWidgetData = () => {
        setCountersLoading(true);
        let form = {};
        if (selectedDuration == "all") {
            form = {
                range: 'all',
                start: moment("01/01/1970").format(),
                end: moment().format()
            }
        } else {
            form = {
                range: selectedDuration,
                start: selectedDate[0].format(),
                end: selectedDate[1].format()
            }
        }
        api.post("rfq/reports/counters", form).then(({ data: result }) => {
            setCountersLoading(false);
            let data = {};
            if (Object.keys(result.data).length) {
                data.total = result.data.total;
                data.approved = result.data.approved;
                data.pending = result.data.pending;
                data.cancelled = result.data.cancelled;
                data.rejected = result.data.rejected;
            } else {
                data.total = { count: 0, value: 0, percentage: 25 };
                data.approved = { count: 0, value: 0, percentage: 25 };
                data.pending = { count: 0, value: 0, percentage: 25 };
                data.cancelled = { count: 0, value: 0, percentage: 25 };
                data.rejected = { count: 0, value: 0, percentage: 25 };
            }
            setCounterWidgetDate(data)
            setPickerOpen(false)
        }).catch(function (error) {
            console.error(error);
            message.error("Unable to fetch report");
            setCountersLoading(false);
            setPickerOpen(false)
        });
    }

    const exportToExcel = async () => {

        const data = []
        let workbook = new Workbook();

        let worksheet = workbook.addWorksheet('data');

        worksheet.columns = [
            { header: 'Product Name ', key: 'name' },
            { header: 'Product Description ', key: 'description' },
            { header: 'Product Specification ', key: 'specification' },
            { header: 'Type', key: 'type' },
            { header: 'Category', key: 'category' },
            { header: 'Product Tags', key: 'ProductTags' },
            { header: 'SKU', key: 'sku' },
            { header: 'MRP', key: 'mrp' },
            { header: 'Price', key: 'price' },
            { header: 'Price Exclusive Of Tax', key: 'taxExclusive' },
            { header: 'Tax %', key: 'tax' },
            { header: 'Stock Inventory', key: 'stock' },
            { header: 'Packaging/Box', key: 'packing' },
            { header: 'UOM', key: 'uom' },
            { header: 'No Of Packs Per Carton', key: 'nop' },
            { header: 'Delivery In Days', key: 'deliveryIn' },
            { header: 'Transportation Mode', key: 'transportationMode' },
            { header: 'Shelf Life', key: 'shellLife' },
            { header: 'Average Lead TIme', key: 'avgLeadTime' },
            { header: 'MOQ', key: 'moq' },
            { header: 'Sample Available', key: 'sampleAvailable' },
            { header: 'Sample Quantity', key: 'sampleQuantity' },
            { header: 'Sample Value', key: 'sampleValue' },
            { header: 'Sample Price', key: 'samplePrice' },
            { header: 'Sample Delivery in Days', key: 'sampleDeliveryIn' },
            { header: 'SEO slug', key: 'seoSlug' },
            { header: 'Search engine title', key: 'seoEngineTitle' },
            { header: 'Search Engine Description', key: 'seoDescription' },
        ]


        // Create a freeze pane, which means we'll always see the header as we scroll around.
        worksheet.views = [
            { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B2' }
        ]
        const rows = [];

        products.forEach(element => {
            element.name = element?.name;
            element.description = element?.description;
            element.specification = element?.specification;
            element.type = element?.type?.name;
            element.category = element?.category?.name;
            rows.push({ ...element })
        });

        worksheet.addRows(rows);


        // Keep in mind that reading and writing is promise based.
        // workbook.xlsx.writeFile('Debtors.xlsx')
        const buf = await workbook.xlsx.writeBuffer();

        const bb = new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const a = document.createElement('a');
        a.style.display = 'none';
        document.body.appendChild(a);

        const url = window.URL.createObjectURL(bb);

        a.href = url;
        a.download = 'products.xlsx';

        a.click();

        window.URL.revokeObjectURL(url);

        if (a && a.parentElement) {
            a.parentElement.removeChild(a);
        }
    }

    const camelSentence = function camelSentence(str) {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        });
    }

    const handleViewOnClick = (id) => {
        router.push("/rfqs/" + id);
    }

    return (

        <React.Fragment>
            <Head>
                <title>Supplier - Products</title>
            </Head>

            <section className="rfq add-list-common">
                <div className="mob-title d-lg-none">RFQ’s</div>
                <div className="calendar-field">
                    <a className="custom-picker" onClick={() => { setPickerOpen(true) }} >{durationOptions[selectedDuration]}</a>
                    <div className="dropdown-range-picker-wrapper">
                        <RangePicker

                            className="dropdown-range-picker"
                            open={pickerOpen}
                            format="DD/MM/YYYY"
                            value={selectedDate}
                            onChange={handleDateChange}
                            dropdownClassName="calendar-wrapper"
                            panelRender={(panelNode) => {
                                return (
                                    <div className="custom-range-picker">
                                        <div className="picker-selection">
                                            <Radio.Group value={selectedDuration} onChange={dateRangeChange}>
                                                <Radio value="7">Last 7 Days</Radio>
                                                <br></br>
                                                <Radio value="14">Last 14 Days</Radio>
                                                <br></br>
                                                <Radio value="28">Last 28 Days</Radio>
                                                <br></br>
                                                <Radio value="90">Last 90 Days</Radio>
                                                <br></br>
                                                <Radio value="month">This Month</Radio>
                                                <br></br>
                                                <Radio value="quarter">This Quarter</Radio>
                                                <br></br>
                                                <Radio value="all">All Time</Radio>
                                                <br></br>
                                                <Radio value="custom">Custom</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div className="calendar">
                                            <div className="top">
                                                <div className="picker-body">{panelNode}</div>
                                            </div>
                                            <div className="bottom">
                                                <Button loading={countersLoading} onClick={submitPickerForm} className="form-save" >Update</Button>
                                                <Button onClick={hideRangePicker} className="form-cancel" >Cancel</Button>
                                            </div>
                                        </div>

                                    </div>

                                );
                            }}
                        />
                    </div>
                </div>


                <div className="button-wrapper">

                </div>
            </section>
            <section className="rfq-updates">
                <div className="grid-wrapper">
                    <div className="row">
                        <div className="col-md-4 col col-12">
                            <div className="rfq-value">
                                <div className="icon-wrapper">
                                    <span className="icon"></span>
                                </div>
                                <div className="content-wrapper">
                                    <div className="title">RFQ's</div>
                                    <div className="number">{counterWidgetData.total.count}</div>
                                    <div className="wrapper">
                                        <div className="description">
                                            RFQ's Received till the date.
                                        </div>
                                        <div className="value-wrapper">
                                            <span className="label">Value of the RFQ's:</span>
                                            <span className="value">AED {counterWidgetData.total.value || 0}</span>
                                        </div>
                                    </div>
                                    <div class="button-wrapper">
                                        <a class="know-more">Know more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col col-12">
                            <div className="rfq-status">
                                <div className="title">RFQ's Status</div>
                                <div className="rfq-progress-bar">
                                    <div className="progress-wrapper">
                                        <div className="inner-wrapper approved" style={{ width: '40%' }}>
                                            <span className="rfq-progress"></span>
                                            <div className="progress-title">Approved</div>
                                            <div className="tool-tip">
                                                <div className="count">{counterWidgetData.approved.count}</div>
                                                <div className="tool-tip-title">RFQ's Approved</div>
                                            </div>

                                        </div>
                                        <div className="inner-wrapper pending" style={{ width: '30%' }}>
                                            <span className="rfq-progress"></span>
                                            <div className="progress-title">Pending</div>
                                            <div className="tool-tip">
                                                <div className="count">{counterWidgetData.pending.count}</div>
                                                <div className="tool-tip-title">RFQ's Pending</div>
                                            </div>
                                        </div>
                                        <div className="inner-wrapper cancelled" style={{ width: '16%' }}>
                                            <span className="rfq-progress"></span>
                                            <div className="progress-title">Cancelled</div>
                                            <div className="tool-tip">
                                                <div className="count">{counterWidgetData.cancelled.count}</div>
                                                <div className="tool-tip-title">RFQ's Cancelled</div>
                                            </div>
                                        </div>
                                        <div className="inner-wrapper rejected" style={{ width: '14%' }}>
                                            <span className="rfq-progress"></span>
                                            <div className="progress-title">Rejected</div>
                                            <div className="tool-tip">
                                                <div className="count">{counterWidgetData.rejected.count}</div>
                                                <div className="tool-tip-title">RFQ's Rejected</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rfq-status-values">
                                    <div class="inner-wrapper">
                                        <div className="percentage">{counterWidgetData.approved.percentage}%</div>
                                        <div className="status">Approved</div>
                                    </div>
                                    <div class="inner-wrapper">
                                        <div className="percentage">{counterWidgetData.pending.percentage}%</div>
                                        <div className="status">Pending</div>
                                    </div>
                                    <div class="inner-wrapper">
                                        <div className="percentage">{counterWidgetData.cancelled.percentage}%</div>
                                        <div className="status">Cancelled</div>
                                    </div>
                                    <div class="inner-wrapper">
                                        <div className="percentage">{counterWidgetData.rejected.percentage}%</div>
                                        <div className="status">Rejected</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Tabs onTabClick={changeTab} defaultActiveKey="all" tabBarExtraContent={
                <Button onClick={exportToExcel} className="export-btn">Export<ExportOutlined></ExportOutlined></Button>
            }
                className="common-tabs"
            >
                <TabPane tab="All" key="all">
                    <section className="tab-area">
                        <div className="list-search-area common-card">
                            <div className="form-wrapper">
                                <div className="list-search-form">
                                    <div className="form-field">
                                        {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                                        <Input onChange={onSearchInputChange} onPressEnter={submitSearch} type="text" placeholder="what are you looking for..." className="search" />
                                        <a onClick={submitSearch} className="search-icon"></a>
                                    </div>
                                    <div className="filter-sort">
                                        <div className="inner-wrapper">
                                            <ul>
                                                <li>
                                                    <a className="filter filter-button">FILTER</a>
                                                    <ul className="drop-down-list">
                                                        <li onClick={() => { loadProductFilterForm('category') }}><a className="active">Category</a></li>
                                                        <li onClick={() => { loadProductFilterForm('status') }}><a>Status</a></li>
                                                        <li onClick={() => { loadProductFilterForm('promotion') }}><a>Promotions</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a className="sort filter-button">SORT</a>
                                                    <ul className="drop-down-list">
                                                        <li><a onClick={() => onSort("date-new")}>Date - New</a></li>
                                                        <li><a onClick={() => onSort("date-old")}>Date - Old</a></li>
                                                        <li><a onClick={() => onSort("price-low")}>Price - Low</a></li>
                                                        <li><a onClick={() => onSort("price-high")}>Price - High</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-table">
                            <table className="table table-striped" id="emp" >
                                <thead>
                                    <tr>
                                        <th><span>Buyer name</span></th>
                                        <th><span>RFQ No</span></th>
                                        <th><span>Date</span></th>
                                        <th><span>Status</span></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {
                                    !loading ?

                                        <tbody>
                                            {
                                                data.map((rfq, index) => {

                                                    return (
                                                        <tr>
                                                            <td className="product-name">
                                                                <span className="product-icon" style={{ backgroundImage: 'url(' + rfq.image + ')' }}></span>
                                                                <span className="title">{rfq.name}</span>
                                                            </td>
                                                            <td className="sku">
                                                                <span className="title">R {rfq.no}</span>
                                                            </td>
                                                            <td className="quantity">
                                                                <span className="title">{rfq.date}</span>
                                                                {/* <span className="sub-title">PKT</span> */}
                                                            </td>

                                                            <td className="sample">
                                                                <span className="title">{camelSentence(rfq.status)}</span>
                                                            </td>


                                                            <td className="promotion no">
                                                                <div class="button-wrapper">
                                                                    <a className="view" onClick={(e) => { handleViewOnClick(rfq.key) }}>View</a>

                                                                    <a className="message">Message</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :

                                        <tbody>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="product-name" colSpan="8">
                                                                <Skeleton.Button className="table-loader" active={true} style={{ width: '100%' }} shape={'default'} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                }

                            </table>

                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                current={currentPage}
                                total={totalItems}
                                onChange={onPageChange}
                                pageSize={perPage}
                            />
                        </div>
                    </section>
                </TabPane>
                <TabPane tab="Pending" key="pending">
                    <section className="tab-area">
                        <div className="list-search-area common-card">
                            <div className="form-wrapper">
                                <div className="list-search-form">
                                    <div className="form-field">
                                        {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                                        <Input onChange={onSearchInputChange} onPressEnter={submitSearch} type="text" placeholder="what are you looking for..." className="search" />
                                        <a onClick={submitSearch} className="search-icon"></a>
                                    </div>
                                    <div className="filter-sort">
                                        <div className="inner-wrapper">
                                            <ul>
                                                <li>
                                                    <a className="filter filter-button">FILTER</a>
                                                    <ul className="drop-down-list">
                                                        <li onClick={() => { loadProductFilterForm('category') }}><a className="active">Category</a></li>
                                                        <li onClick={() => { loadProductFilterForm('status') }}><a>Status</a></li>
                                                        <li onClick={() => { loadProductFilterForm('promotion') }}><a>Promotions</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a className="sort filter-button">SORT</a>
                                                    <ul className="drop-down-list">
                                                        <li><a onClick={() => onSort("date-new")}>Date - New</a></li>
                                                        <li><a onClick={() => onSort("date-old")}>Date - Old</a></li>
                                                        <li><a onClick={() => onSort("price-low")}>Price - Low</a></li>
                                                        <li><a onClick={() => onSort("price-high")}>Price - High</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-table">
                            <table className="table table-striped" id="emp" >
                                <thead>
                                    <tr>
                                        <th><span>Buyer name</span></th>
                                        <th><span>RFQ No</span></th>
                                        <th><span>Date</span></th>
                                        <th><span>Status</span></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {
                                    !loading ?

                                        <tbody>
                                            {
                                                data.map((rfq, index) => {

                                                    return (
                                                        <tr>
                                                            <td className="product-name">
                                                                <span className="product-icon" style={{ backgroundImage: 'url(' + rfq.image + ')' }}></span>
                                                                <span className="title">{rfq.name}</span>
                                                            </td>
                                                            <td className="sku">
                                                                <span className="title">R {rfq.no}</span>
                                                            </td>
                                                            <td className="quantity">
                                                                <span className="title">{rfq.date}</span>
                                                            </td>

                                                            <td className="sample">
                                                                <span className="title">{camelSentence(rfq.status)}</span>
                                                            </td>


                                                            <td className="promotion no">
                                                                <div class="button-wrapper">
                                                                    <a className="view" onClick={(e) => { handleViewOnClick(rfq.key) }}>View</a>
                                                                    <a className="message">Message</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :

                                        <tbody>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="product-name" colSpan="8">
                                                                <Skeleton.Button className="table-loader" active={true} style={{ width: '100%' }} shape={'default'} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                }

                            </table>

                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                current={currentPage}
                                total={totalItems}
                                onChange={onPageChange}
                                pageSize={perPage}
                            />
                        </div>
                    </section>
                </TabPane>
                <TabPane tab="Approved" key="approved">
                    <section className="tab-area">
                        <div className="list-search-area common-card">
                            <div className="form-wrapper">
                                <div className="list-search-form">
                                    <div className="form-field">
                                        {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                                        <Input onChange={onSearchInputChange} onPressEnter={submitSearch} type="text" placeholder="what are you looking for..." className="search" />
                                        <a onClick={submitSearch} className="search-icon"></a>
                                    </div>
                                    <div className="filter-sort">
                                        <div className="inner-wrapper">
                                            <ul>
                                                <li>
                                                    <a className="filter filter-button">FILTER</a>
                                                    <ul className="drop-down-list">
                                                        <li onClick={() => { loadProductFilterForm('category') }}><a className="active">Category</a></li>
                                                        <li onClick={() => { loadProductFilterForm('status') }}><a>Status</a></li>
                                                        <li onClick={() => { loadProductFilterForm('promotion') }}><a>Promotions</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a className="sort filter-button">SORT</a>
                                                    <ul className="drop-down-list">
                                                        <li><a onClick={() => onSort("date-new")}>Date - New</a></li>
                                                        <li><a onClick={() => onSort("date-old")}>Date - Old</a></li>
                                                        <li><a onClick={() => onSort("price-low")}>Price - Low</a></li>
                                                        <li><a onClick={() => onSort("price-high")}>Price - High</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-table">
                            <table className="table table-striped" id="emp" >
                                <thead>
                                    <tr>
                                        <th><span>Buyer name</span></th>
                                        <th><span>RFQ No</span></th>
                                        <th><span>Date</span></th>
                                        <th><span>Status</span></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {
                                    !loading ?

                                        <tbody>
                                            {
                                                data.map((rfq, index) => {

                                                    return (
                                                        <tr>
                                                            <td className="product-name">
                                                                <span className="product-icon" style={{ backgroundImage: 'url(' + rfq.image + ')' }}></span>
                                                                <span className="title">{rfq.name}</span>
                                                            </td>
                                                            <td className="sku">
                                                                <span className="title">R {rfq.no}</span>
                                                            </td>
                                                            <td className="quantity">
                                                                <span className="title">{rfq.date}</span>
                                                                {/* <span className="sub-title">PKT</span> */}
                                                            </td>

                                                            <td className="sample">
                                                                <span className="title">{camelSentence(rfq.status)}</span>
                                                            </td>


                                                            <td className="promotion no">
                                                                <div class="button-wrapper">
                                                                    <a className="view" onClick={(e) => { handleViewOnClick(rfq.key) }}>View</a>

                                                                    <a className="message">Message</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :

                                        <tbody>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="product-name" colSpan="8">
                                                                <Skeleton.Button className="table-loader" active={true} style={{ width: '100%' }} shape={'default'} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                }

                            </table>

                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                current={currentPage}
                                total={totalItems}
                                onChange={onPageChange}
                                pageSize={perPage}
                            />
                        </div>
                    </section>
                </TabPane>
                <TabPane tab="Rejected" key="rejected">
                    <section className="tab-area">
                        <div className="list-search-area common-card">
                            <div className="form-wrapper">
                                <div className="list-search-form">
                                    <div className="form-field">
                                        {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                                        <Input onChange={onSearchInputChange} onPressEnter={submitSearch} type="text" placeholder="what are you looking for..." className="search" />
                                        <a onClick={submitSearch} className="search-icon"></a>
                                    </div>
                                    <div className="filter-sort">
                                        <div className="inner-wrapper">
                                            <ul>
                                                <li>
                                                    <a className="filter filter-button">FILTER</a>
                                                    <ul className="drop-down-list">
                                                        <li onClick={() => { loadProductFilterForm('category') }}><a className="active">Category</a></li>
                                                        <li onClick={() => { loadProductFilterForm('status') }}><a>Status</a></li>
                                                        <li onClick={() => { loadProductFilterForm('promotion') }}><a>Promotions</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a className="sort filter-button">SORT</a>
                                                    <ul className="drop-down-list">
                                                        <li><a onClick={() => onSort("date-new")}>Date - New</a></li>
                                                        <li><a onClick={() => onSort("date-old")}>Date - Old</a></li>
                                                        <li><a onClick={() => onSort("price-low")}>Price - Low</a></li>
                                                        <li><a onClick={() => onSort("price-high")}>Price - High</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-table">
                            <table className="table table-striped" id="emp" >
                                <thead>
                                    <tr>
                                        <th><span>Buyer name</span></th>
                                        <th><span>RFQ No</span></th>
                                        <th><span>Date</span></th>
                                        <th><span>Status</span></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {
                                    !loading ?

                                        <tbody>
                                            {
                                                data.map((rfq, index) => {

                                                    return (
                                                        <tr>
                                                            <td className="product-name">
                                                                <span className="product-icon" style={{ backgroundImage: 'url(' + rfq.image + ')' }}></span>
                                                                <span className="title">{rfq.name}</span>
                                                            </td>
                                                            <td className="sku">
                                                                <span className="title">R {rfq.no}</span>
                                                            </td>
                                                            <td className="quantity">
                                                                <span className="title">{rfq.date}</span>
                                                                {/* <span className="sub-title">PKT</span> */}
                                                            </td>

                                                            <td className="sample">
                                                                <span className="title">{camelSentence(rfq.status)}</span>
                                                            </td>


                                                            <td className="promotion no">
                                                                <div class="button-wrapper">
                                                                    <a className="view" onClick={(e) => { handleViewOnClick(rfq.key) }}>View</a>

                                                                    <a className="message">Message</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :

                                        <tbody>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="product-name" colSpan="8">
                                                                <Skeleton.Button className="table-loader" active={true} style={{ width: '100%' }} shape={'default'} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                }

                            </table>

                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                current={currentPage}
                                total={totalItems}
                                onChange={onPageChange}
                                pageSize={perPage}
                            />
                        </div>
                    </section>
                </TabPane>
                <TabPane tab="Expired" key="expired">
                    <section className="tab-area">
                        <div className="list-search-area common-card">
                            <div className="form-wrapper">
                                <div className="list-search-form">
                                    <div className="form-field">
                                        {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                                        <Input onChange={onSearchInputChange} onPressEnter={submitSearch} type="text" placeholder="what are you looking for..." className="search" />
                                        <a onClick={submitSearch} className="search-icon"></a>
                                    </div>
                                    <div className="filter-sort">
                                        <div className="inner-wrapper">
                                            <ul>
                                                <li>
                                                    <a className="filter filter-button">FILTER</a>
                                                    <ul className="drop-down-list">
                                                        <li onClick={() => { loadProductFilterForm('category') }}><a className="active">Category</a></li>
                                                        <li onClick={() => { loadProductFilterForm('status') }}><a>Status</a></li>
                                                        <li onClick={() => { loadProductFilterForm('promotion') }}><a>Promotions</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul>
                                                <li>
                                                    <a className="sort filter-button">SORT</a>
                                                    <ul className="drop-down-list">
                                                        <li><a onClick={() => onSort("date-new")}>Date - New</a></li>
                                                        <li><a onClick={() => onSort("date-old")}>Date - Old</a></li>
                                                        <li><a onClick={() => onSort("price-low")}>Price - Low</a></li>
                                                        <li><a onClick={() => onSort("price-high")}>Price - High</a></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="listing-table">
                            <table className="table table-striped" id="emp" >
                                <thead>
                                    <tr>
                                        <th><span>Buyer name</span></th>
                                        <th><span>RFQ No</span></th>
                                        <th><span>Date</span></th>
                                        <th><span>Status</span></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                {
                                    !loading ?

                                        <tbody>
                                            {
                                                data.map((rfq, index) => {

                                                    return (
                                                        <tr>
                                                            <td className="product-name">
                                                                <span className="product-icon" style={{ backgroundImage: 'url(' + rfq.image + ')' }}></span>
                                                                <span className="title">{rfq.name}</span>
                                                            </td>
                                                            <td className="sku">
                                                                <span className="title">R {rfq.no}</span>
                                                            </td>
                                                            <td className="quantity">
                                                                <span className="title">{rfq.date}</span>
                                                                {/* <span className="sub-title">PKT</span> */}
                                                            </td>

                                                            <td className="sample">
                                                                <span className="title">{camelSentence(rfq.status)}</span>
                                                            </td>


                                                            <td className="promotion no">
                                                                <div class="button-wrapper">
                                                                    <a className="view" onClick={(e) => { handleViewOnClick(rfq.key) }}>View</a>

                                                                    <a className="message">Message</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        :

                                        <tbody>
                                            {
                                                [1, 2, 3, 4, 5].map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <td className="product-name" colSpan="8">
                                                                <Skeleton.Button className="table-loader" active={true} style={{ width: '100%' }} shape={'default'} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                        </tbody>
                                }

                            </table>

                            <Pagination
                                // showSizeChanger
                                // onShowSizeChange={onShowSizeChange}
                                current={currentPage}
                                total={totalItems}
                                onChange={onPageChange}
                                pageSize={perPage}
                            />
                        </div>
                    </section>
                </TabPane>
            </Tabs>

            <Drawer
                visible={productFilterVisible}
                title={t("filter")}
                width={'40vw'}
                onClose={handleFilterFormCancel}
                maskClosable={false}
                // confirmLoading={productDetailsFormLoading}
                // onOk={handleProductDetailsFormOk}
                footer={[

                    <Button className="drawer-form-save-left form-save" key="submit" type="primary"
                        loading={productFilterFormLoading}
                        onClick={handleProductFilterFormOk}>
                        FILTER
                    </Button>,
                    <Button className="form-cancel" key="back"
                        onClick={handleFilterFormCancel}>
                        CLEAR
                    </Button>,
                ]}

            >
                <Form
                    name="productFiltersForm"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    layout="vertical"
                    size="medium"
                    form={productFilterForm}
                    scrollToFirstError
                    className="drawer-form"
                >
                    <Tabs onTabClick={changeProductFilterTab} defaultActiveKey="category" activeKey={productFilterFormTab} tabPosition="left" >
                        <TabPane tab="Category" key="category">
                            <Form.Item initialValue={false} label="" valuePropName="checked" name="category">
                                <Checkbox.Group>
                                    {
                                        categories.map((categiry, idx) => {
                                            return (
                                                <div className="" >
                                                    <Checkbox value={categiry._id}>{categiry.name}</Checkbox>
                                                </div>
                                            )
                                        })
                                    }
                                </Checkbox.Group>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Status" key="status">
                            <Form.Item initialValue={false} label="" valuePropName="checked" name="published">

                                <Checkbox value={true}>Published Only</Checkbox>

                            </Form.Item>
                        </TabPane>
                        <TabPane tab="Promotion" key="promotion">
                            <Form.Item initialValue={false} label="" valuePropName="checked" name="hasPromotion">

                                <Checkbox value={true}>Has Promotion</Checkbox>

                            </Form.Item>
                        </TabPane>
                    </Tabs>
                </Form>
            </Drawer>


        </React.Fragment >

    )
}

export default Page

export async function getServerSideProps(context) {
    const { req, query, params, locale } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        }
    }
    let formInputs = {};
    try {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + session.user.email.jwtToken;
        api.defaults.headers.common["Accept-Language"] = locale;
        let { data: result } = await api.get('product/get-all-products');
        formInputs.products = result.data;

        let { data: formFieldResult } = await api.get("products/formvalues");

        formInputs = { ...formFieldResult.data, products: formInputs.products }
    } catch (err) {
        let { data: error } = err.response;

        console.log(error)
        if (error.code == 401) {
            return {
                redirect: {
                    destination: '/auth/signin',
                    permanent: false,
                },
            }
        }

        if (error.code == 403) {
            return {
                redirect: {
                    destination: '/no-permission',
                    permanent: false,
                },
            }
        }
    }

    return {
        props: {
            session,
            formInputs
        }
    }
}