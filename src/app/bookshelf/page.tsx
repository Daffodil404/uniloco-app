'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Story {
  id: string;
  title: string;
  creator: string;
  location: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  emoji: string;
  duration: string;
  tags: string[];
}

const stories: Story[] = [
  {
    id: 'tokyo',
    title: '东京美食之旅',
    creator: '美食达人',
    location: '东京, 日本',
    description: '探索东京最地道的美食，从街边小吃到米其林餐厅，体验日本独特的饮食文化。',
    rating: 4.8,
    reviews: 128,
    price: 0,
    emoji: '🍜',
    duration: '3天2夜',
    tags: ['美食', '文化', '城市']
  },
  {
    id: 'paris',
    title: '巴黎艺术之旅',
    creator: '艺术爱好者',
    location: '巴黎, 法国',
    description: '漫步艺术之都，感受浪漫与艺术的完美结合。从卢浮宫到埃菲尔铁塔。',
    rating: 4.9,
    reviews: 95,
    price: 50,
    emoji: '🗼',
    duration: '4天3夜',
    tags: ['艺术', '浪漫', '历史']
  },
  {
    id: 'kyoto',
    title: '京都古都之旅',
    creator: '文化探索者',
    location: '京都, 日本',
    description: '体验日本传统文化，感受千年古都的魅力。从金阁寺到清水寺。',
    rating: 4.7,
    reviews: 156,
    price: 30,
    emoji: '⛩️',
    duration: '3天2夜',
    tags: ['文化', '历史', '传统']
  },
  {
    id: 'venice',
    title: '威尼斯浪漫之旅',
    creator: '浪漫主义者',
    location: '威尼斯, 意大利',
    description: '在世界上最浪漫的城市中迷失，乘坐贡多拉穿梭于古老的运河之间。',
    rating: 4.9,
    reviews: 89,
    price: 100,
    emoji: '🛶',
    duration: '3天2夜',
    tags: ['浪漫', '水上', '历史']
  },
  {
    id: 'bali',
    title: '巴厘岛度假之旅',
    creator: '度假专家',
    location: '巴厘岛, 印尼',
    description: '在热带天堂中放松身心，享受阳光、沙滩和海浪。从乌布到库塔。',
    rating: 4.6,
    reviews: 203,
    price: 0,
    emoji: '🌴',
    duration: '5天4夜',
    tags: ['度假', '自然', '放松']
  },
  {
    id: 'santorini',
    title: '圣托里尼日落之旅',
    creator: '摄影爱好者',
    location: '圣托里尼, 希腊',
    description: '在爱琴海最美的岛屿上欣赏世界上最壮观的日落，漫步于白色建筑群中。',
    rating: 4.8,
    reviews: 167,
    price: 80,
    emoji: '🏛️',
    duration: '4天3夜',
    tags: ['摄影', '日落', '海岛']
  }
];

export default function BookshelfPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const tags = ['all', '美食', '文化', '艺术', '浪漫', '历史', '度假', '自然', '摄影'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || story.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ←
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">旅途脚本书架</h1>
              <p className="text-xs text-gray-500">探索精选旅行故事</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-xs">
              📚
            </div>
          </div>
        </div>
      </header>

      {/* 搜索和筛选 */}
      <div className="px-4 py-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="🔍 搜索旅行故事..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* 标签筛选 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/90'
              }`}
            >
              {tag === 'all' ? '全部' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* 故事列表 */}
      <div className="px-4 pb-20">
        <div className="grid grid-cols-1 gap-4">
          {filteredStories.map((story) => (
            <Link key={story.id} href={`/story/${story.id}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  {/* 故事封面 */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {story.emoji}
                  </div>
                  
                  {/* 故事信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <span>⭐</span>
                        <span>{story.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {story.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📍 {story.location}</span>
                        <span>⏱️ {story.duration}</span>
                        <span>👤 {story.creator}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {story.reviews} 评价
                        </span>
                        <span className={`text-sm font-semibold ${
                          story.price === 0 ? 'text-green-600' : 'text-purple-600'
                        }`}>
                          {story.price === 0 ? '免费' : `${story.price} UNC`}
                        </span>
                      </div>
                    </div>
                    
                    {/* 标签 */}
                    <div className="flex gap-1 mt-2">
                      {story.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl mb-4">
              📚
            </div>
            <p className="text-gray-500">没有找到相关故事</p>
            <p className="text-sm text-gray-400">尝试调整搜索条件</p>
          </div>
        )}
      </div>

      {/* 底部导航提示 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            发现 {filteredStories.length} 个故事
          </span>
          <Link href="/ai-chat">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
              🤖 创建专属故事
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 