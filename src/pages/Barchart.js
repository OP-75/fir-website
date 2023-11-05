import React from "react";
import { Bar } from "react-chartjs-2";

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
  };

  return (
    <div style={{ padding: '1rem', width: '50vw' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Barchart;
