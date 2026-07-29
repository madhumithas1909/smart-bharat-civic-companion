import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AssistantPage from './pages/AssistantPage';
import ServicesPage from './pages/ServicesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ComplaintPage from './pages/ComplaintPage';
import TrackerPage from './pages/TrackerPage';
import DashboardPage from './pages/DashboardPage';
import EmergencyPage from './pages/EmergencyPage';
import NearbyPage from './pages/NearbyPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/assistant" element={<AssistantPage />} />
              <Route path="/recommendations" element={<RecommendationsPage />} />
              <Route path="/complaint" element={<ComplaintPage />} />
              <Route path="/tracker" element={<TrackerPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/nearby" element={<NearbyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}
