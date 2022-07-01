import React from "react";
import logo from "../../images/logo.png";
import "./nav.css";

export default function Nav() {
  return (
    <nav className="navigation">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li>
          <a href="/">Login</a>
        </li>
        <li>
          <a href="/">Register</a>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}
