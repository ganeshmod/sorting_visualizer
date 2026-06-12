/**
 * Sorting algorithms in JavaScript — mirrors the Java implementations.
 * Each function is a generator that yields animation frames.
 *
 * Each frame is: { bars: [{ value, state }], line: <number> }
 *   - bars: full array state (value + visual state)
 *   - line: the line number in CODE_SNIPPETS[algo] currently "executing"
 *
 * States: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot'
 * Stats object is mutated by reference: { comparisons, swaps }
 */

// ─────────────────────────────────────────────
// BUBBLE SORT
// ─────────────────────────────────────────────
export function* bubbleSortGenerator(arr, stats) {
  const a = [...arr]
  const n = a.length
  const sorted = new Array(n).fill(false)

  yield frame(a, sorted, [], 'default', 2) // int n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    yield frame(a, sorted, [], 'default', 3) // outer loop

    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++
      yield frame(a, sorted, [j, j + 1], 'comparing', 6) // if (arr[j] > arr[j+1])

      if (a[j] > a[j + 1]) {
        stats.swaps++
        yield frame(a, sorted, [j, j + 1], 'swapping', 8) // int temp = arr[j]
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
        yield frame(a, sorted, [j, j + 1], 'swapping', 10) // arr[j+1] = temp
      }
    }
    sorted[n - i - 1] = true
    yield frame(a, sorted, [], 'default', 14) // if (!swapped) break

    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) sorted[k] = true
      break
    }
  }
  sorted[0] = true
  yield frame(a, sorted, [], 'default', 16)
}

// ─────────────────────────────────────────────
// SELECTION SORT
// ─────────────────────────────────────────────
export function* selectionSortGenerator(arr, stats) {
  const a = [...arr]
  const n = a.length
  const sorted = new Array(n).fill(false)

  yield frame(a, sorted, [], 'default', 2)

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    yield frame(a, sorted, [minIdx], 'pivot', 4) // int minIndex = i

    for (let j = i + 1; j < n; j++) {
      stats.comparisons++
      yield frame(a, sorted, [j, minIdx], 'comparing', 6) // if (arr[j] < arr[minIndex])
      if (a[j] < a[minIdx]) {
        minIdx = j
        yield frame(a, sorted, [minIdx], 'pivot', 7) // minIndex = j
      }
    }

    if (minIdx !== i) {
      stats.swaps++
      yield frame(a, sorted, [i, minIdx], 'swapping', 11) // int temp = arr[minIndex]
      ;[a[i], a[minIdx]] = [a[minIdx], a[i]]
      yield frame(a, sorted, [i, minIdx], 'swapping', 13) // arr[i] = temp
    }

    sorted[i] = true
    yield frame(a, sorted, [], 'default', 14)
  }
  sorted[n - 1] = true
  yield frame(a, sorted, [], 'default', 15)
}

// ─────────────────────────────────────────────
// INSERTION SORT
// ─────────────────────────────────────────────
export function* insertionSortGenerator(arr, stats) {
  const a = [...arr]
  const n = a.length
  const sorted = new Array(n).fill(false)
  sorted[0] = true

  yield frame(a, sorted, [], 'default', 2)

  for (let i = 1; i < n; i++) {
    const key = a[i]
    let j = i - 1

    yield frame(a, sorted, [i], 'pivot', 4) // int key = arr[i]

    while (j >= 0 && a[j] > key) {
      stats.comparisons++
      yield frame(a, sorted, [j, j + 1], 'comparing', 6) // while condition
      a[j + 1] = a[j]
      stats.swaps++
      yield frame(a, sorted, [j + 1], 'swapping', 7) // arr[j+1] = arr[j]
      j--
    }
    if (j >= 0) stats.comparisons++
    a[j + 1] = key
    sorted[i] = true
    yield frame(a, sorted, [], 'default', 10) // arr[j+1] = key
  }
  yield frame(a, sorted, [], 'default', 12)
}

// ─────────────────────────────────────────────
// MERGE SORT
// ─────────────────────────────────────────────
export function* mergeSortGenerator(arr, stats) {
  const a = [...arr]
  const sorted = new Array(a.length).fill(false)
  yield frame(a, sorted, [], 'default', 1)
  yield* mergeSortHelper(a, 0, a.length - 1, sorted, stats)
  for (let i = 0; i < a.length; i++) sorted[i] = true
  yield frame(a, sorted, [], 'default', 8)
}

function* mergeSortHelper(a, left, right, sorted, stats) {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)
  yield frame(a, sorted, [left, right], 'pivot', 3) // int mid = (left+right)/2
  yield* mergeSortHelper(a, left, mid, sorted, stats)
  yield* mergeSortHelper(a, mid + 1, right, sorted, stats)
  yield* merge(a, left, mid, right, sorted, stats)
}

function* merge(a, left, mid, right, sorted, stats) {
  yield frame(a, sorted, [left, right], 'pivot', 10) // entering merge()
  const leftArr = a.slice(left, mid + 1)
  const rightArr = a.slice(mid + 1, right + 1)
  let i = 0, j = 0, k = left

  yield frame(a, sorted, [k], 'comparing', 12) // i=0, j=0, k=left

  while (i < leftArr.length && j < rightArr.length) {
    stats.comparisons++
    yield frame(a, sorted, [k], 'comparing', 14) // if leftArr[i] <= rightArr[j]
    if (leftArr[i] <= rightArr[j]) {
      a[k] = leftArr[i++]
      yield frame(a, sorted, [k], 'swapping', 15)
    } else {
      a[k] = rightArr[j++]
      stats.swaps++
      yield frame(a, sorted, [k], 'swapping', 17)
    }
    k++
  }
  while (i < leftArr.length) { a[k] = leftArr[i++]; yield frame(a, sorted, [k], 'swapping', 21); k++ }
  while (j < rightArr.length) { a[k] = rightArr[j++]; yield frame(a, sorted, [k], 'swapping', 21); k++ }
}

// ─────────────────────────────────────────────
// QUICK SORT
// ─────────────────────────────────────────────
export function* quickSortGenerator(arr, stats) {
  const a = [...arr]
  const sorted = new Array(a.length).fill(false)
  yield frame(a, sorted, [], 'default', 1)
  yield* quickSortHelper(a, 0, a.length - 1, sorted, stats)
  for (let i = 0; i < a.length; i++) sorted[i] = true
  yield frame(a, sorted, [], 'default', 7)
}

function* quickSortHelper(a, low, high, sorted, stats) {
  if (low >= high) {
    if (low === high) sorted[low] = true
    return
  }
  const pivotIdx = yield* partition(a, low, high, sorted, stats)
  sorted[pivotIdx] = true
  yield frame(a, sorted, [], 'default', 3) // pivotIndex assigned
  yield* quickSortHelper(a, low, pivotIdx - 1, sorted, stats)
  yield* quickSortHelper(a, pivotIdx + 1, high, sorted, stats)
}

function* partition(a, low, high, sorted, stats) {
  const pivot = a[high]
  let i = low - 1

  yield frame(a, sorted, [high], 'pivot', 10) // int pivot = arr[high]
  yield frame(a, sorted, [high], 'pivot', 11) // int i = low - 1

  for (let j = low; j < high; j++) {
    stats.comparisons++
    yield frame(a, sorted, [j, high], 'comparing', 13) // if (arr[j] <= pivot)
    if (a[j] <= pivot) {
      i++
      if (i !== j) {
        stats.swaps++
        yield frame(a, sorted, [i, j], 'swapping', 16) // int temp = arr[i]
        ;[a[i], a[j]] = [a[j], a[i]]
        yield frame(a, sorted, [i, j], 'swapping', 18) // arr[j] = temp
      } else {
        yield frame(a, sorted, [i], 'pivot', 14) // i++
      }
    }
  }

  // Place pivot
  stats.swaps++
  yield frame(a, sorted, [i + 1, high], 'swapping', 22) // int temp = arr[i+1]
  ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
  yield frame(a, sorted, [i + 1], 'swapping', 25) // return i+1
  return i + 1
}

// ─────────────────────────────────────────────
// HEAP SORT
// ─────────────────────────────────────────────
export function* heapSortGenerator(arr, stats) {
  const a = [...arr]
  const n = a.length
  const sorted = new Array(n).fill(false)

  yield frame(a, sorted, [], 'default', 3) // Build max-heap

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(a, n, i, sorted, stats)
  }

  yield frame(a, sorted, [], 'default', 6) // Extract elements

  for (let i = n - 1; i > 0; i--) {
    stats.swaps++
    yield frame(a, sorted, [0, i], 'swapping', 8) // int temp = arr[0]
    ;[a[0], a[i]] = [a[i], a[0]]
    sorted[i] = true
    yield frame(a, sorted, [0], 'swapping', 10) // arr[i] = temp
    yield* heapify(a, i, 0, sorted, stats)
  }
  sorted[0] = true
  yield frame(a, sorted, [], 'default', 13)
}

function* heapify(a, n, i, sorted, stats) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  yield frame(a, sorted, [i], 'pivot', 16) // int largest = i

  if (left < n) {
    stats.comparisons++
    yield frame(a, sorted, [left, largest], 'comparing', 18) // if left < n && arr[left] > arr[largest]
    if (a[left] > a[largest]) {
      largest = left
      yield frame(a, sorted, [largest], 'pivot', 19) // largest = left
    }
  }
  if (right < n) {
    stats.comparisons++
    yield frame(a, sorted, [right, largest], 'comparing', 20) // if right < n && arr[right] > arr[largest]
    if (a[right] > a[largest]) {
      largest = right
      yield frame(a, sorted, [largest], 'pivot', 21) // largest = right
    }
  }

  if (largest !== i) {
    stats.swaps++
    yield frame(a, sorted, [i, largest], 'swapping', 23) // int temp = arr[i]
    ;[a[i], a[largest]] = [a[largest], a[i]]
    yield frame(a, sorted, [i, largest], 'swapping', 25) // arr[largest] = temp
    yield* heapify(a, n, largest, sorted, stats)
  }
}

// ─────────────────────────────────────────────
// FRAME BUILDER UTILITY
// ─────────────────────────────────────────────
function frame(arr, sortedMask, highlighted, highlightState, line) {
  return {
    bars: arr.map((value, idx) => {
      if (sortedMask[idx]) return { value, state: 'sorted' }
      if (highlighted.includes(idx)) return { value, state: highlightState }
      return { value, state: 'default' }
    }),
    line,
  }
}

// ─────────────────────────────────────────────
// GENERATOR MAP
// ─────────────────────────────────────────────
export const GENERATORS = {
  bubble: bubbleSortGenerator,
  selection: selectionSortGenerator,
  insertion: insertionSortGenerator,
  merge: mergeSortGenerator,
  quick: quickSortGenerator,
  heap: heapSortGenerator,
}
