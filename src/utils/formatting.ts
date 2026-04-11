// src/utils/formatting.ts — string formatting helpers
export function formatTaskLabel(taskName: string, projectName: string): string {
  return `${projectName}: ${taskName}`;
}

export function formatAssignee(assigneeName?: string): string {
  if (assigneeName === undefined) return 'Unassigned';
  const clean = assigneeName.trim();
  return clean.length === 0 ? 'Unassigned' : `Assigned to ${clean}`;
}

export function formatStatus(status: string = 'open'): string {
  const clean = status.trim().toLowerCase();
  if (clean === 'in_progress') return 'In Progress';
  if (clean === 'done') return 'Done';
  if (clean === 'blocked') return 'Blocked';
  return 'Open';
}
