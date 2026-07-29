import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, ArrowRight, MessageSquare, FileText, ShieldCheck,
  Phone, BarChart3, Bot, Vote, HeartPulse, GraduationCap,
  Home, Wheat, Car, CreditCard, Fingerprint, BookUser, Users,
  Zap, Globe2, Accessibility, Mic, FileSearch, Bell,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';
import { services } from '../data/services';
import { emergencyContacts } from '../data/misc';

const features = [
  { icon: Bot, title: 'AI Civic Assistant', desc: 'Get instant answers about government services and schemes in natural language.', color: 'from-primary-500 to-primary-700' },
  { icon: FileText, title: 'Service Explorer', desc: 'Browse 13+ government services with documents, eligibility, and processing times.', color: 'from-saffron-500 to-orange-600' },
  { icon: Zap, title: 'Smart Recommendations', desc: 'AI-powered scheme matching based on your profile, age, and occupation.', color: 'from-green-500 to-green-700' },
  { icon: ShieldCheck, title: 'Complaint Tracker', desc: 'Report civic issues and track resolution status with a visual timeline.', color: 'from-blue-500 to-cyan-600' },
  { icon: BarChart3, title: 'Citizen Dashboard', desc: 'Visualize your civic activity with charts and statistics.', color: 'from-purple-500 to-indigo-600' },
  { icon: Globe2, title: 'Multilingual', desc: 'Available in 6 Indian languages for accessibility across the nation.', color: 'from-rose-500 to-pink-600' },
];

const aiFeatures = [
  { icon: FileSearch, label: 'Document Summarization' },
  { icon: Bot, label: 'Eligibility Checker' },
  { icon: Mic, label: 'Voice Input' },
  { icon: Zap, label: 'Quick Suggestions' },
  { icon: Bell, label: 'Smart Notifications' },
  { icon: Accessibility, label: 'Accessibility Mode' },
];

const serviceIcons: Record<string, typeof BookUser> = {
  passport: BookUser, aadhaar: Fingerprint, pan: CreditCard, 'driving-license': Car,
  'voter-id': Vote, 'birth-certificate': FileText, 'income-certificate': FileText,
  'community-certificate': Users, pmay: Home, 'ayushman-bharat': HeartPulse,
  scholarships: GraduationCap, 'farmer-schemes': Wheat, 'senior-pension': Users,
};

export default function LandingPage() {
  const { t } = useApp();

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-white to-green-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-20 -right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />

        <div className="container-max px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Powered by Google Gemini AI</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white mb-5">
                {t('hero.title').split(' - ')[0]}
                <span className="block gradient-text mt-1">{t('hero.title').split(' - ')[1]}</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/services" className="btn-primary text-base !px-6 !py-3">
                  {t('hero.getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/assistant" className="btn-secondary text-base !px-6 !py-3">
                  <MessageSquare className="w-5 h-5" />
                  {t('hero.talkToAI')}
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">13+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Gov Services</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Schemes</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">6</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Languages</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-6 relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-medium">AI Assistant</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] text-sm">
                      How to apply for a Passport?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[85%] text-sm space-y-1.5">
                      <p className="font-medium text-slate-700 dark:text-slate-200">Here's a step-by-step guide:</p>
                      <p className="text-slate-600 dark:text-slate-300">1. Register on Passport Seva portal</p>
                      <p className="text-slate-600 dark:text-slate-300">2. Fill the application form</p>
                      <p className="text-slate-600 dark:text-slate-300">3. Book an appointment</p>
                      <div className="flex gap-1 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {['Aadhaar', 'PAN Card', 'Voter ID', 'PMAY'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-card px-3 py-2 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-saffron-500" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">AI Powered</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Everything you need, <span className="gradient-text">in one place</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A comprehensive civic companion that simplifies government services for every Indian citizen.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card p-6 group hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-max">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Popular Government Services
              </h2>
              <p className="text-slate-600 dark:text-slate-400">Quick access to the most sought-after services</p>
            </div>
            <Link to="/services" className="btn-secondary">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.slice(0, 6).map((service, i) => {
              const Icon = serviceIcons[service.id] || FileText;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link to="/services" className="card p-4 flex flex-col items-center text-center group hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mb-3 group-hover:bg-primary-600 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{service.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="glass-card p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 mb-4">
                <Sparkles className="w-4 h-4 text-primary-600" />
                <span className="text-xs font-semibold text-primary-700 dark:text-primary-300">AI Powered Features</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-3">
                Advanced AI for smarter civic engagement
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
                Beyond basic Q&A — our AI summarizes documents, checks eligibility, and guides you step-by-step.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {aiFeatures.map((feat, i) => (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
                      <feat.icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Quick Access */}
      <section className="section-padding bg-white dark:bg-slate-900">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">Emergency at your fingertips</h2>
            <p className="text-slate-600 dark:text-slate-400">One-tap access to critical helpline numbers</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {emergencyContacts.map((contact, i) => (
              <motion.a
                key={contact.id}
                href={`tel:${contact.number}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card p-4 text-center group hover:shadow-lg transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{contact.name}</div>
                <div className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-1">{contact.number}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 sm:p-12 text-center"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-saffron-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to simplify your civic life?
              </h2>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of citizens using Smart Bharat to navigate government services with ease.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/assistant" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 active:scale-95 transition-all shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  Start with AI
                </Link>
                <Link to="/recommendations" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-800 text-white font-semibold hover:bg-primary-700 active:scale-95 transition-all border border-primary-500">
                  Find Schemes
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
