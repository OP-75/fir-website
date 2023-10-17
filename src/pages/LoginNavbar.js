import React from "react";
import "./LoginNavbar.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import server_url from "./data/ServerUrl";

export default function LoginNavbar(props) {

    const setComToLoad = props.setComToLoad;
    
    const navigate = useNavigate();
  function logout() {
    //OK THE LOGOUT ERROR WAS BECASUE WE WERENT PASSING data=null below so it was just: ("${server_url}/logout",{ withCredentials: true })
    // SO axios was passing data={ withCredentials: true } and the actual configuration of was set to default ie withCredential was = false
    //so every time we clicked logout the the server made a fresh session and logged out the user with that fresh session, keeping the already logged in session/user
    // as it is,
    // Summary: PASS DATA AS `null` EVERY TIME U DO A "POST,PUT" REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!! OTHERWISE THE CONFIGURATION OBJECT WILL BE PASSED AS DATA AND CONFIG WILL  = DEFAULT
    //other ways to counter this is just to use DELETE OR GET REQUEST OR USE:
    // axios.defaults.withCredentials = true at the start(top) of the component

    axios.defaults.withCredentials = true;

    axios
      .post(`${server_url}/logout`, null, { withCredentials: true })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        window.alert("Logout failed");
      });
  }

  return (
    <>
      <div className="box-1">
        <header className="topHeader">
          <h3>Officer DashBoard</h3>
        </header>

        <ul className="myNavBar">
          <li className="navElement">
            <button onClick={()=>{setComToLoad("chart")}}>View Crime Statistics</button>
          </li>
          <li className="navElement">
            <button onClick={()=>{setComToLoad("cases-list")}}>Manage all cases</button>
          </li>
          <li className="navElement">
            <button onClick={()=>{setComToLoad("all-officer")}}>Manage all officers</button>
          </li>
          <li className="navElement">
            <button onClick={()=>{setComToLoad("register-officer")}}>Register Officers</button>
          </li>

          <li className="navElement" >
            <button id="logout-btn" onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
}
