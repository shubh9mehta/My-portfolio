// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Toolbox from './components/Toolbox';
import SkillRadar from './components/SkillRadar';
import Experience from './components/Experience';
import AnalysisSimulation from './components/AnalysisSimulation';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { Database } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Toolbox / Skills Section */}
      <Toolbox />

      {/* Career Distribution Radar */}
      <SkillRadar />

      {/* Work Experience */}
      <Experience />

      {/* Interactive Analysis Simulation */}
      <AnalysisSimulation />

      {/* Projects Grid */}
      <Projects />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <Database className="w-4 h-4" />
            <span className="text-sm">Built with data-driven precision</span>
          </div>
          <span className="text-slate-600 text-sm">© 2025 Shubh Mehta • All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
