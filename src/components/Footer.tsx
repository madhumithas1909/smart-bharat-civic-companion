import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t } = useApp();

  const links = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.assistant'), path: '/assistant' },
    { label: t('nav.tracker'), path: '/tracker' },
    { label: t('nav.dashboard'), path: '/dashboard' },
    { label: t('nav.about'), path: '/about' },
  ];

  const extraLinks = [
    { label: 'Recommendations', path: '/recommendations' },
    { label: 'Report Complaint', path: '/complaint' },
    { label: 'Emergency Contacts', path: '/emergency' },
    { label: 'Nearby Offices', path: '/nearby' },
    { label: 'Profile', path: '/profile' },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-500 via-primary-600 to-green-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-slate-900 dark:text-white">Smart Bharat</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Services</h4>
            <ul className="space-y-2">
              {extraLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 shrink-0" /> support@smartbharat.gov.in
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Phone className="w-4 h-4 shrink-0" /> 1800-180-1551
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 shrink-0" /> New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Smart Bharat. Made with care for every Indian citizen.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-saffron-500" />
            <span className="w-2 h-2 rounded-full bg-white border border-slate-300" />
            <span className="w-2 h-2 rounded-full bg-green-600" />
          </div>
        </div>
      </div>
    </footer>
  );
}
