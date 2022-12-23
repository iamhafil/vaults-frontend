import "normalize.css";
// import "../styles/globals.scss";
// import "";
import "./../styles/css/bootstrap.min.css";
import "./../styles/css/font-montserrat.css";
import "./../styles/css/style.css";
import "./../styles/css/fixes.css";

import DashboardLayout from "./../components/Layout/Default";

import Router, { useRouter } from "next/router";

import type { AppProps } from "next/app";
import { Layout as AppLayout } from "../components/Layout";
import { MetaMaskProvider } from "../hooks/useMetaMask";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let url = router.pathname;

  let Layout: any = AppLayout;
  const Breadcrumb = Component?.Breadcrumb;

  Layout = DashboardLayout;

  return (
    <MetaMaskProvider>
      <Layout Breadcrumb={Breadcrumb}>
        <Component {...pageProps} />
      </Layout>
    </MetaMaskProvider>
  );
}

export default MyApp;
