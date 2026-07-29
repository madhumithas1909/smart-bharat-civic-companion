import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, CheckCircle2, Clock, AlertCircle, FileText,
  MapPin, Calendar, Tag, AlertTriangle,
} from 'lucide-react';
import type { Complaint, ComplaintStatus } from '../types';
import { getComplaintById, getComplaints, statusOrder, getStatusIndex, formatDate } from '../utils/complaints';
import { sampleComplaints } from '../data/misc';
import PageTransition from '../components/PageTransition';

const statusConfig: Record<ComplaintStatus, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  'Received': { icon: AlertCircle, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-950/50' },
  'Under Review': { icon: Clock, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-950/50' },
  'Assigned': { icon: FileText, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-950/50' },
  'Resolved': { icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-950/50' },
};

export default function TrackerPage() {
  const location = useLocation();
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<Complaint | null>(null);
  const [searched, setSearched] = useState(false);
  const [recentComplaints] = useState<Complaint[]>([...getComplaints(), ...sampleComplaints as Complaint[]]);

  useEffect(() => {
    const state = location.state as { complaintId?: string } | null;
    if (state?.complaintId) {
      setSearchId(state.complaintId);
      handleSearch(state.complaintId);
    }
  }, [location.state]);

  const handleSearch = (id?: string) => {
    const query = id || searchId;
    if (!query.trim()) return;
    const found = getComplaintById(query) || (sampleComplaints as Complaint[]).find((c) => c.id === query);
    setResult(found || null);
    setSearched(true);
  };

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Complaint Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Search for your complaint using the tracking ID to see its current status.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Complaint ID (e.g., SB-2024-001234)"
                className="input-field pl-11 font-mono"
              />
            </div>
            <button onClick={() => handleSearch()} className="btn-primary">
              Track
            </button>
          </div>

          {/* Quick sample IDs */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-slate-400">Try:</span>
            {sampleComplaints.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSearchId(c.id); handleSearch(c.id); }}
                className="text-xs font-mono text-primary-600 dark:text-primary-400 hover:underline"
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {searched && !result && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-12 text-center"
            >
              <AlertCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">No complaint found with that ID.</p>
              <p className="text-sm text-slate-400 mt-1">Please check your Complaint ID and try again.</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Complaint Details */}
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">{result.title}</h2>
                    <p className="font-mono text-sm text-primary-600 dark:text-primary-400 mt-1">{result.id}</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusConfig[result.status].bg} ${statusConfig[result.status].color}`}>
                    {result.status}
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{result.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="w-4 h-4" /> {result.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Tag className="w-4 h-4" /> {result.category}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <AlertTriangle className="w-4 h-4" /> {result.severity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Calendar className="w-4 h-4" /> {formatDate(result.createdAt)}
                  </div>
                </div>

                {result.imageUrl && (
                  <div className="mt-4">
                    <img src={result.imageUrl} alt="Complaint" className="w-full max-w-xs rounded-xl" />
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="card p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-6">Status Timeline</h3>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    {statusOrder.map((status, i) => {
                      const config = statusConfig[status];
                      const completed = i <= getStatusIndex(result.status);
                      return (
                        <div key={status} className="flex flex-col items-center flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            completed ? config.bg : 'bg-slate-100 dark:bg-slate-800'
                          }`}>
                            <config.icon className={`w-5 h-5 ${completed ? config.color : 'text-slate-400'}`} />
                          </div>
                          <span className={`text-[10px] mt-1.5 text-center font-medium ${completed ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(getStatusIndex(result.status) / (statusOrder.length - 1)) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute h-full bg-gradient-to-r from-primary-500 to-green-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Timeline Events */}
                <div className="space-y-4">
                  {result.timeline.map((event, i) => {
                    const config = statusConfig[event.status];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-3"
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                            <config.icon className={`w-4 h-4 ${config.color}`} />
                          </div>
                          {i < result.timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-700 mt-1" />
                          )}
                        </div>
                        <div className="pt-1">
                          <p className="font-semibold text-sm text-slate-900 dark:text-white">{event.status}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(event.timestamp)}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{event.note}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {!searched && (
            <motion.div
              key="recent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Complaints</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {recentComplaints.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setSearchId(c.id); handleSearch(c.id); }}
                    className="card p-4 text-left hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-primary-600 dark:text-primary-400">{c.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[c.status].bg} ${statusConfig[c.status].color}`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{c.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {c.location}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
