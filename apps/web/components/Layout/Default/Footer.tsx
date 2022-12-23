import Link from "next/link"

const Footer = ({ }) => {
  return (
    <footer >
      <div className="footer-description">
        {/*<p className="footerText">
        Vivamus at pharetra sem. Maecenas lacinia lacus non tristique feugiat. Ut semper aliquet magna. Cras posuere pulvinar porttitor. 
        Ut eu blandit neque. Praesent posuere velit in eros efficitur tempor.
        </p>*/}
        <p>Read our 
        <a href="/"  rel="noreferrer"  target="_blank" style={{fontWeight: 500, color: "#da634a"}}> Privacy Policy </a>
        and  
        <a href="/"  rel="noreferrer"  target="_blank" style={{fontWeight: 500, color: "#da634a"}}> Terms & Conditions</a>
      .</p>
      </div>
      <div className="copy-right">
        © 2022 VAULTS. All Rights Reserved.
        </div>
    </footer>
  );
}

export default Footer;