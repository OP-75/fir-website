import React from "react";
import "./App.css";

//IMP!!! amke sure to install the npm react-router-dom INSIDE the react app folder (fir-website in this case) caz it'll show error
// i spent 1.5 hr trouble shooting the router when i realized it was installed in the outer node_modules folder
// INSTALL IT INSIDE THE WORKING REACT APP
import { Route, Routes } from "react-router-dom";

import Registration from "./pages/Registration";
import CaseStatus from "./pages/CaseStatus";
import CasesList from "./pages/CasesList";
import RegisterNewOfficer from "./pages/RegisterNewOfficer";
import OfficerList from './pages/OfficerList'
import Login from "./pages/Login";
import Homepage from "./pages/Home Page/Homepage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Homepage /> } />
      <Route exact path="/register" element={ <Registration/> } />
      <Route exact path="/case-status/:caseId" element={ <CaseStatus /> }  />
      <Route exact path="/cases-list" element={ <CasesList /> }  />
      <Route exact path="/register-officer" element={ <RegisterNewOfficer /> }  />
      <Route exact path="/all-officer" element={ <OfficerList /> }  />
      <Route exact path="/login" element={ <Login /> }  />
    </Routes>

    //  <Registration/>
  );
}

export default App;
