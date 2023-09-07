// import React, {useContext} from "react"
import PropTypes from "prop-types"
import './Navbar.css';
// import { ThemeState } from "../Homepage";
import { Link } from "react-router-dom";

export default function Navbar(props){


    //both these below themes were never used so I commented them (Hitesh)
    // const dark = useContext(ThemeState)

    // const themeStyle = {
    //     background: dark ? 'radial-gradient(circle, rgba(170,141,222,1) 27%, rgba(83,181,222,1) 58%)' 
    //     : 'linear-gradient(95deg, rgba(170,141,222,1) 27%, rgba(83,222,199,1) 58%)',
    //     // color: dark ? '#CCC' : '#333',
    // }
    return (
        <>
        <div className="box-1">
            <header className="topHeader">
                {/* <h1 className="welcomeMessage">Welcome to {props.title}!</h1> */}
                <h3>Welcome to FIR Management System</h3>
                <img src="" alt="" />
            </header>
            <ul className="myNavBar">

                <li className="navElement">Home</li>
                <li className="navElement">About Us</li>
                <li className="navElement"><Link to={"/register"} >Regiser FIR</Link> </li>
                <li className="navElement"><Link to={"/view-fir-status"} >View FIR status</Link></li>
                <li className="navElement">Withdraw FIR</li>
                <li className="navElement" id="login"><Link to={"/login"} >Login</Link></li>
            </ul>
        </div>
        </>
    )
}

Navbar.propTypes = {
    // title: PropTypes.string.isRequired
    title: PropTypes.string
}

Navbar.defaultProps ={
    title: "our Website"
}