import { motion } from 'framer-motion'
import { getBarColor } from '../utils/helpers'

const STATE_COLORS = {
  default: '#6366f1',
  comparing: '#ef4444',
  swapping: '#f97316',
  sorted: '#22c55e',
  pivot: '#eab308',
}

const STATE_GLOW = {
  default: 'none',
  comparing: '0 0 12px rgba(239,68,68,0.7)',
  swapping: '0 0 12px rgba(249,115,22,0.7)',
  sorted: '0 0 8px rgba(34,197,94,0.4)',
  pivot: '0 0 12px rgba(234,179,8,0.7)',
}

export default function SortingBars({ bars, isSorted, compact = false }) {
  if (!bars.length) return null

  const maxVal = Math.max(...bars.map((b) => b.value))

  return (
    <div
      className="w-full flex items-end justify-center gap-[1px] px-2"
      style={{ height: compact ? '120px' : '100%', minHeight: compact ? '120px' : '260px' }}
    >
      {bars.map((bar, idx) => {
        const heightPct = (bar.value / maxVal) * 100
        const color = isSorted ? STATE_COLORS.sorted : STATE_COLORS[bar.state] || STATE_COLORS.default
        const glow = isSorted ? STATE_GLOW.sorted : STATE_GLOW[bar.state] || 'none'
        const barWidth = Math.max(1, Math.floor(400 / bars.length))

        return (
          <motion.div
            key={idx}
            layout
            style={{
              height: `${heightPct}%`,
              backgroundColor: color,
              boxShadow: glow,
              minWidth: barWidth > 6 ? `${barWidth}px` : '2px',
              flexShrink: 0,
              flexGrow: 1,
              maxWidth: `${barWidth + 4}px`,
              borderRadius: '3px 3px 0 0',
            }}
            animate={{
              height: `${heightPct}%`,
              backgroundColor: color,
            }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
          />
        )
      })}
    </div>
  )
}
