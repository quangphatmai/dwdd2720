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
    <section className="card w-full p-6">
      <div className="mb-6">
        <h2 className="title-md">All Projects</h2>
        <p className="mt-1 text-sm text-muted">Snapshot of tracked work and due dates.</p>
      </div>

      {trackerCards.length === 0 ? (
        <div className="empty-state px-4 py-8 text-center text-sm">
          No projects available yet.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {trackerCards.map((trackerCard) => (
            <li
              key={trackerCard.id}
              className="card-soft flex flex-col gap-1 px-4 py-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <strong className="text-(--text-primary)">{trackerCard.heading}</strong> — Due: {trackerCard.dueDate}
              </span>
              <span className={getStatusChipClasses(trackerCard.status)}>
                {formatStatusLabel(trackerCard.status)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-7 mb-4 flex items-center justify-between gap-3">
        <h2 className="title-md">Active Projects</h2>
        <span className="status-badge status-active">{activeProjects.length} active</span>
      </div>

      {activeProjects.length === 0 ? (
        <div className="empty-state px-4 py-8 text-center text-sm">
          No active projects right now.
        </div>
      ) : (
        <ul className="space-y-2.5">
          {activeProjects.map((project) => (
            <li
              key={project.id}
              className="card-soft flex flex-col gap-1 px-4 py-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <strong className="text-(--text-primary)">{project.heading}</strong> — Due: {project.dueDate}
              </span>
              <span className={getStatusChipClasses(project.status)}>
                {formatStatusLabel(project.status)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TrackerCard;
