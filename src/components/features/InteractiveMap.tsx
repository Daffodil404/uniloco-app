'use client';

import { useState, useRef, useEffect } from 'react';
import type { MapPoint } from '@/types/travel';

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

  useEffect(() => {
    // 动态导入Leaflet
    const initMap = async () => {
      try {
        const L = await import('leaflet');
        
        // 导入Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        if (mapRef.current && !map) {
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

          setMap(mapInstance);
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // 添加标记点
  useEffect(() => {
    if (map && mapPoints.length > 0 && isMapLoaded) {
      // 清除之前的标记
      markers.forEach(marker => map.removeLayer(marker));
      
      const newMarkers: any[] = [];
      
      mapPoints.forEach((point) => {
        const L = require('leaflet');
        
        // 创建自定义图标
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="w-6 h-6 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-full shadow-lg flex items-center justify-center border-2 border-white">
              ${getPointIcon(point.type)}
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        // 创建标记
        const marker = L.marker([point.lat, point.lng], {
          icon: customIcon,
          title: point.name
        }).addTo(map);

        // 添加点击事件
        marker.on('click', () => {
          onPointClick(point);
        });

        // 添加悬停效果
        marker.on('mouseover', function(this: any) {
          this.getElement().style.transform = 'scale(1.2)';
        });

        marker.on('mouseout', function(this: any) {
          this.getElement().style.transform = 'scale(1)';
        });

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);

      // 调整地图视图以显示所有标记
      if (newMarkers.length > 0) {
        const L = require('leaflet');
        const group = L.featureGroup(newMarkers);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [map, mapPoints, isMapLoaded]);

  const getPointIcon = (type: MapPoint['type']) => {
    switch (type) {
      case 'attraction':
        return `
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `;
      case 'restaurant':
        return `
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
          </svg>
        `;
      case 'hotel':
        return `
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 13c1.65 0 3 1.35 3 3H4c0-1.65 1.35-3 3-3zm12-2h-8v7H4V5H2v15h2v-3h16v3h2v-9c0-2.21-1.79-4-4-4zm2 8h-8V9h6c1.1 0 2 .9 2 2v4z"/>
          </svg>
        `;
      default:
        return `
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `;
    }
  };

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
        className="w-full h-96 rounded-2xl relative overflow-hidden"
        style={{ zIndex: 1 }}
      />
      
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
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-marker div {
          transition: all 0.2s ease;
        }
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