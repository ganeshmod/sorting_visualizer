import { motion } from 'framer-motion'
import { ALGORITHMS } from '../data/algorithmData'
import { complexityColor, formatTime } from '../utils/helpers'

export default function StatsPanel({ stats, selectedAlgo, isRunning, isSorted }) {
  const algo = ALGORITHMS[selectedAlgo]
  if (!algo) return null

  const statItems = [
    {
      label: 'Comparisons',
      value: stats.comparisons.toLocaleString(),
      icon: '🔍',
      color: 'text-blue-400',
    },
    {
      label: 'Swaps',
      value: stats.swaps.toLocaleString(),
      icon: '🔄',
      color: 'text-orange-400',
    },
    {
      label: 'Time',
      value: formatTime(stats.timeMs),
      icon: '⏱',
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
          Statistics
        </h3>
        {isRunning && !isSorted && (
          <span className="flex items-center gap-1.5 text-xs text-yellow-400">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Running
          </span>
        )}
        {isSorted && (
          <span className="flex items-center gap-1.5 text-xs text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Complete
          </span>
        )}
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-2">
        {statItems.map((item) => (
          <motion.div
            key={item.label}
            className="bg-gray-800/60 rounded-xl p-3 text-center border border-gray-700/50"
            animate={isRunning ? { borderColor: ['rgba(99,102,241,0.1)', 'rgba(99,102,241,0.4)', 'rgba(99,102,241,0.1)'] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <p className="text-lg mb-0.5">{item.icon}</p>
            <p className={`text-base font-mono font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Algorithm Info */}
      <div className="border-t border-gray-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Algorithm</span>
          <span className="text-sm font-semibold text-indigo-300">{algo.name}</span>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 mb-1">Time Complexity</p>
          <div className="grid grid-cols-3 gap-1">
            {[
              { label: 'Best', val: algo.timeComplexity.best },
              { label: 'Avg', val: algo.timeComplexity.average },
              { label: 'Worst', val: algo.timeComplexity.worst },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <p className="text-xs text-gray-600">{label}</p>
                <span className={`stat-badge text-xs ${complexityColor(val)}`}>
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Space</span>
          <span className={`stat-badge ${complexityColor(algo.spaceComplexity)}`}>
            {algo.spaceComplexity}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Stable</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
            algo.stable
              ? 'text-green-400 bg-green-400/10'
              : 'text-red-400 bg-red-400/10'
          }`}>
            {algo.stable ? '✓ Yes' : '✗ No'}
          </span>
        </div>
      </div>
    </div>
  )
}
