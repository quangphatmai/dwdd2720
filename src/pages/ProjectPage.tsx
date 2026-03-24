import { useState, useMemo, useEffect } from "react";
import { ProjectDashboard } from "../components/ProjectDashboard";
import { projects as initialProjects } from "../data/projects";
import type { Project, ProjectStatus } from "../models/project";
import { AddProjectForm } from "../components/AddProjectForm";

type StatusFilter = ProjectStatus | "all";

export default function ProjectPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const [projects, setProjects] = useState<Project[]>(initialProjects);

  console.log("Current status filter:", statusFilter);

  const filteredProjects = useMemo(() => {
    if (statusFilter === "all") return projects;
    return projects.filter((p) => p.status === statusFilter);
  }, [projects, statusFilter]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function handleAddProject(project: Project) {
    setProjects((prev) => [...prev, project]);

    // Optional UX: select the newly added project
    setSelectedProjectId(project.id);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Project Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your projects and track their progress.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-600">Filter projects by status.</p>
        </div>
        <div className="flex items-center gap-3">
          <label
            htmlFor="statusFilter"
            className="text-sm font-semibold text-slate-700"
          >
            Status
          </label>

          <select
            id="statusFilter"
            className="h-10 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 font-medium hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 cursor-pointer transition-all"
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setStatusFilter(e.target.value as StatusFilter);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="done">Done</option>
            <option value="planned">Planned</option>
            <option value="blocked">Blocked</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>
          <button
            type="button"
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
            onClick={() => {
              setStatusFilter("all");
            }}
          >
            Clear
          </button>
        </div>
      </div>
      <div className ="my-6">
          <AddProjectForm onAdd={handleAddProject} />
      </div>

      <ProjectDashboard
        projects={filteredProjects}
        selectedProjectId={selectedProjectId}
        onProjectClick={(id) => {
          setSelectedProjectId(id);
        }}
      />
      <p className="mt-4 text-sm text-slate-600">
        Showing <span className="font-medium">{filteredProjects.length}</span>{" "}
        of <span className="font-medium">{projects.length}</span> projects
      </p>
      {/*       {selectedProject ? (
        <div className="mt-2">
          <div className="text-base font-medium text-gray-900">
            {selectedProject.name}
          </div>
          <div className="mt-1 text-sm font-mono text-gray-600">
            id: {selectedProject.id}
          </div>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-600">No project selected.</p>
      )} */}
    </div>
  );
}
