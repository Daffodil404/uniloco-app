'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRange) {
      setCurrentRange(selectedRange);
    }
  }, [selectedRange]);

  // 根据标签找到对应的范围
  useEffect(() => {
    if (selectedRange?.label) {
      const foundRange = durationRanges.find(range => range.label === selectedRange.label);
      if (foundRange) {
        setCurrentRange(foundRange);
      }
    }
  }, [selectedRange]);

  // 计算滑块位置
  const getSliderPosition = (range: DurationRange) => {
    const index = durationRanges.findIndex(r => r.min === range.min);
    const position = (index / (durationRanges.length - 1)) * 100;
    return position;
  };

  // 根据位置计算范围
  const getRangeFromPosition = (position: number) => {
    const clampedPosition = Math.max(0, Math.min(100, position));
    const index = Math.round((clampedPosition / 100) * (durationRanges.length - 1));
    return durationRanges[Math.max(0, Math.min(index, durationRanges.length - 1))];
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

  const handleSliderMouseDown = () => {
    setIsDragging(true);
  };

  const handleSliderMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const position = Math.max(0, Math.min(100, (mouseX / rect.width) * 100));
    const newRange = getRangeFromPosition(position);
    
    setCurrentRange(newRange);
  }, [isDragging]);

  const handleSliderMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onSelect(currentRange);
    }
  }, [isDragging, onSelect, currentRange]);

  // 触摸事件处理
  const handleSliderTouchStart = () => {
    setIsDragging(true);
  };

  const handleSliderTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const position = Math.max(0, Math.min(100, (touchX / rect.width) * 100));
    const newRange = getRangeFromPosition(position);
    
    setCurrentRange(newRange);
  }, [isDragging]);

  const handleSliderTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onSelect(currentRange);
    }
  }, [isDragging, onSelect, currentRange]);

  // 添加和移除事件监听器
  useEffect(() => {
    const handleMouseMove = handleSliderMouseMove;
    const handleMouseUp = handleSliderMouseUp;
    const handleTouchMove = handleSliderTouchMove;
    const handleTouchEnd = handleSliderTouchEnd;

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleSliderMouseMove, handleSliderMouseUp, handleSliderTouchMove, handleSliderTouchEnd]);

  return (
    <div className="w-full">
      {/* 滑块容器 */}
      <div 
        ref={sliderRef}
        className="relative w-full h-16 bg-white/10 rounded-2xl p-2 cursor-pointer"
        onClick={handleSliderClick}
        onMouseDown={handleSliderMouseDown}
        onTouchStart={handleSliderTouchStart}
      >
        {/* 背景轨道 */}
        <div className="absolute inset-2 bg-white/20 rounded-xl"></div>
        
        {/* 滑块 */}
        <div 
          className="absolute top-2 bottom-2 w-8 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] rounded-lg shadow-lg transition-all duration-200"
          style={{ 
            left: `${getSliderPosition(currentRange)}%`,
            transform: 'translateX(-50%)'
          }}
        ></div>
        
        {/* 范围标签 */}
        <div className="absolute inset-0 flex items-center justify-between px-4">
          {durationRanges.map((range) => (
            <div
              key={range.label}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                range.min === currentRange.min && range.max === currentRange.max
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white/60'
              }`}
            >
              {range.label}
            </div>
          ))}
        </div>
      </div>

      {/* 当前选择显示 */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9E4A]/20 to-[#FFB366]/20 rounded-xl border border-[#FF9E4A]/30">
          <svg className="w-4 h-4 text-[#FF9E4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white font-medium">{currentRange.label}</span>
        </div>
      </div>
    </div>
  );
} 