'use client';

import { useState, useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  tabLabel: string;
}

export default function Drawer({ isOpen, onClose, children, title, tabLabel }: DrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* 抽屉标签 */}
      <button
        onClick={() => setIsAnimating(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 z-40 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <span className="font-medium text-sm">{tabLabel}</span>
      </button>

      {/* 抽屉背景遮罩 */}
      {isAnimating && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        />
      )}

      {/* 抽屉内容 */}
      {isAnimating && (
        <div
          className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm rounded-t-3xl border-t border-white/20 z-50 transition-transform duration-300 ease-out ${
            isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ maxHeight: '80vh' }}
        >
          {/* 抽屉头部 */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 抽屉内容区域 */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
            {children}
          </div>
        </div>
      )}
    </>
  );
} 