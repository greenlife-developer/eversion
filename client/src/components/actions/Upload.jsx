import React, {useState, useEffect} from "react";
import Navigation from "../Home/Navigation";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import "./actions.css";

export default function Upload() {

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
  })

    // isLogin && user.user

  return (
    <div className="upload">
      <Navigation />
      <div className="forms container-form">
        <div className="sign-up">
          <h2>Let's help you find a style</h2>
          <h6>
            You're about to make the best choice!
          </h6>
        </div>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <div className="form">
            <div className="form-name">
              <div>
                <label htmlFor="f-name">First Name</label>
                <input value={isLogin && user.user ? user.user.firstName: ""} type="text" name="fName" />
              </div>
              <div>
                <label htmlFor="l-name">Last Name</label>
                <input value={isLogin && user.user ? user.user.lastName: ""} type="text" name="lName" />
              </div>
            </div>
            <div className="signup-inputs">
              <div>
                <label htmlFor="Email">Email</label>
                <input value={isLogin && user.user ? user.user.email: ""} type="email" name="email" />
              </div>
              <div>
                <label htmlFor="phone">WhatsApp number</label>
                <input value={isLogin && user.user ? user.user.number: ""} type="number" name="number" />
              </div>
              <div>
                <label htmlFor="phone">Upload your photo(max. 2)</label>
                {/* <input type="file" name="image" id="" /> */}
                <FileUpload />
              </div>
              <div>
                <input type="submit" value="Submit" name="location" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
