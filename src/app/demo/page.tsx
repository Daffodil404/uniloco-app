'use client'
import React, { useState } from 'react';
import {
    MapPin,
    Star,
    Users,
    Camera,
    Heart,
    MessageCircle,
    Share2,
    Calendar,
    Award,
    Globe,
    Phone,
    Mail,
    ChevronRight,
    Play,
    Eye,
    Bookmark,
    TrendingUp,
    Clock,
    CheckCircle,
    MessageSquare,
    Send,
    Filter
} from 'lucide-react';

const TravelInfluencerProfile = () => {
    const [activeTab, setActiveTab] = useState('itineraries');

    // 达人信息
    const influencer = {
        name: '李小雅',
        title: '日本深度游专家',
        avatar: '/api/placeholder/120/120',
        rating: 4.9,
        followers: 128500,
        totalTrips: 89,
        countries: 35,
        yearsExperience: 6,
        responseRate: 98,
        location: '上海',
        languages: ['中文', '日语', '英语'],
        specialties: ['美食探索', '文化体验', '摄影旅拍', '温泉之旅'],
        bio: '6年专业旅游规划师，日本旅居3年经验。专注于为客户打造独特的日本深度文化体验，足迹遍布日本47个都道府县。擅长挖掘小众景点，提供地道美食推荐和专业摄影指导。',
        achievements: ['马蜂窝年度优秀达人', '小红书认证旅游博主', 'JNTO日本旅游专家认证']
    };

    // 行程规划数据
    const itineraries = [
        {
            id: 1,
            title: '东京-京都7日文化深度游',
            image: '/api/placeholder/300/200',
            duration: '7天6夜',
            price: '¥8,800-12,800',
            rating: 4.9,
            reviews: 156,
            tags: ['文化体验', '美食', '温泉'],
            highlight: '私人茶道体验 + 怀石料理'
        },
        {
            id: 2,
            title: '北海道雪国浪漫之旅',
            image: '/api/placeholder/300/200',
            duration: '5天4夜',
            price: '¥6,500-9,800',
            rating: 4.8,
            reviews: 89,
            tags: ['雪景', '温泉', '美食'],
            highlight: '札幌雪祭 + 登别温泉'
        },
        {
            id: 3,
            title: '关西樱花季摄影之旅',
            image: '/api/placeholder/300/200',
            duration: '6天5夜',
            price: '¥7,200-10,500',
            rating: 4.9,
            reviews: 203,
            tags: ['樱花', '摄影', '古建筑'],
            highlight: '专业摄影指导 + 小众赏樱点'
        }
    ];

    // 作品展示数据
    const works = [
        {
            id: 1,
            type: 'article',
            title: '京都隐秘咖啡店探访指南',
            image: '/api/placeholder/250/150',
            views: 45600,
            likes: 2890,
            comments: 234
        },
        {
            id: 2,
            type: 'video',
            title: '东京地道拉面店打卡',
            image: '/api/placeholder/250/150',
            views: 128400,
            likes: 5670,
            comments: 445,
            duration: '8:32'
        },
        {
            id: 3,
            type: 'photo',
            title: '富士山日出摄影作品集',
            image: '/api/placeholder/250/150',
            views: 67800,
            likes: 4520,
            comments: 189
        }
    ];

    // 客户评价数据
    const reviews = [
        {
            id: 1,
            user: '张小姐',
            avatar: '/api/placeholder/40/40',
            rating: 5,
            date: '2024-07-15',
            content: '小雅老师的日本行程规划太棒了！每个细节都考虑得很周到，特别是推荐的小众温泉旅馆，真的是人生难忘的体验。',
            trip: '关西温泉美食之旅'
        },
        {
            id: 2,
            user: '王先生',
            avatar: '/api/placeholder/40/40',
            rating: 5,
            date: '2024-06-28',
            content: '专业程度超出预期！不仅行程安排合理，摄影指导也很专业，帮我们拍出了很多满意的照片。强烈推荐！',
            trip: '东京亲子摄影之旅'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 头部信息区 */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row items-start gap-6">
                        {/* 头像和基本信息 */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full">
                            <div className="relative">
                                <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle size={12} />
                                    认证
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                    <h1 className="text-3xl font-bold">{influencer.name}</h1>
                                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                        {influencer.title}
                                    </span>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="text-yellow-400 fill-current" size={16} />
                                        <span>{influencer.rating}分</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users size={16} />
                                        <span>{influencer.followers.toLocaleString()}粉丝</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        <span>服务{influencer.countries}个国家</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>{influencer.yearsExperience}年经验</span>
                                    </div>
                                </div>

                                <p className="text-white/90 mb-4 max-w-2xl">{influencer.bio}</p>

                                {/* 专业标签 */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {influencer.specialties.map((specialty, index) => (
                                        <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>

                                {/* 语言能力 */}
                                <div className="flex flex-wrap gap-2">
                                    {influencer.languages.map((lang, index) => (
                                        <span key={index} className="bg-blue-500/30 text-white px-2 py-1 rounded text-xs">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* 联系按钮 */}
                            <div className="flex flex-col gap-3 min-w-0 md:min-w-[200px]">
                                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                    <MessageSquare size={18} />
                                    立即咨询
                                </button>
                                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <Phone size={18} />
                                    预约通话
                                </button>
                                <div className="flex gap-2">
                                    <button className="flex-1 border border-white/30 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                                        <Heart size={16} />
                                    </button>
                                    <button className="flex-1 border border-white/30 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 数据统计卡片 */}
            <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                        <div className="text-2xl font-bold text-gray-900">{influencer.totalTrips}</div>
                        <div className="text-sm text-gray-600">完成行程</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{influencer.responseRate}%</div>
                        <div className="text-sm text-gray-600">响应率</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">4.9</div>
                        <div className="text-sm text-gray-600">客户评分</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg text-center">
                        <div className="text-2xl font-bold text-orange-600">96%</div>
                        <div className="text-sm text-gray-600">推荐率</div>
                    </div>
                </div>
            </div>

            {/* 主要内容区 */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* 导航标签 */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('itineraries')}
                        className={`px-6 py-3 border-b-2 font-medium transition-colors ${activeTab === 'itineraries'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        行程规划
                    </button>
                    <button
                        onClick={() => setActiveTab('works')}
                        className={`px-6 py-3 border-b-2 font-medium transition-colors ${activeTab === 'works'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        作品展示
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 border-b-2 font-medium transition-colors ${activeTab === 'reviews'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        客户评价
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-6 py-3 border-b-2 font-medium transition-colors ${activeTab === 'services'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        服务介绍
                    </button>
                </div>

                {/* 行程规划内容 */}
                {activeTab === 'itineraries' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">精选行程规划</h2>
                            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                <Filter size={16} />
                                筛选条件
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {itineraries.map((itinerary) => (
                                <div key={itinerary.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={itinerary.image}
                                            alt={itinerary.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                                            {itinerary.duration}
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{itinerary.title}</h3>
                                        <p className="text-blue-600 font-medium mb-2">{itinerary.price}</p>
                                        <p className="text-gray-600 text-sm mb-3">{itinerary.highlight}</p>

                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {itinerary.tags.map((tag, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <Star className="text-yellow-400 fill-current" size={14} />
                                                <span className="text-sm text-gray-600">{itinerary.rating} ({itinerary.reviews}评价)</span>
                                            </div>
                                            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                                查看详情
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 作品展示内容 */}
                {activeTab === 'works' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">作品展示</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {works.map((work) => (
                                <div key={work.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                    <div className="relative">
                                        <img
                                            src={work.image}
                                            alt={work.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        {work.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-black/50 rounded-full p-3">
                                                    <Play className="text-white" size={24} />
                                                </div>
                                            </div>
                                        )}
                                        {work.duration && (
                                            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                                {work.duration}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-semibold mb-3">{work.title}</h3>

                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <div className="flex items-center gap-3">
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
                        </div>
                    </div>
                )}

                {/* 客户评价内容 */}
                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">客户评价</h2>
                            <div className="text-sm text-gray-600">共{reviews.length}条评价</div>
                        </div>

                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start gap-4">
                                        <img
                                            src={review.avatar}
                                            alt={review.user}
                                            className="w-12 h-12 rounded-full"
                                        />

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-medium">{review.user}</h4>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <span>{review.trip}</span>
                                                        <span>•</span>
                                                        <span>{review.date}</span>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-gray-700">{review.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 服务介绍内容 */}
                {activeTab === 'services' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">服务介绍</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Calendar className="text-blue-600" size={24} />
                                    行程定制
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    根据您的需求和预算，为您量身定制专属的日本旅行路线。包含详细的每日行程安排、餐厅推荐、住宿建议等。
                                </p>
                                <div className="text-blue-600 font-semibold">¥800-1500 / 天</div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Camera className="text-purple-600" size={24} />
                                    摄影指导
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    专业摄影师背景，提供旅拍指导服务。教您如何在各种场景下拍出满意的照片，留住美好回忆。
                                </p>
                                <div className="text-purple-600 font-semibold">¥500-1000 / 小时</div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <MessageSquare className="text-green-600" size={24} />
                                    在线咨询
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    24小时内回复您的旅行问题。包含目的地推荐、交通路线、美食推荐、文化介绍等各类咨询。
                                </p>
                                <div className="text-green-600 font-semibold">¥100-300 / 次</div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <MapPin className="text-orange-600" size={24} />
                                    当地向导
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    提供东京、大阪、京都等主要城市的当地向导服务。深度游览，体验最地道的日本文化。
                                </p>
                                <div className="text-orange-600 font-semibold">¥1200-2000 / 天</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelInfluencerProfile;