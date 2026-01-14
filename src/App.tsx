// src/App.tsx
import { useState } from 'react'

function App() {
  // Type inference: TypeScript infers count is a number based on useState(0)
  const [count, setCount] = useState(0)

  // Explicit type annotation for the click handler
  const handleIncrement = (): void => {
    setCount(count + 1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          My First Vite + TypeScript + Tailwind App
        </h1>
        <p className="mb-4 text-sm text-slate-300 text-center">
          This tiny feature proves your dev environment is ready for the client project.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl font-mono font-semibold">{count}</div>
          <button
            type="button"
            onClick={handleIncrement}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 transition-colors text-black font-medium"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  )
}

export default App