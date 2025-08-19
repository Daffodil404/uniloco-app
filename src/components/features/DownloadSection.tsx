'use client';

import React from 'react';

interface DownloadSectionProps {
  title?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}

export default function DownloadSection({
  title = 'DOWNLOAD NOW',
  subtitle = 'Start your travel-to-earn adventure today',
  gradientFrom = '#fe585f',
  gradientTo = '#d94a51',
  className = ''
}: DownloadSectionProps) {
  const accentColor = gradientFrom;
  const handleDownload = () => {
    const button = document.querySelector('.download-btn');
    if (button) {
      button.classList.add('downloading');

      if ('vibrate' in navigator) {
        navigator.vibrate(200);
      }

      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.volume = 0.1;
        audio.play().catch(() => {});
      } catch {}

      setTimeout(() => {
        button.classList.remove('downloading');
        alert('Download started! 🚀');
      }, 2000);
    }
  };

  return (
    <section className={`py-20 bg-gradient-to-b text-white ${className}`} style={{ backgroundImage: `linear-gradient(to bottom, ${gradientFrom}D9, ${gradientTo}D9)` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-black mb-8">{title}</h2>
        <p className="text-2xl mb-12">{subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={handleDownload}
            className="download-btn group bg-transparent text-white px-10 py-4 rounded-2xl font-extrabold text-xl border-2 transform transition-all duration-300 skew-x-6 hover:bg-white/10"
            style={{ borderColor: accentColor }}
          >
            <span className="-skew-x-6 flex items-center gap-2 tracking-wide italic uppercase">
              <span>🍎</span>
              <span>Download on App Store</span>
            </span>
          </button>

          <button
            onClick={handleDownload}
            className="download-btn group bg-transparent text-white px-10 py-4 rounded-2xl font-extrabold text-xl border-2 transform transition-all duration-300 skew-x-6 hover:bg-white/10"
            style={{ borderColor: accentColor }}
          >
            <span className="-skew-x-6 flex items-center gap-2 tracking-wide italic uppercase">
              <span>🤖</span>
              <span>Get it on Google Play</span>
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .download-btn.downloading { animation: downloading 2s ease-in-out; }
        @keyframes downloading {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}


