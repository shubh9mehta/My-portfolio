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
  Cell,
} from "recharts";
import {
  ckdSampleData,
  shapFeatureImportances,
} from "@/data/sample-datasets/ckdSampleData";
import { ControlRow, GlassSelect, KeyFindings, darkTooltipStyle } from "./dashboardChrome";
import StakeholderLabel from "@/components/ui/StakeholderLabel";

export default function CkdDashboard() {
  const [cls, setCls] = useState("All");

  const patients = useMemo(
    () =>
      ckdSampleData
        .filter((p) => cls === "All" || p.predictedClass === cls)
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 8),
    [cls]
  );

  const shap = [...shapFeatureImportances].sort((a, b) => a.importance - b.importance);

  return (
    <div>
      <ControlRow>
        <GlassSelect label="Class" value={cls} onChange={setCls} options={["All", "CKD", "No CKD"]} />
        <span className="text-xs text-white/40">
          <StakeholderLabel
            business="What drives the risk call"
            technical="SHAP feature attributions"
          />
        </span>
      </ControlRow>

      {/* SHAP importance */}
      <div className="h-[210px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={shap} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
            <XAxis type="number" domain={[0, 1]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="feature"
              tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={darkTooltipStyle} />
            <Bar dataKey="importance" name="Importance" radius={[0, 5, 5, 0]}>
              {shap.map((f, i) => (
                <Cell key={i} fill={f.direction === "increases" ? "#F59E0B" : "#22D3EE"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex gap-4 text-[11px] text-white/40">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-amber" /> increases risk
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent-cyan" /> decreases risk
        </span>
      </div>

      {/* Patient table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-white/35">
              <th className="px-4 py-2.5 font-medium">Patient</th>
              <th className="px-4 py-2.5 text-right font-medium">Creatinine</th>
              <th className="px-4 py-2.5 text-right font-medium">Risk</th>
              <th className="px-4 py-2.5 text-right font-medium">Call</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.patientId} className="border-t border-white/[0.06] text-white/75">
                <td className="px-4 py-2 font-mono text-xs">{p.patientId}</td>
                <td className="px-4 py-2 text-right font-mono text-xs text-white/55">{p.serumCreatinine}</td>
                <td className="px-4 py-2 text-right font-mono">{p.riskScore}</td>
                <td className="px-4 py-2 text-right">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: p.predictedClass === "CKD" ? "rgba(255,107,107,0.15)" : "rgba(16,185,129,0.15)",
                      color: p.predictedClass === "CKD" ? "#ff6b6b" : "#10B981",
                    }}
                  >
                    {p.predictedClass}
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
            <strong className="text-white">Serum creatinine & hemoglobin</strong> dominate the model&apos;s risk calls.
          </>,
          <>Every prediction ships with an <strong className="text-white">explanation</strong> clinicians can trust.</>,
          <>SHAP turns a black-box model into an <strong className="text-white">auditable decision aid</strong>.</>,
        ]}
      />

      <p className="mt-3 text-[11px] italic text-white/30">
        Illustrative synthetic data — generated for demonstration, not real patient records.
      </p>
    </div>
  );
}
