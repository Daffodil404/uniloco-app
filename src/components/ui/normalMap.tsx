'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface NormalMapMarker {
  lat: number;
  lng: number;
  label?: string;
}

interface NormalMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: NormalMapMarker[];
  onMarkerClick?: (marker: NormalMapMarker) => void;
  className?: string;
  heightClassName?: string; // Tailwind height class, e.g., 'h-96'
  showControls?: boolean;
}

export default function NormalMap({
  center,
  zoom = 12,
  markers = [],
  onMarkerClick,
  className = '',
  heightClassName = 'h-80',
  showControls = true
}: NormalMapProps) {
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

  const stableOnMarkerClick = useCallback(onMarkerClick || (() => {}), [onMarkerClick]);

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
          // Create map
          const mapInstance = L.map(mapRef.current, {
            center: [center.lat, center.lng],
            zoom,
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

          // Skin (same as InteractiveMap)
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
              .custom-number-marker:hover { transform: scale(1.3) rotate(5deg); filter: drop-shadow(0 8px 16px rgba(0,0,0,.5)); }
              .leaflet-marker-icon { z-index: 100 !important; filter: drop-shadow(0 4px 8px rgba(0,0,0,.4)); transition: all .3s cubic-bezier(.4,0,.2,1); }
              .leaflet-marker-icon:hover { transform: scale(1.3) rotate(5deg); filter: drop-shadow(0 8px 16px rgba(0,0,0,.5)); }
              .leaflet-marker-shadow { z-index: 99 !important; }
              .leaflet-tile { filter: saturate(1.4) contrast(1.3) brightness(1.15) hue-rotate(8deg) sepia(.1); transition: all .3s ease; border-radius: 3px; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
              .leaflet-tile:hover { filter: saturate(1.6) contrast(1.4) brightness(1.2) hue-rotate(12deg) sepia(.15); transform: scale(1.02); }
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

  // Update center/zoom on prop change
  useEffect(() => {
    if (!map) return;
    map.setView([center.lat, center.lng], zoom);
  }, [map, center.lat, center.lng, zoom]);

  // Render markers
  useEffect(() => {
    if (!map || !isMapLoaded || !leafletRef.current) return;
    const L = getLeaflet();

    // cleanup old
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const createNumberIcon = (text: string) =>
      L.divIcon({
        className: 'custom-number-marker',
        html: `
          <div style="width:40px;height:40px;background:#fe585f;border:3px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:14px;font-family:Arial,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;">${text}</div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

    markers.forEach((mk, idx) => {
      const marker = L.marker([mk.lat, mk.lng], { icon: createNumberIcon(String(idx + 1)) });
      if (mk.label) marker.bindPopup(mk.label);
      marker.on('click', () => stableOnMarkerClick(mk));
      marker.addTo(map);
      markersRef.current.push(marker);
    });
  }, [map, isMapLoaded, markers, stableOnMarkerClick]);

  const handleZoomIn = () => { if (map) map.zoomIn(); };
  const handleZoomOut = () => { if (map) map.zoomOut(); };

  return (
    <div className={`relative w-full ${heightClassName} ${className}`}>
      <div ref={mapRef} className="absolute inset-0 rounded-2xl overflow-hidden" />

      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button
            onClick={handleZoomIn}
            className="w-12 h-12 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
            </svg>
          </button>
          <button
            onClick={handleZoomOut}
            className="w-12 h-12 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12h12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}


