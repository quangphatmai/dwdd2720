// src/utils/generics.ts
import type { Task, TeamMember } from "../domain/entities";

export type ID = string;

export type WithId = { id: ID };
export function updateById<T extends WithId>(
  items: T[],
  id: ID,
  patch: Partial<Omit<T, "id">>
): T[] {
  return items.map((item) => {
    if (item.id !== id) return item;
    return { ...item, ...patch };
  });
}

export function demoUpdateById(): void {
  const tasks: Task[] = [
    { id: "t1", name: "Write specs", kind: "task", projectId: "p1", dueDateIso: "2026-01-15", completed: false },
    { id: "t2", name: "Build UI", kind: "task", projectId: "p1", dueDateIso: "2026-01-20", completed: false },
  ];

  const updated = updateById(tasks, "t2", { name: "Build UI (V1)", completed: true });

  console.log("Before:", tasks.find((t) => t.id === "t2"));
  console.log("After:", updated.find((t) => t.id === "t2"));

  // Try this (should error):
  // updateById(tasks, "t2", { titlle: "typo" });

  // Try this (should error):
  // updateById(tasks, "t2", { id: "new" });
}

export function findById<T extends WithId>(items: T[], id: ID): T | undefined {
  return items.find((item) => item.id === id);
}

export function demoFindById(): void {
  const tasks: Task[] = [
    { id: "t1", name: "Plan sprint", kind: "task", projectId: "p1", dueDateIso: "2026-01-15", completed: false },
    { id: "t2", name: "Implement UI", kind: "task", projectId: "p1", dueDateIso: "2026-01-20", completed: false },
  ];

  const members: TeamMember[] = [
    { id: "u1", name: "Avery Chen", kind: "member", role: "pm", availability: "full-time" },
    { id: "u2", name: "Riley Patel", kind: "member", role: "dev", availability: "part-time" },
  ];

  const foundTask = findById(tasks, "t2");
  if (foundTask) {
    console.log("Found task name:", foundTask.name);
  } else {
    console.log("Task not found");
  }

  const foundMember = findById(members, "u1");
  console.log("Found member name:", foundMember?.name ?? "Missing");
}


// Generic function: T is a placeholder for "whatever type you call me with"
export function identity<T>(value: T): T {
  return value;
}

export function demoIdentity(): void {
  const task: Task = {
    id: "t1",
    name: "Set up Tailwind styles",
    kind: "task",
    projectId: "p1",
    dueDateIso: "2026-01-25",
    completed: false,
  };

  const result = identity(task);

  // Because of generics, result is inferred as Task (not any)
  console.log("identity<Task> result name:", result.name);
}