import React from "react";
import "./LoginNavbar.css";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import server_url from "./data/ServerUrl";

//bootstrap imports:
import { Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap css


export default function LoginNavbar(props) {

    const setComToLoad = props.setComToLoad;

    function loadCustomComponent(event, componentToLoad) {
      event.preventDefault();
      setComToLoad(componentToLoad)
    }

    
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
    <Navbar expand="lg" className="navbar-container">
      <Container fluid>
        <Navbar.Brand
          href="/"
          className="m-1 font-weight-bolder welcomeMessage"
        >
          FIR Management Project
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className="px-lg-3 mx-lg-3 text-black navElement"
              onClick={(event)=>{loadCustomComponent(event, "chart")}}
            >
              View Crime Statistics
            </Nav.Link>

            <Nav.Link
              href="/"
              className="px-lg-3 mx-lg-3 text-black navElement"
              onClick={(event)=>{loadCustomComponent(event, "cases-list")}}
            >
              Manage all cases
            </Nav.Link>

            <Nav.Link
              href="/"
              className="px-lg-3 mx-lg-3 text-black navElement"
              onClick={(event)=>{loadCustomComponent(event, "all-officer")}}
            >
              Manage all officers
            </Nav.Link>

            <Nav.Link
              href="/"
              className="px-lg-3 mx-lg-3 text-black navElement"
              onClick={(event)=>{loadCustomComponent(event, "register-officer")}}
            >
              Register Officer
            </Nav.Link>


            


            <Nav.Link
              href="/login"
              className="px-lg-3 mx-lg-3 text-black"
              id="login"
              onClick={logout}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}
