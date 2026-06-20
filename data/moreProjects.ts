import type { MiniProject } from "./types";

const PROFILE = "https://github.com/shubh9mehta";

// Secondary builds — strong projects shown as compact cards (no live dashboard).
export const moreProjects: MiniProject[] = [
  {
    title: "End-to-End ML Pipeline + Cloud Deployment",
    type: "ML Engineering / MLOps",
    blurb:
      "A modular ingestion → training → inference pipeline comparing 6 algorithms, containerized with Docker and shipped on both AWS and Azure via CI/CD.",
    tech: ["Python", "scikit-learn", "Docker", "AWS", "Azure", "CI/CD"],
    metric: "R² 0.87 · AWS + Azure",
    link: PROFILE,
    accentColor: "#6366F1",
  },
  {
    title: "Ethereum Price Forecasting",
    type: "Deep Learning / Time Series",
    blurb:
      "A bidirectional LSTM with RSI/MACD features and ensembling that beats ARIMA and linear baselines on noisy, volatile crypto data.",
    tech: ["TensorFlow", "Keras", "pandas", "LSTM"],
    metric: "+15% vs baselines · 85% directional",
    link: PROFILE,
    accentColor: "#8B5CF6",
  },
  {
    title: "LA Crime Analytics Dashboard",
    type: "Geospatial / BI",
    blurb:
      "An interactive Streamlit dashboard over 900K+ LAPD records — hotspots, temporal trends, and demographic patterns with live API refresh.",
    tech: ["Python", "Streamlit", "Plotly", "Folium"],
    metric: "900K+ records",
    link: "https://github.com/shubh9mehta/LA-Crime-Visualisations",
    accentColor: "#06B6D4",
  },
  {
    title: "EmoSense — Real-Time Emotion Recognition",
    type: "Computer Vision",
    blurb:
      "VGG-16 transfer learning plus OpenCV detecting and classifying facial emotions live from a webcam feed in real time.",
    tech: ["TensorFlow", "Keras", "OpenCV", "VGG-16"],
    metric: "Real-time inference",
    link: PROFILE,
    accentColor: "#10B981",
  },
  {
    title: "Customer Personality Segmentation",
    type: "Unsupervised Learning",
    blurb:
      "K-means segmentation of customer behavior into actionable personas, validated with silhouette analysis and translated into marketing strategy.",
    tech: ["Python", "scikit-learn", "K-means", "EDA"],
    metric: "Silhouette 0.54",
    link: PROFILE,
    accentColor: "#F59E0B",
  },
  {
    title: "Political Sentiment: Twitter vs Reddit",
    type: "NLP / Sentiment",
    blurb:
      "Compared platform sentiment around India's 2019 elections across 200K+ posts, exposing where rule-based VADER breaks on sarcasm and nuance.",
    tech: ["Python", "NLTK", "scikit-learn", "LDA"],
    metric: "200K+ posts",
    link: PROFILE,
    accentColor: "#EC4899",
  },
  {
    title: "Post-COVID Lung Impact Study",
    type: "Healthcare ML / Imaging",
    blurb:
      "Combined 300 lung scans with symptom data and gradient-boosted models to predict recovery vs deterioration, improving data quality 25%.",
    tech: ["Python", "XGBoost", "LightGBM", "Image Processing"],
    metric: "Imaging + clinical",
    link: PROFILE,
    accentColor: "#22D3EE",
  },
];
