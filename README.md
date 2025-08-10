# Uniloco App - Web3 旅行故事平台

一个专为移动端设计的 Next.js 应用，专注于 Web3 旅行故事和 AI 驱动的旅程生成。

## 🎯 项目概述

Uniloco 是一个创新的 Web3 旅行故事平台，结合了 AI 技术、游戏化元素和社区分享功能。用户可以通过 AI 助手生成个性化的旅行路线，探索精选的旅行故事，并与全球旅行者分享自己的冒险经历。

## 🚀 技术栈

- **Next.js 15.4.5** - React 框架 (App Router)
- **React 19.1.0** - 前端框架
- **TypeScript 5.x** - 类型安全
- **Tailwind CSS 4.x** - 样式框架
- **Framer Motion** - 动画库
- **PWA 支持** - 可安装到主屏幕

## 📱 核心功能模块

### 🤖 AI 旅途生成器 (`/ai-chat`)
- AI 助手对话界面
- 个性化旅行路线生成
- 智能推荐系统
- 实时交互体验

### 📚 旅途脚本书架 (`/bookshelf`)
- 精选旅行故事库
- 分类浏览功能
- 故事详情展示
- 收藏和分享功能

### 🗺️ 我的旅程 (`/my-journeys`)
- 个人旅行记录管理
- 旅程进度追踪
- 成就系统
- 历史回顾

### 👥 社区探索 (`/community`)
- 用户生成内容展示
- 社区互动功能
- 故事分享平台
- 社交功能

## 🛠️ 开发环境

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 移动端调试
```bash
# 访问调试页面
http://localhost:3000/debug
```

## 📦 构建和部署

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm run start
```

### 代码检查
```bash
npm run lint
```

## 🏗️ 项目结构

```
Uniloco-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   ├── ai-chat/         # AI 对话页面
│   │   ├── bookshelf/       # 书架页面
│   │   ├── splash/          # 启动页面
│   │   ├── debug/           # 调试页面
│   │   └── globals.css      # 全局样式
│   ├── components/          # 组件库
│   │   ├── ui/             # 基础 UI 组件
│   │   └── features/       # 功能组件
│   ├── lib/                # 工具函数
│   │   ├── utils.ts        # 通用工具
│   │   └── constants.ts    # 常量定义
│   ├── types/              # TypeScript 类型定义
│   │   └── common.ts       # 通用类型
│   └── hooks/              # 自定义 Hooks
├── public/                  # 静态资源
│   ├── manifest.json        # PWA 配置
│   └── icons/              # 应用图标
├── package.json
├── next.config.ts
└── README.md
```

## 🎨 设计特色

### 移动端优化
- ✅ 响应式设计
- ✅ PWA 支持
- ✅ 触摸优化
- ✅ 安全区域适配
- ✅ 移动端调试工具

### 用户体验
- 渐变色彩设计
- 流畅动画效果
- 直观导航结构
- 游戏化界面元素

## 🔧 配置说明

### PWA 配置
- `public/manifest.json` - PWA 清单文件
- 支持添加到主屏幕
- 离线缓存支持

### 移动端优化
- 禁用页面缩放
- 触摸反馈优化
- 安全区域适配
- 滚动优化

## 📱 调试方法

### 真机调试
1. 确保手机和电脑在同一网络
2. 获取本机 IP 地址
3. 手机访问 `http://[本机IP]:3000`
4. 使用浏览器开发者工具调试

### 开发工具
- Chrome DevTools 设备模拟器
- 移动端调试面板
- 网络请求监控

## 🚀 部署

### Vercel 部署（推荐）
```bash
npm install -g vercel
vercel
```

### 其他平台
- Netlify
- Railway
- Heroku

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发阶段** 🚧

> 当前处于原型开发阶段，专注于前端界面和交互体验，使用 Mock 数据进行开发。
