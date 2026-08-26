import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  MousePointer2,
  Rotate3d,
  Trophy,
  ZoomIn,
} from "lucide-react";
import GlobeSection from "../components/GlobeSection";
import CountryDrawer from "../components/CountryDrawer";
import RankingsPanel from "../components/RankingsPanel";
import Flag from "../components/Flag";
import { GlowCard, SectionHead } from "../components/ui";
import { COUNTRIES, GLOBAL_STATS, isFeatured, ratingTicker } from "../data/db";
import type { Country } from "../data/db";

function HudCorners() {
  const base = "absolute h-10 w-10 border-turf-500/30";
  return (
    <>
      <span className={`${base} top-20 left-4 border-t-2 border-l-2 sm:top-24 sm:left-8`} />
      <span className={`${base} top-20 right-4 border-t-2 border-r-2 sm:top-24 sm:right-8`} />
      <span className={`${base} bottom-4 left-4 border-b-2 border-l-2 sm:bottom-8 sm:left-8`} />
      <span className={`${base} right-4 bottom-4 border-r-2 border-b-2 sm:right-8 sm:bottom-8`} />
    </>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Country | null>(null);
  const navigate = useNavigate();
  const rankingsRef = useRef<HTMLDivElement>(null);
  const tickerPlayers = ratingTicker(14);

  return (
    <div className="relative">
      {/* ================= 3D 地球主场 ================= */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-50" />
        <GlobeSection selected={selected} onSelect={setSelected} />

        {/* HUD 覆盖层 */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <HudCorners />

          {/* 左侧标题块 */}
          <div className="absolute top-24 left-5 max-w-xl sm:top-28 sm:left-10 lg:top-32 lg:left-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
            >
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-turf-400" />
                <span className="font-display text-[10px] font-bold tracking-[0.42em] text-turf-400 uppercase">
                  Football Globe · 3D 星图
                </span>
              </div>
              <h1 className="mt-4 text-[2.6rem] leading-[1.06] font-black text-white sm:text-6xl">
                旋转一颗星球，
                <br />
                <span className="text-turf-300 text-glow-green">装下整部足球史</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
                球体上的 {GLOBAL_STATS.countries} 个发光节点覆盖 FIFA 最新百强：
                <span className="text-golden-300">金色</span>是世界杯冠军国，
                <span className="text-turf-300">绿色</span>是收录球星档案的精选强国，
                <span className="text-sky-300">蓝色</span>是其余百强节点。点击任意节点翻开国家名片。
              </p>
              <div className="pointer-events-auto mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    setSelected(COUNTRIES.find((c) => c.id === "argentina") ?? null)
                  }
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-turf-500 px-6 py-2.5 text-sm font-bold text-pitch-950 shadow-[0_0_28px_rgba(16,185,129,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-turf-400"
                >
                  翻开阿根廷名片
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() =>
                    rankingsRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="cursor-pointer rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-turf-500/50 hover:text-turf-300"
                >
                  查看排行榜
                </button>
              </div>
            </motion.div>
          </div>

          {/* 右上统计 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-24 right-5 hidden flex-col items-end gap-2 md:flex sm:top-28 sm:right-10"
          >
            {[
              { v: GLOBAL_STATS.countries, label: "FIFA 百强节点" },
              { v: GLOBAL_STATS.featuredCountries, label: "精选强国" },
              { v: GLOBAL_STATS.players, label: "传奇球星" },
              { v: GLOBAL_STATS.worldCups, label: "世界杯总数" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass flex items-center gap-3 rounded-xl px-4 py-2"
              >
                <span className="text-[10px] tracking-widest text-slate-500">
                  {s.label}
                </span>
                <span
                  className="tabular font-display text-lg text-turf-300"
                  style={{ fontWeight: 800 }}
                >
                  {s.v}
                </span>
              </div>
            ))}
          </motion.div>

          {/* 左下图例 */}
          <div className="absolute bottom-24 left-5 hidden space-y-2 text-[11px] text-slate-500 sm:bottom-12 sm:left-10 lg:block">
            <p className="mb-2 font-display text-[9px] font-bold tracking-[0.3em] text-slate-600 uppercase">
              Legend
            </p>
            <p className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-golden-500 shadow-[0_0_10px_#f59e0b]" />
              捧起过世界杯的冠军国
            </p>
            <p className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-turf-500 shadow-[0_0_10px_#10b981]" />
              收录球星档案的精选强国
            </p>
            <p className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
              FIFA 百强节点（越大排名越高）
            </p>
          </div>

          {/* 右下操作提示 */}
          <div className="absolute right-5 bottom-24 hidden items-center gap-5 text-[11px] text-slate-500 sm:bottom-12 sm:right-10 lg:flex">
            <span className="flex items-center gap-1.5">
              <Rotate3d size={13} className="text-turf-400" /> 拖拽旋转
            </span>
            <span className="flex items-center gap-1.5">
              <ZoomIn size={13} className="text-turf-400" /> 滚轮缩放
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointer2 size={13} className="text-golden-400" /> 点击发光节点
            </span>
          </div>

          {/* 底部滚动提示 */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-slate-600">
            <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ================= 球星跑马灯 ================= */}
      <section className="relative border-y border-white/8 bg-pitch-950/80">
        <div className="flex overflow-hidden py-3.5">
          <div className="animate-marquee flex w-max shrink-0 items-center">
            {[...tickerPlayers, ...tickerPlayers].map((p, i) => (
              <button
                key={`${p.id}-${i}`}
                onClick={() => navigate(`/player/${p.id}`)}
                className="group flex shrink-0 cursor-pointer items-center gap-2.5"
              >
                <Flag id={p.countryId} className="h-3.5 w-[21px] rounded-[2px]" />
                <span className="text-sm font-bold text-slate-300 transition-colors group-hover:text-turf-300">
                  {p.nameZh}
                </span>
                <span className="tabular font-display text-xs text-golden-400" style={{ fontWeight: 700 }}>
                  {p.rating}
                </span>
                <span className="mx-5 h-1 w-1 rounded-full bg-white/15" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 国家快选 ================= */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHead
              eyebrow="Nations"
              title="选择你的主队"
              desc={`${GLOBAL_STATS.featuredCountries} 个精选强国率先收录完整球星档案，其余 ${
                GLOBAL_STATS.countries - GLOBAL_STATS.featuredCountries
              } 个 FIFA 百强国家都在星图之上。点击任意国家，直接翻开它的国家名片。`}
            />
          </motion.div>
          <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
            {COUNTRIES.filter(isFeatured).map((c, i) => (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                onClick={() => setSelected(c)}
                className="group w-[10rem] shrink-0 cursor-pointer rounded-xl border border-white/8 bg-white/[0.02] p-4 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-turf-500/45 hover:bg-turf-500/[0.06] hover:shadow-[0_14px_40px_rgba(16,185,129,0.14)]"
              >
                <Flag id={c.id} className="h-8 w-12 rounded-[4px]" />
                <p className="mt-3 text-sm font-black text-white group-hover:text-turf-300">
                  {c.nameZh}
                </p>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="tabular">FIFA #{c.fifaRank}</span>
                  {c.worldCups > 0 ? (
                    <span className="tabular flex items-center gap-1 font-bold text-golden-400">
                      <Trophy size={10} /> ×{c.worldCups}
                    </span>
                  ) : (
                    <span className="text-slate-600">{c.confed}</span>
                  )}
                </div>
              </motion.button>
            ))}
            <div className="flex w-[10rem] shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-sky-400/25 bg-sky-400/[0.04] p-4 text-center">
              <span className="tabular font-display text-xl font-extrabold text-sky-300">
                +{GLOBAL_STATS.countries - GLOBAL_STATS.featuredCountries}
              </span>
              <span className="mt-1.5 text-[10px] leading-relaxed tracking-widest text-slate-500">
                其余 FIFA 百强
                <br />
                尽在 3D 星图
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 排行榜预览 ================= */}
      <section ref={rankingsRef} className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(16,185,129,0.07),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <SectionHead
                eyebrow="Rankings"
                title="名人堂排行榜"
                desc="金球奖的王朝、转会市场的身价、历史射手榜的进球机器——三个维度，丈量伟大。"
              />
              <p className="-mt-3 mb-6 max-w-sm text-xs leading-relaxed text-slate-500">
                从梅罗争霸的十五年，到姆巴佩、哈兰德、贝林厄姆接管时代的今天，
                每一条数据背后都是一段看台上的呐喊。
              </p>
              <button
                onClick={() => navigate("/rankings")}
                className="group flex cursor-pointer items-center gap-2 rounded-full border border-turf-500/40 bg-turf-500/10 px-6 py-2.5 text-sm font-bold text-turf-300 transition-all duration-300 hover:bg-turf-500/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]"
              >
                进入完整榜单
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <GlowCard className="p-6 sm:p-7">
                <RankingsPanel limit={6} />
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      <CountryDrawer
        country={selected}
        onClose={() => setSelected(null)}
        onSelectCountry={setSelected}
      />
    </div>
  );
}
