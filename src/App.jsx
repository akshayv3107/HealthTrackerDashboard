import { useEffect, useState } from 'react'
import MetricCard from './components/MetricCard.jsx'
import TrendsChart from './components/TrendsChart.jsx'
import SymptomLog from './components/SymptomLog.jsx'
import { fetchOverview, fetchTrend, fetchSymptoms, addSymptom } from './lib/mockApi.js'

const METRICS = [
  { key: 'steps', label: 'Daily Steps', unit: '' },
  { key: 'sleepHrs', label: 'Sleep (hrs)', unit: 'h' },
  { key: 'heartRate', label: 'Resting HR', unit: ' bpm' },
  { key: 'glucose', label: 'Glucose', unit: ' mg/dL' },
  { key: 'weight', label: 'Weight', unit: ' kg' },
]

export default function App() {
  const [tab, setTab] = useState('overview')
  const [overview, setOverview] = useState(null)
  const [trendLabels, setTrendLabels] = useState([])
  const [trendValues, setTrendValues] = useState([])
  const [metricKey, setMetricKey] = useState('steps')
  const [symptoms, setSymptoms] = useState([])

  useEffect(() => {
    fetchOverview().then(setOverview)
    fetchSymptoms().then(setSymptoms)
    fetchTrend('steps').then(rows => {
      setTrendLabels(rows.map(r => r.x))
      setTrendValues(rows.map(r => r.y))
    })
  }, [])

  useEffect(() => {
    fetchTrend(metricKey).then(rows => {
      setTrendLabels(rows.map(r => r.x))
      setTrendValues(rows.map(r => r.y))
    })
  }, [metricKey])

  return (
    <div className="container">
      <div className="h1">Health Tracker Dashboard</div>
      <div className="nav">
        {['overview','trends','symptoms'].map(t => (
          <button key={t} className={['active', ''][+(tab!==t)]} onClick={()=>setTab(t)}>
            {t[0].toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid">
          {overview ? (
            <>
              {METRICS.map(m => (
                <MetricCard key={m.key}
                  label={m.label}
                  value={overview[m.key].value}
                  delta={overview[m.key].delta}
                  unit={m.unit}
                />
              ))}
            </>
          ) : (
            <div className="small">Loading metrics…</div>
          )}
        </div>
      )}

      {tab === 'trends' && (
        <div className="grid" style={{gridTemplateColumns: '1fr'}}>
          <div className="card">
            <div className="row" style={{marginBottom: 10}}>
              <div className="h2">Select Metric</div>
              <select className="input" style={{maxWidth: 240}}
                value={metricKey} onChange={e=>setMetricKey(e.target.value)}>
                {METRICS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
              </select>
            </div>
          </div>
          <TrendsChart
            title={METRICS.find(m=>m.key===metricKey).label + ' — Last 28 Days'}
            labels={trendLabels}
            values={trendValues}
            yLabel={METRICS.find(m=>m.key===metricKey).label}
          />
        </div>
      )}

      {tab === 'symptoms' && (
        <div className="grid" style={{gridTemplateColumns: '1fr'}}>
          <SymptomLog items={symptoms} onAdd={async ({date, symptom}) => {
            await addSymptom({ date, symptom })
            const next = await fetchSymptoms()
            setSymptoms(next)
          }} />
        </div>
      )}

      <div className="footer">
        Demo data only. Replace mock API in <code>src/lib/mockApi.js</code> with your own endpoints or device SDKs.
      </div>
    </div>
  )
}
