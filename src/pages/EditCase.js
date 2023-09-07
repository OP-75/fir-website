import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "./EditCase.css"

export default function EditCase() {
  //to get route parameter (:caseId) use "useParams"
  const { caseId } = useParams();

  const [caseDetails, setCaseDetails] = useState({});
  const [currentOfficerId, setCurrentOfficerId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const resData = await axios.get(`http://localhost:5000/case/${caseId}`, {
        withCredentials: true,
      });
      // console.log(resData);
      setCaseDetails((prevDetails) => {
        return {
          ...prevDetails,
          assignedOfficer: resData.data.result.assignedOfficer,
        };
      });
      setCaseDetails((prevDetails) => {
        return {
          ...prevDetails,
          caseStatus: resData.data.result.caseStatus,
        };
      });

      //get current officer id as well to verify before porcceding
      try {
        const axiosRes = await axios.get(
          `http://localhost:5000/get-current-officer-id`,
          { withCredentials: true }
        );
        const currOfficerId = axiosRes.data.result;
        setCurrentOfficerId(currOfficerId);
      } catch (error) {
        console.error(error);
        const errorMsg = error.response.data.error;
        if (errorMsg === "Please login") {
          window.alert(errorMsg);
          navigate("/login");
        }
      }
    }

    fetchData();
  }, [caseId]);




  const [isCurrentUserAssignedOfficer, setIsCurrentUserAssignedOfficer] =
    useState(false);

  async function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;

    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setIsCurrentUserAssignedOfficer(true);
        setCaseDetails((prevDetails) => {
          return {
            ...prevDetails,
            assignedOfficer: currentOfficerId,
          };
        });
      } else {
        setIsCurrentUserAssignedOfficer(false);
        setCaseDetails((prevDetails) => {
          return {
            ...prevDetails,
            assignedOfficer: "",
          };
        });
      }
    } else {
      setCaseDetails((prevVal) => {
        return {
          ...prevVal,
          [key]: value,
        };
      });
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/case/${caseId}`,
        caseDetails,
        { withCredentials: true }
      );
    } catch (error) {
        const errorMsg = error.response.data.error;
        window.alert(errorMsg);
    }
    navigate("/cases-list")
  }

  return (
    <div className="edit-case">
      <h4>Case ID: {caseId}</h4>
      <form className="edit-case" onSubmit={handleSubmit}>
        <input
          type="text"
          name="assignedOfficer"
          placeholder="Offier id to be assigned"
          value={caseDetails.assignedOfficer}
          onChange={handleChange}
          disabled={isCurrentUserAssignedOfficer}
        />
        <label htmlFor="assignMe">Assign me as officer
        <input
          type="checkbox"
          name="assignMe"
          id="assignMe"
          checked={isCurrentUserAssignedOfficer}
          onChange={handleChange}
        />
        </label>
        <input
          type="text"
          name="caseStatus"
          placeholder="Case status"
          value={caseDetails.caseStatus}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
