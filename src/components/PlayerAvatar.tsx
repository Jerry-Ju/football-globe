import { getCountry } from "../data/db";
import type { Player } from "../data/db";

/** 球星字母徽章头像 —— 以国籍配色生成 */
export default function PlayerAvatar({
  player,
  size = 48,
  showRating = true,
}: {
  player: Player;
  size?: number;
  showRating?: boolean;
}) {
  const country = getCountry(player.countryId);
  const [c1, c2] = country?.theme ?? ["#10B981", "#F59E0B"];
  const initials = player.name
    .split(" ")
    .map((w) => w[0])
    .filter((ch) => /[A-Za-z]/.test(ch))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative shrink-0 select-none" style={{ width: size, height: size }}>
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-white/10"
        style={{
          background: `linear-gradient(140deg, ${c1}40 0%, #10172a 52%, ${c2}36 100%)`,
          boxShadow: `inset 0 0 18px ${c1}22, 0 4px 16px rgba(0,0,0,0.4)`,
        }}
      >
        {/* 球衣号码水印 */}
        <span
          className="pointer-events-none absolute -bottom-[14%] -right-[6%] font-display font-black text-white/[0.07]"
          style={{ fontSize: size * 0.62, fontWeight: 900 }}
        >
          {player.number}
        </span>
        <span
          className="relative font-display tracking-wide text-slate-100"
          style={{ fontSize: size * 0.3, fontWeight: 700, textShadow: `0 0 12px ${c1}88` }}
        >
          {initials}
        </span>
      </div>
      {showRating && (
        <span
          className="tabular absolute -bottom-1.5 -right-1.5 rounded-md border border-turf-500/50 bg-pitch-950 px-1 py-px font-display text-[10px] font-bold text-turf-300"
          style={{ fontWeight: 700 }}
        >
          {player.rating}
        </span>
      )}
    </div>
  );
}
