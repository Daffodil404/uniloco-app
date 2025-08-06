'use client';

import { useState, useRef, useEffect } from 'react';
import type { MapPoint } from '@/types/travel';

interface InteractiveMapProps {
  mapPoints: MapPoint[];
  onPointClick: (point: MapPoint) => void;
  onSaveMap: () => void;
}

export default function InteractiveMap({ mapPoints, onPointClick, onSaveMap }: InteractiveMapProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setMapOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const getPointPosition = (point: MapPoint) => {
    // 简化的坐标转换，实际项目中应该使用真实的地图API
    const x = ((point.lng + 180) / 360) * 100;
    const y = ((90 - point.lat) / 180) * 100;
    
    return {
      left: `${x + mapOffset.x / 10}%`,
      top: `${y + mapOffset.y / 10}%`
    };
  };

  const getPointIcon = (type: MapPoint['type']) => {
    switch (type) {
      case 'attraction':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        );
      case 'restaurant':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
          </svg>
        );
      case 'hotel':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 13c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3zm12-2h-8v7H4V5H2v15h2v-3h16v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        );
    }
  };

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Interactive Map</h2>
        <button
          onClick={onSaveMap}
          className="px-4 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
        >
          Save Map
        </button>
      </div>
      
      {/* 地图容器 */}
      <div 
        ref={mapRef}
        className="w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        {/* 地图背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20"></div>
        
        {/* 地图网格线 */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* 地图标记点 */}
        {mapPoints.map((point) => {
          const position = getPointPosition(point);
          return (
            <button
              key={point.id}
              onClick={() => onPointClick(point)}
              className="absolute w-6 h-6 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 group"
              style={position}
            >
              <div className="w-full h-full bg-white rounded-full opacity-20 flex items-center justify-center">
                {getPointIcon(point.type)}
              </div>
              
              {/* 悬停提示 */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {point.name}
              </div>
            </button>
          );
        })}
        
        {/* 地图控制按钮 */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 