"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import InteractiveMap from "@/components/features/InteractiveMap";
import type { MapPoint } from "@/types/travel";

// 罗马中心坐标 (Roma, Italy)
const ROME_CENTER: [number, number] = [41.9028, 12.4964];

// 关键景点（Mock 数据，符合原型阶段规范）
const ROME_POINTS: readonly MapPoint[] = [
  {
    id: "colosseum",
    name: "罗马斗兽场",
    lat: 41.8902,
    lng: 12.4922,
    type: "attraction",
    notes: "世界最著名的古罗马圆形竞技场",
    rating: 4.8,
    openingHours: "08:30-19:15",
  },
  {
    id: "palatine",
    name: "帕拉蒂尼山",
    lat: 41.8894,
    lng: 12.4894,
    type: "attraction",
    notes: "古罗马的发源地之一，俯瞰广场与斗兽场",
    rating: 4.7,
  },
  {
    id: "trevi",
    name: "特莱维许愿池",
    lat: 41.9009,
    lng: 12.4833,
    type: "attraction",
    notes: "向喷泉投币许愿的浪漫地标",
    rating: 4.7,
  },
  {
    id: "pantheon",
    name: "万神殿",
    lat: 41.8986,
    lng: 12.4768,
    type: "attraction",
    notes: "保存完好的古罗马神庙，穹顶震撼",
    rating: 4.8,
  },
] as const;

export default function Page() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const mapPoints = useMemo(() => ROME_POINTS.slice(), []);

  const handlePointClick = useCallback((point: MapPoint) => {
    // 原型阶段：点击点位时只做轻量反馈
    // eslint-disable-next-line no-console
    console.log("Point clicked:", point.name);
  }, []);

  const handleMenuSelect = (menuKey: string) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
    // 切换菜单时重置到第一项
    setCurrentItemIndex(0);
  };

  const handlePrevItem = () => {
    setCurrentItemIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextItem = () => {
    setCurrentItemIndex((prev) => Math.min(4, prev + 1)); // 最多5个项目，索引0-4
  };

  // 选中菜单后自动滚动到卡片区域
  const cardSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activeMenu && cardSectionRef.current) {
      // 等待一帧以确保节点挂载并计算高度
      requestAnimationFrame(() => {
        cardSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [activeMenu]);

  return (
    <div className="min-h-screen bg-[#F9F7F5]">
      {/* 地图和菜单在同一水平面，使用 flex 布局 */}
      <div className="flex flex-col h-screen">
        {/* 地图区域：占据剩余空间 */}
        <div className="flex-1 p-4">
          <div className="h-full rounded-2xl overflow-hidden shadow-md">
            <InteractiveMap
              mapPoints={mapPoints}
              onPointClick={handlePointClick}
              center={ROME_CENTER}
              zoom={14}
            />
          </div>
        </div>

        {/* 菜单区域：固定高度，与地图同 z-index */}
        <div className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-[#E8E8E8]">
          <div className="px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)_+_12px)]">
            <div className="flex items-center justify-between gap-2">
              {[
                { key: "delicacy", emoji: "🍽️", label: "美食" },
                { key: "attraction", emoji: "🏛️", label: "景点" },
                { key: "service", emoji: "🛎️", label: "服务" },
                { key: "scripted", emoji: "🎭", label: "脚本" },
                { key: "activities", emoji: "🎪", label: "活动" },
              ].map((item) => {
                const selected = activeMenu === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleMenuSelect(item.key)}
                    className={
                      "flex flex-col items-center justify-center rounded-xl px-3 py-2 min-w-14 transition-all active:scale-95 " +
                      (selected
                        ? "bg-[#E8E8E8]/30 shadow-inner text-[#333333]"
                        : "text-[#333333]")
                    }
                    aria-pressed={selected}
                  >
                    <span className="text-xl leading-none mb-1">{item.emoji}</span>
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 选中菜单下的内容卡片：单卡片展示，带翻页按钮 */}
      {activeMenu && (
        <div ref={cardSectionRef} className="bg-white border-t border-[#E8E8E8]">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-[#333333]">
                {activeMenu === "delicacy" && "🍽️ 美食推荐"}
                {activeMenu === "attraction" && "🏛️ 热门景点"}
                {activeMenu === "service" && "🛎️ 专业服务"}
                {activeMenu === "scripted" && "🎭 沉浸体验"}
                {activeMenu === "activities" && "🎪 精彩活动"}
              </div>
              <div className="text-xs text-[#9B9B9B]">
                {currentItemIndex + 1} / 5
              </div>
            </div>
            
            {/* 单卡片展示区域 */}
            <div className="relative">
              {/* 当前显示的卡片 */}
              <div className="bg-[#F9F7F5] rounded-xl p-4 border border-[#E8E8E8]">
                <div className="h-20 rounded-lg bg-gradient-to-r from-[#4A90E2]/20 to-[#66D2A0]/20 mb-3" />
                <div className="text-sm font-medium text-[#333333] mb-1">
                  {activeMenu === "delicacy" && `餐厅 ${currentItemIndex + 1}`}
                  {activeMenu === "attraction" && `景点 ${currentItemIndex + 1}`}
                  {activeMenu === "service" && `服务 ${currentItemIndex + 1}`}
                  {activeMenu === "scripted" && `体验 ${currentItemIndex + 1}`}
                  {activeMenu === "activities" && `活动 ${currentItemIndex + 1}`}
                </div>
                <div className="text-xs text-[#9B9B9B]">
                  {activeMenu === "delicacy" && "⭐⭐⭐⭐⭐ 4.8/5 · 距离 0.3km"}
                  {activeMenu === "attraction" && "⭐⭐⭐⭐⭐ 4.8/5 · 开放中"}
                  {activeMenu === "service" && "⭐⭐⭐⭐ 4.6/5 · €120/团队"}
                  {activeMenu === "scripted" && "⭐⭐⭐⭐ 4.5/5 · 沉浸式体验"}
                  {activeMenu === "activities" && "⭐⭐⭐⭐⭐ 4.8/5 · 今日活动"}
                </div>
              </div>

              {/* 翻页按钮 */}
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={handlePrevItem}
                  disabled={currentItemIndex === 0}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    currentItemIndex === 0
                      ? "bg-[#E8E8E8] text-[#9B9B9B] cursor-not-allowed"
                      : "bg-[#4A90E2] text-white active:scale-95"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* 页面指示器 */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentItemIndex ? "bg-[#4A90E2]" : "bg-[#E8E8E8]"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextItem}
                  disabled={currentItemIndex === 4}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    currentItemIndex === 4
                      ? "bg-[#E8E8E8] text-[#9B9B9B] cursor-not-allowed"
                      : "bg-[#4A90E2] text-white active:scale-95"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
