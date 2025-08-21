'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { MapPoint } from '@/types/travel';
import LocationInfoModal from './LocationInfoModal';
import CheckInModal from './CheckInModal';

interface InteractiveMapProps {
  mapPoints: MapPoint[];
  onPointClick: (point: MapPoint) => void;
  onCheckInRequest?: (point: MapPoint) => void;
}

export default function InteractiveMap({ mapPoints, onPointClick, onCheckInRequest }: InteractiveMapProps) {
  
  // 本地状态管理
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [checkInPoint, setCheckInPoint] = useState<MapPoint | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);
  const [isLocationInfoOpen, setIsLocationInfoOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  // 稳定的回调函数引用
  const stableOnPointClick = useCallback(onPointClick, [onPointClick]);
  const stableOnCheckInRequest = useCallback(onCheckInRequest || (() => {}), [onCheckInRequest]);

  // 统一的Leaflet实例获取函数
  const getLeaflet = () => {
    if (!leafletRef.current) {
      throw new Error('Leaflet not initialized');
    }
    return leafletRef.current;
  };

  useEffect(() => {
    // 动态导入Leaflet - 只导入一次
    const initMap = async () => {
      try {
        const L = await import('leaflet');
        leafletRef.current = L;
        
        // 导入Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        if (mapRef.current && !mapInstanceRef.current) {
          // 清理之前的实例
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }

          // 创建地图实例
          const mapInstance = L.map(mapRef.current, {
            center: [49.6117, 6.1319], // 卢森堡中心
            zoom: 12,
            zoomControl: false,
            attributionControl: false,
            dragging: true,
            touchZoom: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
          });

          // 添加地图图层 - 使用卡通风格
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 3
          }).addTo(mapInstance);

          // 添加地图点击事件处理，防止干扰标记点击
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mapInstance.on('click', function (e: any) {
            console.log('Map clicked:', e.latlng);
            // 地图点击时不执行任何操作，让标记点击事件优先
          });

          // 自定义地图样式 - 卡通风格
          const customStyle = `
            <style>
              .leaflet-control-zoom {
                display: none;
              }
              .leaflet-control-attribution {
                display: none;
              }
              .leaflet-popup-content-wrapper {
                background: linear-gradient(135deg, #fe5a5e 0%, #ff7a80 100%);
                color: white;
                border-radius: 16px;
                border: 3px solid #ffffff;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                z-index: 1000 !important;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }
              .leaflet-popup-tip {
                background: linear-gradient(135deg, #fe5a5e 0%, #ff7a80 100%);
                border: 2px solid #ffffff;
              }
              .leaflet-popup {
                z-index: 1000 !important;
              }
              .leaflet-popup-content {
                margin: 12px 16px;
                font-weight: 500;
              }
              .custom-number-marker {
                z-index: 100 !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .custom-number-marker:hover {
                transform: scale(1.3) rotate(5deg);
                filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
              }
              .leaflet-marker-icon {
                z-index: 100 !important;
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              }
              .leaflet-marker-icon:hover {
                transform: scale(1.3) rotate(5deg);
                filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
              }
              .leaflet-marker-shadow {
                z-index: 99 !important;
              }
              /* 地图瓦片卡通化效果 */
              .leaflet-tile {
                filter: saturate(1.4) contrast(1.3) brightness(1.15) hue-rotate(8deg) sepia(0.1);
                transition: all 0.3s ease;
                border-radius: 3px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .leaflet-tile:hover {
                filter: saturate(1.6) contrast(1.4) brightness(1.2) hue-rotate(12deg) sepia(0.15);
                transform: scale(1.02);
              }
              /* 地图容器卡通化 */
              .leaflet-container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 1 !important;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
              }
            </style>
          `;

          // 添加自定义样式
          if (!document.querySelector('#leaflet-custom-style')) {
            const styleElement = document.createElement('div');
            styleElement.id = 'leaflet-custom-style';
            styleElement.innerHTML = customStyle;
            document.head.appendChild(styleElement);
          }

          mapInstanceRef.current = mapInstance;
          setMap(mapInstance);
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    initMap();

    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 添加标记点
  useEffect(() => {
    if (!map || !isMapLoaded || !leafletRef.current) return;

    const L = getLeaflet();
    
    // 清理之前的标记
    markers.forEach(marker => marker.remove());
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newMarkers: any[] = [];
    
    // 创建简单的数字标记
    const createNumberIcon = (number: number) => {
      return L.divIcon({
        className: 'custom-number-marker',
        html: `
          <div style="
            width: 40px; 
            height: 40px; 
            background: #fe5a5e; 
            border: 3px solid #FFFFFF; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold; 
            font-size: 16px; 
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            ${number}
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
    };
    
    mapPoints.forEach((point, index) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: createNumberIcon(index + 1)
      });

      // 添加点击事件
      marker.on('click', () => {
        setSelectedPoint(point);
        setIsLocationInfoOpen(true);
        stableOnPointClick(point);
      });

      marker.addTo(map);
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, isMapLoaded, mapPoints, stableOnPointClick]); // 移除 markers 依赖以避免无限循环

  // 地图控制按钮
  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  };

  const handleLocationInfoClose = () => {
    setIsLocationInfoOpen(false);
    setSelectedPoint(null);
  };

  const handleCheckIn = (point: MapPoint) => {
    // 关闭位置信息模态框
    setIsLocationInfoOpen(false);
    setSelectedPoint(null);
    
    // 直接打开本地打卡模态框
    setCheckInPoint(point);
    setIsCheckInModalOpen(true);
  };


  
  return (
    <div className="relative w-full h-full">
      {/* 地图容器 */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-2xl overflow-hidden"
      />

      {/* 地图控制按钮 - 卡通风格 */}
      <div className="absolute top-4 right-4 flex flex-col gap-3">
        <button
          onClick={handleZoomIn}
          className="w-12 h-12 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-12 h-12 bg-gradient-to-r from-[#fe5a5e] to-[#ff7a80] rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
          </svg>
        </button>
      </div>

      {/* 位置信息弹窗 */}
      <LocationInfoModal
        isOpen={isLocationInfoOpen}
        onClose={handleLocationInfoClose}
        selectedPoint={selectedPoint}
        onCheckIn={handleCheckIn}
      />

      {/* 打卡Modal */}
      <CheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => {
          setIsCheckInModalOpen(false);
          setCheckInPoint(null);
        }}
        selectedPoint={checkInPoint}
        onSubmit={(data) => {
          setIsCheckInModalOpen(false);
          setCheckInPoint(null);
          // 这里可以添加成功提示或其他逻辑
        }}
      />
    </div>
  );
} 
