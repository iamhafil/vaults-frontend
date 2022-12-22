import Head from "next/head";
import { useRouter } from "next/router";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import UserPanel from "../../components/Layout/Default/UserPanel";
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
  Modal,
  Select,
  message,
  Upload,
  Card,
  Checkbox,
  Drawer,
  Descriptions,
  Tabs,
} from "antd";
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  InboxOutlined,
  EditOutlined,
  EditTwoTone,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import { api } from "./../../libraries/api";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;
const { confirm } = Modal;

const Page = ({ session, formFields, rfq }) => {
  const { t } = useTranslation()

  const router = useRouter();
  const { locale: activeLocale } = router
  const { id } = router.query;
  const [data, setData] = useState(rfq);
  const [form] = Form.useForm();
  const [language, setLanguage] = useState("en");
  const [isLoading, setLoading] = useState(false);
  const [showQuatationForm, setShowQuatationForm] = useState(false);
  const [originCountry, setOriginCountry] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [productId, setProductId] = useState();

  useEffect(() => {
    getCountry(data?.buyer?.shippingAddress?.country)
    getCity(data?.buyer?.shippingAddress?.state, data?.buyer?.shippingAddress?.city)
  }, []);

  useEffect(() => {
    data.products.map((product, index) => {
      setProductId(product?._id)
    })
  }, [data]);


  const getOriginCountry = async (code) => {
    let country = await api.get("/country")
    country = country?.data?.data?.find((c) => c.code === code)
    if (country) {
      setOriginCountry(country?.name)
    }
  }

  const getCountry = async (code) => {
    let country = await api.get("/country")
    country = country?.data?.data?.find((c) => c.code === code)
    if (country) {
      setCountry(country?.name)
    }
  }

  const getCity = async (stateCode, cityCode) => {
    let city = await api.get("/country/cities?state=" + stateCode)
    city = city?.data?.data?.find((c) => c.id == cityCode)
    if (city) {
      setCity(city?.name)
    }
  }

  useEffect(() => {
   // console.log(data, rfq, rfq.quotation);
    api.defaults.headers.common["Authorization"] =
      "Bearer " + session.user.email.jwtToken;

    let formValues = {};
    formValues.rfq = id;
    if (rfq.quatation != undefined) {
      let quotation = rfq.quatation;
      formValues.quotationNo = quotation.no;
      formValues.delivery = quotation.delivery;
      formValues.validity = quotation.validity;
      formValues.shippingCost = quotation.shippingCost;
      formValues.paymentTerms = quotation.paymentTerms;
      formValues.vatExclusive = quotation.vatExclusive;
      formValues.notes = quotation.notes;
      formValues.products = {};
      quotation?.products.forEach((attriute, index) => {
        let line = {};
        line.qty = attriute.quantity;
        line.unit = attriute.unit;
        line.price = attriute.price;
        line.total = attriute.total;
        formValues.products[attriute.product] = line;
      });
    }
    form.setFieldsValue(formValues);
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    if(values.rfq == undefined){
      values.rfq = id;
    }
    setLoading(true);
    api
      .post("rfq/quotation", values)
      .then(({ data: result }) => {
        setLoading(false);
        if (result.data) {
          message.success("Quotation Submited");
          router.push("/rfqs");
        } else {
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error.response.data.error[0].msg);
        message.error(error.response.data.error[0].msg);
      });
  };

  const handleShowQuotation = () => {
    setShowQuatationForm(true);
  };

  const handleRejectRFQClick = () => {
    rejectRFQ(id, "");
  };

  const rejectRFQ = (id, status) => {
    confirm({
      title: "Are you sure you want to reject RFQ",
      icon: <ExclamationCircleOutlined />,
      // content: 'This will unlist product from store',
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          changeRfqStatus(id, status);
          setTimeout(resolve, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const changeRfqStatus = (id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", "REJECTED");
    setLoading(true);
    api
      .post("rfq/status", formData)
      .then(({ data: result }) => {
        setLoading(false);
        if (result.data) {
          Router.reload();
          message.success("RFQ Rejected");
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

  const onChangeShippingCost = (e, id) => {
    let formValues = {};
    formValues.products = {};
    data?.products.forEach((pdt, index) => {
      let line = {};
      let products = form.getFieldValue("products");
      for(let i in products){
        let quantity = products[id].qty;
        let price = products[id].price;

        line.total = (parseFloat(price) * parseFloat(quantity)) +
                      parseFloat(e.target.value);
        formValues.products[id] = line;
      } 
    });

    form.setFieldsValue(formValues);
  }

  const onChangeUnitPrice = (e, id) => {
    let formValues = {};
    formValues.products = {};
    data?.products.forEach((pdt, index) => {
      let line = {};
      let products = form.getFieldValue("products");
      if(products){
        let quantity = products[id].qty;
        let shippingCost = form.getFieldValue("shippingCost") || 0;

        line.total = (parseFloat(e.target.value) * parseFloat(quantity)) +
                      parseFloat(shippingCost);
        formValues.products[id] = line;
      } 
    });

    form.setFieldsValue(formValues);
  };

  const onChangeUnitQuantity = (e, id) => {
    let formValues = {};
    formValues.products = {};
    data?.products.forEach((pdt, index) => {
      let line = {};
      let products = form.getFieldValue("products");
      if(products){
        let price = products[id].price;
        let shippingCost = form.getFieldValue("shippingCost");

        line.total = (parseFloat(e.target.value) * parseFloat(price)) + 
                      parseFloat(shippingCost);
        formValues.products[id] = line;
      }
    });

    form.setFieldsValue(formValues);
  };

  const deliveryOptions = [
    { label: t("day1"), value: "1" },
    { label: t("days2"), value: "2" },
    { label: t("days3"), value: "3" },
    { label: t("days4"), value: "4" },
    { label: t("days5"), value: "5" },
    { label: t("days6"), value: "6" },
  ];

  return (
    <React.Fragment>
      <Head>
        <title>{t("rfqTitle")}</title>
      </Head>
      <section className="rfq-detail">
        <div className="row">
          <div className="col-md-7 col">
            <div className="common-card rfq-details">
              <div className="grid-wrapper">
                {data?.products.map((line, index) => {
                  getOriginCountry(line?.product?.countryOfOrigin)
                  return (
                    <div className="top-wrapper">
                      <div className="left-wrapper">
                        <div
                          className="image-wrapper"
                          style={{
                            background: line?.product?.images[0]
                              ? "url(" + line?.product?.images[0].url + ")"
                              : "",
                          }}
                        ></div>
                        <div className="description">
                          <div class="top-wrap">
                            <div
                              className="title"
                              title={line?.product?.name}
                            >
                              {line?.product?.name.length > 25
                                ? line?.product?.name.substring(
                                    0,
                                    25
                                  ) + "..."
                                : line?.product?.name}
                            </div>
                            <div className="sub-title">
                              Price : {line?.product?.price}
                            </div>
                          </div>
                          <div className="bottom-wrap">
                            <div className="title">
                              {originCountry && `${t("Country of Origin")} : ${originCountry}`}
                            </div>
                            {/* <div className="sub-title">Brand : {line?.product?.brand}</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="right-wrapper">
                        <div className="top-wrap">
                          <div className="title">{t("priceRequested")}</div>
                          <div className="quantity">{line.price}</div>
                        </div>
                        <div className="top-wrap">
                          <div className="title">{t("quantityRequested")}</div>
                          <div className="quantity">{line.quantity}</div>
                          <div className="unit">Unit-{line?.product?.uom == 'CTN' ? 'Carton':line?.product?.uom}</div>
                        </div>
                        <div class="bottom-wrap">
                          {/*<div className="title">RFQ Expire Date</div>
                          <div className="sub-title">
                            {moment(data.expiry).format("DD MMMM YYYY")}
                          </div>*/}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="bottom-wrapper">
                  <div className="title">
                    {t("rfqMessageFrom")} {data?.buyer?.storeName}
                  </div>
                  <div className="description">
                    <p>{data?.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col">
            <div className="common-card rfq-received">
              <div className="title-message-wrapper">
                <div className="title">{t("receivedRfqs")}</div>
                {/*<div className="button-wrapper">
                  <a className="message">Message</a>
                </div>*/}
              </div>
              <div className="top-wrapper rftRecevedBox_wrp">
                {/* <div className="image-wrapper"> */}
                  <img 
                  style={{
                    "width": "32px",
                    "height": "32px",
                    "border-radius": "100%",
                    "background": "no-repeat center",
                    "background-size": "contain",
                    "margin-right": "10px",
                  }} 
                  src={data?.buyer?.account.avatar}alt="images"/>
                {/* </div> */}
                <div className="description">
                  <div className="name">
                    {data?.buyer?.storeName}
                  </div>
                  {/* <div className="designation">Sales Manager, ABC Company</div> */}
                  <div className="phone">{data?.buyer?.account?.mobile}</div>
                  <div className="email-profile">
                    <span className="email">{data?.buyer?.account?.email}</span>
                    {/*<Link href="/profile">
                      <a className="view-profile">View Profile</a>
                    </Link>*/}
                  </div>
                </div>
              </div>
              <div className="bottom-wrapper address-card-grid">
                 <div className="grid-card">
                  <div className="title">{t("shippingAddress")}</div>
                  <div className="address-list">
                    <p>
                      {data?.buyer?.storeName}
                    </p>
                    <p>{data?.buyer?.shippingAddress?.address[language]}</p>
                    {city && country && <p>
                      {city},{" "}
                      {country}
                    </p>}
                    <p>Phone Number:{data?.buyer?.shippingAddress?.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {rfq.status == "PENDING" ? (
          <div className="button-wrapper">
            <Button
              onClick={handleShowQuotation}
              style={{ marginRight: 6 }}
              className="form-save rfqform_save"
              key="submit6"
              htmlType="submit"
              type="primary"
            >
              {t("sendQuotation")}
            </Button>
            {(rfq.quatation == undefined) ? (
               <Button
               onClick={handleRejectRFQClick}
               className="form-cancel"
               key="back"
               htmlType="reset"
             >
              {t("rejectRfq")}
             </Button>
            ) : null}
           
          </div>
        ) : null}
      </section>

      <br></br>
      <div className="row quotation-row" hidden={!showQuatationForm}>
        <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
          <Form
            name="form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            size="medium"
            form={form}
            scrollToFirstError
            className="common-form card-form"
            requiredMark={false}
          >
            <Card
              title={t('quotationTitle')}
              actions={[
                <div className="row col-xl-12" style={{ float: "left" }}>
                  <Button
                    style={{ float: "left", marginRight: 10 }}
                    className="form-save"
                    key="submit"
                    htmlType="submit"
                    type="primary"
                  >
                    {t("submitQuotation")}
                  </Button>
                  <Button className="form-cancel" key="back" htmlType="reset">
                    {t("reset")}
                  </Button>
                </div>,
              ]}
            >
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item hidden name="rfq">
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    label={t("quotationNumber")}
                    rules={[{ required: true, message: "" }]}
                    name="quotationNo"
                  >
                    <Input placeholder="SL-0001" />
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item
                    label={t("deliveryWithin")}
                    rules={[{ required: true, message: "" }]}
                    name="delivery"
                  >
                    <Select placeholder={activeLocale == "ar"? "Delivery":"Delivery"} options={deliveryOptions}></Select>
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item
                    label={t("quotationValidity")}
                    rules={[{ required: true, message: "" }]}
                    name="validity"
                  >
                    <Select placeholder={activeLocale == "ar"? "Quotation Valid": "Quotation Valid"} options={deliveryOptions}></Select>
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item
                    label={t("shippingCost")}
                    rules={[]}
                    name="shippingCost"
                  >
                    <Input
                      placeholder="101"
                      type="number"
                      onChange={(e) =>
                        onChangeShippingCost(e, productId)
                      }
                      min={0}
                      defaultValue={0}
                      onKeyDown={(evt) =>
                        evt.key === "e" && evt.preventDefault()
                      }
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item
                    label={t("paymentTerms")}
                    rules={[{ required: true, message: "" }]}
                    name="paymentTerms"
                  >
                    <Select placeholder={activeLocale == "ar"? "Payment Terms": "Payment Terms"}>
                      <Select.Option value={"card"}>{"Card"}</Select.Option>
                      <Select.Option value={"cod"}>
                        {"Cash on delivery"}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3">
                  <Form.Item
                    label={t("vatExclusive")}
                    valuePropName="checked"
                    initialValue={false}
                    name="vatExclusive"
                  >
                    <Checkbox value={true}></Checkbox>
                  </Form.Item>
                </div>
              </div>
              <hr></hr>
              <Form.List name="products">
                {(fields) =>
                  data.products.map((product, index) => {
                    return (
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3">
                          <Form.Item
                            name={[product?.product?._id, "qty"]}
                            label={t("orderQty")}
                            rules={[{ required: true, message: "" }]}
                          >
                            <Input
                              placeholder="100"
                              onChange={(e) =>
                                onChangeUnitQuantity(e, product?.product?._id)
                              }
                              type="number"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              min={0}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-2">
                          <Form.Item
                            name={[product?.product?._id, "unit"]}
                            label={t("unit")}
                            rules={[]}
                          >
                            <Input placeholder={product?.product?.uom} value={product?.product?.uom} disabled/>
                          </Form.Item>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3">
                          <Form.Item
                            name={[product?.product?._id, "price"]}
                            label={t("unitPrice")}
                            rules={[{ required: true, message: "" }]}
                          >
                            <Input
                              onChange={(e) =>
                                onChangeUnitPrice(e, product?.product?._id)
                              }
                              placeholder="100"
                              type="number"
                              step="any"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              min={0}
                            />
                          </Form.Item>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3">
                          <Form.Item
                            name={[product?.product?._id, "total"]}
                            label={t("total")}
                            rules={[{ required: true, message: "" }]}
                          >
                            <Input
                              placeholder="100"
                              type="number"
                              step="any"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              min={0}
                            />
                          </Form.Item>
                        </div>
                        <hr></hr>
                      </div>
                    );
                  })
                }
              </Form.List>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12 col-sm-12">
                  <Form.Item label={t("notes")} name="notes">
                    <TextArea rows={5}></TextArea>
                  </Form.Item>
                </div>
              </div>
            </Card>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};
const Breadcrumb = ({}) => {
  const { t } = useTranslation()
  let [session, isLogged] = useSession();
  const router = useRouter();
  const [rfqData, setRfqData] = useState({});

  useEffect(() => {
    try {
      api.defaults.headers.common["Authorization"] =
        "Bearer " + session.user.email.jwtToken;
      (async () => {
        let { data: result } = await api.get("rfq/" + router.query.id);
        let rfq = result.data;
        setRfqData(rfq);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <h1 className="back-heading">{`${t("rfqDetails")} - R${rfqData.rfqNo}`}</h1>
      <div className="status-date">
        <span className="status pending">{rfqData.status}</span>
        <span className="date">
          Date - {moment(rfqData.createdAt).format("DD MMMM YYYY")}
        </span>
        <span className="time">
          Time - {moment(rfqData.createdAt).format("hh:mm")}
        </span>
      </div>
    </>
  );
};

const panel = ({}) => {
  return <UserPanel Breadcrumb={Breadcrumb}></UserPanel>;
};
Page.Breadcrumb = panel;
export default Page;

export async function getServerSideProps(context) {
  const { req, res, params, locale } = context;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  let rfq = {};
  let formFields = {};
  try {
    api.defaults.headers.common["Authorization"] =
      "Bearer " + session.user.email.jwtToken;
    api.defaults.headers.common["Accept-Language"] = locale;
    let { data: result } = await api.get("rfq/" + params.id);
    rfq = result.data;
  } catch (err) {
    let { data: error } = err.response;

    console.log(error);
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
      formFields: formFields,
      rfq,
    },
  };
}
