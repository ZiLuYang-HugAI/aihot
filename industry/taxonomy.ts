// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "policy", label: "政策", section: "政策与监管", guide: "国家与地方的电力政策、规划、法规、电价机制、电力市场与监管动作" },
  { key: "market", label: "市场", section: "市场与价格", guide: "电力交易、电价、燃料与碳价、供需、装机与用电数据等市场信号" },
  { key: "project", label: "项目", section: "项目与工程", guide: "电站、储能、电网、氢能等项目的开工、并网、投产、中标与订单" },
  { key: "tech", label: "技术", section: "技术与装备", guide: "光伏、风电、储能、氢能、核电、电网与数字化的技术、产品和装备进展" },
  { key: "industry", label: "企业", section: "企业与资本", guide: "电力企业的经营、财报、融资并购、人事、合作与竞争" },
  { key: "opinion", label: "观点", section: "观点与研究", guide: "行业研究报告、专家观点、评论、访谈与趋势分析" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["policy_release", "market_signal", "project_progress", "tech_breakthrough", "company_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "政策/监管", "市场/价格", "项目/工程", "技术/装备", "企业/资本", "研究报告", "观点/评论", "数据/统计", "安全/事故", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "光伏", "风电", "储能", "氢能", "核电", "水电", "火电", "电网", "电力交易", "虚拟电厂", "充电与车网互动", "碳市场", "智能电网", "能源数字化",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["国家电网", "南方电网", "国家能源集团", "华能", "国家电投", "三峡集团", "中核集团", "中广核", "隆基绿能", "通威股份", "阳光电源", "宁德时代", "比亚迪", "金风科技", "明阳智能", "中国电建"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 规划: "政策/监管", 补贴: "政策/监管",
  电价: "市场/价格", 电力交易: "市场/价格", 价格: "市场/价格", 供需: "市场/价格", 市场: "市场/价格", 碳价: "市场/价格",
  项目: "项目/工程", 工程: "项目/工程", 招标: "项目/工程", 中标: "项目/工程", 并网: "项目/工程", 投产: "项目/工程", 开工: "项目/工程",
  技术: "技术/装备", 装备: "技术/装备", 研发: "技术/装备", 电池: "技术/装备", 组件: "技术/装备", 机组: "技术/装备",
  企业: "企业/资本", 公司动态: "企业/资本", 财报: "企业/资本", 融资: "企业/资本", 并购: "企业/资本", 收购: "企业/资本", 投资: "企业/资本", 人事: "企业/资本", 合作: "企业/资本",
  研究: "研究报告", 报告: "研究报告", 论文: "研究报告", paper: "研究报告", papers: "研究报告", 白皮书: "研究报告",
  观点: "观点/评论", 评论: "观点/评论", 分析: "观点/评论", 访谈: "观点/评论", 解读: "观点/评论",
  数据: "数据/统计", 统计: "数据/统计", 装机: "数据/统计", 电量: "数据/统计",
  事故: "安全/事故", 安全: "安全/事故", 故障: "安全/事故", 停电: "安全/事故", 火灾: "安全/事故",
  通用: "其他", 非电力: "其他",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  policy_release: "政策/监管", market_signal: "市场/价格", project_progress: "项目/工程", tech_breakthrough: "技术/装备",
  company_event: "企业/资本", opinion_analysis: "观点/评论", tutorial_explainer: "观点/评论",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/** 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  "state-grid": { name: "国家电网", displayTag: "国家电网", aliases: ["国家电网", "国网", "State Grid"] },
  "china-southern-power": { name: "南方电网", displayTag: null, aliases: ["南方电网", "南网"] },
  spic: { name: "国家电投", displayTag: null, aliases: ["国家电投", "国家电力投资集团", "SPIC"] },
  "china-huaneng": { name: "中国华能", displayTag: null, aliases: ["华能", "中国华能"] },
  "china-energy": { name: "国家能源集团", displayTag: null, aliases: ["国家能源集团", "中国神华"] },
  "three-gorges": { name: "三峡集团", displayTag: null, aliases: ["三峡集团", "中国三峡", "CTG"] },
  cnnc: { name: "中核集团", displayTag: null, aliases: ["中核", "中核集团", "CNNC"] },
  cgn: { name: "中广核", displayTag: null, aliases: ["中广核", "CGN"] },
  catl: { name: "宁德时代", displayTag: "宁德时代", aliases: ["宁德时代", "CATL"] },
  byd: { name: "比亚迪", displayTag: "比亚迪", aliases: ["比亚迪", "BYD"] },
  longi: { name: "隆基绿能", displayTag: "隆基绿能", aliases: ["隆基", "隆基绿能", "LONGi"] },
  sungrow: { name: "阳光电源", displayTag: "阳光电源", aliases: ["阳光电源", "Sungrow"] },
  tongwei: { name: "通威股份", displayTag: null, aliases: ["通威", "通威股份"] },
  jinkosolar: { name: "晶科能源", displayTag: null, aliases: ["晶科", "晶科能源", "JinkoSolar"] },
  trina: { name: "天合光能", displayTag: null, aliases: ["天合光能", "Trina"] },
  goldwind: { name: "金风科技", displayTag: null, aliases: ["金风", "金风科技", "Goldwind"] },
  mingyang: { name: "明阳智能", displayTag: null, aliases: ["明阳", "明阳智能", "MingYang"] },
  tesla: { name: "特斯拉能源", displayTag: "特斯拉", aliases: ["特斯拉", "Tesla", "Powerwall", "Megapack"] },
  vestas: { name: "维斯塔斯", displayTag: null, aliases: ["维斯塔斯", "Vestas"] },
  "siemens-energy": { name: "西门子能源", displayTag: null, aliases: ["西门子能源", "Siemens Energy"] },
  "ge-vernova": { name: "GE Vernova", displayTag: "GE Vernova", aliases: ["GE Vernova"] },
  nextera: { name: "NextEra Energy", displayTag: null, aliases: ["NextEra"] },
  iea: { name: "国际能源署", displayTag: null, aliases: ["国际能源署", "IEA"] },
  irena: { name: "国际可再生能源署", displayTag: null, aliases: ["国际可再生能源署", "IRENA"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "state-grid", name: "国家电网", patterns: [/国家电网|国网|state\s?grid/i] },
  { id: "china-southern-power", name: "南方电网", patterns: [/南方电网|南网/i] },
  { id: "spic", name: "国家电投", patterns: [/国家电投|国家电力投资/i] },
  { id: "china-huaneng", name: "中国华能", patterns: [/华能|huaneng/i] },
  { id: "china-energy", name: "国家能源集团", patterns: [/国家能源集团|中国神华|china\s?energy/i] },
  { id: "three-gorges", name: "三峡集团", patterns: [/三峡集团|中国三峡/i] },
  { id: "cnnc", name: "中核集团", patterns: [/中核|\bcnnc\b/i] },
  { id: "cgn", name: "中广核", patterns: [/中广核|\bcgn\b/i] },
  { id: "catl", name: "宁德时代", patterns: [/宁德时代|\bcatl\b/i] },
  { id: "byd", name: "比亚迪", patterns: [/比亚迪|\bbyd\b/i] },
  { id: "longi", name: "隆基绿能", patterns: [/隆基|longi/i] },
  { id: "sungrow", name: "阳光电源", patterns: [/阳光电源|sungrow/i] },
  { id: "tongwei", name: "通威股份", patterns: [/通威|tongwei/i] },
  { id: "jinkosolar", name: "晶科能源", patterns: [/晶科|jinkosolar/i] },
  { id: "trina", name: "天合光能", patterns: [/天合光能|\btrina\b/i] },
  { id: "goldwind", name: "金风科技", patterns: [/金风|goldwind/i] },
  { id: "mingyang", name: "明阳智能", patterns: [/明阳|mingyang/i] },
  { id: "tesla", name: "特斯拉能源", patterns: [/特斯拉|\btesla\b|powerwall|megapack/i] },
  { id: "vestas", name: "维斯塔斯", patterns: [/维斯塔斯|vestas/i] },
  { id: "siemens-energy", name: "西门子能源", patterns: [/西门子能源|siemens\s?energy/i] },
  { id: "ge-vernova", name: "GE Vernova", patterns: [/ge\s?vernova/i] },
  { id: "nextera", name: "NextEra Energy", patterns: [/nextera/i] },
  { id: "iea", name: "国际能源署", patterns: [/国际能源署|\biea\b/i] },
  { id: "irena", name: "国际可再生能源署", patterns: [/国际可再生能源署|\birena\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "state-grid", domains: ["sgcc.com.cn"] },
  { entityId: "china-southern-power", domains: ["csg.cn"] },
  { entityId: "catl", domains: ["catl.com"] },
  { entityId: "byd", domains: ["byd.com"] },
  { entityId: "longi", domains: ["longi.com"] },
  { entityId: "sungrow", domains: ["sungrowpower.com"] },
  { entityId: "jinkosolar", domains: ["jinkosolar.com"] },
  { entityId: "trina", domains: ["trinasolar.com"] },
  { entityId: "goldwind", domains: ["goldwind.com"] },
  { entityId: "vestas", domains: ["vestas.com"] },
  { entityId: "siemens-energy", domains: ["siemens-energy.com"] },
  { entityId: "ge-vernova", domains: ["gevernova.com"] },
  { entityId: "nextera", domains: ["nexteraenergy.com"] },
  { entityId: "tesla", domains: ["tesla.com"] },
  { entityId: "iea", domains: ["iea.org"] },
  { entityId: "irena", domains: ["irena.org"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "catl", pattern: /@CATL\b/i },
  { entityId: "byd", pattern: /@BYDCompany\b/i },
  { entityId: "tesla", pattern: /@Tesla\b/i },
];
