import React from "react";
import axios from "axios";

export default function OfficerDeleteButton(props) {
  async function handleClick() {
    try {
      await axios.delete(`http://localhost:5000/officer/${props.officerId}`);

      window.location.reload()
    } catch (error) {
      alert("unable to delete officer");
    }
  }

  return <button onClick={handleClick}>Delete</button>;
}
