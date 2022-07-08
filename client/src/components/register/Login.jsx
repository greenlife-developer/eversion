import React from "react";
import {Link} from "react-router-dom";

export default function Login() {
  return (
    <div className="container">
      <div className="sign-up">
        <h1>Welcome! Please login</h1>
        <h6>Don't have an account? <Link to="/signup">Sign Up</Link></h6>
      </div>
    </div>
  );
}
