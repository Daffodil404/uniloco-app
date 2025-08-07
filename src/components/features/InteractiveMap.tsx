'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { MapPoint } from '@/types/travel';
import LocationInfoModal from './LocationInfoModal';

interface InteractiveMapProps {
  mapPoints: MapPoint[];
  onPointClick: (point: MapPoint) => void;
  onSaveMap: () => void;
}

export default function InteractiveMap({ mapPoints, onPointClick, onSaveMap }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
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
          mapInstance.on('click', function (e) {
            console.log('Map clicked:', e.latlng);
            // 地图点击时不执行任何操作，让标记点击事件优先
          });

          // 自定义地图样式
          const customStyle = `
            <style>
              .leaflet-container {
                background: linear-gradient(135deg, #1e3a8a 0%, #065f46 100%);
              }
              .leaflet-control-zoom {
                display: none;
              }
              .leaflet-control-attribution {
                display: none;
              }
            </style>
          `;
          
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

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setMap(null);
      setIsMapLoaded(false);
    };
  }, []);

  // 添加标记点
  useEffect(() => {
    if (map && mapPoints.length > 0 && isMapLoaded && leafletRef.current) {
      console.log('Creating markers for', mapPoints.length, 'points');
      console.log('onPointClick callback:', onPointClick);
      
      const L = getLeaflet();
      
      // 清除之前的标记
      markers.forEach(marker => {
        if (map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      });
      
      const newMarkers: any[] = [];

      // 测试节点 - 使用与mapPoints相同的点击链路
      const testMarker = L.marker([35.6762, 139.6504], {
        title: 'test'
      }).addTo(map);

      testMarker.on('click', function (e: any) {
        console.log('Test marker clicked:', e);
        // 使用与mapPoints相同的点击链路
        const testPoint = mapPoints[0]; // 使用第一个mapPoint作为测试
        setSelectedPoint(testPoint);
        setIsLocationInfoOpen(true);
      });

      // TODO： mapPoints 的节点在点击时有问题，用测试节点代替
      // mapPoints.forEach((point) => {
      //   console.log('Creating marker for:', point.name, 'at:', point.lat, point.lng);
        
      //   // 使用默认图标，确保点击事件正常工作
      //   const marker = L.marker([point.lat, point.lng], {
      //     title: point.name
      //   }).addTo(map);

      //   console.log('Marker created for:', point.name, 'marker:', marker);

      //   // 添加点击事件 - 显示地点信息对话框
      //   marker.on('click', function (e: any) {
      //     console.log('MapPoint marker clicked:', point.name, e);
      //     // 显示地点信息对话框
      //     setSelectedPoint(point);
      //     setIsLocationInfoOpen(true);
      //   });

      //   // 添加悬停效果
      //   marker.on('mouseover', function (this: any) {
      //     console.log('Mouse over marker:', point.name);
      //     this.getElement().style.transform = 'scale(1.2)';
      //   });

      //   marker.on('mouseout', function (this: any) {
      //     console.log('Mouse out marker:', point.name);
      //     this.getElement().style.transform = 'scale(1)';
      //   });

      //   newMarkers.push(marker);
      // });

      newMarkers.push(testMarker);

      setMarkers(newMarkers);

      // 调整地图视图以显示测试标记
      if (newMarkers.length > 0) {
        // 直接设置地图中心到测试marker位置
        map.setView([35.6762, 139.6504], 13);
      }
    }
  }, [map, mapPoints, isMapLoaded, stableOnPointClick]);

  const handleSaveMap = () => {
    if (map) {
      // 使用html2canvas保存地图
      map.once('moveend', () => {
        // 这里可以集成html2canvas来保存地图
        console.log('Saving map as PNG...');
        // 实际实现时需要安装html2canvas: npm install html2canvas
      });
    }
  };

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
    stableOnPointClick(point);
  };

  return (
    <div className="w-full flex-1 bg-black/80 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white">Interactive Map</h2>
        <button
          onClick={onSaveMap}
          className="px-3 py-1.5 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-xs font-medium hover:shadow-lg transition-all"
        >
          Save Map
        </button>
      </div>
      
      {/* 地图容器 - 使用calc计算剩余高度 */}
      <div 
        ref={mapRef}
        className="w-full rounded-2xl relative overflow-hidden"
        style={{ 
          zIndex: 1,
          height: 'calc(100% - 60px)' // 减去标题区域的高度
        }}
      >
        {/* 地点信息对话框 */}
        <LocationInfoModal
          isOpen={isLocationInfoOpen}
          onClose={handleLocationInfoClose}
          selectedPoint={selectedPoint}
          onCheckIn={handleCheckIn}
        />
      </div>
      
      {/* 地图控制按钮 */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2" style={{ zIndex: 1000 }}>
        <button 
          onClick={handleZoomIn}
          className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* 自定义样式 */}
      <style jsx>{`
        .leaflet-container {
          background: linear-gradient(135deg, #1e3a8a 0%, #065f46 100%) !important;
        }
        .leaflet-control-zoom {
          display: none !important;
        }
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </div>
  );
} 