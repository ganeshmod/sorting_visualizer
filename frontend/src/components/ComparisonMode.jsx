import { motion } from 'framer-motion'
import SortingBars from './SortingBars'
import { useComparison } from '../hooks/useComparison'
import { ALGORITHM_LIST, ALGORITHMS } from '../data/algorithmData'
import { formatTime } from '../utils/helpers'

export default function ComparisonMode() {
  const {
    algoA, algoB,
    barsA, barsB,
    statsA, statsB,
    isRunning, isDone,
    setAlgoA, setAlgoB,
    runComparison,
  } = useComparison()

  const winner = (isDone && statsA && statsB)
    ? (statsA.comparisons <= statsB.comparisons ? 'A' : 'B')
    : null

  return (
    <div className="glass-card p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
          Algorithm Comparison
        </h3>
        <span className="text-xs text-gray-600">Same array, two algorithms</span>
      </div>

      {/* Algorithm Selectors */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Algorithm A', value: algoA, onChange: setAlgoA, win: winner === 'A' },
          { label: 'Algorithm B', value: algoB, onChange: setAlgoB, win: winner === 'B' },
        ].map(({ label, value, onChange, win }) => (
          <div key={label}>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs text-gray-500">{label}</p>
              {win && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xs text-yellow-400 font-bold"
                >
                  🏆 Winner
                </motion.span>
              )}
            </div>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={isRunning}
              className="w-full bg-gray-800/80 border border-gray-700 text-gray-200 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
            >
              {ALGORITHM_LIST.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { bars: barsA, algo: algoA, stats: statsA, win: winner === 'A' },
          { bars: barsB, algo: algoB, stats: statsB, win: winner === 'B' },
        ].map(({ bars, algo, stats, win }, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3 transition-all duration-300 ${
              win
                ? 'border-yellow-500/50 bg-yellow-500/5 shadow-lg shadow-yellow-500/10'
                : 'border-gray-700/50 bg-gray-800/30'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-gray-300">
                {ALGORITHMS[algo]?.name}
              </p>
              {stats && (
                <span className="text-xs font-mono text-indigo-400">
                  {formatTime(stats.timeMs)}
                </span>
              )}
            </div>

            {bars.length > 0 ? (
              <SortingBars bars={bars} isSorted={isDone} compact />
            ) : (
              <div className="h-28 flex items-center justify-center text-gray-600 text-sm">
                Press Run to start
              </div>
            )}

            {stats && (
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="bg-gray-800/60 rounded-lg p-1.5 text-center">
                  <p className="text-xs font-mono text-blue-400 font-bold">{stats.comparisons.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Comparisons</p>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-1.5 text-center">
                  <p className="text-xs font-mono text-orange-400 font-bold">{stats.swaps.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Swaps</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={runComparison}
        disabled={isRunning}
        className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50"
      >
        {isRunning ? '⚙ Running Comparison...' : '⚡ Run Comparison'}
      </motion.button>
    </div>
  )
}
