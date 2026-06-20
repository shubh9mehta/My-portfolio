import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "taxi",
    title: "NYC Taxi Revenue & Operations Analytics",
    category: "Cloud + BI",
    description:
      "An end-to-end cloud pipeline: Mage-AI moves 150K sampled NYC TLC trips through Cloud Storage into BigQuery, with Cloud Scheduler refreshing Looker Studio dashboards automatically.",
    highlights: [
      "Fact–dimension model over 150,000 trip records in BigQuery",
      "Cloud Scheduler automates the entire refresh end to end",
      "$4.05M in fares analyzed — surfaced 3–7 AM airport peak hours and an 82.4% card-payment share",
    ],
    tech: ["GCP", "BigQuery", "Mage-AI", "Looker Studio", "Python"],
    metric: "$4.05M analyzed",
    link: "https://github.com/shubh9mehta",
    accentColor: "#6366F1",
  },
  {
    id: "sales",
    title: "Hardware Company Sales & Profitability",
    category: "Business Intelligence",
    description:
      "Two interactive Tableau dashboards turning large, multi-region sales and financial data into a clear read on regional performance and post-sale profit margins.",
    highlights: [
      "Regional performance dashboard with geographic drill-downs",
      "Post-sale margin dashboard linking revenue to true profitability",
      "Surfaced underperforming segments leadership had been missing",
    ],
    tech: ["Tableau", "SQL", "Excel", "Data Modeling"],
    metric: "2 exec dashboards",
    link: "#",
    accentColor: "#8B5CF6",
  },
  {
    id: "churn",
    title: "Telecom Customer Churn Prediction",
    category: "Customer Analytics",
    description:
      "A churn-prediction workflow that ranks at-risk telecom customers and explains why they leave — so retention teams can act before the customer does.",
    highlights: [
      "Compared Logistic Regression, Random Forest, and Gradient Boosting (GBM won)",
      "Tuned with GridSearchCV; judged on precision/recall/ROC-AUC, not just accuracy",
      "Top drivers — month-to-month contracts, high charges, short tenure — turned into a retention playbook",
    ],
    tech: ["Python", "scikit-learn", "pandas", "GridSearchCV", "EDA"],
    metric: "Risk-ranked outreach",
    link: "https://github.com/shubh9mehta/Customer-Churn-Analysis-in-Telecom-Sector",
    accentColor: "#06B6D4",
  },
  {
    id: "ckd",
    title: "Severe CKD Event Prediction (EHR)",
    category: "Healthcare ML",
    description:
      "A healthcare-grade model that flags severe Chronic Kidney Disease events early — statistically validated and explainable enough for clinicians to trust.",
    highlights: [
      "Validated features with Mann–Whitney U tests and effect sizes before modeling",
      "Voting Classifier (LogReg + XGBoost) with SMOTE, tuned via Optuna, optimized for recall",
      "SHAP explanations (eGFR, creatinine, age, comorbidity burden) — 87% ROC-AUC, 85% recall",
    ],
    tech: ["Python", "XGBoost", "SHAP", "SMOTE", "Optuna"],
    metric: "87% ROC-AUC",
    link: "https://github.com/shubh9mehta/ckd-events-prediction",
    accentColor: "#F59E0B",
  },
];
