"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { churnSampleData } from "@/data/sample-datasets/churnSampleData";
import { ControlRow, GlassSelect, KeyFindings, darkTooltipStyle } from "./dashboardChrome";
import StakeholderLabel from "@/components/ui/StakeholderLabel";

function riskColor(score: number) {
  if (score >= 65) return "#ff6b6b";
  if (score >= 40) return "#F59E0B";
  return "#10B981";
}

export default function ChurnDashboard() {
  const [contract, setContract] = useState("All");

  const filtered = useMemo(
    () => churnSampleData.filter((c) => contract === "All" || c.contractType === contract),
    [contract]
  );

  const ranked = useMemo(
    () => [...filtered].sort((a, b) => b.churnRiskScore - a.churnRiskScore).slice(0, 8),
    [filtered]
  );

  // Churn rate by contract type
  const byContract = useMemo(() => {
    const types = ["Month-to-month", "One year", "Two year"];
    return types.map((t) => {
      const rows = churnSampleData.filter((c) => c.contractType === t);
      const rate = rows.length ? Math.round((rows.filter((r) => r.churned).length / rows.length) * 100) : 0;
      return { contract: t.replace("Month-to-month", "M2M"), rate };
    });
  }, []);

  const atRisk = churnSampleData.filter((c) => c.churnRiskScore >= 65).length;

  return (
    <div>
      <ControlRow>
        <GlassSelect
          label="Contract"
          value={contract}
          onChange={setContract}
          options={["All", "Month-to-month", "One year", "Two year"]}
        />
        <span className="text-xs text-white/40">
          <StakeholderLabel business="Who to call first" technical="Risk-ranked scoring output" />
        </span>
      </ControlRow>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={byContract}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="contract" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} width={32} unit="%" />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={darkTooltipStyle} />
            <Bar dataKey="rate" name="Churn rate (%)" fill="#3B82F6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk-ranked outreach list */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-2.5 font-medium">Customer</th>
              <th className="px-4 py-2.5 font-medium">Driver</th>
              <th className="px-4 py-2.5 text-right font-medium">Risk</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((c) => (
              <tr key={c.customerId} className="border-t border-white/[0.06] text-white/75">
                <td className="px-4 py-2 font-mono text-xs">{c.customerId}</td>
                <td className="px-4 py-2 text-xs text-white/55">{c.topDriver}</td>
                <td className="px-4 py-2 text-right">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-xs font-bold"
                    style={{ backgroundColor: `${riskColor(c.churnRiskScore)}22`, color: riskColor(c.churnRiskScore) }}
                  >
                    {c.churnRiskScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <KeyFindings
        items={[
          <>
            <strong className="text-white">{atRisk} high-risk customers</strong> flagged for immediate retention outreach.
          </>,
          <>
            <strong className="text-white">Month-to-month contracts</strong> churn far more than annual — incentivize upgrades.
          </>,
          <>Risk scoring turns a flat customer list into a <strong className="text-white">prioritized call sheet</strong>.</>,
        ]}
      />
    </div>
  );
}
