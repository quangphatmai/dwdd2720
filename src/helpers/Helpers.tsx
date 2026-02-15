import { formatTaskLabel, sumHours } from './helpers'
import { formatAssignee, formatStatus } from './helpers'

console.log(formatTaskLabel('Fix login bug', 'Website Redesign'))
console.log('Total hours (should be 6):', sumHours([1, 2, 3]))

console.log(formatAssignee())
console.log(formatAssignee('  Sam  '))
console.log(formatStatus())
console.log(formatStatus('done'))