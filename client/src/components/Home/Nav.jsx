import React from "react";
import logo from "../../images/logo.png";
import bgVideo from "../../images/videos/bgvideo.mp4";
import "./nav.css";

export default function Nav() {
  return (
    <>
      <nav className="navigation">
        <video src={bgVideo} autoPlay muted loop className="myVideo">
          <source type="video/mp4" />
        </video>
        <div className="nav-content">
          <div className="nav">
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
          </div>
          <div className="banner-content">
            <div className="welcome-text">
              <h1>welcome to eversion</h1>
              <h4>No. 1 fashion e-commerce brand</h4>
              <br />
              <a href="/" className="btn btn-primary">
                Book a fashion designer
              </a>
              &nbsp;
              <a href="/" className="btn btn-primary">
                Upload a picture
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
