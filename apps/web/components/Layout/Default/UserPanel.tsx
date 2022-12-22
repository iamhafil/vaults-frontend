import React, { useState, useEffect } from "react";
import { useSession, getSession, signIn, signOut } from "next-auth/client";
import { Modal } from "antd";
import Help from "./help";
import { api } from "../../../libraries/api";
import { useTranslation } from "react-i18next";

const UserPanel = ({ Breadcrumb }) => {
  const [session, loading] = useSession();
  const [visible, setVisible] = useState(false);
  const [supplierLogo, setSupplierLogo] = useState();
  const [supplierName, setSupplierName] = useState();
  const { t } = useTranslation();

  const logout = async (e) => {
    // e.prevenDefault();
    signOut();
  };

  const getProfile = async() => {
    let data = await api.get("auth/profile-header");

    if (data) {
      setSupplierName(data?.data?.data?.supplier?.repName)
      setSupplierLogo(data?.data?.data?.supplier?.storeLogo?.url)
    }
  }

  useEffect(() => {
    api.defaults.headers.common["Authorization"] =
    "Bearer " + session?.user?.email?.jwtToken;
    getProfile()
  }, [session]);

  const handleNotificationClick = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {};
  const showHelpModal = () => {
    document.querySelector(".help-modal-wrapper").classList.toggle("show-in");
  };
  return (
    <>
      <section className="user-panel addproduct_brd">
        <div className="left-wrapper mobile-none d-sm-none d-lg-block">
          {Breadcrumb ? (
            <Breadcrumb />
          ) : (
            <>
              <h1
                className="user-message"
                title={session ? session.user.name : null}
              >
                {t("hello")}{supplierName ? `, ${supplierName}` : null}
              </h1>
              <div className="sub-title">
                {t("businessOverview")}
              </div>
            </>
          )}
        </div>
        <div className="right-wrapper">
          <div className="logo-wrapper d-sm-block d-lg-none">
            <div className="brand">
              <a>
                <img
                  className="img-fluid"
                  src="/images/SFQ-Logo011.png"
                  alt="safqat"
                />
              </a>
            </div>
          </div>
          <div className="panel-actions">
            {/*<span
              className="notification"
              onClick={() => handleNotificationClick()}
            ></span>*/}
            <span className="help mobile-none" onClick={showHelpModal}></span>
            <div className="user-actions">
              <div className="drop-down">
                <a class="user-name">
                  {/* <span
                    class="image"
                    style={{
                      backgroundImage: `url(${session.user.email.avathar})`,
                    }}></span> */}
                  {session &&
                  session.user &&
                  session.user.email &&
                  supplierLogo ? (
                    <span
                      class="image"
                      style={{
                        backgroundImage: `url(${supplierLogo})`,
                      }}
                    />
                  ) : (
                    <span
                      class="image"
                      style={{
                        backgroundImage: `url("https://connex-storage.s3.ap-south-1.amazonaws.com/images/20.+Account.svg")`,
                      }}
                    />
                  )}
                  {session ? session.user.name : null}
                </a>
                <ul class="drop-down-list mt-0">
                  <li>
                    <a href="/profile">{t("myProfile")}</a>
                  </li>
                  <li>
                    <a href="/profile/shipping">{t("shipping")}</a>
                  </li>
                  <li>
                    <a href="/profile/addresses">{t("myAddresses")}</a>
                  </li>
                  <li>
                    <a href="/profile/payments">{t("payments")}</a>
                  </li>
                  <li>
                    <a href="/profile/preferances">{t("preferences")}</a>
                  </li>
                  <li>
                    <a onClick={logout}>{t("logOut")}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        visible={visible}
        title={
          <>
            <div className="heading">
              <div className="title">Notification</div>
              <div className="description">These require your attention.</div>
            </div>
          </>
        }
        okText="Save"
        cancelText="Back"
        onCancel={handleCancel}
        maskClosable={false}
        onOk={handleOk}
        className="modal-style-one right-modal notification-modal"
        footer={null}
        style={{ top: 0 }}
        bodyStyle={{
          top: 0,
          float: "right !important",
          right: 0,
        }}
      ></Modal>
      <Help></Help>
    </>
  );
};

export default UserPanel;
