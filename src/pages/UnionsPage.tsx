import { useState, useMemo } from "react";
import { renderEntityCard } from "../utils";
import type { Entity, Project, Task, TeamMember } from "../domain/entities";
import { isProject, isTask, isTeamMember } from "../domain/guards";

// Type-safe generic field updater using keyof
function updateField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

export default function UnionsPage() {
  const initialEntities: Entity[] = [
    {
      kind: "project",
      id: "p1",
      name: "Website Redesign",
      status: "active",
      budgetUsd: 12000,
    },
    {
      kind: "task",
      id: "t1",
      name: "Build landing page",
      projectId: "p1",
      dueDateIso: "2026-01-15",
      completed: false,
    },
    {
      kind: "member",
      id: "m1",
      name: "Avery",
      role: "dev",
      availability: "full-time",
    },
    {
      kind: "project",
      id: "p2",
      name: "Mobile App",
      status: "active",
      budgetUsd: 25000,
    },
    {
      kind: "task",
      id: "t2",
      name: "Setup authentication",
      projectId: "p2",
      dueDateIso: "2026-02-01",
      completed: true,
    },
    {
      kind: "member",
      id: "m2",
      name: "Jordan",
      role: "pm",
      availability: "part-time",
    },
  ];

  const [entities, setEntities] = useState<Entity[]>(initialEntities);

  // Type-safe update handlers for each entity type
  const updateProject = (proj: Project, key: keyof Project, value: Project[keyof Project]) => {
    const updated = updateField(proj, key, value);
    setEntities(entities.map(e => (e.id === updated.id ? updated : e)));
  };

  const updateTask = (task: Task, key: keyof Task, value: Task[keyof Task]) => {
    const updated = updateField(task, key, value);
    setEntities(entities.map(e => (e.id === updated.id ? updated : e)));
  };

  const updateMember = (member: TeamMember, key: keyof TeamMember, value: TeamMember[keyof TeamMember]) => {
    const updated = updateField(member, key, value);
    setEntities(entities.map(e => (e.id === updated.id ? updated : e)));
  };

  // Use guards to filter entities into typed sub-arrays
  const projects = useMemo(() => entities.filter(isProject), [entities]);
  const tasks = useMemo(() => entities.filter(isTask), [entities]);
  const members = useMemo(() => entities.filter(isTeamMember), [entities]);

  return (
    <>
      <section className="card p-6 sm:p-7">
        <h1 className="title-lg">Discriminated Unions Demo</h1>
        <p className="mt-2 text-sm text-muted">
          TypeScript discriminated unions provide type-safe pattern matching for different entity kinds
        </p>
        <p className="mt-3 text-sm text-subtle">
          Guards filter the entity list into typed groups. Type-safe <code className="bg-gray-200 px-1 py-0.5 rounded">keyof</code> constraints ensure only valid properties can be updated with matching types.
        </p>
      </section>

      {/* Type-Safe Update Demo */}
      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-4">🔒 Type-Safe Field Updates</h2>
        <p className="text-sm text-subtle mb-4">
          The <code className="bg-gray-200 px-1 py-0.5 rounded">updateField&lt;T, K extends keyof T&gt;</code> pattern enforces that only valid properties can be updated with correct types.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => {
              const proj = projects[0];
              if (proj) updateProject(proj, "status", "done");
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded mx-2 cursor-pointer"
          >
            Mark First Project as Done
          </button>
          <button
            onClick={() => {
              const task = tasks[0];
              if (task) updateTask(task, "completed", true);
            }}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded mx-2 cursor-pointer"
          >
            Complete First Task
          </button>
          <button
            onClick={() => {
              const member = members[0];
              if (member) updateMember(member, "availability", "part-time");
            }}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded mx-2 cursor-pointer"
          >
            Change First Member to Part-Time
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-6">📁 Projects ({projects.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((entity) => renderEntityCard(entity))}
        </div>
      </section>

      {/* Tasks Section */}
      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-6">📋 Tasks ({tasks.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((entity) => renderEntityCard(entity))}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-6">👥 Team Members ({members.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {members.map((entity) => renderEntityCard(entity))}
        </div>
      </section>
    </>
  );
}
