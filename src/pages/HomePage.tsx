import { useState } from "react";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <section className="card p-6 sm:p-7">
      <h1 className="title-lg">
        My First Vite + TypeScript + Tailwind App
      </h1>
      <p className="mt-2 text-sm text-muted">
        This tiny feature proves your dev environment is ready for the client
        project. Click the button to increment the counter.
      </p>
      <p className="mt-1 text-sm text-subtle">Testing GitHub + Vercel deployment</p>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-2xl border border-(--border-color) bg-(--bg-surface-soft) px-5 py-3 text-6xl font-semibold tracking-tight text-(--text-primary)">
          {count}
        </div>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="btn-base btn-primary px-5 py-2.5"
        >
          Increment
        </button>
      </div>
    </section>
  );
}