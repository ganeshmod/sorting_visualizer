import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import SortingBars from './components/SortingBars'
import ControlPanel from './components/ControlPanel'
import StatsPanel from './components/StatsPanel'
import AlgorithmInfo from './components/AlgorithmInfo'
import SortingHistory from './components/SortingHistory'
import ComplexityChart from './components/ComplexityChart'
import ComparisonMode from './components/ComparisonMode'
import CodePanel from './components/CodePanel'
import { useSorting } from './hooks/useSorting'

const TABS = ['Visualizer', 'Compare', 'Complexity', 'History']

export default function App() {
  const [activeTab, setActiveTab] = useState('Visualizer')

  const {
    bars, currentLine, arraySize, speed, selectedAlgo,
    isRunning, isPaused, isSorted, stats, history,
    setSpeed,
    generateNewArray, startSorting, pauseSorting, resumeSorting,
    resetArray, handleAlgoChange, handleSizeChange,
  } = useSorting()

  return (
    <div className="min-h-screen bg-gray-950 grid-bg text-gray-100 font-sans">
      <Header />

      <main className="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5 space-y-5">

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="gradient-text">Sorting Algorithm</span> Visualizer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Java DSA implementations · React animations · Interactive controls
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-gray-900/60 rounded-2xl p-1 border border-gray-800 w-fit mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-indigo-600/30 border border-indigo-500/40 rounded-xl"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ─── VISUALIZER TAB ─── */}
          {activeTab === 'Visualizer' && (
            <motion.div
              key="visualizer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4"
            >
              {/* Left: Controls */}
              <div className="space-y-4">
                <ControlPanel
                  selectedAlgo={selectedAlgo}
                  onAlgoChange={handleAlgoChange}
                  arraySize={arraySize}
                  onSizeChange={handleSizeChange}
                  speed={speed}
                  onSpeedChange={setSpeed}
                  isRunning={isRunning}
                  isPaused={isPaused}
                  isSorted={isSorted}
                  onStart={startSorting}
                  onPause={pauseSorting}
                  onResume={resumeSorting}
                  onReset={resetArray}
                  onGenerate={generateNewArray}
                />
                <AlgorithmInfo selectedAlgo={selectedAlgo} />
              </div>

              {/* Right: Code + Visualization split, then stats below */}
              <div className="space-y-4">
                {/* Split: Code (left) | Bars (right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[420px]">
                  <div className="lg:h-full h-80">
                    <CodePanel
                      selectedAlgo={selectedAlgo}
                      currentLine={currentLine}
                      isRunning={isRunning && !isPaused}
                    />
                  </div>

                  <motion.div
                    className={`glass-card p-5 flex flex-col ${isSorted ? 'glow-green' : ''} transition-all duration-500`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-semibold text-gray-300">Live Visualization</h2>
                        {isRunning && !isPaused && (
                          <span className="flex items-center gap-1.5 text-xs text-yellow-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                            Sorting
                          </span>
                        )}
                        {isSorted && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1.5 text-xs text-green-400"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            Sorted!
                          </motion.span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-gray-600">{bars.length} elements</span>
                    </div>

                    <div className="flex-1 flex items-end">
                      <SortingBars bars={bars} isSorted={isSorted} />
                    </div>
                  </motion.div>
                </div>

                {/* Stats below */}
                <StatsPanel
                  stats={stats}
                  selectedAlgo={selectedAlgo}
                  isRunning={isRunning}
                  isSorted={isSorted}
                />
              </div>
            </motion.div>
          )}

          {/* ─── COMPARE TAB ─── */}
          {activeTab === 'Compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto"
            >
              <ComparisonMode />
            </motion.div>
          )}

          {/* ─── COMPLEXITY TAB ─── */}
          {activeTab === 'Complexity' && (
            <motion.div
              key="complexity"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl mx-auto"
            >
              <ComplexityChart />
            </motion.div>
          )}

          {/* ─── HISTORY TAB ─── */}
          {activeTab === 'History' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <SortingHistory history={history} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="text-center pt-6 pb-4 border-t border-gray-800/50">
          <p className="text-xs text-gray-600">
            Built with React + Framer Motion · Java DSA implementations included ·{' '}
            <a
              href="https://github.com/ganeshmod"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ganeshmod
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}
