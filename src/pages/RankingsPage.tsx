import { motion } from "framer-motion";
import { Globe2, Trophy, Users } from "lucide-react";
import RankingsPanel from "../components/RankingsPanel";
import { GlowCard } from "../components/ui";
import { GLOBAL_STATS } from "../data/db";

export default function RankingsPage() {
  return (
    <div className="relative overflow-hidden pt-32 pb-20">
      {/* 背景装饰 */}
      <div className="grid-lines absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(245,158,11,0.06),transparent_70%)]" />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 font-display text-[18vw] font-black tracking-tight text-white/[0.025] select-none"
      >
        RANK
      </p>

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-golden-500" />
            <span className="font-display text-[11px] font-bold tracking-[0.32em] text-golden-400 uppercase">
              Hall of Rankings
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            球星<span className="text-golden-300 text-glow-gold">排行榜</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
            金球奖次数、现役身价与历史进球——用三把尺子丈量不同时代的伟大。
            点击任意一行，进入球星的完整数据档案。
          </p>
        </motion.div>

        {/* 统计条 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-3"
        >
          {[
            { icon: <Users size={16} />, v: GLOBAL_STATS.players, label: "收录球星" },
            { icon: <Globe2 size={16} />, v: GLOBAL_STATS.countries, label: "百强国家" },
            { icon: <Trophy size={16} />, v: GLOBAL_STATS.worldCups, label: "世界杯总数" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass flex items-center justify-center gap-3 rounded-xl px-4 py-3.5"
            >
              <span className="text-turf-400">{s.icon}</span>
              <span className="tabular font-display text-xl text-white" style={{ fontWeight: 800 }}>
                {s.v}
              </span>
              <span className="text-[10px] tracking-widest text-slate-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-10"
        >
          <GlowCard gold className="p-6 sm:p-8">
            <RankingsPanel limit={10} />
          </GlowCard>
        </motion.div>

        <p className="mt-6 text-center text-[11px] tracking-wider text-slate-600">
          数据为演示用 Mock · 身价参考德转 2025 量级 · 进球为正式比赛口径（近似）
        </p>
      </div>
    </div>
  );
}
