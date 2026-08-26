import type { Position } from "./db";

/** 按位置区分的剪影肖像（暗调 + 绿茵绿边缘光） */
export const PORTRAITS: Record<Position, string> = {
  FW: "https://image.qwenlm.ai/generated-images/deeb39e0-3975-42af-b7e9-629957faa0bc/_result.png",
  MF: "https://image.qwenlm.ai/generated-images/22aeb81d-9570-439e-9613-42dfee4f3c6d/_result.png",
  DF: "https://image.qwenlm.ai/generated-images/fbe865e1-9bef-4d31-8589-edfd38c560b7/_result.png",
  GK: "https://image.qwenlm.ai/generated-images/8b7ebd74-44e5-46e1-886e-b241d600e1f0/_result.png",
};
