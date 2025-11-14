import { useState } from 'react'

export default function SymptomLog({ items=[], onAdd }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [symptom, setSymptom] = useState('')

  return (
    <div className="card">
      <div className="h2">Symptom Log</div>
      <div className="row" style={{marginBottom: 10}}>
        <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className="input" placeholder="e.g., nausea, fatigue" value={symptom} onChange={e=>setSymptom(e.target.value)} />
        <button className="nav button" onClick={() => { if(symptom) { onAdd({date, symptom}); setSymptom('') } }}>Add</button>
      </div>
      <div className="list">
        {items.length === 0 && <div className="small">No symptoms logged yet.</div>}
        {items.map((it, idx) => (
          <div key={idx} className="row" style={{padding: '8px 0', borderBottom: '1px solid #22304a'}}>
            <div>{it.date}</div>
            <div className="badge">{it.symptom}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
