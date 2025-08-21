export interface ExperienceItem {
  id: string;
  name: string;
  type: string;
  emoji: string;
  description: string;
  location: string;
  price: number;
  duration: string;
  rating: number;
  tags: string[];
  x: number;
  y: number;
  color: string;
  website?: string;
  booking?: string;
  phone?: string;
  details?: string;
  unilocoInfo?: {
    highlights: string[];
    bestTime: string;
    tips: string;
    nearby: string[];
  };
}

export interface ItineraryItem extends ExperienceItem {
  scheduledDay?: number;
  scheduledTime?: string;
  scheduledTimeSlot?: string;
}

export interface DayRoute {
  day: number;
  title: string;
  startLocation: string;
  endLocation: string;
  totalDuration: string;
  walkingDistance: string;
  activities: {
    time: string;
    activity: string;
    emoji: string;
    id: string;
    selected: boolean;
    location: string;
    duration: string;
    phone?: string;
    details?: string;
    price?: string;
    website?: string;
  }[];
}

export type ChatMessage = {
  type: 'ai' | 'user' | 'uniloco';
  content: string;
  timestamp: number;
};


