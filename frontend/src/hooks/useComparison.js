import { useState, useRef, useCallback } from 'react'
import { GENERATORS } from '../algorithms/sortingAlgorithms'
import { generateRandomArray, valuesToBars } from '../utils/helpers'
import { SPEED_MAP } from '../data/algorithmData'

export function useComparison() {
  const [algoA, setAlgoA] = useState('bubble')
  const [algoB, setAlgoB] = useState('merge')
  const [barsA, setBarsA] = useState([])
  const [barsB, setBarsB] = useState([])
  const [statsA, setStatsA] = useState(null)
  const [statsB, setStatsB] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [arraySize] = useState(30)
  const [speed] = useState(3)

  const timerA = useRef(null)
  const timerB = useRef(null)
  const genA = useRef(null)
  const genB = useRef(null)
  const sA = useRef({ comparisons: 0, swaps: 0 })
  const sB = useRef({ comparisons: 0, swaps: 0 })
  const startA = useRef(null)
  const startB = useRef(null)
  const doneA = useRef(false)
  const doneB = useRef(false)

  const checkBothDone = useCallback(() => {
    if (doneA.current && doneB.current) {
      setIsRunning(false)
      setIsDone(true)
    }
  }, [])

  const generateArrays = useCallback(() => {
    const arr = generateRandomArray(arraySize)
    setBarsA(valuesToBars([...arr]))
    setBarsB(valuesToBars([...arr]))
    setStatsA(null)
    setStatsB(null)
    setIsDone(false)
  }, [arraySize])

  const runComparison = useCallback(() => {
    const arr = generateRandomArray(arraySize)
    sA.current = { comparisons: 0, swaps: 0 }
    sB.current = { comparisons: 0, swaps: 0 }
    doneA.current = false
    doneB.current = false
    startA.current = performance.now()
    startB.current = performance.now()

    genA.current = GENERATORS[algoA]([...arr], sA.current)
    genB.current = GENERATORS[algoB]([...arr], sB.current)

    setIsRunning(true)
    setIsDone(false)
    setStatsA(null)
    setStatsB(null)

    const delay = SPEED_MAP[speed]

    const loopA = () => {
      if (!genA.current) return
      const { value, done } = genA.current.next()
      if (done || !value) {
        doneA.current = true
        setStatsA({
          comparisons: sA.current.comparisons,
          swaps: sA.current.swaps,
          timeMs: Math.round(performance.now() - startA.current),
        })
        checkBothDone()
        return
      }
      setBarsA(value.bars)
      timerA.current = setTimeout(loopA, delay)
    }

    const loopB = () => {
      if (!genB.current) return
      const { value, done } = genB.current.next()
      if (done || !value) {
        doneB.current = true
        setStatsB({
          comparisons: sB.current.comparisons,
          swaps: sB.current.swaps,
          timeMs: Math.round(performance.now() - startB.current),
        })
        checkBothDone()
        return
      }
      setBarsB(value.bars)
      timerB.current = setTimeout(loopB, delay)
    }

    loopA()
    loopB()
  }, [algoA, algoB, arraySize, speed, checkBothDone])

  return {
    algoA, algoB, barsA, barsB,
    statsA, statsB,
    isRunning, isDone,
    setAlgoA, setAlgoB,
    generateArrays, runComparison,
  }
}
