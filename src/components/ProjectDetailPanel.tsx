

// Adjust this import path to where your Project type is defined.
import type { Project } from "../models/project";

export type ProjectDetailPanelProps = {
  projectId: string | null;
  projects: Project[];
};

export function ProjectDetailPanel(props: ProjectDetailPanelProps) {
  const { projectId, projects } = props;

  if (projectId === null) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-slate-700">
        <div className="text-sm font-medium text-slate-900">Project details</div>
        <div className="mt-1 text-sm text-slate-600">Click a project to see details.</div>
      </div>
    );
  }

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <div className="text-sm font-medium">Project not found</div>
        <div className="mt-1 text-sm text-amber-800">
          The selected project may have been deleted.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>
          <div className="mt-1 text-sm text-slate-600">Client: {project.clientName}</div>
        </div>

        <div className="text-right">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Status</div>
          <div className="text-sm font-semibold text-slate-900">{project.status}</div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Due date</div>
          <div className="text-sm text-slate-900">{project.dueDate ?? "Not set"}</div>
        </div>

        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Tags</div>
          {!project.tags || project.tags.length === 0 ? (
            <div className="text-sm text-slate-600">No tags</div>
          ) : (
            <div className="mt-1 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}