import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
  selectedProjectId?: string | null;
  onProjectClick?: (id: string) => void;
  onDeleteProject?: (id: string) => void;
};

type ActiveCardSummary = {
  id: string;
  title: string;
  status: string;
};

function getStatusChipClasses(status: string): string {
  switch (status.toLowerCase()) {
    case "active":
      return "status-badge status-active";
    case "blocked":
      return "status-badge status-blocked";
    case "planned":
      return "status-badge status-planned";
    case "done":
    case "completed":
      return "status-badge status-done";
    case "draft":
      return "status-badge status-draft";
    case "paused":
      return "status-badge status-paused";
    default:
      return "status-badge status-default";
  }
}

function formatStatusLabel(status: string): string {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export function ProjectDashboard(props: ProjectDashboardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");

    const activeCards: ActiveCardSummary[] = [];

    cards.forEach((card) => {
      const status = card.getAttribute("data-status") ?? "";
      if (status !== "active") return;

      const id = card.getAttribute("data-project-id") ?? "(missing id)";
      const title =
        card
          .querySelector<HTMLElement>("[data-project-title]")
          ?.textContent?.trim() ?? "(missing title)";

      activeCards.push({ id, title, status });
    });

    console.table(activeCards);
  }, [props.projects]);

  function handleScrollToLast(): void {
    const root = containerRef.current;
    if (!root) return;

    const lastProject = props.projects[props.projects.length - 1];

    if (!lastProject) {
      console.warn("No rows found to scroll to.");
      return;
    }

    props.onProjectClick?.(lastProject.id);

    const last = root.querySelector<HTMLElement>(
      `[data-project-id='${lastProject.id}']`,
    );
    if (!last) return;

    last.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleFindById(): void {
    const root = containerRef.current;
    if (!root) return;

    const id = idInputRef.current?.value.trim();
    if (!id) {
      console.warn("Type a project id first.");
      return;
    }

    const row = root.querySelector<HTMLElement>(`[data-project-id='${id}']`);
    if (!row) {
      console.warn("No row found for id:", id);
      return;
    }

    props.onProjectClick?.(id);
    row.scrollIntoView({ behavior: "smooth", block: "center" });

    const detailsBtn = row.querySelector<HTMLButtonElement>(
      "[data-role='details-button']",
    );
    detailsBtn?.focus();
  }

  return (
    <section
      ref={containerRef}
      className="card w-full p-5 sm:p-6"
      aria-label="Project dashboard"
    >
      <header className="mb-5 flex flex-col gap-4">
        <div>
          <h2 className="title-md">Project Dashboard</h2>
          <p className="text-sm text-muted">
            DOM selection demo. Loaded:{" "}
            <span className="font-medium">{props.projects.length}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={idInputRef}
            type="text"
            placeholder="Enter project id (example: p-1001)"
            className="input-base sm:max-w-xs"
          />
          <button
            type="button"
            onClick={handleFindById}
            className="btn-base btn-primary"
          >
            Find & focus
          </button>
          <button
            type="button"
            onClick={handleScrollToLast}
            className="btn-base btn-secondary"
          >
            Scroll to last project
          </button>
        </div>
      </header>

      <div className="list-shell">
        <div className="list-header px-4 py-3 text-sm font-medium">
          Projects
        </div>

        {props.projects.length === 0 ? (
          <div className="empty-state m-4 px-4 py-8 text-center text-sm">
            No projects yet. Add a project to populate your dashboard.
          </div>
        ) : (
          <ul
            data-role="project-list"
            className="divide-y divide-(--border-color)"
          >
            {props.projects.map((p) => {
              const isSelected = p.id === props.selectedProjectId;
              const isFocused = isSelected;

              const handleRowClick = () => {
                // console.log("ROW handler currentTarget:", e.currentTarget);
                //console.log("ROW handler target:", e.target);
                props.onProjectClick?.(p.id);
              };

              const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                // console.log("DELETE handler currentTarget:", e.currentTarget);
                // console.log("DELETE handler target:", e.target);
                const confirmed = window.confirm(
                  `Delete project "${p.name}"? This action cannot be undone.`,
                );
                if (!confirmed) return;
                props.onDeleteProject?.(p.id);
              };
              return (
                <li
                  key={p.id}
                  tabIndex={0}
                  onClick={handleRowClick}
                  data-project-card
                  data-status={p.status}
                  data-role="project-row"
                  data-project-id={p.id}
                  data-highlighted={String(isSelected)}
                  className={[
                    "list-row flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5",
                    isSelected ? "row-highlight" : "",
                    isFocused ? "ring-2 ring-sky-400 ring-offset-2" : "",
                  ].join(" ")}
                >
                  <div className="min-w-0">
                    <div
                      data-project-title
                      className="truncate text-sm font-semibold text-(--text-primary)"
                    >
                      {p.name}
                    </div>
                    <div className="truncate text-xs text-muted">
                      Client: {p.clientName}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div
                      className={`shrink-0 ${getStatusChipClasses(p.status)}`}
                    >
                      {formatStatusLabel(p.status)}
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100"
                      onClick={handleDeleteClick}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
