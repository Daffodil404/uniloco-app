// 通用类型定义

// 基础响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  code?: number;
}

// 分页类型
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 加载状态类型
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// 用户基础类型
export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  status: 'online' | 'offline' | 'away';
  createdAt: string;
  updatedAt: string;
}

// 文件上传类型
export interface UploadFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// 地理位置类型
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

// 时间范围类型
export interface TimeRange {
  start: string;
  end: string;
}

// 排序类型
export type SortOrder = 'asc' | 'desc';

// 筛选类型
export interface FilterParams {
  keyword?: string;
  category?: string;
  status?: string;
  dateRange?: TimeRange;
  sortBy?: string;
  sortOrder?: SortOrder;
}

// 移动端设备信息
export interface DeviceInfo {
  isMobile: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  screenWidth: number;
  screenHeight: number;
  userAgent: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 语言类型
export type Language = 'zh-CN' | 'en-US';

// 通用事件类型
export interface BaseEvent {
  id: string;
  type: string;
  timestamp: string;
  data?: unknown;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
} 