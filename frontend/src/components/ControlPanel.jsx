import { motion } from 'framer-motion'
import { ALGORITHM_LIST, MIN_ARRAY_SIZE, MAX_ARRAY_SIZE } from '../data/algorithmData'

export default function ControlPanel({
  selectedAlgo,
  onAlgoChange,
  arraySize,
  onSizeChange,
  speed,
  onSpeedChange,
  isRunning,
  isPaused,
  isSorted,
  onStart,
  onPause,
  onResume,
  onReset,
  onGenerate,
}) {
  const canChangeSettings = !isRunning || isPaused

  const getStartLabel = () => {
    if (isSorted) return '✓ Sorted! Generate New'
    if (isRunning && !isPaused) return 'Sorting...'
    if (isPaused) return '▶ Resume'
    return '▶ Start'
  }

  const handleStartClick = () => {
    if (isSorted) { onGenerate(); return }
    if (isPaused) { onResume(); return }
    if (!isRunning) { onStart() }
  }

  return (
    <div className="glass-card p-5 space-y-5">
      {/* Algorithm Selection */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Algorithm
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALGORITHM_LIST.map((algo) => (
            <motion.button
              key={algo.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAlgoChange(algo.id)}
              disabled={isRunning && !isPaused}
              className={`algo-chip text-xs py-2 px-3 ${
                selectedAlgo === algo.id
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-lg shadow-indigo-500/10'
                  : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500 hover:text-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {algo.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Array Size */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Array Size
          </label>
          <span className="text-sm font-mono text-indigo-400 font-bold">{arraySize}</span>
        </div>
        <input
          type="range"
          min={MIN_ARRAY_SIZE}
          max={MAX_ARRAY_SIZE}
          value={arraySize}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          disabled={isRunning && !isPaused}
          className="w-full disabled:opacity-50"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{MIN_ARRAY_SIZE}</span>
          <span>{MAX_ARRAY_SIZE}</span>
        </div>
      </div>

      {/* Speed */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Speed
          </label>
          <span className="text-xs font-mono text-indigo-400">
            {['', 'Slow', 'Normal', 'Fast', 'Faster', 'Turbo'][speed]}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>Slow</span>
          <span>Turbo</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleStartClick}
          disabled={isRunning && !isPaused && !isSorted}
          className={`btn-primary w-full py-3 text-sm font-semibold ${
            isSorted ? 'bg-green-600 hover:bg-green-500' : ''
          }`}
        >
          {getStartLabel()}
        </motion.button>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onPause}
            disabled={!isRunning || isPaused}
            className="btn-secondary py-2 text-sm"
          >
            ⏸ Pause
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
            className="btn-danger py-2 text-sm"
          >
            ↺ Reset
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onGenerate}
          disabled={isRunning && !isPaused}
          className="btn-secondary py-2 text-sm disabled:opacity-50"
        >
          ⚡ New Random Array
        </motion.button>
      </div>

      {/* Color Legend */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Legend</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { color: '#6366f1', label: 'Default' },
            { color: '#ef4444', label: 'Comparing' },
            { color: '#f97316', label: 'Swapping' },
            { color: '#22c55e', label: 'Sorted' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
              />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
