import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./ViewOfficerDetails.css"


export default function ViewOfficerDetails(){

    const {officerId} = useParams()

    const [officerDetails, setOfficerDetails] = useState({})
    const [assignedCasesJSX, setAssignedCasesJSX] = useState()

    useEffect(()=>{

        async function fetchOfficerDetail(){

            try {
                const resData = await axios.get(`http://localhost:5000/officer/${officerId}`, {withCredentials:true})
                const data = resData.data.result
                console.log(data);

                setOfficerDetails(data)

                const resAssignedCases = await axios.get(`http://localhost:5000/case-of-officer/${officerId}`, {withCredentials:true})
                console.log(resAssignedCases);
                const assignedCases = resAssignedCases.data.result
                const jsxAssignedCases = assignedCases.map((caseJson)=>{
                    const caseId = caseJson._id;
                    return (
                        <li><Link to={`/cases/view-details/${caseId}`}>{caseId}</Link></li>
                    )
                })

                setAssignedCasesJSX(jsxAssignedCases);

            } catch (error) {
                console.error(error)
                window.alert(error)
            }

        }

        fetchOfficerDetail();

    },[officerId])

    return (
        <div className="officer-details">
            <p className="detail">Officer ID: <span>{officerDetails._id}</span></p>
            <p className="detail">Officer Name: <span>{officerDetails.officerName}</span></p>
            <p className="detail">Officer Rank: <span>{officerDetails.officerRank}</span></p>
            <p className="detail">Officer Email: <span>{officerDetails.officerEmail}</span></p>
            <p className="detail">Officer Designated Area: <span>{officerDetails.officerDesignatedArea}</span></p>
            <p className="detail">Assigned Cases:</p>
            <ul className="assigned-cases">
                {assignedCasesJSX}
            </ul>
        </div>
    );
    
}