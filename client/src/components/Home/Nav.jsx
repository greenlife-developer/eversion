import React, { useEffect } from "react";
import bgVideo from "../../images/videos/bgvideo.mp4";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../images/logo.png";
import styles from "../../styles";
import Navigation from "./Navigation";
import about from "../../images/aboutimg.jpg"
import Faq from "./Faq";
import Swipper from "./Swipper";

export default function Nav() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
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
      <div className="container content-container">
        <div className="who-we-are">
          <h1>Our story</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            magnam!
          </p>
          <div className="body-content">
            <div className="first-child">
              <img
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                src={logo}
                alt=""
              />
              <div className="">
                <h6>Who we are</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  dolores et tenetur laboriosam temporibus, cupiditate ipsum.
                  Sint neque id sequi repellat quis, repudiandae minima
                  praesentium deserunt dolore ea, mollitia debitis provident,
                  alias ipsam cupiditate soluta fugit tempore sapiente. Odit
                  harum corrupti ipsa possimus quam deserunt ad, illo ipsum
                  officia, quaerat placeat expedita modi sapiente esse enim
                  aliquid! Deleniti culpa fugiat provident doloribus. Aliquid,
                  cum tempora. Sed velit tempora provident in?
                </p>
              </div>
            </div>
            <div className="first-child second-child">
              <i
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  marginRight: ".5rem",
                }}
                class="fa-solid fa-check-double"
              ></i>
              <div className="">
                <h6>Why choose eversion?</h6>
                <div className="why-us">
                  <i class="fa-solid fa-bag-shopping"></i>
                  <span>
                    An online platform where you can shop everything fashion.
                  </span>
                </div>
                <div className="why-us">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <span>
                    Users can search for anything they want to buy by just
                    uploading the picture of the item and we will get it across
                    to them.
                  </span>
                </div>
                <div className="why-us">
                  <i class="fa-solid fa-share-nodes"></i>
                  <span>
                    We connect people who wants to get their wears sewn to our
                    trusted, reliable and trend fashion designers.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container swiper">
        <div className="">
          <h1>What our customer's say</h1>
          <div className="swiper-content">
            <Swipper />
          </div>
        </div>
      </div>

      <div className="customer-reviews">
        <div className="container experiences">
          <h1>What we have done in the past</h1>
          <h6>See what our customer's have to say...</h6>
          <div className="works-container">
            <div class="works">
              {styles.map((style, id) => {
                return (
                  <div className="work" key={id}>
                    <img src={style.img} alt={style.name} />
                    <div className="works-text">
                      <div className="action-flex">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <i class="fa-solid fa-scissors"></i>
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="about-eversion">
        <div className="about-container">
          <h1>About us</h1>
          <div className="about-body">
            <div className="about-img">
              <img src={about} width="300px" height="300px" alt="" />
            </div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              iste dicta quis molestiae dolorem aperiam quisquam similique nisi
              animi minus inventore adipisci eius provident tenetur, doloribus,
              ullam autem. Dolores, qui! Alias inventore voluptas, possimus
              rerum illum, aliquam eaque voluptatem amet adipisci nesciunt fugit
              veritatis animi doloremque esse facere dolore reprehenderit?
            </p> <br /><br />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              iste dicta quis molestiae dolorem aperiam quisquam similique nisi
              animi minus inventore adipisci eius provident tenetur, doloribus,
              ullam autem. Dolores, qui! Alias inventore voluptas, possimus
              rerum illum, aliquam eaque voluptatem amet adipisci nesciunt fugit
              veritatis animi doloremque esse facere dolore reprehenderit?
            </p>
          </div>
        </div>
      </div>

      <div className="faq">
        <div className="faq-container">
          <h1>Frequesntly Asked Questions</h1>
          <div className="">
            <Faq />
          </div>
        </div>
      </div>

      <footer>
        <div className="footer">
          <div className="icons">
            <i class="fa-brands fa-linkedin"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-instagram"></i>
          </div>
          
        </div>
      </footer>
    </>
  );
}
