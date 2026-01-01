// src/data/portfolioData.js
// All your portfolio data in one place - easy to update!

export const personalInfo = {
  name: "Shubh Mehta",
  title: "Data Analyst",
  tagline: "I solve operational headaches with data.",
  description: "Data & Business Analyst transforming complex datasets into actionable insights. From supply chain optimization to AI-powered research systems.",
  location: "United States",
  phone: "+1-812-803-4508",
  email: "shubh9mehta@gmail.com",
  linkedin: "https://linkedin.com/in/YOUR_LINKEDIN", // Update this!
  github: "https://github.com/YOUR_GITHUB", // Update this!
  openToWork: true,
  targetRoles: ["Data Analyst", "Business Analyst"],
  targetLocation: "USA",
};

export const impactMetrics = [
  {
    value: 24,
    suffix: "%",
    label: "Inventory Reduction",
    description: "Automated reconciliation across 400+ SKUs",
    icon: "TrendingUp",
    color: "#14B8A6", // teal
  },
  {
    value: 90,
    suffix: "%",
    label: "Faster Retrieval",
    description: "AI assistant reducing 5 min to <30 secs",
    icon: "Zap",
    color: "#22D3EE", // cyan
  },
  {
    value: 150,
    suffix: "K+",
    label: "Records Processed",
    description: "NYC Taxi ETL pipeline on GCP",
    icon: "Database",
    color: "#3B82F6", // blue
  },
  {
    value: 5,
    suffix: "",
    label: "BI Dashboards",
    description: "Tableau, Power BI, Looker Studio",
    icon: "BarChart3",
    color: "#8B5CF6", // violet
  },
];

export const education = [
  {
    school: "Indiana University Bloomington",
    degree: "Master of Science, Data Science",
    period: "Aug 2023 - May 2025",
  },
  {
    school: "SRM Institute of Science & Technology",
    degree: "Bachelor of Technology, Computer Science & Engineering",
    period: "Jul 2019 - May 2023",
  },
];

export const experiences = [
  {
    company: "Macrotech Corporation",
    role: "Data Analyst",
    period: "Aug 2025 - Present",
    location: "Irving, TX",
    type: "Operational Impact",
    focus: "Supply Chain & Inventory",
    color: "#14B8A6",
    highlights: [
      "Reduced inventory mismatches by 24% by automating reconciliation across 400+ SKUs using SQL queries and Excel functions",
      "Improved demand forecasting accuracy by 21% building Power BI dashboards and weekly SQL-driven reports from CRM data",
      "Reduced CRM data entry errors by 18% by standardizing input protocols with warehouse and IT teams",
    ],
    tools: ["SQL", "Power BI", "Excel", "CRM"],
  },
  {
    company: "CruiseAlly",
    role: "Growth Data Analyst",
    period: "Jun 2025 - Aug 2025",
    location: "Bloomington, IN",
    type: "Growth / Product",
    focus: "User Behavior & SEO",
    color: "#3B82F6",
    highlights: [
      "Uncovered 37% checkout drop-off across 1,000+ user sessions by analyzing GA4 funnel data in Looker Studio",
      "Decreased 0-result searches by 28% by building fallback logic in Django/GraphQL for alternative recommendations",
      "Conducted comprehensive SEO audit analyzing 200+ URLs, proposing JSON-LD breadcrumb schema implementation",
    ],
    tools: ["GA4", "Looker Studio", "Django", "GraphQL"],
  },
  {
    company: "Indiana University Research Data Commons",
    role: "NLP Research Assistant",
    period: "Jan 2025 - May 2025",
    location: "Bloomington, IN",
    type: "AI / NLP",
    focus: "LLMs & RAG Systems",
    color: "#8B5CF6",
    highlights: [
      "Reduced information retrieval time by 90% (5 mins to <30 secs) by deploying Flask-based AI assistant using GPT-4o",
      "Automated ingestion of 15+ disparate data sources to structured JSON knowledge base",
      "Implemented SentenceTransformers and cosine similarity for contextual, meaning-based queries",
    ],
    tools: ["Python", "Flask", "GPT-4o", "SentenceTransformers"],
  },
  {
    company: "Kelley School of Business",
    role: "Data Analyst Research Assistant",
    period: "May 2024 - Aug 2024",
    location: "Bloomington, IN",
    type: "Research / Finance",
    focus: "IPO & Layoff Analysis",
    color: "#F59E0B",
    highlights: [
      "Delivered 94% dataset match rate, linking 21,000 of 22,383 IPO records using Python fuzzy matching and Stata",
      "Revealed 17% reduced layoff probability in founder-led firms via logistic regression analysis",
      "Shortened processing runtime by 38% by optimizing Stata scripts with vectorized operations",
    ],
    tools: ["Python", "Stata", "Fuzzy Matching", "Logistic Regression"],
  },
  {
    company: "TeknoBiz Solutions Pvt Ltd.",
    role: "Data Analyst Intern",
    period: "May 2022 - Sep 2022",
    location: "India",
    type: "Sales Analytics",
    focus: "Forecasting & ETL",
    color: "#EC4899",
    highlights: [
      "Enhanced sales forecasting accuracy by 21% (R² from 0.65 to 0.78) using Random Forest and Gradient Boosting",
      "Streamlined manual data prep by 29%, reducing monthly reporting from 21 to 15 hours via T-SQL ETL pipelines",
      "Lowered excess inventory by 14% by building Tableau dashboards with regional segmentation insights",
    ],
    tools: ["Python", "SAS", "T-SQL", "Tableau"],
  },
];

export const projects = [
  {
    title: "NYC Taxi Revenue & Operations Analytics",
    category: "Cloud + BI",
    description:
      "End-to-end ETL pipeline using Mage-AI on GCP processing 150,000+ trip records into BigQuery, with automated Looker Studio dashboards.",
    highlights: [
      "Designed fact-dimension data warehouse schema",
      "Identified peak revenue hours (3-7 AM) and high-value pickup zones",
      "Automated dashboard refresh via Google Cloud Scheduler",
      "$4M+ transaction analysis with 82% credit card adoption insights",
    ],
    tech: ["GCP", "BigQuery", "Mage-AI", "Looker Studio", "Python"],
    metric: "$4M+ analyzed",
    link: "#", // Add your GitHub link
  },
  {
    title: "Sales Data Analysis for Hardware Company",
    category: "Business Intelligence",
    description:
      "Multi-dimensional sales and financial data analysis with interactive Tableau dashboards for strategic planning.",
    highlights: [
      "Built interactive dashboards with filters and drill-downs",
      "Visualized regional performance and profit margins",
      "Created reusable reporting framework for executives",
    ],
    tech: ["SQL", "Excel", "Tableau", "Data Modeling"],
    metric: "35% faster reporting",
    link: "#",
  },
  {
    title: "AI-Powered Research Assistant",
    category: "NLP / RAG",
    description:
      "Flask-based semantic search system using GPT-4o and SentenceTransformers for 10,000+ academic records.",
    highlights: [
      "90% reduction in information retrieval time",
      "Semantic search with cosine similarity",
      "Automated 15+ data source ingestion",
    ],
    tech: ["Python", "Flask", "GPT-4o", "SentenceTransformers", "JSON"],
    metric: "90% faster search",
    link: "#",
  },
  {
    title: "IPO Blockholder Analysis",
    category: "Financial Research",
    description:
      "Large-scale fuzzy matching and statistical analysis linking 21,000+ IPO records for layoff prediction research.",
    highlights: [
      "94% match rate on 22,383 records",
      "Logistic regression revealing founder-CEO impact",
      "38% runtime optimization via Stata vectorization",
    ],
    tech: ["Python", "Stata", "Fuzzy Matching", "Logistic Regression"],
    metric: "94% accuracy",
    link: "#",
  },
];

export const toolbox = [
  {
    category: "Analysis",
    icon: "Code2",
    tools: ["Python", "SQL", "R", "Stata", "Pandas", "NumPy"],
    color: "#14B8A6",
  },
  {
    category: "Cloud & Data",
    icon: "Cloud",
    tools: ["GCP", "AWS", "BigQuery", "Snowflake", "Azure", "MongoDB"],
    color: "#3B82F6",
  },
  {
    category: "BI & Visualization",
    icon: "BarChart3",
    tools: ["Tableau", "Power BI", "Looker Studio", "Excel", "GA4"],
    color: "#8B5CF6",
  },
  {
    category: "ML & AI",
    icon: "Brain",
    tools: ["scikit-learn", "TensorFlow", "LangChain", "GPT-4o", "RAG"],
    color: "#F59E0B",
  },
];

export const skillRadarData = [
  {
    skill: "Data Engineering",
    value: 85,
    detail: "ETL pipelines, BigQuery, cloud data infrastructure",
  },
  {
    skill: "Statistical Modeling",
    value: 78,
    detail: "Regression, forecasting, A/B testing, predictive analytics",
  },
  {
    skill: "Business Intelligence",
    value: 92,
    detail: "Tableau, Power BI, Looker Studio dashboards",
  },
  {
    skill: "Data Wrangling",
    value: 88,
    detail: "SQL automation, fuzzy matching, ETL optimization",
  },
  {
    skill: "Communication",
    value: 85,
    detail: "Stakeholder reporting, cross-functional collaboration",
  },
];

// Simulation data for the interactive demo
export const simulationData = {
  messy: [
    { category: "Q1", expected: 450, actual: 380, mismatch: 70 },
    { category: "Q2", expected: 520, actual: 445, mismatch: 75 },
    { category: "Q3", expected: 480, actual: 390, mismatch: 90 },
    { category: "Q4", expected: 550, actual: 470, mismatch: 80 },
  ],
  clean: [
    { category: "Q1", expected: 450, actual: 448, mismatch: 2 },
    { category: "Q2", expected: 520, actual: 515, mismatch: 5 },
    { category: "Q3", expected: 480, actual: 477, mismatch: 3 },
    { category: "Q4", expected: 550, actual: 546, mismatch: 4 },
  ],
};
