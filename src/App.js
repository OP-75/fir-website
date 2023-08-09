import React from "react";
import "./App.css";
import Registration from "./pages/Registration";
import CaseStatus from "./pages/CaseStatus";

//IMP!!! amke sure to install the npm react-router-dom INSIDE the react app folder (fir-website in this case) caz it'll show error
// i spent 1.5 hr trouble shooting the router when i realized it was installed in the outer node_modules folder
// INSTALL IT INSIDE THE WORKING REACT APP
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Registration/> } />
      <Route path="/case-status" element={ <CaseStatus /> } />
    </Routes>

    //  <Registration/>
  );
}

export default App;
