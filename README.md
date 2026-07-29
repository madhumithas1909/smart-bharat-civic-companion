# 🇮🇳 Smart Bharat – AI Powered Civic Companion

A modern, professional, AI-powered civic companion that simplifies government services for every Indian citizen. Access government services, report issues, receive AI guidance, and simplify public services — all in one beautiful application.

## Features

### Core Pages
- **Landing Page** – Hero section with AI chat preview, feature highlights, service grid, and CTA
- **AI Assistant** – ChatGPT-like interface with markdown support, typing animation, copy response, voice input, speech output, and suggested prompts
- **Government Services Explorer** – 13+ services with documents, eligibility, processing time, and apply links
- **Smart Recommendation Engine** – AI-powered scheme matching based on user profile (age, occupation, income, state, categories) with confidence percentages
- **Complaint Reporting** – Modern form with image upload, severity levels, auto-generated complaint IDs, and local storage
- **Complaint Tracker** – Search by ID, visual progress timeline (Received → Under Review → Assigned → Resolved)
- **Dashboard** – Statistics cards, pie chart, bar chart, line chart, and recent activity
- **Emergency Contacts** – One-tap call to Police, Ambulance, Fire, Women Helpline, Child Helpline, Disaster Management
- **Nearby Offices** – Searchable government offices with Google Maps integration
- **User Profile** – Editable profile, saved services, recent chats, dark mode toggle
- **About Page** – Mission, vision, benefits, technology stack, and developer info

### AI Features
- Natural language Q&A about government services
- Step-by-step application guides
- Document checklist generation
- Scheme eligibility checking
- Voice input (Web Speech API)
- Speech output (text-to-speech)
- Conversation history (localStorage)
- Quick suggestion prompts
- Document summarization endpoint (backend)

### UI Features
- Dark / Light mode with system preference detection
- Glassmorphism cards
- Smooth page transitions (Framer Motion)
- Loading animations and skeleton loaders
- Toast notifications
- Floating AI button
- Responsive design (mobile to desktop)
- Modern typography (Inter + Plus Jakarta Sans)
- Tricolor accent gradients (Saffron + White + Green)

### Multilingual Support
- English
- தமிழ் (Tamil)
- हिन्दी (Hindi)
- ಕನ್ನಡ (Kannada)
- മലയാളം (Malayalam)
- తెలుగు (Telugu)

## Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **TailwindCSS** – Custom theme with primary (#0F62FE), saffron, and green color ramps
- **Framer Motion** – Animations and page transitions
- **Lucide React** – Icons
- **Recharts** – Data visualization
- **React Markdown** – Markdown rendering in chat
- **React Router** – Client-side routing

### Backend
- **Node.js** + **Express**
- **Google Gemini AI** – `@google/generative-ai` SDK
- **CORS** + **dotenv**

### Deployment
- **Vercel** – Frontend
- **Render** – Backend

## Project Structure

```
smart-bharat/
├── public/
│   └── favicon.svg
├── server/
│   └── index.js              # Express + Gemini API server
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingAIButton.tsx
│   │   ├── PageTransition.tsx
│   │   └── Skeletons.tsx
│   ├── context/              # React context providers
│   │   ├── AppContext.tsx    # Theme + language
│   │   └── ToastContext.tsx  # Toast notifications
│   ├── data/                 # Sample JSON data
│   │   ├── services.ts
│   │   ├── schemes.ts
│   │   └── misc.ts
│   ├── pages/                # Application pages
│   │   ├── LandingPage.tsx
│   │   ├── AssistantPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── RecommendationsPage.tsx
│   │   ├── ComplaintPage.tsx
│   │   ├── TrackerPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── EmergencyPage.tsx
│   │   ├── NearbyPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── AboutPage.tsx
│   ├── services/             # API services
│   │   └── aiService.ts
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   ├── i18n.ts
│   │   ├── complaints.ts
│   │   ├── recommendations.ts
│   │   └── cn.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                      # Frontend env vars
├── .env.example              # Backend env template
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-bharat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key.

4. **Run the frontend (development)**
   ```bash
   npm run dev
   ```

5. **Run the backend server (in a separate terminal)**
   ```bash
   npm run server:dev
   ```

6. Open `http://localhost:5173` in your browser.

## Environment Variables

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:3001
```

### Backend (`.env` or `.env.example`)
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

> **Note:** The AI Assistant works with fallback responses even without a backend API key. To enable full Gemini AI responses, add your API key and run the backend server.

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Set environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

### Backend (Render)
1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy

## Screenshots

> Screenshots will be added after deployment.

- Landing Page
- AI Assistant Chat
- Services Explorer
- Dashboard
- Complaint Tracker

## Future Enhancements

- [ ] AI Document OCR (scan documents, PDF upload)
- [ ] Complaint Image Analysis with AI
- [ ] Smart Push Notifications
- [ ] AI Voice Assistant (full conversational)
- [ ] Government News Feed
- [ ] Citizen Feedback System
- [ ] Accessibility mode (screen reader optimization)
- [ ] Offline mode (PWA with service workers)
- [ ] User authentication with Supabase
- [ ] Real-time complaint status updates via WebSocket
- [ ] Multi-state scheme database integration
- [ ] Aadhaar-based identity verification

## License

This project is built for educational and demonstration purposes.

---

Made with care for every Indian citizen. 🇮🇳
