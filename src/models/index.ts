// Create: src/models/index.ts

// Re-export everything that external code needs from the models folder
export type {
  ProjectStatus,
  StatusFilter,
  StatusInput,
  Project,
  BaseEntity,
  DraftProject,
  ActiveProject,
  PausedProject,
  CompletedProject,
  ProjectRecord,
} from './project';

export {
  normalizeStatus,
  statusLabelIf,
  statusLabelSwitch,
  canEditProject,
  formatProjectRecord,
} from './project';