// src/components/ImpactDashboard.jsx
import { TrendingUp, Zap, Database, BarChart3 } from 'lucide-react';
import { useCounter } from '../hooks/useCounter';
import { impactMetrics } from '../data/portfolioData';

// Icon mapping
const iconMap = {
  TrendingUp,
  Zap,
  Database,
  BarChart3,
};

const MetricCard = ({ metric, index }) => {
  const { count, ref } = useCounter(metric.value, 2000);
  const Icon = iconMap[metric.icon];

  return (
    <div
      ref={ref}
      className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 group hover:border-opacity-50 transition-all duration-300"
      style={{
        '--hover-color': metric.color,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${metric.color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color: metric.color }} />
        </div>
      </div>
      <div className="text-3xl font-bold" style={{ color: metric.color }}>
        {count}
        {metric.suffix}
      </div>
      <div className="text-sm text-slate-400 mt-1">{metric.label}</div>
    </div>
  );
};

const ImpactDashboard = () => {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-2xl" />

      {/* Dashboard card */}
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-300">Impact Dashboard</h3>
          <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-xs rounded-full">
            Live Metrics
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {impactMetrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;
