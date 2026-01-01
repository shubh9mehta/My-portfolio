import { useState } from 'react';

const toolsData = [
  { 
    category: 'Analysis',
    color: '#14B8A6',
    tools: [
      { name: 'Python', level: 95, projects: 12 },
      { name: 'SQL', level: 92, projects: 15 },
      { name: 'R', level: 75, projects: 4 },
      { name: 'Stata', level: 80, projects: 3 },
      { name: 'Pandas', level: 90, projects: 10 },
      { name: 'NumPy', level: 88, projects: 8 },
    ]
  },
  { 
    category: 'Cloud & Data',
    color: '#3B82F6',
    tools: [
      { name: 'GCP', level: 85, projects: 5 },
      { name: 'AWS', level: 78, projects: 4 },
      { name: 'BigQuery', level: 88, projects: 6 },
      { name: 'Snowflake', level: 70, projects: 2 },
      { name: 'Azure', level: 65, projects: 2 },
      { name: 'MongoDB', level: 72, projects: 3 },
    ]
  },
  { 
    category: 'BI & Visualization',
    color: '#8B5CF6',
    tools: [
      { name: 'Tableau', level: 90, projects: 8 },
      { name: 'Power BI', level: 88, projects: 6 },
      { name: 'Looker Studio', level: 85, projects: 5 },
      { name: 'Excel', level: 95, projects: 20 },
      { name: 'GA4', level: 82, projects: 4 },
    ]
  },
  { 
    category: 'ML & AI',
    color: '#F59E0B',
    tools: [
      { name: 'scikit-learn', level: 85, projects: 6 },
      { name: 'TensorFlow', level: 70, projects: 3 },
      { name: 'LangChain', level: 75, projects: 2 },
      { name: 'GPT-4o', level: 80, projects: 3 },
      { name: 'RAG', level: 78, projects: 2 },
    ]
  },
];

const getToolLogo = (toolName) => {
  const logos = {
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    'R': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg',
    'Stata': null,
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'NumPy': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    'BigQuery': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'Snowflake': null,
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'Tableau': null,
    'Power BI': null,
    'Looker Studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    'Excel': null,
    'GA4': null,
    'scikit-learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'LangChain': null,
    'GPT-4o': null,
    'RAG': null,
  };
  return logos[toolName] || null;
};

const ToolBadge = ({ tool, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const logoUrl = getToolLogo(tool.name);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer bg-slate-800/50 border border-slate-700/50 hover:scale-105 transition-all duration-300 ease-out"
        style={{
          borderColor: isHovered ? color : undefined,
          boxShadow: isHovered ? `0 0 20px ${color}20` : undefined,
        }}
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={tool.name}
              className="w-5 h-5 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div
              className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-xs font-bold"
              style={{ color }}
            >
              {tool.name.charAt(0)}
            </div>
          )}
        </div>
        <span className="text-sm text-slate-300 font-medium whitespace-nowrap">
          {tool.name}
        </span>
      </div>

      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl min-w-[160px]">
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Proficiency</span>
                <span style={{ color }}>{tool.level}%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${tool.level}%`, backgroundColor: color }}
                />
              </div>
            </div>
            <div className="text-xs text-slate-400">
              <span style={{ color }} className="font-semibold">
                {tool.projects}
              </span>{' '}
              projects completed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Toolbox = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-widest">
            Technical Arsenal
          </span>
          <h2 className="text-4xl font-bold mt-4">The Toolbox</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Hover over any tool to see my proficiency level and project experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-teal-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All Tools
          </button>

          {toolsData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.category
                  ? 'text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              style={{ backgroundColor: activeCategory === cat.category ? cat.color : undefined }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {toolsData
            .filter((cat) => !activeCategory || cat.category === activeCategory)
            .map((category) => (
              <div key={category.category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <h3 className="text-lg font-semibold text-slate-300">{category.category}</h3>
                  <div className="flex-1 h-px bg-slate-800" />
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.tools.map((tool) => (
                    <ToolBadge key={tool.name} tool={tool} color={category.color} />
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Stats (tightened) */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Programming Languages', value: '4+' },
            { label: 'Cloud Platforms', value: '5+' },
            { label: 'BI Tools', value: '5' },
            { label: 'ML Frameworks', value: '4+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800"
            >
              <div className="text-2xl font-bold text-teal-400">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 150ms ease-out; }
      `}</style>
    </section>
  );
};

export default Toolbox;
