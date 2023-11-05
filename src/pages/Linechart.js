import React from "react";
import { Line } from "react-chartjs-2";

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
  };

  return (
    <div style={{ padding: "1rem", width: "50vw" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AreaChart;
