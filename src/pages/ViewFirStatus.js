import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewFirStatus() {
    
    const [id,setId] = useState("");

   const navigate = useNavigate()

   function redirectOnSubmit(e){
    navigate(`/case-status/${id}`)
   }

   

    return(
        <div className="view-fir-status">
            <form onSubmit={redirectOnSubmit}>
                <input type="text" name="id" onChange={
                    (e)=>{
                    const val = e.target.value
                    setId(val);
                    }
                }
                placeholder="Case ID"
                value={id}
                />
                <button type="submit">Check Status</button>
            </form>

        </div>
    ); 

}