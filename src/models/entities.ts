export type ID = string;

export type ProjectStatus = "planned" | "active" | "paused" | "completed";

export interface Project {
  id: ID;
  name: string;
  status: ProjectStatus;
  dueDateISO?: string; // optional
}

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: ID;
  projectId: ID;
  title: string;
  done: boolean;
  priority: TaskPriority;
}

export interface TeamMember {
  id: ID;
  fullName: string;
  role: "pm" | "dev" | "designer";
  assignedProjectIds: ID[];
}