import React, {useState} from "react";
import Navigation from "../Home/Navigation";
import { Link } from "react-router-dom";
import FileUpload from "./FileUpload";
import "./actions.css";

export default function Upload() {

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
        <form action="/upload" method="post">
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
                <label htmlFor="phone">WhatsApp number</label>
                <input type="number" name="phone" />
              </div>
              <div>
                <label htmlFor="phone">Upload your photo(max. 2)</label>
                <input type="file" name="image" id="" />
                {/* <FileUpload
                  name="style-upload"
                  handlePreview={handlePreview}
                  handleCancel={handleCancel}
                  previewImage={previewImage}
                  previewTitle={previewTitle}
                /> */}
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
