import type { Project } from "../models";

export const projects: Project[] = [
  {
    id: "p-1001",
    name: "Client Onboarding Flow",
    status: "active",
    dueDate: "2025-02-15",
    tags: ["frontend", "ux"],
    notes: "Waiting on final copy from marketing.",
    days: 30,
    clientName: "Acme Corp"
  },
  {
    id: "p-1002",
    name: "Billing Integration",
    status: "blocked",
    dueDate: "2026-02-28",
    tags: ["backend", "payments"],
    // dueDate is optional, so we can omit it for now
    days: 45,
    clientName: "Globex Inc"
  },
  {
    id: "p-1003",
    name: "QA Automation Setup",
    status: "planned",
    dueDate: "2025-03-01",
    tags: ["devops"],
    days: 20,
    clientName: "Initech"
  },
  {
    id: "p-1004",
    name: "Mobile App Redesign",
    status: "active",
    dueDate: "2025-04-15",
    tags: ["mobile", "design"],
    notes: "Designs are in progress, expected by end of month.",
    days: 60,
    clientName: "Umbrella Corp"
  },
  {
    id: "p-1005",
    name: "API Documentation",
    status: "planned",
    dueDate: "2025-05-15",
    tags: ["backend", "documentation"],
    days: 15,
    clientName: "Vandelay Industries"
  },
  {
    id: "p-1006",
    name: "Customer Support Chatbot",
    status: "active",
    dueDate: "2025-06-30",
    tags: ["ai", "customer-support"],
    notes: "Initial prototype is showing promising results.",
    days: 90,
    clientName: "Soylent Corp"
  },
  {
    id: "p-1007",
    name: "Data Migration to Cloud",
    status: "completed",
    dueDate: "2025-07-31",
    tags: ["cloud", "data"],
    days: 120,
    clientName: "Stark Industries"
  },
  {
    id: "p-1008",
    name: "Internal HR Portal",
    status: "done",
    dueDate: "2025-08-15",
    tags: ["internal", "hr"],
    days: 25,
    clientName: "Wayne Enterprises"
  },
  {
    id: "p-1009",
    name: "E-commerce Platform Launch",
    status: "draft", 
    dueDate: "2025-09-30",
    tags: ["e-commerce", "launch"],
    days: 180,
    clientName: "Hooli"
  }
];

// Try a deliberate mistake (then fix it):
// projects.push({ id: "p-9999", name: "Bad Project", status: "in-progress", tags: [] });
//                                     ^ TypeScript will reject "in-progress" because it's not in ProjectStatus
