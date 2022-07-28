import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mock from "../../images/file.jpeg";
import "./actions.css";
import Navigation from "../Home/Navigation";
import styles from "../../styles";
import FileUpload from "./FileUpload";

export default function Book() {
  const [style, setStyle] = useState((e) => {return e});
  const [type, setType] = useState(null);

  const handleChange = (e) => {
    setStyle(e.target.value);
  };

  useEffect(() => {
  if(style){
    const result = styles.filter((std) => {
      return std.name === style;
    });
    setType(result);
  }
  }, [style]);

  console.log("result we get back ", type);

  return (
    <div className="book">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms-info">
            <img src={mock} alt="selected style" />
          </div>
          <div className="forms">
            <div className="sign-up">
              <h2>Let's Sign you up</h2>
              <h6>
                Already created an account? <Link to="/login">Login</Link>
              </h6>
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
                      {type && type.available_styles !== undefined ? type.available_styles.map((item, id) => {
                        console.log("HEllo here")
                          return <option key={id} value={item}>
                                {item}
                              </option>
                        }) : null}
                    </select>
                  </div>
                </div>
                <div className="signup-inputs">
                  <div>
                    <label htmlFor="phone">Upload your photo</label>
                    <FileUpload />
                  </div>
                  <div>
                    <label htmlFor="password">Location</label>
                    <input type="location" name="location" />
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
