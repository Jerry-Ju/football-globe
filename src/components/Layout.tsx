import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="10.5" fill="#10172a" stroke="#10B981" strokeWidth="1.6" />
      <path
        d="M6 13.5 Q16 9 26 13.5 M6 18.5 Q16 23 26 18.5 M16 5.5 V26.5"
        stroke="#10B981"
        strokeWidth="0.9"
        fill="none"
        opacity="0.55"
      />
      <ellipse
        cx="16"
        cy="16"
        rx="15"
        ry="5.6"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="1.4"
        transform="rotate(-18 16 16)"
      />
      <circle cx="27.4" cy="10.4" r="1.8" fill="#F59E0B" />
    </svg>
  );
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "text-turf-300 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.35),0_0_18px_rgba(16,185,129,0.12)]"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
          scrolled
            ? "glass-deep border-b border-white/8 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
            : "border-b border-transparent bg-transparent py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => navigate("/")}
            className="group flex cursor-pointer items-center gap-3"
          >
            <span className="transition-transform duration-500 group-hover:rotate-[24deg]">
              <Logo />
            </span>
            <span className="text-left leading-none">
              <span className="block text-base font-black tracking-wide text-white">
                绿茵星图
              </span>
              <span className="mt-1 block font-display text-[8px] font-bold tracking-[0.34em] text-turf-400 uppercase">
                Football Globe
              </span>
            </span>
          </button>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <span className="mr-2 hidden items-center gap-1.5 rounded-full border border-golden-500/30 bg-golden-500/[0.07] px-2.5 py-1 md:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-golden-400" />
              <span className="font-display text-[9px] font-bold tracking-[0.24em] text-golden-300 uppercase">
                Live 星图
              </span>
            </span>
            <NavLink to="/" end className={linkCls}>
              星图
            </NavLink>
            <NavLink to="/rankings" className={linkCls}>
              排行榜
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="relative border-t border-white/8 bg-pitch-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:px-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Logo size={26} />
            <div className="leading-none">
              <p className="text-sm font-black text-white">绿茵星图</p>
              <p className="mt-1 font-display text-[8px] tracking-[0.3em] text-slate-500 uppercase">
                Football Globe · 3D Atlas
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <button onClick={() => navigate("/")} className="cursor-pointer transition-colors hover:text-turf-300">
              星图首页
            </button>
            <span className="h-3 w-px bg-white/10" />
            <button onClick={() => navigate("/rankings")} className="cursor-pointer transition-colors hover:text-turf-300">
              排行榜
            </button>
            <span className="h-3 w-px bg-white/10" />
            <span>react-globe.gl · recharts · framer-motion</span>
          </div>
        </div>
        <div className="border-t border-white/5 py-4 text-center text-[10px] tracking-wider text-slate-700">
          本站为演示作品，球星 / 俱乐部 / 荣誉数据均为 Mock，致敬真实足球史 · {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
