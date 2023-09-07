import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

//this page is work in progress

export default function EditCase() {

    //to get route parameter (:caseId) use "useParams"
    const {caseId} = useParams();

    const [caseDetails, setCaseDetails] = useState({})
    

    useEffect(()=>{

        async function fetchData() {
            const resData = await axios.get(`http://localhost:5000/case/${caseId}`)
            // console.log(resData);
            setCaseDetails((prevDetails)=>{
                return {
                ...prevDetails, 
                "assignedOfficer": resData.data.result.assignedOfficer
                }
            })
            setCaseDetails((prevDetails)=>{
                return {
                ...prevDetails, 
                "caseStatus": resData.data.result.caseStatus
                }
            })
        }

        fetchData()
        
    },[caseId])

    function handleChange(e){
        const key = e.target.name
        const value = e.target.value

        setCaseDetails((prevVal)=>{
            return {
                ...prevVal,
                [key]:[value]
            }
        })
    }

    function handleSubmit() {
        
    }



    return(
        <div className="edit-case">
            <h4>Case ID: {caseId}</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="assignedOfficer" placeholder="Offier id to be assigned" value={caseDetails.assignedOfficer} onChange={handleChange} />
                <input type="checkbox" name="assignMe" id="" placeholder="Assign me" />
                <input type="text" name="caseStatus" placeholder="Case status" value={caseDetails.caseStatus} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

