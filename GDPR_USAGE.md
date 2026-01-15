# GDPR组件使用说明

## 概述

`GDPRSection` 是一个符合欧盟GDPR标准的隐私政策组件，提供完整的隐私政策信息和Cookie设置功能。

## 功能特性

### ✅ 符合GDPR标准
- **数据收集说明**：明确列出收集的个人数据类型
- **法律基础**：基于GDPR Article 6的法律处理基础
- **用户权利**：完整覆盖GDPR Article 15-22的用户权利
- **数据保留政策**：明确的数据保留期限
- **联系方式**：提供数据保护官联系方式

### ✅ 交互功能
- **底部链接**：每个页面底部的"Privacy Policy & Cookie Settings"链接
- **Modal弹窗**：点击链接后显示详细的隐私政策内容
- **Cookie设置**：可切换的Cookie类型设置
- **响应式设计**：适配移动端和桌面端

## 使用方法

### 1. 导入组件

```tsx
import GDPRSection from '@/components/features/GDPRSection';
```

### 2. 在页面中使用

```tsx
export default function YourPage() {
  return (
    <div>
      {/* 页面内容 */}
      
      {/* 在页面底部添加GDPR组件 */}
      <GDPRSection />
    </div>
  );
}
```

### 3. 自定义样式（可选）

```tsx
<GDPRSection className="bg-gray-50" />
```

## 组件结构

### 底部链接
- 位置：页面最底部
- 样式：居中的灰色链接，带下划线
- 交互：点击打开Modal

### Modal内容
1. **数据收集** - 收集的个人数据类型
2. **数据用途** - 如何使用收集的数据
3. **法律基础** - GDPR处理基础
4. **数据共享** - 与第三方共享数据的情况
5. **数据保留** - 数据保留期限
6. **用户权利** - GDPR用户权利
7. **Cookie设置** - 可配置的Cookie选项
8. **联系方式** - 隐私相关联系方式

## 已集成页面

目前已在以下页面集成GDPR组件：

- ✅ `src/app/page.tsx` - 首页
- ✅ `src/app/web/events/page.tsx` - 活动页面

## 建议集成页面

建议在所有页面底部添加GDPR组件：

### Web页面
- `src/app/web/partnership/page.tsx`
- `src/app/web/token-economic/page.tsx`
- `src/app/web/play/page.tsx`
- `src/app/web/band/page.tsx`

### H5页面
- `src/app/h5/home/page.tsx`
- `src/app/h5/login/page.tsx`
- `src/app/h5/ai-chat/page.tsx`
- `src/app/h5/profile/page.tsx`
- 其他H5页面

## 自定义配置

### 修改联系方式
在 `GDPRSection.tsx` 中修改联系方式信息：

```tsx
<li><strong>Email:</strong> privacy@uniloco.com</li>
<li><strong>Data Protection Officer:</strong> dpo@uniloco.com</li>
<li><strong>Address:</strong> [Your Company Address]</li>
```

### 修改Cookie设置
在Modal的Cookie设置部分添加或修改Cookie类型：

```tsx
<div className="flex items-center justify-between p-3 bg-gray-50 rounded">
  <div>
    <p className="font-medium">Your Cookie Type</p>
    <p className="text-xs text-gray-500">Description</p>
  </div>
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
</div>
```

## 法律合规

### GDPR要求覆盖
- ✅ **透明度**：明确说明数据处理方式
- ✅ **同意机制**：Cookie设置的明确同意
- ✅ **用户权利**：完整的用户权利说明
- ✅ **数据最小化**：只收集必要数据
- ✅ **数据安全**：数据处理安全说明
- ✅ **问责制**：明确的责任主体

### 建议补充
1. **数据保护影响评估**：对于高风险数据处理
2. **数据泄露通知**：72小时内通知机制
3. **跨境数据传输**：如果涉及欧盟外数据传输
4. **自动化决策**：如果使用AI进行自动化决策

## 技术实现

### 依赖
- `@radix-ui/react-dialog` - Modal组件
- `React useState` - 状态管理
- `Tailwind CSS` - 样式

### 性能优化
- Modal内容懒加载
- 响应式设计
- 无障碍访问支持

## 更新维护

### 定期更新
- 每6个月检查GDPR合规性
- 根据业务变化更新数据处理说明
- 及时更新联系方式信息

### 版本控制
- 记录隐私政策的更新历史
- 保持版本号和时间戳
- 通知用户重要变更
