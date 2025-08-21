"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import type { ExperienceItem } from './types';

interface MapWIthRouteProps {
  currentMapView: '3D' | '2D';
  selectedCategory: string | null;
  allData: Record<string, ExperienceItem[]>;
  showMapDayControls: boolean;
  currentDayView: number;
  onToggleMap: () => void;
  onShowDayRoute: (day: number) => void;
}

export default function MapWIthRoute({
  currentMapView,
  selectedCategory,
  allData,
  showMapDayControls,
  currentDayView,
  onToggleMap,
  onShowDayRoute
}: MapWIthRouteProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<any[]>([]);

  const getLeaflet = () => {
    if (!leafletRef.current) throw new Error('Leaflet not initialized');
    return leafletRef.current;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const L = await import('leaflet');
        leafletRef.current = L;

        // Inject Leaflet CSS if missing
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
          link.crossOrigin = '';
          document.head.appendChild(link);
        }

        if (mapRef.current && !mapInstanceRef.current) {
          const mapInstance = L.map(mapRef.current, {
            center: [41.9028, 12.4964], // Rome center
            zoom: 13,
            zoomControl: false,
            attributionControl: false,
            dragging: true,
            touchZoom: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true
          });

          // Base layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
            minZoom: 3
          }).addTo(mapInstance);

          // Skin (same as other maps)
          const customStyle = `
            <style>
              .leaflet-control-zoom { display: none; }
              .leaflet-control-attribution { display: none; }
              .leaflet-popup-content-wrapper {
                background: linear-gradient(135deg, #fe585f 0%, #ff7a80 100%);
                color: white; border-radius: 16px; border: 3px solid #ffffff;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); z-index: 1000 !important;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }
              .leaflet-popup-tip { background: linear-gradient(135deg, #fe585f 0%, #ff7a80 100%); border: 2px solid #ffffff; }
              .leaflet-popup { z-index: 1000 !important; }
              .leaflet-popup-content { margin: 12px 16px; font-weight: 500; }
              .custom-number-marker { z-index: 100 !important; transition: all .3s cubic-bezier(.4,0,.2,1); }
              .custom-number-marker:hover { transform: scale(1.12); filter: drop-shadow(0 8px 16px rgba(0,0,0,.4)); }
              .leaflet-marker-icon { z-index: 100 !important; filter: drop-shadow(0 4px 8px rgba(0,0,0,.4)); transition: all .25s cubic-bezier(.4,0,.2,1); }
              .leaflet-marker-icon:hover { transform: scale(1.1); }
              .leaflet-container { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); z-index: 1 !important; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,.2); }
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
      } catch (err) {
        console.error('Failed to initialize map:', err);
      }
    };
    init();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render highlight markers for Rome + category markers if needed
  useEffect(() => {
    if (!map || !isMapLoaded || !leafletRef.current) return;
    const L = getLeaflet();

    // cleanup old
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createBadgeIcon = (label: string) =>
      L.divIcon({
        className: 'custom-number-marker',
        html: `
          <div style="width:44px;height:44px;background:#fe585f;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:12px;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;">
            ${label}
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -44]
      });

    // Rome highlights
    const highlights = [
      { name: 'Colosseum', lat: 41.8902, lng: 12.4922, label: '1' },
      { name: 'Palatine Hill', lat: 41.8894, lng: 12.4882, label: '2' },
      { name: 'Vatican City', lat: 41.9022, lng: 12.4539, label: '3' }
    ];

    highlights.forEach(h => {
      const marker = L.marker([h.lat, h.lng], { icon: createBadgeIcon(h.label) })
        .bindPopup(`<strong>${h.name}</strong>`)
        .addTo(map);
      markersRef.current.push(marker);
    });

    // Optionally render category markers from allData (faded to avoid clutter)
    Object.entries(allData).forEach(([category, items]) => {
      items.forEach(item => {
        const opacity = selectedCategory === category || !selectedCategory ? 0.8 : 0.4;
        const icon = L.divIcon({
          className: 'custom-number-marker',
          html: `
            <div style="width:28px;height:28px;background:#ffffff;border:2px solid rgba(0,0,0,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fe585f;font-weight:bold;font-size:12px;font-family:Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.15);opacity:${opacity};">
              •
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -28]
        });
        const m = L.marker([item.y ? 0 : 41.9028, item.x ? 0 : 12.4964], { icon });
        // Note: original allData uses percentage positions for a fake map; we avoid plotting them to real map. Keep them off by default.
        // You can later replace with real lat/lng when available.
        // For now, skip adding these to avoid wrong positions.
        // m.addTo(map); markersRef.current.push(m);
      });
    });
  }, [map, isMapLoaded, allData, selectedCategory]);

  return (
    <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 rounded-2xl overflow-hidden" />

      {/* Top-left view toggle (kept for consistency) */}
      <button
        onClick={onToggleMap}
        className="absolute top-3 md:top-5 left-3 md:left-5 z-50 bg-white/90 backdrop-blur-lg border border-gray-200 text-gray-700 px-3 md:px-5 py-2 md:py-3 rounded-full hover:bg-[#fe585f] hover:text-white transition-all text-xs md:text-sm shadow-lg"
      >
        {currentMapView === '3D' ? '🌍 2D' : '🌍 3D'}
      </button>

      {/* Day controls */}
      {showMapDayControls && (
        <div className="absolute top-16 md:top-20 right-3 md:right-5 bg-white/95 backdrop-blur-lg border border-gray-200 p-3 md:p-4 rounded-xl z-40 shadow-lg">
          {[1, 2, 3].map((d) => (
            <button
              key={d}
              className={`block w-full border border-gray-200 text-gray-700 p-1.5 md:p-2 ${d !== 3 ? 'mb-1.5 md:mb-2' : ''} rounded-lg text-xs transition-all ${
                currentDayView === d ? 'bg-[#fe585f] text-white border-[#fe585f]' : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => onShowDayRoute(d)}
            >
              Day {d}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


