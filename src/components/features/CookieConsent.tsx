'use client';

import { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';

interface CookieConsentProps {
  mode?: 'fixed' | 'popover'; // fixed: 右下角固定显示, popover: 点击触发
  isOpen?: boolean; // 用于popover模式的控制
  onOpenChange?: (open: boolean) => void; // 用于popover模式的状态回调
  onAccept?: () => void; // 接受cookies的回调
  onDecline?: () => void; // 拒绝cookies的回调
  onViewPrivacyPolicy?: () => void; // 查看隐私政策的回调
  className?: string;
}

export default function CookieConsent({
  mode = 'fixed',
  isOpen = false,
  onOpenChange,
  onAccept,
  onDecline,
  onViewPrivacyPolicy,
  className = ''
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState<'accepted' | 'declined' | null>(null);

  // 检查是否已经同意过cookies
  useEffect(() => {
    if (mode === 'fixed') {
      const consentStatus = localStorage.getItem('cookie-consent');
      if (!consentStatus) {
        // 首次访问，显示cookie consent
        setIsVisible(true);
      } else {
        setHasConsented(consentStatus as 'accepted' | 'declined');
      }
    }
  }, [mode]);

  const handleAccept = () => {
    setHasConsented('accepted');
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    onAccept?.();
    onOpenChange?.(false);
  };

  const handleDecline = () => {
    setHasConsented('declined');
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
    onDecline?.();
    onOpenChange?.(false);
  };

  const handleViewPrivacyPolicy = () => {
    onViewPrivacyPolicy?.();
    if (mode === 'popover') {
      onOpenChange?.(false);
    }
  };

  // 如果已经同意过且是fixed模式，不显示
  if (mode === 'fixed' && hasConsented !== null) {
    return null;
  }

  // Popover模式的内容
  const cookieContent = (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900">Cookie Consent</h3>
        {mode === 'popover' && (
          <Popover.Close asChild>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Popover.Close>
        )}
        {mode === 'fixed' && (
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed text-left">
        We use cookies to enhance your experience and analyze site usage. By continuing, you consent to our use of cookies in accordance with our{' '}
        <button
          onClick={handleViewPrivacyPolicy}
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          Privacy Policy
        </button>
        .
      </p>
      
      <div className="flex gap-3">
        <button
          onClick={handleDecline}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Accept All
        </button>
      </div>
    </div>
  );

  // Fixed模式：右下角固定显示
  if (mode === 'fixed') {
    if (!isVisible) return null;

    return (
      <div className={`fixed bottom-4 right-4 z-50 max-w-sm ${className}`}>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-in slide-in-from-bottom-2 duration-300">
          {cookieContent}
        </div>
      </div>
    );
  }

  // Popover模式：点击触发
  return (
    <Popover.Content className="z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      {cookieContent}
    </Popover.Content>
  );
}
