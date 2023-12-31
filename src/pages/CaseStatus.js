import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CaseStatus.css";
import COMnavbar from './Home Page/components/COMnavbar'

import server_url from "./data/ServerUrl";

export default function CaseStatus() {
  // gets the route parameter (caseId) -- route param is /case-status/:caseId , here "caseId" is route param
  const { caseId } = useParams();

  const [status, setStatus] = useState(
    {
      assignedOfficer: null,
      caseStatus: null,
    });

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // use effect call backs should be async to prevent race conditions
    async function fetchAndSetStatus() {
      try {
        const resData = await axios.get(`${server_url}/case/${caseId}`, { withCredentials: true });

        setStatus({
          assignedOfficerName: resData.data.result.assignedOfficerName,
          caseStatus: resData.data.result.caseStatus,
        });
      } catch (error) {
        console.log(`Error while loading status`);
      }
      setLoading(false);
    }
    fetchAndSetStatus();
  },[caseId]);
  //IMP be sure to put [] as an argumet to useEffect otherwise it'll run after every render i.e infinitely

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <>    
    <COMnavbar/>`
    <div id="case-container">
      <div id="contents">
        <h1 className="black-text">Case ID: {caseId}</h1>
        <h3 className="black-text">Assigned Officer: {status.assignedOfficerName}</h3>
        <h3 className="black-text">Case Status: {status.caseStatus}</h3>
      </div>
    </div>
    </>

  );
}
