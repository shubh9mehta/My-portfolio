import type { ImpactMetric } from "./types";

// Headline KPIs — every number here is real and traceable to the resume.
export const impactMetrics: ImpactMetric[] = [
  {
    value: 4,
    prefix: "$",
    suffix: "M+",
    label: "Revenue Analyzed",
    description: "NYC taxi pipeline on GCP — BigQuery + Looker Studio",
    icon: "Database",
    color: "#06B6D4",
  },
  {
    value: 90,
    suffix: "%",
    label: "Faster Answers",
    description: "GPT-4o research assistant: 5 min → under 30 sec",
    icon: "Zap",
    color: "#8B5CF6",
  },
  {
    value: 94,
    suffix: "%",
    label: "Record Match Rate",
    description: "22K IPO × 90K ownership records, no shared key",
    icon: "TrendingUp",
    color: "#6366F1",
  },
  {
    value: 50,
    prefix: "$",
    suffix: "K",
    label: "Saved / Year",
    description: "Forecasting + ETL automation at TeknoBiz",
    icon: "BarChart3",
    color: "#10B981",
  },
];
