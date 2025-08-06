'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">UniLoco</h1>
          <p className="text-sm text-gray-500">Web3 Travel Story Platform</p>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="px-4 py-6">
        {/* 欢迎卡片 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-6 border border-gray-200/50">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mb-3">
              🧭
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to UniLoco
            </h2>
            <p className="text-gray-600 text-sm">
              Start your gamified travel adventure
            </p>
          </div>
        </div>

        {/* 功能导航 */}
        <div className="space-y-4">
          {/* AI旅途生成 */}
          <Link href="/ai-chat">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">AI Journey Generator</h3>
                  <p className="text-sm opacity-90">AI assistant creates your exclusive treasure map</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </div>
          </Link>

          {/* 旅途脚本书架 */}
          <Link href="/bookshelf">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Travel Story Library</h3>
                  <p className="text-sm opacity-90">Explore curated travel stories and routes</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </div>
          </Link>

          {/* 我的旅程 */}
          <Link href="/my-journeys">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🗺️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">My Journeys</h3>
                  <p className="text-sm opacity-90">View and manage your travel records</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </div>
          </Link>

          {/* 社区探索 */}
          <Link href="/community">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  👥
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Community Explore</h3>
                  <p className="text-sm opacity-90">Discover amazing stories from other travelers</p>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </div>
          </Link>
        </div>

        {/* 特性介绍 */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Features</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-blue-600 text-sm font-semibold">AI</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Smart Planning</h4>
              <p className="text-xs text-gray-600">AI assistant customizes exclusive routes</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-green-600 text-sm font-semibold">🎮</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Gamified</h4>
              <p className="text-xs text-gray-600">Check-in tasks and reward system</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-purple-600 text-sm font-semibold">🌐</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Web3</h4>
              <p className="text-xs text-gray-600">NFT avatars and token rewards</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <span className="text-orange-600 text-sm font-semibold">📱</span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Mobile First</h4>
              <p className="text-xs text-gray-600">Optimized for mobile experience</p>
            </div>
          </div>
        </div>
      </main>

      {/* 底部导航 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 px-4 py-2">
        <div className="flex justify-around">
          <button 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'home' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <span className="text-lg">🏠</span>
            <span className="text-xs">Home</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'ai' 
                ? 'text-purple-600 bg-purple-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('ai')}
          >
            <span className="text-lg">🤖</span>
            <span className="text-xs">AI</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'bookshelf' 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('bookshelf')}
          >
            <span className="text-lg">📚</span>
            <span className="text-xs">Library</span>
          </button>
          
          <button 
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'profile' 
                ? 'text-orange-600 bg-orange-50' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="text-lg">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </footer>
    </div>
  );
} 