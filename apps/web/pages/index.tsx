import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import UserPanel from "../components/Layout/Default/UserPanel";
import {
  getCsrfToken,
  useSession,
  getSession,
  signIn,
  signOut,
} from "next-auth/client";
import {
  Button,
  Form,
  Input,
  Pagination,
  Select,
  message,
  Modal,
  Drawer,
  Upload,
  Skeleton,
  Checkbox,
  Tabs,
  DatePicker,
  Row,
  Col,
  Descriptions,
  Radio,
} from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment, { lang } from "moment";
import { api } from "./../libraries/api";

const { confirm } = Modal;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Search } = Input;
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";

const Page = ({ session, formInputs }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale: activeLocale } = router;
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
  const [buyers, setBuyers] = useState([]);
  const [buyerList, setBuyerList] = useState("");
  const [status, setStatus] = useState("");

  const [visible, setVisible] = useState(false);
  const [modalFormLoading, setModalFormLoading] = useState(false);
  const [mode, setMode] = useState("new");

  useEffect(() => {
    onSearch();

    const removeCalenderBox = (e) => {
      let isSameNode = document
        .getElementsByClassName("custom-picker")[0]
        .isSameNode(e.target);
      let classContains =
        (document.getElementsByClassName("calendar-wrapper")[0] &&
          document
            .getElementsByClassName("calendar-wrapper")[0]
            .contains(e.target)) ||
        e.target.className.indexOf("ant-picker") !== -1;
      if (isSameNode || classContains) {
        return;
      }
      setPickerOpen(false);
    };
    document.body.addEventListener("click", removeCalenderBox);
    return () => document.body.removeEventListener("click", removeCalenderBox);
  }, []);

  const onSearch = async (
    tab = "all",
    page = 1,
    sort = "date-new",
    buyer = false,
    status = false
  ) => {
    let params = "";
    if (buyer) {
      params += "&buyer=" + buyer;
    }
    if (status) {
      params += "&status=" + status;
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
    api
      .get("/api/vaults")
      .then(({ data: result }) => {
        console.log(result);
        let rfqs = [];

        setData(result.data);
        setTotalItems(result.pagination.total);

        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const onSort = (sort) => {
    setSort(sort);
    onSearch(defaultTab, currentPage, sort);
  };

  const togglePicker = () => {
    setPickerOpen(!pickerOpen);
  };

  const submitSearch = () => {
    onSearch();
  };

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const changeTab = async (key) => {
    await setperPage(10);
    await setCurrentPage(1);
    await setDefaultTab(key);
    onSearch(key);
  };

  const onPageChange = async (page) => {
    await setCurrentPage(page);
    onSearch(defaultTab, page, sort, buyerList, status);
  };

  const camelSentence = function camelSentence(str) {
    return (" " + str)
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
      });
  };

  const durationOptions = {
    7: t("last7Days"),
    14: t("last14Days"),
    28: t("last28Days"),
    90: t("last90Days"),
    month: t("thisMonth"),
    quarter: t("thisQuarter"),
    all: t("allTime"),
    custom: t("custom"),
  };
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedDate, setselectedDate] = useState(null);
  const [selectedDuration, setselectedDuration] = useState("all");
  const [countersLoading, setCountersLoading] = useState(false);
  const [counterWidgetData, setCounterWidgetDate] = useState({
    total: { count: 0, value: 0, percentage: 0 },
    approved: { count: 0, value: 0, percentage: 0 },
    pending: { count: 0, value: 0, percentage: 0 },
    cancelled: { count: 0, value: 0, percentage: 0 },
    rejected: { count: 0, value: 0, percentage: 0 },
  });

  const handleDateChange = (datw) => {
    setselectedDuration("custom");
    setselectedDate(datw);
  };

  const dateRangeChange = (e) => {
    let value = e.target.value;
    setselectedDuration(e.target.value);
    let today = moment();
    let date = moment();

    if (value == "7") {
      date.subtract(7, "day");
      setselectedDate([date, today]);
    }

    if (value == "14") {
      date.subtract(14, "day");
      setselectedDate([date, today]);
    }

    if (value == "28") {
      date.subtract(28, "day");
      setselectedDate([date, today]);
    }

    if (value == "90") {
      date.subtract(90, "day");
      setselectedDate([date, today]);
    }

    if (value == "month") {
      date = moment().startOf("month");
      setselectedDate([date, today]);
    }

    if (value == "quarter") {
      date = moment().startOf("quarter");
      setselectedDate([date, today]);
    }

    if (value == "custom") {
      setselectedDate(null);
    }

    if (value == "all") {
      date = moment("01/01/1970");
      setselectedDate(null);
    }
  };

  const hideRangePicker = (e) => {
    setPickerOpen(false);
  };

  const submitPickerForm = () => {
    if (selectedDuration == "custom") {
      if (selectedDate == null) {
        message.error("Please choose date range");
        return;
      }
    }

    onSearch();
  };

  return (
    <React.Fragment>
      <Head>
        <title>{"Yeeldx - Vaults List"}</title>
      </Head>

      <section className="rfq add-list-common">
        <div className="mob-title d-lg-none">{t("rfqS")}</div>
        <div className="calendar-field">
          <a
            className="custom-picker"
            onClick={() => {
              setPickerOpen(true);
            }}
          >
            {durationOptions[selectedDuration]}
          </a>
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
                      <Radio.Group
                        value={selectedDuration}
                        onChange={dateRangeChange}
                      >
                        <Radio value="7">{t("last7Days")}</Radio>
                        <br></br>
                        <Radio value="14">{t("last14Days")}</Radio>
                        <br></br>
                        <Radio value="28">{t("last28Days")}</Radio>
                        <br></br>
                        <Radio value="90">{t("last90Days")}</Radio>
                        <br></br>
                        <Radio value="month">{t("thisMonth")}</Radio>
                        <br></br>
                        <Radio value="quarter">{t("thisQuarter")}</Radio>
                        <br></br>
                        <Radio value="all">{t("allTime")}</Radio>
                        <br></br>
                        <Radio value="custom">{t("custom")}</Radio>
                      </Radio.Group>
                    </div>
                    <div className="calendar">
                      <div className="top">
                        <div className="picker-body">{panelNode}</div>
                      </div>
                      <div className="date-format">
                        {t("datesAreShownAsDubaiTime")}
                      </div>
                      <div className="bottom">
                        <Button
                          loading={countersLoading}
                          onClick={submitPickerForm}
                          className="form-save"
                        >
                          {t("update")}
                        </Button>
                        <Button
                          onClick={hideRangePicker}
                          className="form-cancel"
                        >
                          {t("cancel")}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>

        <div className="button-wrapper"></div>
      </section>
      <section className="rfq-updates Blade_rfq_updates">
        <div className="grid-wrapper">
          <div className="row">
            <div className="col-md-6 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Deposited</div>
                  <div className="number">{counterWidgetData.total.count}</div>
                  <div className="wrapper">
                    {/* <div className="description">
                      {t("rfqReceivedTillDate")}
                    </div>
                    <div className="value-wrapper">
                      <span className="label">{t("valueOfRFQ")}</span>
                      <span className="value">
                        {t("aed")} {counterWidgetData.total.value}
                      </span>
                    </div> */}
                  </div>
                  {/*
                    <div class="button-wrapper">
                      <a class="know-more">Know more</a>
                    </div>
                  */}
                </div>
              </div>
            </div>
            <div className="col-md-6 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Earnings</div>
                  <div className="number">{counterWidgetData.total.count}</div>
                  <div className="wrapper">
                    {/* <div className="description">
                      {t("rfqReceivedTillDate")}
                    </div>
                    <div className="value-wrapper">
                      <span className="label">{t("valueOfRFQ")}</span>
                      <span className="value">
                        {t("aed")} {counterWidgetData.total.value}
                      </span>
                    </div> */}
                  </div>
                  {/*
                    <div class="button-wrapper">
                      <a class="know-more">Know more</a>
                    </div>
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Tabs
        onTabClick={changeTab}
        defaultActiveKey="all"
        tabBarExtraContent={
          <Button className="export-btn  mobile-none rfqexport_btn">
            {t("exportAllRfqs")}
            <ExportOutlined></ExportOutlined>
          </Button>
        }
        className="common-tabs"
      >
        <TabPane tab={t("all")} key="all">
          <section className="tab-area">
            <div className="list-search-area common-card">
              <div className="form-wrapper">
                <div className="list-search-form">
                  <div className="form-field">
                    {/* <Search className="search" loading={loading} placeholder="what are you looking for..." allowClear onSearch={onSearch} style={{}} /> */}
                    <Input
                      onChange={onSearchInputChange}
                      onPressEnter={submitSearch}
                      type="text"
                      placeholder={
                        activeLocale == "ar"
                          ? "ما الذي تبحث عنه..."
                          : "What are you looking for..."
                      }
                      className="search"
                    />
                    <a onClick={submitSearch} className="search-icon"></a>
                  </div>
                  <div className="filter-sort">
                    <div className="inner-wrapper">
                      <ul>
                        <li>
                          <a className="filter filter-button">{t("filter")}</a>
                          <ul className="drop-down-list">
                            <li
                              onClick={() => {
                                loadProductFilterForm("buyer");
                              }}
                            >
                              <a className="active">{t("buyer")}</a>
                            </li>
                            <li
                              onClick={() => {
                                loadProductFilterForm("status");
                              }}
                            >
                              <a>{t("status")}</a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <a className="sort filter-button">{t("sort")}</a>
                          <ul className="drop-down-list">
                            <li>
                              <a onClick={() => onSort("date-new")}>
                                {t("rfqSortDateNew")}
                              </a>
                            </li>
                            <li>
                              <a onClick={() => onSort("date-old")}>
                                {t("rfqSortDateOld")}
                              </a>
                            </li>
                            <li>
                              <a onClick={() => onSort("price-low")}>
                                {t("rfqSortPriceLow")}
                              </a>
                            </li>
                            <li>
                              <a onClick={() => onSort("price-high")}>
                                {t("rfqSortPriceHigh")}
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="listing-table">
              <table className="table table-striped" id="emp">
                <thead>
                  <tr>
                    <th>
                      <span>Token</span>
                    </th>
                    <th>
                      <span>APY</span>
                    </th>
                    <th>
                      <span>Available</span>
                    </th>
                    <th>
                      <span>Deposited</span>
                    </th>
                    <th>
                      <span>TVL</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>

                {!loading ? (
                  <tbody>
                    {data.map((token, index) => {
                      return (
                        <tr>
                          <td className="product-name">
                            <span
                              className="product-icon"
                              style={{
                                backgroundImage: "url(" + token.icon + ")",
                              }}
                            ></span>
                            <span className="title">{token.display_name}</span>
                          </td>
                          <td className="sku">
                            <span className="title">{token.apy.net_apy}</span>
                          </td>
                          <td className="sku">
                            <span className="title"> {token.details.availableDepositLimit}</span>
                          </td>
                          <td className="quantity">
                            <span className="title">{token.tvl.tvl_deposited}</span>
                            {/* <span className="sub-title">PKT</span> */}
                          </td>

                          <td className="sample">
                            <span className="title">
                              {token.tvl.price}
                            </span>
                          </td>

                          <td className="promotion no">
                            <div class="button-wrapper">
                              <Link href={`/vaults/${token.address}`} className="view">
                                {t("view")}
                              </Link>
                              {/*<a className="message">Message</a>*/}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody>
                    {[1, 2, 3, 4, 5].map((e, i) => {
                      return (
                        <tr>
                          <td className="product-name" colSpan="8">
                            <Skeleton.Button
                              className="table-loader"
                              active={true}
                              style={{ width: "100%" }}
                              shape={"default"}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </section>
          <Pagination
            // showSizeChanger
            // onShowSizeChange={onShowSizeChange}
            current={currentPage}
            total={totalItems}
            onChange={onPageChange}
            pageSize={perPage}
            hideOnSinglePage={true}
          />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};
const Breadcrumb = ({}) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="user-message">Featured Vaults</h1>
    </>
  );
};

const panel = ({}) => {
  return <UserPanel Breadcrumb={Breadcrumb}></UserPanel>;
};
Page.Breadcrumb = panel;

export default Page;

export async function getServerSideProps(context) {
  const { req, query, params, locale } = context;
  const session = await getSession(context);

  if (!session) {
    // return {
    //   redirect: {
    //     destination: "/auth/signin",
    //     permanent: false,
    //   },
    // };
  }
  let formInputs = {};
  try {
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      session,
      formInputs,
    },
  };
}
