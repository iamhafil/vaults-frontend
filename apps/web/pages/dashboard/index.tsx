import Head from 'next/head';
import { ethers } from "ethers";

import Tickets from "../../components/tickets/Tickets";
import TicketsOwned from "../../components/tickets/TicketsOwned";
import Navigation from '../../components/Navigation'
import UserPanel from "../../components/Layout/Default/UserPanel";

const Page= () => {
  // Get ETH as a small number ("0.01" => "10000000000000000")
  const bigNumberify = (amt: string) => ethers.utils.parseEther(amt);

  const ethGa = "0.01";
  const ethVip = "0.02";
  const ethGaHex = bigNumberify(ethGa)._hex;
  const ethVipHex = bigNumberify(ethVip)._hex;
  const tickets = [
    {
      type: "ga",
      event: "ETH Atlantis",
      description: "General Admission Ticket",
      price: ethGa,
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: "vip",
      event: "ETH Atlantis",
      description: "VIP Ticket",
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ];

  return (
    <div className="mint-tickets">
      <Head>
        <title>ETH Atlantis 2022</title>
        <meta property="og:title" content="The largest underwater Ethereum event in history" key="title" />
      </Head>

      <Navigation />
      <Tickets tickets={tickets} />
      <TicketsOwned />
    </div>
  );
};

const Breadcrumb = ({}) => {
  
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