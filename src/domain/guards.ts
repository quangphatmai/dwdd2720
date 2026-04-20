import type { Entity, Task, Project, TeamMember } from "./entities";

export function isTask(entity: Entity): entity is Task {
  return entity.kind === "task";
}

export function isProject(entity: Entity): entity is Project {
  return entity.kind === "project";
}

export function isTeamMember(entity: Entity): entity is TeamMember {
  return entity.kind === "member";
}

// Example of an `in`-based guard (useful if you don't have/ trust a discriminator)
export function hasDueDateIso(entity: Entity): entity is Task {
  return "dueDateIso" in entity;
}