'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './button';

interface CalendarDay {
    date: string;
    status: 'available' | 'limited' | 'full' | 'booked';
    label: string;
    price?: number;
}

interface CalendarProps {
    days: CalendarDay[];
    currentMonth: Date;
    onMonthChange: (date: Date) => void;
    onDateSelect: (date: string) => void;
    selectedDate?: string;
    title?: string;
}

export default function Calendar({ 
    days, 
    currentMonth, 
    onMonthChange, 
    onDateSelect, 
    selectedDate,
    title = "📅 Check availability"
}: CalendarProps) {
    const [hoveredDate, setHoveredDate] = useState<string | null>(null);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getStatusColor = (status: string, isSelected: boolean, isHovered: boolean) => {
        if (isSelected) {
            return 'bg-[#fe585f] border-[#fe585f] text-white shadow-lg scale-105';
        }
        
        if (isHovered && status !== 'full') {
            return 'border-[#fe585f] bg-[#fe585f]/5 shadow-md scale-105';
        }

        switch (status) {
            case 'available':
                return 'border-gray-300 bg-white hover:border-[#fe585f] hover:bg-[#fe585f]/5 hover:shadow-md';
            case 'limited':
                return 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 hover:border-orange-400 hover:bg-orange-200';
            case 'full':
                return 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60';
            case 'booked':
                return 'border-red-200 bg-gradient-to-br from-red-50 to-red-100 text-red-600';
            default:
                return 'border-gray-300 bg-white';
        }
    };

    const getStatusTextColor = (status: string, isSelected: boolean) => {
        if (isSelected) return 'text-white';
        
        switch (status) {
            case 'available':
                return 'text-gray-900';
            case 'limited':
                return 'text-orange-700';
            case 'full':
                return 'text-gray-400';
            case 'booked':
                return 'text-red-600';
            default:
                return 'text-gray-900';
        }
    };

    const getStatusIndicator = (status: string) => {
        switch (status) {
            case 'limited':
                return (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                );
            case 'booked':
                return (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#fe585f] to-[#ff7a80] rounded-xl flex items-center justify-center">
                        <CalendarIcon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                </div>
                
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="bg-gray-50 px-4 py-2 rounded-xl">
                        <span className="font-semibold text-gray-900">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-3 mb-4">
                {weekDays.map(day => (
                    <div key={day} className="text-center py-3">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                            {day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">
                {days.map((day, index) => {
                    const isSelected = selectedDate === day.date;
                    const isHovered = hoveredDate === day.date;
                    
                    return (
                        <div
                            key={index}
                            onClick={() => day.status !== 'full' && onDateSelect(day.date)}
                            onMouseEnter={() => setHoveredDate(day.date)}
                            onMouseLeave={() => setHoveredDate(null)}
                            className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                getStatusColor(day.status, isSelected, isHovered)
                            } ${day.status === 'full' ? 'cursor-not-allowed' : ''}`}
                        >
                            <div className={`text-center ${getStatusTextColor(day.status, isSelected)}`}>
                                <div className="font-bold text-lg mb-1">
                                    {day.date.split('/')[1]}
                                </div>
                                <div className="text-xs font-medium opacity-75 mb-2">
                                    {day.label}
                                </div>
                                {day.status === 'available' && day.price && (
                                    <div className="text-xs font-bold text-[#fe585f] bg-white/80 rounded-full px-2 py-1">
                                        ¥{day.price}
                                    </div>
                                )}
                            </div>
                            
                            {/* Status indicator */}
                            {getStatusIndicator(day.status)}
                            
                            {/* Selection indicator */}
                            {isSelected && (
                                <div className="absolute inset-0 border-2 border-[#fe585f] rounded-xl animate-pulse"></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded-lg shadow-sm"></div>
                    <span className="text-sm font-medium text-gray-600">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg relative">
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Limited</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 rounded-lg relative">
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Booked</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-gray-200 bg-gray-100 rounded-lg opacity-60"></div>
                    <span className="text-sm font-medium text-gray-600">Full</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex items-center justify-center space-x-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-[#fe585f] text-[#fe585f] hover:bg-[#fe585f] hover:text-white"
                >
                    View Next Month
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                    Download Calendar
                </Button>
            </div>
        </div>
    );
}
