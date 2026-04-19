import { useRef, useState, useEffect } from "react";
import { DataManager } from "../data/DataManager";
import type { Project, Task, TeamMember } from "../models/entities";

export default function GenericsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  // Mixed entities for demonstration
  interface MixedEntity {
    id: string;
    kind: "project" | "task" | "member";
    name?: string;
    status?: string;
    title?: string;
    completed?: boolean;
    fullName?: string;
    role?: string;
  }
  const [mixedEntities, setMixedEntities] = useState<MixedEntity[]>([]);
  
  const managersRef = useRef<{
    projectsManager: DataManager<Project>;
    tasksManager: DataManager<Task>;
    teamManager: DataManager<TeamMember>;
  } | null>(null);

  useEffect(() => {
    if (managersRef.current == null) {
      const projectsManager = new DataManager<Project>();
      const tasksManager = new DataManager<Task>();
      const teamManager = new DataManager<TeamMember>();

      // Add sample data
      projectsManager.add({ id: "p1", name: "Website Redesign", status: "active" });
      projectsManager.add({ id: "p2", name: "Mobile MVP", status: "planned" });
      projectsManager.add({ id: "p3", name: "API Integration", status: "active" });
      projectsManager.add({ id: "p4", name: "Dashboard Upgrade", status: "planned" });
      projectsManager.add({ id: "p5", name: "Cloud Migration", status: "active" });

      tasksManager.add({ id: "t1", projectId: "p1", title: "Create wireframes", done: false, priority: "medium" });

      teamManager.add({ id: "u1", fullName: "Avery Chen", role: "pm", assignedProjectIds: ["p1"] });

      // Update project p1 to "completed"
      projectsManager.updateById("p1", { status: "completed" });

      // Update task t1 to mark as done
      tasksManager.updateById("t1", { done: true, priority: "high" });

      // Add another team member
      teamManager.add({ id: "u2", fullName: "Jordan Smith", role: "dev", assignedProjectIds: ["p2"] });

      managersRef.current = { projectsManager, tasksManager, teamManager };
    }

    const managers = managersRef.current;
    setProjects(managers.projectsManager.getAll());
    setTasks(managers.tasksManager.getAll());
    setTeam(managers.teamManager.getAll());

    // Demonstrate sortBy with valid key
    const sortedProjects = managers.projectsManager.sortBy("name");
    // INTENTIONAL TYPE ERROR (uncomment to see TS protect you)
    // const invalid = managers.projectsManager.sortBy("invalidKey");

    console.log("Projects:", managers.projectsManager.getAll());
    console.log("Sorted Projects:", sortedProjects);
    console.log("Tasks:", managers.tasksManager.getAll());
    console.log("Team:", managers.teamManager.getAll());

    // Initialize mixed entities demo
    const mixedData: MixedEntity[] = [
      {
        id: "p1-mixed",
        kind: "project",
        name: "Capstone Planning",
        status: "active",
      },
      {
        id: "t1-mixed",
        kind: "task",
        title: "Add utility types",
        completed: false,
      },
      {
        id: "m1-mixed",
        kind: "member",
        fullName: "Sam Rivera",
        role: "dev",
      },
    ];
    setMixedEntities(mixedData);
  }, []);

  const handleUpdate = (type: "projects" | "tasks" | "team" | "sort") => {
    if (!managersRef.current) return;
    
    const managers = managersRef.current;
    
    if (type === "projects") {
      managers.projectsManager.updateById("p1", { name: "Website Redesign (Updated)" });
      setProjects(managers.projectsManager.getAll());
    } else if (type === "tasks") {
      managers.tasksManager.removeById("t1");
      setTasks(managers.tasksManager.getAll());
    } else if (type === "team") {
      managers.teamManager.updateById("u1", { fullName: "Avery Chen (Updated)" });
      setTeam(managers.teamManager.getAll());
    } else if (type === "sort") {
      const sorted = managers.projectsManager.sortBy("name");
      setSortedProjects(sorted);
      console.log("Sorted projects by name:", sorted);
    }
  };

  const handleMixedEntityAction = (id: string, action: string) => {
    setMixedEntities((current) => {
      const updated = [...current];
      const entity = updated.find((x) => x.id === id);
      if (!entity) return current;

      if (action === "project-done" && entity.kind === "project") {
        entity.status = "done";
      } else if (action === "task-toggle" && entity.kind === "task") {
        entity.completed = !entity.completed;
      } else if (action === "member-promote" && entity.kind === "member") {
        entity.role = "pm";
      }
      return updated;
    });
  };

  console.log("Projects:", projects);
  console.log("Tasks:", tasks);
  console.log("Team:", team);
  return (
    <>
      <section className="card p-6 sm:p-7">
        <h1 className="title-lg">Generic DataManager Demo</h1>
        <p className="mt-2 text-sm text-muted">
          Exploring TypeScript Generics with updateById, removeById, and reactive updates
        </p>
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-4">Projects</h2>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleUpdate("projects")}
            className="btn-base btn-primary"
          >
            Update Project Name
          </button>
          <button
            type="button"
            onClick={() => handleUpdate("sort")}
            className="btn-base btn-primary"
          >
            Sort by Name
          </button>
        </div>
        <pre className="overflow-auto bg-(--bg-surface-soft) p-4 rounded text-xs">
          {JSON.stringify(projects, null, 2)}
        </pre>
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-4">Sorted Projects (by Name)</h2>
        <pre className="overflow-auto bg-(--bg-surface-soft) p-4 rounded text-xs">
          {sortedProjects.length > 0 ? JSON.stringify(sortedProjects, null, 2) : "Click 'Sort by Name' to see sorted results"}
        </pre>
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-4">Tasks</h2>
        <button
          type="button"
          onClick={() => handleUpdate("tasks")}
          className="btn-base btn-primary mb-4"
        >
          Remove Task
        </button>
        <pre className="overflow-auto bg-(--bg-surface-soft) p-4 rounded text-xs">
          {JSON.stringify(tasks, null, 2)}
        </pre>
      </section>

      <section className="card p-6 sm:p-7">
        <h2 className="title-base mb-4">Team Members</h2>
        <button
          type="button"
          onClick={() => handleUpdate("team")}
          className="btn-base btn-primary mb-4"
        >
          Update Team Member
        </button>
        <pre className="overflow-auto bg-(--bg-surface-soft) p-4 rounded text-xs">
          {JSON.stringify(team, null, 2)}
        </pre>
      </section>

      <section className="card p-6 sm:p-7">
        <h1 className="title-lg">Mixed Entities Project Manager Demo</h1>
        <p className="mt-2 text-sm text-muted mb-6">
          Type-safe entity management using type guards and runtime narrowing
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="title-base mb-3">Projects</h2>
            <div className="space-y-2">
              {mixedEntities
                .filter((e) => e.kind === "project")
                .map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <span className="flex-1">
                      {p.name} ({p.status})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleMixedEntityAction(p.id, "project-done")}
                      className="btn-base btn-primary text-xs px-3 py-1"
                    >
                      Mark Done
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="title-base mb-3">Tasks</h2>
            <div className="space-y-2">
              {mixedEntities
                .filter((e) => e.kind === "task")
                .map((t) => (
                  <div key={t.id} className="flex items-center gap-3">
                    <span className="flex-1">
                      {t.title} ({t.completed ? "done" : "open"})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleMixedEntityAction(t.id, "task-toggle")}
                      className="btn-base btn-primary text-xs px-3 py-1"
                    >
                      Toggle Complete
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h2 className="title-base mb-3">Team Members</h2>
            <div className="space-y-2">
              {mixedEntities
                .filter((e) => e.kind === "member")
                .map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <span className="flex-1">
                      {m.fullName} ({m.role})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleMixedEntityAction(m.id, "member-promote")}
                      className="btn-base btn-primary text-xs px-3 py-1"
                    >
                      Promote to PM
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
