import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function FloatingAIButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-6 left-6 z-40"
    >
      <Link to="/assistant">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 shadow-xl shadow-primary-600/30 flex items-center justify-center group"
        >
          <Sparkles className="w-6 h-6 text-white" />
          <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping opacity-20" />
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask AI Assistant
          </span>
        </motion.button>
      </Link>
    </motion.div>
  );
}
