import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'; //! DO NOT REMOVE or else everything will break


const Barchart = (props) => {
  const { chartData } = props;

  const options = {
    indexAxis: 'x', // Change the indexAxis option to 'x' for vertical direction
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Crime Rate by Month',
      },
    },
    responsive: true,
  };

  return (
    <Bar data={chartData} options={options}  />
  );
};

export default Barchart;
