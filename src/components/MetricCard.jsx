export default function MetricCard({ label, value, delta, unit='' }) {
  const dir = delta > 0 ? '▲' : delta < 0 ? '▼' : '—'
  return (
    <div className="card">
      <div className="h2">{label}</div>
      <div className="row">
        <div className="kpi">{value}{unit}</div>
        <div className="badge">{dir} {Math.abs(delta)}{unit} / wk</div>
      </div>
    </div>
  )
}
