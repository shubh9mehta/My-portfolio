"use client";

import { reconRows } from "./reconData";
import { cn } from "@/lib/utils";

/**
 * Scene 1 / 2 surface: the raw warehouse scan as it actually arrives — strings,
 * blank cells, "ERR" values. When `clean` flips true the same grid resolves into
 * a tidy, reconciled numeric table (the payoff of the SQL).
 */
export default function RawExcelGrid({ clean = false }: { clean?: boolean }) {
  return (
    <div className="glass w-full max-w-xl overflow-hidden rounded-3xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/40">
          {clean ? "reconciled.csv" : "warehouse_scan_raw.xlsx"}
        </span>
      </div>

      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wider text-white/35">
            <th className="px-4 py-2.5 font-medium">SKU</th>
            <th className="px-4 py-2.5 font-medium">System</th>
            <th className="px-4 py-2.5 font-medium">
              {clean ? "Counted" : "Counted (raw)"}
            </th>
            <th className="px-4 py-2.5 text-right font-medium">Variance</th>
          </tr>
        </thead>
        <tbody>
          {reconRows.map((r) => {
            const variance = r.system - r.counted;
            const isDirty =
              r.countedRaw.trim() === "" ||
              r.countedRaw === "ERR" ||
              /[ ,]/.test(r.countedRaw);
            return (
              <tr
                key={r.sku}
                className="border-t border-white/[0.06] text-white/80"
              >
                <td className="px-4 py-2.5">{r.sku}</td>
                <td className="px-4 py-2.5">{r.system.toLocaleString()}</td>
                <td
                  className={cn(
                    "px-4 py-2.5",
                    !clean && isDirty && "text-accent-amber"
                  )}
                >
                  {clean
                    ? r.counted.toLocaleString()
                    : r.countedRaw.trim() === ""
                    ? "—"
                    : r.countedRaw}
                </td>
                <td
                  className={cn(
                    "px-4 py-2.5 text-right font-semibold",
                    clean
                      ? "text-accent-emerald"
                      : "text-[#ff6b6b]"
                  )}
                >
                  {clean
                    ? (variance >= 0 ? "+" : "") + variance
                    : isDirty
                    ? "??"
                    : (r.system - Number(r.countedRaw.replace(/[^0-9]/g, ""))).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className={cn(
          "border-t border-white/10 px-4 py-3 text-xs font-medium",
          clean ? "text-accent-emerald" : "text-accent-amber"
        )}
      >
        {clean
          ? "✓ 400+ SKUs reconciled · variance within tolerance"
          : "⚠ Inconsistent formats, blanks & errors — manual audits failing"}
      </div>
    </div>
  );
}
