import React, { useEffect, useState } from "react";
import axios from "axios";
import './CasesList.css'

import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { IconContext } from "react-icons";



export default function CasesList() {


    const [casesList, setCasesList] = useState(null)
    const result = null;

    useEffect(()=>{

        async function fetchCases(params) {
            try {
                const response = await axios.get("http://localhost:5000/case")
                console.log(response);
                const {result} = response.data

                const casesJsx = result.map((item)=>{
                    return(
                        <tr>
                            <td>{item.userName}</td>
                            <td>{item.victimName}</td>
                            <td>{item.crimeArea}</td>
                            <td>{item.crimeAddress}</td>
                            <td>{item.crimeDateTime}</td>
                            <td>{item.createdAt.substring(0,10)}</td>
                            <td>{item.assignedOfficer}</td>
                            <td>{item.caseStatus}</td>
                            <td className="edit-button"><Link to={`/cases/edit/${item._id}`}><IconContext.Provider value={{ color: 'black', size: '15px' }}>
                                <AiFillEdit/>
                                </IconContext.Provider></Link></td>

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
                    <th>Complainant's name</th>
                    <th>Victim's name</th>
                    <th>City</th>
                    <th>Adderss of Incident</th>
                    <th>Time of Incident</th>
                    <th>Time of Report</th>
                    <th>Assigned Officer</th>
                    <th>Case Status</th>
                    <th>Edit</th>
                </tr>

                {casesList}

            </table>

        </div>
    );
}



