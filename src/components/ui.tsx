import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ---------------- Badge ---------------- */

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: "green" | "gold" | "slate" | "red";
}) {
  const tones: Record<string, string> = {
    green: "border-turf-500/25 bg-turf-500/10 text-turf-300",
    gold: "border-golden-500/30 bg-golden-500/10 text-golden-300",
    slate: "border-white/10 bg-white/5 text-slate-300",
    red: "border-red-500/25 bg-red-500/10 text-red-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------------- SectionHead ---------------- */

export function SectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-turf-500" />
        <span className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-turf-400">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {desc && <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{desc}</p>}
    </div>
  );
}

/* ---------------- PillTabs ---------------- */

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export function PillTabs({
  id,
  items,
  active,
  onChange,
}: {
  id: string;
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 no-scrollbar">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onChange(it.id)}
          className={`relative shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-colors duration-200 ${
            active === it.id ? "text-pitch-950" : "text-slate-300 hover:text-white"
          }`}
        >
          {active === it.id && (
            <motion.span
              layoutId={`pill-${id}`}
              className="absolute inset-0 rounded-full bg-turf-400 shadow-[0_0_18px_rgba(52,211,153,0.45)]"
              transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {it.label}
            {it.count !== undefined && (
              <span className="tabular text-[10px] opacity-70">{it.count}</span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ---------------- GlowCard ---------------- */

export function GlowCard({
  children,
  className = "",
  gold = false,
}: {
  children: ReactNode;
  className?: string;
  gold?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/8 bg-pitch-800/60 ${
        gold ? "border-glow-gold" : "border-glow"
      } ${className}`}
    >
      {children}
    </div>
  );
}
