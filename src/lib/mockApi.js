import dayjs from 'dayjs'

const rand = (min, max) => Math.round((Math.random() * (max - min) + min) * 10) / 10

function generateSeries(days=28) {
  const today = dayjs()
  const series = []
  for (let i = days-1; i >= 0; i--) {
    const d = today.subtract(i, 'day')
    series.push({
      date: d.format('YYYY-MM-DD'),
      steps: Math.floor(rand(3000, 12000)),
      sleepHrs: rand(5.0, 9.5),
      heartRate: Math.floor(rand(58, 98)),
      glucose: rand(75, 140),
      weight: rand(60, 75),
      symptoms: Math.random() < 0.25 ? ['nausea','fatigue','headache'][Math.floor(Math.random()*3)] : ''
    })
  }
  return series
}

let SERIES = generateSeries(28)

export async function fetchOverview() {
  await new Promise(r => setTimeout(r, 250))
  const L = SERIES.length-1
  const P = Math.max(0, L-7)
  const latest = SERIES[L], prev = SERIES[P]
  const delta = (curr, past) => Math.round((curr - past)*10)/10
  return {
    latestDate: latest.date,
    steps: { value: latest.steps, delta: delta(latest.steps, prev.steps) },
    sleepHrs: { value: latest.sleepHrs, delta: delta(latest.sleepHrs, prev.sleepHrs) },
    heartRate: { value: latest.heartRate, delta: delta(latest.heartRate, prev.heartRate) },
    glucose: { value: latest.glucose, delta: delta(latest.glucose, prev.glucose) },
    weight: { value: latest.weight, delta: delta(latest.weight, prev.weight) }
  }
}

export async function fetchTrend(metric='steps') {
  await new Promise(r => setTimeout(r, 250))
  return SERIES.map(row => ({ x: row.date, y: row[metric] }))
}

export async function fetchSymptoms() {
  await new Promise(r => setTimeout(r, 150))
  return SERIES.filter(r => r.symptoms).map(r => ({ date: r.date, symptom: r.symptoms }))
}

export async function addSymptom({ date, symptom }) {
  await new Promise(r => setTimeout(r, 100))
  const idx = SERIES.findIndex(r => r.date === date)
  if (idx >= 0) SERIES[idx].symptoms = symptom
  else SERIES.push({ date, steps: 6000, sleepHrs: 7.2, heartRate: 72, glucose: 100, weight: 70, symptoms: symptom })
  return { ok: true }
}
