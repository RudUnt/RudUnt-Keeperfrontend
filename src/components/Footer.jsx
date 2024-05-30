import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Made in <span style={{fontWeight: "bolder"}}>INDIA</span> with ❤️ Rudresh Untwal </p>
    </footer>
  );
}

export default Footer;
