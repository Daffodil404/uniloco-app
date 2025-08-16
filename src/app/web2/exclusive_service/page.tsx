'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Camera, Utensils, Brush, HeartPulse, Dumbbell, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Web2Header from '@/components/ui/Web2Header';

export default function ExclusiveServicePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    // 服务分类
    const categories = [
        { id: 'photography', name: 'Photography', icon: <Camera className="h-5 w-5" /> },
        { id: 'private-chef', name: 'Private Chef', icon: <Utensils className="h-5 w-5" /> },
        { id: 'spa', name: 'SPA Therapy', icon: <HeartPulse className="h-5 w-5" /> },
        { id: 'makeup', name: 'Makeup & Styling', icon: <Brush className="h-5 w-5" /> },
        { id: 'beauty', name: 'Beauty Care', icon: <HeartPulse className="h-5 w-5" /> },
        { id: 'fitness', name: 'Fitness Coaching', icon: <Dumbbell className="h-5 w-5" /> },
    ];
    
    // 服务数据
    const services = [
        {
            id: 'photo-1',
            title: 'Professional Travel Photography',
            category: 'photography',
            price: 120,
            rating: 4.9,
            duration: '2 hours',
            isPopular: true,
            image: '/static/1.jpg'
        },
        {
            id: 'photo-2',
            title: 'Event Photography Service',
            category: 'photography',
            price: 180,
            rating: 4.8,
            duration: '3 hours',
            isPopular: false,
            image: '/static/2.png'
        },
        {
            id: 'chef-1',
            title: 'Private Chef for Romantic Dinner',
            category: 'private-chef',
            price: 200,
            rating: 4.95,
            duration: '3 hours',
            isPopular: true,
            image: '/static/3.png'
        },
        {
            id: 'chef-2',
            title: 'Cooking Class with Local Chef',
            category: 'private-chef',
            price: 150,
            rating: 4.85,
            duration: '2.5 hours',
            isPopular: false,
            image: '/static/4.png'
        },
        {
            id: 'spa-1',
            title: 'Luxury Spa & Massage Therapy',
            category: 'spa',
            price: 160,
            rating: 4.92,
            duration: '1.5 hours',
            isPopular: true,
            image: '/static/5.jpeg'
        },
        {
            id: 'spa-2',
            title: 'Couples Spa Experience',
            category: 'spa',
            price: 280,
            rating: 4.88,
            duration: '2 hours',
            isPopular: false,
            image: '/static/1.jpg'
        },
        {
            id: 'makeup-1',
            title: 'Professional Makeup & Hairstyling',
            category: 'makeup',
            price: 110,
            rating: 4.87,
            duration: '1.5 hours',
            isPopular: true,
            image: '/static/2.png'
        },
        {
            id: 'makeup-2',
            title: 'Bridal Makeup Package',
            category: 'makeup',
            price: 250,
            rating: 4.93,
            duration: '3 hours',
            isPopular: false,
            image: '/static/3.png'
        },
        {
            id: 'beauty-1',
            title: 'Professional Skincare Treatment',
            category: 'beauty',
            price: 130,
            rating: 4.89,
            duration: '1.5 hours',
            isPopular: true,
            image: '/static/4.png'
        },
        {
            id: 'beauty-2',
            title: 'Manicure & Pedicure Service',
            category: 'beauty',
            price: 90,
            rating: 4.82,
            duration: '1 hour',
            isPopular: false,
            image: '/static/5.jpeg'
        },
        {
            id: 'fitness-1',
            title: 'Personal Training Session',
            category: 'fitness',
            price: 100,
            rating: 4.86,
            duration: '1 hour',
            isPopular: true,
            image: '/static/1.jpg'
        },
        {
            id: 'fitness-2',
            title: 'Yoga & Meditation Instructor',
            category: 'fitness',
            price: 120,
            rating: 4.91,
            duration: '1.5 hours',
            isPopular: false,
            image: '/static/2.png'
        }
    ];
    
    // 过滤服务
    const filteredServices = services.filter(service => {
        const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    // 获取分类名称
    const getCategoryName = (id: string) => {
        return categories.find(cat => cat.id === id)?.name || id;
    };

    // 处理服务卡片点击
    const handleServiceClick = (serviceId: string) => {
        router.push(`/web2/service_detail?id=${serviceId}`);
    };
    
    return (
        <div className="min-h-screen bg-white">
            <Web2Header />
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#fe585f] to-[#ff7a80] text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Exclusive Services
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Premium personalized services to enhance your travel experience
                    </p>
                </div>
            </div>
            
            {/* Search and Filter Section */}
            <div className="container mx-auto px-4 py-8 -mt-16">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Search className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fe585f] focus:border-transparent"
                            />
                        </div>
                        
                        {/* Category Filter */}
                        <div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(category => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {/* Reset Button */}
                        <Button 
                            variant="outline" 
                            className="h-12 border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                            selectedCategory === 'all' 
                                ? 'bg-[#fe585f] text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Services
                    </button>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                                selectedCategory === category.id 
                                    ? 'bg-[#fe585f] text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.icon}
                            {category.name}
                        </button>
                    ))}
                </div>
                
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map(service => {
                        const category = categories.find(cat => cat.id === service.category);
                        return (
                            <div 
                                key={service.id} 
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer hover:-translate-y-1"
                                onClick={() => handleServiceClick(service.id)}
                            >
                                {/* Image Section */}
                                <div className="relative h-64 overflow-hidden">
                                    <div 
                                        className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 group-hover:scale-105 transition-transform duration-300"
                                        style={{
                                            backgroundImage: `url(${service.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                                    </div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                                        {category?.icon}
                                        <span className="text-sm font-medium text-gray-700">
                                            {getCategoryName(service.category)}
                                        </span>
                                    </div>
                                    
                                    {/* Popular Badge */}
                                    {service.isPopular && (
                                        <div className="absolute top-3 right-3 bg-[#fe585f] text-white text-xs px-2 py-1 rounded-full font-medium">
                                            Popular
                                        </div>
                                    )}
                                    
                                    {/* Rating Badge */}
                                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium text-gray-700">{service.rating}</span>
                                    </div>
                                </div>
                                
                                {/* Content Section */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#fe585f] transition-colors">
                                        {service.title}
                                    </h3>
                                    
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            <span className="text-sm">{service.duration}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-2xl font-bold text-[#fe585f]">
                                                ¥{service.price}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                per session
                                            </div>
                                        </div>
                                        
                                        <Button className="bg-[#fe585f] hover:bg-[#e04a50] text-white px-6 py-2 rounded-lg font-medium">
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Empty State */}
                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-2xl font-bold text-gray-700 mb-2">
                            No services found
                        </div>
                        <p className="text-gray-500 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <Button 
                            variant="outline"
                            className="border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
} 
