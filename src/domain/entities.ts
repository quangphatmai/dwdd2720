export type EntityKind = "project" | "task" | "member";

export type BaseEntity = {
  id: string;
  name: string;
};

export type Project = BaseEntity & {
  kind: "project";
  status: "planned" | "active" | "done";
  budgetUsd: number;
};

export type Task = BaseEntity & {
  kind: "task";
  projectId: string;
  dueDateIso: string; // ISO string so it serializes well
  completed: boolean;
};

export type TeamMember = BaseEntity & {
  kind: "member";
  role: "pm" | "dev" | "designer";
  availability: "full-time" | "part-time";
};

export type Entity = Project | Task | TeamMember;