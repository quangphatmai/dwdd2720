// src/utils/index.ts — the barrel
export { getProjectsByStatus, countByStatus, formatDueDate,
  upcomingDeadlines, findProjectById, listOverdueProjects } from './projectUtils';
export { formatTaskLabel, formatAssignee, formatStatus } from './formatting';
export { sumHours, warnIfNegativeHours } from './math';
export { summarizeTask, getTaskHours, type Task } from './tasks';
export { isNonEmptyString, isValidEstimateHours, isProjectStatus, validateProject } from './validation';