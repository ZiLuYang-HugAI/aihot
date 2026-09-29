# PowerAI Hot — Agent Skill

让支持 Agent Skills（`SKILL.md`）的工具查询 [PowerAI Hot]({{siteUrl}}) 的当前精选、最近公开动态、热点和日报，也可低流量维护当前全部精选副本。

基础能力长期保持匿名、只读、无需 API Key。Skill 使用稳定的 `/api/v1/*` 契约；后端抓取、评分、排序、缓存和模型可以继续迭代，用户无需因此更新 Skill。

本 Skill 遵循公开使用规则：个人非商业、公益非商业和组织内部使用免费；任何面向外部的商业产品、收费服务、客户交付、代理接口、数据转售、公开镜像或批量公开再分发，须事先取得书面授权。

## 安装前可审阅

- [SKILL.md]({{siteUrl}}/{{skillName}}-skill/SKILL.md)
- [安装包清单]({{siteUrl}}/{{skillName}}-skill/manifest.sha256)
- [install.sh]({{siteUrl}}/{{skillName}}-skill/install.sh)

## 手动安装

以下 Bash 命令适用于 macOS、Linux 与 WSL。Windows 原生环境请让当前 Agent 按本页说明安装，不要把 Bash 命令直接粘贴到 PowerShell。脚本不会猜测平台，必须显式指定 `--target` 或 `--dir`，无参数只显示帮助并退出。

Skill 正文只安装到 Agent Skills 通用目录 `~/.agents/skills/{{skillName}}`：

```bash
bash <(curl -fsSL {{siteUrl}}/{{skillName}}-skill/install.sh) --target agents
```

`codex`、`gemini`、`copilot` 与 `opencode` 仍可作为同一路径的兼容目标名。Claude Code 按官方约定从 `~/.claude/skills` 发现个人 Skill；使用下面命令时，安装器会把正文安装到通用目录，并创建一个指向同一实体的兼容软链，不复制第二份 Skill：

```bash
bash <(curl -fsSL {{siteUrl}}/{{skillName}}-skill/install.sh) --target claude
```

显式使用通用目录或自定义目录：

```bash
bash <(curl -fsSL {{siteUrl}}/{{skillName}}-skill/install.sh) --target agents

bash <(curl -fsSL {{siteUrl}}/{{skillName}}-skill/install.sh) \
  --dir "$HOME/path/to/skills/{{skillName}}"
```

安装器先把完整包下载到同一磁盘的临时目录，逐文件验证 SHA-256 与 Skill 身份，全部通过后才一次替换目标目录。安装包只包含运行所需的：

```text
SKILL.md
LICENSE
agents/openai.yaml
references/api.md
references/sync.md
references/errors.md
```

人类说明 `README.md` 不会被放进 Agent 的 Skill 安装目录。

## 旧目录迁移

安装器会检查以下旧位置，防止同名 Skill 被一个 Agent 重复发现：

```text
~/.claude/skills/{{skillName}}
~/.codex/skills/{{skillName}}
~/.gemini/skills/{{skillName}}
~/.copilot/skills/{{skillName}}
~/.config/opencode/skills/{{skillName}}
```

发现旧副本时默认停止，不会静默覆盖或再造一份。确认这些目录都是应被当前包替换的旧 PowerAI Hot Skill 后，显式迁移：

```bash
bash <(curl -fsSL {{siteUrl}}/{{skillName}}-skill/install.sh) \
  --target agents \
  --migrate-legacy
```

也可以使用 `--dir <旧目录>` 原地更新单一旧副本；这种方式不会处理其它重复副本。

迁移完成后，厂商目录不再保留独立副本；Claude Code 的兼容入口是指向 `~/.agents/skills/{{skillName}}` 的软链。

## 安装后验证

1. 重启 Agent 或开启新会话。
2. 让 Agent 列出它发现的 skills，确认只有一份 `{{skillName}}`。
3. 提问：`过去 24 小时电力圈最重要的 5 件事是什么？`

成功答案会写明时间窗，给出中文摘要，并把标题链接到站内阅读页。

## 更新

本地 Skill 不会自动从远端更新。重新运行原来的 `--target` 或 `--dir` 命令即可；更新必须落在当前 Agent 实际加载的那一份上，装到别处只会多出一份副本。稳定 v1 内增加可选字段、后端抓取与排序优化，不要求更新 Skill；只有安全边界、触发范围或主工作流发生破坏性变化时才发布新版。

## 能查询什么

- 过去 24 小时或最近 7 天的精选与公开池；其它 7 天以内范围由 Agent 再收窄。
- 现在最热的多源事件。
- 最新或指定日期日报、日报归档。
- 政策、市场、项目、技术、企业、观点分类。
- 公司、产品和主题关键词。
- 当前全部精选：首次完整快照，之后只接收新增、编辑和撤选。

公开池不等于全库：未审内容、低相关条目和已合并重复条目不会返回。

当前边界：

- 超过 7 天的普通历史搜索暂不保证。
- “最近一周精选”不是编辑成品周报。正式周报和月报目前只有 `/weekly` 与 `/monthly` 网页，尚无 Skill／API／RSS 端点。
- v1 items 返回摘要、推荐理由、站内阅读页和第三方原文链接，不提供按 ID 获取单篇正文的接口。站内阅读页有权利且已抓到时才显示正文；全文 RSS 也只对允许再分发的来源内联正文。

## 内容、许可与署名

- `LICENSE` 中的 MIT License 只覆盖 Skill 指令与随附文件。
- 本站服务与数据输出适用 [PowerAI Hot 公开使用规则]({{siteUrl}}/terms)。匿名、无需 API Key 只说明技术访问方式，不代表所有用途均获许可。
- 第三方原文及全文版权仍归原作者，不因经过本站而改变。
- 个人非商业、公益非商业和组织内部使用免费。面向外部的商业产品、收费服务、客户交付、代理接口、数据转售、公开镜像、批量公开再分发或对外模型产品须先取得书面授权；仅标注「数据来源：PowerAI Hot」不代表已取得授权。
- attribution 与 canonical 继续用于机器识别和追溯；重要引用回第三方原文核对。

详细接入文档：[{{siteUrl}}/agent]({{siteUrl}}/agent)

反馈：[{{siteUrl}}/feedback]({{siteUrl}}/feedback)
