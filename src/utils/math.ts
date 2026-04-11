export function sumHours(hours: number[]): number {
  // We start at 0 so even an empty array returns 0 (not undefined)
  return hours.reduce((total, h) => total + h, 0);
}

export function warnIfNegativeHours(hours: number[]): void {
  for (const h of hours) {
    if (h < 0) {
      console.warn(
        `Suspicious entry: negative hours (${h}). Check your task data.`,
      );
    }
  }
}