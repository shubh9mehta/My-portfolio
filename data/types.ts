export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  openToWork: boolean;
  targetRoles: string[];
  targetLocation: string;
}

export interface ImpactMetric {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

export interface MiniProject {
  title: string;
  type: string;
  blurb: string;
  tech: string[];
  metric: string;
  link: string;
  accentColor: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface ExperienceImpactItem {
  icon: string;
  value: string;
  label: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  focus: string;
  color: string;
  logo: string;
  bgGradient: string;
  headline: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  impact: ExperienceImpactItem[];
  highlights: string[];
  tools: string[];
}

export type ProjectDomain = "taxi" | "sales" | "churn" | "ckd";

export interface Project {
  id: ProjectDomain;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tech: string[];
  metric: string;
  link: string;
  accentColor: string;
}

export interface Tool {
  name: string;
  level: number;
  projects: number;
}

export interface ToolboxCategory {
  category: string;
  icon: string;
  color: string;
  tools: Tool[];
}

export interface SkillRadarEntry {
  skill: string;
  value: number;
  detail: string;
}

export interface SimulationRow {
  category: string;
  expected: number;
  actual: number;
  mismatch: number;
}

export interface SimulationData {
  messy: SimulationRow[];
  clean: SimulationRow[];
}
