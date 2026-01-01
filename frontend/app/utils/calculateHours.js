/**
 * Calculate hours between time in and time out
 * @param {string} timeIn - Time in format "HH:MM"
 * @param {string} timeOut - Time out format "HH:MM"
 * @returns {number} - Calculated hours (decimal)
 */
export function calculateHours(timeIn, timeOut) {
  if (!timeIn || !timeOut) return 0;

  const [inHours, inMinutes] = timeIn.split(":").map(Number);
  const [outHours, outMinutes] = timeOut.split(":").map(Number);

  const inTotalMinutes = inHours * 60 + inMinutes;
  const outTotalMinutes = outHours * 60 + outMinutes;

  if (outTotalMinutes <= inTotalMinutes) {
    // Handle overnight shifts (assume next day)
    const totalMinutes = 24 * 60 - inTotalMinutes + outTotalMinutes;
    return parseFloat((totalMinutes / 60).toFixed(2));
  }

  const totalMinutes = outTotalMinutes - inTotalMinutes;
  return parseFloat((totalMinutes / 60).toFixed(2));
}

/**
 * Calculate total hours from an array of time logs
 * @param {Array} timeLogs - Array of time log objects
 * @returns {number} - Total hours
 */
export function calculateTotalHours(timeLogs) {
  return timeLogs.reduce((total, log) => total + (log.hours || 0), 0);
}

/**
 * Calculate progress percentage
 * @param {number} renderedHours - Total rendered hours
 * @param {number} requiredHours - Required OJT hours (default: 600)
 * @returns {number} - Progress percentage (0-100)
 */
export function calculateProgress(renderedHours, requiredHours = 600) {
  if (requiredHours === 0) return 0;
  const percentage = (renderedHours / requiredHours) * 100;
  return Math.min(100, Math.max(0, parseFloat(percentage.toFixed(2))));
}

