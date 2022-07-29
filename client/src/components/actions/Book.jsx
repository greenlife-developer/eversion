import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mock from "../../images/file.jpeg";
import "./actions.css";
import Navigation from "../Home/Navigation";
import styles from "../../styles";
import FileUpload from "./FileUpload";

export default function Book() {
  const [style, setStyle] = useState(null);

  const handleChange = (e) => {
    setStyle(e.target.value);
  };

  const result = styles.filter((std) => {
    return std.name === style;
  });

  // console.log("result we get back ", result);

  return (
    <div className="book">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms-info">
            <img
              src={result && result.length === 1 ? result[0].img : mock}
              alt="selected style"
            />
          </div>
          <div className="forms">
            <div className="sign-up">
              <h2>Book a fashion deigner</h2>
              <h6>We look forward to delivering what you need.</h6>
            </div>
            <form action="/book" method="post">
              <div className="form">
                <div className="form-name">
                  <div>
                    <label htmlFor="what-to-sow">
                      What do you want to sow?{" "}
                    </label>
                    <select
                      onChange={handleChange}
                      className="sow"
                      name="what-to-sow"
                    >
                      {styles.map((item, id) => {
                        return (
                          <option key={id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="style">Select a style</label>
                    <select className="style" name="styles">
                      {result && result.length === 1
                        ? result[0].available_styles.map((item, id) => {
                            return (
                              <option key={id} value={item}>
                                {item}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                </div>
                <div className="signup-inputs">
                  <div className="form-name">
                    <div>
                      <label htmlFor="measurement">Your measurements</label>
                      <input type="text" name="measurement" placeholder="Come and get my measurement?" />
                    </div>
                    <div>
                      <label htmlFor="fabric">Do you have a fabric?</label>
                      <input type="text" name="fabric" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="number">Number</label>
                    <input type="number" name="number" placeholder="WhatsApp"/>
                  </div>
                  <div>
                    <label htmlFor="phone">Upload your photo(Do you have a specific style?)</label>
                    <FileUpload />
                  </div>
                  <div className="form-name">
                    <div>
                      <label htmlFor="street">Street</label>
                      <input type="text" name="street" placeholder="Street" />
                    </div>
                    <div>
                      <label htmlFor="area">Area</label>
                      <input type="text" name="area" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <input type="state" name="state" />
                  </div>
                  <div className="check">
                    <input type="checkbox" name="select" />
                    <label htmlFor="select">I did not find my style, come with more styles</label>
                  </div>
                  <div>
                    <input type="submit" value="Submit your request" name="location" />
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
