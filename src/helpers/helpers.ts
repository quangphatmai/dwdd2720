export function sumHours(hours: number[]): number {
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0)
}

export const formatTaskLabel = (taskName: string, projectName: string): string => {
  return `${projectName}: ${taskName}`
}

export const formatAssignee = (assigneeName?: string): string => {
  if (assigneeName === undefined) {
    return 'Unassigned'
  }

  // Optional: trim to prevent weird spacing in labels
  const clean = assigneeName.trim()
  return clean.length === 0 ? 'Unassigned' : `Assigned to ${clean}`
}

export const formatStatus = (status: string = 'open'): string => {
  // Normalize casing for display
  const clean = status.trim().toLowerCase()
  if (clean === 'in_progress') return 'In Progress'
  if (clean === 'done') return 'Done'
  if (clean === 'blocked') return 'Blocked'
  return 'Open'
}