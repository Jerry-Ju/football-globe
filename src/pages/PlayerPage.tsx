import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Quote } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Flag from "../components/Flag";
import PlayerAvatar from "../components/PlayerAvatar";
import { Badge, GlowCard } from "../components/ui";
import { PORTRAITS } from "../data/portraits";
import {
  ABILITY_META,
  countryPlayers,
  getClub,
  getCountry,
  getPlayer,
} from "../data/db";

const tooltipStyle = {
  background: "rgba(10,15,26,0.96)",
  border: "1px solid rgba(16,185,129,0.35)",
  borderRadius: 10,
  fontSize: 12,
  color: "#e2e8f0",
  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
};

export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const player = id ? getPlayer(id) : undefined;

  if (!player) return <Navigate to="/" replace />;

  const country = getCountry(player.countryId);
  const club = getClub(player.clubId);
  const radarData = ABILITY_META.map((m) => ({
    subject: m.label,
    value: player.abilities[m.key],
    fullMark: 100,
  }));
  const careerData = player.career.map((s) => ({
    name: getClub(s.clubId)?.nameZh ?? s.clubId,
    进球: s.goals,
    出场: s.apps,
  }));
  const peers = country
    ? countryPlayers(country).filter((p) => p.id !== player.id)
    : [];

  return (
    <div className="relative overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_20%_0%,rgba(16,185,129,0.07),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* 顶部导航行 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition-all hover:border-turf-500/50 hover:text-turf-300"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            返回
          </button>
          <p className="text-[10px] tracking-[0.3em] text-slate-600 uppercase">
            Star Dossier · 球星档案
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* ============ 左：剪影肖像 + 数据砖 ============ */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:sticky lg:top-24"
            >
              <div className="scanlines relative overflow-hidden rounded-2xl border border-white/10 bg-pitch-800">
                {/* 号码水印 */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-8 right-0 z-0 font-display text-[11rem] leading-none font-black text-white/[0.05] select-none"
                >
                  {player.number}
                </span>
                <img
                  src={PORTRAITS[player.position]}
                  alt={`${player.nameZh} 剪影`}
                  className="relative h-[420px] w-full object-cover object-top sm:h-[480px]"
                />
                {/* 底部信息 */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pitch-950 via-pitch-950/80 to-transparent px-6 pt-20 pb-6">
                  <div className="flex items-center gap-2">
                    <Flag id={player.countryId} className="h-4 w-6 rounded-[2px]" />
                    <span className="font-display text-[10px] font-bold tracking-[0.3em] text-turf-400 uppercase">
                      {player.name}
                    </span>
                  </div>
                  <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                    {player.nameZh}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone={player.era === "传奇" ? "gold" : "green"}>
                      {player.era}
                    </Badge>
                    <Badge tone="slate">{player.posZh}</Badge>
                    <Badge tone="slate">
                      <MapPin size={11} /> {club?.nameZh}
                    </Badge>
                  </div>
                </div>
                {/* OVR 牌 */}
                <div className="glass-deep absolute top-4 right-4 rounded-xl px-4 py-2.5 text-center">
                  <p className="tabular font-display text-3xl text-golden-300 text-glow-gold" style={{ fontWeight: 900 }}>
                    {player.rating}
                  </p>
                  <p className="mt-0.5 font-display text-[8px] font-bold tracking-[0.3em] text-slate-400 uppercase">
                    Overall
                  </p>
                </div>
              </div>

              {/* 数据砖 */}
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {[
                  { v: player.goals, label: "生涯进球", gold: true },
                  { v: player.apps, label: "出场次数", gold: false },
                  { v: player.assists, label: "助攻", gold: false },
                  { v: player.ballonDor, label: "金球奖", gold: true },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className={`rounded-xl border px-2 py-3.5 text-center ${
                      s.gold
                        ? "border-golden-500/25 bg-golden-500/[0.06]"
                        : "border-white/8 bg-white/[0.03]"
                    }`}
                  >
                    <p
                      className={`tabular font-display text-xl sm:text-2xl ${
                        s.gold ? "text-golden-300" : "text-turf-300"
                      }`}
                      style={{ fontWeight: 800 }}
                    >
                      {s.v}
                    </p>
                    <p className="mt-1 text-[9px] tracking-widest text-slate-500">
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ============ 右：信息 + 图表 + 时间轴 ============ */}
          <div className="space-y-6 lg:col-span-7">
            {/* 基本信息 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="slate">
                  <CalendarDays size={11} /> {player.birthYear} 年生
                </Badge>
                {player.marketValue !== null && (
                  <Badge tone="gold">身价 €{player.marketValue}M</Badge>
                )}
                <Badge tone="slate">{country?.confed}</Badge>
                <Badge tone="slate">号码 {player.number}</Badge>
              </div>
              <blockquote className="mt-5 border-l-2 border-golden-500/70 pl-4 text-sm leading-relaxed text-slate-300 italic">
                <Quote size={14} className="mb-1.5 text-golden-400" />
                {player.quote}
              </blockquote>
            </motion.div>

            {/* 能力雷达 */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <GlowCard className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-base font-black text-white">能力六维雷达</h2>
                  <span className="font-display text-[9px] font-bold tracking-[0.28em] text-turf-400 uppercase">
                    Ability Radar
                  </span>
                </div>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="72%">
                      <PolarGrid stroke="rgba(148,163,184,0.14)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#94a3b8", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name={player.nameZh}
                        dataKey="value"
                        stroke="#10B981"
                        strokeWidth={2}
                        fill="#10B981"
                        fillOpacity={0.26}
                      />
                      <Tooltip contentStyle={tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                {/* 能力条 */}
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                  {ABILITY_META.map((m, i) => {
                    const v = player.abilities[m.key];
                    return (
                      <div key={m.key}>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{m.label}</span>
                          <span className="tabular font-display font-bold text-turf-300" style={{ fontWeight: 700 }}>
                            {v}
                          </span>
                        </div>
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/6">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${v}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-turf-600 to-turf-400"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlowCard>
            </motion.div>

            {/* 生涯轨迹 */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <GlowCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-black text-white">生涯轨迹 · 俱乐部数据</h2>
                  <span className="font-display text-[9px] font-bold tracking-[0.28em] text-turf-400 uppercase">
                    Career Path
                  </span>
                </div>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={careerData} barGap={4}>
                      <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(148,163,184,0.15)" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "#64748b", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        width={34}
                      />
                      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(16,185,129,0.06)" }} />
                      <Bar dataKey="进球" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={38} />
                      <Bar dataKey="出场" fill="rgba(245,158,11,0.45)" radius={[4, 4, 0, 0]} maxBarSize={38} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* 生涯路径年份条 */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {player.career.map((s) => {
                    const c = getClub(s.clubId);
                    return (
                      <span
                        key={`${s.clubId}-${s.years}`}
                        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-slate-300"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: c?.colors[0] ?? "#10B981" }}
                        />
                        {c?.nameZh}
                        <span className="tabular text-slate-500">{s.years}</span>
                      </span>
                    );
                  })}
                </div>
              </GlowCard>
            </motion.div>

            {/* 荣誉时间轴 */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <GlowCard gold={player.ballonDor > 0} className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-base font-black text-white">荣誉时间轴</h2>
                  <span className="font-display text-[9px] font-bold tracking-[0.28em] text-golden-400 uppercase">
                    Honors Timeline
                  </span>
                </div>
                <ol className="relative space-y-5 border-l border-turf-500/25 pl-6">
                  {player.honors.map((h, i) => (
                    <motion.li
                      key={`${h.year}-${h.title}`}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.09, duration: 0.4 }}
                      className="relative"
                    >
                      <span
                        className={`absolute top-1 -left-[1.85rem] h-3 w-3 rounded-full border-2 ${
                          h.golden
                            ? "border-golden-400 bg-golden-500/30 shadow-[0_0_12px_rgba(245,158,11,0.6)]"
                            : "border-turf-400 bg-turf-500/25 shadow-[0_0_10px_rgba(16,185,129,0.45)]"
                        }`}
                      />
                      <p
                        className={`tabular font-display text-sm ${
                          h.golden ? "text-golden-300" : "text-turf-300"
                        }`}
                        style={{ fontWeight: 700 }}
                      >
                        {h.year}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-slate-200">
                        {h.title}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </GlowCard>
            </motion.div>

            {/* 同国球星 */}
            {peers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
              >
                <p className="mb-3 text-xs font-bold tracking-widest text-slate-500">
                  同国球星 · 来自{country?.nameZh}
                </p>
                <div className="flex flex-wrap gap-3">
                  {peers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => navigate(`/player/${p.id}`)}
                      className="group flex cursor-pointer items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] py-2 pr-4 pl-2 transition-all hover:-translate-y-0.5 hover:border-turf-500/40 hover:bg-turf-500/[0.06]"
                    >
                      <PlayerAvatar player={p} size={36} showRating={false} />
                      <span className="text-left">
                        <span className="block text-xs font-bold text-white group-hover:text-turf-300">
                          {p.nameZh}
                        </span>
                        <span className="tabular block font-display text-[9px] text-slate-500" style={{ fontWeight: 700 }}>
                          OVR {p.rating}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
