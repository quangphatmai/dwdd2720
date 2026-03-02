import type { Project } from "./types";

export const sampleProjects: ReadonlyArray<Project> = [
  {
    id: "p-1001",
    name: "Onboarding Flow",
    owner: "Ava",
    status: "planned",
    estimateHours: 12,
    notes: "Define screens and copy before implementation.",
    clientName: "Acme Corp"
  },
  {
    id: "p-1002",
    name: "Project Tracker Module",
    owner: "Noah",
    status: "active",
    estimateHours: 6,
    clientName: "Acme Corp"
  },
    {
    id: "p-1003",
    name: "Release Checklist",
    owner: "Mia",
    status: "done",
    estimateHours: 2,
    notes: "Validated on staging.",
    clientName: "Acme Corp"
  }
];
