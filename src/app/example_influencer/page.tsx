'use client'
import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Users,
  MessageSquare,
  Phone,
  Heart,
  Share2,
  ChevronRight,
  Play,
  Eye,
  MessageCircle,
  Filter,
  Camera,
  Plane,
  Mountain,
  Coffee,
  Camera as CameraIcon,
  Video,
  FileText,
} from 'lucide-react';

const themeColor = '#fe585f';

const influencer = {
  name: 'Xiaoya Li',
  title: 'Luxembourg Travel Specialist',
  avatar: '👩‍💼', // 用 emoji 替换头像
  rating: 4.9,
  followers: 128500,
  totalTrips: 89,
  countries: 35,
  yearsExperience: 6,
  responseRate: 98,
  location: 'Shanghai',
  languages: ['Chinese', 'French', 'English'],
  specialties: ['Historic Sites', 'Cultural Experience', 'Photography', 'European Heritage'],
  bio:
    '6 years professional travel planner, with 3 years living in Luxembourg. Focused on unique cultural travel experiences throughout the Grand Duchy. Expert in discovering hidden gems and authentic Luxembourgish cuisine recommendations.',
  achievements: ['Top Influencer 2023', 'Certified Travel Blogger', 'Luxembourg Tourism Expert'],
};

const itineraries = [
  {
    id: 1,
    title: 'Luxembourg City 7-Day Cultural Tour',
    image: '🏰', // 城堡 emoji
    duration: '7 days 6 nights',
    price: '¥8,800 - ¥12,800',
    rating: 4.9,
    reviews: 156,
    tags: ['Culture', 'History', 'Heritage'],
    highlight: 'Private Palace Tour + Traditional Cuisine',
  },
  {
    id: 2,
    title: 'Luxembourg Countryside Discovery',
    image: '🌲', // 森林 emoji
    duration: '5 days 4 nights',
    price: '¥6,500 - ¥9,800',
    rating: 4.8,
    reviews: 89,
    tags: ['Nature', 'Heritage', 'Food'],
    highlight: 'Mullerthal Trail + Local Wineries',
  },
  {
    id: 3,
    title: 'Luxembourg Photography & History Tour',
    image: '📸', // 相机 emoji
    duration: '6 days 5 nights',
    price: '¥7,200 - ¥10,500',
    rating: 4.9,
    reviews: 203,
    tags: ['Photography', 'History', 'Architecture'],
    highlight: 'Pro Photography Guide + Hidden Historic Spots',
  },
];

const reviews = [
  {
    id: 1,
    user: 'Ms. Zhang',
    avatar: '👩', // 女性 emoji
    rating: 5,
    date: '2024-07-15',
    content:
      'Xiaoya\'s Luxembourg itinerary planning was fantastic! Every detail was thoughtfully arranged, especially the historic sites and local restaurants. A truly unforgettable experience.',
    trip: 'Luxembourg Heritage & Food Tour',
  },
  {
    id: 2,
    user: 'Mr. Wang',
    avatar: '👨', // 男性 emoji
    rating: 5,
    date: '2024-06-28',
    content:
      'Exceeded expectations professionally! The itinerary was perfect and photography guidance helped us capture amazing photos. Highly recommended!',
    trip: 'Luxembourg Family Photography Tour',
  },
];

const works = [
  {
    id: 1,
    type: 'article',
    title: 'Luxembourg Secret Cafes Guide',
    image: '☕', // 咖啡 emoji
    views: 45600,
    likes: 2890,
    comments: 234,
  },
  {
    id: 2,
    type: 'video',
    title: 'Luxembourg Authentic Cuisine Check-in',
    image: '🍽️', // 餐具 emoji
    views: 128400,
    likes: 5670,
    comments: 445,
    duration: '8:32',
  },
  {
    id: 3,
    type: 'photo',
    title: 'Luxembourg Historic Architecture Collection',
    image: '🏛️', // 建筑 emoji
    views: 67800,
    likes: 4520,
    comments: 189,
  },
];

export default function TravelInfluencerProfile() {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'reviews' | 'works'>('itineraries');

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-gray-200">
        {/* Left: Avatar + Basic Info */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-4xl">
              {influencer.avatar}
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
              title="Verified"
            >
              <Star size={12} />
              Verified
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#fe585f]">{influencer.name}</h1>
            <p className="text-gray-600 mt-1">{influencer.title}</p>
            <p className="mt-2 max-w-sm">{influencer.bio}</p>
          </div>
        </div>

        {/* Middle: Stats */}
        <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-8">
          <StatItem label="Rating" value={`${influencer.rating.toFixed(1)} / 5`} icon={<Star className="text-[#fe585f]" size={24} />} />
          <StatItem label="Followers" value={influencer.followers.toLocaleString()} icon={<Users size={24} />} />
          <StatItem label="Trips Completed" value={influencer.totalTrips} icon={<MapPin size={24} />} />
          <StatItem label="Response Rate" value={`${influencer.responseRate}%`} icon={<MessageSquare size={24} />} />
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col gap-4 flex-shrink-0 min-w-[160px]">
          <button
            style={{ backgroundColor: themeColor }}
            className="text-white rounded-lg px-6 py-3 font-semibold hover:brightness-110 transition"
          >
            Message
          </button>
          <button
            style={{ borderColor: themeColor, color: themeColor }}
            className="border-2 rounded-lg px-6 py-3 font-semibold hover:bg-[#fe585f]/10 transition"
          >
            Follow
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="max-w-7xl mx-auto px-6 mt-8 border-b border-gray-200 flex gap-8 text-gray-600">
        <TabButton
          active={activeTab === 'itineraries'}
          onClick={() => setActiveTab('itineraries')}
          label="Itineraries"
        />
        <TabButton
          active={activeTab === 'works'}
          onClick={() => setActiveTab('works')}
          label="Gallery"
        />
        <TabButton
          active={activeTab === 'reviews'}
          onClick={() => setActiveTab('reviews')}
          label="Reviews"
        />
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Itineraries Grid */}
        {activeTab === 'itineraries' && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((it) => (
              <div
                key={it.id}
                className="rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col bg-white border border-gray-100"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                  <div className="text-8xl">{it.image}</div>
                  <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium select-none">
                    {it.duration}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">{it.title}</h3>
                  <p className="text-[#fe585f] font-semibold mb-2">{it.price}</p>
                  <p className="text-gray-600 text-sm mb-3 flex-grow">{it.highlight}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {it.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-700 text-sm select-none">
                      <Star className="text-[#fe585f] fill-current" size={16} />
                      <span>
                        {it.rating.toFixed(1)} ({it.reviews})
                      </span>
                    </div>
                    <button
                      className="text-[#fe585f] font-medium flex items-center gap-1 hover:underline"
                      aria-label={`View details for ${it.title}`}
                    >
                      View Details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Works / Gallery */}
        {activeTab === 'works' && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <div
                key={work.id}
                className="rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col bg-white border border-gray-100"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
                  <div className="text-6xl">{work.image}</div>
                  {work.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="text-white" size={24} />
                      </div>
                    </div>
                  )}
                  {work.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs select-none">
                      {work.duration}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold mb-3 line-clamp-2">{work.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600 select-none">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {work.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} />
                        {work.likes.toLocaleString()}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {work.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <section className="space-y-8">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white border border-gray-100"
              >
                <header className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{review.user}</h4>
                    <p className="text-sm text-gray-500">
                      {review.trip} • {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? 'text-[#fe585f] fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </header>
                <p className="text-gray-700">{review.content}</p>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function StatItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 min-w-[140px]">
      <div>{icon}</div>
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500 select-none">{label}</p>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 font-semibold transition-colors border-b-4 ${
        active ? 'border-[#fe585f] text-[#fe585f]' : 'border-transparent hover:text-gray-800'
      }`}
      type="button"
    >
      {label}
    </button>
  );
}
