import { useEffect, useRef } from "react";
import type { Project } from "../models/project";

export type ProjectDashboardProps = {
  projects: Project[];
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
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  const highlightClasses = ["row-highlight"];

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // root.replaceChildren(); // Clear existing content for demo purposes

    // const card = document.createElement("article");
    // card.className =
    //   "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";
    // card.setAttribute("data-testid", "project-card");

    // const title = document.createElement("h3");
    // title.className = "text-base font-semibold text-slate-900";
    // title.textContent = `Example card: ${props.projects[0]?.name ?? "(no project)"}`;

    // const demoCards = root.querySelectorAll<HTMLElement>("[data-project-card]");

    // demoCards.forEach(() => {
    //   const newCard = document.createElement("div")
    //   const newCardText = document.createElement("p");
    //   newCardText.className = "text-sm text-slate-700";
    //   newCardText.textContent = "This card was created by DOM manipulation in useEffect. It won't persist if the component re-renders.";
    //   newCard.append(newCardText);
    //   root.append(newCard);
    // });

    // card.append(title);
    // root.append(card);


    // Leave this section alone
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

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, props.projects.length);
  }, [props.projects.length]);

  function clearHighlights(root: HTMLElement) {
    const highlighted = root.querySelectorAll<HTMLElement>(
      "[data-role='project-row'].row-highlight",
    );
    highlighted.forEach((el) => {
      el.classList.remove("row-highlight");
      el.setAttribute("data-highlighted", "false");
    });
  }

  function toggleHighlight(index: number): void {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;

    // Toggle each class in our highlight set
    highlightClasses.forEach((c) => cardEl.classList.toggle(c));

    // Decide the final state by checking ONE class
    const isHighlighted = cardEl.classList.contains("row-highlight");
    cardEl.setAttribute("data-highlighted", String(isHighlighted));
  }

  function handleScrollToLast(): void {
    const root = containerRef.current;
    if (!root) return;

    const rows = root.querySelectorAll<HTMLElement>(
      "[data-role='project-row']",
    );
    const last = rows.item(rows.length - 1);

    if (!last) {
      console.warn("No rows found to scroll to.");
      return;
    }

    clearHighlights(root);
    last.classList.add("row-highlight");

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

    clearHighlights(root);
    row.classList.add("row-highlight");
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
          <h2 className="title-md">
            Project Dashboard
          </h2>
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
          <ul data-role="project-list" className="divide-y divide-(--border-color)">
            {props.projects.map((p, i) => {
              return (
                <li
                  key={p.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => {
                    toggleHighlight(i);
                  }}
                  data-project-card
                  data-status={p.status}
                  data-role="project-row"
                  data-project-id={p.id}
                  data-highlighted="false"
                  className="list-row flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <div data-project-title className="truncate text-sm font-semibold text-(--text-primary)">
                      {p.name}
                    </div>
                    <div className="truncate text-xs text-muted">
                      Client: {p.clientName}
                    </div>
                  </div>

                  <div className={`shrink-0 ${getStatusChipClasses(p.status)}`}>
                    {formatStatusLabel(p.status)}
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
