import { formatAssignee, formatStatus } from "../utils";

export type Task = {
  name: string;
  project: string;
  hours?: number;
  assignee?: string;
  status?: string;
};

export function getTaskHours(task: Task): number {
  // Default missing hours to 0 to keep totals stable
  return task.hours ?? 0;
}

export function summarizeTask(task: Task): string {
  const base = `${task.project}: ${task.name}`;
  const statusPart = task.status ? ` [${formatStatus(task.status)}]` : "";
  const assigneePart = ` — ${formatAssignee(task.assignee)}`;
  const hoursPart = ` — ${getTaskHours(task)}h`;
  return base + statusPart + assigneePart + hoursPart;
}
