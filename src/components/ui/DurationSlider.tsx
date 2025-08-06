'use client';

import { useState, useEffect, useRef } from 'react';

interface DurationRange {
  min: number;
  max: number;
  label: string;
}

interface DurationSliderProps {
  onSelect: (range: DurationRange) => void;
  selectedRange?: DurationRange;
}

const durationRanges: DurationRange[] = [
  { min: 1, max: 3, label: '1-3 days' },
  { min: 4, max: 7, label: '4-7 days' },
  { min: 8, max: 14, label: '8-14 days' },
  { min: 15, max: 30, label: '15+ days' },
];

export default function DurationSlider({ onSelect, selectedRange }: DurationSliderProps) {
  const [currentRange, setCurrentRange] = useState<DurationRange>(durationRanges[1]); // 默认选择4-7天
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRange) {
      setCurrentRange(selectedRange);
    }
  }, [selectedRange]);

  // 计算滑块位置
  const getSliderPosition = (range: DurationRange) => {
    const index = durationRanges.findIndex(r => r.min === range.min);
    const position = (index / (durationRanges.length - 1)) * 100;
    // 调试信息：移除这行在生产环境中
    // console.log(`Range ${range.label}: index=${index}, position=${position}%`);
    return position;
  };

  // 根据位置计算范围
  const getRangeFromPosition = (position: number) => {
    const clampedPosition = Math.max(0, Math.min(100, position));
    const index = Math.round((clampedPosition / 100) * (durationRanges.length - 1));
    return durationRanges[Math.max(0, Math.min(index, durationRanges.length - 1))];
  };

  const handleRangeSelect = (range: DurationRange) => {
    setCurrentRange(range);
    onSelect(range);
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const position = (clickX / rect.width) * 100;
    const newRange = getRangeFromPosition(position);
    
    setCurrentRange(newRange);
    onSelect(newRange);
  };

  const handleSliderMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragPosition(e.clientX);
  };

  const handleSliderMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    const newRange = getRangeFromPosition(position);
    
    setCurrentRange(newRange);
  };

  const handleSliderMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onSelect(currentRange);
    }
  };

  // 触摸事件处理
  const handleSliderTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragPosition(e.touches[0].clientX);
  };

  const handleSliderTouchMove = (e: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const position = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    const newRange = getRangeFromPosition(position);
    
    setCurrentRange(newRange);
  };

  const handleSliderTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      onSelect(currentRange);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleSliderMouseMove);
      document.addEventListener('mouseup', handleSliderMouseUp);
      document.addEventListener('touchmove', handleSliderTouchMove, { passive: false });
      document.addEventListener('touchend', handleSliderTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleSliderMouseMove);
        document.removeEventListener('mouseup', handleSliderMouseUp);
        document.removeEventListener('touchmove', handleSliderTouchMove);
        document.removeEventListener('touchend', handleSliderTouchEnd);
      };
    }
  }, [isDragging, currentRange]);

  const getRangeColor = (range: DurationRange) => {
    if (selectedRange?.min === range.min && selectedRange?.max === range.max) {
      return 'bg-gradient-to-r from-[#FF9E4A]/20 to-[#FFB366]/20 border-2 border-[#FF9E4A] text-white shadow-lg';
    }
    return 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20';
  };

  return (
    <div className="w-full">
      {/* 当前选择显示 */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-white mb-2">
          {currentRange.min === 15 ? '15+' : `${currentRange.min}-${currentRange.max}`}
        </div>
        <div className="text-white/80 text-base">days</div>
      </div>

      {/* 滑块容器 */}
      <div className="relative mb-6 px-2">
        {/* 滑块轨道 */}
        <div 
          ref={sliderRef}
          className="w-full h-3 bg-white/20 rounded-full relative cursor-pointer touch-none"
          onClick={handleSliderClick}
        >
          {/* 滑块 */}
          <div 
            className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 ${
              isDragging ? 'scale-110 shadow-xl' : ''
            }`}
            style={{
              left: `${getSliderPosition(currentRange)}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={handleSliderMouseDown}
            onTouchStart={handleSliderTouchStart}
          />
          
          {/* 滑块轨道上的标记点 */}
          {durationRanges.map((range, index) => (
            <div
              key={range.min}
              className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                currentRange.min === range.min ? 'bg-[#FF9E4A] scale-125' : 'bg-white/40'
              }`}
              style={{
                left: `${getSliderPosition(range)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>
      </div>

      {/* 范围选项 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {durationRanges.map((range) => (
          <button
            key={range.min}
            onClick={() => handleRangeSelect(range)}
            className={`
              relative p-3 rounded-xl text-center transition-all duration-200 border-2
              ${getRangeColor(range)}
            `}
          >
            <div className="font-medium text-xs">{range.label}</div>
            {selectedRange?.min === range.min && selectedRange?.max === range.max && (
              <div className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#FF9E4A] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 建议文本 */}
      <div className="text-center">
        <p className="text-white/60 text-xs">
          {currentRange.min <= 3 && 'Perfect for a weekend getaway'}
          {currentRange.min >= 4 && currentRange.max <= 7 && 'Great for a week-long adventure'}
          {currentRange.min >= 8 && currentRange.max <= 14 && 'Ideal for an extended vacation'}
          {currentRange.min >= 15 && 'Perfect for a long-term exploration'}
        </p>
      </div>
    </div>
  );
} 