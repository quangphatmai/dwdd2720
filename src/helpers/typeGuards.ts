import type { Project, Task, TeamMember, AnyEntity } from "../models/entities";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isProject(value: unknown): value is Project {
  if (!isRecord(value)) return false;
  return (
    value.kind === "project" &&
    typeof value.id === "string" &&
    typeof value.createdAt === "number" &&
    typeof value.name === "string" &&
    (value.status === "planned" || 
     value.status === "active" || 
     value.status === "paused" ||
     value.status === "completed" ||
     value.status === "done")
  );
}

export function isTask(value: unknown): value is Task {
  if (!isRecord(value)) return false;
  return (
    value.kind === "task" &&
    typeof value.id === "string" &&
    typeof value.createdAt === "number" &&
    typeof value.projectId === "string" &&
    typeof value.title === "string" &&
    typeof value.done === "boolean"
  );
}

export function isTeamMember(value: unknown): value is TeamMember {
  if (!isRecord(value)) return false;
  return (
    value.kind === "member" &&
    typeof value.id === "string" &&
    typeof value.createdAt === "number" &&
    typeof value.fullName === "string" &&
    (value.role === "pm" || value.role === "dev" || value.role === "designer")
  );
}

export function isAnyEntity(value: unknown): value is AnyEntity {
  return isProject(value) || isTask(value) || isTeamMember(value);
}