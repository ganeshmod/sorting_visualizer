import { motion } from 'framer-motion'
import { CODE_SNIPPETS } from '../data/codeSnippets'
import { ALGORITHMS } from '../data/algorithmData'

export default function CodePanel({ selectedAlgo, currentLine, isRunning }) {
  const code = CODE_SNIPPETS[selectedAlgo] || []
  const algo = ALGORITHMS[selectedAlgo]

  return (
    <div className="glass-card overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-900/60">
        <div className="flex items-center gap-2">
          <span className="text-red-400 text-sm">☕</span>
          <span className="text-sm font-mono text-gray-300">{algo?.javaFile}</span>
        </div>
        {isRunning && (
          <span className="flex items-center gap-1.5 text-xs text-yellow-400">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Executing
          </span>
        )}
      </div>

      {/* Code lines */}
      <div className="overflow-y-auto flex-1 font-mono text-xs sm:text-[13px] leading-relaxed py-2">
        {code.map(({ line, text }) => {
          const isActive = currentLine === line
          return (
            <motion.div
              key={line}
              className="relative flex items-start gap-3 px-4 py-0.5"
              animate={{
                backgroundColor: isActive ? 'rgba(99, 102, 241, 0.18)' : 'rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.15 }}
            >
              {/* Active line pointer */}
              {isActive && (
                <motion.div
                  layoutId="line-pointer"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r"
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                />
              )}

              {/* Line number */}
              <span className={`select-none w-6 text-right flex-shrink-0 ${
                isActive ? 'text-indigo-300 font-bold' : 'text-gray-600'
              }`}>
                {line}
              </span>

              {/* Arrow pointer for active line */}
              <span className={`flex-shrink-0 w-4 ${isActive ? 'text-indigo-400' : 'text-transparent'}`}>
                {isActive ? '▶' : ''}
              </span>

              {/* Code text */}
              <code
                className={`whitespace-pre ${
                  isActive ? 'text-indigo-200 font-semibold' : 'text-gray-400'
                }`}
              >
                {text || ' '}
              </code>
            </motion.div>
          )
        })}
      </div>

      {/* Footer hint */}
      <div className="px-4 py-2 border-t border-gray-800 bg-gray-900/40">
        <p className="text-xs text-gray-600">
          {isRunning
            ? 'Highlighted line shows the code currently executing'
            : 'Press Start to see line-by-line execution'}
        </p>
      </div>
    </div>
  )
}
