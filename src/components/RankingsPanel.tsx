import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Flag from "./Flag";
import PlayerAvatar from "./PlayerAvatar";
import { PillTabs } from "./ui";
import {
  ballonDorRanking,
  goalsRanking,
  marketValueRanking,
  getClub,
  getCountry,
} from "../data/db";
import type { RankingItem } from "../data/db";

const MEDALS = ["#F59E0B", "#94A3B8", "#CD7F32"];

export const RANK_TABS = [
  { id: "ballon", label: "金球奖次数", fn: ballonDorRanking, unit: "座" },
  { id: "value", label: "现役身价", fn: marketValueRanking, unit: "M€" },
  { id: "goals", label: "历史射手", fn: goalsRanking, unit: "球" },
] as const;

function RankRow({ item, rank, delay }: { item: RankingItem; rank: number; delay: number }) {
  const navigate = useNavigate();
  const country = getCountry(item.player.countryId);
  const club = getClub(item.player.clubId);
  const medal = rank <= 3 ? MEDALS[rank - 1] : "#475569";

  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ x: 5 }}
      onClick={() => navigate(`/player/${item.player.id}`)}
      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5 text-left transition-colors duration-200 hover:border-turf-500/40 hover:bg-turf-500/[0.06]"
    >
      <span
        className="tabular w-9 shrink-0 text-center font-display text-lg text-slate-600"
        style={{
          fontWeight: 800,
          color: rank <= 3 ? medal : undefined,
          textShadow: rank === 1 ? "0 0 16px rgba(245,158,11,0.55)" : undefined,
        }}
      >
        {String(rank).padStart(2, "0")}
      </span>
      <PlayerAvatar player={item.player} size={42} showRating={false} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-bold text-white group-hover:text-turf-300">
            {item.player.nameZh}
          </p>
          {country && (
            <Flag id={country.id} className="h-3 w-[18px] rounded-[2px]" />
          )}
          <span className="hidden font-display text-[9px] tracking-[0.18em] text-slate-600 uppercase sm:inline">
            {item.player.name}
          </span>
        </div>
        <div className="mt-1.5 h-1 max-w-[220px] overflow-hidden rounded-full bg-white/6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(6, item.bar * 100)}%` }}
            transition={{ duration: 0.9, delay: delay + 0.15, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{
              background:
                rank <= 3
                  ? `linear-gradient(90deg, ${medal}, ${medal}66)`
                  : "linear-gradient(90deg, #10B981, #10B98155)",
            }}
          />
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p
          className="tabular font-display text-base"
          style={{ fontWeight: 800, color: rank <= 3 ? medal : "#6ee7b7" }}
        >
          {item.display}
        </p>
        <p className="mt-0.5 text-[10px] text-slate-500">{club?.nameZh}</p>
      </div>
    </motion.button>
  );
}

export default function RankingsPanel({
  limit = 5,
  initialTab = "ballon",
}: {
  limit?: number;
  initialTab?: string;
}) {
  const [tab, setTab] = useState(initialTab);
  const def = RANK_TABS.find((t) => t.id === tab) ?? RANK_TABS[0];
  const items = def.fn(limit);

  return (
    <div>
      <PillTabs
        id="rankings"
        items={RANK_TABS.map((t) => ({ id: t.id, label: t.label }))}
        active={tab}
        onChange={setTab}
      />
      <div className="mt-5 space-y-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            {items.map((it, i) => (
              <RankRow key={it.player.id} item={it} rank={i + 1} delay={i * 0.045} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-3 text-[11px] text-slate-600">
        榜单单位：{def.unit} · 数据为演示用 Mock，致敬真实足球史
      </p>
    </div>
  );
}
