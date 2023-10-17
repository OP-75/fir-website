import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ViewCaseDetails.css"

export default function ViewCaseDetails() {
    const {caseId}  = useParams()

    const [caseDetails, setCaseDetails] = useState()

    useEffect(()=>{

        async function fetchDetails() {
            
            try {

                const resData = await axios.get(`http://localhost:5000/case/${caseId}`, { withCredentials: true });
                const myCase = resData.data.result
                setCaseDetails(myCase)
                
            } catch (error) {
                console.error(error);
                window.alert(error)
            }
            

        }


        fetchDetails()

    },[caseId])




    return (
        <div className="case-details">
            <h3 id="case-id">Case ID: {caseId}</h3>
            <div className="user-details">
                <p className="detail">Complainant's Name: {caseDetails?.userName}</p>
                <p className="detail">Complainant's Age: {caseDetails?.userAge}</p>
                <p className="detail">Complainant's Email: {caseDetails?.userEmail}</p>
            </div>
            <div className="victim-details">
                <p className="detail">Victim's Name: {caseDetails?.victimName}</p>
                <p className="detail">Victim's Age: {caseDetails?.victimAge}</p>
                <p className="detail">Victim's Gender: {caseDetails?.victimGender}</p>
                <p className="detail">Victim's Phone number: {caseDetails?.victimNumber}</p>
                <p className="detail">Victim's Address: {caseDetails?.victimAddress}</p>
                <p className="detail">Complaint's relation to victim: {caseDetails?.victimRelation}</p>
            </div>
            <div className="crime-details">
                <p className="detail">Type of crime: {caseDetails?.crimeType}</p>
                <p className="detail">Date & time of incident: {caseDetails?.crimeDateTime}</p>
                <p className="detail">Place of incident: {caseDetails?.crimeAddress}</p>
                <p className="detail">Area of jurisdiction: {caseDetails?.crimeArea}</p>
                <p className="detail">Witnesses: {caseDetails?.witnesses}</p>
    
                <p className="officer-info">Assigned officer ID: {caseDetails?.assignedOfficer}</p>
                <p className="officer-info">Assigned officer name: {caseDetails?.assignedOfficerName}</p>
    
                <p className="case-status">Case Status: {caseDetails?.caseStatus}</p>
            </div>
        </div>
    );
    


}