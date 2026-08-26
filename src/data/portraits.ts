import type { Player, Position } from "./db";

/** 按位置区分的剪影肖像（暗调 + 绿茵绿边缘光）—— 加载失败时兜底 */
export const PORTRAITS: Record<Position, string> = {
  FW: "https://image.qwenlm.ai/generated-images/deeb39e0-3975-42af-b7e9-629957faa0bc/_result.png",
  MF: "https://image.qwenlm.ai/generated-images/22aeb81d-9570-439e-9613-42dfee4f3c6d/_result.png",
  DF: "https://image.qwenlm.ai/generated-images/fbe865e1-9bef-4d31-8589-edfd38c560b7/_result.png",
  GK: "https://image.qwenlm.ai/generated-images/8b7ebd74-44e5-46e1-886e-b241d600e1f0/_result.png",
};

/**
 * 球星宣传照（真人实拍质感 · 无可识别面部）
 * 0 绛红 7 号张臂怒吼 · 1 天蓝白间条冲刺 · 2 金丝雀黄盘带
 * 3 皇家蓝重炮轰门 · 4 白色金边倒挂金钩 · 5 橙色滑铲
 */
export const PROMO_PHOTOS: string[] = [
  "https://image.qwenlm.ai/generated-images/5c3de6fd-8eae-452b-bb97-d08aff610d9b/_result.png",
  "https://image.qwenlm.ai/generated-images/d89a218e-3108-43c8-8479-fbd9ed50ce90/_result.png",
  "https://image.qwenlm.ai/generated-images/2a3b38bc-358a-4090-9e41-f2d8faee8da0/_result.png",
  "https://image.qwenlm.ai/generated-images/8af2166b-7999-4d38-8ccc-4fda3a155ad1/_result.png",
  "https://image.qwenlm.ai/generated-images/c85e5d52-6715-45e9-b07f-6cb247f95305/_result.png",
  "https://image.qwenlm.ai/generated-images/876d9301-26cb-4741-92c3-5c8deb71869c/_result.png",
];

/** 按国籍分配球衣体系一致的宣传照 */
const PROMO_BY_COUNTRY: Record<string, number> = {
  portugal: 0,
  spain: 0,
  belgium: 0,
  chile: 0,
  egypt: 0,
  argentina: 1,
  uruguay: 1,
  brazil: 2,
  colombia: 2,
  france: 3,
  italy: 3,
  germany: 4,
  england: 4,
  croatia: 4,
  netherlands: 5,
};

/** id 稳定散列 → 兜底宣传照下标 */
function hashIdx(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h % PROMO_PHOTOS.length;
}

export function getPromoPhoto(p: Player): string {
  const idx = PROMO_BY_COUNTRY[p.countryId] ?? hashIdx(p.id);
  return PROMO_PHOTOS[idx];
}
