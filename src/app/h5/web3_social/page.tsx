"use client";

import { useEffect, useMemo, useState } from "react";

type Quest = {
    activity: string;
    location: string;
    time: string;
    organizer: string;
    participants: string;
};

const QUESTS: Record<string, Quest> = {
    London: {
        activity: "⚽ Football Match",
        location: "Hyde Park",
        time: "Saturday 3:00 PM",
        organizer: "James_UK",
        participants: "6/11 players",
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
    const [selectedCity, setSelectedCity] = useState<string>("Luxembourg");
    const [searchIdx, setSearchIdx] = useState(0);

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

    return (
        <div className="page-root">
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
                            European City
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
                                    "Tennis Luxembourg tomorrow" - Natural language quest
                                    discovery
                                </div>
                            </div>

                            <div className="feature-card">
                                <span className="feature-icon">💬</span>
                                <div className="feature-title">Instant Chat</div>
                                <div className="feature-desc">
                                    Join quest creators' group chats with one tap
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
                                <div className="search-bar">🔍 {SEARCHES[searchIdx]}</div>

                                <button
                                    className="city-marker marker-london"
                                    onClick={() => setSelectedCity("London")}
                                    aria-label="London marker"
                                >
                                    🇬🇧
                                </button>
                                <button
                                    className="city-marker marker-paris"
                                    onClick={() => setSelectedCity("Paris")}
                                    aria-label="Paris marker"
                                >
                                    🇫🇷
                                </button>
                                <button
                                    className="city-marker marker-berlin"
                                    onClick={() => setSelectedCity("Berlin")}
                                    aria-label="Berlin marker"
                                >
                                    🇩🇪
                                </button>
                                <button
                                    className="city-marker marker-luxembourg"
                                    onClick={() => setSelectedCity("Luxembourg")}
                                    aria-label="Luxembourg marker"
                                >
                                    🇱🇺
                                </button>
                                <button
                                    className="city-marker marker-amsterdam"
                                    onClick={() => setSelectedCity("Amsterdam")}
                                    aria-label="Amsterdam marker"
                                >
                                    🇳🇱
                                </button>
                                <button
                                    className="city-marker marker-zurich"
                                    onClick={() => setSelectedCity("Zurich")}
                                    aria-label="Zurich marker"
                                >
                                    🇨🇭
                                </button>

                                {/* Re-mount on city change to retrigger slideInUp */}
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
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          overflow: hidden;
          min-height: 100vh;
        }
        .slide {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px;
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
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
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
          background: linear-gradient(45deg, #fff, #e8f4fd);
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
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.12);
        }
        .feature-icon { font-size: 28px; margin-bottom: 15px; display: block; }
        .feature-title { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
        .feature-desc { font-size: 14px; opacity: 0.8; line-height: 1.4; }
        .cta-section { display: flex; align-items: center; gap: 30px; }
        .cta-button {
          padding: 18px 35px;
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          border: none;
          border-radius: 30px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
        }
        .demo-stats { display: flex; flex-direction: column; gap: 8px; }
        .stat-item { font-size: 14px; opacity: 0.8; }
        .stat-number { color: #4ecdc4; font-weight: 600; }

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
          background: rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }
        .map-background { width: 100%; height: 100%; background: linear-gradient(45deg, #1e3c72, #2a5298); position: relative; }

        .city-marker {
          position: absolute;
          width: 50px;
          height: 50px;
          background: #ff6b6b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          animation: pulse 2s infinite;
          cursor: pointer;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .city-marker:hover { transform: scale(1.2); box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6); }
        .marker-london { top: 120px; left: 80px; }
        .marker-paris { top: 180px; left: 120px; }
        .marker-berlin { top: 140px; left: 220px; }
        .marker-luxembourg { top: 170px; left: 160px; background: #4ecdc4; }
        .marker-amsterdam { top: 100px; left: 170px; }
        .marker-zurich { top: 220px; left: 180px; }

        .search-bar {
          position: absolute;
          top: 25px;
          left: 25px;
          right: 25px;
          background: rgba(255, 255, 255, 0.95);
          padding: 18px 25px;
          border-radius: 30px;
          color: #333;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .activity-popup {
          position: absolute;
          bottom: 25px;
          right: 25px;
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          border-radius: 16px;
          color: #333;
          font-size: 13px;
          max-width: 220px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideInUp 0.5s ease;
        }
        .popup-header { font-weight: 600; margin-bottom: 8px; color: #2a5298; }
        .popup-details { margin-bottom: 10px; line-height: 1.4; }
        .popup-participants { background: #4ecdc4; color: white; padding: 4px 10px; border-radius: 12px; font-size: 11px; display: inline-block; }

        .background-elements { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: -1; }
        .bg-shape { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.03); animation: float 8s ease-in-out infinite; }
        .bg-shape:nth-child(1) { width: 300px; height: 300px; top: -50px; right: -50px; animation-delay: 0s; }
        .bg-shape:nth-child(2) { width: 200px; height: 200px; bottom: -30px; left: -30px; animation-delay: 3s; }
        .bg-shape:nth-child(3) { width: 150px; height: 150px; top: 40%; right: 15%; animation-delay: 6s; }

        @keyframes pulse { 0%, 100% { transform: scale(1);} 50% { transform: scale(1.1);} }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(180deg); } }
        @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 1200px) {
          .content-grid { grid-template-columns: 1fr; gap: 50px; text-align: center; }
          .main-title { font-size: 42px; }
          .features-grid { grid-template-columns: 1fr; }
          .europe-map { width: 350px; height: 400px; margin: 0 auto; }
          .cta-section { justify-content: center; }
        }
      `}</style>
        </div>
    );
}
