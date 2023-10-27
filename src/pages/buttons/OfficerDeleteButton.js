import React from "react";
import axios from "axios";

import { AiFillDelete } from "react-icons/ai";
import { IconContext } from "react-icons";
import server_url from "../data/ServerUrl"

export default function OfficerDeleteButton(props) {
  async function handleClick() {
    try {
      await axios.delete(`${server_url}/officer/${props.officerId}`,{ withCredentials: true });

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
