import React from "react";
import axios from "axios";

import servicingAreas from "./data/officerAreas";
import { useState } from "react";

import Swa1 from "sweetalert2";

import "./RegisterNewOfficer.css"

import server_url from "./data/ServerUrl";

/* 
    'officerName'
    'officerRank'
    'officerEmail'
    "officerDesignatedArea"
    'officerPassword' (default = "password", required = false)
*/

export default function RegisterNewOfficer(params) {
  const [data, setData] = useState({
    officerName: null,
    officerRank: null,
    officerEmail: null,
    officerDesignatedArea: null,
  });

  const handleChange = (event) => {
    let inputVal = event.target.value;
    const in_name = event.target.name;

    if(inputVal===""){
        inputVal = null
    }

    setData((prevData) => {
      prevData[in_name] = inputVal;
      return prevData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server_url}/officer`, data,{ withCredentials: true });

      if (response !== undefined) {
        console.log(response);
        const officerId = response.data.result._id;

        Swa1.fire({
          title: "Officer registered sucessfully",
          text: `Officer ID: ${officerId}`,
          type: "success",
        });
      } else {
        // Handle the case when the response does not have the expected structure
        Swa1.fire({
          title: "Error registering officer",
          text: "The server response is missing the expected data.",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swa1.fire({
        title: "Failed to register officer",
        text: `${error}, ${error.response.data.msg}`,
        type: "error",
      });
    }
  };

  const officerRankJSX = [
    <option value="">Select rank</option>,
    <option value="Constable">Constable</option>,
    <option value="Commisioner">Commisioner</option>,
  ]

  return (
    <div className="register-new-officer">
      <form>
        <h2>Register new officer</h2>
        <input
          type="text"
          placeholder="Officer name"
          name="officerName"
          onChange={handleChange}
          required
        />
        <select name="officerRank" id="officer-rank" onChange={handleChange}>
          {officerRankJSX}
        </select>
        <input
          type="email"
          placeholder="Officer Email"
          name="officerEmail"
          onChange={handleChange}
          required
        />
        <select name="officerDesignatedArea" onChange={handleChange} required>
          {servicingAreas}
        </select>

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );}
