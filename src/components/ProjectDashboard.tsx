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
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "blocked":
      return "border-rose-200 bg-rose-50 text-rose-700";
    case "planned":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "done":
    case "completed":
      return "border-violet-200 bg-violet-50 text-violet-700";
    case "draft":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "paused":
      return "border-orange-200 bg-orange-50 text-orange-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
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

  const highlightClasses = ["bg-amber-50", "ring-2", "ring-amber-300"];

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
      "[data-role='project-row'].bg-amber-50",
    );
    highlighted.forEach((el) => {
      el.classList.remove("bg-amber-50", "ring-1", "ring-2", "ring-amber-300");
      el.setAttribute("data-highlighted", "false");
    });
  }

  function toggleHighlight(index: number): void {
    const cardEl = cardRefs.current[index];
    if (!cardEl) return;

    // Toggle each class in our highlight set
    highlightClasses.forEach((c) => cardEl.classList.toggle(c));

    // Decide the final state by checking ONE class
    const isHighlighted = cardEl.classList.contains("ring-2");
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
    last.classList.add("bg-amber-50", "ring-1", "ring-amber-300");

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
    row.classList.add("bg-amber-50", "ring-1", "ring-amber-300");
    row.scrollIntoView({ behavior: "smooth", block: "center" });

    const detailsBtn = row.querySelector<HTMLButtonElement>(
      "[data-role='details-button']",
    );
    detailsBtn?.focus();
  }

  return (
    <section
      ref={containerRef}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      aria-label="Project dashboard"
    >
      <header className="mb-4 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Project Dashboard
          </h2>
          <p className="text-sm text-slate-600">
            DOM selection demo. Loaded:{" "}
            <span className="font-medium">{props.projects.length}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={idInputRef}
            type="text"
            placeholder="Enter project id (example: p-1001)"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:max-w-xs"
          />
          <button
            type="button"
            onClick={handleFindById}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Find & focus
          </button>
          <button
            type="button"
            onClick={handleScrollToLast}
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            Scroll to last project
          </button>
        </div>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-3 text-sm font-medium text-slate-800">
          Projects
        </div>

        <ul data-role="project-list" className="divide-y divide-slate-100">
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
                className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <div
                    data-project-title
                    className="truncate text-sm font-semibold text-slate-900"
                  >
                    {p.name}
                  </div>
                  <div className="truncate text-xs text-slate-600">
                    Client: {p.clientName}
                  </div>
                </div>

                <div
                  className={`shrink-0 rounded-full border px-2 py-1 text-xs font-medium ${getStatusChipClasses(
                    p.status,
                  )}`}
                >
                  {formatStatusLabel(p.status)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
