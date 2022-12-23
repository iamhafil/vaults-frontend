import Link from "next/link";
import { ethers } from "ethers";
import { useListen } from "../../../hooks/useListen";
import { useMetaMask } from "../../../hooks/useMetaMask";

import {
  NavigationView,
  Balance,
  RightNav,
  Logo,
} from "../.././styledComponents/navigation";
import { SiEthereum } from "react-icons/si";
import { Button } from "antd";

export default function Header() {
  const {
    dispatch,
    state: { status, isMetaMaskInstalled, wallet, balance },
  } = useMetaMask();

  console.log(
    "status, isMetaMaskInstalled, wallet, balance",
    status,
    isMetaMaskInstalled,
    wallet,
    balance
  );

  const listen = useListen();

  const showInstallMetaMask =
    status !== "pageNotLoaded" && !isMetaMaskInstalled;
  const showConnectButton =
    status !== "pageNotLoaded" && isMetaMaskInstalled && !wallet;

  const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

  const handleConnect = async () => {
    dispatch({ type: "loading" });
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (accounts.length > 0) {
      const balance = await window.ethereum!.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      dispatch({ type: "connect", wallet: accounts[0], balance });

      // we can register an event listener for changes to the user's wallet
      listen();
    }
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnect" });
  };

  const formatAddress = (addr: string) => {
    return `${addr.substr(0, 6)}...${addr.substr(-4)}`;
  };

  return (
    <header className="connex-header mobile-none">
      <nav className="connex-nav">
        <ul className="menu-list"></ul>
        <div className="connec_nav_suportLg">
          {showConnectButton && (
            <li textSize={10} onClick={handleConnect}>
              <Button className="disconnect">
                {status === "loading" ? "loading..." : "Connect Wallet"}
              </Button>
            </li>
          )}

          {showInstallMetaMask && (
            <Link href="https://metamask.io/" target="_blank">
              Install MetaMask
            </Link>
          )}

          {wallet && balance && (
            <>
              {isConnected && (
                <Button
                  className="disconnect"
                  textSize={10}
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              )}
              <span className="support">
                <Link href={`https://etherscan.io/address/${wallet}`}>
                  {formatAddress(wallet)}
                </Link>
              </span>
            </>
          )}

          <span className="language">
            {wallet && balance && (
              <Balance>
                {(parseInt(balance) / 1000000000000000000).toFixed(6)} ETH
              </Balance>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
}
