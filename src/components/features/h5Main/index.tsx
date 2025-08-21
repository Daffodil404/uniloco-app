'use client';

import { useState, useEffect, useRef } from 'react';
import Conversation from './Conversation';
import MapWIthRoute from './MapWIthRoute';
import SelectionPanel from './SelectionPanel';
import type { ExperienceItem, ItineraryItem, DayRoute, ChatMessage } from './types';
 

export default function RomePlanner() {
  const [currentMapView, setCurrentMapView] = useState<'3D' | '2D'>('3D');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('category');
  const [itineraryItems, setItineraryItems] = useState<ItineraryItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [pendingExperience, setPendingExperience] = useState<ExperienceItem | null>(null);
  const [currentDayView, setCurrentDayView] = useState(1);
  const [aiItineraryGenerated, setAiItineraryGenerated] = useState(false);
  const [suggestedItinerary, setSuggestedItinerary] = useState<DayRoute[] | null>(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMapDayControls, setShowMapDayControls] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: 'ai',
      content: `🎯 Welcome to Rome! I'm your AI travel planner.

I see you're traveling solo for 1–3 days and enjoy street food and cultural experiences.

Use the right panel to choose an experience type and tell me what you'd like to try!

💡 After choosing, you can add it directly to your itinerary.`,
      timestamp: Date.now()
    }
  ]);

  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // Data
  const allData: Record<string, ExperienceItem[]> = {
    service: [
      {
        id: 'spa1',
        name: 'Roman Classic SPA',
        type: 'service',
        emoji: '💆‍♀️',
        description: 'Authentic Roman thermal bath, private rooms, classical music ambience',
        location: 'Via dei Cappuccini, 9',
        price: 120,
        duration: '90 mins',
        rating: 4.9,
        tags: ['Private', 'Relax', 'Classical'],
        x: 45, y: 35,
        color: '#ff7675',
        unilocoInfo: {
          highlights: ['Roman interior', 'Private therapist', 'Herbal essential oils', 'Hot stone therapy'],
          bestTime: '2–4 PM less crowded',
          tips: 'Book in advance for 10% off',
          nearby: ['Pantheon (5 min walk)', 'Piazza Navona (8 min walk)']
        }
      },
      {
        id: 'chef1',
        name: 'Chef Mario’s Studio',
        type: 'service',
        emoji: '👨‍🍳',
        description: 'Learn authentic pasta with 1-on-1 guidance',
        location: 'Via del Corso, 123',
        price: 85,
        duration: '120 mins',
        rating: 4.8,
        tags: ['1-on-1', 'Workshop', 'Food'],
        x: 60, y: 25,
        color: '#fdcb6e',
        unilocoInfo: {
          highlights: ['Michelin chef', 'Family recipes', 'Take-home recipe', 'Small group'],
          bestTime: '10–12 AM best experience',
          tips: 'Wear apron and comfy shoes',
          nearby: ['Spanish Steps (3 min walk)', 'Trevi Fountain (7 min walk)']
        }
      }
    ],
    script: [
      {
        id: 'escape1',
        name: 'Roman Gladiator Escape',
        type: 'script',
        emoji: '🗝️',
        description: 'Immersive gladiator-themed escape room near the arena',
        location: 'Via del Teatro, 12',
        price: 45,
        duration: '90 mins',
        rating: 4.4,
        tags: ['Gladiator', 'History', 'Puzzle'],
        x: 75, y: 60,
        color: '#6c5ce7',
        website: 'https://rome-escape.com',
        unilocoInfo: {
          highlights: ['Immersive role-play', 'Actor interaction', 'Multiple endings', 'Teamwork'],
          bestTime: 'Evening ambience is best',
          tips: '2–4 people recommended; wear comfy clothes',
          nearby: ['Colosseum (10 min walk)', 'Roman Forum (12 min walk)']
        }
      },
      {
        id: 'mystery1',
        name: 'The Caesar Case',
        type: 'script',
        emoji: '🔍',
        description: 'Play detective and investigate Caesar’s assassination',
        location: 'Forum Romanum',
        price: 55,
        duration: '120 mins',
        rating: 4.6,
        tags: ['Role-play', 'Mystery', 'History'],
        x: 50, y: 45,
        color: '#a29bfe',
        website: 'https://rome-escape.com',
        unilocoInfo: {
          highlights: ['On-site exploration', 'Historian guide', 'Multiple clues', 'Interactive deduction'],
          bestTime: '9–11 AM lighting is best',
          tips: 'Knowing Roman history helps',
          nearby: ['Roman Forum (on-site)', 'Palatine Hill (5 min walk)']
        }
      }
    ],
    activity: [
      {
        id: 'cooking1',
        name: 'Italian Cooking Class',
        type: 'activity',
        emoji: '🍝',
        description: 'Learn to cook classic Roman dishes with market shopping',
        location: 'Trastevere',
        price: 75,
        duration: '180 mins',
        rating: 4.8,
        tags: ['Culture', 'Food', 'Hands-on'],
        x: 30, y: 55,
        color: '#ffeaa7',
        unilocoInfo: {
          highlights: ['Local market shopping', 'Home recipes', 'Taste your own dishes', 'Meet locals'],
          bestTime: 'Starts 9 AM incl. lunch',
          tips: 'Come hungry',
          nearby: ['Santa Maria Church (2 min walk)', 'Tiber River (8 min walk)']
        }
      },
      {
        id: 'opera1',
        name: 'Rome Opera House Classics',
        type: 'activity',
        emoji: '🎭',
        description: 'Enjoy Verdi and Puccini in a historic opera house',
        location: "Teatro dell'Opera di Roma",
        price: 85,
        duration: '150 mins',
        rating: 4.9,
        tags: ['Opera', 'Ballet', 'Culture', 'Art'],
        x: 65, y: 35,
        color: '#a29bfe',
        phone: '+39 06 481 601',
        details: 'World-class singers and productions in a 19th-century theater',
        website: 'https://operaroma.it',
        unilocoInfo: {
          highlights: ['Historic theater', 'World-class singers', 'Classic repertoire', 'Lavish costumes'],
          bestTime: '8 PM start, arrive 30 mins early',
          tips: 'Smart casual recommended',
          nearby: ['Piazza della Repubblica (5 min walk)', 'Diocletian Baths (8 min walk)']
        }
      }
    ],
    dining: [
      {
        id: 'restaurant1',
        name: 'Da Armando al Pantheon',
        type: 'dining',
        emoji: '🍽️',
        description: 'Since 1961. Traditional Roman dishes next to Pantheon',
        location: 'Via degli Orfani, 114',
        price: 45,
        duration: '90 mins',
        rating: 4.7,
        tags: ['Traditional', 'Family', 'Local'],
        x: 55, y: 40,
        color: '#ff6b9d',
        unilocoInfo: {
          highlights: ['Since 1961', 'Classic Roman dishes', 'Local favorite', 'Best Pantheon view'],
          bestTime: 'Lunch 12:30–14:00; Dinner 19:30–21:30',
          tips: 'Reservation strongly recommended',
          nearby: ['Pantheon (1 min walk)', 'Piazza Navona (5 min walk)']
        }
      }
    ],
    attractions: [
      {
        id: 'colosseum1',
        name: 'Colosseum Fast Track',
        type: 'attraction',
        emoji: '🏛️',
        description: 'Skip-the-line ticket incl. audio guide and underground access',
        location: 'Piazza del Colosseo',
        price: 35,
        duration: '120 mins',
        rating: 4.9,
        tags: ['Fast track', 'Guide', 'History'],
        x: 70, y: 50,
        color: '#74b9ff',
        booking: 'https://coopculture.it',
        unilocoInfo: {
          highlights: ['Skip the line', 'Arena + underground', 'Multi-language audio', 'Forum combo ticket'],
          bestTime: '8:30 AM opening hours',
          tips: 'Consider combo ticket with Forum',
          nearby: ['Roman Forum (3 min walk)', 'Arch of Constantine (2 min walk)']
        }
      }
    ]
  };

  // Calculate total
  const calculateTotalCost = () => {
    return itineraryItems.reduce((total, item) => total + item.price, 0);
  };

  // Add message
  const addMessage = (type: 'ai' | 'user' | 'uniloco', content: string) => {
    setChatMessages(prev => [...prev, { type, content, timestamp: Date.now() }]);
  };

  // Select category
  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'itinerary') {
      generateAIItinerary();
    } else {
      setShowTimeSelection(true);
      setShowSearchResults(false);
    }

    const responses: Record<string, string> = {
      'activity': 'Activities selected. Which day would you like to plan?',
      'script': 'Scripted experiences selected. Which day would you like?',
      'service': 'Service selected. Which day would you like to book?',
      'itinerary': 'Let me generate a 3-day plan tailored to you...'
    };

    addMessage('ai', responses[category] || 'Please choose an experience type.');
  };

  // Generate itinerary (3 days)
  const generateAIItinerary = () => {
    setShowSearchResults(true);
    setShowMapDayControls(true);
    
    const itinerary: DayRoute[] = [
      {
        day: 1,
        title: 'Day 1 - Classic Rome',
        startLocation: 'Colosseo Metro Station',
        endLocation: 'Via dei Cappuccini SPA',
        totalDuration: 'About 8 hours',
        walkingDistance: '2.5 km',
        activities: [
          { time: '09:00-11:15', activity: 'Colosseum Fast Track', emoji: '🏛️', id: 'colosseum1', selected: true, location: 'Piazza del Colosseo, 1', duration: '2h15m', price: '€35', website: 'https://coopculture.it' },
          { time: '11:30-12:45', activity: 'Roman Forum Walk', emoji: '🚶‍♂️', id: 'forum_walk', selected: true, location: 'Forum', duration: '1h15m' },
          { time: '15:00-16:30', activity: 'SPA Relax Session', emoji: '🧖‍♀️', id: 'spa1', selected: true, location: 'Via dei Cappuccini, 9', duration: '1h30m' }
        ]
      },
      {
        day: 2,
        title: 'Day 2 - Culture & Food',
        startLocation: 'Trastevere Market',
        endLocation: 'Private Chef Studio',
        totalDuration: 'About 9 hours',
        walkingDistance: '3.2 km',
        activities: [
          { time: '10:00-13:00', activity: 'Italian Cooking Class', emoji: '🍝', id: 'cooking1', selected: true, location: 'Trastevere', duration: '3h' },
          { time: '15:30-17:30', activity: 'Caesar Mystery Role-play', emoji: '🔍', id: 'mystery1', selected: true, location: 'Forum Area', duration: '2h' },
          { time: '19:30-21:00', activity: 'Private Chef Tasting Menu', emoji: '👨‍🍳', id: 'chef1', selected: true, location: 'Via del Corso', duration: '1h30m' }
        ]
      },
      {
        day: 3,
        title: 'Day 3 - Vatican & Opera',
        startLocation: 'Vatican Museums',
        endLocation: 'Rome Opera House',
        totalDuration: 'About 8 hours',
        walkingDistance: '2.1 km',
        activities: [
          { time: '09:30-12:00', activity: 'Vatican Museums Highlights', emoji: '🎨', id: 'vatican_museum', selected: true, location: 'Viale Vaticano', duration: '2h30m' },
          { time: '12:15-13:15', activity: 'St. Peter’s Basilica', emoji: '⛪', id: 'st_peter', selected: true, location: 'Piazza San Pietro', duration: '1h' },
          { time: '20:00-22:30', activity: 'Opera Night', emoji: '🎭', id: 'opera1', selected: true, location: "Teatro dell'Opera di Roma", duration: '2h30m' }
        ]
      }
    ];

    setSuggestedItinerary(itinerary);
    setAiItineraryGenerated(true);
  };

  const toggleMap = () => setCurrentMapView(prev => prev === '3D' ? '2D' : '3D');
  const showDayRoute = (day: number) => setCurrentDayView(day);

  // Confirm selection: reveal results panel
  const handleConfirmSelection = () => {
    setShowSearchResults(true);
    addMessage('ai', 'Great! I have prepared some results for you on the right panel.');
  };

  const sendMessage = () => {
    if (!chatInputRef.current) return;
    const message = chatInputRef.current.value.trim();
    if (message === '') return;
    addMessage('user', message);
    chatInputRef.current.value = '';
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addMessage('ai', aiResponse);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes('spa') || message.includes('relax')) {
      selectCategory('service');
      return '🛀 Got it! SPA is great here. Please choose a day and time.';
    } else if (message.includes('food') || message.includes('restaurant') || message.includes('eat')) {
      return '🍝 Rome food is amazing! Private chef and cooking class are highly recommended. Which would you like?';
    } else if (message.includes('escape') || message.includes('game') || message.includes('script')) {
      selectCategory('script');
      return '🎭 Nice choice! Pick a day to experience a themed role-play or escape room.';
    } else if (message.includes('itinerary') || message.includes('plan') || message.includes('arrangement')) {
      selectCategory('itinerary');
      return '📋 I will generate a 3-day plan balancing culture, food and rest.';
    }
    return 'Tell me more about your preference. You can pick from the right panel as well!';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 overflow-hidden">
      <div className="flex w-full h-full">
        <Conversation
          chatMessages={chatMessages}
          chatMessagesRef={chatMessagesRef}
          chatInputRef={chatInputRef}
          itineraryItems={itineraryItems}
          onRemoveItineraryItem={(index) => setItineraryItems(prev => prev.filter((_, i) => i !== index))}
          onKeyPress={handleKeyPress}
        />
        <MapWIthRoute
          currentMapView={currentMapView}
          selectedCategory={selectedCategory}
          allData={allData}
          showMapDayControls={showMapDayControls}
          currentDayView={currentDayView}
          onToggleMap={toggleMap}
          onShowDayRoute={showDayRoute}
        />
        <SelectionPanel
          selectedCategory={selectedCategory}
          showTimeSelection={showTimeSelection}
          showSearchResults={showSearchResults}
          selectedDay={selectedDay}
          selectedTimeSlot={selectedTimeSlot}
          allData={allData}
          onSelectCategory={selectCategory}
          onSetDay={(d) => setSelectedDay(d)}
          onSetTimeSlot={(s) => setSelectedTimeSlot(s)}
          aiItineraryGenerated={aiItineraryGenerated}
          suggestedItinerary={suggestedItinerary}
          onConfirmSelection={handleConfirmSelection}
        />
      </div>
    </div>
  );
}
