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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 " >
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
  )
}

export default App