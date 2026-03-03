import { projects } from "../data/projects";
import type { Project } from "../models/project";
import { findProjectById, listOverdueProjects } from "../utils/projectUtils"

type TrackerCard = {
  id: string;
  heading: string; // formatted title
  status: string;
  pointsLabel: string;
  dueDate: string;
  daysLeft?: number; // optional because not all projects have a deadline
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
      return "border-slate-200 bg-white text-slate-700";
  }
}

function formatStatusLabel(status: string): string {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

const trackerCards: TrackerCard[] = projects.map(
  (project: Project): TrackerCard => {
    return {
      id: project.id,
      heading: project.name.toUpperCase(),
      status: project.status ?? "unknown",
      pointsLabel: "0 pts",
      dueDate: project.dueDate ?? "TBD",
      daysLeft: project.status === "active" ? project.days : undefined,
    };
  },
);

const activeProjects: TrackerCard[] = trackerCards.filter((tracker) =>
  tracker.status.includes("active"),
);
const totalDaysLeft = activeProjects.reduce((sum, card) => sum + (card.daysLeft ?? 0), 0);

console.log("Total days left across active projects:", totalDaysLeft);

console.log("trackerCards", trackerCards);

// Notice: original data is unchanged
console.log("original projects still intact", projects);


const blockedCards: TrackerCard[] = trackerCards
  .filter((t) => t.status === "blocked")
  .map((t) => ({
    id: t.id,
    heading: t.heading,
    status: t.status,
    pointsLabel: t.pointsLabel,
    dueDate: t.dueDate,
  }));

const openPointsTotal: number = trackerCards
  .filter((t) => t.status === "open")
  .reduce((sum, t) => sum + (t.daysLeft ?? 0), 0);

console.log("blockedCards", blockedCards);
console.log("openPointsTotal", openPointsTotal);


const p3 = findProjectById(projects, "p-1002");
if (p3) {
  console.log("Found p-1002:", p3.name, p3.status, p3.dueDate);
} else {
  console.log("p-1002 not found (unexpected in sample data)");
}

const asOf = new Date("2025-12-31");
const overdue = listOverdueProjects(projects, asOf);
console.log("Overdue as of 2025-12-31:", overdue.map((p) => p.id));

function TrackerCard() {
  return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">All Projects</h2>
      <ul className="mt-4 space-y-2">
        {trackerCards.map((trackerCard) => (
          <li
            key={trackerCard.id}
            className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <strong className="text-slate-900">{trackerCard.heading}</strong> — Due: {trackerCard.dueDate}
            </span>
            <span
              className={`inline-flex w-fit rounded-full border px-2 py-1 text-xs font-medium ${getStatusChipClasses(
                trackerCard.status,
              )}`}
            >
              {formatStatusLabel(trackerCard.status)}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-6 text-xl font-semibold text-slate-900">Active Projects</h2>
      <ul className="mt-4 space-y-2">
        {activeProjects.map((project) => (
          <li
            key={project.id}
            className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <strong className="text-slate-900">{project.heading}</strong> — Due: {project.dueDate}
            </span>
            <span
              className={`inline-flex w-fit rounded-full border px-2 py-1 text-xs font-medium ${getStatusChipClasses(
                project.status,
              )}`}
            >
              {formatStatusLabel(project.status)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrackerCard;
