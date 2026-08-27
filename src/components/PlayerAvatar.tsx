import { useState } from "react";
import { getCountry } from "../data/db";
import type { Player } from "../data/db";
import { getPromoPhoto } from "../data/portraits";

/** 球星头像 —— 真人宣传照底图，加载失败时回退字母徽章 */
export default function PlayerAvatar({
  player,
  size = 48,
  showRating = true,
}: {
  player: Player;
  size?: number;
  showRating?: boolean;
}) {
  const [failed, setFailed] = useState(false);
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
    <div
      className="relative shrink-0 overflow-hidden rounded-xl border border-white/10 select-none"
      style={{
        width: size,
        height: size,
        boxShadow: `inset 0 0 18px ${c1}22, 0 4px 16px rgba(0,0,0,0.4)`,
      }}
    >
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background: `linear-gradient(140deg, ${c1}40 0%, #10172a 52%, ${c2}36 100%)`,
          }}
        >
          <span
            className="font-display tracking-wide text-slate-100"
            style={{ fontSize: size * 0.3, fontWeight: 700, textShadow: `0 0 12px ${c1}88` }}
          >
            {initials}
          </span>
        </div>
      ) : (
        <>
          <img
            src={getPromoPhoto(player)}
            alt={player.nameZh}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/65 via-transparent to-transparent" />
        </>
      )}

      {/* 球衣号码水印 */}
      <span
        className="pointer-events-none absolute -right-[6%] -bottom-[14%] font-display font-black text-white/[0.12]"
        style={{ fontSize: size * 0.62 }}
      >
        {player.number}
      </span>

      {showRating && (
        <span
          className="tabular absolute -right-1.5 -bottom-1.5 rounded-md border border-turf-500/50 bg-pitch-950 px-1 py-px font-display text-[10px] font-bold text-turf-300"
        >
          {player.rating}
        </span>
      )}
    </div>
  );
}
