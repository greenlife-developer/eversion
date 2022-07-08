import React from "react";
import { Link } from "react-router-dom";
import "./register.css"

export default function Signup() {
  return (
    <div className="container">
      <div className="sign-up">
        <h1>Let's Sign you up</h1>
        <h6>
          Already created an account? <Link to="/login">Login</Link>
        </h6>
      </div>
      <div className="form">
        <div className="form-name">
          <div>
            <label htmlFor="f-name">First Name</label>
            <input type="text" name="fName" id="" />
          </div>
          <div>
            <label htmlFor="l-name">Last Name</label>
            <input type="text" name="lName" id="" />
          </div>
        </div>

      </div>
    </div>
  );
}
