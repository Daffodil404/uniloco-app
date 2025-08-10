'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { MapPoint } from '@/types/travel';
import LocationInfoModal from './LocationInfoModal';

interface InteractiveMapProps {
  mapPoints: MapPoint[];
  onPointClick: (point: MapPoint) => void;
}

export default function InteractiveMap({ mapPoints, onPointClick }: InteractiveMapProps) {
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
            center: [35.6762, 139.6503], // 东京中心
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

          // 添加地图图层
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

          // 自定义地图样式
          const customStyle = `
            <style>
              .leaflet-container {
                background: #f8fafc;
              }
              .leaflet-control-zoom {
                display: none;
              }
              .leaflet-control-attribution {
                display: none;
              }
              .leaflet-popup-content-wrapper {
                background: rgba(0, 0, 0, 0.9);
                color: white;
                border-radius: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
              }
              .leaflet-popup-tip {
                background: rgba(0, 0, 0, 0.9);
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
    
    mapPoints.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: L.icon({
          iconUrl: '/static/locate.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        })
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
    // 这里可以触发打卡功能
    console.log('Check-in at:', point.name);
  };

  return (
    <div className="relative w-full h-full">
      {/* 地图容器 */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-2xl overflow-hidden"
      />

      {/* 地图控制按钮 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white shadow-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white shadow-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
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
    </div>
  );
} 