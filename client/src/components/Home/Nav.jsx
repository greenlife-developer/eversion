import React, { useEffect } from "react";
import bgVideo from "../../images/videos/bgvideo.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "./nav.css";
import Navigation from "./Navigation";

export default function Nav() {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  fetch("/api")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <>
      <nav className="navigation">
        <video src={bgVideo} autoPlay muted loop className="myVideo">
          <source type="video/mp4" />
        </video>
        <div className="nav-content">
          <Navigation />
          <div className="banner-content">
            <div className="welcome-text">
              <h1 data-aos="fade-up">welcome to eversion</h1>
              <h4 data-aos="fade-down">No. 1 fashion e-commerce brand</h4>
              <Link
                data-aos="fade-right"
                to="/book"
                className="btn btn-primary main-action"
              >
                Book a fashion designer
              </Link>
              &nbsp;
              <Link
                data-aos="fade-left"
                to="/upload"
                className="btn btn-primary main-action"
              >
                Upload a picture
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
