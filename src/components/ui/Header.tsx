'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  activeSection?: string;
  onNavigation?: (section: string) => void;
  scrollToSection?: (id: string) => void;
  navItems?: string[];
  showApplyButton?: boolean;
  applyButtonText?: string;
  applyButtonAction?: () => void;
}

interface DropdownItem {
  label: string;
  action: () => void;
}

export default function Header({
  activeSection = 'home',
  onNavigation,
  scrollToSection,
  navItems = ['home', 'how-to', 'web3 hub', 'partnership'],
  showApplyButton = false,
  applyButtonText = '🚀 Apply Now',
  applyButtonAction
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (item: string) => {
    // 根据当前路径决定路由前缀
    const currentPath = pathname ?? '';
    const isDark = currentPath.startsWith('/web_dark');
    const basePath = isDark ? '/web_dark' : '/web';
    
    if (item === 'home') {
      router.push(`${basePath}/intro`);
      return;
    }

    if (item === 'partnership') {
      router.push(`${basePath}/partnership`);
      return;
    }

    if (item === 'web3 hub') {
      if (isDark) {
        setDropdownOpen(dropdownOpen === 'web3 hub' ? null : 'web3 hub');
      } else {
        router.push(`${basePath}/web3hub`);
      }
      return;
    }

    if (item === 'events') {
      router.push(`${basePath}/events`);
      return;
    }

    if (item === 'how-to') {
      setDropdownOpen(dropdownOpen === 'how-to' ? null : 'how-to');
      return;
    }

    if (onNavigation) {
      onNavigation(item);
    } else if (scrollToSection) {
      scrollToSection(item);
    }
  };

  const handleDropdownItemClick = (action: () => void) => {
    setDropdownOpen(null);
    action();
  };

  const getDropdownItems = (item: string): DropdownItem[] => {
    // 根据当前路径决定路由前缀
    const currentPath = pathname ?? '';
    const isDark = currentPath.startsWith('/web_dark');
    const basePath = isDark ? '/web_dark' : '/web';

    if (item === 'how-to') {
      if (isDark) {
        // /web_dark: 仅保留 How to Play
        return [
          {
            label: 'How to Play',
            action: () => router.push(`${basePath}/play`)
          }
        ];
      }
      // 其它路径保持原有三项
      return [
        {
          label: 'Set Up Account',
          action: () => router.push(`${basePath}/setup`)
        },
        {
          label: 'Play',
          action: () => router.push(`${basePath}/play`)
        },
        {
          label: 'Join In Events',
          action: () => router.push(`${basePath}/events`)
        }
      ];
    }

    if (item === 'web3 hub' && isDark) {
      return [
        {
          label: 'Travel Band NFTs',
          action: () => router.push(`${basePath}/web3hub`)
        },
        {
          label: 'Token Econmic',
          action: () => router.push(`${basePath}/token-economic`)
        }
      ];
    }
    return [];
  };

  const handleApplyClick = () => {
    if (applyButtonAction) {
      applyButtonAction();
    } else if (scrollToSection) {
      scrollToSection('cta');
    }
  };

  // 动态切换主题：/web_dark 使用深色，其它使用现有主题（保持不变）
  const pathname = usePathname();
  const isWebDark = pathname?.startsWith('/web_dark') ?? false;
  // Softer coral for /web_dark: semi-transparent gradient to reduce clash with dark hero
  const navBg = isWebDark ? 'bg-gradient-to-b from-[#fe585f]/85 to-[#d94a51]/85' : 'bg-[#1E3A8A]';
  const navBorder = isWebDark ? 'border-[#d94a51]' : 'border-[#1E40AF]';
  const logoBg = isWebDark ? 'bg-white/15' : 'bg-[#fe585f]';

  // 根据路径定制导航项：/web_dark 增加独立的 events 入口
  const effectiveNavItems = isWebDark ? [...(navItems || []).filter(i => i !== 'events'), 'events'] : navItems;

  return (
    <nav className={`fixed top-0 w-full ${navBg} backdrop-blur-md z-50 border-b ${navBorder} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden`}
            >
              <Image
                src="/static/logo-transparent-bg.png"
                alt="Uniloco Logo"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white">Uniloco</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {effectiveNavItems.map((item) => (
              <div key={item} className="relative dropdown-container">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-110 flex items-center gap-1 ${activeSection === item
                    ? 'text-white border-b-2 border-white'
                    : 'text-white hover:text-white'
                    }`}
                >
                  {item.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {(item === 'how-to' || item === 'web3 hub') && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen === 'how-to' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {((item === 'how-to' && dropdownOpen === 'how-to') || (item === 'web3 hub' && dropdownOpen === 'web3 hub')) && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {getDropdownItems(item).map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => handleDropdownItemClick(dropdownItem.action)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#fe585f] hover:text-white transition-colors duration-200"
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {showApplyButton && (
              <button
                onClick={handleApplyClick}
                className="bg-white text-[#fe585f] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {applyButtonText}
              </button>
            )}
          </div>

          <button className="md:hidden text-white hover:text-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
