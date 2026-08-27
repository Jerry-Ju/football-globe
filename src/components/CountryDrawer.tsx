import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, Trophy, Award, ChevronRight, MapPin, Building2 } from "lucide-react";
import Flag from "./Flag";
import PlayerAvatar from "./PlayerAvatar";
import { PillTabs, Badge } from "./ui";
import { countryClubs, countryPlayers, getClub } from "../data/db";
import type { Country } from "../data/db";
import { FEATURED_PICKS } from "../data/picks";

export default function CountryDrawer({
  country,
  onClose,
  onSelectCountry,
}: {
  country: Country | null;
  onClose: () => void;
  onSelectCountry?: (c: Country) => void;
}) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("players");

  useEffect(() => setTab("players"), [country?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {country && (
        <>
          <motion.div
            key="drawer-backdrop"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key={country.id}
            className="glass-deep fixed top-0 right-0 z-50 flex h-full w-full max-w-[27rem] flex-col border-l border-turf-500/20 shadow-[-40px_0_90px_rgba(0,0,0,0.6)]"
            initial={{ x: "104%", opacity: 0.4 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "104%", opacity: 0.3 }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
          >
            {/* 顶部主题色光带 */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-20"
              style={{
                background: `linear-gradient(115deg, ${country.theme[0]} 0%, transparent 70%)`,
              }}
            />

            {/* 头部 */}
            <div className="relative border-b border-white/8 px-6 pt-6 pb-5">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:rotate-90 hover:border-turf-500/50 hover:text-turf-300"
                aria-label="关闭"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-4">
                <Flag id={country.id} className="h-12 w-[72px] rounded-[5px]" />
                <div>
                  <p className="font-display text-[10px] font-bold tracking-[0.34em] text-turf-400 uppercase">
                    {country.name}
                  </p>
                  <h2 className="mt-1 text-3xl font-black text-white">
                    {country.nameZh}
                  </h2>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone="gold">FIFA #{country.fifaRank}</Badge>
                <Badge tone="slate">{country.confed}</Badge>
                {country.worldCups > 0 && (
                  <Badge tone="gold">
                    <Trophy size={11} /> 世界杯 ×{country.worldCups}
                  </Badge>
                )}
                {country.playerIds.length > 0 ? (
                  <Badge tone="green">球星 {country.playerIds.length}</Badge>
                ) : (
                  <Badge tone="slate">球星档案收录中</Badge>
                )}
              </div>

              <p className="mt-4 border-l-2 border-turf-500/60 pl-3 text-xs leading-relaxed text-slate-400">
                “{country.tagline}”
              </p>
            </div>

            {/* 荣誉数据条 */}
            <div className="grid grid-cols-3 gap-2 px-6 py-4">
              {[
                { label: "世界杯", value: country.worldCups, gold: true },
                { label: country.continentalLabel, value: country.continentals, gold: false },
                { label: "FIFA 排名", value: `#${country.fifaRank}`, gold: false },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl border px-3 py-3 text-center ${
                    s.gold
                      ? "border-golden-500/25 bg-golden-500/[0.06]"
                      : "border-white/8 bg-white/[0.03]"
                  }`}
                >
                  <p
                    className={`tabular font-display text-2xl font-extrabold ${
                      s.gold ? "text-golden-300 text-glow-gold" : "text-turf-300"
                    }`}
                    style={{ fontWeight: 800 }}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-[10px] tracking-widest text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="px-6">
              <PillTabs
                id={`drawer-${country.id}`}
                items={[
                  { id: "players", label: "Top 球星", count: country.playerIds.length || undefined },
                  { id: "clubs", label: "顶级俱乐部", count: country.clubIds.length || undefined },
                ]}
                active={tab}
                onChange={setTab}
              />
            </div>

            {/* 内容 */}
            <div className="mt-4 flex-1 overflow-y-auto px-6 pb-6">
              <AnimatePresence mode="wait">
                {tab === "players" ? (
                  <motion.div
                    key="players"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {countryPlayers(country).length === 0 ? (
                      <div className="flex flex-col items-center rounded-xl border border-dashed border-white/12 px-6 py-10 text-center">
                        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-turf-500/25 bg-turf-500/[0.06]">
                          <span className="absolute inset-0 animate-pulse-dot rounded-full border border-turf-500/20" />
                          <Trophy size={22} className="text-turf-400" />
                        </span>
                        <p className="mt-4 text-sm font-bold text-slate-200">
                          {country.nameZh}的球星档案正在收录
                        </p>
                        <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-slate-500">
                          星图已标记 {country.nameZh} 的 FIFA 排名与坐标，
                          完整球星档案即将点亮这颗节点。
                        </p>
                        <p className="mt-6 text-[10px] font-bold tracking-[0.28em] text-slate-500 uppercase">
                          先看精选国家
                        </p>
                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                          {FEATURED_PICKS.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => onSelectCountry?.(c)}
                              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pr-3.5 pl-1.5 text-xs font-semibold text-slate-300 transition-all hover:-translate-y-0.5 hover:border-turf-500/45 hover:text-turf-300"
                            >
                              <Flag id={c.id} className="h-4 w-6 rounded-[2px]" />
                              {c.nameZh}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3">
                      {countryPlayers(country).map((p, i) => {
                        const club = getClub(p.clubId);
                        return (
                          <motion.button
                            key={p.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.06 * i, duration: 0.3 }}
                            onClick={() => navigate(`/player/${p.id}`)}
                            className="group w-[10.5rem] shrink-0 cursor-pointer rounded-xl border border-white/8 bg-white/[0.03] p-3.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-turf-500/45 hover:bg-turf-500/[0.07] hover:shadow-[0_10px_36px_rgba(16,185,129,0.16)]"
                          >
                            <PlayerAvatar player={p} size={56} />
                            <p className="mt-3 text-sm font-bold text-white group-hover:text-turf-300">
                              {p.nameZh}
                            </p>
                            <p className="mt-0.5 font-display text-[9px] tracking-[0.18em] text-slate-500 uppercase">
                              {p.name}
                            </p>
                            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                              <span
                                className="h-1.5 w-1.5 shrink-0 rounded-full"
                                style={{ background: club?.colors[0] }}
                              />
                              <span className="truncate">{club?.nameZh}</span>
                            </div>
                            <div className="mt-2.5 flex items-center gap-1.5">
                              <Badge tone="slate">{p.posZh.split(" ")[0]}</Badge>
                              <Badge tone={p.era === "传奇" ? "gold" : "green"}>
                                {p.era}
                              </Badge>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <ChevronRight size={12} className="text-turf-400" />
                      点击球星卡片，进入专属数据档案
                    </p>

                    {/* 纵向完整列表 */}
                    <div className="mt-5 space-y-2">
                      {countryPlayers(country).map((p, i) => {
                        const club = getClub(p.clubId);
                        return (
                          <motion.button
                            key={p.id}
                            initial={{ opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * i, duration: 0.28 }}
                            onClick={() => navigate(`/player/${p.id}`)}
                            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5 text-left transition-all hover:border-turf-500/40 hover:bg-turf-500/[0.06]"
                          >
                            <PlayerAvatar player={p} size={40} showRating={false} />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-white">
                                {p.nameZh}
                                {p.ballonDor > 0 && (
                                  <span className="ml-2 inline-flex items-center gap-0.5 text-[10px] font-bold text-golden-300">
                                    <Award size={11} /> 金球×{p.ballonDor}
                                  </span>
                                )}
                              </p>
                              <p className="truncate text-[11px] text-slate-500">
                                {club?.nameZh} · {p.posZh}
                              </p>
                            </div>
                            <span className="tabular font-display text-lg font-bold text-turf-300">
                              {p.rating}
                            </span>
                            <ChevronRight
                              size={15}
                              className="text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-turf-400"
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="clubs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="space-y-2.5"
                  >
                    {countryClubs(country).length === 0 ? (
                      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/12 px-6 py-12 text-center">
                        <Building2 size={26} className="text-slate-600" />
                        <p className="text-sm text-slate-500">
                          该国的顶级俱乐部暂未收录进星图
                        </p>
                      </div>
                    ) : (
                      countryClubs(country).map((c, i) => (
                        <motion.div
                          key={c.id}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.28 }}
                          className="rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-colors hover:border-golden-500/35 hover:bg-golden-500/[0.04]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span
                                className="h-9 w-9 shrink-0 rounded-lg border border-white/15"
                                style={{
                                  background: `linear-gradient(135deg, ${c.colors[0]}, ${c.colors[1]})`,
                                }}
                              />
                              <div>
                                <p className="text-sm font-bold text-white">
                                  {c.nameZh}
                                </p>
                                <p className="mt-0.5 flex items-center gap-1 font-display text-[9px] tracking-[0.2em] text-slate-500 uppercase">
                                  {c.name}
                                </p>
                              </div>
                            </div>
                            <Badge tone="slate">{c.league}</Badge>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="text-turf-400" />
                              {c.city} · 成立于 {c.founded}
                            </span>
                            <span className="tabular">
                              联赛冠军 <b className="text-turf-300">×{c.leagueTitles}</b>
                            </span>
                            {c.uclTitles > 0 && (
                              <span className="tabular flex items-center gap-1">
                                <Trophy size={11} className="text-golden-400" />
                                欧冠 <b className="text-golden-300">×{c.uclTitles}</b>
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 底部 */}
            <div className="border-t border-white/8 px-6 py-3.5">
              <p className="text-[10px] tracking-wider text-slate-600">
                绿茵星图 · 国家名片 — 数据为演示用 Mock
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
