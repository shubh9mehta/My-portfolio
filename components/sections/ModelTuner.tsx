"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { churnSampleData } from "@/data/sample-datasets/churnSampleData";
import SectionHeading from "@/components/ui/SectionHeading";
import StakeholderLabel from "@/components/ui/StakeholderLabel";
import { darkTooltipStyle } from "./projects/dashboardChrome";

const positives = churnSampleData.filter((c) => c.churned).length;
const negatives = churnSampleData.length - positives;

function confusionAt(threshold: number) {
  let tp = 0,
    fp = 0,
    fn = 0,
    tn = 0;
  for (const c of churnSampleData) {
    const predicted = c.churnRiskScore >= threshold;
    if (predicted && c.churned) tp++;
    else if (predicted && !c.churned) fp++;
    else if (!predicted && c.churned) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
}

// Precompute ROC curve + AUC once (independent of the slider).
const rocCurve = (() => {
  const pts: { fpr: number; tpr: number }[] = [];
  for (let t = 100; t >= 0; t -= 2) {
    const { tp, fp } = confusionAt(t);
    pts.push({
      fpr: negatives ? fp / negatives : 0,
      tpr: positives ? tp / positives : 0,
    });
  }
  // trapezoidal AUC
  let auc = 0;
  for (let i = 1; i < pts.length; i++) {
    auc += ((pts[i].fpr - pts[i - 1].fpr) * (pts[i].tpr + pts[i - 1].tpr)) / 2;
  }
  return { pts, auc: Math.abs(auc) };
})();

const baseline = [
  { fpr: 0, tpr: 0 },
  { fpr: 1, tpr: 1 },
];

function Metric({
  business,
  technical,
  value,
  accent,
}: {
  business: string;
  technical: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="glass-soft rounded-2xl p-4">
      <div className="text-[11px] text-white/45">
        <StakeholderLabel business={business} technical={technical} />
      </div>
      <div className="mt-1 font-display text-3xl font-bold tracking-kpi" style={{ color: accent }}>
        {(value * 100).toFixed(0)}
        <span className="text-lg">%</span>
      </div>
    </div>
  );
}

export default function ModelTuner() {
  const [threshold, setThreshold] = useState(65);

  const { tp, fp, fn, tn } = useMemo(() => confusionAt(threshold), [threshold]);
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
  const accuracy = (tp + tn) / churnSampleData.length;
  const curFpr = negatives ? fp / negatives : 0;
  const curTpr = positives ? tp / positives : 0;

  const cells = [
    { label: "True Positive", sub: "caught churners", v: tp, color: "#10B981" },
    { label: "False Positive", sub: "false alarms", v: fp, color: "#F59E0B" },
    { label: "False Negative", sub: "missed churners", v: fn, color: "#ff6b6b" },
    { label: "True Negative", sub: "correctly safe", v: tn, color: "#3B82F6" },
  ];

  return (
    <section id="model" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Tune The Model"
          title={
            <>
              There&apos;s no free lunch — <span className="text-gradient-emerald">drag the threshold.</span>
            </>
          }
          subtitle="Every churn model trades catching more customers against raising more false alarms. Move the dial and watch the trade-off happen in real time."
          plain="Imagine a smoke alarm. Make it too sensitive and it goes off when you make toast; not sensitive enough and it misses a real fire. Drag the slider to set that sensitivity and see what the model catches vs. misses."
          technical="A live threshold sweep over churn risk scores: the confusion matrix, precision, recall, F1 and the point on the ROC curve (AUC shown) all recompute as you move the decision boundary."
          className="mb-10"
        />

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Controls + metrics */}
          <div className="glass rounded-[28px] p-6">
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white/60">
                  Decision threshold
                </span>
                <span className="font-mono text-lg font-bold text-accent-cyan">{threshold}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-cyan"
              />
              <p className="mt-2 text-xs text-white/35">
                Flag a customer as &quot;will churn&quot; when their risk score ≥ {threshold}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Metric business="Flagged & right" technical="Precision" value={precision} accent="#10B981" />
              <Metric business="Churners caught" technical="Recall" value={recall} accent="#22D3EE" />
              <Metric business="Balance score" technical="F1 Score" value={f1} accent="#8B5CF6" />
              <Metric business="Overall correct" technical="Accuracy" value={accuracy} accent="#3B82F6" />
            </div>
          </div>

          {/* Confusion matrix + ROC */}
          <div className="flex flex-col gap-5">
            <div className="glass rounded-[28px] p-6">
              <div className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                Confusion Matrix
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {cells.map((c) => (
                  <motion.div
                    key={c.label}
                    animate={{ scale: [0.98, 1] }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: `${c.color}33`, background: `${c.color}12` }}
                  >
                    <motion.div
                      key={c.v}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-2xl font-bold"
                      style={{ color: c.color }}
                    >
                      {c.v}
                    </motion.div>
                    <div className="text-[11px] font-medium text-white/70">{c.label}</div>
                    <div className="text-[10px] text-white/40">{c.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-[28px] p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                  ROC Curve
                </span>
                <span className="font-mono text-xs text-accent-emerald">
                  AUC {rocCurve.auc.toFixed(2)}
                </span>
              </div>
              <div className="h-[170px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 5, right: 8, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      type="number"
                      dataKey="fpr"
                      domain={[0, 1]}
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="number"
                      dataKey="tpr"
                      domain={[0, 1]}
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={darkTooltipStyle} />
                    <Line
                      data={baseline}
                      dataKey="tpr"
                      stroke="rgba(255,255,255,0.18)"
                      strokeDasharray="4 4"
                      dot={false}
                      isAnimationActive={false}
                    />
                    <Line
                      data={rocCurve.pts}
                      dataKey="tpr"
                      stroke="#22D3EE"
                      strokeWidth={2.5}
                      dot={false}
                      isAnimationActive={false}
                    />
                    <ReferenceDot x={curFpr} y={curTpr} r={5} fill="#10B981" stroke="#fff" strokeWidth={1.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
