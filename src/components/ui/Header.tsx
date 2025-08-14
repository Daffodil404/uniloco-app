'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  activeSection?: string;
  onNavigation?: (section: string) => void;
  scrollToSection?: (id: string) => void;
  navItems?: string[];
  showApplyButton?: boolean;
  applyButtonText?: string;
  applyButtonAction?: () => void;
}

export default function Header({
  activeSection = 'home',
  onNavigation,
  scrollToSection,
  navItems = ['home', 'how-to', 'web3 hub', 'events'],
  showApplyButton = false,
  applyButtonText = '🚀 Apply Now',
  applyButtonAction
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    if (onNavigation) {
      onNavigation(item);
    } else if (scrollToSection) {
      scrollToSection(item);
    }
  };

  const handleApplyClick = () => {
    if (applyButtonAction) {
      applyButtonAction();
    } else if (scrollToSection) {
      scrollToSection('cta');
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#fe585f] backdrop-blur-md z-50 border-b border-red-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg animate-pulse">
              ✈️
            </div>
            <span className="text-2xl font-bold text-[#fe585f]">Uniloco</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-110 ${
                  activeSection === item
                    ? 'text-[#fff] border-b-2 border-[#fff]'
                    : 'text-[#fff] hover:text-[#fff]'
                }`}
              >
                {item.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
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
