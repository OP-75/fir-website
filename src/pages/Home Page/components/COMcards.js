import React from "react";
import PropTypes from "prop-types"
import "./Cards.css"

export default function Cards(props){
    return  (
    <>
    <div class="card">
        <div className="title-box">
            <h1>{props.title}</h1>
        </div>
        <p>{props.mssg}</p>
        <button id="cardButton"><a href={props.link} target="_blank">Read More</a></button>
    </div>
    </>
    )
}

// Cards.PropTypes = {
//     title: PropTypes.string,
//     mssg: PropTypes.string
// }