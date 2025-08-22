import type { ExperienceItem, DayRoute } from './types';

type Category = 'activity' | 'script' | 'service' | 'dining' | 'attractions';

export const mockSearchResults: Record<string, ExperienceItem[]> = {
  activity: [
    {
      id: 'act-market-food',
      name: 'Trastevere Market Food Tour',
      type: 'activity',
      key:'experience',
      emoji: '🍝',
      description: 'Explore local market, taste Roman street food and artisan treats.',
      location: 'Trastevere',
      price: 42,
      duration: '120 mins',
      rating: 4.7,
      tags: ['Food', 'Local', 'Walking'],
      x: 0, y: 0, color: '#ffeaa7',
      unilocoInfo: {
        highlights: ['Local market exploration', 'Street food tasting', 'Artisan treats', 'Local guide'],
        bestTime: 'Morning 9-11 AM for fresh produce',
        tips: 'Come hungry and wear comfortable walking shoes',
        nearby: ['Santa Maria Church (2 min walk)', 'Tiber River (8 min walk)']
      }
    },
    {
      id: 'act-bike-rome',
      name: 'Rome City Bike Ride',
      type: 'activity',
      key:'experience',
      emoji: '🚴‍♂️',
      description: 'Leisurely guided bike tour through key landmarks and hidden lanes.',
      location: 'City Center',
      price: 35,
      duration: '150 mins',
      rating: 4.6,
      tags: ['Outdoor', 'Leisure', 'Guide'],
      x: 0, y: 0, color: '#a0e4ff',
      unilocoInfo: {
        highlights: ['Key landmarks visit', 'Hidden lanes exploration', 'Professional guide', 'Comfortable pace'],
        bestTime: 'Morning 9-12 AM or afternoon 3-6 PM',
        tips: 'Helmets provided, suitable for all fitness levels',
        nearby: ['Colosseum (5 min walk)', 'Roman Forum (3 min walk)']
      }
    }
  ],
  script: [
    {
      id: 'scr-caesar-mystery',
      name: 'The Caesar Conspiracy',
      type: 'script',
      key:'script',
      emoji: '🕵️‍♂️',
      description: 'Investigate the assassination with puzzles and live role-play.',
      location: 'Forum Area',
      price: 49,
      duration: '120 mins',
      rating: 4.8,
      tags: ['Mystery', 'Role-play', 'History'],
      x: 0, y: 0, color: '#a29bfe',
      unilocoInfo: {
        highlights: ['Live role-play', 'Historical puzzles', 'Interactive investigation', 'Multiple clues'],
        bestTime: 'Afternoon 2-5 PM for better atmosphere',
        tips: 'Knowledge of Roman history enhances the experience',
        nearby: ['Roman Forum (on-site)', 'Palatine Hill (5 min walk)']
      }
    },
    {
      id: 'scr-gladiator-trial',
      name: 'Gladiator Trial: Arena Secrets',
      type: 'script',
      key:'experience',
      emoji: '🏛️',
      description: 'Immersive gladiator-themed team puzzle with multiple endings.',
      location: 'Colosseum Vicinity',
      price: 55,
      duration: '90 mins',
      rating: 4.5,
      tags: ['Team', 'Immersive', 'Puzzle'],
      x: 0, y: 0, color: '#6c5ce7',
      unilocoInfo: {
        highlights: ['Gladiator theme', 'Team collaboration', 'Multiple endings', 'Immersive experience'],
        bestTime: 'Evening 6-9 PM for dramatic atmosphere',
        tips: 'Recommended for 2-4 people, wear comfortable clothes',
        nearby: ['Colosseum (10 min walk)', 'Roman Forum (12 min walk)']
      }
    }
  ],
  service: [
    {
      id: 'svc-spa-classic',
      name: 'Roman Thermal SPA Session',
      type: 'service',
      key:'service',
      emoji: '🧖‍♀️',
      description: 'Thermal bath + massage in Roman-inspired ambience.',
      location: 'Via dei Cappuccini',
      price: 120,
      duration: '90 mins',
      rating: 4.9,
      tags: ['Relax', 'Premium', 'Private'],
      x: 0, y: 0, color: '#fe9aa8',
      unilocoInfo: {
        highlights: ['Roman-inspired ambience', 'Thermal bath experience', 'Professional massage', 'Private rooms'],
        bestTime: 'Afternoon 2-4 PM for relaxation',
        tips: 'Book in advance for 10% discount',
        nearby: ['Pantheon (5 min walk)', 'Piazza Navona (8 min walk)']
      }
    },
    {
      id: 'svc-private-chef',
      name: 'Private Chef Tasting Menu',
      type: 'service',
      key:'service',
      emoji: '👨‍🍳',
      description: 'Seasonal tasting menu with wine pairing at home studio.',
      location: 'Via del Corso',
      price: 95,
      duration: '120 mins',
      rating: 4.8,
      tags: ['Chef', 'Wine', 'Tasting'],
      x: 0, y: 0, color: '#ffd166',
      unilocoInfo: {
        highlights: ['Seasonal menu', 'Wine pairing', 'Private studio', 'Chef interaction'],
        bestTime: 'Evening 7-9 PM for dinner experience',
        tips: 'Dietary restrictions can be accommodated',
        nearby: ['Spanish Steps (3 min walk)', 'Trevi Fountain (7 min walk)']
      }
    },
    {
      id: 'svc-photoshoot',
      name: 'Professional Photoshoot in Rome',
      type: 'service',
      key:'service',
      emoji: '📸',
      description: '1-hour outdoor session around iconic landmarks.',
      location: 'Historic Center',
      price: 80,
      duration: '60 mins',
      rating: 4.7,
      tags: ['Photo', 'Landmarks', 'Memories'],
      x: 0, y: 0, color: '#66d2a0',
      unilocoInfo: {
        highlights: ['Iconic landmarks', 'Professional photographer', 'Outdoor session', 'High-quality photos'],
        bestTime: 'Golden hour 5-7 PM for best lighting',
        tips: 'Bring your own outfits, photographer provides equipment',
        nearby: ['Colosseum (10 min walk)', 'Roman Forum (8 min walk)']
      }
    }
  ],
  dining: [
    {
      id: 'din-pantheon-classics',
      name: 'Pantheon Traditional Lunch',
      type: 'dining',
      emoji: '🍷',
      description: 'Classic Roman dishes steps from the Pantheon.',
      location: 'Pantheon Area',
      price: 40,
      duration: '90 mins',
      rating: 4.6,
      tags: ['Traditional', 'Local', 'Lunch'],
      x: 0, y: 0, color: '#ff6b9d',
      unilocoInfo: {
        highlights: ['Classic Roman dishes', 'Pantheon view', 'Local atmosphere', 'Traditional recipes'],
        bestTime: 'Lunch 12:30-2:30 PM',
        tips: 'Reservation recommended, try the Cacio e Pepe',
        nearby: ['Pantheon (1 min walk)', 'Piazza Navona (5 min walk)']
      }
    }
  ],
  attractions: [
    {
      id: 'att-colosseum-fast',
      name: 'Colosseum Fast Track',
      type: 'attraction',
      emoji: '🏛️',
      description: 'Skip-the-line ticket with audio guide.',
      location: 'Colosseum',
      price: 35,
      duration: '120 mins',
      rating: 4.9,
      tags: ['Fast track', 'Audio', 'History'],
      x: 0, y: 0, color: '#74b9ff',
      unilocoInfo: {
        highlights: ['Skip the line', 'Audio guide included', 'Underground access', 'Professional guide'],
        bestTime: 'Morning 8:30-10 AM to avoid crowds',
        tips: 'Consider combo ticket with Roman Forum',
        nearby: ['Roman Forum (3 min walk)', 'Arch of Constantine (2 min walk)']
      }
    }
  ]
};

// 默认行程数据
export const defaultItinerary: DayRoute[] = [
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
      { time: '12:15-13:15', activity: 'St. Peter\'s Basilica', emoji: '⛪', id: 'st_peter', selected: true, location: 'Piazza San Pietro', duration: '1h' },
      { time: '20:00-22:30', activity: 'Opera Night', emoji: '🎭', id: 'opera1', selected: true, location: "Teatro dell'Opera di Roma", duration: '2h30m' }
    ]
  }
];

