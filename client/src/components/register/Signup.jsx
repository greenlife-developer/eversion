import React from "react";
import { Link } from "react-router-dom";
import mock from "../../images/logomock.png";
import Navigation from "../Home/Navigation";
import "./register.css";

export default function Signup() {
  return (
    <div className="registration">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms-info">
            <img src={mock} alt="" />
            <span>
              An online platform where you can shop everything fashion.
            </span>
            <span>
              Users can search for anything they want to buy by just uploading
              the picture of the item and we will get it across to them.
            </span>
            <span>
              We connect people who wants to get their wears sewn to our
              trusted, reliable and trend fashion designers.
            </span>
          </div>
          <div className="forms">
            <div className="sign-up">
              <h2>Let's Sign you up</h2>
              <h6>
                Already created an account? <Link to="/login">Login</Link>
              </h6>
            </div>
            <form action="/register" method="post">
              <div className="form">
                <div className="form-name">
                  <div>
                    <label htmlFor="f-name">First Name</label>
                    <input type="text" name="fName" />
                  </div>
                  <div>
                    <label htmlFor="l-name">Last Name</label>
                    <input type="text" name="lName" />
                  </div>
                </div>
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="email" />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                  </div>
                  <div>
                    <label htmlFor="number">Number</label>
                    <input type="number" name="number" />
                  </div>
                  <div>
                    <input type="submit" value="Sign Up" name="location" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
