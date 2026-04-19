type NonEditableKeys = "id" | "kind" | "createdAt";

export type EntityPatch<T extends { id: unknown; kind: unknown; createdAt: unknown }> = Partial<
  Omit<T, NonEditableKeys>
>;

export function updateEntity<T extends { id: unknown; kind: unknown; createdAt: unknown }>(
  entity: T,
  patch: EntityPatch<T>
): T {
  return { ...entity, ...patch };
}

// Example “view model” helpers using Pick/Omit
export type ProjectListItem = Pick<
  import("./types").Project,
  "id" | "name" | "status"
>;

export type TaskEditFormModel = Omit<import("./types").Task, "createdAt">;