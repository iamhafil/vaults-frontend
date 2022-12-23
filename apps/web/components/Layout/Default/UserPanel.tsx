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
