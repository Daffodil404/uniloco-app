'use client';

import { useState, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  fallbackSrc?: string;
  className?: string;
  aspectRatio?: string;
  showControls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  brightness?: number; // 亮度调整 (0.5-2.0)
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: Event) => void;
}

export default function VideoPlayer({
  src,
  fallbackSrc,
  className = "w-full h-full object-cover rounded-2xl",
  aspectRatio = "aspect-video",
  showControls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  brightness = 1.05,
  onPlay,
  onPause,
  onEnded,
  onError
}: VideoPlayerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    onPlay?.();
    // 模拟触觉反馈
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    onPause?.();
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setVideoError(true);
    setVideoLoaded(false);
    onError?.(e.nativeEvent);
  };



  const handleRetry = () => {
    setVideoError(false);
    setVideoLoaded(false);
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.load();
    }
  };

  return (
    <div className={`relative group ${aspectRatio === "aspect-video" ? aspectRatio : ""} rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 overflow-hidden bg-transparent cursor-pointer ${aspectRatio !== "aspect-video" ? aspectRatio : ""}`}>
      {/* Video Loading State */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Loading Video...</p>
            <p className="text-sm opacity-80 mt-2">Please wait...</p>
          </div>
        </div>
      )}

      {/* Video Error State */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B0B0B] z-10">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-lg font-semibold mb-2">Video Unavailable</p>
            <p className="text-sm opacity-80 mb-4">Please try again later</p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-white text-[#fe5a5e] rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              🔄 Retry
            </button>
          </div>
        </div>
      )}

      {/* Video Player */}
      <video
        className={className}
        controls={showControls}
        preload="auto"
        playsInline
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        onEnded={onEnded || handleVideoPause}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
      >
        <source src={src} type="video/mp4" />
        {fallbackSrc && <source src={fallbackSrc} type="video/quicktime" />}
        Your browser does not support the video tag.
      </video>

      {/* Fullscreen Hint */}
      {videoLoaded && !videoError && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs z-20">
          Double-click for fullscreen
        </div>
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        /* Video Player Optimization */
        video {
          border-radius: 1rem;
          background: transparent;
          /* 优化视频亮度和对比度 - 如果视频偏黑可以调整这些值 */
          filter: brightness(${brightness}) contrast(1.02) saturate(1.05);
          /* 确保视频色彩空间正确 */
          color-scheme: light;
          /* 确保视频正确显示 */
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        
        video::-webkit-media-controls {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0 0 1rem 1rem;
        }
        
        video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        video::-webkit-media-controls-play-button {
          background-color: rgba(254, 88, 95, 0.9);
          border-radius: 50%;
          color: white;
        }
        
        video::-webkit-media-controls-timeline {
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 2px;
        }
        
        video::-webkit-media-controls-current-time-display,
        video::-webkit-media-controls-time-remaining-display {
          color: white;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        }
        
        video::-webkit-media-controls-enclosure {
          background: transparent;
        }
        
        video::-moz-media-controls {
          background-color: rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          video {
            width: 100%;
            height: auto;
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
