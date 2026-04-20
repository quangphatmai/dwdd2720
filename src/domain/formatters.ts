import type { Entity } from "./entities";

export function describeEntity(entity: Entity): string {
  switch (entity.kind) {
    case "project":
      return `Project: ${entity.name} (status: ${entity.status}, budget: $${entity.budgetUsd})`;

    case "task":
      return `Task: ${entity.name} (due: ${entity.dueDateIso}, completed: ${entity.completed})`;

    case "member":
      return `Member: ${entity.name} (role: ${entity.role}, availability: ${entity.availability})`;

    default: {
      // Exhaustiveness check: if a new kind is added and not handled above,
      // TypeScript will fail here.
      const _never: never = entity;
      return _never;
    }
  }
}