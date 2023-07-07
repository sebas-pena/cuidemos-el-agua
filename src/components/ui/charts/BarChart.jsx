'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

const mockData = [
  {
    priority: "Prioridad Baja",
    data: [2, 5, 3, 10, 20, 6, 7],
    color: "rgb(126,188,230)",
  },
  {
    priority: "Prioridad Media",
    data: [10, 0, 0, 3, 0, 10, 0],
    color: "rgb(242,205,96)",
  },
  {
    priority: "Prioridad Alta",
    data: [1, 2, 8, 0, 3, 0, 1],
    color: "rgb(178,58,72)",
  }
]

BarElement.prototype.constructor.defaults.borderRadius = 3
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: true,
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
      /* callbacks: {
        labelTextColor: (param) =>
          param.dataset.label == "Income"
            ? "rgba(53, 162, 235, 0.7)"
            : "rgba(255, 99, 132, 0.7)",
      }, */
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        drawBorder: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
      stacked: true,
    },
    y: {
      grid: {
        display: true,
        drawBorder: true,
        color: "#00000010",
      },
      stacked: true,
      ticks: {
        display: true,
      },
    },
  },
}

const BarChart = ({ values, title, barColor }) => {


  const data = {
    labels: [
      "1/7",
      "2/7",
      "3/7",
      "4/7",
      "5/7",
      "6/7",
      "7/7",
    ],
    datasets: mockData.map((item) => {
      return {
        label: item.priority,
        data: item.data,
        backgroundColor: item.color,
      }
    }),
  }

  return (
    <div className="py-3 px-5 border border-neutral-300 rounded-xl">
      <h3 className="font-coolvetica mb-2 text-gray-600">{title}</h3>
      <Bar options={options} data={data} />
    </div>
  )
}

export default BarChart