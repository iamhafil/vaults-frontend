import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
// import UserPanel from './UserPanel';

const DashboardLayout = ({ children, Breadcrumb }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="main-container clearfix">
        <Navigation></Navigation>
        <article className="connex-main-content right-wrapper">
          <div className="article-inner">
            <Breadcrumb></Breadcrumb>
            {children}
          </div>
          <Footer></Footer>
        </article>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
