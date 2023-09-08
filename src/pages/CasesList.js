import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CasesList.css";

import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import {GrFormView} from "react-icons/gr"
import { IconContext } from "react-icons";

export default function CasesList() {
  const [casesList, setCasesList] = useState([]);
  
  axios.defaults.withCredentials = true


  const [deleted, setDeleted] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCases(params) {
      try {
       
        const response = await axios.get("http://localhost:5000/cases", {withCredentials: true});
        console.log(response);
        if (!response) {
          return;
        }
        const { result } = response.data;

        const casesJsx = result.map((item) => {
          return (
            <tr>
              <td>{item.userName}</td>
              <td>{item.victimName}</td>
              <td>{item.crimeType}</td>
              <td>{item.crimeArea}</td>
              <td>{item.crimeAddress}</td>
              <td>{item.crimeDateTime}</td>
              <td>{item.createdAt.substring(0, 10)}</td>
              <td>{item.assignedOfficer}</td>
              <td>{item.caseStatus}</td>
              <td className="edit-button">
                <Link to={`/cases/edit/${item._id}`}>
                  <IconContext.Provider
                    value={{ color: "black", size: "15px" }}
                  >
                    <AiFillEdit />
                  </IconContext.Provider>
                </Link>
              </td>
              <td className="view-button">
                <Link to={`/cases/view-details/${item._id}`}>
                  <IconContext.Provider
                    value={{ color: "black", size: "25px" }}
                  >
                    <GrFormView />
                  </IconContext.Provider>
                </Link>
              </td>
              <td className="delete-button">
                <button name={item._id} id={item._id} onClick={handleDelete}>Delete</button>
              </td>
            </tr>
          );
        });

        setCasesList(casesJsx);
      } catch (error) {
        console.log(error);
        if (error.response.data.msg === "Please login") {
          window.alert("Please login");
          navigate("/login");
        }
      }
    }

    fetchCases();
  }, [deleted, navigate]); //fetch cases everytime we add a deleted case to list, also i included "navigate" in dependency array caz react was throwing a warning, there is no other reason to include it in depencdency array



  
  async function handleDelete(e) {
    const id = e.target.id;

    try {
      const axiosResponse = await axios.delete(`http://localhost:5000/case/${id}`);
      if(axiosResponse.data.sucess){
        console.log(`${id} deleted`);
        setDeleted((prevDeleted)=>{
          return [...prevDeleted, id];
        });
      }
      else{
        console.log(`Deletion of ${id} failed`);
      }
    } catch (error) {
      console.log(`Deletion of ${id} failed,,, error: ${error}`);
    }





  }

  function logout() {
    
    //OK THE LOGOUT ERROR WAS BECASUE WE WERENT PASSING data=null below so it was just: ("http://localhost:5000/logout",{ withCredentials: true })
    // SO axios was passing data={ withCredentials: true } and the actual configuration of was set to default ie withCredential was = false
    //so every time we clicked logout the the server made a fresh session and logged out the user with that fresh session, keeping the already logged in session/user
    // as it is,
    // Summary: PASS DATA AS `null` EVERY TIME U DO A "POST,PUT" REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!! OTHERWISE THE CONFIGURATION OBJECT WILL BE PASSED AS DATA AND CONFIG WILL  = DEFAULT
    //other ways to counter this is just to use DELETE OR GET REQUEST OR USE: 
    // axios.defaults.withCredentials = true at the start(top) of the component
    

    axios.defaults.withCredentials = true

    axios
      .post("http://localhost:5000/logout",null, { withCredentials: true })
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
    <div id="cases-container">
      <button type="button" onClick={logout}>
        Logout
      </button>

      <table>
        <tr>
          <th>Complainant's name</th>
          <th>Victim's name</th>
          <th>Crime</th>
          <th>City</th>
          <th>Adderss of Incident</th>
          <th>Time of Incident</th>
          <th>Time of Report</th>
          <th>Assigned Officer</th>
          <th>Case Status</th>
          <th>Edit</th>
          <th>View case</th>
          <th>Delete</th>
        </tr>

        {casesList}
      </table>
    </div>
  );
}
