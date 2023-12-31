import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CasesList.css";
import './OfficerList.css'

import "./buttons/OfficerDeleteButton";
import OfficerDeleteButton from "./buttons/OfficerDeleteButton";

import { Link } from "react-router-dom";

import { AiFillEye } from "react-icons/ai";
import { IconContext } from "react-icons";

import server_url from "./data/ServerUrl";


export default function CasesList() {
  const [casesList, setCasesList] = useState(null);

  useEffect(() => {
    async function fetchCases(params) {
      try {
        const response = await axios.get(`${server_url}/all-officers`, {
          withCredentials: true,
        });
        console.log(response);
        const { result } = response.data;

        const casesJsx = result.map((item) => {
          return (
            <tr>
              <td>{item._id}</td>
              <td>{item.officerName}</td>
              <td>{item.officerRank}</td>
              <td>{item.officerEmail}</td>
              <td>{item.officerDesignatedArea}</td>
              <td className="view-button">
                <Link to={`/cases/view-officer-details/${item._id}`}>
                  <IconContext.Provider
                    value={{ color: "black", size: 40 }}>
                    <AiFillEye className="on-hover-pointer"/>
                  </IconContext.Provider>
                </Link>
              </td>
              <td className="delete-button">
                {" "}
                <OfficerDeleteButton officerId={item._id} />{" "}
              </td>
            </tr>
          );
        });

        setCasesList(casesJsx);
      } catch (error) {
        console.log(error);
        window.alert(error.response.data.msg);
      }
    }

    fetchCases();
  }, []);

  return (
    <div id="officer-container">
      <table>
        <tr>
          <th>officerId</th>
          <th>officerName</th>
          <th>officerRank</th>
          <th>officerEmail</th>
          <th>officerDesignatedArea</th>
          <th>View details</th>
          <th>Delete</th>
        </tr>

        {casesList}
      </table>
    </div>
  );
}
