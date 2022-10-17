import React, { useState } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import "./nav.css";
import { useEffect } from "react";

export default function Navigation() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api").then((data) => {
      console.log("axios get", data);
      if (data !== undefined) {
        setIsLogin(true);
        setUser(data.data);
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
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          className="dropbtx btn"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
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
                      <Link className="loggedli" to="/api/dashboard">
                        Dashboard
                      </Link>
                      <Link className="loggedli" to="/api/logout">
                        Logout
                      </Link>
                    </li>
                  </div>
                ) : (
                  <div className="not-loggedin">
                    <li>
                      <Link className="nav-links" to="/api/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-links" to="/api/register">
                        Register
                      </Link>
                    </li>
                  </div>
                )}
              </div>
            </div>
            <hr noshade />
            <div className="services">
              <h5>Services</h5>
              <li>
                <Link className="nav-links" to="/api/book">
                  <i class="fa-regular fa-calendar-check"></i> Book a designer
                </Link>
              </li>
              <li>
                <Link className="nav-links" to="/api/upload">
                  <i class="fa-solid fa-upload"></i> Upload an image
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
