import React, { useState, useEffect } from "react";
import Navigation from "../Home/Navigation";
import FileUpload from "./FileUpload";
import { City } from "country-state-city";
import "./actions.css";

export default function Upload() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [states, setStates] = useState(null);
  const [city, setCity] = useState(null);

  const handleState = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        if (data !== undefined) {
          setIsLogin(true);
          setUser(data);
          setStates(data.states);
        }
      });
  });

  let result = null;

  if (states && city) {
    result = states.filter((std) => {
      return std.name === city;
    });
  }

  let newCity = null;

  if (result) {
    newCity = City.getCitiesOfState(result[0].countryCode, result[0].isoCode);
  }

  // isLogin && user.user

  return (
    <div className="upload">
      <Navigation />
      <div className="eversion-container">
        <div className="forms container-form">
          <div className="sign-up">
            <h2>Let's help you find a style</h2>
            <h6>You're about to make the best choice!</h6>
          </div>
          <form action="/upload" method="post" encType="multipart/form-data">
            <div className="form">
              <div className="form-name">
                <div>
                  <label htmlFor="f-name">First Name</label>
                  <input
                    defaultValue={
                      isLogin && user.user ? user.user.firstName : ""
                    }
                    type="text"
                    name="fName"
                  />
                </div>
                <div>
                  <label htmlFor="l-name">Last Name</label>
                  <input
                    defaultValue={
                      isLogin && user.user ? user.user.lastName : ""
                    }
                    type="text"
                    name="lName"
                  />
                </div>
              </div>
              <div className="signup-inputs">
                <div>
                  <label htmlFor="Email">Email</label>
                  <input
                    defaultValue={isLogin && user.user ? user.user.email : ""}
                    type="email"
                    name="email"
                  />
                </div>
                <div>
                  <label htmlFor="phone">WhatsApp number</label>
                  <input
                    defaultValue={isLogin && user.user ? user.user.number : ""}
                    type="number"
                    name="number"
                  />
                </div>
                <div>
                  <label htmlFor="phone">Upload your photo</label>
                  <FileUpload />
                </div>
                <div className="form-name">
                  <div>
                    <label htmlFor="state">State</label>
                    <select
                      className="style"
                      onChange={handleState}
                      name="state"
                    >
                      {states
                        ? states.map((item, id) => {
                            return (
                              <option key={id} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })
                        : null}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <select className="style" name="city">
                      {newCity
                        ? newCity.map((item, id) => {
                            return (
                              <option key={id} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })
                        : <option value="select-city">Select city</option>}
                    </select>
                  </div>
                </div>
                <div className="street">
                  <label htmlFor="address">Address</label>
                  <input type="text" name="address" placeholder="Address" />
                </div>
                <div>
                  <input type="submit" value="Submit" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
