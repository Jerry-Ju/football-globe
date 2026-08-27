/* 手绘 SVG 国旗（13 精选国 · 简化几何版）+ 百强国家自动主题徽章 */

import { COUNTRY_MAP } from "../data/db";

function flagArt(id: string) {
  switch (id) {
    case "brazil":
      return (
        <>
          <rect width="60" height="40" fill="#009C3B" />
          <polygon points="30,4 56,20 30,36 4,20" fill="#FFDF00" />
          <circle cx="30" cy="20" r="7.2" fill="#002776" />
          <path d="M23.2 18.2 Q30 22.5 36.8 17.2" stroke="#F5F5F5" strokeWidth="1.1" fill="none" />
        </>
      );
    case "argentina":
      return (
        <>
          <rect width="60" height="40" fill="#74ACDF" />
          <rect y="13.3" width="60" height="13.4" fill="#F7F7F7" />
          <circle cx="30" cy="20" r="4.6" fill="#F6B40E" />
          <circle cx="30" cy="20" r="2.1" fill="#E8A33D" />
        </>
      );
    case "france":
      return (
        <>
          <rect width="20" height="40" fill="#0055A4" />
          <rect x="20" width="20" height="40" fill="#F5F5F5" />
          <rect x="40" width="20" height="40" fill="#EF4135" />
        </>
      );
    case "germany":
      return (
        <>
          <rect width="60" height="13.4" fill="#1A1A1A" />
          <rect y="13.3" width="60" height="13.4" fill="#DD0000" />
          <rect y="26.6" width="60" height="13.4" fill="#FFCC00" />
        </>
      );
    case "spain":
      return (
        <>
          <rect width="60" height="40" fill="#AA151B" />
          <rect y="10" width="60" height="20" fill="#F1BF00" />
          <rect x="12" y="15.5" width="6.5" height="9" rx="2" fill="#AA151B" />
          <rect x="13.6" y="17" width="3.3" height="3" fill="#F1BF00" />
        </>
      );
    case "england":
      return (
        <>
          <rect width="60" height="40" fill="#F5F5F5" />
          <rect x="25.5" width="9" height="40" fill="#CE1124" />
          <rect y="15.5" width="60" height="9" fill="#CE1124" />
        </>
      );
    case "italy":
      return (
        <>
          <rect width="20" height="40" fill="#009246" />
          <rect x="20" width="20" height="40" fill="#F5F5F5" />
          <rect x="40" width="20" height="40" fill="#CE2B37" />
        </>
      );
    case "portugal":
      return (
        <>
          <rect width="24" height="40" fill="#046A38" />
          <rect x="24" width="36" height="40" fill="#DA291C" />
          <circle cx="24" cy="20" r="6" fill="#FFE900" />
          <circle cx="24" cy="20" r="3.4" fill="#DA291C" />
          <circle cx="24" cy="20" r="1.5" fill="#F5F5F5" />
        </>
      );
    case "netherlands":
      return (
        <>
          <rect width="60" height="13.4" fill="#AE1C28" />
          <rect y="13.3" width="60" height="13.4" fill="#F5F5F5" />
          <rect y="26.6" width="60" height="13.4" fill="#21468B" />
        </>
      );
    case "belgium":
      return (
        <>
          <rect width="20" height="40" fill="#1A1A1A" />
          <rect x="20" width="20" height="40" fill="#FDDA24" />
          <rect x="40" width="20" height="40" fill="#EF3340" />
        </>
      );
    case "croatia":
      return (
        <>
          <rect width="60" height="13.4" fill="#E4002B" />
          <rect y="13.3" width="60" height="13.4" fill="#F5F5F5" />
          <rect y="26.6" width="60" height="13.4" fill="#171796" />
          <g transform="translate(25,12)">
            <rect width="10" height="12" rx="1.5" fill="#F5F5F5" stroke="#E4002B" strokeWidth="0.8" />
            <rect x="1.4" y="1.4" width="2.4" height="2.4" fill="#E4002B" />
            <rect x="6.2" y="1.4" width="2.4" height="2.4" fill="#E4002B" />
            <rect x="3.8" y="4.4" width="2.4" height="2.4" fill="#E4002B" />
            <rect x="1.4" y="7.4" width="2.4" height="2.4" fill="#E4002B" />
            <rect x="6.2" y="7.4" width="2.4" height="2.4" fill="#E4002B" />
          </g>
        </>
      );
    case "uruguay":
      return (
        <>
          <rect width="60" height="40" fill="#F5F5F5" />
          {[0, 2, 4, 6].map((i) => (
            <rect key={i} y={(i * 40) / 8} width="60" height={40 / 8} fill="#0038A8" />
          ))}
          <rect width="24" height="20" fill="#F5F5F5" />
          <circle cx="12" cy="10" r="5.2" fill="#FCD116" />
          <circle cx="12" cy="10" r="2.4" fill="#E8A33D" />
        </>
      );
    case "norway":
      return (
        <>
          <rect width="60" height="40" fill="#00205B" />
          <rect x="14" width="14" height="40" fill="#F5F5F5" />
          <rect y="13" width="60" height="14" fill="#F5F5F5" />
          <rect x="17" width="8" height="40" fill="#BA0C2F" />
          <rect y="16" width="60" height="8" fill="#BA0C2F" />
        </>
      );
    default: {
      const c = COUNTRY_MAP[id];
      const [t1, t2] = c?.theme ?? ["#1a2438", "#334155"];
      return (
        <>
          <rect width="60" height="40" fill={t1} />
          <polygon points="60,0 60,40 0,40" fill={t2} />
          <polygon points="0,0 60,0 0,40" fill="#ffffff" opacity="0.08" />
          <rect x="12" y="11" width="36" height="18" rx="3.5" fill="rgba(7,11,19,0.55)" />
          <text
            x="30"
            y="24"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="800"
            fontFamily="'Orbitron', sans-serif"
            fill="#F8FAFC"
            letterSpacing="1"
          >
            {c?.code ?? "·"}
          </text>
        </>
      );
    }
  }
}

export default function Flag({
  id,
  className = "h-5 w-[30px]",
}: {
  id: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_10px_rgba(0,0,0,0.45)] ring-1 ring-white/20 ${className}`}
    >
      <svg viewBox="0 0 60 40" className="block h-full w-full" aria-hidden="true">
        {flagArt(id)}
      </svg>
    </span>
  );
}
