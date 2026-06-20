"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { simulationData } from "@/data/simulationData";
import StakeholderLabel from "@/components/ui/StakeholderLabel";
import { useStakeholder } from "@/context/StakeholderContext";

/**
 * Scene 3 surface: the cleaned data "unfurls" into a native React dashboard
 * (no iframes). Expected vs. reconciled actuals per quarter — bars now align,
 * mismatch collapses toward zero.
 */
export default function ReconDashboard() {
  const { isExecutive } = useStakeholder();
  const data = simulationData.clean;

  const totalMismatch = data.reduce((s, d) => s + d.mismatch, 0);
  const totalExpected = data.reduce((s, d) => s + d.expected, 0);
  const rate = ((totalMismatch / totalExpected) * 100).toFixed(1);

  return (
    <div className="glass w-full max-w-2xl rounded-3xl p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Inventory Reconciliation
          </h3>
          <p className="mt-0.5 text-sm text-white/45">
            <StakeholderLabel
              business="Expected vs. reconciled stock, by quarter"
              technical="Expected vs. SAFE_CAST reconciled counts, by quarter"
            />
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl font-bold tracking-tight text-accent-emerald">
            {rate}%
          </div>
          <div className="text-[11px] text-white/40">
            <StakeholderLabel
              business="Audit failure risk"
              technical="Mismatch rate"
            />
          </div>
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              contentStyle={{
                background: "rgba(14,14,18,0.92)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                color: "#fff",
                backdropFilter: "blur(12px)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}
            />
            <Bar
              dataKey="expected"
              name={isExecutive ? "Planned" : "Expected"}
              fill="rgba(255,255,255,0.22)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="actual"
              name={isExecutive ? "On-hand" : "Reconciled"}
              fill="#10B981"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
