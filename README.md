# Uniloco App - 移动端 H5 + Web2/Web3 原型

基于 Next.js 的原型应用，现已分流为移动端 H5 与 Web（Web2 / Web3）两套体验，统一技术栈与视觉规范，便于并行开发与对比验证。

## 🎯 项目概述

Uniloco 专注于旅行内容与交互原型：
- 移动端 H5：以 AI 对话、路线生成与轻交互为主，遵循移动端触控规范
- Web2：精选体验与服务电商风格，强调内容陈列与转化
- Web3（深色主题）：品牌叙事 + Token/NFT 模块（目录分组：`web_dark`）

## 🚀 技术栈

- Next.js 15.4.5（App Router）
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x
- Framer Motion（按需）

## 📱 入口与路由分流

- H5 分组：`/h5`
  - 首页：`/h5/home`
  - AI 旅途生成器：`/h5/ai-chat`
  - 书架：`/h5/bookshelf`
  - 旅程故事：`/h5/story-detail`
  - 钱包：`/h5/wallet_balance`

- Web2 分组：`/web2`
  - 首页：`/web2/index`
  - 精选体验：`/web2/curated_experience`
  - 专属服务：`/web2/exclusive_service`
  - 定制旅程：`/web2/tailored_travel`
  - 详情（示例）：`/web2/script_detail`, `/web2/service_detail`, `/web2/experience_detail`

- Web3 深色主题分组：`/web_dark`
  - 品牌介绍：`/web_dark/intro`
  - 活动：`/web_dark/events`
  - Web3 Hub（导航内分支）：Travel Band NFTs → `/web_dark/band`，Token Economic → `/web_dark/token-economic`

注：旧分组 `/web` 仍有部分示例页面用于对比验证。

## 🛠️ 启动与开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`，常用入口：
- H5 首页：`/h5/home`
- Web2 首页：`/web2/index`
- Web3 首页：`/web_dark/intro`

### 移动端调试
- 浏览器设备模式（iPhone 系列）
- 真机同网访问：`http://[本机IP]:3000`

## 🏗️ 目录结构（关键）

```
uniloco-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 根首页（跳转入口）
│   │   ├── h5/                 # 移动端 H5 分组
│   │   ├── web2/               # Web2 分组
│   │   ├── web_dark/           # Web3 深色主题分组
│   │   └── globals.css         # 全局样式
│   ├── components/
│   │   ├── ui/                 # 基础 UI 组件
│   │   │   ├── Web2Header.tsx
│   │   │   ├── TimeLineSteps.tsx
│   │   │   └── normalMap.tsx
│   │   └── features/           # 功能组件
│   │       ├── InteractiveMap.tsx
│   │       └── DownloadSection.tsx
│   ├── lib/                     # 工具
│   ├── types/                   # 类型
│   └── hooks/                   # Hooks
└── public/
    └── static/                  # 静态资源（含 web2 素材）
```

## 🎨 设计与主题

- 品牌主色：`#4A90E2`（移动端/H5 基调）
- 强调色：`#fe585f`（Web2/3 强调，用于按钮/时间轴/边框等）
- 地图皮肤统一：Leaflet 卡通化皮肤（`InteractiveMap` / `normalMap`）
- 组件一致性：按钮、卡片、圆角、阴影、渐变遵循统一规范

## 🔁 复用组件

- 地图
  - `components/features/InteractiveMap.tsx`：交互/打卡地图
  - `components/ui/normalMap.tsx`：常规地图（中心/缩放/标记可配置）
- 时间轴：`components/ui/TimeLineSteps.tsx`（上下交错，主题色 `#fe585f`）
- 下载区块：`components/features/DownloadSection.tsx`（`buttonOnly` 开关）
- 头部导航：`components/ui/Web2Header.tsx`（Web2），`components/ui/Header.tsx`（Web3 深色）

## 📦 构建与部署

```bash
npm run build
npm run start
npm run lint
```

### Vercel（推荐）
```bash
npm i -g vercel
vercel
```

## 📱 真机调试建议

1. 同网访问 `http://[本机IP]:3000`
2. DevTools 远程调试，观测触摸与性能
3. 重点关注 44px 触控面积、Safe Area、滚动回弹

## 许可证

MIT License

---

开发阶段 🚧：当前为原型期（前端优先、Mock 数据），Web2 与 Web3 并行演进，H5 聚焦移动体验。
