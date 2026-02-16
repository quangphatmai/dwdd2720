import { projects } from "../data/projects";
import type { Project } from "../models/project";

type TrackerCard = {
  id: string;
  heading: string; // formatted title
  status: string;
  pointsLabel: string;
  dueDate: string;
};

const trackerCards: TrackerCard[] = projects.map(
  (project: Project): TrackerCard => {
    return {
      id: project.id,
      heading: project.name.toUpperCase(),
      status: project.status ?? "unknown",
      pointsLabel: "0 pts",
      dueDate: project.dueDate ?? "TBD",
    };
  },
);

console.log("trackerCards", trackerCards);

// Notice: original data is unchanged
console.log("original projects still intact", projects);

function TrackerCard() {
  return (
    <section style={{ marginTop: 12 }}>
      <h2>Active Projects</h2>
      <ul>
        {trackerCards.map((trackerCard) => (
          <li key={trackerCard.id}>
            <strong>{trackerCard.heading}</strong> — Due: {trackerCard.dueDate}{" "}
            - Status: {trackerCard.status}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TrackerCard;
