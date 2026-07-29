import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flag, MapPin, Tag, Upload, AlertTriangle, Send, CheckCircle2,
  Image as ImageIcon, X,
} from 'lucide-react';
import type { Complaint, ComplaintStatus } from '../types';
import { generateComplaintId, createTimeline, saveComplaint } from '../utils/complaints';
import { useToast } from '../context/ToastContext';
import PageTransition from '../components/PageTransition';

const categories = ['Infrastructure', 'Sanitation', 'Water', 'Electricity', 'Roads', 'Street Lighting', 'Traffic', 'Other'];
const severities: { label: Complaint['severity']; color: string }[] = [
  { label: 'Low', color: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400' },
  { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400' },
  { label: 'High', color: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400' },
  { label: 'Critical', color: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400' },
];

export default function ComplaintPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: 'Infrastructure',
    severity: 'Medium' as Complaint['severity'],
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Complaint | null>(null);
  const { showToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const id = generateComplaintId();
    const complaint: Complaint = {
      id,
      title: form.title,
      description: form.description,
      location: form.location,
      category: form.category,
      severity: form.severity,
      status: 'Received' as ComplaintStatus,
      createdAt: new Date().toISOString(),
      imageUrl: imagePreview || undefined,
      timeline: [createTimeline('Received', 'Complaint registered successfully')],
    };

    saveComplaint(complaint);
    setSubmitted(complaint);
    showToast('Complaint submitted successfully!', 'success');
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto card p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">Complaint Submitted!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Your complaint has been registered successfully.</p>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Your Complaint ID</p>
              <p className="font-mono text-lg font-bold text-primary-600 dark:text-primary-400">{submitted.id}</p>
            </div>

            <div className="flex gap-3 justify-center">
              <Link to="/tracker" state={{ complaintId: submitted.id }} className="btn-primary">
                Track Complaint
              </Link>
              <button
                onClick={() => {
                  setSubmitted(null);
                  setForm({ title: '', description: '', location: '', category: 'Infrastructure', severity: 'Medium', image: null });
                  setImagePreview(null);
                }}
                className="btn-secondary"
              >
                File Another
              </button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Report a Complaint
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              File a civic complaint and get a tracking ID to monitor its progress.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4 text-primary-600" />
                Complaint Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Streetlight not working on Main Road"
                className="input-field"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Provide detailed description of the issue..."
                rows={4}
                className="input-field resize-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                Location *
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g., Anna Nagar, Chennai"
                className="input-field"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary-600" />
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      form.category === cat
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary-600" />
                Severity
              </label>
              <div className="flex flex-wrap gap-2">
                {severities.map((sev) => (
                  <button
                    key={sev.label}
                    type="button"
                    onClick={() => setForm({ ...form, severity: sev.label })}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      form.severity === sev.label
                        ? sev.color + ' ring-2 ring-offset-2 ring-current dark:ring-offset-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {sev.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary-600" />
                Upload Image (Optional)
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Complaint" className="w-full h-48 object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(null); setForm({ ...form, image: null }); }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-primary-400 transition-colors">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-sm">Click to upload an image</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>

            <button type="submit" className="btn-primary w-full text-base !py-3">
              <Send className="w-5 h-5" />
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
