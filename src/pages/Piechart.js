import React from "react";
import {Pie} from "react-chartjs-2";


export default function Piechart(props){
    return(
        <Pie data={props.chartData} style={{padding: "1rem", width: "50vw"}} />
    )
}