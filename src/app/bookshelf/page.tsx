'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    id: 'tokyo-nightlife',
    title: 'Tokyo Nightlife Adventure',
    creator: 'Night Owl Explorer',
    location: 'Tokyo, Japan',
    description: 'Dive into Tokyo\'s electric nightlife scene! From neon-lit streets of Shibuya to hidden izakayas in Golden Gai, experience the city that never sleeps.',
    rating: 4.8,
    reviews: 128,
    price: 0,
    emoji: '🌃',
    duration: '3 days',
    tags: ['Nightlife', 'Food', 'Culture'],
    difficulty: 'Easy',
    highlights: ['Shibuya Crossing', 'Golden Gai', 'Robot Restaurant']
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleNavigateToAIChat = () => {
    router.push('/ai-chat');
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
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#64D8EF] to-[#000000] from-10% to-100%">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToHome}
            className="text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white">Travel Stories</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 pb-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="🔍 Search adventures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-black/80 backdrop-blur-sm rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF9E4A]"
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
                  ? 'bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stories List */}
      <div className="px-4 pb-20">
        <div className="space-y-4">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-black/80 backdrop-blur-sm rounded-3xl p-4 border border-white/20 hover:border-white/40 transition-all">
              <div className="flex items-start gap-4">
                {/* Story Cover */}
                <div className="w-16 h-16 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  {story.emoji}
                </div>
                
                {/* Story Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-[#FF9E4A]">★</span>
                      <span className="text-white">{story.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-xs text-white/60">
                      <span>📍 {story.location}</span>
                      <span>⏱️ {story.duration}</span>
                      <span>👤 {story.creator}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60">
                        {story.reviews} reviews
                      </span>
                      <span className={`text-sm font-semibold ${
                        story.price === 0 ? 'text-[#66D2A0]' : 'text-[#FF9E4A]'
                      }`}>
                        {story.price === 0 ? 'Free' : `${story.price} UNC`}
                      </span>
                    </div>
                  </div>
                  
                  {/* Difficulty and Tags */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {story.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${getDifficultyColor(story.difficulty)}`}>
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
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-white/60">No adventures found</p>
            <p className="text-sm text-white/40">Try adjusting your search</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-white/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">
            Found {filteredStories.length} adventures
          </span>
          <button
            onClick={handleNavigateToAIChat}
            className="px-4 py-2 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
          >
            🤖 Create Your Story
          </button>
        </div>
      </div>
    </div>
  );
} 