import React from "react";
import {Pie} from "react-chartjs-2";
import Chart from 'chart.js/auto'; //! DO NOT REMOVE or else everything will break


export default function Piechart(props){
    return(
        <Pie data={props.chartData} style={{padding: "1rem", width: "50vw"}} />
    )
}