import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  Search, FileText, Clock, CheckCircle2, ExternalLink,
  X, ChevronRight, Sparkles,
} from 'lucide-react';
import { services } from '../data/services';
import { useToast } from '../context/ToastContext';
import PageTransition from '../components/PageTransition';
import type { GovService } from '../types';

const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<GovService | null>(null);
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || s.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Government Services
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Browse and apply for {services.length} government services with complete information.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((service, i) => {
            const Icon = (Icons as any)[service.icon] || FileText;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card p-5 group hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelected(service)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {service.processingTime}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <FileText className="w-3.5 h-3.5" />
                    {service.documents.length} documents required
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1">
                    View details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">No services found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg max-h-[85vh] overflow-y-auto z-50"
            >
              <div className="card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = (Icons as any)[selected.icon] || FileText;
                      return (
                        <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">{selected.name}</h2>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{selected.category}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{selected.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary-600" />
                      Required Documents
                    </h4>
                    <ul className="space-y-1.5">
                      {selected.documents.map((doc) => (
                        <li key={doc} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary-600" />
                      Eligibility
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{selected.eligibility}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-600" />
                      Processing Time
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{selected.processingTime}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={selected.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => showToast('Opening official portal...', 'info')}
                    className="btn-primary flex-1"
                  >
                    Apply Now <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    to="/assistant"
                    onClick={() => setSelected(null)}
                    className="btn-secondary"
                  >
                    <Sparkles className="w-4 h-4" />
                    Ask AI
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
