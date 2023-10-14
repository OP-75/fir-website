import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CasesList.css";
import CaseTableS from "./CaseTableS";

import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function CasesList() {
  axios.defaults.withCredentials = true;

  const [deleted, setDeleted] = useState([]);
  const [fetched_data, setFetched_data] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function fetchCases(params) {
      try {
        const response = await axios.get("http://localhost:5000/cases", {
          withCredentials: true,
        });
        
        console.log(response);

        if (!response) {
          return;
        }
        const { result } = response.data;

        const data = result.map((item) => {
          return {
            ...item,
            editButton: (
              <div className="edit-button">
                <Link to={`/cases/edit/${item._id}`}>
                  <IconContext.Provider
                    value={{ color: "black", size: "15px" }}
                  >
                    <AiFillEdit className="on-hover-pointer" />
                  </IconContext.Provider>
                </Link>
              </div>
            ),

            deleteButton: (
              <div className="delete-button">
                <IconContext.Provider
                    value={{ color: "black", size: "20px" }}
                  >
                  <AiFillDelete className="on-hover-pointer" name={item._id} id={item._id} onClick={handleDelete}/>
                  </IconContext.Provider>
              </div>
            ),
          };
        });

        setFetched_data(data);
      } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data));
        navigate("/login");
      }
    }

    fetchCases();
  }, [deleted, navigate]); //fetch cases everytime we add a deleted case to list, also i included "navigate" in dependency array caz react was throwing a warning, there is no other reason to include it in depencdency array

  async function handleDelete(e) {
    const id = e.target.id;

    try {
      const axiosResponse = await axios.delete(
        `http://localhost:5000/case/${id}`
      );
      if (axiosResponse.data.sucess) {
        console.log(`${id} deleted`);
        setDeleted((prevDeleted) => {
          return [...prevDeleted, id];
        });
      } else {
        console.log(`Deletion of ${id} failed`);
      }
    } catch (error) {
      console.log(`Deletion of ${id} failed error:`);
      console.log(error);
      window.alert(JSON.stringify(error?.response?.data))
    }
  }

  return (
    <div id="cases-container">
      {fetched_data && 
        <CaseTableS fetched_data={fetched_data} handleDelete={handleDelete} />
      }
    </div>
  );
}
