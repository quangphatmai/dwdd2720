
import { useEffect, useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
};

export function ProjectDashboard(props: ProjectDashboardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const listEl = root.querySelector<HTMLElement>("[data-role='project-list']");
    const rowEls = root.querySelectorAll<HTMLElement>("[data-role='project-row']");

    console.log("listEl:", listEl);
    console.log("rowEls count:", rowEls.length);

    const firstRow = rowEls.item(0);
    console.log("firstRow text:", firstRow?.textContent?.trim());
  }, [props.projects]);

  return (
    <section
      ref={containerRef}
      className="mx-auto w-full max-w-5xl p-4"
      aria-label="Project dashboard"
    >
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Project Dashboard</h2>
        <p className="text-sm text-slate-600">
          This component will demonstrate DOM selection using a ref-scoped container.
        </p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">Projects</div>

        <ul data-role="project-list" className="divide-y divide-slate-100">
          {props.projects.map((p) => (
            <li
              key={p.id}
              data-role="project-row"
              data-project-id={p.id}
              className="flex items-center justify-between gap-3 px-4 py-3 transition-colors"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
                <div className="truncate text-xs text-slate-600">Client: {p.clientName}</div>
              </div>

              <div className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700">
                Status: {p.status}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}