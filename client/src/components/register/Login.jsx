import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import mock from "../../images/logomock.png";
import Navigation from "../Home/Navigation";


export default function Login() {

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/login")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.query)
      if (data !== undefined) {
        setIsLogin(true);
        setUser(data);
      }
    });
  })

  return (
    <div id="login" className="registration login">
      <Navigation/>
      <div className="container-form">
        <div className="forms-info">
          <img
            src={mock}
            alt=""
          />
          <span>An online platform where you can shop everything fashion.</span>
          <span> 
            Users can search for anything they want to buy by just uploading the
            picture of the item and we will get it across to them.
          </span>
          <span>
            We connect people who wants to get their wears sewn to our trusted,
            reliable and trend fashion designers.
          </span> 
        </div>
        <div className="forms">
          <div className="sign-up">
            <h2>Welcome, please log in</h2>
            <h6>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </h6>
          </div>
          <form action="/login" method="post">
            <div className="form">
              <div className="signup-inputs">
                <div>
                  <label htmlFor="Email">Email</label>
                  <input type="email" name="email" id="" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="" />
                </div>
                <div>
                  <input type="submit" value="Sign Up" name="location" id="" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
