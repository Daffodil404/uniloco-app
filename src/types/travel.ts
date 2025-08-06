export interface TravelPlan {
  id: string;
  destination: string;
  duration: string;
  food: string;
  companion: string;
  atmosphere: string;
  itinerary: ItineraryDay[];
  mapPoints: MapPoint[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  locations: string[];
  estimatedCost?: number;
  weather?: string;
}

export interface MapPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'attraction' | 'restaurant' | 'hotel' | 'custom';
  notes?: string;
  images?: string[];
  timestamp?: string;
  rating?: number;
  price?: string;
  openingHours?: string;
}

export interface AIChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface TravelPreferences {
  destination: string;
  duration: string;
  food: string;
  companion: string;
  atmosphere: string;
  budget?: string;
  interests?: string[];
  accessibility?: string[];
} 