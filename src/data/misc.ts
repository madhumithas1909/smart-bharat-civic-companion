import type { EmergencyContact, NearbyOffice } from '../types';

export const emergencyContacts: EmergencyContact[] = [
  { id: 'police', name: 'Police', number: '100', icon: 'Shield', color: 'from-blue-500 to-blue-700', description: 'Law enforcement & crime reporting' },
  { id: 'ambulance', name: 'Ambulance', number: '108', icon: 'Ambulance', color: 'from-red-500 to-red-700', description: 'Medical emergency services' },
  { id: 'fire', name: 'Fire Service', number: '101', icon: 'Flame', color: 'from-orange-500 to-red-600', description: 'Fire & rescue operations' },
  { id: 'women', name: 'Women Helpline', number: '1091', icon: 'HeartHandshake', color: 'from-pink-500 to-rose-600', description: 'Women in distress support' },
  { id: 'child', name: 'Child Helpline', number: '1098', icon: 'Baby', color: 'from-amber-400 to-orange-500', description: 'Child protection & welfare' },
  { id: 'disaster', name: 'Disaster Management', number: '1070', icon: 'CloudRain', color: 'from-slate-500 to-slate-700', description: 'Natural disaster response' },
];

export const nearbyOffices: NearbyOffice[] = [
  { id: '1', name: 'Regional Passport Office', type: 'Passport Office', address: 'Shastri Bhavan, Chennai', distance: '5.2 km', lat: 13.07, lng: 80.27, hours: '9:00 AM - 5:30 PM', phone: '044-2851-2345' },
  { id: '2', name: 'Teynampet Taluk Office', type: 'Taluk Office', address: 'Teynampet, Chennai', distance: '2.1 km', lat: 13.03, lng: 80.24, hours: '10:00 AM - 5:45 PM', phone: '044-2433-4567' },
  { id: '3', name: 'District Collector Office', type: 'Collector Office', address: 'Rajaji Salai, Chennai', distance: '3.8 km', lat: 13.08, lng: 80.28, hours: '9:00 AM - 5:00 PM', phone: '044-2567-8901' },
  { id: '4', name: 'Greater Chennai Corporation', type: 'Municipality', address: 'Ripon Building, Chennai', distance: '4.5 km', lat: 13.08, lng: 80.27, hours: '9:00 AM - 5:00 PM', phone: '044-2561-9200' },
  { id: '5', name: 'Teynampet Police Station', type: 'Police Station', address: 'Teynampet, Chennai', distance: '1.8 km', lat: 13.03, lng: 80.25, hours: '24x7', phone: '044-2434-5678' },
  { id: '6', name: 'Anna Nagar Passport Seva Kendra', type: 'Passport Office', address: 'Anna Nagar, Chennai', distance: '7.3 km', lat: 13.09, lng: 80.21, hours: '9:00 AM - 5:30 PM', phone: '044-2621-3456' },
];

export const sampleComplaints = [
  {
    id: 'SB-2024-001234',
    title: 'Streetlight not working',
    description: 'Streetlight on 2nd Main Road has been non-functional for 2 weeks, causing safety concerns at night.',
    location: 'Anna Nagar, Chennai',
    category: 'Infrastructure',
    severity: 'Medium' as const,
    status: 'Resolved' as const,
    createdAt: '2024-01-15T10:30:00Z',
    timeline: [
      { status: 'Received', timestamp: '2024-01-15T10:30:00Z', note: 'Complaint registered' },
      { status: 'Under Review', timestamp: '2024-01-16T09:00:00Z', note: 'Forwarded to Electrical Department' },
      { status: 'Assigned', timestamp: '2024-01-17T14:00:00Z', note: 'Technician assigned' },
      { status: 'Resolved', timestamp: '2024-01-19T16:00:00Z', note: 'Streetlight repaired and tested' },
    ],
  },
  {
    id: 'SB-2024-001235',
    title: 'Garbage not collected',
    description: 'Garbage bins in our street have not been cleared for 5 days, causing unhygienic conditions.',
    location: 'Teynampet, Chennai',
    category: 'Sanitation',
    severity: 'High' as const,
    status: 'Under Review' as const,
    createdAt: '2024-01-20T08:00:00Z',
    timeline: [
      { status: 'Received', timestamp: '2024-01-20T08:00:00Z', note: 'Complaint registered' },
      { status: 'Under Review', timestamp: '2024-01-21T11:00:00Z', note: 'Assigned to Sanitation Department' },
    ],
  },
];

export const suggestedPrompts = [
  'How to apply for Passport?',
  'How to get Aadhaar?',
  'What documents are required for Driving License?',
  'How to apply for PAN Card?',
  'How to register to vote?',
  'How to get Birth Certificate?',
  'How to apply for PMAY?',
  'How to apply for Ayushman Bharat?',
  'How to get Farmer Schemes?',
  'How to get Scholarships?',
];

export const languages = [
  { code: 'en' as const, label: 'English', flag: 'EN' },
  { code: 'ta' as const, label: 'தமிழ்', flag: 'TA' },
  { code: 'hi' as const, label: 'हिन्दी', flag: 'HI' },
  { code: 'kn' as const, label: 'ಕನ್ನಡ', flag: 'KN' },
  { code: 'ml' as const, label: 'മലയാളം', flag: 'ML' },
  { code: 'te' as const, label: 'తెలుగు', flag: 'TE' },
];

export const states = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];
