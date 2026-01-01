import { useState } from 'react';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';

const experienceStories = [
  {
    id: 1,
    company: 'Macrotech Corporation',
    role: 'Data Analyst',
    period: 'Aug 2025 - Present',
    location: 'Irving, TX',
    logo: 'M',
    color: '#14B8A6',
    bgGradient: 'from-teal-500/20 to-cyan-500/10',
    headline: 'Eliminated Warehouse Chaos',
    metric: '24%',
    metricLabel: 'Fewer Inventory Mismatches',
    challenge: 'Manual inventory tracking across 400+ SKUs led to costly warehouse audit failures.',
    solution: 'Built automated SQL reconciliation system integrated with Excel reporting.',
    impact: [
      { icon: TrendingUp, value: '24%', label: 'Mismatch Reduction' },
      { icon: Zap, value: '21%', label: 'Better Forecasting' },
      { icon: Users, value: '18%', label: 'Fewer Data Errors' },
    ],
    tools: ['SQL', 'Power BI', 'Excel', 'CRM'],
  },
  {
    id: 2,
    company: 'CruiseAlly',
    role: 'Growth Data Analyst',
    period: 'Jun 2025 - Aug 2025',
    location: 'Bloomington, IN',
    logo: 'C',
    color: '#3B82F6',
    bgGradient: 'from-blue-500/20 to-indigo-500/10',
    headline: 'Rescued Abandoned Checkouts',
    metric: '37%',
    metricLabel: 'Drop-off Rate Identified',
    challenge: 'Users were abandoning the booking flow, but no one knew exactly where or why.',
    solution: 'Deep GA4 funnel analysis pinpointed the exact friction points in the checkout journey.',
    impact: [
      { icon: TrendingUp, value: '37%', label: 'Drop-off Found' },
      { icon: Zap, value: '28%', label: 'Search Failures Fixed' },
      { icon: Users, value: '200+', label: 'URLs Audited' },
    ],
    tools: ['GA4', 'Looker Studio', 'Django', 'GraphQL'],
  },
  {
    id: 3,
    company: 'IU Research Data Commons',
    role: 'NLP Research Assistant',
    period: 'Jan 2025 - May 2025',
    location: 'Bloomington, IN',
    logo: 'IU',
    color: '#8B5CF6',
    bgGradient: 'from-violet-500/20 to-purple-500/10',
    headline: 'Made Research Instant',
    metric: '90%',
    metricLabel: 'Faster Information Retrieval',
    challenge: 'Researchers spent 5+ minutes searching through 10,000+ scattered records.',
    solution: 'Deployed AI-powered semantic search using GPT-4o and vector embeddings.',
    impact: [
      { icon: Clock, value: '5min → 30s', label: 'Search Time' },
      { icon: Zap, value: '15+', label: 'Data Sources Unified' },
      { icon: TrendingUp, value: '10K+', label: 'Records Indexed' },
    ],
    tools: ['Python', 'Flask', 'GPT-4o', 'SentenceTransformers'],
  },
  {
    id: 4,
    company: 'Kelley School of Business',
    role: 'Data Analyst Research Assistant',
    period: 'May 2024 - Aug 2024',
    location: 'Bloomington, IN',
    logo: 'K',
    color: '#F59E0B',
    bgGradient: 'from-amber-500/20 to-orange-500/10',
    headline: 'Cracked the IPO Code',
    metric: '94%',
    metricLabel: 'Dataset Match Rate',
    challenge: 'Linking 22,000+ IPO records to blockholder data seemed impossible with messy identifiers.',
    solution: 'Python fuzzy matching + Stata optimization to create reliable financial dataset.',
    impact: [
      { icon: TrendingUp, value: '94%', label: 'Match Accuracy' },
      { icon: Zap, value: '38%', label: 'Faster Processing' },
      { icon: Users, value: '17%', label: 'Key Finding' },
    ],
    tools: ['Python', 'Stata', 'Fuzzy Matching'],
  },
  {
    id: 5,
    company: 'TeknoBiz Solutions',
    role: 'Data Analyst Intern',
    period: 'May 2022 - Sep 2022',
    location: 'India',
    logo: 'T',
    color: '#EC4899',
    bgGradient: 'from-pink-500/20 to-rose-500/10',
    headline: 'Predicted Sales Smarter',
    metric: '21%',
    metricLabel: 'Better Forecast Accuracy',
    challenge: 'Sales forecasting was guesswork—R² of just 0.65 on 100K+ records.',
    solution: 'Built Random Forest & Gradient Boosting ensemble with proper feature engineering.',
    impact: [
      { icon: TrendingUp, value: '0.65→0.78', label: 'R² Improved' },
      { icon: Zap, value: '29%', label: 'Faster Reporting' },
      { icon: Users, value: '14%', label: 'Less Excess Stock' },
    ],
    tools: ['Python', 'SAS', 'T-SQL', 'Tableau'],
  },
];

const ExperienceCard = ({ story, isExpanded, onToggle }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-slate-800 transition-all duration-500 cursor-pointer ${isExpanded ? 'bg-slate-900/80' : 'bg-slate-900/40 hover:bg-slate-900/60'}`} onClick={onToggle}>
      <div className={`absolute inset-0 bg-gradient-to-br ${story.bgGradient} opacity-50`} />
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: story.color }} />

      <div className="relative p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0" style={{ backgroundColor: `${story.color}20`, color: story.color }}>{story.logo}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-white">{story.company}</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${story.color}20`, color: story.color }}>{story.role}</span>
            </div>
            <p className="text-slate-400 text-sm">{story.period} • {story.location}</p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl md:text-4xl font-bold" style={{ color: story.color }}>{story.metric}</div>
            <div className="text-xs text-slate-400 mt-1">{story.metricLabel}</div>
          </div>
        </div>

        <h4 className="text-2xl font-bold mt-6 text-white">{story.headline}</h4>

        <div className="sm:hidden mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: `${story.color}15` }}>
          <span className="text-2xl font-bold" style={{ color: story.color }}>{story.metric}</span>
          <span className="text-sm text-slate-400">{story.metricLabel}</span>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-xs uppercase tracking-wider text-red-400 mb-2">The Challenge</div>
              <p className="text-slate-300 text-sm">{story.challenge}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div className="text-xs uppercase tracking-wider text-teal-400 mb-2">My Solution</div>
              <p className="text-slate-300 text-sm">{story.solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {story.impact.map((item, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
                <item.icon className="w-5 h-5 mx-auto mb-2" style={{ color: story.color }} />
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {story.tools.map((tool) => (
              <span key={tool} className="px-3 py-1 text-xs rounded-lg bg-slate-800 text-slate-400 border border-slate-700">{tool}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <div className={`flex items-center gap-2 text-sm text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <span className="text-xs">{isExpanded ? 'Show less' : 'See the full story'}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [expandedId, setExpandedId] = useState(1);

  return (
    <section id="work" className="relative py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-teal-400 text-sm font-medium uppercase tracking-widest">Impact Stories</span>
          <h2 className="text-4xl font-bold mt-4">Where I Made a Difference</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">Click any card to see the full story—the challenge, my solution, and the measurable impact.</p>
        </div>

        <div className="space-y-4">
          {experienceStories.map((story) => (
            <ExperienceCard key={story.id} story={story} isExpanded={expandedId === story.id} onToggle={() => setExpandedId(expandedId === story.id ? null : story.id)} />
          ))}
        </div>

        <div className="mt-16 flex items-center justify-center gap-2 text-slate-500 text-sm">
          <span>2022</span>
          <div className="w-32 h-0.5 bg-gradient-to-r from-pink-500 via-violet-500 to-teal-500 rounded-full" />
          <span>Present</span>
        </div>
      </div>
    </section>
  );
};

export default Experience;
