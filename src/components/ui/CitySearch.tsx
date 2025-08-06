'use client';

import { useState, useEffect, useRef } from 'react';

interface City {
  id: string;
  name: string;
  country: string;
  region?: string;
}

interface CitySearchProps {
  onSelect: (city: City) => void;
  selectedCity?: City;
}

// 热门城市数据
const popularCities: City[] = [
  { id: '1', name: 'Tokyo', country: 'Japan', region: 'Asia' },
  { id: '2', name: 'Paris', country: 'France', region: 'Europe' },
  { id: '3', name: 'New York', country: 'USA', region: 'North America' },
  { id: '4', name: 'London', country: 'UK', region: 'Europe' },
  { id: '5', name: 'Bali', country: 'Indonesia', region: 'Asia' },
  { id: '6', name: 'Santorini', country: 'Greece', region: 'Europe' },
];

export default function CitySearch({ onSelect, selectedCity }: CitySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // 搜索城市
  const searchCities = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // 使用GeoDB Cities API
      const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=10&sort=-population`, {
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // 转换API响应格式
      const cities: City[] = data.data.map((city: any) => ({
        id: city.id.toString(),
        name: city.name,
        country: city.country,
        region: city.region
      }));
      
      setSearchResults(cities);
    } catch (error) {
      console.error('Search failed:', error);
      // 降级到本地搜索
      const filtered = popularCities.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } finally {
      setIsSearching(false);
    }
  };

  // 处理搜索输入
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    
    // 清除之前的debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    if (value.trim()) {
      // 设置debounce延迟
      debounceRef.current = setTimeout(() => {
        searchCities(value);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  // 选择城市
  const handleCitySelect = (city: City) => {
    onSelect(city);
    setSearchTerm(city.name);
    setShowDropdown(false);
    setSearchResults([]);
  };

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 清理debounce定时器
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full" ref={searchRef}>
      {/* 搜索框 */}
      <div className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* 搜索结果下拉框 */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm rounded-2xl border border-white/20 max-h-60 overflow-y-auto z-50">
            {searchResults.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-white/60">{city.country}</div>
              </button>
            ))}
          </div>
        )}
      </div>

             {/* 热门城市标签 */}
       <div className="mb-6">
         <h3 className="text-white/80 text-sm font-medium mb-4">Popular Destinations</h3>
         <div className="grid grid-cols-3 gap-3">
           {popularCities.map((city) => (
             <button
               key={city.id}
               onClick={() => handleCitySelect(city)}
               className={`
                 relative p-3 rounded-xl text-left transition-all duration-200
                 ${selectedCity?.id === city.id
                   ? 'bg-gradient-to-r from-[#FF9E4A]/20 to-[#FFB366]/20 border-2 border-[#FF9E4A] text-white shadow-lg'
                   : 'bg-white/10 border border-white/20 text-white/90 hover:bg-white/20'
                 }
               `}
             >
               <div className="font-medium text-xs">{city.name}</div>
               <div className="text-xs opacity-70">{city.country}</div>
               {selectedCity?.id === city.id && (
                 <div className="absolute top-1 right-1 w-3 h-3 bg-[#FF9E4A] rounded-full flex items-center justify-center shadow-lg">
                   <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                 </div>
               )}
             </button>
           ))}
         </div>
       </div>
    </div>
  );
} 