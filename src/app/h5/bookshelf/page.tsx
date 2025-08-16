'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

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
  difficulty: 'Easy' | 'Medium' | 'Hard';
  highlights: string[];
}

const stories: Story[] = [
  {
    id: 'luxembourg-city-tour',
    title: 'Luxembourg City Tour',
    creator: 'Culture Enthusiast',
    location: 'Luxembourg City, Luxembourg',
    description: 'Discover the rich history and stunning architecture of Luxembourg City. This comprehensive tour takes you through UNESCO World Heritage sites, ancient fortifications, and charming old town streets.',
    rating: 4.9,
    reviews: 128,
    price: 0,
    emoji: '🏰',
    duration: '2 days',
    tags: ['History', 'Architecture', 'Culture'],
    difficulty: 'Easy',
    highlights: ['Notre-Dame Cathedral', 'Palais Grand-Ducal', 'Casemates du Bock', "Place d'Armes", 'Adolphe Bridge']
  },
  {
    id: 'paris-street-art',
    title: 'Paris Street Art Hunt',
    creator: 'Urban Art Hunter',
    location: 'Paris, France',
    description: 'Discover Paris through the eyes of street artists! Follow the colorful murals and hidden gems that tell the city\'s untold stories.',
    rating: 4.9,
    reviews: 95,
    price: 50,
    emoji: '🎨',
    duration: '4 days',
    tags: ['Art', 'Street Culture', 'Photography'],
    difficulty: 'Medium',
    highlights: ['13th Arrondissement', 'Belleville', 'Le Marais']
  },
  {
    id: 'kyoto-temple-run',
    title: 'Kyoto Temple Runner',
    creator: 'Zen Master',
    location: 'Kyoto, Japan',
    description: 'Channel your inner temple runner! Sprint through Kyoto\'s most sacred sites before the crowds arrive. Perfect for early birds and photography enthusiasts.',
    rating: 4.7,
    reviews: 156,
    price: 30,
    emoji: '🏃‍♂️',
    duration: '3 days',
    tags: ['Temples', 'Photography', 'Culture'],
    difficulty: 'Hard',
    highlights: ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama']
  },
  {
    id: 'venice-gondola-race',
    title: 'Venice Gondola Racing',
    creator: 'Canal Captain',
    location: 'Venice, Italy',
    description: 'Navigate Venice\'s labyrinth of canals like a local! Skip the tourist traps and discover the city\'s secret waterways and hidden gems.',
    rating: 4.9,
    reviews: 89,
    price: 100,
    emoji: '🛶',
    duration: '3 days',
    tags: ['Waterways', 'Hidden Gems', 'Romance'],
    difficulty: 'Medium',
    highlights: ['Secret Canals', 'Local Islands', 'Hidden Squares']
  },
  {
    id: 'bali-surf-safari',
    title: 'Bali Surf Safari',
    creator: 'Wave Rider',
    location: 'Bali, Indonesia',
    description: 'Catch the perfect wave! From beginner-friendly breaks to challenging reef waves, this surf adventure covers Bali\'s best beaches and surf spots.',
    rating: 4.6,
    reviews: 203,
    price: 0,
    emoji: '🏄‍♂️',
    duration: '5 days',
    tags: ['Surfing', 'Beach', 'Adventure'],
    difficulty: 'Medium',
    highlights: ['Uluwatu', 'Canggu', 'Nusa Lembongan']
  },
  {
    id: 'santorini-sunset-chase',
    title: 'Santorini Sunset Chaser',
    creator: 'Golden Hour Hunter',
    location: 'Santorini, Greece',
    description: 'Chase the most epic sunsets on Earth! This photography-focused journey takes you to the best viewpoints and hidden spots for that perfect Instagram moment.',
    rating: 4.8,
    reviews: 167,
    price: 80,
    emoji: '🌅',
    duration: '4 days',
    tags: ['Photography', 'Sunsets', 'Islands'],
    difficulty: 'Easy',
    highlights: ['Oia Sunset', 'Hidden Viewpoints', 'Volcano Views']
  },
  {
    id: 'nyc-food-truck-tour',
    title: 'NYC Food Truck Marathon',
    creator: 'Street Foodie',
    location: 'New York City, USA',
    description: 'Eat your way through NYC\'s best food trucks! From Brooklyn to Queens, discover the city\'s diverse culinary scene on wheels.',
    rating: 4.7,
    reviews: 234,
    price: 40,
    emoji: '🍕',
    duration: '2 days',
    tags: ['Food', 'Street Food', 'Culture'],
    difficulty: 'Easy',
    highlights: ['Brooklyn Bridge', 'Queens Night Market', 'Manhattan Trucks']
  },
  {
    id: 'london-underground',
    title: 'London Underground Explorer',
    creator: 'Tube Master',
    location: 'London, UK',
    description: 'Master the London Underground like a local! Navigate the world\'s oldest metro system and discover hidden stations and secret passages.',
    rating: 4.5,
    reviews: 178,
    price: 25,
    emoji: '🚇',
    duration: '3 days',
    tags: ['Transport', 'History', 'Urban'],
    difficulty: 'Medium',
    highlights: ['Abandoned Stations', 'Secret Passages', 'Historic Lines']
  }
];

export default function BookshelfPage() {
  const router = useRouter();
  
  const handleStoryClick = () => {
    router.push('/h5/story-detail');
  };
  const { isLoggedIn, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const handleBackToHome = () => {
    router.push('/h5/home');
  };

  const handleNavigateToAIChat = () => {
    router.push('/h5/ai-chat');
  };

  const tags = ['all', 'Food', 'Culture', 'Art', 'Photography', 'Adventure', 'Nightlife', 'Hidden Gems', 'Surfing'];

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || story.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-600';
      case 'Medium': return 'text-amber-600';
      case 'Hard': return 'text-red-600';
      default: return 'text-slate-400';
    }
  };

  // 显示加载状态
  if (isLoading) {
    return (
      <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[#fe585f] rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Loading...</h3>
          <p className="text-slate-600">Checking login status</p>
        </div>
      </div>
    );
  }

  // 显示登录要求
  if (!isLoggedIn) {
    return (
      <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Login Required</h3>
          <p className="text-slate-600 mb-4">This feature requires login to access</p>
          <button
                            onClick={() => router.push('/h5/login?redirect=/h5/bookshelf')}
            className="px-6 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
            <button 
            onClick={handleBackToHome}
            className="text-slate-600 hover:text-slate-800"
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            </button>
          <h1 className="text-xl font-bold text-slate-800">Travel Stories</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 pb-4 flex-shrink-0">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="🔍 Search adventures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white shadow-sm rounded-2xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#fe585f]/20 focus:border-[#fe585f]"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200'
              }`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stories List */}
      <div className="flex-1 overflow-y-auto px-4 mobile-content-safe">
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <div key={story.id} onClick={handleStoryClick}  className="bg-white shadow-lg rounded-3xl p-4 border border-slate-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4">
                {/* Story Cover with Price */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                    {story.emoji}
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-bold ${
                      story.price === 0 ? 'text-emerald-600' : 'text-[#fe585f]'
                    }`}>
                      {story.price === 0 ? 'FREE' : `${story.price} UNC`}
                    </span>
                  </div>
                </div>
                
                {/* Story Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-800 truncate">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-amber-500">★</span>
                      <span className="text-slate-700 font-semibold">{story.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2 font-medium">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-medium">📍 {story.location}</span>
                      <span className="font-medium">⏱️ {story.duration}</span>
                      <span className="font-medium">👤 {story.creator}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {story.reviews} reviews
                      </span>
                    </div>
                  </div>
                  
                  {/* Difficulty and Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {story.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs rounded-lg font-medium h-6 flex items-center justify-center min-w-0"
                          style={{ maxWidth: '80px' }}
                        >
                          <span className="truncate">{tag}</span>
                        </span>
                      ))}
                    </div>
                    <span className={`text-xs font-bold ${getDifficultyColor(story.difficulty)}`}>
                      {story.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-600">No adventures found</p>
            <p className="text-sm text-slate-400">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Found {filteredStories.length} adventures
          </span>
          <div className="flex gap-2">
            <button
                              onClick={() => router.push('/h5/story-creat')}
              className="px-3 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
            >
              ✍️ Create Story
            </button>
            <button
              onClick={handleNavigateToAIChat}
              className="px-4 py-2 bg-gradient-to-r from-[#fe585f] to-[#ff7a80] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
            >
              🤖 AI Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 