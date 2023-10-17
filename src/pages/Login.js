import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import COMnavbar from './Home Page/components/COMnavbar'

import server_url from "./data/ServerUrl";

import "./Login.css"

export default function Login(){
  
  function handleChange (event) {
    let inputVal = event.target.value;
    const in_name = event.target.name;
    
    if(inputVal===""){
      inputVal = null
    }
    
    setData((prevData) => {
      prevData[in_name] = inputVal;
      return prevData;
    });
  };
  
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${server_url}/login`, data, { withCredentials: true });
      console.log(response);
      
      if(response===undefined){
        window.alert("Error no response form server")
        return;
      }
      
      if(response.data.loggedIn){
        
        navigate("/officer-dashboard")
      }
      else{
        window.alert(`Cant login: ${response?.data.msg}`)
        return;
      }
      
    } catch (error) {
      console.log(error);
      window.alert(JSON.stringify(error?.response?.data))
      return;
    }
  }
  
  const [data,setData] = useState({})
  
  return (
        <div className="login-form-container">
          <COMnavbar/>
          <form className="form-group" >
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
    
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      );
}