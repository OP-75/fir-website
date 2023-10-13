import React, { useState } from "react";

import LoginNavbar from './LoginNavbar';
import CasesList from "./CasesList";
import RegisterNewOfficer from "./RegisterNewOfficer";
import OfficerList from "./OfficerList"


export default function OfficerDashboard(){

    const [comToLoad, setComToLoad] = useState("cases-list");

    return(
        <>
            <LoginNavbar setComToLoad={setComToLoad}/>
            {comToLoad==="cases-list" && <CasesList/>}
            {comToLoad==="register-officer" && <RegisterNewOfficer/>}
            {comToLoad==="all-officer" && <OfficerList/>}

        </>
    )


}