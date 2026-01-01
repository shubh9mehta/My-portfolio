import { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { skillRadarData } from '../data/portfolioData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 backdrop-blur-xl border border-teal-500/30 rounded-xl p-4 shadow-2xl max-w-xs">
        <p className="text-teal-400 font-semibold text-sm">{data.skill}</p>
        <p className="text-slate-300 text-xs mt-1">{data.detail}</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
              style={{ width: `${data.value}%` }}
            />
          </div>
          <span className="text-teal-400 text-xs font-mono">{data.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const SkillRadar = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="relative py-20 md:py-28 bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div>
            <span className="text-teal-400 text-sm font-medium uppercase tracking-widest">
              Skill Profile
            </span>
            <h2 className="text-4xl font-bold mt-4">Career Distribution</h2>
            <p className="text-slate-400 mt-4 max-w-lg">
              Interactive visualization of my competency balance across core data analytics domains.
              Hover over each axis to see real-world applications.
            </p>

            {hoveredSkill && (
              <div className="mt-6 p-6 bg-slate-800/50 border border-teal-500/30 rounded-2xl animate-fade-in">
                <h4 className="text-teal-400 font-semibold">{hoveredSkill.skill}</h4>
                <p className="text-slate-300 mt-2">{hoveredSkill.detail}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${hoveredSkill.value}%` }}
                    />
                  </div>
                  <span className="text-teal-400 font-mono text-sm">{hoveredSkill.value}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Right: Radar Chart */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-7">
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart
                  data={skillRadarData}
                  onMouseMove={(e) => {
                    if (e && e.activePayload && e.activePayload[0]) {
                      setHoveredSkill(e.activePayload[0].payload);
                    }
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickLine={false}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#14B8A6"
                    fill="url(#radarGradient)"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillRadar;
