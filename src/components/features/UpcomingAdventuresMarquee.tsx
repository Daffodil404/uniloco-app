'use client';

import React from 'react';

interface AdventureItem {
  icon: string;
  title: string;
  date: string;
  description: string;
  gradient: string; // tailwind gradient class for the icon bubble
}

interface Props {
  items?: AdventureItem[];
  speedMs?: number; // full loop duration
}

export default function UpcomingAdventuresMarquee({
  items,
  speedMs = 25000
}: Props) {
  const data: AdventureItem[] =
    items ?? [
      {
        icon: '🏰',
        title: 'German Castle Mystery Tour',
        date: 'October 2025',
        description:
          "Explore Bavaria's mysterious castles and collect medieval NFT badges",
        gradient: 'from-purple-400 to-purple-600'
      },
      {
        icon: '🍷',
        title: 'French Vineyard Tasting Route',
        date: 'November 2025',
        description:
          'Deep dive into Champagne region, taste the perfect blend of history and tradition',
        gradient: 'from-rose-400 to-red-500'
      },
      {
        icon: '❄️',
        title: 'Swiss Winter Fantasy Adventure',
        date: 'December 2025',
        description:
          'Alps snow mountain hiking, experience the pure beauty of the ice and snow world',
        gradient: 'from-sky-400 to-indigo-500'
      },
      {
        icon: '⛰️',
        title: 'Austrian Alpine Hiking Quest',
        date: 'April 2026',
        description: 'Track scenic ridgelines and collect summit NFT stamps',
        gradient: 'from-emerald-400 to-teal-500'
      }
    ];

  // Duplicate the list to achieve seamless loop
  const loop = [...data, ...data];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-6 whitespace-nowrap will-change-transform"
          style={{
            animation: `marquee ${speedMs}ms linear infinite`
          }}
        >
          {loop.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="w-[22rem] flex-shrink-0 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#fe585f] transition-colors rounded-2xl p-6 shadow-sm"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-2xl text-white mb-4`}
              >
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-500 mb-2">{item.date}</p>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {item.description}
              </p>
              <button className="px-4 py-2 rounded-full bg-[#fe585f] text-white text-sm font-semibold hover:bg-[#e14b52] transition-colors">
                Get Notified
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}


