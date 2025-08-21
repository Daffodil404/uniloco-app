"use client";

import { useState } from 'react';

interface ActivityItemProps {
  activity: {
    time: string;
    activity: string;
    emoji: string;
    id: string;
    selected: boolean;
    location: string;
    duration: string;
    price?: string;
    website?: string;
  };
  isInItinerary: boolean;
  onAddToItinerary: (activity: any) => void;
  onRemoveFromItinerary: (activityId: string) => void;
}

export default function ActivityItem({
  activity,
  isInItinerary,
  onAddToItinerary,
  onRemoveFromItinerary
}: ActivityItemProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState<'top' | 'bottom'>('top');

  const handleAddToItinerary = () => {
    onAddToItinerary(activity);
    setShowPopover(false);
  };

  const handleRemoveFromItinerary = () => {
    onRemoveFromItinerary(activity.id);
    setShowPopover(false);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={(e) => {
        // 检查上方空间是否足够
        const rect = e.currentTarget.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;
        
        // 如果上方空间不足，显示在下方
        if (spaceAbove < 200) {
          setPopoverPosition('bottom');
        } else {
          setPopoverPosition('top');
        }
        setShowPopover(true);
      }}
      onMouseLeave={() => setShowPopover(false)}
    >
      <div className="time-slot" style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', fontSize: '12px' }}>
        <div className="time" style={{ color: '#feca57', fontWeight: 'bold', minWidth: '90px', fontSize: '11px' }}>
          {activity.time}
        </div>
        <div className="activity" style={{ color: 'rgba(0, 0, 0, 0.9)', flex: 1 }}>
          <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
            {activity.emoji} {activity.activity}
          </div>
        </div>
      </div>

      {/* Hover Popover */}
      {showPopover && (
        <div className={`absolute left-0 z-50 ${
          popoverPosition === 'top' 
            ? 'bottom-full mb-2' 
            : 'top-full mt-2'
        }`}>
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg p-3 min-w-48 relative">
            {/* Arrow indicator */}
            <div className={`absolute w-0 h-0 border-l-4 border-r-4 border-transparent ${
              popoverPosition === 'top' 
                ? 'top-full border-t-4 border-t-white/95' 
                : 'bottom-full border-b-4 border-b-white/95'
            } left-4`}></div>
            
            <div className="text-sm font-semibold text-gray-800 mb-2">
              {activity.emoji} {activity.activity}
            </div>
            
            <div className="text-xs text-gray-600 mb-3">
              <div>📍 {activity.location}</div>
              <div>⏰ {activity.time}</div>
              <div>⏱️ {activity.duration}</div>
              {activity.price && <div>💰 {activity.price}</div>}
            </div>

            <div className="flex gap-2">
              {isInItinerary ? (
                <button
                  onClick={handleRemoveFromItinerary}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded-lg transition-colors"
                >
                  🗑️ Remove
                </button>
              ) : (
                <button
                  onClick={handleAddToItinerary}
                  className="flex-1 bg-[#fe5a5e] hover:bg-[#e54d55] text-white text-xs px-3 py-2 rounded-lg transition-colors"
                >
                  ➕ Add to Itinerary
                </button>
              )}
            </div>

            {activity.website && (
              <button
                onClick={() => window.open(activity.website, '_blank')}
                className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-2 rounded-lg transition-colors"
              >
                🌐 Visit Website
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
