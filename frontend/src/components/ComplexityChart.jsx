import { ALGORITHM_LIST } from '../data/algorithmData'
import { complexityColor } from '../utils/helpers'

const COMPLEXITY_DATA = [
  { label: 'Best Case', key: 'best' },
  { label: 'Average', key: 'average' },
  { label: 'Worst Case', key: 'worst' },
]

export default function ComplexityChart() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Complexity Reference
      </h3>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full complexity-table text-sm min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Algorithm</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Best</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Average</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Worst</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Space</th>
              <th className="text-center py-2 px-3 text-xs text-gray-500 uppercase tracking-widest">Stable</th>
            </tr>
          </thead>
          <tbody>
            {ALGORITHM_LIST.map((algo) => (
              <tr
                key={algo.id}
                className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: algo.color }}
                    />
                    <span className="text-sm font-medium text-gray-200">{algo.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`stat-badge ${complexityColor(algo.timeComplexity.best)}`}>
                    {algo.timeComplexity.best}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`stat-badge ${complexityColor(algo.timeComplexity.average)}`}>
                    {algo.timeComplexity.average}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`stat-badge ${complexityColor(algo.timeComplexity.worst)}`}>
                    {algo.timeComplexity.worst}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`stat-badge ${complexityColor(algo.spaceComplexity)}`}>
                    {algo.spaceComplexity}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`text-xs font-semibold ${algo.stable ? 'text-green-400' : 'text-red-400'}`}>
                    {algo.stable ? '✓' : '✗'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complexity Legend */}
      <div className="mt-4 flex flex-wrap gap-3 pt-3 border-t border-gray-800">
        {[
          { label: 'O(n)', cls: 'text-green-400 bg-green-400/10' },
          { label: 'O(n log n)', cls: 'text-yellow-400 bg-yellow-400/10' },
          { label: 'O(n²)', cls: 'text-red-400 bg-red-400/10' },
          { label: 'O(log n)', cls: 'text-cyan-400 bg-cyan-400/10' },
          { label: 'O(1)', cls: 'text-blue-400 bg-blue-400/10' },
        ].map(({ label, cls }) => (
          <span key={label} className={`stat-badge ${cls}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
