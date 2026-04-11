import type { Project, ProjectStatus } from "../../models";
import { isNonEmptyString, isValidEstimateHours } from "../../utils";

export function isProjectStatus(value: unknown): value is ProjectStatus {
  return value === "planned" || value === "active" || value === "done";
}

export function validateProject(value: unknown): { ok: true; project: Project } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof value !== "object" || value === null) {
    return { ok: false, errors: ["Project must be an object."] };
  }

  // Using a loose record lets us read properties from unknown safely.
  const record = value as Record<string, unknown>;

  if (!isNonEmptyString(record.id)) errors.push("id must be a non-empty string");
  if (!isNonEmptyString(record.name)) errors.push("name must be a non-empty string");
  if (!isNonEmptyString(record.owner)) errors.push("owner must be a non-empty string");
  if (!isProjectStatus(record.status)) errors.push("status must be one of: planned, active, done");
  if (!isValidEstimateHours(record.estimateHours)) errors.push("estimateHours must be a non-negative number");

  if (record.notes !== undefined && !isNonEmptyString(record.notes)) {
    errors.push("notes must be a non-empty string when provided");
  }

  if (errors.length > 0) return { ok: false, errors };

  // At this point, we've checked every field, so it's safe to construct a Project.
  const project: Project = {
    id: record.id as string,
    name: record.name as string,
    ownerEmail: record.owner as string,
    status: record.status as ProjectStatus,
    estimatedHours: record.estimateHours as number,
    clientName: record.clientName as string,
    ...(record.notes !== undefined ? { notes: record.notes as string } : {})
  };

  return { ok: true, project };
}