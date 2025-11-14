# Health Tracker Dashboard

A React + Vite demo that visualizes patient health metrics and logs symptoms. Uses `react-chartjs-2` + `chart.js`, and a simple mocked API layer you can replace with real endpoints (e.g., HealthKit, Google Fit, wearable SDKs).

## ✨ Features
- KPI overview (steps, sleep, resting HR, glucose, weight) with weekly deltas
- Trend visualization for any metric (last 28 days)
- Symptom logging with persistent list (in-memory demo)
- Clean dark UI with responsive cards

## 🧱 Tech Stack
- React 18 + Vite
- Chart.js + react-chartjs-2
- dayjs for dates

## 🚀 Quick Start
```bash
npm install
npm run dev
# open the printed localhost URL
```

## 🔌 Replace Mock API
All demo data lives in `src/lib/mockApi.js`. Swap these functions out with real API calls (e.g., HealthKit/Google Fit, wearable devices, or your backend).

## 🧭 Project Structure
```
health-tracker-dashboard/
  ├─ index.html
  ├─ package.json
  ├─ vite.config.js
  └─ src/
     ├─ App.jsx
     ├─ main.jsx
     ├─ styles.css
     ├─ lib/
     │  └─ mockApi.js
     └─ components/
        ├─ MetricCard.jsx
        ├─ TrendsChart.jsx
        └─ SymptomLog.jsx
```

## 📦 Deploy
- **Vercel** (recommended): Import the repo, framework = Vite, build = `npm run build`, output = `dist/`.
- **GitHub Pages**: Use `vite` base config and a deploy action.

## 📝 License
MIT
