import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

//bootstrap imports:
import { Container, Nav, Navbar} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap css

export default function MyNavbar(props) {
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
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/register"
              className="px-lg-3 mx-lg-3 text-black navElement"
            >
              Register FIR
            </Nav.Link>
            <Nav.Link
              href="/view-fir-status"
              className="px-lg-3 mx-lg-3 text-black navElement"
            >
              View FIR status
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="px-lg-3 mx-lg-3 text-black"
              id="login"
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

Navbar.propTypes = {
  // title: PropTypes.string.isRequired
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: "our Website",
};
