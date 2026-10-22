# Anker AI Native Product Lab

> 用真实资料、可见假设、多角色质疑与验证闭环，重新定义一款消费电子产品。

[![Pages](https://img.shields.io/badge/Live-GitHub%20Pages-55e5bf?style=flat-square)](https://xiaotian69.github.io/anker-ai-native-product-lab/)
[![React](https://img.shields.io/badge/React-19-3cbff4?style=flat-square)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-8b93ff?style=flat-square)](https://vite.dev/)
[![Data](https://img.shields.io/badge/Data-Provenance%20Labeled-ff9a4d?style=flat-square)](#数据真实性声明)

[在线体验](https://xiaotian69.github.io/anker-ai-native-product-lab/) · [下载项目 PDF](https://xiaotian69.github.io/anker-ai-native-product-lab/docs/Anker_AI原生产品设计方案_赵子健.pdf) · [研究方法](docs/methodology.md) · [访谈提纲](docs/interview-guide.md)

![项目首页](docs/screenshots/01-hero.png)

## 项目背景

这是赵子健参加“2026 AI先锋未来人才大赛——安克创新命题”的独立展示项目。命题不是给现有流程加一个 AI 助手，而是探索：能否把消费电子产品定义变成一个由证据驱动、多角色相互质疑、持续学习且可以追溯的决策系统。

一句话产品概念：

> Anker Aero 10K 是一款面向航空与长途出行的候选移动电源，通过清晰 Wh、低功耗状态屏、温感提示、伸缩线和个人包带夹扣，让旅途用电状态更容易被判断。

以上只是待验证建议，不代表安克已立项、已量产或已认证的产品。

### 项目状态一览

| 类别 | 内容 | 状态 |
| --- | --- | --- |
| 已完成的作品 | 交互式展示站（7 个模块）、12 张证据卡、一次录制的 AI 运行与决策账本、离线重放脚本、自动化测试 | ✅ 已实现 |
| 产品概念 | Anker Aero 10K 候选移动电源 | 💡 待验证假设 |
| 真实用户与工程验证 | 4 项预注册验证（理解度、夹扣任务、支付意愿、热与结构） | ⏳ 全部 `NOT_RUN` |
| 外部关系 | 独立参赛作品，与安克创新无隶属、合作或背书关系 | — |

> English summary: an independent competition entry (2026 AI Pioneer Future Talent Competition, Anker topic) exploring AI-native product definition. It ships an interactive evidence-to-decision site, a recorded and replayable AI run, and a candidate concept. The concept and all user/engineering hypotheses are **not yet validated**; this is not an Anker product or an official Anker project.

## SCOPE AI 双闭环

| 阶段 | 作用 | 关键产物 |
| --- | --- | --- |
| S · Scan | 扫描并核验真实资料 | 带来源和置信度的证据卡 |
| C · Construct | 聚类问题并统一排序 | 需求图谱、机会评分与敏感性分析 |
| O · Orchestrate | 编排相互独立的 AI 角色 | 分歧、约束和功能—证据映射 |
| P · Prove | 用专家与真实用户验证 | 工程门、合规门和原型任务结果 |
| E · Evolve | 让反馈改变需求和版本 | 可追溯的版本决策链 |

核心判断：传统方法把 AI 当助手；AI 原生方法把产品定义变成持续学习、可追溯的决策系统。

## 可交互实验室

- **Evidence Lab**：检索 12 条证据，显示 1–5 分标尺，并区分规则、能力、竞品、反证、访谈命题和 AI 挑战。
- **Opportunity Map**：拖动 C/F/S/T/W/A/R 七项指标，并用均衡、安全优先、商业优先三组权重检查排名稳定性。
- **Decision Ledger**：公开一次 Codex 运行的输入、Prompt、模型边界、原始输出、30→10→5→1 漏斗、人工状态和决策理由。
- **AI Council**：聚焦当前角色与已完成结论；完整八角色录制输出可展开审计，不冒充实时模型或专家意见。
- **Product Concept**：将 Aero 10K 与现有 A1638 对照，明确已有能力与三项待验证的任务差异。
- **Validation Board**：预注册四项真实用户/工程验证的成功门槛、当前状态和失败后的产品决策。
- **Reviewer Tour**：用五站、三分钟路径把评委带过证据、AI 运行、冲突、产品变化和下一步验证。

| Evidence Lab | Opportunity Map |
| --- | --- |
| ![证据库](docs/screenshots/02-evidence-lab.png) | ![机会评分台](docs/screenshots/03-opportunity-map.png) |

| AI 运行与决策账本 | AI Council |
| --- | --- |
| ![决策账本](docs/screenshots/04-decision-ledger.png) | ![多智能体评审](docs/screenshots/05-ai-council.png) |

| Product Concept | Validation Board |
| --- | --- |
| ![产品概念与竞品差异](docs/screenshots/06-product-concept.png) | ![真实验证看板](docs/screenshots/07-validation-board.png) |

移动端已单独验证：

<img src="docs/screenshots/08-mobile.png" alt="移动端首页" width="320" />

## 可审计 AI 运行

站点不是只画一张多智能体流程图。仓库保存了 2026-07-19 的输入、Prompt、原始机会、聚类、评审记录与人工决策账本：

```text
12 条证据 → 30 个原始方向 → 10 个主题聚类 → 5 个候选 → 1 个工作概念
```

模型记录为 `OpenAI Codex (GPT-5 family)`；精确服务端快照未向客户端暴露，因此没有虚构具体版本。作者最终确认目前仍是 `pending_author_confirmation`。

```bash
python run_pipeline.py --demo
```

该命令是确定性的**离线重放**：不会联网或调用模型，只把已提交的录制输出重新生成为可比较 JSON。详见 [运行清单](pipeline/runs/2026-07-19/run-manifest.json) 和 [决策账本](pipeline/runs/2026-07-19/decision-ledger.json)。

## 机会评分

```text
O = C × (0.25F + 0.25S + 0.15T + 0.15W + 0.20A) - R
```

输入统一使用 0–5 分，公式理论范围为 −5 至 25，输出保留一位小数。五个方向的默认值全部标为 `SYNTHETIC_DEMO`，是用于演示权重与风险如何改变排序的工作坊假设分；没有链接证据的方向不会被解释成研究结论。这个模型不用于预测市场规模、销量、成本或最终立项结果。

## 数据真实性声明

当前站点包含 12 张研究卡：7 张来自可回溯公开网页，3 张明确标注为“访谈待验证”，2 张明确标注为“合成演示”。其中 [A1638 官方资料](https://www.anker.com/products/a1638-10k-45w-power-bank) 被专门标为反对证据：现有产品已经具备 10,000mAh、45W、伸缩线、智能显示和 ActiveShield 温控，所以这些能力不能被包装成 Aero 10K 的创新。本项目没有声称已经完成用户访谈，也没有把 AI 用户代理当成真实用户。

- 公开资料附来源 URL 与访问日期 `2026-07-19`。
- 无真实来源的内容不会伪装成用户原话。
- AI Council 是已记录 AI 运行的交互展示，不是实时大模型调用，也不是专家或用户研究。
- 所有容量、功率、热、结构与价格相关结论都需要后续工程或用户验证。
- 四项真实验证当前全部为 `NOT_RUN`；成功门槛是预注册标准，不是已取得的结果。
- 航空携带和使用要求以承运人最新规定为准。

详见 [研究说明](docs/research-notes.md) 与 [证据卡 CSV 模板](docs/evidence-template.csv)。

## 技术栈

- React 19 + TypeScript
- Vite 8
- 原生 CSS 与原创 SVG 图形
- Vitest + Testing Library
- GitHub Actions + GitHub Pages
- 纯前端静态数据，不需要 API Key 或服务器
- Python 3 离线审计脚本（标准库，无额外依赖）

## 本地运行

需要 Node.js 24 和 npm。

```bash
npm install
npm run dev
```

Vite 会在 `/anker-ai-native-product-lab/` 子路径提供开发页面。

## 测试与构建

```bash
npm test -- --run
npm run build
python -m unittest discover -s tests -p "test_*.py"
python run_pipeline.py --demo
```

测试覆盖评分公式、输入边界、证据组合筛选、Pages 资源路径、数据来源约束和关键交互。生产构建输出到 `dist/`。

## 目录

```text
src/                  React 页面、交互、数据与测试
pipeline/             录制 AI 运行、Prompt、决策账本与离线重放脚本
docs/                 方法、研究记录、访谈提纲与截图
prompts/              五个可复用 AI 角色提示词
public/docs/          网站可下载的 PDF 与研究材料
public/prompts/       网站可下载的提示词
.github/workflows/    测试、构建与 Pages 部署
```

## 下一步真实验证

1. 招募近期有长途出行经历的参与者，先研究最近一次真实行为。
2. 测试 Wh、低功耗屏和温感环在无解释条件下的理解度。
3. 用纸模验证包带夹扣的安装、查看、取用和收纳任务。
4. 用价格阶梯验证整体方案与单项功能的支付意愿。
5. 完成热仿真、线材回卷寿命、结构公差、样机温升与承运人规则复核。

页面已为这些假设预注册成功门槛和不通过后的产品决策；在真实测试完成前，不会把它们写成已验证洞察。

## 项目声明

本仓库是独立参赛研究，不属于安克创新或其关联品牌，不使用安克官方 Logo，也不构成官方产品发布、安全保证或航空许可。`Anker` 名称仅用于说明比赛命题与候选品类。

作者：**赵子健** · GitHub：[@Xiaotian69](https://github.com/Xiaotian69)

代码采用 [MIT License](LICENSE) 发布；PDF、研究文字与原创视觉的署名权归作者所有。
