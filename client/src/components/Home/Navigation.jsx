import React from "react";
import logo from "../../images/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";

export default function Navigation() {
  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={logo} alt="" />
        </Link>
      </div>
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li></li>
      </ul>
    </div>
  );
}
