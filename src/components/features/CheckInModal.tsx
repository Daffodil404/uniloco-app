'use client';

import { useState, useRef, useEffect } from 'react';
import type { MapPoint } from '@/types/travel';

interface CheckInData {
  pointId?: string;
  timestamp?: string;
  location?: string;
  notes: string;
  photos: string[];
  unc?: string;
}

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPoint: MapPoint | null;
  onSubmit: (data: CheckInData) => void;
}

export default function CheckInModal({ isOpen, onClose, selectedPoint, onSubmit }: CheckInModalProps) {
  const [checkInData, setCheckInData] = useState<CheckInData>({
    notes: '',
    photos: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取当前位置
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // 使用默认位置（东京）
          setCurrentLocation({
            lat: 35.6762,
            lng: 139.6503
          });
        }
      );
    }
  };

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const imageUrls = fileArray.map(file => URL.createObjectURL(file));
      
      setCheckInData(prev => ({
        ...prev,
        notes: prev.notes || '',
        photos: [...(prev.photos || []), ...imageUrls]
      }));
    }
  };

  // 生成UNC
  const generateUNC = () => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `UNC_${timestamp}_${randomString}`;
  };

  // 提交打卡
  const handleSubmitCheckIn = async () => {
    if (!selectedPoint) return;

    setIsSubmitting(true);

    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));

      const unc = generateUNC();
      const finalCheckInData: CheckInData = {
        ...checkInData,
        pointId: selectedPoint.id,
        timestamp: new Date().toISOString(),
        location: selectedPoint.name,
        unc
      };

      onSubmit(finalCheckInData);
      onClose();
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 当modal打开时获取位置
  useEffect(() => {
    if (isOpen && selectedPoint) {
      getCurrentLocation();
      // 重置表单数据
      setCheckInData({
        notes: '',
        photos: []
      });
    }
  }, [isOpen, selectedPoint]);

  if (!isOpen || !selectedPoint) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-6 border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{selectedPoint.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FF9E4A] text-sm">★ {selectedPoint.rating}</span>
              <span className="text-white/60 text-xs">{selectedPoint.openingHours}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          {/* 定位打卡 */}
          <div className="bg-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold">Location Check-in</h4>
                <p className="text-white/60 text-sm">
                  {currentLocation ? 
                    `Lat: ${currentLocation.lat.toFixed(4)}, Lng: ${currentLocation.lng.toFixed(4)}` : 
                    'Getting your location...'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={getCurrentLocation}
              className="w-full px-4 py-2 bg-gradient-to-r from-[#4A90E2] to-[#64D8EF] text-white rounded-xl text-sm font-medium"
            >
              Update Location
            </button>
          </div>

          {/* 文字记录 */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Share Your Experience</label>
            <textarea
              placeholder="What's your impression of this place? Any tips for other travelers?"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              rows={3}
              value={checkInData.notes}
              onChange={(e) => setCheckInData(prev => ({
                ...prev,
                notes: e.target.value,
                photos: prev.photos || []
              }))}
            />
          </div>
          
          {/* 上传图片 */}
          <div>
            <label className="block text-white/80 text-sm mb-2">Upload Photos</label>
            <div 
              className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-white/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <svg className="w-8 h-8 text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-white/60 text-sm">Tap to upload photos</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            {/* 已上传的图片预览 */}
            {checkInData.photos && checkInData.photos.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {checkInData.photos.map((photo, index) => (
                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 提交按钮 */}
          <div className="flex gap-3">
            <button 
              onClick={handleSubmitCheckIn}
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#FF9E4A] to-[#FFB366] text-white rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Check-in'
              )}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 