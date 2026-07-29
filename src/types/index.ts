export interface GovService {
  id: string;
  name: string;
  category: string;
  description: string;
  documents: string[];
  eligibility: string;
  processingTime: string;
  icon: string;
  applyUrl: string;
}

export interface Scheme {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string;
  eligibility: string[];
  icon: string;
}

export interface Recommendation {
  id: string;
  schemeName: string;
  category: string;
  description: string;
  confidence: number;
  benefits: string;
  eligibility: string[];
  applyUrl: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: ComplaintStatus;
  createdAt: string;
  imageUrl?: string;
  timeline: TimelineEvent[];
}

export type ComplaintStatus = 'Received' | 'Under Review' | 'Assigned' | 'Resolved';

export interface TimelineEvent {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  email: string;
  savedComplaints: string[];
  savedServices: string[];
  recentChats: ChatMessage[];
  darkMode: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  icon: string;
  color: string;
  description: string;
}

export interface NearbyOffice {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  lat: number;
  lng: number;
  hours: string;
  phone: string;
}

export interface UserInput {
  age: number;
  occupation: string;
  categories: string[];
  incomeRange: string;
  state: string;
  disability: boolean;
  womenCategory: boolean;
}

export type Language = 'en' | 'ta' | 'hi' | 'kn' | 'ml' | 'te';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}
