import React, { useState } from "react";

import LoginNavbar from './LoginNavbar';
import CasesList from "./OfficerList";
import RegisterNewOfficer from "./RegisterNewOfficer";
import OfficerList from "./OfficerList"


export default function OfficerDashboard(){

    const [comToLoad, setComToLoad] = useState("casesList");

    return(
        <>
            <LoginNavbar setComToLoad={setComToLoad}/>
            {comToLoad==="cases-list" && <CasesList/>}
            {comToLoad==="register-officer" && <RegisterNewOfficer/>}
            {comToLoad==="all-officer" && <OfficerList/>}

        </>
    )


}