/* ============================================================
 * 绿茵星图 · Football Globe — 数据模型 & Mock 数据
 * ============================================================ */

import { EXTRA_COUNTRIES, FIFA_RANK_OF } from "./fifa100";

export type Position = "FW" | "MF" | "DF" | "GK";
export type Era = "现役" | "传奇";
export type Confederation =
  | "UEFA"
  | "CONMEBOL"
  | "CONCACAF"
  | "CAF"
  | "AFC"
  | "OFC";

export interface Club {
  id: string;
  name: string;      // 英文名
  nameZh: string;    // 中文名
  city: string;
  countryId: string;
  league: string;
  founded: number;
  leagueTitles: number;
  uclTitles: number;
  colors: [string, string];
}

export interface AbilityScores {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface CareerStint {
  clubId: string;
  years: string;
  apps: number;
  goals: number;
}

export interface Honor {
  year: string;
  title: string;
  golden?: boolean; // 是否金球/世界杯级别荣誉（金色高亮）
}

export interface Player {
  id: string;
  name: string;       // 英文名
  nameZh: string;     // 中文名
  countryId: string;
  position: Position;
  posZh: string;
  number: number;     // 标志性号码
  birthYear: number;
  era: Era;
  clubId: string;     // 当前/最后效力俱乐部
  rating: number;     // 综合评分 0-99
  marketValue: number | null; // 身价（百万欧元），传奇为 null
  ballonDor: number;  // 金球奖次数
  goals: number;      // 生涯正式比赛进球
  assists: number;
  apps: number;
  abilities: AbilityScores;
  career: CareerStint[];
  honors: Honor[];
  quote: string;
}

export interface Country {
  id: string;
  name: string;
  nameZh: string;
  code?: string; // FIFA 三字母代码（扩展国家用于旗帜徽章）
  lat: number;
  lng: number;
  fifaRank: number;
  confed: Confederation;
  worldCups: number;
  continentals: number;
  continentalLabel: string;
  tagline: string;
  theme: [string, string];
  playerIds: string[];
  clubIds: string[];
}

/* ---------------- 能力维度定义 ---------------- */

export const ABILITY_META: { key: keyof AbilityScores; label: string }[] = [
  { key: "pace", label: "速度" },
  { key: "shooting", label: "射门" },
  { key: "passing", label: "传球" },
  { key: "dribbling", label: "盘带" },
  { key: "defending", label: "防守" },
  { key: "physical", label: "体能" },
];

export const POSITION_ZH: Record<Position, string> = {
  FW: "前锋",
  MF: "中场",
  DF: "后卫",
  GK: "门将",
};

/* ============================================================
 * 俱乐部（25 家）
 * ============================================================ */

export const CLUBS: Club[] = [
  { id: "real-madrid", name: "Real Madrid", nameZh: "皇家马德里", city: "马德里", countryId: "spain", league: "西甲", founded: 1902, leagueTitles: 36, uclTitles: 15, colors: ["#F8FAFC", "#F59E0B"] },
  { id: "barcelona", name: "FC Barcelona", nameZh: "巴塞罗那", city: "巴塞罗那", countryId: "spain", league: "西甲", founded: 1899, leagueTitles: 27, uclTitles: 5, colors: ["#A50044", "#004D98"] },
  { id: "atletico", name: "Atlético Madrid", nameZh: "马德里竞技", city: "马德里", countryId: "spain", league: "西甲", founded: 1903, leagueTitles: 11, uclTitles: 0, colors: ["#CB3524", "#262E62"] },
  { id: "man-city", name: "Manchester City", nameZh: "曼城", city: "曼彻斯特", countryId: "england", league: "英超", founded: 1880, leagueTitles: 10, uclTitles: 1, colors: ["#6CABDD", "#1C2C5B"] },
  { id: "man-utd", name: "Manchester United", nameZh: "曼联", city: "曼彻斯特", countryId: "england", league: "英超", founded: 1878, leagueTitles: 20, uclTitles: 3, colors: ["#DA291C", "#FBE122"] },
  { id: "liverpool", name: "Liverpool", nameZh: "利物浦", city: "利物浦", countryId: "england", league: "英超", founded: 1892, leagueTitles: 19, uclTitles: 6, colors: ["#C8102E", "#00B2A9"] },
  { id: "arsenal", name: "Arsenal", nameZh: "阿森纳", city: "伦敦", countryId: "england", league: "英超", founded: 1886, leagueTitles: 13, uclTitles: 0, colors: ["#EF0107", "#9C824A"] },
  { id: "chelsea", name: "Chelsea", nameZh: "切尔西", city: "伦敦", countryId: "england", league: "英超", founded: 1905, leagueTitles: 6, uclTitles: 2, colors: ["#034694", "#DBA111"] },
  { id: "tottenham", name: "Tottenham Hotspur", nameZh: "托特纳姆热刺", city: "伦敦", countryId: "england", league: "英超", founded: 1882, leagueTitles: 2, uclTitles: 0, colors: ["#132257", "#FFFFFF"] },
  { id: "bayern", name: "Bayern Munich", nameZh: "拜仁慕尼黑", city: "慕尼黑", countryId: "germany", league: "德甲", founded: 1900, leagueTitles: 33, uclTitles: 6, colors: ["#DC052D", "#0066B2"] },
  { id: "dortmund", name: "Borussia Dortmund", nameZh: "多特蒙德", city: "多特蒙德", countryId: "germany", league: "德甲", founded: 1909, leagueTitles: 8, uclTitles: 1, colors: ["#FDE100", "#1A1A1A"] },
  { id: "psg", name: "Paris Saint-Germain", nameZh: "巴黎圣日耳曼", city: "巴黎", countryId: "france", league: "法甲", founded: 1970, leagueTitles: 12, uclTitles: 0, colors: ["#004170", "#DA291C"] },
  { id: "monaco", name: "AS Monaco", nameZh: "摩纳哥", city: "摩纳哥", countryId: "france", league: "法甲", founded: 1924, leagueTitles: 8, uclTitles: 0, colors: ["#CE1126", "#F5F5F5"] },
  { id: "juventus", name: "Juventus", nameZh: "尤文图斯", city: "都灵", countryId: "italy", league: "意甲", founded: 1897, leagueTitles: 36, uclTitles: 2, colors: ["#151515", "#F5F5F5"] },
  { id: "inter", name: "Inter Milan", nameZh: "国际米兰", city: "米兰", countryId: "italy", league: "意甲", founded: 1908, leagueTitles: 20, uclTitles: 3, colors: ["#0068A8", "#221F20"] },
  { id: "ac-milan", name: "AC Milan", nameZh: "AC米兰", city: "米兰", countryId: "italy", league: "意甲", founded: 1899, leagueTitles: 19, uclTitles: 7, colors: ["#FB090B", "#16181D"] },
  { id: "napoli", name: "Napoli", nameZh: "那不勒斯", city: "那不勒斯", countryId: "italy", league: "意甲", founded: 1926, leagueTitles: 3, uclTitles: 0, colors: ["#12A0D7", "#003C82"] },
  { id: "ajax", name: "Ajax", nameZh: "阿贾克斯", city: "阿姆斯特丹", countryId: "netherlands", league: "荷甲", founded: 1900, leagueTitles: 36, uclTitles: 4, colors: ["#D2122E", "#F5F5F5"] },
  { id: "benfica", name: "Benfica", nameZh: "本菲卡", city: "里斯本", countryId: "portugal", league: "葡超", founded: 1904, leagueTitles: 38, uclTitles: 2, colors: ["#E83030", "#F5F5F5"] },
  { id: "porto", name: "FC Porto", nameZh: "波尔图", city: "波尔图", countryId: "portugal", league: "葡超", founded: 1893, leagueTitles: 30, uclTitles: 2, colors: ["#00428C", "#F5F5F5"] },
  { id: "santos", name: "Santos FC", nameZh: "桑托斯", city: "桑托斯", countryId: "brazil", league: "巴甲", founded: 1912, leagueTitles: 8, uclTitles: 0, colors: ["#111111", "#F5F5F5"] },
  { id: "boca", name: "Boca Juniors", nameZh: "博卡青年", city: "布宜诺斯艾利斯", countryId: "argentina", league: "阿甲", founded: 1905, leagueTitles: 35, uclTitles: 0, colors: ["#003DA5", "#F7D117"] },
  { id: "al-nassr", name: "Al Nassr", nameZh: "利雅得胜利", city: "利雅得", countryId: "portugal", league: "沙超", founded: 1955, leagueTitles: 9, uclTitles: 0, colors: ["#FFD200", "#0033A0"] },
  { id: "inter-miami", name: "Inter Miami", nameZh: "迈阿密国际", city: "迈阿密", countryId: "argentina", league: "美职联", founded: 2018, leagueTitles: 0, uclTitles: 0, colors: ["#F7B5CD", "#231F20"] },
  { id: "cosmos", name: "New York Cosmos", nameZh: "纽约宇宙", city: "纽约", countryId: "brazil", league: "北美联赛", founded: 1970, leagueTitles: 5, uclTitles: 0, colors: ["#0B5E2F", "#F5F5F5"] },
];

/* ============================================================
 * 球星（31 位 · 现役 + 传奇）
 * ============================================================ */

export const PLAYERS: Player[] = [
  {
    id: "messi", name: "Lionel Messi", nameZh: "利昂内尔·梅西", countryId: "argentina",
    position: "FW", posZh: "右边锋 / 前腰", number: 10, birthYear: 1987, era: "现役",
    clubId: "inter-miami", rating: 94, marketValue: 45, ballonDor: 8,
    goals: 850, assists: 383, apps: 1090,
    abilities: { pace: 80, shooting: 92, passing: 91, dribbling: 95, defending: 34, physical: 65 },
    career: [
      { clubId: "barcelona", years: "2004–2021", apps: 778, goals: 672 },
      { clubId: "psg", years: "2021–2023", apps: 75, goals: 32 },
      { clubId: "inter-miami", years: "2023–至今", apps: 70, goals: 62 },
    ],
    honors: [
      { year: "2022", title: "FIFA 世界杯冠军 · 卡塔尔", golden: true },
      { year: "2023", title: "第 8 座金球奖", golden: true },
      { year: "2021", title: "美洲杯冠军 · 巴西", golden: true },
      { year: "2015", title: "欧冠冠军（第 4 座）" },
      { year: "2009", title: "六冠王赛季 · 巴萨" },
    ],
    quote: "我花了 17 年零 113 天，才走完从天才到球王的路。",
  },
  {
    id: "c-ronaldo", name: "Cristiano Ronaldo", nameZh: "克里斯蒂亚诺·罗纳尔多", countryId: "portugal",
    position: "FW", posZh: "中锋 / 左边锋", number: 7, birthYear: 1985, era: "现役",
    clubId: "al-nassr", rating: 92, marketValue: 20, ballonDor: 5,
    goals: 925, assists: 256, apps: 1260,
    abilities: { pace: 84, shooting: 93, passing: 82, dribbling: 87, defending: 35, physical: 77 },
    career: [
      { clubId: "man-utd", years: "2003–2009", apps: 292, goals: 118 },
      { clubId: "real-madrid", years: "2009–2018", apps: 438, goals: 450 },
      { clubId: "juventus", years: "2018–2021", apps: 134, goals: 101 },
      { clubId: "al-nassr", years: "2023–至今", apps: 105, goals: 95 },
    ],
    honors: [
      { year: "2016", title: "欧洲杯冠军 · 法国", golden: true },
      { year: "2017", title: "第 5 座金球奖", golden: true },
      { year: "2018", title: "欧冠三连冠 · 皇马", golden: true },
      { year: "2008", title: "首座欧冠 + 金球奖" },
      { year: "2024", title: "国家队出场历史第一" },
    ],
    quote: "天赋让你起步，自律让你成为传奇。",
  },
  {
    id: "mbappe", name: "Kylian Mbappé", nameZh: "基利安·姆巴佩", countryId: "france",
    position: "FW", posZh: "左边锋 / 中锋", number: 10, birthYear: 1998, era: "现役",
    clubId: "real-madrid", rating: 91, marketValue: 180, ballonDor: 0,
    goals: 362, assists: 152, apps: 520,
    abilities: { pace: 97, shooting: 90, passing: 80, dribbling: 92, defending: 36, physical: 72 },
    career: [
      { clubId: "monaco", years: "2015–2017", apps: 60, goals: 27 },
      { clubId: "psg", years: "2017–2024", apps: 308, goals: 256 },
      { clubId: "real-madrid", years: "2024–至今", apps: 78, goals: 65 },
    ],
    honors: [
      { year: "2018", title: "FIFA 世界杯冠军 · 俄罗斯", golden: true },
      { year: "2022", title: "世界杯决赛帽子戏法" },
      { year: "2021", title: "欧国联冠军" },
      { year: "2025", title: "皇马首赛季 40+ 球" },
    ],
    quote: "速度是我的语言，进球是我的回答。",
  },
  {
    id: "haaland", name: "Erling Haaland", nameZh: "埃尔林·哈兰德", countryId: "norway",
    position: "FW", posZh: "中锋", number: 9, birthYear: 2000, era: "现役",
    clubId: "man-city", rating: 91, marketValue: 180, ballonDor: 0,
    goals: 303, assists: 62, apps: 385,
    abilities: { pace: 89, shooting: 93, passing: 65, dribbling: 80, defending: 45, physical: 88 },
    career: [
      { clubId: "dortmund", years: "2020–2022", apps: 89, goals: 86 },
      { clubId: "man-city", years: "2022–至今", apps: 160, goals: 150 },
    ],
    honors: [
      { year: "2023", title: "欧冠冠军 + 三冠王 · 曼城", golden: true },
      { year: "2023", title: "英超单赛季 36 球纪录", golden: true },
      { year: "2024", title: "连续两季欧洲金靴竞争者" },
    ],
    quote: "他们叫我机器人，但机器人也会做梦。",
  },
  {
    id: "bellingham", name: "Jude Bellingham", nameZh: "裘德·贝林厄姆", countryId: "england",
    position: "MF", posZh: "攻击型中场", number: 5, birthYear: 2003, era: "现役",
    clubId: "real-madrid", rating: 90, marketValue: 180, ballonDor: 0,
    goals: 92, assists: 61, apps: 320,
    abilities: { pace: 80, shooting: 82, passing: 85, dribbling: 88, defending: 60, physical: 82 },
    career: [
      { clubId: "dortmund", years: "2020–2023", apps: 132, goals: 24 },
      { clubId: "real-madrid", years: "2023–至今", apps: 100, goals: 38 },
    ],
    honors: [
      { year: "2024", title: "欧冠冠军 · 皇马", golden: true },
      { year: "2024", title: "西甲冠军 + 赛季最佳" },
      { year: "2023", title: "科帕奖 · 欧洲金童" },
    ],
    quote: "张开双臂，伯纳乌就是我的世界。",
  },
  {
    id: "vinicius", name: "Vinícius Júnior", nameZh: "维尼修斯·儒尼奥尔", countryId: "brazil",
    position: "FW", posZh: "左边锋", number: 7, birthYear: 2000, era: "现役",
    clubId: "real-madrid", rating: 90, marketValue: 170, ballonDor: 0,
    goals: 132, assists: 91, apps: 420,
    abilities: { pace: 95, shooting: 84, passing: 80, dribbling: 93, defending: 30, physical: 68 },
    career: [
      { clubId: "real-madrid", years: "2018–至今", apps: 320, goals: 110 },
    ],
    honors: [
      { year: "2024", title: "欧冠冠军 · 决赛破门", golden: true },
      { year: "2022", title: "欧冠冠军 · 制胜球" },
      { year: "2024", title: "FIFA 年度最佳球员" },
    ],
    quote: "桑巴永不熄灭，舞蹈即是反击。",
  },
  {
    id: "neymar", name: "Neymar Jr.", nameZh: "内马尔·儒尼奥尔", countryId: "brazil",
    position: "FW", posZh: "左边锋 / 前腰", number: 10, birthYear: 1992, era: "现役",
    clubId: "santos", rating: 88, marketValue: 55, ballonDor: 0,
    goals: 452, assists: 271, apps: 720,
    abilities: { pace: 88, shooting: 83, passing: 86, dribbling: 94, defending: 32, physical: 60 },
    career: [
      { clubId: "santos", years: "2009–2013", apps: 225, goals: 136 },
      { clubId: "barcelona", years: "2013–2017", apps: 186, goals: 105 },
      { clubId: "psg", years: "2017–2023", apps: 173, goals: 118 },
    ],
    honors: [
      { year: "2015", title: "欧冠冠军 · MSN 三叉戟", golden: true },
      { year: "2016", title: "奥运金牌 · 里约", golden: true },
      { year: "2013", title: "联合会杯冠军 + 金球" },
    ],
    quote: "快乐足球，是我给世界的礼物。",
  },
  {
    id: "pele", name: "Pelé", nameZh: "贝利", countryId: "brazil",
    position: "FW", posZh: "影锋 / 前腰", number: 10, birthYear: 1940, era: "传奇",
    clubId: "cosmos", rating: 95, marketValue: null, ballonDor: 0,
    goals: 765, assists: 305, apps: 831,
    abilities: { pace: 93, shooting: 94, passing: 85, dribbling: 92, defending: 40, physical: 85 },
    career: [
      { clubId: "santos", years: "1956–1974", apps: 659, goals: 643 },
      { clubId: "cosmos", years: "1975–1977", apps: 64, goals: 37 },
    ],
    honors: [
      { year: "1958", title: "世界杯冠军 · 17 岁震惊世界", golden: true },
      { year: "1962", title: "世界杯冠军 · 智利" },
      { year: "1970", title: "世界杯冠军 · 史上最强球队", golden: true },
      { year: "1999", title: "FIFA 世纪最佳球员" },
    ],
    quote: "我生来就为足球，就像贝多芬生来就为音乐。",
  },
  {
    id: "ronaldo-nazario", name: "Ronaldo Nazário", nameZh: "罗纳尔多·纳扎里奥", countryId: "brazil",
    position: "FW", posZh: "中锋", number: 9, birthYear: 1976, era: "传奇",
    clubId: "inter", rating: 94, marketValue: null, ballonDor: 2,
    goals: 414, assists: 121, apps: 616,
    abilities: { pace: 93, shooting: 93, passing: 72, dribbling: 93, defending: 30, physical: 78 },
    career: [
      { clubId: "barcelona", years: "1996–1997", apps: 49, goals: 47 },
      { clubId: "inter", years: "1997–2002", apps: 99, goals: 59 },
      { clubId: "real-madrid", years: "2002–2007", apps: 177, goals: 104 },
      { clubId: "ac-milan", years: "2007–2008", apps: 20, goals: 9 },
    ],
    honors: [
      { year: "2002", title: "世界杯冠军 + 金靴 · 王者归来", golden: true },
      { year: "2002", title: "金球奖（第 2 座）", golden: true },
      { year: "1997", title: "金球奖 · 史上最年轻得主" },
      { year: "1994", title: "世界杯冠军 · 美国" },
    ],
    quote: "伤病想埋葬我，但它是把梯子。",
  },
  {
    id: "ronaldinho", name: "Ronaldinho", nameZh: "罗纳尔迪尼奥", countryId: "brazil",
    position: "MF", posZh: "前腰 / 边锋", number: 10, birthYear: 1980, era: "传奇",
    clubId: "ac-milan", rating: 92, marketValue: null, ballonDor: 1,
    goals: 282, assists: 166, apps: 720,
    abilities: { pace: 84, shooting: 82, passing: 89, dribbling: 96, defending: 28, physical: 70 },
    career: [
      { clubId: "psg", years: "2001–2003", apps: 77, goals: 25 },
      { clubId: "barcelona", years: "2003–2008", apps: 207, goals: 94 },
      { clubId: "ac-milan", years: "2008–2011", apps: 95, goals: 26 },
    ],
    honors: [
      { year: "2006", title: "欧冠冠军 · 巴萨", golden: true },
      { year: "2005", title: "金球奖 + 世界足球先生", golden: true },
      { year: "2002", title: "世界杯冠军 · 3R 组合" },
    ],
    quote: "我踢球，是为了让看台忘记呼吸。",
  },
  {
    id: "zidane", name: "Zinédine Zidane", nameZh: "齐内丁·齐达内", countryId: "france",
    position: "MF", posZh: "前腰", number: 10, birthYear: 1972, era: "传奇",
    clubId: "real-madrid", rating: 94, marketValue: null, ballonDor: 1,
    goals: 159, assists: 149, apps: 789,
    abilities: { pace: 72, shooting: 82, passing: 90, dribbling: 93, defending: 50, physical: 76 },
    career: [
      { clubId: "juventus", years: "1996–2001", apps: 212, goals: 31 },
      { clubId: "real-madrid", years: "2001–2006", apps: 227, goals: 49 },
    ],
    honors: [
      { year: "1998", title: "世界杯冠军 · 决赛梅开二度", golden: true },
      { year: "2000", title: "欧洲杯冠军" },
      { year: "2002", title: "欧冠冠军 · 天外飞仙", golden: true },
      { year: "1998", title: "金球奖", golden: true },
    ],
    quote: "优雅，是把复杂做到举重若轻。",
  },
  {
    id: "henry", name: "Thierry Henry", nameZh: "蒂埃里·亨利", countryId: "france",
    position: "FW", posZh: "中锋 / 左边锋", number: 14, birthYear: 1977, era: "传奇",
    clubId: "arsenal", rating: 90, marketValue: null, ballonDor: 0,
    goals: 411, assists: 175, apps: 900,
    abilities: { pace: 92, shooting: 88, passing: 75, dribbling: 90, defending: 35, physical: 75 },
    career: [
      { clubId: "monaco", years: "1994–1999", apps: 141, goals: 28 },
      { clubId: "arsenal", years: "1999–2007", apps: 377, goals: 228 },
      { clubId: "barcelona", years: "2007–2010", apps: 121, goals: 49 },
    ],
    honors: [
      { year: "1998", title: "世界杯冠军 · 法国" },
      { year: "2004", title: "不败赛季 · 枪手传奇", golden: true },
      { year: "2009", title: "欧冠冠军 · 巴萨" },
    ],
    quote: "海布里滑跪的那一刻，时间为我停表。",
  },
  {
    id: "griezmann", name: "Antoine Griezmann", nameZh: "安托万·格列兹曼", countryId: "france",
    position: "FW", posZh: "影锋 / 前腰", number: 7, birthYear: 1991, era: "现役",
    clubId: "atletico", rating: 88, marketValue: 30, ballonDor: 0,
    goals: 352, assists: 151, apps: 805,
    abilities: { pace: 82, shooting: 85, passing: 85, dribbling: 87, defending: 52, physical: 68 },
    career: [
      { clubId: "atletico", years: "2014–2019", apps: 257, goals: 133 },
      { clubId: "barcelona", years: "2019–2021", apps: 102, goals: 35 },
      { clubId: "atletico", years: "2021–至今", apps: 190, goals: 88 },
    ],
    honors: [
      { year: "2018", title: "世界杯冠军 · 俄罗斯", golden: true },
      { year: "2021", title: "欧国联冠军" },
      { year: "2018", title: "世界杯铜球奖" },
    ],
    quote: "小个子也可以统治大场面。",
  },
  {
    id: "beckenbauer", name: "Franz Beckenbauer", nameZh: "弗朗茨·贝肯鲍尔", countryId: "germany",
    position: "DF", posZh: "自由人 / 清道夫", number: 5, birthYear: 1945, era: "传奇",
    clubId: "bayern", rating: 94, marketValue: null, ballonDor: 2,
    goals: 103, assists: 92, apps: 778,
    abilities: { pace: 70, shooting: 60, passing: 82, dribbling: 80, defending: 88, physical: 80 },
    career: [
      { clubId: "bayern", years: "1964–1977", apps: 539, goals: 74 },
      { clubId: "cosmos", years: "1977–1980", apps: 105, goals: 19 },
    ],
    honors: [
      { year: "1974", title: "世界杯冠军 · 本土夺冠", golden: true },
      { year: "1976", title: "金球奖（第 2 座）", golden: true },
      { year: "1974", title: "欧冠三连冠 · 拜仁" },
      { year: "1972", title: "欧洲杯冠军" },
    ],
    quote: "足球皇帝，从后场开始加冕。",
  },
  {
    id: "gerd-muller", name: "Gerd Müller", nameZh: "盖德·穆勒", countryId: "germany",
    position: "FW", posZh: "中锋", number: 9, birthYear: 1945, era: "传奇",
    clubId: "bayern", rating: 93, marketValue: null, ballonDor: 1,
    goals: 634, assists: 102, apps: 607,
    abilities: { pace: 76, shooting: 95, passing: 60, dribbling: 78, defending: 35, physical: 82 },
    career: [
      { clubId: "bayern", years: "1964–1979", apps: 566, goals: 525 },
    ],
    honors: [
      { year: "1974", title: "世界杯冠军 · 决赛制胜球", golden: true },
      { year: "1972", title: "欧洲杯冠军 + 金靴" },
      { year: "1970", title: "金球奖", golden: true },
      { year: "1972", title: "单赛季 40 球德甲纪录（保持 49 年）" },
    ],
    quote: "轰炸机不解释，只用进球说话。",
  },
  {
    id: "musiala", name: "Jamal Musiala", nameZh: "贾马尔·穆西亚拉", countryId: "germany",
    position: "MF", posZh: "攻击型中场", number: 42, birthYear: 2003, era: "现役",
    clubId: "bayern", rating: 89, marketValue: 140, ballonDor: 0,
    goals: 85, assists: 55, apps: 300,
    abilities: { pace: 88, shooting: 78, passing: 82, dribbling: 93, defending: 55, physical: 70 },
    career: [
      { clubId: "bayern", years: "2020–至今", apps: 220, goals: 62 },
    ],
    honors: [
      { year: "2023", title: "德甲四连冠核心" },
      { year: "2024", title: "欧洲杯银靴 + 最佳阵容" },
      { year: "2021", title: "德国最年轻国脚纪录" },
    ],
    quote: "在狭小空间里，我看得见别人看不见的门。",
  },
  {
    id: "xavi", name: "Xavi Hernández", nameZh: "哈维·埃尔南德斯", countryId: "spain",
    position: "MF", posZh: "中前卫 / 组织核心", number: 6, birthYear: 1980, era: "传奇",
    clubId: "barcelona", rating: 90, marketValue: null, ballonDor: 0,
    goals: 100, assists: 221, apps: 1006,
    abilities: { pace: 60, shooting: 68, passing: 95, dribbling: 85, defending: 60, physical: 65 },
    career: [
      { clubId: "barcelona", years: "1998–2015", apps: 767, goals: 85 },
    ],
    honors: [
      { year: "2010", title: "世界杯冠军 · 西班牙", golden: true },
      { year: "2012", title: "欧洲杯冠军（卫冕）" },
      { year: "2011", title: "欧冠冠军 · 梦三王朝", golden: true },
      { year: "2009", title: "六冠王赛季" },
    ],
    quote: "足球，是时间与空间的诗歌。",
  },
  {
    id: "iniesta", name: "Andrés Iniesta", nameZh: "安德烈斯·伊涅斯塔", countryId: "spain",
    position: "MF", posZh: "中前卫 / 前腰", number: 8, birthYear: 1984, era: "传奇",
    clubId: "barcelona", rating: 90, marketValue: null, ballonDor: 0,
    goals: 105, assists: 203, apps: 935,
    abilities: { pace: 65, shooting: 70, passing: 90, dribbling: 92, defending: 58, physical: 62 },
    career: [
      { clubId: "barcelona", years: "2002–2018", apps: 674, goals: 57 },
    ],
    honors: [
      { year: "2010", title: "世界杯决赛制胜球 · 约翰内斯堡", golden: true },
      { year: "2012", title: "欧洲杯决赛 MVP" },
      { year: "2015", title: "欧冠冠军 · MSN 时代" },
      { year: "2009", title: "斯坦福桥奇迹绝杀" },
    ],
    quote: "那一脚之前，整个西班牙都在屏息。",
  },
  {
    id: "rodri", name: "Rodri", nameZh: "罗德里", countryId: "spain",
    position: "MF", posZh: "防守型中场", number: 16, birthYear: 1996, era: "现役",
    clubId: "man-city", rating: 91, marketValue: 130, ballonDor: 1,
    goals: 51, assists: 41, apps: 455,
    abilities: { pace: 62, shooting: 72, passing: 88, dribbling: 82, defending: 82, physical: 84 },
    career: [
      { clubId: "atletico", years: "2018–2019", apps: 47, goals: 3 },
      { clubId: "man-city", years: "2019–至今", apps: 300, goals: 30 },
    ],
    honors: [
      { year: "2024", title: "金球奖 · 后腰的加冕", golden: true },
      { year: "2024", title: "欧洲杯冠军 + 赛事最佳" },
      { year: "2023", title: "欧冠冠军 · 三冠王", golden: true },
    ],
    quote: "最好的中场，是让比赛按自己的心跳进行。",
  },
  {
    id: "kane", name: "Harry Kane", nameZh: "哈里·凯恩", countryId: "england",
    position: "FW", posZh: "中锋", number: 9, birthYear: 1993, era: "现役",
    clubId: "bayern", rating: 90, marketValue: 110, ballonDor: 0,
    goals: 472, assists: 112, apps: 725,
    abilities: { pace: 74, shooting: 93, passing: 83, dribbling: 80, defending: 45, physical: 82 },
    career: [
      { clubId: "tottenham", years: "2011–2023", apps: 435, goals: 280 },
      { clubId: "bayern", years: "2023–至今", apps: 105, goals: 95 },
    ],
    honors: [
      { year: "2025", title: "德甲冠军 · 生涯首座顶级联赛奖杯", golden: true },
      { year: "2024", title: "欧洲金靴奖" },
      { year: "2018", title: "世界杯金靴 · 俄罗斯" },
    ],
    quote: "等待越久，举杯那刻越亮。",
  },
  {
    id: "beckham", name: "David Beckham", nameZh: "大卫·贝克汉姆", countryId: "england",
    position: "MF", posZh: "右边前卫", number: 7, birthYear: 1975, era: "传奇",
    clubId: "man-utd", rating: 86, marketValue: null, ballonDor: 0,
    goals: 129, assists: 212, apps: 850,
    abilities: { pace: 72, shooting: 76, passing: 90, dribbling: 84, defending: 55, physical: 70 },
    career: [
      { clubId: "man-utd", years: "1993–2003", apps: 394, goals: 85 },
      { clubId: "real-madrid", years: "2003–2007", apps: 159, goals: 20 },
      { clubId: "ac-milan", years: "2009–2010", apps: 33, goals: 2 },
    ],
    honors: [
      { year: "1999", title: "欧冠冠军 · 诺坎普奇迹之夜", golden: true },
      { year: "1999", title: "三冠王 · 曼联" },
      { year: "2003", title: "银河战舰一期核心" },
    ],
    quote: "40 码外，我也能精确制导。",
  },
  {
    id: "maldini", name: "Paolo Maldini", nameZh: "保罗·马尔蒂尼", countryId: "italy",
    position: "DF", posZh: "左后卫 / 中后卫", number: 3, birthYear: 1968, era: "传奇",
    clubId: "ac-milan", rating: 92, marketValue: null, ballonDor: 0,
    goals: 40, assists: 36, apps: 902,
    abilities: { pace: 75, shooting: 50, passing: 68, dribbling: 72, defending: 93, physical: 82 },
    career: [
      { clubId: "ac-milan", years: "1985–2009", apps: 902, goals: 40 },
    ],
    honors: [
      { year: "2007", title: "欧冠冠军 · 第 5 座", golden: true },
      { year: "2004", title: "意甲冠军 · 第 7 座" },
      { year: "1994", title: "欧冠冠军 · 巴萨 4-0 之夜" },
      { year: "2003", title: "欧足联终身成就奖" },
    ],
    quote: "如果我必须铲球，说明我已经犯了错。",
  },
  {
    id: "baggio", name: "Roberto Baggio", nameZh: "罗伯特·巴乔", countryId: "italy",
    position: "FW", posZh: "影锋 / 前腰", number: 10, birthYear: 1967, era: "传奇",
    clubId: "juventus", rating: 91, marketValue: null, ballonDor: 1,
    goals: 318, assists: 131, apps: 710,
    abilities: { pace: 80, shooting: 88, passing: 85, dribbling: 93, defending: 35, physical: 65 },
    career: [
      { clubId: "juventus", years: "1990–1995", apps: 200, goals: 115 },
      { clubId: "ac-milan", years: "1995–1997", apps: 67, goals: 19 },
      { clubId: "inter", years: "1998–2000", apps: 59, goals: 17 },
    ],
    honors: [
      { year: "1993", title: "金球奖 + 世界足球先生", golden: true },
      { year: "1994", title: "世界杯亚军 · 忧郁的马尾辫" },
      { year: "1993", title: "欧洲联盟杯冠军" },
    ],
    quote: "玫瑰碗的点球飞上看台，我的心留在了草坪。",
  },
  {
    id: "cruyff", name: "Johan Cruyff", nameZh: "约翰·克鲁伊夫", countryId: "netherlands",
    position: "FW", posZh: "伪九号 / 前场自由人", number: 14, birthYear: 1947, era: "传奇",
    clubId: "ajax", rating: 94, marketValue: null, ballonDor: 3,
    goals: 401, assists: 205, apps: 710,
    abilities: { pace: 85, shooting: 85, passing: 88, dribbling: 92, defending: 45, physical: 70 },
    career: [
      { clubId: "ajax", years: "1964–1973", apps: 367, goals: 273 },
      { clubId: "barcelona", years: "1973–1978", apps: 180, goals: 60 },
    ],
    honors: [
      { year: "1973", title: "金球奖（第 3 座）", golden: true },
      { year: "1973", title: "欧冠三连冠 · 阿贾克斯", golden: true },
      { year: "1974", title: "世界杯亚军 · 全攻全守革命" },
    ],
    quote: "踢足球很简单，但踢简单的足球最难。",
  },
  {
    id: "van-basten", name: "Marco van Basten", nameZh: "马尔科·范巴斯滕", countryId: "netherlands",
    position: "FW", posZh: "中锋", number: 9, birthYear: 1964, era: "传奇",
    clubId: "ac-milan", rating: 92, marketValue: null, ballonDor: 3,
    goals: 313, assists: 82, apps: 420,
    abilities: { pace: 84, shooting: 92, passing: 75, dribbling: 88, defending: 35, physical: 75 },
    career: [
      { clubId: "ajax", years: "1982–1987", apps: 172, goals: 152 },
      { clubId: "ac-milan", years: "1987–1995", apps: 201, goals: 125 },
    ],
    honors: [
      { year: "1988", title: "欧洲杯冠军 · 决赛零度角凌空", golden: true },
      { year: "1992", title: "金球奖（第 3 座）", golden: true },
      { year: "1990", title: "欧冠冠军 · 米兰王朝" },
    ],
    quote: "那脚零度角，是写给物理学的挑战书。",
  },
  {
    id: "de-bruyne", name: "Kevin De Bruyne", nameZh: "凯文·德布劳内", countryId: "belgium",
    position: "MF", posZh: "中前卫 / 前腰", number: 17, birthYear: 1991, era: "现役",
    clubId: "napoli", rating: 90, marketValue: 55, ballonDor: 0,
    goals: 131, assists: 283, apps: 705,
    abilities: { pace: 74, shooting: 84, passing: 94, dribbling: 86, defending: 60, physical: 78 },
    career: [
      { clubId: "chelsea", years: "2012–2014", apps: 9, goals: 0 },
      { clubId: "man-city", years: "2015–2025", apps: 420, goals: 108 },
      { clubId: "napoli", years: "2025–至今", apps: 20, goals: 5 },
    ],
    honors: [
      { year: "2023", title: "欧冠冠军 · 三冠王", golden: true },
      { year: "2022", title: "英超四连冠王朝核心" },
      { year: "2020", title: "PFA 年度最佳（2 次）" },
    ],
    quote: "传球线路在我眼里，是发光的。",
  },
  {
    id: "hazard", name: "Eden Hazard", nameZh: "埃登·阿扎尔", countryId: "belgium",
    position: "FW", posZh: "左边锋", number: 10, birthYear: 1991, era: "传奇",
    clubId: "chelsea", rating: 87, marketValue: null, ballonDor: 0,
    goals: 201, assists: 192, apps: 700,
    abilities: { pace: 86, shooting: 80, passing: 83, dribbling: 93, defending: 35, physical: 62 },
    career: [
      { clubId: "chelsea", years: "2012–2019", apps: 352, goals: 110 },
      { clubId: "real-madrid", years: "2019–2023", apps: 76, goals: 7 },
    ],
    honors: [
      { year: "2019", title: "欧联杯冠军 · 告别演出双响", golden: true },
      { year: "2018", title: "世界杯季军 + 银球奖" },
      { year: "2017", title: "PFA 年度最佳" },
    ],
    quote: "斯坦福桥的草坪，记得我每一次变向。",
  },
  {
    id: "modric", name: "Luka Modrić", nameZh: "卢卡·莫德里奇", countryId: "croatia",
    position: "MF", posZh: "中前卫 / 组织核心", number: 10, birthYear: 1985, era: "现役",
    clubId: "ac-milan", rating: 88, marketValue: 15, ballonDor: 1,
    goals: 101, assists: 163, apps: 910,
    abilities: { pace: 72, shooting: 72, passing: 90, dribbling: 90, defending: 65, physical: 60 },
    career: [
      { clubId: "tottenham", years: "2008–2012", apps: 160, goals: 17 },
      { clubId: "real-madrid", years: "2012–2025", apps: 590, goals: 43 },
      { clubId: "ac-milan", years: "2025–至今", apps: 15, goals: 1 },
    ],
    honors: [
      { year: "2018", title: "金球奖 · 打破梅罗垄断", golden: true },
      { year: "2024", title: "欧冠冠军 · 第 6 座", golden: true },
      { year: "2018", title: "世界杯亚军 · 格子军团奇迹" },
    ],
    quote: "瘦小的身体里，住着一整个中场宇宙。",
  },
  {
    id: "suarez", name: "Luis Suárez", nameZh: "路易斯·苏亚雷斯", countryId: "uruguay",
    position: "FW", posZh: "中锋", number: 9, birthYear: 1987, era: "现役",
    clubId: "inter-miami", rating: 87, marketValue: 10, ballonDor: 0,
    goals: 583, assists: 262, apps: 955,
    abilities: { pace: 78, shooting: 90, passing: 78, dribbling: 85, defending: 40, physical: 80 },
    career: [
      { clubId: "ajax", years: "2007–2011", apps: 159, goals: 111 },
      { clubId: "liverpool", years: "2011–2014", apps: 133, goals: 82 },
      { clubId: "barcelona", years: "2014–2020", apps: 283, goals: 198 },
      { clubId: "atletico", years: "2020–2022", apps: 83, goals: 34 },
    ],
    honors: [
      { year: "2015", title: "欧冠冠军 · MSN 三叉戟", golden: true },
      { year: "2016", title: "欧洲金靴奖（40 球）", golden: true },
      { year: "2011", title: "美洲杯冠军 + 赛事最佳" },
    ],
    quote: "禁区内的一切，都是猎手的本能。",
  },
  {
    id: "maradona", name: "Diego Maradona", nameZh: "迭戈·马拉多纳", countryId: "argentina",
    position: "MF", posZh: "前腰 / 影锋", number: 10, birthYear: 1960, era: "传奇",
    clubId: "napoli", rating: 94, marketValue: null, ballonDor: 0,
    goals: 345, assists: 152, apps: 680,
    abilities: { pace: 85, shooting: 86, passing: 88, dribbling: 96, defending: 35, physical: 75 },
    career: [
      { clubId: "boca", years: "1981–1982", apps: 40, goals: 28 },
      { clubId: "barcelona", years: "1982–1984", apps: 58, goals: 38 },
      { clubId: "napoli", years: "1984–1991", apps: 259, goals: 115 },
    ],
    honors: [
      { year: "1986", title: "世界杯冠军 · 上帝之手与世纪进球", golden: true },
      { year: "1990", title: "率那不勒斯两夺意甲 · 南方之王", golden: true },
      { year: "2000", title: "FIFA 世纪最佳球员（并列）" },
    ],
    quote: "把球给我，我把整个国家扛在肩上。",
  },
  {
    id: "eusebio", name: "Eusébio", nameZh: "尤西比奥", countryId: "portugal",
    position: "FW", posZh: "中锋", number: 10, birthYear: 1942, era: "传奇",
    clubId: "benfica", rating: 91, marketValue: null, ballonDor: 1,
    goals: 623, assists: 118, apps: 650,
    abilities: { pace: 90, shooting: 92, passing: 72, dribbling: 88, defending: 30, physical: 80 },
    career: [
      { clubId: "benfica", years: "1960–1975", apps: 440, goals: 473 },
    ],
    honors: [
      { year: "1965", title: "金球奖 · 黑豹加冕", golden: true },
      { year: "1962", title: "欧冠冠军 · 决赛双响", golden: true },
      { year: "1966", title: "世界杯季军 + 金靴（9 球）" },
    ],
    quote: "黑豹出笼，球门便开始颤抖。",
  },
];

/* ============================================================
 * 国家（13 个精选强国 + 87 个 FIFA 百强扩展国家）
 * ============================================================ */

const FEATURED_COUNTRIES: Country[] = [
  {
    id: "brazil", name: "Brazil", nameZh: "巴西", lat: -10.3, lng: -53.2,
    fifaRank: 5, confed: "CONMEBOL", worldCups: 5, continentals: 9, continentalLabel: "美洲杯",
    tagline: "五星桑巴，足球是这个国家的第二宗教",
    theme: ["#009C3B", "#FFDF00"],
    playerIds: ["pele", "ronaldo-nazario", "ronaldinho", "neymar", "vinicius"],
    clubIds: ["santos"],
  },
  {
    id: "argentina", name: "Argentina", nameZh: "阿根廷", lat: -34.6, lng: -63.0,
    fifaRank: 1, confed: "CONMEBOL", worldCups: 3, continentals: 16, continentalLabel: "美洲杯",
    tagline: "潘帕斯雄鹰，为冠军而生",
    theme: ["#74ACDF", "#F6B40E"],
    playerIds: ["messi", "maradona"],
    clubIds: ["boca"],
  },
  {
    id: "france", name: "France", nameZh: "法国", lat: 46.6, lng: 2.4,
    fifaRank: 2, confed: "UEFA", worldCups: 2, continentals: 2, continentalLabel: "欧洲杯",
    tagline: "高卢雄鸡的黄金一代",
    theme: ["#0055A4", "#EF4135"],
    playerIds: ["zidane", "mbappe", "henry", "griezmann"],
    clubIds: ["psg", "monaco"],
  },
  {
    id: "germany", name: "Germany", nameZh: "德国", lat: 51.2, lng: 10.4,
    fifaRank: 9, confed: "UEFA", worldCups: 4, continentals: 3, continentalLabel: "欧洲杯",
    tagline: "日耳曼战车，钢铁与纪律",
    theme: ["#DD0000", "#FFCC00"],
    playerIds: ["beckenbauer", "gerd-muller", "musiala"],
    clubIds: ["bayern", "dortmund"],
  },
  {
    id: "spain", name: "Spain", nameZh: "西班牙", lat: 40.3, lng: -3.7,
    fifaRank: 3, confed: "UEFA", worldCups: 1, continentals: 4, continentalLabel: "欧洲杯",
    tagline: "斗牛士军团，tiki-taka 的传唱者",
    theme: ["#AA151B", "#F1BF00"],
    playerIds: ["xavi", "iniesta", "rodri"],
    clubIds: ["real-madrid", "barcelona", "atletico"],
  },
  {
    id: "england", name: "England", nameZh: "英格兰", lat: 52.8, lng: -1.5,
    fifaRank: 4, confed: "UEFA", worldCups: 1, continentals: 0, continentalLabel: "欧洲杯",
    tagline: "现代足球发源地，三狮的荣耀与执念",
    theme: ["#C8102E", "#E8E8E8"],
    playerIds: ["bellingham", "kane", "beckham"],
    clubIds: ["man-city", "man-utd", "liverpool", "arsenal", "chelsea", "tottenham"],
  },
  {
    id: "italy", name: "Italy", nameZh: "意大利", lat: 42.8, lng: 12.4,
    fifaRank: 11, confed: "UEFA", worldCups: 4, continentals: 2, continentalLabel: "欧洲杯",
    tagline: "蓝色混凝土，链式防守的艺术",
    theme: ["#009246", "#CE2B37"],
    playerIds: ["maldini", "baggio"],
    clubIds: ["juventus", "inter", "ac-milan", "napoli"],
  },
  {
    id: "portugal", name: "Portugal", nameZh: "葡萄牙", lat: 39.6, lng: -8.0,
    fifaRank: 6, confed: "UEFA", worldCups: 0, continentals: 1, continentalLabel: "欧洲杯",
    tagline: "大西洋航海家，从尤西比奥到C罗",
    theme: ["#046A38", "#DA291C"],
    playerIds: ["c-ronaldo", "eusebio"],
    clubIds: ["benfica", "porto"],
  },
  {
    id: "netherlands", name: "Netherlands", nameZh: "荷兰", lat: 52.2, lng: 5.5,
    fifaRank: 7, confed: "UEFA", worldCups: 0, continentals: 1, continentalLabel: "欧洲杯",
    tagline: "全攻全守，无冕之王的橙色风暴",
    theme: ["#AE1C28", "#21468B"],
    playerIds: ["cruyff", "van-basten"],
    clubIds: ["ajax"],
  },
  {
    id: "belgium", name: "Belgium", nameZh: "比利时", lat: 50.6, lng: 4.6,
    fifaRank: 8, confed: "UEFA", worldCups: 0, continentals: 0, continentalLabel: "欧洲杯",
    tagline: "红魔黄金一代",
    theme: ["#FDDA24", "#EF3340"],
    playerIds: ["de-bruyne", "hazard"],
    clubIds: [],
  },
  {
    id: "croatia", name: "Croatia", nameZh: "克罗地亚", lat: 45.1, lng: 16.4,
    fifaRank: 10, confed: "UEFA", worldCups: 0, continentals: 0, continentalLabel: "欧洲杯",
    tagline: "格子军团的狂想曲",
    theme: ["#E4002B", "#171796"],
    playerIds: ["modric"],
    clubIds: [],
  },
  {
    id: "uruguay", name: "Uruguay", nameZh: "乌拉圭", lat: -32.8, lng: -55.8,
    fifaRank: 12, confed: "CONMEBOL", worldCups: 2, continentals: 15, continentalLabel: "美洲杯",
    tagline: "天蓝战士，两届世界杯的先驱",
    theme: ["#0038A8", "#FCD116"],
    playerIds: ["suarez"],
    clubIds: [],
  },
  {
    id: "norway", name: "Norway", nameZh: "挪威", lat: 61.0, lng: 8.8,
    fifaRank: 17, confed: "UEFA", worldCups: 0, continentals: 0, continentalLabel: "欧洲杯",
    tagline: "北欧新势力，维京锋霸",
    theme: ["#BA0C2F", "#00205B"],
    playerIds: ["haaland"],
    clubIds: [],
  },
];

/* 合并：精选国家应用最新排名 + FIFA 百强扩展国家 */
export const COUNTRIES: Country[] = [
  ...FEATURED_COUNTRIES.map((c) => ({
    ...c,
    fifaRank: FIFA_RANK_OF[c.id] ?? c.fifaRank,
  })),
  ...EXTRA_COUNTRIES,
];

/** 是否精选国家（收录了球星档案） */
export const isFeatured = (c: Country) => c.playerIds.length > 0;

/* ============================================================
 * 索引与排行榜工具
 * ============================================================ */

export const PLAYER_MAP: Record<string, Player> = Object.fromEntries(
  PLAYERS.map((p) => [p.id, p])
);
export const CLUB_MAP: Record<string, Club> = Object.fromEntries(
  CLUBS.map((c) => [c.id, c])
);
export const COUNTRY_MAP: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.id, c])
);

export const getPlayer = (id: string) => PLAYER_MAP[id];
export const getClub = (id: string) => CLUB_MAP[id];
export const getCountry = (id: string) => COUNTRY_MAP[id];

export const countryPlayers = (c: Country): Player[] =>
  c.playerIds.map((id) => PLAYER_MAP[id]).filter(Boolean)
    .sort((a, b) => b.rating - a.rating);

export const countryClubs = (c: Country): Club[] =>
  c.clubIds.map((id) => CLUB_MAP[id]).filter(Boolean)
    .sort((a, b) => b.uclTitles - a.uclTitles || b.leagueTitles - a.leagueTitles);

export interface RankingItem {
  player: Player;
  value: number;
  display: string;
  bar: number; // 0-1 相对最大值
}

export function ballonDorRanking(limit = 10): RankingItem[] {
  const list = PLAYERS.filter((p) => p.ballonDor > 0)
    .sort((a, b) => b.ballonDor - a.ballonDor || b.rating - a.rating)
    .slice(0, limit);
  const max = list[0]?.ballonDor ?? 1;
  return list.map((p) => ({
    player: p,
    value: p.ballonDor,
    display: `×${p.ballonDor}`,
    bar: p.ballonDor / max,
  }));
}

export function marketValueRanking(limit = 10): RankingItem[] {
  const list = PLAYERS.filter((p) => p.marketValue !== null && p.era === "现役")
    .sort((a, b) => (b.marketValue ?? 0) - (a.marketValue ?? 0))
    .slice(0, limit);
  const max = list[0]?.marketValue ?? 1;
  return list.map((p) => ({
    player: p,
    value: p.marketValue ?? 0,
    display: `€${p.marketValue}M`,
    bar: (p.marketValue ?? 0) / max,
  }));
}

export function goalsRanking(limit = 10): RankingItem[] {
  const list = [...PLAYERS]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, limit);
  const max = list[0]?.goals ?? 1;
  return list.map((p) => ({
    player: p,
    value: p.goals,
    display: `${p.goals}`,
    bar: p.goals / max,
  }));
}

export function ratingTicker(limit = 16): Player[] {
  return [...PLAYERS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

/* 地球节点视觉参数（三级节点：冠军金 / 精选绿 / 百强蓝） */
export function countryAltitude(c: Country): number {
  if (isFeatured(c))
    return 0.022 + c.worldCups * 0.011 + Math.max(0, 20 - c.fifaRank) * 0.0006;
  return 0.012 + Math.max(0, 30 - c.fifaRank) * 0.0004;
}
export function countryRadius(c: Country): number {
  if (isFeatured(c)) return 0.34 + c.worldCups * 0.08;
  return 0.1 + Math.max(0, 40 - c.fifaRank) * 0.0016; // 排名越高越大
}
export function countryColor(c: Country): string {
  if (c.worldCups > 0) return "#F59E0B";
  return isFeatured(c) ? "#10B981" : "#38BDF8";
}

/* 全局统计 */
export const GLOBAL_STATS = {
  countries: COUNTRIES.length,
  featuredCountries: FEATURED_COUNTRIES.length,
  players: PLAYERS.length,
  clubs: CLUBS.length,
  worldCups: COUNTRIES.reduce((s, c) => s + c.worldCups, 0),
};
