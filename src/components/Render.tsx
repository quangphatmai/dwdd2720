import { useEffect, useRef } from "react";
import type { Project, Task, TeamMember } from "../models/entities";
import { el, renderList } from "../utils/render";

const projects: Project[] = [
  { id: "p1", name: "Capstone", status: "active", dueDateISO: "2026-01-15" },
];

const tasks: Task[] = [
  {
    id: "t1",
    projectId: "p1",
    title: "Add generic helpers",
    done: false,
    priority: "high",
  },
  {
    id: "t2",
    projectId: "p1",
    title: "Render entities",
    done: true,
    priority: "medium",
  },
];

const members: TeamMember[] = [
  { id: "u1", fullName: "Avery Chen", role: "pm", assignedProjectIds: ["p1"] },
];

export default function Render() {
  const projectsRef = useRef<HTMLUListElement | null>(null);
  const tasksRef = useRef<HTMLUListElement | null>(null);
  const membersRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!projectsRef.current || !tasksRef.current || !membersRef.current) {
      return;
    }

    renderList(projectsRef.current, projects, (p) => {
      return el("li", "mt-1", `${p.name} — ${p.status}`);
    });

    renderList(tasksRef.current, tasks, (t) => {
      const label = t.done ? "done" : "todo";
      return el("li", "mt-1", `[${label}] ${t.title} (${t.priority})`);
    });

    renderList(membersRef.current, members, (m) => {
      return el("li", "mt-1", `${m.fullName} — ${m.role}`);
    });
  }, []);

  return (
    <section className="mt-6">
      <h1 className="text-2xl font-bold">Project Manager</h1>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <ul ref={projectsRef} className="list-disc pl-6" />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <ul ref={tasksRef} className="list-disc pl-6" />
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <ul ref={membersRef} className="list-disc pl-6" />
      </section>
    </section>
  );
}
