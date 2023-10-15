import React, { useState } from "react";

import LoginNavbar from './LoginNavbar';
import CasesList from "./CasesList";
import RegisterNewOfficer from "./RegisterNewOfficer";
import OfficerList from "./OfficerList"
import CrimeBarchart from "./CrimeBarchart";


export default function OfficerDashboard(){

    const [comToLoad, setComToLoad] = useState("chart");

    return(
        <>
            <LoginNavbar setComToLoad={setComToLoad}/>
            {comToLoad==="chart" && <CrimeBarchart/>}
            {comToLoad==="cases-list" && <CasesList/>}
            {comToLoad==="register-officer" && <RegisterNewOfficer/>}
            {comToLoad==="all-officer" && <OfficerList/>}

        </>
    )


}