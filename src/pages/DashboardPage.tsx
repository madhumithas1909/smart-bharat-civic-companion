import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Flag, CheckCircle2, FileText, MessageSquare, TrendingUp,
  ArrowUpRight, ArrowDownRight, Clock, AlertTriangle,
} from 'lucide-react';
import { getComplaints } from '../utils/complaints';
import { services } from '../data/services';
import { schemes } from '../data/schemes';
import { useApp } from '../context/AppContext';
import PageTransition from '../components/PageTransition';

const pieData = [
  { name: 'Infrastructure', value: 35, color: '#0F62FE' },
  { name: 'Sanitation', value: 25, color: '#FF9933' },
  { name: 'Water', value: 20, color: '#138808' },
  { name: 'Electricity', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

const barData = [
  { month: 'Jan', complaints: 45, resolved: 38 },
  { month: 'Feb', complaints: 52, resolved: 45 },
  { month: 'Mar', complaints: 38, resolved: 35 },
  { month: 'Apr', complaints: 61, resolved: 50 },
  { month: 'May', complaints: 48, resolved: 42 },
  { month: 'Jun', complaints: 55, resolved: 48 },
];

const lineData = [
  { day: 'Mon', queries: 120 },
  { day: 'Tue', queries: 145 },
  { day: 'Wed', queries: 132 },
  { day: 'Thu', queries: 168 },
  { day: 'Fri', queries: 190 },
  { day: 'Sat', queries: 95 },
  { day: 'Sun', queries: 78 },
];

export default function DashboardPage() {
  const { darkMode } = useApp();
  const complaints = getComplaints();

  const stats = useMemo(() => {
    const resolved = complaints.filter((c) => c.status === 'Resolved').length;
    return {
      complaints: complaints.length + 156,
      resolved: resolved + 128,
      schemes: services.length + schemes.length,
      queries: 1247,
    };
  }, [complaints]);

  const statCards = [
    { label: 'Complaints Submitted', value: stats.complaints, icon: Flag, color: 'from-primary-500 to-primary-700', change: '+12%', up: true },
    { label: 'Resolved Issues', value: stats.resolved, icon: CheckCircle2, color: 'from-green-500 to-green-700', change: '+8%', up: true },
    { label: 'Available Schemes', value: stats.schemes, icon: FileText, color: 'from-saffron-500 to-orange-600', change: '+3', up: true },
    { label: 'AI Queries', value: stats.queries, icon: MessageSquare, color: 'from-blue-500 to-cyan-600', change: '-5%', up: false },
  ];

  const axisColor = darkMode ? '#94a3b8' : '#64748b';
  const gridColor = darkMode ? '#1e293b' : '#e2e8f0';

  return (
    <PageTransition>
      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Citizen Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Overview of civic activity, complaints, and AI engagement.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value.toLocaleString()}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Complaints by Category</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Distribution of filed complaints</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: darkMode ? '#1e293b' : '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Monthly Complaints vs Resolved</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Last 6 months overview</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" stroke={axisColor} fontSize={12} />
                <YAxis stroke={axisColor} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: darkMode ? '#1e293b' : '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="complaints" fill="#0F62FE" radius={[6, 6, 0, 0]} name="Complaints" />
                <Bar dataKey="resolved" fill="#138808" radius={[6, 6, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 mb-6"
        >
          <h3 className="font-semibold text-slate-900 dark:text-white mb-1">AI Query Activity</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Daily AI assistant queries this week</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" stroke={axisColor} fontSize={12} />
              <YAxis stroke={axisColor} fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: darkMode ? '#1e293b' : '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="queries"
                stroke="#0F62FE"
                strokeWidth={3}
                dot={{ fill: '#0F62FE', r: 4 }}
                activeDot={{ r: 6 }}
                name="Queries"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Complaints</h3>
            <div className="space-y-3">
              {complaints.slice(0, 3).map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950/50 flex items-center justify-center shrink-0">
                    {c.status === 'Resolved' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{c.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{c.id}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{c.status}</span>
                </div>
              ))}
              {complaints.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No complaints filed yet.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card p-6"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Resolution Rate</span>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">82%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Avg. Response Time</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">3.2 days</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">High Priority</span>
                </div>
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">AI Satisfaction</span>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">94%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
