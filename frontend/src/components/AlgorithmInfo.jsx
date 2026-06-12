import { motion } from 'framer-motion'
import { ALGORITHMS } from '../data/algorithmData'
import { complexityColor } from '../utils/helpers'

export default function AlgorithmInfo({ selectedAlgo }) {
  const algo = ALGORITHMS[selectedAlgo]
  if (!algo) return null

  return (
    <motion.div
      key={selectedAlgo}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-5 space-y-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white">{algo.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">{algo.javaFile}</p>
        </div>
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
          style={{
            backgroundColor: algo.color,
            boxShadow: `0 0 10px ${algo.color}80`,
          }}
        />
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">{algo.description}</p>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Complexities
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-xs text-gray-500 mb-2">Time</p>
            <div className="space-y-1">
              {Object.entries(algo.timeComplexity).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">{key}</span>
                  <span className={`stat-badge text-xs ${complexityColor(val)}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30">
            <p className="text-xs text-gray-500 mb-2">Space</p>
            <span className={`stat-badge ${complexityColor(algo.spaceComplexity)}`}>
              {algo.spaceComplexity}
            </span>
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Stable?</p>
              <span className={`text-xs font-bold ${algo.stable ? 'text-green-400' : 'text-red-400'}`}>
                {algo.stable ? '✓ Stable' : '✗ Unstable'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
