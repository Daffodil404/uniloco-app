# UniLoco App

一个专为移动端设计的 Next.js 应用，支持 PWA 功能。

## 🚀 技术栈

- **Next.js 15.4.5** - React 框架
- **React 19.1.0** - 前端框架
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架
- **PWA 支持** - 可安装到主屏幕

## 📱 移动端特性

- ✅ 响应式设计
- ✅ PWA 支持
- ✅ 触摸优化
- ✅ 安全区域适配
- ✅ 移动端调试工具

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
uniloco-app/
├── src/
│   └── app/                 # Next.js App Router
│       ├── layout.tsx       # 根布局
│       ├── page.tsx         # 首页
│       ├── debug/           # 调试页面
│       └── globals.css      # 全局样式
├── public/                  # 静态资源
│   ├── manifest.json        # PWA 配置
│   └── icons/              # 应用图标
├── package.json
├── next.config.ts
└── README.md
```

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

**开发中...** 🚧
