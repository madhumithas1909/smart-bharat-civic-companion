import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  Sparkles, GraduationCap, Wheat, UserCog,
  Heart, Accessibility, TrendingUp, ExternalLink, RotateCcw,
} from 'lucide-react';
import type { UserInput, Recommendation } from '../types';
import { generateRecommendations } from '../utils/recommendations';
import { states } from '../data/misc';
import { useToast } from '../context/ToastContext';
import PageTransition from '../components/PageTransition';

const occupations = ['Student', 'Farmer', 'Senior Citizen', 'Employed', 'Self-Employed', 'Homemaker', 'Unemployed'];
const incomeRanges = ['Below ₹1 Lakh', '₹1-3 Lakh', '₹3-6 Lakh', '₹6-10 Lakh', 'Above ₹10 Lakh'];
const categoryOptions = [
  { label: 'Student', icon: GraduationCap },
  { label: 'Farmer', icon: Wheat },
  { label: 'Senior Citizen', icon: UserCog },
  { label: 'Women', icon: Heart },
  { label: 'Person with Disability', icon: Accessibility },
];

export default function RecommendationsPage() {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<Recommendation[]>([]);
  const [input, setInput] = useState<UserInput>({
    age: 25,
    occupation: 'Student',
    categories: ['Student'],
    incomeRange: '₹1-3 Lakh',
    state: 'Tamil Nadu',
    disability: false,
    womenCategory: false,
  });
  const { showToast } = useToast();

  const toggleCategory = (cat: string) => {
    setInput((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
      womenCategory: cat === 'Women' ? !prev.womenCategory : prev.womenCategory,
    }));
  };

  const handleGenerate = () => {
    const recs = generateRecommendations(input);
    setResults(recs);
    setStep(3);
    showToast(`Found ${recs.length} matching schemes`, 'success');
  };

  const handleReset = () => {
    setStep(1);
    setResults([]);
  };

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Smart Recommendation Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Get personalized government scheme recommendations powered by AI.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card p-6 sm:p-8 space-y-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Age: <span className="text-primary-600 dark:text-primary-400">{input.age} years</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={input.age}
                    onChange={(e) => setInput({ ...input, age: Number(e.target.value) })}
                    className="w-full accent-primary-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1</span><span>50</span><span>100</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    Which categories apply to you?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categoryOptions.map((opt) => {
                      const active = input.categories.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => toggleCategory(opt.label)}
                          className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                            active
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <opt.icon className="w-4 h-4" />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">Occupation</label>
                  <select
                    value={input.occupation}
                    onChange={(e) => setInput({ ...input, occupation: e.target.value })}
                    className="input-field"
                  >
                    {occupations.map((occ) => <option key={occ}>{occ}</option>)}
                  </select>
                </div>

                {/* Income */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">Annual Income Range</label>
                  <select
                    value={input.incomeRange}
                    onChange={(e) => setInput({ ...input, incomeRange: e.target.value })}
                    className="input-field"
                  >
                    {incomeRanges.map((inc) => <option key={inc}>{inc}</option>)}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">State</label>
                  <select
                    value={input.state}
                    onChange={(e) => setInput({ ...input, state: e.target.value })}
                    className="input-field"
                  >
                    {states.map((st) => <option key={st}>{st}</option>)}
                  </select>
                </div>

                <button onClick={handleGenerate} className="btn-primary w-full text-base !py-3">
                  <Sparkles className="w-5 h-5" />
                  Get Recommendations
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {results.length} Schemes Matched
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Based on your profile</p>
                </div>
                <button onClick={handleReset} className="btn-secondary">
                  <RotateCcw className="w-4 h-4" />
                  New Search
                </button>
              </div>

              {results.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">No schemes matched your profile. Try adjusting your inputs.</p>
                  <button onClick={handleReset} className="btn-primary">Try Again</button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {results.map((rec, i) => {
                    const Icon = (Icons as any)[rec.category === 'Agriculture' ? 'Wheat' :
                      rec.category === 'Health' ? 'HeartPulse' :
                      rec.category === 'Housing' ? 'Home' :
                      rec.category === 'Education' ? 'GraduationCap' :
                      rec.category === 'Social Welfare' ? 'UserCog' :
                      rec.category === 'Employment' ? 'Briefcase' :
                      rec.category === 'Women & Child' ? 'Baby' :
                      rec.category === 'Entrepreneurship' ? 'Rocket' :
                      rec.category === 'Disability' ? 'Accessibility' : 'Sparkles'] || Sparkles;
                    return (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card p-5 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-xs font-semibold text-green-600 dark:text-green-400">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {rec.confidence}% match
                            </div>
                            <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                                style={{ width: `${rec.confidence}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-1">{rec.schemeName}</h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{rec.category}</span>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{rec.description}</p>

                        <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30">
                          <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">Benefits</p>
                          <p className="text-sm text-green-800 dark:text-green-300">{rec.benefits}</p>
                        </div>

                        <a
                          href={rec.applyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary w-full mt-4 text-sm"
                        >
                          Learn More <ExternalLink className="w-4 h-4" />
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
