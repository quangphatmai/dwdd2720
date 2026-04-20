export type ID = string;

export type ProjectStatus = "planned" | "active" | "paused" | "completed" | "done";

export interface Project {
  id: ID;
  kind: "project";
  createdAt: number;
  name: string;
  status: ProjectStatus;
  description?: string;
  dueDateISO?: string; // optional
}

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: ID;
  kind: "task";
  createdAt: number;
  projectId: ID;
  title: string;
  done: boolean;
  completed?: boolean;
  priority: TaskPriority;
}

export interface TeamMember {
  id: ID;
  kind: "member";
  createdAt: number;
  fullName: string;
  role: "pm" | "dev" | "designer";
  email?: string;
  assignedProjectIds: ID[];
}

// Union type for mixed entities
export type AnyEntity = Project | Task | TeamMember;