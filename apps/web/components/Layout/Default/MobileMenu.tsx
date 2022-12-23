import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Menu = ({ children }) => {
  const router = useRouter();
  const menu = useRef("menu");

  return (
    <ul ref={menu} className="side-menu-list">
      {children}
    </ul>
  );
};

const MenuItem = ({
  subMenu,
  menuClassName,
  title,
  subtitle,
  href,
  index,
  children,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [aClassName, setAClassName] = useState(
    subMenu ? "has-sub-menu side-menu-anchor" : "side-menu-anchor"
  );
  // const selectedKeys = router.pathname.substr(1) || '/';
  const [activeClass, setActiveClass] = useState("");
  const referance = useRef(menuClassName);
  const submenu = useRef("submenu");

  useEffect(() => {
    handleRouteChange(router.pathname);
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  const handleRouteChange = (url) => {
    let selectedKeys = url.substr(1) || "/";

    if (selectedKeys != "/") {
      let keyArr = selectedKeys.split("/");

      if (keyArr.length > 1) {
        selectedKeys = keyArr[0];
      }
    }

    if (selectedKeys == index) {
      setActiveClass(" active");
    } else {
      setActiveClass("");
      if (open == true) {
        setAClassName(
          subMenu ? "has-sub-menu side-menu-anchor" : "side-menu-anchor"
        );
        setOpen(false);
      }
    }

    let dropdownNotActive = true;
    if (submenu?.current?.children != null) {
      console.log(submenu.current);
      if (submenu?.current?.children != undefined) {
        for (let i = 0; i < submenu.current.children.length; i++) {
          const element = submenu.current.children[i];
          if (element.className == "active") {
            dropdownNotActive = false;
          }
        }
      }
    }

    if (dropdownNotActive == true) {
      if (submenu.current != null) {
        if (submenu.current.classList != undefined)
          submenu.current.classList.add("dropdown-not-active");
      }
    } else {
      if (submenu.current.classList != undefined)
        submenu.current.classList.remove("dropdown-not-active");
      // handleOnClick("");
    }
  };

  const handleOnClick = (theKey) => {
    if (!open) {
      setAClassName(
        subMenu ? "has-sub-menu side-menu-anchor open" : "side-menu-anchor"
      );
    } else {
      setAClassName(
        subMenu ? "has-sub-menu side-menu-anchor" : "side-menu-anchor"
      );
    }

    setOpen(!open);

    if (!subMenu) {
      router.push(href);
    }
  };

  return (
    <li ref={referance} className={menuClassName + activeClass}>
      <a
        className={aClassName}
        onClick={(e) => {
          handleOnClick(index);
        }}
      >
        <span className="icon"></span>
        <span className="title-wrapper">
          <span className="title">{title}</span>
          <span className="sub-title">{subtitle}</span>
        </span>
      </a>
      {subMenu != undefined && subMenu.length ? (
        <ul ref={submenu} class="drop-down-list">
          {subMenu.map((sb, index) => {
            return <SubMenuItem title={sb.title} link={sb.link}></SubMenuItem>;
          })}
        </ul>
      ) : null}
    </li>
  );
};

const SubMenuItem = ({ title, link }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const submenu = useRef(link);
  const [activeClass, setActiveClass] = useState("notactive");

  useEffect(() => {
    handleRouteChange(router.pathname);

    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  const handleRouteChange = (url) => {
    let selectedKeys = url.substr(1) || "/";

    // if (selectedKeys != '/') {
    //   let keyArr = selectedKeys.split('/');

    //   if (keyArr.length > 1) {
    //     selectedKeys = keyArr[0];
    //   }
    // }

    if (selectedKeys == link.substring(1)) {
      console.log("selectedKeys = ", selectedKeys);
      console.log("link = ", link.substring(1));
      if (!active) {
        setActiveClass("active");
      } else {
        setActiveClass("notactive");
      }
      setActive(!active);
    } else {
      setActiveClass("notactive");
    }
  };

  const handleOnClick = (theKey) => {
    // if (!active) {
    //   setActiveClass("active");
    // } else {
    //   setActiveClass("");
    // }
    // setActive(!active);
    router.push(link);
  };

  return (
    <li
      ref={submenu}
      onClick={(e) => handleOnClick(link)}
      className={activeClass}
    >
      <a className={activeClass}>{title}</a>
    </li>
  );
};
const MobileMenu = ({}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [sliderOpen, setSliderOpen] = useState(false);

  const toggleSlider = () => {
    setSliderOpen(!sliderOpen);
  };

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
  }, []);

  const handleRouteChange = (url) => {
    setSliderOpen(false);
  };

  return (
    <div>
      <aside
        className={
          "connex-side-menu for-mobile d-md-none" +
          (sliderOpen ? " slide-left" : "")
        }
      >
        <div className="logo-wrapper">
          <div className="brand">{t("menu")}</div>
        </div>
        <div className="side-menu-wrapper">
          <Menu>
            <MenuItem
              index="/"
              menuClassName="my-dashboard"
              title={t("myDashboard")}
              subtitle=""
              href="/"
            ></MenuItem>
            <MenuItem
              index="products"
              menuClassName="product"
              title={t("product")}
              subtitle={t("listOfProducts")}
              href="#"
              subMenu={[
                { title: t("allProducts"), link: "/products" },
                { title: t("addNewProducts"), link: "/products/add" },
                { title: t("mediaLibrary"), link: "/products/medias" },
              ]}
            ></MenuItem>

            {/* <li className="product">
                            <a className="has-sub-menu side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">PRODUCT</span>
                                    <span className="sub-title">List of Products</span>
                                </span>
                            </a>
                            <ul class="drop-down-list">
                                <li><a>All Products</a></li>
                                <li class="active"><a class="active">Add new products</a></li>
                                <li><a>Media library</a></li>
                            </ul>
                        </li> */}

            <MenuItem
              index="clearance"
              menuClassName="clearance-sale"
              title={t("clearanceSale")}
              subtitle={t("promotedProducts")}
              href="/clearance"
            ></MenuItem>

            {/* <li className="clearance-sale">
                            <a className="side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">CLEARANCE SALE</span>
                                    <span className="sub-title">Promoted Products</span>
                                </span>
                            </a>
                        </li> */}
            <MenuItem
              index="orders"
              menuClassName="orders"
              title={t("orders")}
              subtitle={t("ordersMenuSubTitle")}
              href="#"
              subMenu={[
                { title: t("allOrders"), link: "/orders" },
                { title: t("returns"), link: "/orders/returns" },
              ]}
            ></MenuItem>

            <MenuItem
              index="rfqs"
              menuClassName="rfq"
              title={t("rfqS")}
              subtitle={t("requestforQuotation")}
              href="/rfqs"
            ></MenuItem>

            <MenuItem
              index="clearance"
              menuClassName="clearance-sale"
              title={t("bulkSale")}
              subtitle={t("promotedProducts")}
              href="/clearance"
            ></MenuItem>

            <MenuItem
              menuClassName="message"
              title={t("messages")}
              subtitle={t("MessagesChat")}
              href="/inbox"
            ></MenuItem>

            <MenuItem
              index="payments"
              menuClassName="payments"
              title={t("payments")}
              subtitle={t("allPayments")}
              href="/payments"
            ></MenuItem>

            {/* <li className="payments">
                            <a className="side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">PAYMENTS</span>
                                    <span className="sub-title">All Payments</span>
                                </span>
                            </a>
                        </li> */}
            <MenuItem
              index="buyers"
              menuClassName="buyers"
              title={t("buyers")}
              subtitle={t("listOfBuyers")}
              href="/buyers"
            ></MenuItem>

            {/* <li className="buyers">
                            <a className="side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">BUYERS</span>
                                    <span className="sub-title">List of Buyers</span>
                                </span>
                            </a>
                        </li> */}
            <MenuItem
              index="team"
              menuClassName="team"
              title={t("team")}
              subtitle={t("Add Members")}
              href="/team"
            ></MenuItem>

            <MenuItem
              index="reports"
              menuClassName="reports"
              title={t("reports")}
              subtitle={t("makingReports")}
              href="/reports"
            ></MenuItem>

            <MenuItem
              index="log"
              menuClassName="log"
              title={t("logTitle")}
              subtitle={t("viewMyActivities")}
              href="/logs"
            ></MenuItem>
            {/* <li className="team">
                            <a className="side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">TEAM</span>
                                    <span className="sub-title">Add Members</span>
                                </span>
                            </a>
                        </li> */}

            {/* <li className="reports">
                            <a className="side-menu-anchor">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">REPORTS</span>
                                    <span className="sub-title">Making Reports</span>
                                </span>
                            </a>
                        </li> */}
            <MenuItem
              index="profile"
              menuClassName="my-account"
              title={t("myAccount")}
              subtitle={t("profileDetails")}
              href="#"
              subMenu={[
                { title: t("myProfile"), link: "/profile" },
                { title: t("shipping"), link: "/profile/shipping" },
                { title: t("myAddresses"), link: "/profile/addresses" },
                { title: t("preferences"), link: "/profile/preferances" },
                { title: t("payments"), link: "/profile/payments" },
              ]}
            ></MenuItem>

            {/* <li className="my-account">
                            <a className="side-menu-anchor menu-alert">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">MY ACCOUNT</span>
                                    <span className="sub-title">Profile Details</span>
                                </span>
                            </a>
                        </li> */}

            <MenuItem
              index="support"
              menuClassName="support"
              title={t("support")}
              subtitle={t("help24x7")}
              href="/support"
            ></MenuItem>
            {/* <li className="support">
                            <a className="side-menu-anchor menu-alert">
                                <span className="icon"></span>
                                <span className="title-wrapper">
                                    <span className="title">SUPPORT</span>
                                    <span className="sub-title">24/7 Help</span>
                                </span>
                            </a>
                        </li> */}
          </Menu>
          {/* <div className="bottom-menu">
                        <ul className="bottom-menu-list">
                            <li><a>About us</a></li>
                            <li><a>Terms & conditions</a></li>
                            <li><a>Privacy Policy</a></li>
                        </ul>
                    </div> */}
        </div>
      </aside>

      <div className="footer-menu for-mobile d-md-none">
        <ul className="footer-menu-list">
          <li>
            <Link href="/" className="footer-menu-anchor" legacyBehavior>
              <>
                <span className="icon home"></span>
                <span className="title">{t("home")}</span>
              </>
            </Link>
          </li>
          <li>
            <Link href="/orders" className="footer-menu-anchor" legacyBehavior>
              <>
                <span className="icon orders"></span>
                <span className="title">{t("orders")}</span>
              </>
            </Link>
          </li>
          <li>
            <Link href="/rfqs" className="footer-menu-anchor" legacyBehavior>
              <>
                <span className="icon rfq"></span>
                <span className="title">{t("rfqS")}</span>
              </>
            </Link>
          </li>
          <li>
            <Link href="/inbox" className="footer-menu-anchor" legacyBehavior>
              <>
                <span className="icon messages"></span>
                <span className="title">{t("messages")}</span>
              </>
            </Link>
          </li>
          <li onClick={toggleSlider}>
            <a className="footer-menu-anchor">
              <span className="icon hamburger"></span>
              <span className="title">{t("more")}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
