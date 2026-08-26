import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import type { GlobeMethods } from "react-globe.gl";
import {
  COUNTRIES,
  countryAltitude,
  countryColor,
  countryRadius,
} from "../data/db";
import type { Country } from "../data/db";

const INITIAL_POV = { lat: 26, lng: 6, altitude: 2.4 };

type ControlsLike = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
  addEventListener: (event: string, cb: () => void) => void;
};

export default function GlobeSection({
  selected,
  onSelect,
}: {
  selected: Country | null;
  onSelect: (c: Country) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef<string | null>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [hoverId, setHoverId] = useState<string | null>(null);

  /* 尺寸自适应 */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* 自动旋转：交互时暂停，闲置 3.2s 后恢复 */
  useEffect(() => {
    const t = setTimeout(() => {
      globeRef.current?.pointOfView(INITIAL_POV);
      const controls = globeRef.current?.controls() as unknown as
        | ControlsLike
        | undefined;
      if (!controls) return;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.55;
      controls.minDistance = 150;
      controls.maxDistance = 640;
      controls.addEventListener("start", () => {
        controls.autoRotate = false;
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
      });
      controls.addEventListener("end", () => {
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
          if (!selectedRef.current) controls.autoRotate = true;
        }, 3200);
      });
    }, 700);
    return () => {
      clearTimeout(t);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  /* 加载遮罩淡出 */
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* 选中国家：镜头飞行 + 暂停自转 + 脉冲环；关闭后恢复自转 */
  useEffect(() => {
    selectedRef.current = selected?.id ?? null;
    const controls = globeRef.current?.controls() as unknown as
      | ControlsLike
      | undefined;
    if (selected) {
      if (controls) controls.autoRotate = false;
      globeRef.current?.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.7 },
        1100
      );
    } else if (controls) {
      controls.autoRotate = true;
    }
  }, [selected]);

  const pointLabel = (obj: object) => {
    const c = obj as Country;
    return `<div style="font-family:'Manrope','Noto Sans SC',sans-serif;padding:11px 14px;background:rgba(8,12,22,0.94);border:1px solid rgba(16,185,129,0.4);border-radius:10px;box-shadow:0 0 28px rgba(16,185,129,0.22);min-width:158px;">
      <div style="display:flex;align-items:baseline;gap:8px;">
        <span style="font-weight:800;font-size:14px;color:#fff;">${c.nameZh}</span>
        <span style="font-size:9px;letter-spacing:0.22em;color:#34d399;text-transform:uppercase;">${c.name}</span>
      </div>
      <div style="margin-top:6px;font-size:11px;color:#94a3b8;display:flex;gap:12px;">
        <span>FIFA <b style="color:#fcd34d;">#${c.fifaRank}</b></span>
        <span>世界杯 <b style="color:#fcd34d;">×${c.worldCups}</b></span>
        <span>球星 <b style="color:#6ee7b7;">${c.playerIds.length}</b></span>
      </div>
      <div style="margin-top:8px;font-size:10px;color:#34d399;letter-spacing:0.1em;">▸ 点击查看国家名片</div>
    </div>`;
  };

  return (
    <div ref={wrapRef} className="globe-canvas absolute inset-0">
      {dims.w > 0 && (
        <Globe
          ref={globeRef}
          width={dims.w}
          height={dims.h}
          backgroundColor="#0b0f19"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#10B981"
          atmosphereAltitude={0.22}
          pointsData={COUNTRIES}
          pointLat="lat"
          pointLng="lng"
          pointRadius={(obj: object) => {
            const c = obj as Country;
            const extra = hoverId === c.id ? 0.14 : 0;
            return countryRadius(c) + extra;
          }}
          pointAltitude={(obj: object) => countryAltitude(obj as Country)}
          pointsMerge={false}
          pointColor={(obj: object) => {
            const c = obj as Country;
            if (selected?.id === c.id) return "#fde68a";
            if (hoverId === c.id) return "#6ee7b7";
            return countryColor(c);
          }}
          pointLabel={pointLabel}
          onPointClick={(obj: object) => onSelect(obj as Country)}
          onPointHover={(obj: object | null) =>
            setHoverId(obj ? (obj as Country).id : null)
          }
          ringsData={selected ? [selected] : []}
          ringLat={(d: object) => (d as Country).lat}
          ringLng={(d: object) => (d as Country).lng}
          ringMaxRadius={5}
          ringPropagationSpeed={2.4}
          ringRepeatPeriod={1500}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ringColor={((obj: object) => {
            const c = obj as Country;
            const rgb = c.worldCups > 0 ? "245,158,11" : "16,185,129";
            return (t: number) => `rgba(${rgb},${Math.pow(1 - t, 1.7) * 0.9})`;
          }) as any}
        />
      )}

      {/* 边缘暗角，让球体融入页面 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,#0B0F19_97%)]" />

      {/* 加载遮罩 */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-pitch-900 transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border border-turf-500/25" />
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-turf-400" />
          <div className="absolute inset-3 rounded-full border border-golden-500/20" />
          <div
            className="absolute inset-3 animate-spin-slow rounded-full border-2 border-transparent border-b-golden-400"
            style={{ animationDirection: "reverse", animationDuration: "14s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-2.5 w-2.5 animate-pulse-dot rounded-full bg-turf-400 shadow-[0_0_18px_#10b981]" />
          </div>
        </div>
        <div className="text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.4em] text-turf-300">
            Football Globe
          </p>
          <p className="mt-2 text-sm text-slate-400">正在构建星球坐标系…</p>
        </div>
      </div>
    </div>
  );
}
