import { useState, type FormEvent } from "react";
import type { Project } from "../models";

export type AddProjectFormProps = {
  onAdd: (project: Project) => void;
};

function makeId() {
  // Prefer a real UUID when available; fallback keeps the tutorial working everywhere.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function AddProjectForm({ onAdd }: AddProjectFormProps) {
  const [name, setName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [status, setStatus] = useState<Project["status"]>("planned");

  const canSubmit = name.trim().length > 0 && clientName.trim().length > 0;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // We prevent default so the browser does NOT navigate away (refresh).
    // In a React SPA, navigation would wipe state like the projects list.
    e.preventDefault();

    if (!canSubmit) return;

    const newProject: Project = {
      id: makeId(),
      name: name.trim(),
      clientName: clientName.trim(),
      status,
    };

    onAdd(newProject);

    // Reset controlled inputs by resetting state.
    setName("");
    setClientName("");
    setStatus("planned");
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold text-slate-900">Add Project</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Project name</span>
          <input
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Marketing Website Refresh"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Client name</span>
          <input
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="e.g., Acme Co"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Status</span>
          <select
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
            value={status}
            onChange={(e) => setStatus(e.target.value as Project["status"])}
          >
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add project
          </button>
          <p className="text-sm text-slate-600">
            Tip: Press Enter to submit when focused in a field.
          </p>
        </div>
      </form>
    </section>
  );
}