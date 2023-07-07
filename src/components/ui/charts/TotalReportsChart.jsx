'use client'
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        borderRadius: 3,
      }
    },
    tooltip: {
      backgroundColor: "#FFF",
      titleSize: 16,
      titleColor: "#404244",
      bodyColor: "#404244",
      bodySize: 14,
      displayColors: false,
      borderColor: "#d7d7d7",
      borderWidth: 1,
      padding: 10,
    },
  },
}

const TotalReportsChart = ({ values, title }) => {

  const data = {
    labels: ['Prioridad Baja', 'Prioridad Media', 'Prioridad Alta'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="py-3 px-5 border border-neutral-300 rounded-xl">
      <div className='flex flex-col h-full'>
        <h3 className="font-coolvetica mb-2 text-gray-600">{title}</h3>
        <div className='grow'>
          <Pie options={options} data={data} height={200} />
        </div>
      </div>
    </div>
  )
}

export default TotalReportsChart