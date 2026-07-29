import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Phone, AlertCircle } from 'lucide-react';
import { emergencyContacts } from '../data/misc';
import { useToast } from '../context/ToastContext';
import PageTransition from '../components/PageTransition';

export default function EmergencyPage() {
  const { showToast } = useToast();

  const handleCall = (number: string, name: string) => {
    window.location.href = `tel:${number}`;
    showToast(`Calling ${name} (${number})...`, 'info');
  };

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Emergency Contacts
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Quick access to critical helpline numbers. Tap to call instantly.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="glass-card p-4 mb-8 flex items-center gap-3 border-l-4 border-red-500">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">In case of life-threatening emergency,</span> call 112 (India's unified emergency number).
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {emergencyContacts.map((contact, i) => {
            const Icon = (Icons as any)[contact.icon] || Phone;
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card p-6 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{contact.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{contact.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono">{contact.number}</span>
                  <button
                    onClick={() => handleCall(contact.number, contact.name)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br ${contact.color} text-white font-semibold hover:opacity-90 active:scale-95 transition-all shadow-lg`}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">When to Call</h3>
            <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              <li>• Immediate danger to life or property</li>
              <li>• Witnessing a crime in progress</li>
              <li>• Medical emergencies requiring urgent care</li>
              <li>• Fire or natural disaster situations</li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Information to Provide</h3>
            <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
              <li>• Your exact location and landmark</li>
              <li>• Nature of the emergency</li>
              <li>• Number of people affected</li>
              <li>• Your name and contact number</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
