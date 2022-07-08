import React, {useEffect} from "react";
import logo from "../../images/logo.png";
import bgVideo from "../../images/videos/bgvideo.mp4";
import AOS from "aos";
import 'aos/dist/aos.css';
import {Link} from "react-router-dom";
import "./nav.css";

export default function Nav() {

  useEffect(() => {
    AOS.init({
      duration : 1000
    });
    AOS.refresh();
  }, []);

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
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
              <li></li>
            </ul>
          </div>
          <div className="banner-content">
            <div className="welcome-text">
              <h1 data-aos="fade-up">welcome to eversion</h1>
              <h4 data-aos="fade-down">No. 1 fashion e-commerce brand</h4>
              <br />
              <Link data-aos="fade-right" to="/book" className="btn btn-primary">
                Book a fashion designer
              </Link>
              &nbsp;
              <Link data-aos="fade-left" to="/upload" className="btn btn-primary">
                Upload a picture
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
