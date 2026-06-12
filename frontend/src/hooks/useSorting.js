import { useState, useRef, useCallback, useEffect } from 'react'
import { GENERATORS } from '../algorithms/sortingAlgorithms'
import { generateRandomArray, valuesToBars } from '../utils/helpers'
import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SPEED,
  SPEED_MAP,
  MAX_HISTORY,
  ALGORITHMS,
} from '../data/algorithmData'

export function useSorting() {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [selectedAlgo, setSelectedAlgo] = useState('bubble')
  const [bars, setBars] = useState(() =>
    valuesToBars(generateRandomArray(DEFAULT_ARRAY_SIZE))
  )
  const [currentLine, setCurrentLine] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeMs: 0 })
  const [history, setHistory] = useState([])

  // Refs for animation loop control
  const generatorRef = useRef(null)
  const timerRef = useRef(null)
  const pausedRef = useRef(false)
  const speedRef = useRef(SPEED_MAP[DEFAULT_SPEED])
  const statsRef = useRef({ comparisons: 0, swaps: 0 })
  const startTimeRef = useRef(null)
  const arraySizeRef = useRef(arraySize)
  const selectedAlgoRef = useRef(selectedAlgo)

  useEffect(() => { speedRef.current = SPEED_MAP[speed] }, [speed])
  useEffect(() => { arraySizeRef.current = arraySize }, [arraySize])
  useEffect(() => { selectedAlgoRef.current = selectedAlgo }, [selectedAlgo])

  const cancelAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    generatorRef.current = null
    pausedRef.current = false
  }, [])

  const resetVisualState = useCallback((newBars) => {
    cancelAnimation()
    setIsRunning(false)
    setIsPaused(false)
    setIsSorted(false)
    setCurrentLine(null)
    setStats({ comparisons: 0, swaps: 0, timeMs: 0 })
    if (newBars) setBars(newBars)
  }, [cancelAnimation])

  const generateNewArray = useCallback(() => {
    resetVisualState(valuesToBars(generateRandomArray(arraySizeRef.current)))
  }, [resetVisualState])

  const recordHistory = useCallback((elapsed) => {
    setHistory((prev) => {
      const entry = {
        id: Date.now(),
        algorithm: ALGORITHMS[selectedAlgoRef.current]?.name || selectedAlgoRef.current,
        arraySize: arraySizeRef.current,
        timeMs: Math.round(elapsed),
        comparisons: statsRef.current.comparisons,
        swaps: statsRef.current.swaps,
      }
      return [entry, ...prev].slice(0, MAX_HISTORY)
    })
  }, [])

  // The core animation loop
  const loop = useCallback(() => {
    if (pausedRef.current || !generatorRef.current) return
    const { value, done } = generatorRef.current.next()

    if (done || !value) {
      const elapsed = performance.now() - startTimeRef.current
      setIsRunning(false)
      setIsPaused(false)
      setIsSorted(true)
      setCurrentLine(null)
      setStats({
        comparisons: statsRef.current.comparisons,
        swaps: statsRef.current.swaps,
        timeMs: Math.round(elapsed),
      })
      recordHistory(elapsed)
      return
    }

    setBars(value.bars)
    setCurrentLine(value.line)
    setStats({
      comparisons: statsRef.current.comparisons,
      swaps: statsRef.current.swaps,
      timeMs: Math.round(performance.now() - startTimeRef.current),
    })

    timerRef.current = setTimeout(loop, speedRef.current)
  }, [recordHistory])

  const startSorting = useCallback(() => {
    if (isRunning && !isPaused) return

    if (isSorted) {
      generateNewArray()
      return
    }

    if (isPaused) {
      pausedRef.current = false
      setIsPaused(false)
      loop()
      return
    }

    // Fresh start
    setIsRunning(true)
    setIsPaused(false)
    setIsSorted(false)
    statsRef.current = { comparisons: 0, swaps: 0 }
    setStats({ comparisons: 0, swaps: 0, timeMs: 0 })
    startTimeRef.current = performance.now()

    const values = bars.map((b) => b.value)
    generatorRef.current = GENERATORS[selectedAlgo](values, statsRef.current)
    loop()
  }, [isRunning, isPaused, isSorted, bars, selectedAlgo, generateNewArray, loop])

  const pauseSorting = useCallback(() => {
    if (!isRunning || isPaused) return
    pausedRef.current = true
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsPaused(true)
  }, [isRunning, isPaused])

  const resumeSorting = useCallback(() => {
    if (!isPaused) return
    pausedRef.current = false
    setIsPaused(false)
    loop()
  }, [isPaused, loop])

  const resetArray = useCallback(() => {
    resetVisualState(valuesToBars(generateRandomArray(arraySize)))
  }, [resetVisualState, arraySize])

  const handleAlgoChange = useCallback((algo) => {
    if (isRunning && !isPaused) return
    resetVisualState()
    setSelectedAlgo(algo)
  }, [isRunning, isPaused, resetVisualState])

  const handleSizeChange = useCallback((size) => {
    setArraySize(size)
    resetVisualState(valuesToBars(generateRandomArray(size)))
  }, [resetVisualState])

  // Cleanup on unmount
  useEffect(() => () => cancelAnimation(), [cancelAnimation])

  return {
    bars,
    currentLine,
    arraySize,
    speed,
    selectedAlgo,
    isRunning,
    isPaused,
    isSorted,
    stats,
    history,
    setSpeed,
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetArray,
    handleAlgoChange,
    handleSizeChange,
  }
}
