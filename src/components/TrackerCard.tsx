import { projects } from "../data/projects";
import type { Project } from "../models/project";

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
