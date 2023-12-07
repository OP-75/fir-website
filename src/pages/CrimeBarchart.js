import React, { useState } from "react";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import { useEffect } from "react";
import axios from "axios";
import './CrimeBarchart.css'

import server_url from "./data/ServerUrl";
import LineChart from "./Linechart";

export default function CrimeBarchart() {
  /* for horizontal graph */
  // const [chartData, setChartData] = useState({ datasets: [], labels: [] });
  
  /* for vertical graph*/
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        var result = await axios.get(`${server_url}/case-stats`);
        result = result.data
        if (result) {
          //this is how data should be formatted for react-chart
          setChartData({
            labels: result.map((data) => data.crime), //x axis = crimeType
            datasets: [
              { 
                fill: true,
                label: "Number of reports",
                data: result.map((data) => data.count),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(0, 255, 255, 0.6)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(0, 255, 255, 1)'
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error));
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="chart-container">
      {chartData && <Barchart chartData={chartData} />}
      {chartData && <Piechart chartData={chartData} />}
      {chartData && <LineChart chartData={chartData} />}
    </div>
  );
}
