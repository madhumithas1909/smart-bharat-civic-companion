import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, MapPin, Phone, Clock, Navigation, Building2,
} from 'lucide-react';
import { nearbyOffices } from '../data/misc';
import PageTransition from '../components/PageTransition';

const officeTypes = ['All', 'Passport Office', 'Taluk Office', 'Collector Office', 'Municipality', 'Police Station'];

export default function NearbyPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');

  const filtered = useMemo(() => {
    return nearbyOffices.filter((office) => {
      const matchesSearch =
        office.name.toLowerCase().includes(search.toLowerCase()) ||
        office.address.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === 'All' || office.type === type;
      return matchesSearch && matchesType;
    });
  }, [search, type]);

  const mapsUrl = (lat: number, lng: number) =>
    `https://www.google.com/maps?q=${lat},${lng}&z=15`;

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Nearby Government Offices
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Find government offices near you with location and contact details.
          </p>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search offices by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {officeTypes.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                type === t
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="card p-0 mb-6 overflow-hidden">
          <div className="relative h-64 bg-gradient-to-br from-primary-50 to-green-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-hero-pattern opacity-30" />
            <div className="relative text-center">
              <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Interactive Map View</p>
              <p className="text-xs text-slate-400 mt-1">Google Maps integration ready</p>
            </div>
            {filtered.length > 0 && (
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {filtered.slice(0, 5).map((office) => (
                  <div
                    key={office.id}
                    className="w-3 h-3 rounded-full bg-primary-600 ring-2 ring-white dark:ring-slate-800 animate-pulse"
                    title={office.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Office Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((office, i) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="card p-5 group hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0 group-hover:bg-primary-600 transition-colors">
                  <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">{office.name}</h3>
                  <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">{office.type}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {office.address}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Navigation className="w-3.5 h-3.5" />
                  {office.distance} away
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {office.hours}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5" />
                  {office.phone}
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={mapsUrl(office.lat, office.lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 text-sm !py-2"
                >
                  <MapPin className="w-4 h-4" />
                  Directions
                </a>
                <a href={`tel:${office.phone}`} className="btn-secondary !px-3 !py-2">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400">No offices found. Try a different search.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
