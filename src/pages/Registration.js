import React from "react";
import './Registration.css'
import axios from "axios"

import { useNavigate } from "react-router-dom";




export default function Registration() {
    const [data,setData] = React.useState({
        'userName': null,
        'userAge': null, 
        'userGender': null, 
        'userEmail': null, 
        'userNumber': null, 
        'userAddress': null,
        
        'victimName':null,
        'victimAge':null,
        'victimGender':null,
        'victimNumber':null,
        'victimAddress':null,
    
        'crimeType':null,    
        'crimeDateTime':null,    
        'crimeAddress':null,    
        'crimeArea':null,    
        'witnesses':null,
        
        'assignedOfficer':null,
        'caseStatus':null,
      },[])
    
      const handleChange = (event)=>{
        let inputVal = event.target.value;
        const in_name = event.target.name;
    
        if (event.target.type==="checkbox") {
          if (event.target.checked) {
            console.log(`Checkboxed is checked ,,, ${event.target.type}`);
          } else {
            console.log(`Checkboxed is unchecked,,, ${event.target.type}`);
          }
    
          inputVal = event.target.checked
        }
        else{
          console.log(`${in_name} : ${inputVal}`);
        }
        
    
        setData((prevData)=>{
          //since the key is variable - you have to put it in [keyVariable] in the object (after spread ... operator ofcource)
          //or you can modify prevData (tho thats not recommended!)
    
          // return {
          // ...prevData,
          // [in_name]: inputVal
          // }
          
          
          prevData[in_name] = inputVal;
          
    
          return prevData;
        })
      }
      
      //imp u have to put useNavigate outside the handleSubmit(or any) function!!!
      const naviagte = useNavigate();
      const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(data);
    
        try {
          const response = await axios.post("http://localhost:5000/register",data);
          console.log(response);

          
          naviagte('/case-status')
        } catch (error) {
          console.log(error);
        }
      }
    
      return (
        // Below is a fragment component ie an empty wrapper
        <> 
          
        <form onSubmit={handleSubmit}>
    
        <div className='user-details'>
        <h3>Enter your details</h3>
    
        
        <input type="text" name='userName' placeholder='Name' onChange={handleChange}/>
        <input type="text" name='userAge' placeholder='Age' onChange={handleChange}/>
        <input type="text" name='userGender' placeholder='Gender' onChange={handleChange}/>
        <input type="text" name='userEmail' placeholder='Email' onChange={handleChange}/>
        <input type="text" name='userNumber' placeholder='Phone Number' onChange={handleChange}/>
        <input type="text" name='userAddress' placeholder='Address' onChange={handleChange}/>
    
        <label htmlFor="is-witness-box">I am the witness
        <input type="checkbox" name="userIsWitness" id="is-witness-box" onChange={handleChange}/>
        </label>
        
        </div>
    
    
    
        <div className='victim-details'>
        <h3>Enter victim's details</h3>
        {/* All victim details should be optional */}
        <input type="text" name='victimName' placeholder='Victim Name' onChange={handleChange}/>
        <input type="text" name='victimAge' placeholder='Victim Age' onChange={handleChange}/>
        <input type="text" name='victimGender' placeholder='Victim Gender' onChange={handleChange}/>
        <input type="text" name='victimNumber' placeholder='Victim Phone Number' onChange={handleChange}/>
        <input type="text" name='victimAddress' placeholder='Victim Address' onChange={handleChange}/>
        </div>
    
    
    
    
    
        <div className='crime-details'>
        <h3>Enter case details</h3>
    
        <label htmlFor="">Select type of crime: <br />
        <select name="crimeType" onChange={handleChange}>
        <option value="">Select crime</option>
          <option value="Theft">Theft</option>
          <option value="Fraud">Fraud</option>
          <option value="Extortion">Extortion</option>
          <option value="Assault">Assault</option>
        </select>
        </label>
    
        <input type="datetime-local" name='crimeDateTime' placeholder='Date and time of incident' onChange={handleChange}/>
        
        <input type="text" name='crimeAddress' placeholder='Place of incident' onChange={handleChange}/>
    
        <label htmlFor=""> Select the city of incidence: <br />
        <select name="crimeArea" onChange={handleChange}>
          <option value="">Select area</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Nasik">Nasik</option>
          <option value="Jalgao">Jalgao</option>
        </select>
        </label>
    
        <textarea name="witnesses" id="" cols="30" rows="10" placeholder='Names of witnesses if any'></textarea>
        </div>
    
    
        <input type="submit" value="Submit" id='submit-btn'/>
        </form>
    
        </>
      );
}

