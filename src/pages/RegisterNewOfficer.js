import React from "react";
import axios from "axios";

import servicingAreas from'./data/officerAreas';
import { useState } from "react";


/* 
    'officerName'
    'officerRank'
    'officerEmail'
    "officerDesignatedArea"
*/

export default function RegisterNewOfficer(params) {

    const [data,setData] = useState({
        'officerName':null,
        'officerRank':null,
        'officerEmail':null,
        "officerDesignatedArea":null,
    })

    const handleChange = (event)=>{
        let inputVal = event.target.value;
        const in_name = event.target.name;

        setData((prevData)=>{
          prevData[in_name] = inputVal;
          return prevData;
        })
      }

    return(
        <div>
            <input type="text" placeholder="Officer name" name="officerName" required/>
            <select name="officerRank" id="officer-rank">
                <option value="Constable">Constable</option>
                <option value="Commisioner">Commisioner</option>
            </select>
            <input type='email' placeholder="officer Email" name="officerEmail" required/>
            <select name="crimeArea" onChange={handleChange} required>
                {servicingAreas}
            </select>

        </div>
    );
}