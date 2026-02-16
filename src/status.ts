export type ProjectStatus = "planned" | "active" | "blocked" | "done" | "draft" | "paused" | "completed";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  tags: string[];
  ownerEmail?: string;
  estimatedHours?: number;
  description?: string;
};

export const projectRecords: Project[] = [
  {
    id: "p1",
    name: "Client Website Redesign",
    status: "active",
    tags: ["design", "frontend"],
    ownerEmail: "pm@company.com",
    estimatedHours: 12,
    description: "Define steps and screens",
  },
  {
    id: "p2",
    name: "Mobile App",
    status: "blocked",
    tags: ["mobile", "backend"],
    ownerEmail: "qa@company.com",
    estimatedHours: 0, // intentionally 0 to test truthiness pitfalls
    description: "One-day bug cleanup",
  },
  {
    id: "p3",
    name: "SEO Audit",
    status: "paused",
    tags: ["seo"],
    estimatedHours: 8,
    description: "Waiting on brand assets",
  },
];
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

type NextAction =
  | "Fix missing info"
  | "Start project"
  | "Unblock project"
  | "Submit for review"
  | "Archive"
  | "No action";

function hasRequiredInfo(p: Project): boolean {
  // For the tracker, assume these are required to move forward:
  // - ownerEmail must be a non-empty string
  // - estimatedHours must be a number (0 is allowed, but null/undefined is not)
  // - description must be a non-empty string

  const hasOwner = typeof p.ownerEmail === "string" && p.ownerEmail.trim().length > 0;
  const hasEstimate = p.estimatedHours != null; // true for 0, false for null/undefined
  const hasDescription = typeof p.description === "string" && p.description.trim().length > 0;

  return hasOwner && hasEstimate && hasDescription;
}

function getNextAction(p: Project): NextAction {
  // Priority rule: if required info is missing, we can't proceed.
  if (!hasRequiredInfo(p)) {
    return "Fix missing info";
  }

  // Status-based routing after data is known-good
  if (p.status === "draft") {
    return "Start project";
  } else if (p.status === "blocked") {
    return "Unblock project";
  } else if (p.status === "active") {
    return "Submit for review";
  } else if (p.status === "paused") {
    return "Archive";
  } else if (p.status === "done" || p.status === "completed") {
    return "No action";
  }

  // We shouldn't get here because status is a union type,
  // but returning something keeps the function total.
  return "No action";
}

function getStatusLabel(p: Project): string {
  // Simple mapping based on one condition
  return p.status === "blocked" ? "Blocked (needs attention)" : `Status: ${p.status}`;
}

function shouldShowWarning(p: Project): boolean {
  // Another simple condition: warn if missing info OR blocked
  return !hasRequiredInfo(p) ? true : p.status === "blocked";
}

for (const p of projectRecords) {
  console.log(`[${p.id}] ${p.name} ->`, getNextAction(p), 
    "| ", getStatusLabel(p),
    "| Warning", shouldShowWarning(p)
  );
}


// Truthiness demo
function demoTruthiness() {
  const values = ["", "hello", 0, 5, null, undefined, NaN, [], {}, "0"];

  for (const v of values) {
    // Stringify carefully so you can “see” values like NaN and empty string
    const label = typeof v === "string" ? `"${v}"` : String(v);
    console.log(label.padEnd(12), "=>", v ? "truthy" : "falsy");
  }

  // Safe patterns
  const hours = 0;
  console.log("hours is missing?", hours == null); // false
  console.log("hours is falsy?", !hours); // true (this is why naive checks break)

  const email = "   ";
  console.log("email provided?", typeof email === "string" && email.trim().length > 0);
}

demoTruthiness();