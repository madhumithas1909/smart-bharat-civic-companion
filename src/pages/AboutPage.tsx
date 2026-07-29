import { motion } from 'framer-motion';
import {
  Target, Eye, Award, Code2, User, Sparkles, Heart,
  Zap, Globe2, Shield, Bot, FileText, BarChart3,
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

const missions = [
  { icon: Target, title: 'Our Mission', desc: 'To bridge the gap between citizens and government services by leveraging AI to provide instant, accurate, and accessible civic assistance to every Indian.' },
  { icon: Eye, title: 'Our Vision', desc: 'A digitally empowered India where every citizen can effortlessly access government services, understand schemes, and resolve civic issues through AI-powered guidance.' },
  { icon: Award, title: 'Our Benefits', desc: 'Save time, reduce bureaucracy, get personalized scheme recommendations, track complaints in real-time, and access services in your preferred language.' },
];

const techStack = [
  { name: 'React + TypeScript', icon: Code2, category: 'Frontend' },
  { name: 'TailwindCSS', icon: Sparkles, category: 'Styling' },
  { name: 'Framer Motion', icon: Zap, category: 'Animation' },
  { name: 'Node.js + Express', icon: Code2, category: 'Backend' },
  { name: 'Google Gemini AI', icon: Bot, category: 'AI Engine' },
  { name: 'Recharts', icon: BarChart3, category: 'Data Viz' },
  { name: 'Lucide Icons', icon: Sparkles, category: 'UI' },
  { name: 'Vercel + Render', icon: Globe2, category: 'Deployment' },
];

const features = [
  { icon: Bot, label: 'AI Civic Assistant' },
  { icon: FileText, label: 'Service Explorer' },
  { icon: Zap, label: 'Smart Recommendations' },
  { icon: Shield, label: 'Complaint Tracker' },
  { icon: BarChart3, label: 'Citizen Dashboard' },
  { icon: Globe2, label: 'Multilingual Support' },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">About Smart Bharat</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Empowering citizens with <span className="gradient-text">AI-driven civic services</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Smart Bharat is an AI-powered civic companion designed to make government services
            accessible, understandable, and actionable for every Indian citizen.
          </p>
        </motion.div>

        {/* Mission / Vision / Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {missions.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-white/50 dark:bg-slate-800/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center mb-2">
                  <feat.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{feat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
            Technology Stack
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">
            Built with modern, scalable, and production-ready technologies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card p-4 text-center group hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-600 transition-colors">
                  <tech.icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{tech.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-8 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron-500 via-primary-600 to-green-600 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">Developer Information</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-4">
            Smart Bharat is developed as a civic technology initiative to demonstrate how AI can
            transform citizen-government interactions and make public services more accessible.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for India
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
