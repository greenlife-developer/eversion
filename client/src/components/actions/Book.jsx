import React, { useState, useEffect } from "react";
import "./actions.css";
import Navigation from "../Home/Navigation";
import styles from "../../styles";
import FileUpload from "./FileUpload";
import axios from "axios";
import { City }  from 'country-state-city';

export default function Book() {
  const [style, setStyle] = useState(null);
  const [city, setCity] = useState(null);

  const handleChange = (e) => {
    setStyle(e.target.value);
  };

  const handleState = (e) => {
    setCity(e.target.value)
  }

  const result = styles.filter((std) => {
    return std.name === style;
  });

  const [states, setStates] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api").then((data) => {
      console.log("axios get",data)
        if (data !== undefined) {
          setStates(data.data.states);
        }
    });
  }, []);

  let result2 = null

  if(states && city){
    result2 = states.filter((std) => {
      return std.name === city;
    });
  }

  let newCity = null

   if(result2){
     newCity = City.getCitiesOfState(result2[0].countryCode, result2[0].isoCode)
   }

      
  // console.log("New City", newCity)
  // console.log("result we get back ", result2);

  return (
    <div className="book">
      <Navigation />
      <div className="eversion-container">
        <div className="container-form">
          <div className="forms-info">
            <img
              src={result && result.length === 1 ? result[0].img : styles[0].img}
              alt="selected style"
            />
          </div>
          <div className="forms">
            <div className="sign-up">
              <h2>Book a fashion deigner</h2>
              <h6>We look forward to delivering what you need.</h6>
            </div>
            <form action="/book" method="post" encType="multipart/form-data">
              <div className="form">
                <div className="form-name">
                  <div>
                    <label htmlFor="sew">I want to sow? </label>
                    <select
                      onChange={handleChange}
                      className="sew"
                      name="sew"
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
                      <input
                        type="text"
                        name="measurement"
                        placeholder="Separate with comma"
                      />
                    </div>
                    <div>
                      <label htmlFor="fabric">I have my fabric?</label>
                      <select className="style" name="fabric">
                        <option value="yes"> Yes</option>
                        <option value="no"> No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="number">Number</label>
                    <input type="number" name="number" placeholder="WhatsApp" />
                  </div>
                  <div>
                    <label htmlFor="phone">
                      Upload your photo(Do you have a specific style?)
                    </label>
                    <FileUpload />
                  </div>
                  <div className="form-name">
                    <div>
                      <label htmlFor="state">State</label>
                      <select className="style" onChange={handleState} name="state">
                      { states ? states.map((item, id) => {
                        return (
                          <option key={id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      }) : null }
                      </select>
                    </div>
                    <div>
                      <label htmlFor="city">City</label>
                      <select className="style" name="city">
                      { newCity ? newCity.map((item, id) => {
                        return (
                          <option key={id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      }) : null }
                      </select>
                    </div>
                  </div>
                  <div className="street">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                      />
                  </div>
                  <div className="check">
                    <input type="checkbox" name="nostyle" />
                    <label htmlFor="select">
                      I did not find my style, come with more styles
                    </label>
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Submit your request"
                    />
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
