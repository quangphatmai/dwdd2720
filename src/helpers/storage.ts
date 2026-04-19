import type { AnyEntity, Project, Task, TeamMember } from "./types";
import { isAnyEntity, isProject, isTask, isTeamMember, isRecord } from "./typeGuards";

const STORAGE_KEY = "pm.entities.v1";

export function saveEntities(entities: AnyEntity[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entities));
}

export function loadEntities(): AnyEntity[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) return [];

  return parsed.filter(isAnyEntity);
}

export function splitEntities(entities: AnyEntity[]): {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
} {
  return {
    projects: entities.filter(isProject),
    tasks: entities.filter(isTask),
    members: entities.filter(isTeamMember),
  };
}

// Optional: load a settings object safely (demo of isRecord)
export function loadSettings(): { theme?: string } {
  const raw = localStorage.getItem("pm.settings.v1");
  if (!raw) return {};

  const parsed: unknown = JSON.parse(raw);
  if (!isRecord(parsed)) return {};

  const theme = typeof parsed.theme === "string" ? parsed.theme : undefined;
  return { theme };
}