// src/App.tsx

import { trackerCard } from './trackerBasics'
import { useState } from 'react'
import "./index.css";
import { projects } from "./data/projects";
import { countByStatus, formatDueDate, getProjectsByStatus } from "./utils/projectUtils";

function App() {
  const active = getProjectsByStatus(projects, "active");
  const [count, setCount] = useState(0)

  const handleIncrement = (): void => {
    setCount(count + 1)
  }

  console.log('Tracker Card Info:', trackerCard)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Counter Section */}
      <div className="flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center font-serif">
            My First Vite + TypeScript + Tailwind App
          </h1>

          <p className="mb-5 text-sm text-slate-300 text-center">
            This tiny feature proves your dev environment is ready for the client project. Click the button to
            increment the counter.
          </p>

          <p className="mb-5 text-sm text-slate-300 text-center">Testing GitHub + Vercel deployment</p>
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl font-mono font-semibold">{count}</div>
            <button
              type="button"
              onClick={handleIncrement}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors cursor-pointer"
            >
              Increment
            </button>
          </div>
        </div>
      </div>

      {/* Project Tracker Section */}
      <main style={{ padding: 16, fontFamily: "system-ui", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Project Tracker</h1>

        <section style={{ marginTop: 12 }}>
          <h2>Summary</h2>
          <ul>
            <li>Planned: {countByStatus(projects, "planned")}</li>
            <li>Active: {countByStatus(projects, "active")}</li>
            <li>Blocked: {countByStatus(projects, "blocked")}</li>
            <li>Done: {countByStatus(projects, "done")}</li>
          </ul>
        </section>

        <section style={{ marginTop: 12 }}>
          <h2>Active Projects</h2>
          <ul>
            {active.map((p) => (
              <li key={p.id}>
                <strong>{p.name}</strong> — Due: {formatDueDate(p)} — Tags: {p.tags.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App