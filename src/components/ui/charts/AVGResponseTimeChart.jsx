'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
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
    title: {
      display: false,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Prom. General',
      data: [75, 65, 85, 76, 62, 60, 45],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Prio. Alta',
      data: [70, 80, 75, 79, 73, 68, 72],
      borderColor: 'rgb(178,58,72)',
      backgroundColor: 'rgb(178,58,72)',
    },
    {
      label: 'Prio. Media',
      data: [65, 75, 70, 74, 68, 64, 69],
      borderColor: 'rgb(242,205,96)',
      backgroundColor: 'rgb(242,205,96)',
    },
    {
      label: 'Prio. Baja',
      data: [60, 70, 65, 69, 63, 58, 61],
      borderColor: 'rgb(126,188,230)',
      backgroundColor: 'rgb(126,188,230)',
    }
  ]
}

export default function AVGResponseTimeChart() {
  return (
    <div className="py-3 px-5 border border-neutral-300 rounded-xl">
      <h3 className="font-coolvetica mb-2 text-gray-600">Tiempo promedio de resolución</h3>
      <Line options={options} data={data} />
    </div>
  )
}
