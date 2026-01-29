import type { Project, ProjectStatus } from "../models/project";

export function getProjectsByStatus(
  projects: Project[],
  status: ProjectStatus
): Project[] {
  return projects.filter((p) => p.status === status);
}

export function countByStatus(
  projects: Project[],
  status: ProjectStatus
): number {
  return getProjectsByStatus(projects, status).length;
}

export function formatDueDate(project: Project): string {
  // Optional property: we must handle the "missing" case
  if (!project.dueDate) return "No due date";
  return project.dueDate;
}