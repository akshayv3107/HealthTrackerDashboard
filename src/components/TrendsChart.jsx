import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, Tooltip, Filler, Legend, CategoryScale
} from 'chart.js'

ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Filler, Legend, CategoryScale)

export default function TrendsChart({ title, labels, values, yLabel }) {
  const data = {
    labels,
    datasets: [
      {
        label: yLabel,
        data: values,
        borderWidth: 2,
        tension: 0.35,
        fill: true
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: '#1c2a45' } } }
  }
  return (
    <div className="card" style={{height: 320}}>
      <div className="h2">{title}</div>
      <Line data={data} options={options} />
    </div>
  )
}
