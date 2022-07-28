import React, { useState } from "react";
import logo from "../../images/logo.png";
import avatar from "../../images/avatar.png";
import { Link, NavLink } from "react-router-dom";
import "./nav.css";
import { useEffect } from "react";

export default function Navigation() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      if (data !== undefined) {
        setIsLogin(true);
        setUser(data);
      }
    });
  }, [])

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={logo} alt="" />
        </Link>
      </div>
      <div className="btn-group">
        <div
          className="dropdown-toggle dropbtx"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="dropdown-menu dropdown-menu-end">
          <div>
            <h5>Account</h5>
            <div className="users">
              <div className="user-info">
                <img src={avatar} alt="" /> 
              </div>
              <div className="user-login">
                {isLogin && user.user ? (
                  <div>
                    <li>
                      <label htmlFor="">
                        {user.user.firstName + " " + user.user.lastName}
                      </label>
                    </li>
                    <li>
                      <label htmlFor="">{user.user.email}</label>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link> &nbsp;&nbsp;
                      <Link to="/logout">Logout</Link>
                    </li>
                  </div>
                ) : (
                  <div>
                    <li>
                      <NavLink className="nav-links" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-links" to="/register">
                        Register
                      </NavLink>
                    </li>
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr />
          <div className="services">
            <h5>Services</h5>
            <li>
              <NavLink className="nav-links" to="/book">
                Book a designer
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-links" to="/upload">
                Upload an image
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
