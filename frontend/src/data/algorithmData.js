export const ALGORITHMS = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    description:
      'Repeatedly steps through the list comparing adjacent elements and swapping them if out of order. Each pass "bubbles" the largest unsorted element to its correct position.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    color: '#6366f1',
    javaFile: 'BubbleSort.java',
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    description:
      'Divides the array into sorted and unsorted regions. Repeatedly finds the minimum element from the unsorted region and places it at the end of the sorted region.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    color: '#8b5cf6',
    javaFile: 'SelectionSort.java',
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    description:
      'Builds a sorted array one element at a time by picking each element and inserting it into its correct position. Similar to sorting playing cards in your hand.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    color: '#06b6d4',
    javaFile: 'InsertionSort.java',
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    description:
      'A divide-and-conquer algorithm that recursively splits the array in half, sorts each half, and merges them back. Guarantees O(n log n) in all cases.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    color: '#10b981',
    javaFile: 'MergeSort.java',
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    description:
      'Selects a pivot element and partitions the array so smaller elements come before it, larger after. Recursively sorts the two subarrays. Fastest in practice for most real-world data.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    color: '#f59e0b',
    javaFile: 'QuickSort.java',
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    description:
      'Uses a binary max-heap structure. First builds a max-heap, then repeatedly extracts the maximum element and rebuilds the heap. In-place with consistent O(n log n) performance.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    stable: false,
    color: '#ef4444',
    javaFile: 'HeapSort.java',
  },
}

export const ALGORITHM_LIST = Object.values(ALGORITHMS)

export const BAR_COLORS = {
  DEFAULT: '#6366f1',
  COMPARING: '#ef4444',
  SWAPPING: '#f97316',
  SORTED: '#22c55e',
  PIVOT: '#eab308',
}

export const BAR_STATES = {
  DEFAULT: 'default',
  COMPARING: 'comparing',
  SWAPPING: 'swapping',
  SORTED: 'sorted',
  PIVOT: 'pivot',
}

export const SPEED_MAP = {
  1: 600,
  2: 350,
  3: 150,
  4: 60,
  5: 20,
}

export const DEFAULT_ARRAY_SIZE = 40
export const MIN_ARRAY_SIZE = 10
export const MAX_ARRAY_SIZE = 100
export const DEFAULT_SPEED = 3
export const MAX_HISTORY = 10
