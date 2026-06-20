"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

interface Node {
  id: string;
  cx: number;
  cy: number;
  title: string;
  sub: string;
  emoji: string;
  color: string;
}

const NODES: Node[] = [
  { id: "src", cx: 90, cy: 150, title: "Excel / CSV", sub: "Raw intake", emoji: "📄", color: "#F59E0B" },
  { id: "py", cx: 300, cy: 100, title: "Python", sub: "Clean & transform", emoji: "🐍", color: "#3B82F6" },
  { id: "sql", cx: 510, cy: 170, title: "SQL / BigQuery", sub: "Model & aggregate", emoji: "🗄️", color: "#22D3EE" },
  { id: "ml", cx: 720, cy: 100, title: "ML Model", sub: "Predict & score", emoji: "🧠", color: "#8B5CF6" },
  { id: "bi", cx: 930, cy: 150, title: "Dashboard", sub: "Decide", emoji: "📊", color: "#10B981" },
];

const NW = 132;
const NH = 80;

// Edge between two node centers, leaving/entering on horizontal edges with a curve.
function edgePath(a: Node, b: Node) {
  const x1 = a.cx + NW / 2;
  const y1 = a.cy;
  const x2 = b.cx - NW / 2;
  const y2 = b.cy;
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

const EDGES = NODES.slice(0, -1).map((n, i) => ({
  id: `edge-${i}`,
  d: edgePath(n, NODES[i + 1]),
  color: NODES[i + 1].color,
  delay: 0.3 + i * 0.25,
}));

export default function PipelineDAG() {
  return (
    <section id="pipeline" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="The Architecture"
          title={
            <>
              Messy data in. <span className="text-gradient">Decisions out.</span>
            </>
          }
          subtitle="Every project I build runs the same disciplined pipeline — raw files become clean tables, models, and dashboards you can act on."
          plain="Think of this as an assembly line for data: messy files go in one end, and clear answers come out the other. Each box is one step."
          technical="A standard ELT flow: ingest raw files → clean & transform in Python (pandas) → model and aggregate in SQL/BigQuery → score with ML → serve to a dashboard."
          align="center"
          className="mb-10"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-[32px] p-4 md:p-8"
        >
          <svg viewBox="0 0 1020 260" className="w-full" role="img" aria-label="Data pipeline diagram">
            <defs>
              <filter id="dagGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Edges (scroll-drawn) */}
            {EDGES.map((e) => (
              <motion.path
                key={e.id}
                id={e.id}
                d={e.d}
                fill="none"
                stroke={e.color}
                strokeWidth={1.6}
                strokeOpacity={0.5}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: e.delay, ease: "easeInOut" }}
              />
            ))}

            {/* Traveling data packets */}
            {EDGES.map((e, i) => (
              <g key={`pkt-${e.id}`}>
                <circle r={4.5} fill={e.color} filter="url(#dagGlow)">
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
                    <mpath href={`#${e.id}`} />
                  </animateMotion>
                </circle>
                <circle r={2} fill="#fff" opacity={0.9}>
                  <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${i * 0.5}s`}>
                    <mpath href={`#${e.id}`} />
                  </animateMotion>
                </circle>
              </g>
            ))}

            {/* Nodes */}
            {NODES.map((n, i) => (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <rect
                  x={n.cx - NW / 2}
                  y={n.cy - NH / 2}
                  width={NW}
                  height={NH}
                  rx={18}
                  fill="rgba(255,255,255,0.04)"
                  stroke={`${n.color}66`}
                  strokeWidth={1.2}
                />
                <text x={n.cx} y={n.cy - 14} textAnchor="middle" fontSize={20}>
                  {n.emoji}
                </text>
                <text
                  x={n.cx}
                  y={n.cy + 10}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={13}
                  fontWeight={600}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {n.title}
                </text>
                <text
                  x={n.cx}
                  y={n.cy + 26}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.45)"
                  fontSize={10}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {n.sub}
                </text>
              </motion.g>
            ))}
          </svg>

          {/* legend / caption */}
          <p className="mt-4 text-center text-xs text-white/35">
            Live data packets flow left to right — the same path your numbers take from spreadsheet to boardroom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
