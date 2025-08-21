"use client";

import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';

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
  const [open, setOpen] = useState(false);

  const handleAddToItinerary = () => {
    onAddToItinerary(activity);
    setOpen(false);
  };

  const handleRemoveFromItinerary = () => {
    onRemoveFromItinerary(activity.id);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="time-slot cursor-pointer" style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', fontSize: '12px' }}>
          <div className="time" style={{ color: '#feca57', fontWeight: 'bold', minWidth: '90px', fontSize: '11px' }}>
            {activity.time}
          </div>
          <div className="activity" style={{ color: 'rgba(0, 0, 0, 0.9)', flex: 1 }}>
            <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
              {activity.emoji} {activity.activity}
            </div>
          </div>
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50"
          sideOffset={5}
          align="start"
          side="top"
        >
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-lg p-3 min-w-48 relative">
            {/* Arrow indicator */}
            <Popover.Arrow className="fill-white/95" />
            
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

          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
