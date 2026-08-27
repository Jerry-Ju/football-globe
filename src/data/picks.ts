import { COUNTRIES, isFeatured } from "./db";
import type { Country } from "./db";

/** 精选强国（收录了球星档案的国家） */
export const FEATURED_COUNTRIES_ALL: Country[] = COUNTRIES.filter(isFeatured);

/** 空态 / 快捷入口使用的六强 */
export const FEATURED_PICKS: Country[] = [
  "argentina",
  "brazil",
  "france",
  "germany",
  "england",
  "portugal",
]
  .map((id) => COUNTRIES.find((c) => c.id === id))
  .filter((c): c is Country => Boolean(c && isFeatured(c)));
