import { useSession } from "next-auth/client";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../../../libraries/api";
import { setCookie } from "../../../libraries/cookie";

const Header = ({ }) => {
  const [session, setSession] = useSession();
  const [profileId, setProfileId] = useState('')
  const router = useRouter();
  const { locales, locale } = router

  const { t } = useTranslation();


  return (
    <header className="connex-header mobile-none">
      <nav className="connex-nav">
        <ul className="menu-list">
          <li>
            <Link
              href={profileId ? `https://safqat.com/store/suppliers/${profileId}` : "/"}
              className="header-anchor"
              target="_blank">
              {t("viewMyStore")}
            </Link>
          </li>
          <li>
            <Link href="https://safqat.com/" className="header-anchor" target="_blank">
              Visit safqat.com
            </Link>
          </li>
        </ul>
        <div className="connec_nav_suportLg">
           <span className="support">{t("forSupportCall")} 
            <Link href="#">+971 50 254 2100</Link>
          </span>
       
          {/*
            locale == "en" ?
              <span className="language">
                {<a onClick={(e) => { handleLanguageSwitchClick("ar") }} href={"/ar" + router.asPath}>عربى</a>}
              </span>
              :
              <span className="language">
                {<a onClick={(e) => { handleLanguageSwitchClick("en") }} href={"/en" + router.asPath}>English</a>}
              </span>
           */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
