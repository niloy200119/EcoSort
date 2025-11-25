import { useState, useEffect } from 'react';
import { 
  Award, Camera, TrendingUp, Calendar, MapPin, Trophy, Leaf, 
  Recycle, Sparkles, Target, Bell, Plus, X, Trash2, Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// Mock data generated outside component for React purity
const mockRecentScans = [
  { id: 1, item: 'Plastic Bottle', method: 'Recycle', points: 10, date: '2024-11-23', category: 'plastic' },
  { id: 2, item: 'Cardboard Box', method: 'Recycle', points: 10, date: '2024-11-22', category: 'paper' },
  { id: 3, item: 'Food Scraps', method: 'Compost', points: 10, date: '2024-11-21', category: 'organic' },
  { id: 4, item: 'Old Phone', method: 'E-Waste', points: 15, date: '2024-11-20', category: 'metal' },
  { id: 5, item: 'Glass Jar', method: 'Recycle', points: 10, date: '2024-11-19', category: 'glass' }
];

const defaultReminders = [
  { id: 1, title: 'Recycling Collection', date: '2024-11-25', time: '08:00', type: 'recycle', icon: '♻️' },
  { id: 2, title: 'Compost Pickup', date: '2024-11-27', time: '09:00', type: 'compost', icon: '🌱' },
  { id: 3, title: 'General Waste', date: '2024-11-26', time: '07:00', type: 'general', icon: '🗑️' }
];

const mockAchievements = [
  { id: 1, title: 'First Scan', icon: '🌟', description: 'Complete your first waste scan', unlocked: true },
  { id: 2, title: '10 Scans', icon: '⭐', description: 'Scan 10 items', unlocked: true },
  { id: 3, title: 'Recycling Hero', icon: '♻️', description: 'Recycle 20 items', unlocked: true },
  { id: 4, title: '50 Scans', icon: '🏆', description: 'Scan 50 items', unlocked: false },
  { id: 5, title: 'Eco Champion', icon: '👑', description: 'Reach 500 points', unlocked: false },
  { id: 6, title: 'Monthly Master', icon: '📅', description: 'Scan daily for a month', unlocked: false }
];

const mockNearbyCenters = [
  { id: 1, name: 'Dhaka Recycling Hub', distance: '1.2 km', type: 'All Recyclables' },
  { id: 2, name: 'Green City Center', distance: '2.8 km', type: 'E-Waste & Plastic' },
  { id: 3, name: 'Eco Point Sylhet', distance: '3.5 km', type: 'Paper & Cardboard' }
];

export default function DashboardEnhanced() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Reminder state
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('ecosort-reminders');
    return saved ? JSON.parse(saved) : defaultReminders;
  });
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderForm, setReminderForm] = useState({
    title: '',
    date: '',
    time: '',
    type: 'recycle'
  });

  // Calculate stats
  const totalPoints = user?.points || 1250;
  const scansThisMonth = 23;
  const recyclingRate = 84;
  const nextLevelPoints = 1500;
  const progressToNext = ((totalPoints / nextLevelPoints) * 100).toFixed(0);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('ecosort-reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Request notification permission and check reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      
      reminders.forEach(reminder => {
        const [hours, minutes] = reminder.time.split(':');
        const reminderDate = new Date(reminder.date);
        reminderDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Calculate time difference
        const diffMs = reminderDate - now;
        const diffMins = Math.floor(diffMs / 60000);

        // Trigger notification 5 minutes before
        if (diffMins === 5 && Notification.permission === 'granted') {
          new Notification('EcoSort Reminder', {
            body: `${reminder.title} in 5 minutes`,
            icon: '/favicon.ico',
            tag: reminder.id.toString()
          });
        }
      });
    };

    const requestNotificationPermission = async () => {
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    };
    requestNotificationPermission();

    // Check reminders every minute
    const interval = setInterval(() => {
      checkReminders();
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (!reminderForm.title || !reminderForm.date || !reminderForm.time) {
      alert('Please fill all fields');
      return;
    }

    const icons = {
      recycle: '♻️',
      compost: '🌱',
      general: '🗑️',
      ewaste: '⚡'
    };

    const newReminder = {
      id: Date.now(),
      ...reminderForm,
      icon: icons[reminderForm.type] || '📋'
    };

    setReminders([...reminders, newReminder]);
    setShowReminderModal(false);
    setReminderForm({ title: '', date: '', time: '', type: 'recycle' });
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const getMethodColor = (method) => {
    const colors = {
      'Recycle': 'bg-emerald-100/60 text-emerald-700 border-emerald-300/40',
      'Compost': 'bg-lime-100/60 text-lime-700 border-lime-300/40',
      'E-Waste': 'bg-amber-100/60 text-amber-700 border-amber-300/40',
      'Landfill': 'bg-rose-100/60 text-rose-700 border-rose-300/40'
    };
    return colors[method] || 'bg-gray-100/60 text-gray-700 border-gray-300/40';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'scans', label: 'Scan History', icon: Camera },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'centers', label: 'Nearby Centers', icon: MapPin }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-ultra rounded-3xl p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Eco Warrior'}! 🌱
              </h1>
              <p className="text-gray-600">Keep making a difference, one scan at a time</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Level</div>
              <div className="text-3xl font-bold text-emerald-600">Level 5</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-soft rounded-2xl p-6 border-2 border-emerald-200/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100/70 rounded-xl">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
              <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{progressToNext}% to Level 6</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-soft rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100/70 rounded-xl">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{scansThisMonth}</div>
            <div className="text-sm text-gray-600">Scans This Month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-soft rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-lime-100/70 rounded-xl">
                <Recycle className="w-6 h-6 text-lime-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{recyclingRate}%</div>
            <div className="text-sm text-gray-600">Recycling Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-soft rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100/70 rounded-xl">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="glass-ultra rounded-2xl p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Quick Actions */}
                <div className="glass-ultra rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Scan Item', icon: Camera, link: '/scanner', color: 'emerald' },
                      { label: 'Find Centers', icon: MapPin, link: '/centers', color: 'blue' },
                      { label: 'View Guide', icon: Leaf, link: '/guide', color: 'lime' },
                      { label: 'Set Goals', icon: Target, link: '/goals', color: 'purple' }
                    ].map((action) => (
                      <Link
                        key={action.label}
                        to={action.link}
                        className={`p-6 rounded-xl bg-${action.color}-50 hover:bg-${action.color}-100 border-2 border-${action.color}-200/50 transition-all hover:scale-105 flex flex-col items-center gap-2 text-center`}
                      >
                        <action.icon className={`w-8 h-8 text-${action.color}-600`} />
                        <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Scans */}
                <div className="glass-ultra rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Scans</h3>
                  <div className="space-y-3">
                    {mockRecentScans.slice(0, 5).map((scan) => (
                      <div
                        key={scan.id}
                        className="flex items-center justify-between p-4 glass-soft rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-2xl">{scan.category === 'plastic' ? '🥤' : scan.category === 'paper' ? '📄' : scan.category === 'organic' ? '🥬' : scan.category === 'metal' ? '📱' : '🏺'}</div>
                          <div>
                            <div className="font-semibold text-gray-800">{scan.item}</div>
                            <div className="text-sm text-gray-600">{scan.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getMethodColor(scan.method)}`}>
                            {scan.method}
                          </span>
                          <span className="text-emerald-600 font-bold">+{scan.points}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'scans' && (
              <div className="glass-ultra rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">All Scans</h3>
                <div className="space-y-3">
                  {mockRecentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between p-4 glass-soft rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">{scan.category === 'plastic' ? '🥤' : scan.category === 'paper' ? '📄' : scan.category === 'organic' ? '🥬' : scan.category === 'metal' ? '📱' : '🏺'}</div>
                        <div>
                          <div className="font-semibold text-gray-800">{scan.item}</div>
                          <div className="text-sm text-gray-600">{scan.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getMethodColor(scan.method)}`}>
                          {scan.method}
                        </span>
                        <span className="text-emerald-600 font-bold">+{scan.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="glass-ultra rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-emerald-50 to-lime-50 border-emerald-200 shadow-md'
                          : 'glass-soft border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-bold text-gray-800 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlocked && (
                        <div className="mt-3 text-xs text-emerald-600 font-semibold">✓ Unlocked</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'centers' && (
              <div className="glass-ultra rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Nearby Recycling Centers</h3>
                <div className="space-y-4">
                  {mockNearbyCenters.map((center) => (
                    <div
                      key={center.id}
                      className="p-5 glass-soft rounded-xl hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 mb-1">{center.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {center.distance}
                            </span>
                            <span className="text-emerald-600 font-medium">{center.type}</span>
                          </div>
                        </div>
                        <Link
                          to="/centers"
                          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold"
                        >
                          Directions
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reminders */}
            <div className="glass-ultra rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Reminders
                </h3>
                <button
                  onClick={() => setShowReminderModal(true)}
                  className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  title="Add Reminder"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {reminders.length === 0 ? (
                  <p className="text-gray-500 text-center py-6 text-sm">No reminders set</p>
                ) : (
                  reminders.map((reminder) => (
                    <div key={reminder.id} className="p-3 glass-soft rounded-xl group hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="text-xl">{reminder.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-800 text-sm truncate">{reminder.title}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <Calendar className="w-3 h-3" />
                            {reminder.date}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            {reminder.time}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Impact Summary */}
            <div className="glass-ultra rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Leaf className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">CO₂ Saved</div>
                    <div className="font-bold text-gray-900">42 kg</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Recycle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Items Recycled</div>
                    <div className="font-bold text-gray-900">125</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-lime-100 rounded-lg">
                    <Award className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Community Rank</div>
                    <div className="font-bold text-gray-900">#12</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reminder Modal */}
      <AnimatePresence>
        {showReminderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowReminderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-ultra rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-emerald-600" />
                  Set Reminder
                </h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select
                    value={reminderForm.type}
                    onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    <option value="recycle">♻️ Waste Collection</option>
                    <option value="compost">🌱 Compost Pickup</option>
                    <option value="general">🗑️ General Waste</option>
                    <option value="ewaste">⚡ E-Waste Drop-off</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={reminderForm.title}
                    onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                    placeholder="e.g., Plastic collection day"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addReminder}
                    className="flex-1 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Set Reminder
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  🔔 You'll receive a notification 5 minutes before the scheduled time
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
