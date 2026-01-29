// src/trackerBasics.ts

// A project ID should not change once created
const projectId = "PRJ-101";

// These values might change as the project evolves
let projectName = "Website Redesign";
let taskCount: number = 42;
let isActive = true;

console.log({ projectId, projectName, taskCount, isActive });



// Try this on purpose (then undo it):
// projectId = "PRJ-999"; // ❌ Error: Cannot assign to 'projectId' because it is a constant.

// More project tracker facts using primitive types

const ownerEmail: string = "sam@company.com";
const maxCollaborators: number = 5;
const isArchived: boolean = false;

// A value that might not exist yet (e.g., not loaded from server)
let lastSyncedAt: Date | undefined = undefined;

// A value that is intentionally empty (e.g., no description provided)
let projectDescription: string | null = null;

console.log({ ownerEmail, maxCollaborators, isArchived, lastSyncedAt, projectDescription });


// Type inference: TypeScript can tell this is a number
let completedTasks = 1;
completedTasks = completedTasks + 1; // OK

// When starting "empty", annotate your intent
let priority: "low" | "medium" | "high" = "medium";
priority = "low"; // OK
// priority = "urgent"; // ❌ Error: Type '"urgent"' is not assignable to type '"low" | "medium" | "high"'.

console.log({ completedTasks, priority });


// Tracker-style calculations
const totalTasks: number = 42;
const doneTasks: number = 5;

const percentComplete: number = Math.round((doneTasks / totalTasks) * 100);
const statusLabel: string = isActive ? "Active" : "Paused";

const summaryLine: string = `${projectName} (${statusLabel}) - ${percentComplete}% complete`;
console.log(summaryLine);

// Example comparison
const isFullyDone: boolean = doneTasks === totalTasks;
console.log({ isFullyDone });

export const trackerCard = {
  projectId,
  projectName,
  taskCount,
  isActive,
  priority,
};