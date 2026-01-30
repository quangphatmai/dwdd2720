export type ProjectStatus = "draft" | "active" | "paused" | "completed";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
};

export const projectA: Project = {
  id: "p1",
  name: "Client Website Redesign",
  status: "active",
};

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
