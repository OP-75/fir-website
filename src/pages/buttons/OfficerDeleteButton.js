import React from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function OfficerDeleteButton(props) {
  async function handleClick() {
    try {
      await axios.delete(`http://localhost:5000/officer/${props.officerId}`,{ withCredentials: true });

      window.location.reload()
    } catch (error) {
      alert("unable to delete officer");
    }
  }

  return (
  <IconContext.Provider
    value={{ color: "black", size: "20px" }}
  >
  <AiFillDelete className="on-hover-pointer" onClick={handleClick}/>
  </IconContext.Provider>
  )
}
