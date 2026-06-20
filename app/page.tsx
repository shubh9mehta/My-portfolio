import Hero from "@/components/sections/Hero";
import PipelineDAG from "@/components/sections/PipelineDAG";
import FlagshipCaseStudy from "@/components/sections/FlagshipCaseStudy";
import SqlPlayground from "@/components/sections/SqlPlayground";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import ModelTuner from "@/components/sections/ModelTuner";
import MoreProjects from "@/components/sections/MoreProjects";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <PipelineDAG />
      <FlagshipCaseStudy />
      <SqlPlayground />
      <ProjectsShowcase />
      <ModelTuner />
      <MoreProjects />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
