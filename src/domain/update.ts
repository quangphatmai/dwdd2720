import type { Entity, Task, Project, TeamMember } from "./entities";

// Generic helper for any object: only allows valid keys and matching value types
export function updateObjectField<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

// Entity-specific helper that narrows first, then updates with correct keys
export function updateEntityField(entity: Entity, key: string, value: unknown): Entity {
  switch (entity.kind) {
    case "task": {
      // Within this block entity is Task
      const task = entity satisfies Task ? entity : entity;
      if (key === "completed" && typeof value === "boolean") {
        return updateObjectField(task, "completed", value);
      }
      if (key === "dueDateIso" && typeof value === "string") {
        return updateObjectField(task, "dueDateIso", value);
      }
      return task;
    }

    case "project": {
      const project = entity satisfies Project ? entity : entity;
      if (key === "status" && (value === "planned" || value === "active" || value === "done")) {
        return updateObjectField(project, "status", value);
      }
      if (key === "budgetUsd" && typeof value === "number") {
        return updateObjectField(project, "budgetUsd", value);
      }
      return project;
    }

    case "member": {
      const member = entity satisfies TeamMember ? entity : entity;
      if (key === "availability" && (value === "full-time" || value === "part-time")) {
        return updateObjectField(member, "availability", value);
      }
      return member;
    }

    default: {
      const _never: never = entity;
      return _never;
    }
  }
}