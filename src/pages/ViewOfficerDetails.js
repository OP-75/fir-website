import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


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

    return(
        <div className="officer-details">
                <p className="detail"> Officer ID: {officerDetails._id} </p>
                <p className="detail"> Officer name:  {officerDetails.officerName}</p>
                <p className="detail"> Officer Rank:  {officerDetails.officerRank}</p>
                <p className="detail"> Officer Email:  {officerDetails.officerEmail}</p>
                <p className="detail"> Officer Designated Area:  {officerDetails.officerDesignatedArea}</p>
                <ul>
                    {assignedCasesJSX}
                </ul>
        </div>
    );
}