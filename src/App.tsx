// src/App.tsx

import { trackerCard } from "./trackerBasics";
import { useState } from "react";
import "./index.css";
import { projects } from "./data/projects";
//import { countByStatus } from "./utils/projectUtils";
import {
  projectRecords,
  statusLabelIf,
  statusLabelSwitch,
  canEditProject,
} from "./status";
import { normalizeStatus } from "./status";
import { formatProjectRecord, type ProjectRecord } from "./status";
import "./trackerBasics.ts";
import { sampleProjects, validateProject } from "./project-tracker";

import HelperComponent from "./helpers/HelperComponent";
import TrackerCard from "./components/TrackerCard.tsx";
import { ProjectDashboard } from "./components/ProjectDashboard.tsx";

const records: ProjectRecord[] = [
  {
    id: "p10",
    name: "Brand Refresh",
    status: "draft",
    lastEditedAt: "2025-12-31",
  },
  { id: "p11", name: "Client Portal", status: "active", etaDays: 14 },
  {
    id: "p12",
    name: "SEO Audit",
    status: "paused",
    pauseReason: "Waiting on content",
  },
  {
    id: "p13",
    name: "Landing Page",
    status: "completed",
    completedAt: "2025-12-15",
  },
];

const lines = [
  `Project: ${projectRecords[0].name}`,
  `Status (if): ${statusLabelIf(projectRecords[0].status)}`,
  `Status (switch): ${statusLabelSwitch(projectRecords[0].status)}`,
  `Can edit? ${canEditProject(projectRecords[0].status)}`,
];

console.log(lines.join("\n"));

lines.push(`Normalize " paused ": ${normalizeStatus(" paused ")}`);
lines.push(`Normalize "ARCHIVED": ${normalizeStatus("ARCHIVED")}`);
lines.push(`Normalize null: ${normalizeStatus(null)}`);

for (const r of records) {
  lines.push(formatProjectRecord(r));
}

console.log("--- Validating sampleProjects ---");
for (const p of sampleProjects) {
  const result = validateProject(p);
  console.log(p.id, result.ok ? "OK" : result);
}

console.log("--- Validating intentionally bad input ---");
const badInput: unknown = {
  id: "", // invalid
  name: "  ", // invalid
  owner: 42, // invalid type
  status: "in-progress", // not allowed
  estimateHours: -5, // invalid
  notes: "", // invalid when provided
};

const badResult = validateProject(badInput);
console.log(badResult);

// 1) for-loop: build a list of titles
const titlesViaFor: string[] = [];
for (let i = 0; i < projects.length; i++) {
  titlesViaFor.push(projects[i].name);
}

// 2) forEach: also iterates, but typically used for side effects
const titlesViaForEach: string[] = [];
projects.forEach((project) => {
  titlesViaForEach.push(project.name);
});

console.log("titlesViaFor", titlesViaFor);
console.log("titlesViaForEach", titlesViaForEach);

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = (): void => {
    setCount(count + 1);
  };

  console.log("Tracker Card Info:", trackerCard);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center flex-col">
      <HelperComponent />
      {/* Counter Section */}
      <div className=" py-8">
        <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center font-serif">
            My First Vite + TypeScript + Tailwind App
          </h1>

          <p className="mb-5 text-sm text-slate-300 text-center">
            This tiny feature proves your dev environment is ready for the
            client project. Click the button to increment the counter.
          </p>

          <p className="mb-5 text-sm text-slate-300 text-center">
            Testing GitHub + Vercel deployment
          </p>
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
      <ProjectDashboard projects={projects} />
      {/* Project Tracker Section */}
      {/* <main className="mx-auto max-w-2xl p-12 bg-slate-800 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Project Tracker</h1>

        <section style={{ marginTop: 12 }}>
          <h2 className="font-bold mb-4">Summary</h2>
          <ul>
            <li>Planned: {countByStatus(projects, "planned")}</li>
            <li>Active: {countByStatus(projects, "active")}</li>
            <li>Blocked: {countByStatus(projects, "blocked")}</li>
            <li>Done: {countByStatus(projects, "done")}</li>
          </ul>
        </section>
      </main> */}
      <TrackerCard />
      {/* <div className="p-4 max-w-2xl mx-auto bg-slate-800 rounded-lg mt-8">
        <pre>{lines.join("\n")}</pre>
      </div> */}
    </div>
  );
}

export default App;
