// src/components/AnalysisSimulation.jsx
import { useState } from 'react';
import { simulationData } from '../data/portfolioData';

const AnalysisSimulation = () => {
  const [isClean, setIsClean] = useState(false);
  const currentData = isClean ? simulationData.clean : simulationData.messy;

  // Calculate total mismatch
  const totalMismatch = currentData.reduce((sum, item) => sum + item.mismatch, 0);
  const mismatchPercentage = isClean ? 2.4 : 15.8; // Approximate percentages

  return (
    <section id="simulation" className="relative py-32 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-widest">
            Interactive Demo
          </span>
          <h2 className="text-4xl font-bold mt-4">The Warehouse Mismatch</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            See SQL automation in action. Toggle the switch to watch inventory chaos transform into
            operational clarity.
          </p>
        </div>

        {/* Simulation Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-3xl blur-2xl" />

          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
            {/* Toggle Control */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  !isClean ? 'text-red-400' : 'text-slate-500'
                }`}
              >
                Before: Manual Tracking
              </span>

              <button
                onClick={() => setIsClean(!isClean)}
                className={`relative w-20 h-10 rounded-full transition-all duration-500 ${
                  isClean ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-slate-700'
                }`}
                aria-label="Toggle SQL automation"
              >
                <div
                  className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-500 ${
                    isClean ? 'left-11' : 'left-1'
                  }`}
                />
              </button>

              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isClean ? 'text-teal-400' : 'text-slate-500'
                }`}
              >
                After: SQL Automation
              </span>
            </div>

            {/* Chart Visualization */}
            <div className="relative h-64 flex items-end justify-around gap-4 px-8 mb-6">
              {currentData.map((item, idx) => (
                <div key={item.category} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex gap-1 items-end justify-center h-48">
                    {/* Expected bar */}
                    <div
                      className="w-8 bg-slate-600 rounded-t-lg transition-all duration-700"
                      style={{ height: `${(item.expected / 600) * 100}%` }}
                      title={`Expected: ${item.expected}`}
                    />

                    {/* Actual bar */}
                    <div
                      className={`w-8 rounded-t-lg transition-all duration-700 ${
                        isClean
                          ? 'bg-gradient-to-t from-teal-500 to-cyan-400'
                          : 'bg-gradient-to-t from-red-500 to-orange-400'
                      }`}
                      style={{ height: `${(item.actual / 600) * 100}%` }}
                      title={`Actual: ${item.actual}`}
                    />

                    {/* Mismatch indicator */}
                    <div
                      className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-mono transition-all duration-500 ${
                        isClean ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {isClean ? '✓' : `−${item.mismatch}`}
                    </div>
                  </div>

                  {/* Quarter label */}
                  <span className="text-slate-400 text-sm">{item.category}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-600 rounded" />
                <span className="text-slate-400 text-sm">Expected Inventory</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded transition-colors duration-500 ${
                    isClean ? 'bg-teal-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-slate-400 text-sm">Actual Inventory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">
                  Total Mismatch:{' '}
                  <span
                    className={`font-mono font-bold ${isClean ? 'text-teal-400' : 'text-red-400'}`}
                  >
                    {totalMismatch} units ({mismatchPercentage}%)
                  </span>
                </span>
              </div>
            </div>

            {/* Result Banner */}
            <div
              className={`mt-8 p-4 rounded-2xl text-center transition-all duration-700 ${
                isClean
                  ? 'bg-teal-500/10 border border-teal-500/30'
                  : 'bg-red-500/10 border border-red-500/30'
              }`}
            >
              {isClean ? (
                <p className="text-teal-400 font-semibold">
                  ✨ 24% reduction in mismatches—just like I did at Macrotech
                </p>
              ) : (
                <p className="text-red-400 font-semibold">
                  ⚠️ Manual tracking leads to costly inventory mismatches
                </p>
              )}
            </div>

            {/* Technical Details (optional) */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-slate-500 text-sm text-center">
                {isClean ? (
                  <>
                    <span className="text-teal-400">Solution:</span> Automated SQL queries +
                    Excel reconciliation across 400+ SKUs
                  </>
                ) : (
                  <>
                    <span className="text-red-400">Problem:</span> Manual data entry and
                    inconsistent tracking causing warehouse audit failures
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisSimulation;
