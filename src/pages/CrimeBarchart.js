import React, { useState } from "react";
import Barchart from "./Barchart";
import Piechart from "./Piechart";
import { useEffect } from "react";
import axios from "axios";

import './CrimeBarchart.css'

export default function CrimeBarchart() {
  
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        var result = await axios.get(`http://localhost:5000/case-stats`);
        result = result.data
        if (result) {
          //this is how data should be formatted for react-chart
          setChartData({
            labels: result.map((data) => data.crime), //x axis = crimeType
            datasets: [
              {
                label: "Number of reports",
                data: result.map((data) => data.count),
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
        <div className="crime-barchart">
      {chartData && <Barchart chartData={chartData} />}
      {chartData && <Piechart chartData={chartData} />}
    </div>
    </div>
    
  );
}
