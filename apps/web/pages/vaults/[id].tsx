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
import { api } from "../../libraries/api";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";
const { TextArea } = Input;
const { confirm } = Modal;
const { TabPane } = Tabs;

const Page = ({ session, formFields }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { locale: activeLocale } = router;
  const { id } = router.query;
  const [data, setData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    api
      .get("/api/vaults/" + id)
      .then(({ data: result }) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const changeTab = async (key) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {};

  return (
    <React.Fragment>
      <Head>
        <title>{t("rfqTitle")}</title>
      </Head>

      <section className="rfq-updates Blade_rfq_updates">
        <div className="grid-wrapper">
          <div className="row">
            <div className="col-md-3 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Total deposited</div>
                  <div className="number">{"20,113"}</div>
                  <div className="wrapper">
                    {/* <div className="description">
                      {t("rfqReceivedTillDate")}
                    </div> */}
                    <div className="value-wrapper">
                      <span className="label"></span>
                      <span className="value">
                        {"10,500,298.71"}
                      </span>
                    </div>
                  </div>
                  {/*
                    <div class="button-wrapper">
                      <a class="know-more">Know more</a>
                    </div>
                  */}
                </div>
              </div>
            </div>
            <div className="col-md-3 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Net APY</div>
                  <div className="number">{"47.72%"}</div>
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

            <div className="col-md-3 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Balance, st-yCRV</div>
                  <div className="number">{"0.00"}</div>
                  <div className="wrapper">
                    <div className="value-wrapper">
                      <span className="label"></span>
                      <span className="value">
                        {"0.00"}
                      </span>
                    </div>
                  </div>
                  {/*
                    <div class="button-wrapper">
                      <a class="know-more">Know more</a>
                    </div>
                  */}
                </div>
              </div>
            </div>

            <div className="col-md-3 col col-12">
              <div className="rfq-value">
                <div className="icon-wrapper">
                  <span className="icon"></span>
                </div>
                <div className="content-wrapper">
                  <div className="title">Earned, yCRV</div>
                  <div className="number">{"0.00"}</div>
                  <div className="wrapper">
                    
                    <div className="value-wrapper">
                      <span className="label"></span>
                      <span className="value">
                        {"0.00"}
                      </span>
                    </div>
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

      <section className="rfq-detail">
        <div className="row">
          <div className="col-md-12 col">
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
                title={"Deposit"}
                actions={
                  [
                    // <div className="row col-xl-12" style={{ float: "left" }}>
                    //   <Button
                    //     style={{ float: "left", marginRight: 10 }}
                    //     className="form-save"
                    //     key="submit"
                    //     htmlType="submit"
                    //     type="primary"
                    //   >
                    //     {t("submitQuotation")}
                    //   </Button>
                    //   <Button className="form-cancel" key="back" htmlType="reset">
                    //     {t("reset")}
                    //   </Button>
                    // </div>,
                  ]
                }
              >
                <div className="row">
                  <div className="col-xl-2 col-lg-2 col-md-2">
                    <Form.Item hidden name="rfq">
                      <Input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      label={"From Wallet"}
                      rules={[{ required: true, message: "" }]}
                      name="from"
                    >
                      <Input placeholder="SL-0001" readOnly />
                    </Form.Item>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2">
                    <Form.Item
                      label={"Amount"}
                      rules={[{ required: true, message: "" }]}
                      name="amount"
                    >
                      <Input placeholder="10" />
                    </Form.Item>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2">
                    <Form.Item
                      label={"To Vault"}
                      rules={[{ required: true, message: "" }]}
                      name="to"
                    >
                      <Input placeholder="SL-0001" readOnly />
                    </Form.Item>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2">
                    <Form.Item
                      label={"You Will Recieve"}
                      rules={[{ required: true, message: "" }]}
                      name="recieve"
                    >
                      <Input placeholder="10" />
                    </Form.Item>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-2">
                    <Form.Item label={" "} name="recieve">
                      <Button
                        style={{}}
                        className="form-save"
                        key="submit"
                        htmlType="submit"
                        type="primary"
                      >
                        {"Approve"}
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </Form>
          </div>
        </div>
      </section>

      <br></br>

      <Tabs
        onTabClick={changeTab}
        defaultActiveKey="about"
        className="common-tabs"
      >
        <TabPane tab={"About"} key="about">
          <section className="rfq-detail">
            <div className="row">
              <div className="col-md-12 col">
                <div className="common-card rfq-details">
                  <div className="grid-wrapper">
                    <div className="row">
                      <div className="col-md-7 col">
                        <div className="top-wrapper">
                          <div className="title">
                            <h5>Description</h5>
                          </div>
                          <div className="description">
                            <p>yCRV is Yearn Finance's new and improved veCRV wrapper system designed to tokenize Yearn's veCRV position which passes all revenue and benefits along to users. This system is composed of a base-token called yCRV which a user can deposit into any one of three `activated` positons to earn yield or voting power: st-yCRV, lp-yCRV, and vl-yCRV. st-yCRV yVault receives admin fees and bribes from locked CRV. lp-yCRV yVault converts yCRV into CRV/yCRV LP tokens and uses them to farm CRV emissions and trading fees. vl-yCRV yVault is for voting power on Curve.fi gauge weights.</p>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 col">
                        <div className="top-wrapper">
                          <div className="title">
                            <h5>Chart</h5>
                          </div>
                          <div className="description">
                            <p>{"data?.notes"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabPane>

        <TabPane tab={"Strategies"} key="strategies">
          <section className="rfq-detail">
            <div className="row">
              <div className="col-md-12 col">
                <div className="common-card rfq-details">
                  <div className="grid-wrapper">
                    <div className="top-wrapper">
                      <div className="left-wrapper">
                        <div
                          className="image-wrapper"
                          style={{
                            background: "",
                          }}
                        ></div>
                        <div className="description">
                          <div class="top-wrap">
                            <div
                              className="title"
                              title={"line?.product?.name"}
                            >
                              {"line?.product?.name.length"}
                            </div>
                            <div className="sub-title">
                              Price : {"line?.product?.price"}
                            </div>
                          </div>
                          <div className="bottom-wrap">
                            <div className="title">{"Country of Origin"}</div>
                            {/* <div className="sub-title">Brand : {line?.product?.brand}</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="right-wrapper">
                        <div className="top-wrap">
                          <div className="title">{t("priceRequested")}</div>
                          <div className="quantity">{"line.price"}</div>
                        </div>
                        <div className="top-wrap">
                          <div className="title">{t("quantityRequested")}</div>
                          <div className="quantity">{"line.quantity"}</div>
                          <div className="unit">Unit</div>
                        </div>
                        <div class="bottom-wrap">
                          {/*<div className="title">RFQ Expire Date</div>
                          <div className="sub-title">
                            {moment(data.expiry).format("DD MMMM YYYY")}
                          </div>*/}
                        </div>
                      </div>
                    </div>

                    <div className="bottom-wrapper">
                      <div className="title">
                        {t("rfqMessageFrom")} {"data?.buyer?.storeName"}
                      </div>
                      <div className="description">
                        <p>{"data?.notes"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button-wrapper">
              <Button
                style={{ marginRight: 6 }}
                className="form-save rfqform_save"
                key="submit6"
                htmlType="submit"
                type="primary"
              >
                {t("sendQuotation")}
              </Button>
            </div>
          </section>
        </TabPane>

        <TabPane tab={"Historical Rates"} key="rates">
          <section className="rfq-detail">
            <div className="row">
              <div className="col-md-12 col">
                <div className="common-card rfq-details">
                  <div className="grid-wrapper">
                    <div className="top-wrapper">
                      <div className="left-wrapper">
                        <div
                          className="image-wrapper"
                          style={{
                            background: "",
                          }}
                        ></div>
                        <div className="description">
                          <div class="top-wrap">
                            <div
                              className="title"
                              title={"line?.product?.name"}
                            >
                              {"line?.product?.name.length"}
                            </div>
                            <div className="sub-title">
                              Price : {"line?.product?.price"}
                            </div>
                          </div>
                          <div className="bottom-wrap">
                            <div className="title">{"Country of Origin"}</div>
                            {/* <div className="sub-title">Brand : {line?.product?.brand}</div> */}
                          </div>
                        </div>
                      </div>
                      <div className="right-wrapper">
                        <div className="top-wrap">
                          <div className="title">{t("priceRequested")}</div>
                          <div className="quantity">{"line.price"}</div>
                        </div>
                        <div className="top-wrap">
                          <div className="title">{t("quantityRequested")}</div>
                          <div className="quantity">{"line.quantity"}</div>
                          <div className="unit">Unit</div>
                        </div>
                        <div class="bottom-wrap">
                          {/*<div className="title">RFQ Expire Date</div>
                          <div className="sub-title">
                            {moment(data.expiry).format("DD MMMM YYYY")}
                          </div>*/}
                        </div>
                      </div>
                    </div>

                    <div className="bottom-wrapper">
                      <div className="title">
                        {t("rfqMessageFrom")} {"data?.buyer?.storeName"}
                      </div>
                      <div className="description">
                        <p>{"data?.notes"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="button-wrapper">
              <Button
                style={{ marginRight: 6 }}
                className="form-save rfqform_save"
                key="submit6"
                htmlType="submit"
                type="primary"
              >
                {t("sendQuotation")}
              </Button>
            </div>
          </section>
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};
const Breadcrumb = ({}) => {
  const { t } = useTranslation();
  let [session, isLogged] = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [rfqData, setRfqData] = useState({});

  const [data, setData] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    api
      .get("/api/vaults/" + id)
      .then(({ data: result }) => {
        setRfqData(result.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1 className="back-heading"> {rfqData.display_name}</h1>
      <div className="status-date">
        <span className="status pending">{rfqData.status}</span>
        <span className="date">Address - {rfqData.address}</span>
        <span className="time">Category - {rfqData.category}</span>
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
    // return {
    //   redirect: {
    //     destination: "/auth/signin",
    //     permanent: false,
    //   },
    // };
  }
  let rfq = {};
  let formFields = {};
  try {
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      session,
      formFields: formFields,
      rfq,
    },
  };
}
