"use client";

import { RECON_SQL } from "./reconData";

/**
 * Scene 2 surface: a syntax-highlighted SQL window that "types itself" as the
 * user scrolls. `charCount` is driven by scroll progress in the orchestrator.
 */

const KEYWORDS =
  /\b(WITH|SELECT|FROM|WHERE|AS|ORDER BY|DESC|COALESCE|NULLIF|REGEXP_REPLACE|SAFE_CAST|ROUND|ABS|INT64)\b/g;

function highlight(line: string) {
  // comments
  if (line.trim().startsWith("--")) {
    return <span className="text-white/35">{line}</span>;
  }
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(KEYWORDS);
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    parts.push(
      <span key={m.index} className="font-semibold text-accent-cyan">
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return <>{parts}</>;
}

export default function SqlWindow({ charCount }: { charCount: number }) {
  const typed = RECON_SQL.slice(0, charCount);
  const done = charCount >= RECON_SQL.length;
  const lines = typed.split("\n");

  return (
    <div className="glass w-full max-w-xl overflow-hidden rounded-3xl">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/40">
          reconcile_inventory.sql
        </span>
      </div>

      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-white/85">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-5 shrink-0 select-none text-right text-white/20">
                {i + 1}
              </span>
              <span className="whitespace-pre-wrap">
                {highlight(line)}
                {!done && i === lines.length - 1 && (
                  <span className="type-cursor" />
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
