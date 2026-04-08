export type ProjectStatus =
  | "planned"
  | "active"
  | "blocked"
  | "done"
  | "draft"
  | "paused"
  | "completed";

export type StatusFilter = ProjectStatus | "all";
export type StatusInput = ProjectStatus | string | null | undefined;

const allowedStatuses: readonly ProjectStatus[] = [
  "draft",
  "active",
  "paused",
  "completed",
  "planned",
  "done",
] as const;

export function normalizeStatus(input: StatusInput): ProjectStatus | null {
  // Handle null/undefined early
  if (input == null) return null;

  // If it's already a ProjectStatus, it's safe.
  // But at runtime it's still just a string, so we validate with a list.
  if (typeof input === "string") {
    const trimmed = input.trim().toLowerCase();
    if ((allowedStatuses as readonly string[]).includes(trimmed)) {
      return trimmed as ProjectStatus;
    }
  }

  return null;
}

/**
 * Base shape for all entity types in the app.
 * Any database-backed record should extend this.
 */
export interface BaseEntity {
  /** Stable identifier — never changes after creation */
  readonly id: string;
  /** When the record was created (ISO 8601 string or epoch ms) */
  createdAt?: string;
}

export interface Project extends BaseEntity {

  /** Human-friendly name shown in the UI */
  name: string;

  /** Current workflow status */
  status: ProjectStatus;

  /** ISO date string (e.g., 2025-01-15). Optional because not all projects have a deadline yet. */
  dueDate?: string;

  /** Tags are a list, so we use an array type */
  tags?: string[] 

  /** Optional free-form notes */
  notes?: string;
  ownerEmail?: string;
  estimatedHours?: number; /** 0 is valid — use ?? not || for defaults */
  description?: string;
  days?: number;
  clientName: string;
}

// ❌ Intentionally wrong to demonstrate safety:
export const projectB: Project = {
  id: "p2",
  name: "Mobile App",
  // @ts-expect-error - "archived" is not part of ProjectStatus
  status: "archived",
};

export function statusLabelIf(status: ProjectStatus): string {
  if (status === "draft") return "Draft (not visible to client)";
  if (status === "active") return "Active (in progress)";
  if (status === "paused") return "Paused (waiting)";
  // By process of elimination, TypeScript can infer this is "completed"
  return "Completed (delivered)";
}

function assertNever(value: never): never {
  throw new Error("Unhandled case: " + value);
}

export function statusLabelSwitch(status: ProjectStatus): string {
  switch (status) {
    case "draft":
      return "Draft (not visible to client)";
    case "blocked":
      return "Blocked (needs attention)";
    case "planned":
      return "Planned (not started)";
    case "done":
      return "Done (delivered)";
    case "active":
      return "Active (in progress)";
    case "paused":
      return "Paused (waiting)";
    case "completed":
      return "Completed (delivered)";
    default:
      // If you add a new status to ProjectStatus and forget to handle it,
      // TypeScript will error here because `status` won't be `never` anymore.
      return assertNever(status);
  }
}

export function canEditProject(status: ProjectStatus): boolean {
  // Client story rule example: completed projects are read-only.
  return status !== "completed";
}

// Example of discriminated unions for project records
export type DraftProject = {
  id: string;
  name: string;
  status: "draft";
  lastEditedAt: string;
};

export type ActiveProject = {
  id: string;
  name: string;
  status: "active";
  etaDays: number;
};

export type PausedProject = {
  id: string;
  name: string;
  status: "paused";
  pauseReason: string;
};

export type CompletedProject = {
  id: string;
  name: string;
  status: "completed";
  completedAt: string;
};

export type ProjectRecord =
  | DraftProject
  | ActiveProject
  | PausedProject
  | CompletedProject;

export function formatProjectRecord(p: ProjectRecord): string {
  switch (p.status) {
    case "draft":
      return `${p.name} (Draft) — last edited ${p.lastEditedAt}`;
    case "active":
      return `${p.name} (Active) — ETA ${p.etaDays} days`;
    case "paused":
      return `${p.name} (Paused) — reason: ${p.pauseReason}`;
    case "completed":
      return `${p.name} (Completed) — done on ${p.completedAt}`;
  }
}
