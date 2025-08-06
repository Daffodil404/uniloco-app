// 应用常量定义

// 应用信息
export const APP_CONFIG = {
  name: 'UniLoco App',
  version: '1.0.0',
  description: '移动端应用',
  author: 'UniLoco Team',
  website: 'https://uniloco.app'
} as const;

// API 配置
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryTimes: 3,
  retryDelay: 1000
} as const;

// 路由配置
export const ROUTES = {
  home: '/',
  debug: '/debug',
  profile: '/profile',
  settings: '/settings',
  about: '/about'
} as const;

// 移动端配置
export const MOBILE_CONFIG = {
  minTouchTarget: 44, // 最小触摸目标尺寸
  safeAreaTop: 'env(safe-area-inset-top)',
  safeAreaBottom: 'env(safe-area-inset-bottom)',
  defaultPadding: 16,
  defaultMargin: 8
} as const;

// 主题配置
export const THEME_CONFIG = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999
  }
} as const;

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
} as const;

// 存储键名
export const STORAGE_KEYS = {
  user: 'uniloco_user',
  settings: 'uniloco_settings',
  theme: 'uniloco_theme',
  language: 'uniloco_language',
  token: 'uniloco_token',
  cache: 'uniloco_cache'
} as const;

// 事件类型
export const EVENT_TYPES = {
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  ERROR: 'error'
} as const;

// 状态枚举
export const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  IDLE: 'idle'
} as const;

// 用户状态
export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  BUSY: 'busy'
} as const;

// 文件类型
export const FILE_TYPES = {
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv'],
  AUDIO: ['mp3', 'wav', 'aac', 'ogg'],
  DOCUMENT: ['pdf', 'doc', 'docx', 'txt'],
  ALL: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'avi', 'mov', 'wmv', 'mp3', 'wav', 'aac', 'ogg', 'pdf', 'doc', 'docx', 'txt']
} as const;

// 验证规则
export const VALIDATION_RULES = {
  phone: /^1[3-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/
} as const;

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  VALIDATION_ERROR: '输入信息有误，请检查后重试',
  PERMISSION_ERROR: '权限不足，请登录后重试',
  NOT_FOUND: '请求的资源不存在',
  TIMEOUT: '请求超时，请稍后重试',
  UNKNOWN: '未知错误，请稍后重试'
} as const;

// 成功消息
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: '保存成功',
  DELETE_SUCCESS: '删除成功',
  UPDATE_SUCCESS: '更新成功',
  CREATE_SUCCESS: '创建成功',
  LOGIN_SUCCESS: '登录成功',
  LOGOUT_SUCCESS: '退出成功'
} as const;

// 加载文本
export const LOADING_TEXT = {
  LOADING: '加载中...',
  SAVING: '保存中...',
  UPLOADING: '上传中...',
  PROCESSING: '处理中...',
  SEARCHING: '搜索中...',
  REFRESHING: '刷新中...'
} as const;

// 分页配置
export const PAGINATION_CONFIG = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  maxPageSize: 100
} as const;

// 缓存配置
export const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000, // 5分钟
  maxSize: 100,
  cleanupInterval: 10 * 60 * 1000 // 10分钟
} as const; 