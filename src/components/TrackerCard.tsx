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
    <section style={{ marginTop: 12 }}>
      <h2>All Projects</h2>
      <ul>
        {trackerCards.map((trackerCard) => (
          <li key={trackerCard.id}>
            <strong>{trackerCard.heading}</strong> — Due: {trackerCard.dueDate}{" "}
            - Status: {trackerCard.status}
          </li>
        ))}
      </ul>

      <h2>Active Projects</h2>
      <ul>
        {activeProjects.map((project) => (
          <li key={project.id}>
            <strong>{project.heading}</strong> — Due: {project.dueDate}{" "}
            - Status: {project.status}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrackerCard;
