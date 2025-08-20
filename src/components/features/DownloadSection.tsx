'use client';

import React from 'react';
import Image from 'next/image';

interface DownloadSectionProps {
  title?: string;
  subtitle?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  textColor?: string;
  buttonOnly?: boolean;
}

export default function DownloadSection({
  title = 'DOWNLOAD NOW',
  subtitle = 'Start your travel-to-earn adventure today',
  gradientFrom = '#fe585f',
  gradientTo = '#d94a51',
  className = '',
  textColor = '#fe585f',
  buttonOnly = false
}: DownloadSectionProps) {
  const accentColor = gradientFrom;
  const handleHaptics = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  return (
    <section className={`${buttonOnly ? 'py-8' : 'py-16'} ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {buttonOnly ? (
          // 只显示按钮的版本
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#"
              aria-label="Download on the App Store"
              onClick={handleHaptics}
              className="group rounded-xl ring-0 transition transform hover:-translate-y-0.5"
            >
              <Image
                src="/static/download_apple.png"
                alt="Download on the App Store"
                width={260}
                height={80}
                className="w-[220px] md:w-[260px] h-auto object-contain select-none pointer-events-none group-hover:opacity-95"
                priority
              />
            </a>

            <a
              href="#"
              aria-label="Get it on Google Play"
              onClick={handleHaptics}
              className="group rounded-xl ring-0 transition transform hover:-translate-y-0.5"
            >
              <Image
                src="/static/download_google.png"
                alt="Get it on Google Play"
                width={260}
                height={80}
                className="w-[220px] md:w-[260px] h-auto object-contain select-none pointer-events-none group-hover:opacity-95"
              />
            </a>
          </div>
        ) : (
          // 完整版本，包含标题和边框
          <div
            className="rounded-2xl border-2 bg-transparent p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.09)]"
            style={{ borderColor: accentColor }}
          >
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: textColor }}>{title}</h2>
              <p className="text-lg md:text-xl mb-8" style={{ color: textColor }}>{subtitle}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="#"
                aria-label="Download on the App Store"
                onClick={handleHaptics}
                className="group rounded-xl ring-0 transition transform hover:-translate-y-0.5"
              >
                <Image
                  src="/static/download_apple.png"
                  alt="Download on the App Store"
                  width={260}
                  height={80}
                  className="w-[220px] md:w-[260px] h-auto object-contain select-none pointer-events-none group-hover:opacity-95"
                  priority
                />
              </a>

              <a
                href="#"
                aria-label="Get it on Google Play"
                onClick={handleHaptics}
                className="group rounded-xl ring-0 transition transform hover:-translate-y-0.5"
              >
                <Image
                  src="/static/download_google.png"
                  alt="Get it on Google Play"
                  width={260}
                  height={80}
                  className="w-[220px] md:w-[260px] h-auto object-contain select-none pointer-events-none group-hover:opacity-95"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


