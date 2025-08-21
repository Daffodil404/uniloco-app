import type { ExperienceItem } from './types';

type Category = 'activity' | 'script' | 'service' | 'dining' | 'attractions';

export const mockSearchResults: Record<string, ExperienceItem[]> = {
  activity: [
    {
      id: 'act-market-food',
      name: 'Trastevere Market Food Tour',
      type: 'activity',
      emoji: '🍝',
      description: 'Explore local market, taste Roman street food and artisan treats.',
      location: 'Trastevere',
      price: 42,
      duration: '120 mins',
      rating: 4.7,
      tags: ['Food', 'Local', 'Walking'],
      x: 0, y: 0, color: '#ffeaa7'
    },
    {
      id: 'act-bike-rome',
      name: 'Rome City Bike Ride',
      type: 'activity',
      emoji: '🚴‍♂️',
      description: 'Leisurely guided bike tour through key landmarks and hidden lanes.',
      location: 'City Center',
      price: 35,
      duration: '150 mins',
      rating: 4.6,
      tags: ['Outdoor', 'Leisure', 'Guide'],
      x: 0, y: 0, color: '#a0e4ff'
    }
  ],
  script: [
    {
      id: 'scr-caesar-mystery',
      name: 'The Caesar Conspiracy',
      type: 'script',
      emoji: '🕵️‍♂️',
      description: 'Investigate the assassination with puzzles and live role-play.',
      location: 'Forum Area',
      price: 49,
      duration: '120 mins',
      rating: 4.8,
      tags: ['Mystery', 'Role-play', 'History'],
      x: 0, y: 0, color: '#a29bfe'
    },
    {
      id: 'scr-gladiator-trial',
      name: 'Gladiator Trial: Arena Secrets',
      type: 'script',
      emoji: '🏛️',
      description: 'Immersive gladiator-themed team puzzle with multiple endings.',
      location: 'Colosseum Vicinity',
      price: 55,
      duration: '90 mins',
      rating: 4.5,
      tags: ['Team', 'Immersive', 'Puzzle'],
      x: 0, y: 0, color: '#6c5ce7'
    }
  ],
  service: [
    {
      id: 'svc-spa-classic',
      name: 'Roman Thermal SPA Session',
      type: 'service',
      emoji: '🧖‍♀️',
      description: 'Thermal bath + massage in Roman-inspired ambience.',
      location: 'Via dei Cappuccini',
      price: 120,
      duration: '90 mins',
      rating: 4.9,
      tags: ['Relax', 'Premium', 'Private'],
      x: 0, y: 0, color: '#fe9aa8'
    },
    {
      id: 'svc-private-chef',
      name: 'Private Chef Tasting Menu',
      type: 'service',
      emoji: '👨‍🍳',
      description: 'Seasonal tasting menu with wine pairing at home studio.',
      location: 'Via del Corso',
      price: 95,
      duration: '120 mins',
      rating: 4.8,
      tags: ['Chef', 'Wine', 'Tasting'],
      x: 0, y: 0, color: '#ffd166'
    },
    {
      id: 'svc-photoshoot',
      name: 'Professional Photoshoot in Rome',
      type: 'service',
      emoji: '📸',
      description: '1-hour outdoor session around iconic landmarks.',
      location: 'Historic Center',
      price: 80,
      duration: '60 mins',
      rating: 4.7,
      tags: ['Photo', 'Landmarks', 'Memories'],
      x: 0, y: 0, color: '#66d2a0'
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
      x: 0, y: 0, color: '#ff6b9d'
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
      x: 0, y: 0, color: '#74b9ff'
    }
  ]
};


