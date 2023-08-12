import React, { useEffect, useState } from "react";
import axios from "axios";
import './CasesList.css'

import './buttons/OfficerDeleteButton'
import OfficerDeleteButton from "./buttons/OfficerDeleteButton";


/* 
    'officerName'
    'officerRank'
    'officerEmail'
    "officerDesignatedArea"
    'officerPassword'
*/


export default function CasesList() {


    const [casesList, setCasesList] = useState(null)

    useEffect(()=>{

        async function fetchCases(params) {
            try {
                const response = await axios.get("http://localhost:5000/officer",{ withCredentials: true })
                console.log(response);
                const {result} = response.data

                const casesJsx = result.map((item)=>{
                    return(
                        <tr>
                            <td>{item.officerName}</td>
                            <td>{item.officerRank}</td>
                            <td>{item.officerEmail}</td>
                            <td>{item.officerDesignatedArea}</td>
                            <td className="delete-button"> <OfficerDeleteButton officerId = {item._id} /> </td>

                        </tr>
                    )
                });

                setCasesList(casesJsx);

            } catch (error) {
                console.log(error);
                setCasesList(error);
            }

            
        }

        fetchCases()

    },[])


    return(
        <div id="cases-container">

            <table>

                <tr>
                    <th>officerName</th>
                    <th>officerRank</th>
                    <th>officerEmail</th>
                    <th>officerDesignatedArea</th>
                    <th>Edit</th>
                </tr>

                {casesList}

            </table>

        </div>
    );
}



