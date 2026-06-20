import type { ToolboxCategory } from "./types";

export const toolbox: ToolboxCategory[] = [
  {
    category: "Analysis",
    icon: "Code2",
    color: "#6366F1",
    tools: [
      { name: "Python", level: 95, projects: 12 },
      { name: "SQL", level: 92, projects: 15 },
      { name: "R", level: 75, projects: 4 },
      { name: "Stata", level: 80, projects: 3 },
      { name: "Pandas", level: 90, projects: 10 },
      { name: "NumPy", level: 88, projects: 8 },
    ],
  },
  {
    category: "Cloud & Data",
    icon: "Cloud",
    color: "#06B6D4",
    tools: [
      { name: "GCP", level: 85, projects: 5 },
      { name: "AWS", level: 78, projects: 4 },
      { name: "BigQuery", level: 88, projects: 6 },
      { name: "Snowflake", level: 70, projects: 2 },
      { name: "Azure", level: 65, projects: 2 },
      { name: "MongoDB", level: 72, projects: 3 },
    ],
  },
  {
    category: "BI & Visualization",
    icon: "BarChart3",
    color: "#8B5CF6",
    tools: [
      { name: "Tableau", level: 90, projects: 8 },
      { name: "Power BI", level: 88, projects: 6 },
      { name: "Looker Studio", level: 85, projects: 5 },
      { name: "Excel", level: 95, projects: 20 },
      { name: "GA4", level: 82, projects: 4 },
    ],
  },
  {
    category: "ML & AI",
    icon: "Brain",
    color: "#F59E0B",
    tools: [
      { name: "scikit-learn", level: 85, projects: 6 },
      { name: "TensorFlow", level: 70, projects: 3 },
      { name: "LangChain", level: 75, projects: 2 },
      { name: "GPT-4o", level: 80, projects: 3 },
      { name: "RAG", level: 78, projects: 2 },
    ],
  },
];
