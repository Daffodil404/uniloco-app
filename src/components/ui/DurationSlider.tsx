'use client';

import { useState, useEffect } from 'react';

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
  const [currentRange, setCurrentRange] = useState<DurationRange | null>(null); // 默认不选择任何选项

  // 根据标签找到对应的范围
  useEffect(() => {
    if (selectedRange?.label) {
      const foundRange = durationRanges.find(range => range.label === selectedRange.label);
      if (foundRange) {
        setCurrentRange(foundRange);
      }
    }
  }, [selectedRange]);

  const handleRangeSelect = (range: DurationRange) => {
    setCurrentRange(range);
    onSelect(range);
  };

  return (
    <div className="w-full">
      {/* 持续时间选择按钮 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {durationRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => handleRangeSelect(range)}
            className={`
              relative p-4 rounded-2xl text-left transition-all duration-200
              ${currentRange && range.min === currentRange.min && range.max === currentRange.max
                ? 'bg-gradient-to-r from-[#fe5a5e]/10 to-[#ff7a80]/10 border-2 border-[#fe5a5e] text-slate-800 shadow-lg'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{range.label}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {range.min === 1 && range.max === 3 && 'Short getaway'}
                  {range.min === 4 && range.max === 7 && 'Week vacation'}
                  {range.min === 8 && range.max === 14 && 'Extended trip'}
                  {range.min === 15 && range.max === 30 && 'Long adventure'}
                </div>
              </div>
              {currentRange && range.min === currentRange.min && range.max === currentRange.max && (
                <div className="w-5 h-5 bg-[#fe5a5e] rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 当前选择显示 */}
      <div className="text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${
          currentRange 
            ? 'bg-gradient-to-r from-[#fe5a5e]/10 to-[#ff7a80]/10 border-[#fe5a5e]/30' 
            : 'bg-slate-50 border-slate-200'
        }`}>
          <svg className={`w-4 h-4 ${currentRange ? 'text-[#fe5a5e]' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`font-medium ${currentRange ? 'text-slate-800' : 'text-slate-500'}`}>
            {currentRange?.label || 'Select duration'}
          </span>
        </div>
      </div>
    </div>
  );
} 