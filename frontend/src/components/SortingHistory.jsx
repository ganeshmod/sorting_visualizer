import { motion, AnimatePresence } from 'framer-motion'
import { formatTime } from '../utils/helpers'

export default function SortingHistory({ history }) {
  if (!history.length) {
    return (
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
          History
        </h3>
        <p className="text-sm text-gray-600 text-center py-4">
          No runs yet. Start sorting to record history.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
          History
        </h3>
        <span className="text-xs text-gray-600">{history.length} runs</span>
      </div>

      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence>
          {history.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="flex items-center justify-between bg-gray-800/40 rounded-xl px-3 py-2 border border-gray-700/30 hover:border-gray-600/50 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-300 truncate">
                  {entry.algorithm}
                </p>
                <p className="text-xs text-gray-600">
                  {entry.arraySize} elements · {entry.comparisons.toLocaleString()} cmps · {entry.swaps.toLocaleString()} swaps
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className="text-xs font-mono text-indigo-400 font-semibold">
                  {formatTime(entry.timeMs)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
