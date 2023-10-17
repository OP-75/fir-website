import React from "react";
import "./Registration.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Swa1 from "sweetalert2";

import servicingLocations from "./data/officerAreas";

import { useState } from "react";

import COMnavbar from './Home Page/components/COMnavbar'

import server_url from "./data/ServerUrl";

export default function Registration() {
  //imp u have to put useNavigate outside the handleSubmit(or any) function!!!
  const naviagte = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...userData, ...victimData, ...crimeData, additionalData };
    console.log(data);

    try {
      const response = await axios.post(`${server_url}/case`, data);
      console.log(response);
      if (response !== undefined) {
        const caseId = response.data.result._id;
        
        //Swa1 = alert window
        Swa1.fire({
          title: "Officer registered sucessfully",
          text: `Officer ID: ${caseId}`,
          type: "success",
        });
        naviagte(`/case-status/${caseId}`);
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
        title: "Failed to register your case",
        text: `${error}, ${error.response.data.msg}`,
        type: "error",
      });
    }

    console.log("Form submitted:", {
      userData,
      victimData,
      crimeData,
      additionalData,
    });
  };

  const [userData, setUserData] = useState({
    userName: null,
    userAge: null,
    userGender: null,
    userEmail: null,
    userAddress: null,
  });

  const [victimData, setVictimData] = useState({
    victimName: null,
    victimAge: null,
    victimGender: null,
    victimNumber: null,
    victimAddress: null,
    victimRelation: null,
  });

  const [crimeData, setCrimeData] = useState({
    crimeType: null,
    crimeDateTime: null,
    crimeArea: null,
    crimeAddress: null,
  });

  const [additionalData, setAdditionalData] = useState({
    proofOfCrime: null,
    witnesses: null,
    additionalInfo: "",
  });

  return (
    <div className="firForm">
      <COMnavbar/>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="col-1">
          <legend>Crime Details</legend>
          <select
            required
            value={crimeData.crimeType}
            onChange={(e) =>
              setCrimeData({ ...crimeData, crimeType: e.target.value })
            }
          >
            <option value="" disabled selected>
              Crime Committed *
            </option>
            <option value="Theft">Theft</option>
            <option value="Kidnapping">Kidnapping</option>
            <option value="Murder">Murder</option>
            <option value="Rape">Rape</option>
            <option value="Cyber Crime">Cyber Crime</option>
            <option value="Traffic">Traffic</option>
            <option value="Lost and Found">Lost and Found</option>
          </select>
          <select
            required
            value={crimeData.crimeArea}
            onChange={(e) =>
              setCrimeData({ ...crimeData, crimeArea: e.target.value })
            }
          >
            <option value="" disabled selected>
              Place of Crime *
            </option>
            {servicingLocations}
          </select>

          <input
            type="text"
            placeholder="Crime Address"
            value={crimeData.crimeAddress}
            onChange={(e) =>
              setCrimeData({ ...crimeData, crimeAddress: e.target.value })
            }
          />

          <input
            type="datetime-local"
            placeholder="Date and Time of Crime"
            value={crimeData.crimeDateTime}
            onChange={(e) =>
              setCrimeData({ ...crimeData, crimeDateTime: e.target.value })
            }
          />

          <legend>Victim Details</legend>
          <input
            type="text"
            placeholder="Victim Name *"
            value={victimData.victimName}
            onChange={(e) =>
              setVictimData({ ...victimData, victimName: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Victim Age"
            value={victimData.victimAge}
            onChange={(e) =>
              setVictimData({ ...victimData, victimAge: e.target.value })
            }
          />
          <select
            value={victimData.victimGender}
            onChange={(e) =>
              setVictimData({ ...victimData, victimGender: e.target.value })
            }
          >
            <option value="" disabled>
              Victim's Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Family Member Relation *"
            value={victimData.victimRelation}
            onChange={(e) =>
              setVictimData({ ...victimData, victimRelation: e.target.value })
            }
            required
          />
        </div>

        <div className="col-2">
          <legend>User Details</legend>
          <input
            type="text"
            placeholder="User Name *"
            value={userData.userName}
            onChange={(e) =>
              setUserData({ ...userData, userName: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="User Age *"
            value={userData.userAge}
            onChange={(e) =>
              setUserData({ ...userData, userAge: e.target.value })
            }
            required
          />
          <select
            value={userData.userGender}
            onChange={(e) =>
              setUserData({ ...userData, userGender: e.target.value })
            }
            required
          >
            <option value="" id="disabledOpt" disabled>
              Your Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="email"
            placeholder="User Email *"
            value={userData.userEmail}
            onChange={(e) =>
              setUserData({ ...userData, userEmail: e.target.value })
            }
            required
          />

          <legend>Additional Details</legend>
          <input
            type="file"
            capture="user"
            value={additionalData.proofOfCrime}
            onChange={(e) =>
              setAdditionalData({
                ...additionalData,
                proofOfCrime: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Witness Name   (Type your own name if you are witness)"
            value={additionalData.witnesses}
            onChange={(e) =>
              setAdditionalData({
                ...additionalData,
                witnesses: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Additional Info"
            value={additionalData.additionalInfo}
            onChange={(e) =>
              setAdditionalData({
                ...additionalData,
                additionalInfo: e.target.value,
              })
            }
          />
          <button type="submit">Submit Complaint</button>
        </div>
      </form>
    </div>
  );
}
