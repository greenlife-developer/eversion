import React, { useState } from "react";
import logo from "../../images/logo.png";
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
  }, []);

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src={logo} alt="" />
        </Link>
      </div>
      <div className="btn-group">
        <div
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="dropbtx"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body user-information">
            <div>
              <h5>Account</h5>
              <div className="users">
                {isLogin && user.user ? (
                  <div className="loggedin">
                    <p>{user.user.firstName + " " + user.user.lastName}</p>
                    <p>{user.user.email}</p>
                    <li>
                      <Link className="loggedli" to="/api/dashboard">Dashboard</Link>
                      <Link className="loggedli" to="/api/logout">Logout</Link>
                    </li>
                  </div>
                ) : (
                  <div className="not-loggedin">
                    <li>
                      <NavLink className="nav-links" to="/api/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-links" to="/api/register">
                        Register
                      </NavLink>
                    </li>
                  </div>
                )}
              </div>
            </div>
            <hr noshade/>
            <div className="services">
              <h5>Services</h5>
              <li>
                <NavLink className="nav-links" to="/api/book">
                  <i class="fa-regular fa-calendar-check"></i> Book a designer
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-links" to="/api/upload">
                  <i class="fa-solid fa-upload"></i> Upload an image
                </NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
