"use client";

import { useEffect, useMemo, useState } from "react";
import InteractiveMap from "@/components/features/InteractiveMap";
import type { MapPoint } from "@/types/travel";

type Quest = {
    activity: string;
    location: string;
    time: string;
    organizer: string;
    participants: string;
};

const QUESTS: Record<string, Quest> = {
    London: {
        activity: "🌐 Web3 Meetup",
        location: "Hyde Park",
        time: "Saturday 3:00 PM",
        organizer: "James_UK",
        participants: "6/11 people",
    },
    Paris: {
        activity: "🎨 Art Walk",
        location: "Montmartre District",
        time: "Sunday 10:00 AM",
        organizer: "Sophie_Paris",
        participants: "8/12 people",
    },
    Berlin: {
        activity: "🏃 Morning Run",
        location: "Tiergarten",
        time: "Tomorrow 7:00 AM",
        organizer: "Klaus_Berlin",
        participants: "5/8 runners",
    },
    Luxembourg: {
        activity: "🏸 Badminton Night",
        location: "Kirchberg Sports Center",
        time: "Tonight 7:00 PM",
        organizer: "Marie_Lux",
        participants: "2/4 players",
    },
    Amsterdam: {
        activity: "🚲 Bike Tour",
        location: "Vondelpark",
        time: "Friday 2:00 PM",
        organizer: "Anna_NL",
        participants: "4/6 cyclists",
    },
    Zurich: {
        activity: "⛷️ Ski Planning",
        location: "Central Café",
        time: "Thursday 6:00 PM",
        organizer: "Hans_CH",
        participants: "3/8 people",
    },
};

const SEARCHES = [
    "Badminton Luxembourg tonight",
    "Tennis Paris tomorrow",
    "Football Berlin weekend",
    "Art walk Amsterdam Sunday",
    "Ski trip Zurich planning",
];

export default function QuestCityLanding() {
    const [selectedCity, setSelectedCity] = useState<string>("London");
    const [searchIdx, setSearchIdx] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [mapPoints, setMapPoints] = useState<MapPoint[]>([
        {
            id: "1",
            name: "Heathrow Airport",
            lat: 51.4700,
            lng: -0.4543,
            type: "attraction",
            rating: 4.5,
            images: ["/static/airport.jpg"]
        },
        {
            id: "2", 
            name: "Hyde Park",
            lat: 51.5074,
            lng: -0.1657,
            type: "attraction",
            rating: 4.8,
            images: ["/static/park.jpg"]
        },
        {
            id: "3",
            name: "Big Ben",
            lat: 51.4994,
            lng: -0.1245,
            type: "attraction",
            rating: 4.7,
            images: ["/static/bigben.jpg"]
        }
    ]);

    useEffect(() => {
        const id = setInterval(() => {
            setSearchIdx((i) => (i + 1) % SEARCHES.length);
        }, 3000);
        return () => clearInterval(id);
    }, []);

    const quest = useMemo(() => QUESTS[selectedCity], [selectedCity]);

    const showDemo = () => {
        alert(
            "🎉 Welcome to QuestCity Beta!\n\n🌍 Available in 12 European cities\n🎮 Join 2,500+ active questers\n🚀 850+ daily quests created\n\n👥 Connect with locals through real activities\n📍 From badminton in Luxembourg to art walks in Paris\n⚡ Real-time, location-based social gaming"
        );
    };

    const handleMapPointClick = (point: MapPoint) => {
        console.log('Map point clicked:', point);
        // 可以在这里添加点击地图点后的逻辑
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            // 这里可以添加搜索逻辑
        }
    };

    return (
        <div className="page-root">
            {/* 固定在顶部的Header */}
            <header className="fixed-header">
                <div className="header-content">
                    <div className="header-logo">🏰 QuestCity</div>
                    <div className="header-nav">
                        <span className="nav-item">Home</span>
                        <span className="nav-item">Explore</span>
                        <span className="nav-item">Community</span>
                        <span className="nav-item">Profile</span>
                    </div>
                </div>
            </header>

            <div className="background-elements">
                <div className="bg-shape" />
                <div className="bg-shape" />
                <div className="bg-shape" />
            </div>

            <div className="slide">
                <div className="content-grid">
                    <div className="left-content">
                        <div className="logo-section">
                            <div className="logo">🏰 QuestCity</div>
                            <div className="tagline">European Edition</div>
                        </div>

                        <h1 className="main-title">
                            Transform Your
                            <br />
                             City
                            <br />
                            Into an RPG
                        </h1>

                        <p className="subtitle">
                            Discover real-world quests on a 3D map.
                            <br />
                            Connect with locals through location-based activities.
                        </p>

                        <div className="features-grid">
                            <div className="feature-card">
                                <span className="feature-icon">🗺️</span>
                                <div className="feature-title">3D City Maps</div>
                                <div className="feature-desc">
                                    Explore European cities in stunning 3D with real-time activity
                                    markers
                                </div>
                            </div>

                            <div className="feature-card">
                                <span className="feature-icon">🔍</span>
                                <div className="feature-title">Smart Search</div>
                                <div className="feature-desc">
                                    &quot;Tennis Luxembourg tomorrow&quot; - Natural language quest
                                    discovery
                                </div>
                            </div>

                            <div className="feature-card">
                                <span className="feature-icon">💬</span>
                                <div className="feature-title">Instant Chat</div>
                                <div className="feature-desc">
                                    Join quest creators&apos; group chats with one tap
                                </div>
                            </div>

                            <div className="feature-card">
                                <span className="feature-icon">⏰</span>
                                <div className="feature-title">Auto-Cleanup</div>
                                <div className="feature-desc">
                                    Quests disappear after completion - no digital clutter
                                </div>
                            </div>
                        </div>

                        <div className="cta-section">
                            <button className="cta-button" onClick={showDemo}>
                                Join the Beta
                            </button>
                            <div className="demo-stats">
                                <div className="stat-item">
                                    <span className="stat-number">12+</span> European Cities
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">2.5K+</span> Active Questers
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">850+</span> Daily Quests
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="europe-map">
                            <div className="map-background">
                                {/* 真实搜索框 */}
                                <form onSubmit={handleSearchSubmit} className="search-bar">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for activities, places, or people..."
                                        className="flex-1 bg-transparent border-none outline-none text-[#fe5a5e] placeholder-[#fe5a5e]/60"
                                    />
                                    <button type="submit" className="text-[#fe5a5e] hover:text-[#fe5a5e]/80">
                                        🔍
                                    </button>
                                </form>

                                {/* 交互式地图 */}
                                <div className="map-container">
                                    <InteractiveMap
                                        mapPoints={mapPoints}
                                        onPointClick={handleMapPointClick}
                                        center={[51.4700, -0.4543]} // 希思罗机场
                                        zoom={12}
                                    />
                                </div>

                                {/* 活动信息弹窗 */}
                                <div key={selectedCity} className="activity-popup">
                                    <div className="popup-header">{quest.activity}</div>
                                    <div className="popup-details">
                                        📍 {quest.location}
                                        <br />🕒 {quest.time}
                                        <br />👤 Posted by: {quest.organizer}
                                    </div>
                                    <div className="popup-participants">{quest.participants}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .page-root {
          font-family: 'Segoe UI', 'Arial', sans-serif;
          background: linear-gradient(135deg, #fe5a5e 0%, #ff7a80 100%);
          color: white;
          overflow: hidden;
          min-height: 100vh;
        }
        
        /* 固定在顶部的Header样式 */
        .fixed-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(254, 90, 94, 0.1);
          z-index: 1000;
          padding: 15px 0;
        }
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-logo {
          font-size: 24px;
          font-weight: bold;
          color: #fe5a5e;
        }
        .header-nav {
          display: flex;
          gap: 30px;
        }
        .nav-item {
          color: #fe5a5e;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s ease;
          font-size: 16px;
        }
        .nav-item:hover {
          color: #ff7a80;
        }
        .slide {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 60px 60px; /* 顶部增加60px为header留空间 */
          position: relative;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 80px;
          max-width: 1400px;
          width: 100%;
          align-items: center;
        }
        .left-content { z-index: 10; }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 50px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(45deg, #ffffff, #f8f9fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tagline { font-size: 14px; opacity: 0.8; font-weight: 300; }
        .main-title {
          font-size: 54px;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 25px;
          background: linear-gradient(45deg, #ffffff, #f8f9fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subtitle {
          font-size: 22px;
          margin-bottom: 50px;
          opacity: 0.9;
          line-height: 1.4;
          font-weight: 300;
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 50px;
        }
        .feature-card {
          padding: 25px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(254, 90, 94, 0.1);
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(254, 90, 94, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        .feature-icon { font-size: 28px; margin-bottom: 15px; display: block; }
        .feature-title { 
          font-size: 16px; 
          font-weight: 600; 
          margin-bottom: 8px; 
          color: #fe5a5e; /* 主题色 */
        }
        .feature-desc { 
          font-size: 14px; 
          color: #666666; /* 黑灰色 */
          line-height: 1.4; 
        }
        .cta-section { display: flex; align-items: center; gap: 30px; }
        .cta-button {
          padding: 18px 35px;
          background: linear-gradient(45deg, #ffffff, #f8f9fa);
          border: none;
          border-radius: 30px;
          color: #fe5a5e;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.4);
          background: linear-gradient(45deg, #f8f9fa, #ffffff);
        }
        .demo-stats { display: flex; flex-direction: column; gap: 8px; }
        .stat-item { font-size: 14px; opacity: 0.8; }
        .stat-number { color: #ffffff; font-weight: 600; }

        .right-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .europe-map {
          width: 450px;
          height: 500px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          position: relative;
          overflow: hidden;
        }
        .map-background { width: 100%; height: 100%; background: linear-gradient(45deg, #fe5a5e, #ff7a80); position: relative; }
        .map-container { 
          position: absolute; 
          top: 100px; /* 增加顶部间距，与搜索框分开 */
          left: 25px; 
          right: 25px; 
          bottom: 100px; /* 增加底部间距 */
          border-radius: 16px; 
          overflow: hidden; 
        }



        .search-bar {
          position: absolute;
          top: 25px;
          left: 25px;
          right: 25px;
          background: rgba(255, 255, 255, 0.95);
          padding: 18px 25px;
          border-radius: 30px;
          color: #fe5a5e;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 25px rgba(254, 90, 94, 0.2);
          border: 1px solid rgba(254, 90, 94, 0.1);
          z-index: 1002; /* 确保在最上层 */
        }
        .activity-popup {
          position: absolute;
          bottom: 25px;
          right: 25px;
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          border-radius: 16px;
          color: #fe5a5e;
          font-size: 13px;
          max-width: 220px;
          box-shadow: 0 10px 30px rgba(254, 90, 94, 0.2);
          animation: slideInUp 0.5s ease;
          border: 1px solid rgba(254, 90, 94, 0.1);
          z-index: 1001; /* 确保在地图之上 */
        }
        .popup-header { font-weight: 600; margin-bottom: 8px; color: #fe5a5e; }
        .popup-details { margin-bottom: 10px; line-height: 1.4; color: #666; }
        .popup-participants { background: #fe5a5e; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; display: inline-block; }

        .background-elements { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -1; }
        .bg-shape { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.08); animation: float 8s ease-in-out infinite; }
        .bg-shape:nth-child(1) { width: 300px; height: 300px; top: -50px; right: -50px; animation-delay: 0s; }
        .bg-shape:nth-child(2) { width: 200px; height: 200px; bottom: -30px; left: -30px; animation-delay: 3s; }
        .bg-shape:nth-child(3) { width: 150px; height: 150px; top: 40%; right: 15%; animation-delay: 6s; }


        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(180deg); } }
        @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 1200px) {
          .content-grid { grid-template-columns: 1fr; gap: 50px; text-align: center; }
          .main-title { font-size: 42px; }
          .features-grid { grid-template-columns: 1fr; }
          .europe-map { width: 350px; height: 400px; margin: 0 auto; }
          .cta-section { justify-content: center; }
          .header-content { padding: 0 30px; }
          .header-nav { gap: 20px; }
        }
        
        @media (max-width: 768px) {
          .header-content { padding: 0 20px; }
          .header-nav { gap: 15px; }
          .nav-item { font-size: 14px; }
          .header-logo { font-size: 20px; }
          .slide { padding: 100px 20px 40px; }
        }
      `}</style>
        </div>
    );
}
