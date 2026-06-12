/**
 * Generate a random integer between min and max (inclusive)
 */
export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Generate a random array of given size with values between min and max
 */
export const generateRandomArray = (size, min = 5, max = 100) =>
  Array.from({ length: size }, () => randomInt(min, max))

/**
 * Create a bar state array from a value array
 * Each element: { value, state: 'default' }
 */
export const valuesToBars = (arr, state = 'default') =>
  arr.map((value) => ({ value, state }))

/**
 * Deep clone an array of bar objects
 */
export const cloneBars = (bars) =>
  bars.map((b) => ({ ...b }))

/**
 * Format milliseconds into human-readable string
 */
export const formatTime = (ms) => {
  if (ms < 1) return '<1ms'
  if (ms < 1000) return `${ms.toFixed(1)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

/**
 * Delay helper for async animations
 */
export const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Map bar state name to its color hex
 */
export const getBarColor = (state) => {
  const colorMap = {
    default: '#6366f1',
    comparing: '#ef4444',
    swapping: '#f97316',
    sorted: '#22c55e',
    pivot: '#eab308',
  }
  return colorMap[state] ?? colorMap.default
}

/**
 * Returns complexity badge color class
 */
export const complexityColor = (complexity) => {
  if (complexity.includes('n²') || complexity.includes('n^2')) return 'text-red-400 bg-red-400/10'
  if (complexity.includes('n log n')) return 'text-yellow-400 bg-yellow-400/10'
  if (complexity === 'O(n)') return 'text-green-400 bg-green-400/10'
  if (complexity === 'O(1)') return 'text-blue-400 bg-blue-400/10'
  if (complexity.includes('log')) return 'text-cyan-400 bg-cyan-400/10'
  return 'text-gray-400 bg-gray-400/10'
}
