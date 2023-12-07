import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'; //! DO NOT REMOVE or else everything will break


const AreaChart = (props) => {
  const { chartData } = props;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Crime Trends Over Time",
      },
    },
    responsive: true,
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default AreaChart;
