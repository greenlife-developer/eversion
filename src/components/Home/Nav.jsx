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
          Your browser does not support HTML5 video.
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
            </div>
            <div className="welcome-img">
              <img src="" alt="welcome-img" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
