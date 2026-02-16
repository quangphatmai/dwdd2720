export type ProjectStatus = "planned" | "active" | "blocked" | "done" | "draft" | "paused" | "completed";

export interface Project {
  /** A stable identifier we never want to accidentally change */
  readonly id: string;

  /** Human-friendly name shown in the UI */
  name: string;

  /** Current workflow status */
  status: ProjectStatus;

  /** ISO date string (e.g., 2025-01-15). Optional because not all projects have a deadline yet. */
  dueDate?: string;

  /** Tags are a list, so we use an array type */
  tags: string[];

  /** Optional free-form notes */
  notes?: string;
  ownerEmail?: string;
  estimatedHours?: number; // important: 0 is a valid number, but it's falsy
  description?: string;
}