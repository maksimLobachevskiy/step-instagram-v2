import React from "react";
import { ReactSVG } from "react-svg";
const Menu = (props) => {
  return (
    <header>
      <div className="container alignment-flex">
        <a href="#" className="logo">
          <img src="/img/Menu/logo_header.png" alt="logo" />
        </a>

        <nav className="nav">
          <ul>
            <li>
              <ReactSVG src="/img/Menu/home-house.svg" />
            </li>
            <li>
              <ReactSVG
                style={{ marginTop: "4px" }}
                src="/img/Menu/scanner_profile_icon.svg"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Menu;
