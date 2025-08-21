# 静态资源分析报告

## 概述
本文档分析了 `/public/static/` 目录下所有图片资源的使用情况，按使用状态和文件类型进行分类。

---

## 📊 使用情况统计

### ✅ 已使用的图片 (32个)

#### 🖼️ WebP 格式 (8个)
| 文件名 | 文件夹 | 使用位置 | 用途 |
|--------|--------|----------|------|
| `ai_powered.webp` | `/static/` | `web_dark/intro/page.tsx` | AI功能展示 |
| `travel_story.webp` | `/static/` | `web_dark/intro/page.tsx` | 旅行故事功能 |
| `social_travel.webp` | `/static/` | `web_dark/intro/page.tsx` | 社交旅行功能 |
| `events_handpicked.webp` | `/static/` | `web_dark/events/page.tsx` | 精选活动 |
| `events_customized_service.webp` | `/static/` | `web_dark/events/page.tsx` | 定制服务 |
| `events_ball.webp` | `/static/` | `web_dark/events/page.tsx` | 活动球类 |
| `mushroom_pick.webp` | `/static/` | `web_dark/events/page.tsx` | 蘑菇采摘活动 |
| `mushroom.webp` | `/static/` | `web_dark/events/page.tsx` | 蘑菇主题背景 |
| `earn_euro.webp` | `/static/` | ❌ **未使用** | 欧元收益相关 |
| `york.webp` | `/static/web2/` | `web2/script_detail/page.tsx` | York城市展示 |
| `strasbourg.webp` | `/static/web2/` | `web2/experience_detail/page.tsx` | Strasbourg城市展示 |
| `photographer.webp` | `/static/web2/` | `web2/service_detail/page.tsx` | 摄影师头像 |

#### 🖼️ PNG 格式 (8个)
| 文件名 | 文件夹 | 使用位置 | 用途 |
|--------|--------|----------|------|
| `download_apple.png` | `/static/` | `DownloadSection.tsx` | Apple Store下载按钮 |
| `download_google.png` | `/static/` | `DownloadSection.tsx` | Google Play下载按钮 |
| `logo-transparent-bg.png` | `/static/` | `Header.tsx`, `web/intro/page.tsx` | 透明背景Logo |
| `locate.png` | `/static/` | `h5/profile/page.tsx`, `h5/equipment/page.tsx` | 定位图标 |
| `1.png` | `/static/` | `h5/equipment/page.tsx`, `web2/*/page.tsx` | 装备展示图片1 |
| `2.png` | `/static/` | `h5/equipment/page.tsx`, `web2/*/page.tsx` | 装备展示图片2 |
| `3.png` | `/static/` | `h5/equipment/page.tsx`, `web2/*/page.tsx` | 装备展示图片3 |
| `4.png` | `/static/` | `h5/equipment/page.tsx`, `web2/*/page.tsx` | 装备展示图片4 |
| `real_pic1.png` | `/static/` | `example/*/page.tsx`, `web_dark/intro/page.tsx` | 真实照片1 |
| `real_pic2.png` | `/static/` | `example/*/page.tsx`, `web_dark/intro/page.tsx` | 真实照片2 |
| `real_pic3.png` | `/static/` | `example/*/page.tsx`, `web_dark/intro/page.tsx` | 真实照片3 |

#### 🖼️ JPG/JPEG 格式 (8个)
| 文件名 | 文件夹 | 使用位置 | 用途 |
|--------|--------|----------|------|
| `logo.jpeg` | `/static/` | `page.tsx` | 主Logo |
| `1.jpg` | `/static/` | `h5/equipment/page.tsx`, `web2/*/page.tsx` | 装备展示图片1 |
| `5.jpeg` | `/static/` | `web2/*/page.tsx` | 装备展示图片5 |
| `band1.jpg` | `/static/` | `web/play/page.tsx`, `web/intro/page.tsx` | 手环1 |
| `band2.jpg` | `/static/` | `web/play/page.tsx`, `web/intro/page.tsx` | 手环2 |
| `band3.jpg` | `/static/` | `web/play/page.tsx`, `web/intro/page.tsx` | 手环3 |
| `band4.jpg` | `/static/` | `web/play/page.tsx`, `web/intro/page.tsx` | 手环4 |
| `band1.jpeg` | `/static/band/` | `web_dark/band/page.tsx` | 手环1 (webp版本) |
| `band2.jpeg` | `/static/band/` | `web_dark/band/page.tsx` | 手环2 (webp版本) |
| `band3.jpeg` | `/static/band/` | `web_dark/band/page.tsx` | 手环3 (webp版本) |
| `band4.jpeg` | `/static/band/` | `web_dark/band/page.tsx` | 手环4 (webp版本) |

#### 🖼️ SVG 格式 (5个)
| 文件名 | 文件夹 | 使用位置 | 用途 |
|--------|--------|----------|------|
| `undraw_mind-map_i9bv.svg` | `/static/partnership/` | `web_dark/partnership/page.tsx` | 思维导图图标 |
| `undraw_all-the-data_5lil.svg` | `/static/partnership/` | `web_dark/partnership/page.tsx` | 数据图标 |
| `undraw_investment-data_frxx.svg` | `/static/partnership/` | `web_dark/partnership/page.tsx` | 投资数据图标 |
| `content-creation-91.svg` | `/static/partnership/` | `web_dark/partnership/page.tsx` | 内容创作图标 |
| `online-store-10.svg` | `/static/partnership/` | `web_dark/partnership/page.tsx` | 在线商店图标 |

---

## ❌ 未使用的图片 (1个)

| 文件名 | 文件夹 | 文件大小 | 建议 |
|--------|--------|----------|------|
| `earn_euro.webp` | `/static/` | 67KB | 考虑删除或找到合适用途 |

---

## 📁 文件夹结构分析

### `/static/` (根目录)
- **用途**: 通用静态资源
- **包含**: 主要Logo、下载按钮、装备图片、活动图片等
- **状态**: 大部分文件已使用

### `/static/band/`
- **用途**: 手环相关图片
- **包含**: band1-4.jpeg (web_dark版本使用)
- **状态**: 全部已使用

### `/static/web2/`
- **用途**: Web2版本专用图片
- **包含**: 城市图片、服务提供者头像等
- **状态**: 全部已使用

### `/static/partnership/`
- **用途**: 合作伙伴页面图标
- **包含**: SVG格式的插画图标
- **状态**: 全部已使用

---

## 🔍 发现的问题

### 1. 重复资源
- **手环图片**: 存在 `.jpg` 和 `.jpeg` 两个版本
  - `band1-4.jpg` (web版本使用)
  - `band1-4.jpeg` (web_dark版本使用)
- **建议**: 统一格式，优先使用WebP格式

### 2. 文件大小优化
- `real_pic1.png` (415KB) - 较大
- `real_pic2.png` (393KB) - 较大  
- `real_pic3.png` (622KB) - 很大
- **建议**: 转换为WebP格式以减小文件大小

### 3. 命名规范
- 部分文件使用数字命名 (`1.jpg`, `2.png` 等)
- **建议**: 使用更具描述性的文件名

---

## 📋 清理建议

### 立即删除
1. `earn_euro.webp` - 未使用且无明确用途

### 优化建议
1. 将大型PNG文件转换为WebP格式
2. 统一手环图片格式
3. 重命名数字命名的文件
4. 考虑将相似功能的图片合并

---

## 📊 统计摘要

- **总文件数**: 33个
- **已使用**: 32个 (97%)
- **未使用**: 1个 (3%)
- **文件类型分布**:
  - WebP: 12个 (36%)
  - PNG: 11个 (33%)
  - JPG/JPEG: 11个 (33%)
  - SVG: 5个 (15%)

*最后更新: 2024年12月*
