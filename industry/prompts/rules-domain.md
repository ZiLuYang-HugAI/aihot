
【电力领域翻译规则 — 本平台 100% 是电力（发电、电网、核电、储能、配电）行业内容，严格遵守】

1. 歧义默认值：以下词在中文有非电力歧义，**一律按电力含义翻译**：
   - Storage = 储能（不是“存储”“仓储”）
   - Grid = 电网（不是“网格”“栅格”）
   - Capacity = 装机容量 / 产能（电站用“装机容量”，电池用“容量”，工厂用“产能”）
   - Dispatch = 调度 / 调用（电力系统语境）
   - Curtailment = 弃风弃光 / 限电（视电源类型选择）
   - Load = 负荷（不是“负载”以外的一般含义）
   - Reserve = 备用（电力系统容量）
   - Generation = 发电 / 发电量（不是“生成”）
   - Inverter = 逆变器；Converter = 变流器
   - Module = 组件（光伏组件，不是“模块”）
   - Cell = 电池 / 电芯（电池语境）；电池片（光伏语境）
   - Bank / Farm = 电站（如 solar farm = 光伏电站，wind farm = 风电场）
   - Offtaker = 购电方；PPA = 购电协议（保留 PPA）

2. 以下专有名词**一律保留英文原文**，不翻译不加中文括注：
   - 技术路线与缩写：HJT / TOPCon / PERC / IBC / BIPV / LFP / NMC / BESS / VPP / V2G / UHV / SCADA / EMS / DCS / CCUS / CCS / ETS / CBAM / FIT / RPS / SMR / LCOE / PPA / EPC / O&M / C&I / DG / TSO / DSO / ISO / RTO
     **规则**：任何 2–5 字母的全大写缩写，默认按电力行业含义保留英文
   - 单位与价格：MW / GW / MWh / GWh / kWh / W / A / V / kV / 元/千瓦时 / 美元/瓦 / $/MWh，一律保留原文写法与阿拉伯数字
   - 机型与产品代号：任何厂商的机型、平台、电芯或组件代号一律保留原文
   - 认证与标准：IEC / UL / CE / TÜV / ISO / IEEE

3. 公司名称：中国厂商**优先用官方中文品牌名**，后文保持一致：
   - 国家电网 / 南方电网 / 国家能源集团 / 华能 / 大唐 / 华电 / 国家电投 / 三峡集团 / 中核集团 / 中广核
   - 隆基绿能 / 通威股份 / 阳光电源 / 宁德时代 / 比亚迪 / 晶科能源 / 天合光能 / 金风科技 / 明阳智能 / 中国电建 / 中国能建
   - 海外公司保留常用写法：Vestas / Ørsted / Siemens Energy / GE Vernova / NextEra / Enel / Iberdrola / RWE / National Grid / EDF

4. 代码 / 命令 / URL / 数字单位 **一字不改**保留：
   - 反引号代码 `code` 不翻译
   - URL 原样
   - 数字+单位：100MW/200MWh / 3.5GW / 26.1% / $45 per MWh / 0.3 元/千瓦时 / 9000 次循环，保留原文的阿拉伯数字和单位，不要把 $10B–$100B 改写成“数百亿至数千亿美元”
   - 日期用原文（2026 年 Q3、2026-09、今年 5 月），不要换算或补全年份
