import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Flag, FileText, MessageSquare, Moon, Sun,
  Save, Edit3, Bookmark, Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { getComplaints } from '../utils/complaints';
import { services } from '../data/services';
import PageTransition from '../components/PageTransition';

const PROFILE_KEY = 'sb-profile';

interface Profile {
  name: string;
  email: string;
}

function loadProfile(): Profile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : { name: 'Citizen User', email: 'user@smartbharat.gov.in' };
  } catch {
    return { name: 'Citizen User', email: 'user@smartbharat.gov.in' };
  }
}

export default function ProfilePage() {
  const { darkMode, toggleDarkMode } = useApp();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<Profile>(loadProfile);
  const [editing, setEditing] = useState(false);
  const [savedServices, setSavedServices] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sb-saved-services') || '[]');
    } catch {
      return [];
    }
  });

  const complaints = getComplaints();
  const chatHistory = (() => {
    try {
      return JSON.parse(localStorage.getItem('sb-chat-history') || '[]');
    } catch {
      return [];
    }
  })();

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleSave = () => {
    setEditing(false);
    showToast('Profile updated', 'success');
  };

  const toggleSaveService = (id: string) => {
    const updated = savedServices.includes(id)
      ? savedServices.filter((s) => s !== id)
      : [...savedServices, id];
    setSavedServices(updated);
    localStorage.setItem('sb-saved-services', JSON.stringify(updated));
    showToast(updated.includes(id) ? 'Service saved' : 'Service removed', 'success');
  };

  const savedServiceObjects = services.filter((s) => savedServices.includes(s.id));

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account, saved items, and preferences.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                {editing ? (
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="input-field !py-1.5 text-lg font-semibold"
                  />
                ) : (
                  <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">{profile.name}</h2>
                )}
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  {editing ? (
                    <input
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="input-field !py-1 !px-2 text-sm inline-block w-full"
                    />
                  ) : (
                    profile.email
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => (editing ? handleSave() : setEditing(true))}
              className="btn-secondary w-full"
            >
              {editing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit3 className="w-4 h-4" /> Edit Profile</>}
            </button>

            {/* Dark Mode Toggle */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-5 h-5 text-primary-600" /> : <Sun className="w-5 h-5 text-primary-600" />}
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Dark Mode</span>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-slate-300'}`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${darkMode ? 'left-6' : 'left-0.5'}`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Activity Overview</h3>
            <div className="space-y-3">
              <Link to="/tracker" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center">
                  <Flag className="w-4 h-4 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Complaints Filed</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{complaints.length} total</p>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{complaints.length}</span>
              </Link>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="w-9 h-9 rounded-lg bg-saffron-100 dark:bg-saffron-950/30 flex items-center justify-center">
                  <Bookmark className="w-4 h-4 text-saffron-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Saved Services</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{savedServices.length} bookmarked</p>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{savedServices.length}</span>
              </div>

              <Link to="/assistant" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">AI Chats</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{chatHistory.length} messages</p>
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{chatHistory.length}</span>
              </Link>
            </div>
          </motion.div>

          {/* Saved Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Saved Services</h3>
            {savedServiceObjects.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500 dark:text-slate-400">No saved services yet.</p>
                <Link to="/services" className="text-sm text-primary-600 dark:text-primary-400 hover:underline mt-1 inline-block">
                  Browse services
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {savedServiceObjects.map((service) => (
                  <div key={service.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <FileText className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1">{service.name}</span>
                    <button
                      onClick={() => toggleSaveService(service.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Chats */}
        {chatHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6 mt-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-600" />
              Recent AI Conversations
            </h3>
            <div className="space-y-2">
              {chatHistory.slice(-5).map((msg: any) => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-100 dark:bg-primary-950/50' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-primary-600" /> : <MessageSquare className="w-3.5 h-3.5 text-slate-500" />}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 flex-1">{msg.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
