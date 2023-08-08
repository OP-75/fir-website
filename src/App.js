import React from 'react';
import './App.css';

import axios from "axios"




function App() {

  const [data,setData] = React.useState({
    'userName': null,
    'userAge': null, 
    'userGender': null, 
    'userEmail': null, 
    'userNumber': null, 
    'userAddress': null, 
  },[])

  const handleChange = (event)=>{
    const inputVal = event.target.value;
    const in_name = event.target.name;
    console.log(in_name);

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

  const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post("http://localhost:5000/register",data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      
    <form onSubmit={handleSubmit}>

    <div className='user-details'>
    <input type="text" name='userName' placeholder='Name' onChange={handleChange}/>
    <input type="text" name='userAge' placeholder='Age' onChange={handleChange}/>
    <input type="text" name='userGender' placeholder='Gender' onChange={handleChange}/>
    <input type="text" name='userEmail' placeholder='Email' onChange={handleChange}/>
    <input type="text" name='userNumber' placeholder='Phone Number' onChange={handleChange}/>
    <input type="text" name='userAddress' placeholder='Address' onChange={handleChange}/>
    <input type="submit" value="Submit"/>
    </div>



    </form>

    </div>
  );
}

export default App;
