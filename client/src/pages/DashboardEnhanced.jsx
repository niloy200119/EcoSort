import { useState, useEffect, useRef } from 'react';
import { 
  Award, Camera, TrendingUp, Calendar, MapPin, Trophy, Leaf, 
  Recycle, Sparkles, Target, Bell, Plus, X, Trash2, Clock, Users,
  CheckCircle, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Simple notification sound
const alarmSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

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
  const { user, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [myEvents, setMyEvents] = useState([]);
  
  useEffect(() => {
    if (token) {
        fetchMyEvents();
    }
  }, [token]);

  const fetchMyEvents = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_MY_TICKETS}`, {
             headers: { Authorization: `Bearer ${token}` }
        });
        setMyEvents(response.data.data);
    } catch (error) {
        console.error("Failed to fetch events", error);
    }
  };
  
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
    type: 'recycle',
    repeat: 'none'
  });

  // Calculate stats
  const totalPoints = user?.points || 1250;
  const scansThisMonth = 23;
  const recyclingRate = 84;
  const nextLevelPoints = 1500;
  const progressToNext = ((totalPoints / nextLevelPoints) * 100).toFixed(0);

  // Track notified reminders to avoid spam
  const notifiedRef = useRef(new Set());

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('ecosort-reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Request notification permission and check reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      
      reminders.forEach(reminder => {
        // Skip if marked as done for today
        if (reminder.lastCompleted === todayStr) return;

        // Skip if not today and no repeat
        const reminderStart = new Date(reminder.date);
        const [hours, minutes] = reminder.time.split(':');
        
        let shouldTrigger = false;
        
        if (now < reminderStart && reminderStart.toDateString() !== now.toDateString()) {
           shouldTrigger = false;
        } else if (reminder.repeat === 'daily') {
           shouldTrigger = true;
        } else if (reminder.repeat === 'weekly') {
           shouldTrigger = reminderStart.getDay() === now.getDay();
        } else {
           shouldTrigger = reminderStart.toDateString() === now.toDateString();
        }

        if (!shouldTrigger) return;

        // Create a date object for specific reminder time TODAY
        const targetTime = new Date();
        targetTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Calculate time difference
        const diffMs = targetTime - now;
        const diffMins = Math.floor(diffMs / 60000);
        
        // Create unique key for this notification instance (id + date + time window)
        const notificationKey = `${reminder.id}-${todayStr}-${diffMins}`;

        // Trigger notification 5 minutes before OR exactly at the time
        if ((diffMins === 5 || diffMins === 0) && !notifiedRef.current.has(notificationKey)) {
          const message = diffMins === 0 
            ? `⏰ It's time for: ${reminder.title}!` 
            : `⏳ ${reminder.title} in 5 minutes`;

          // 1. Play Sound (The "Alarm")
          alarmSound.play().catch(e => console.log("Audio play failed (user interaction required first)", e));
          
          // 2. Show In-App Toast (Visual Alarm)
          toast(message, {
            duration: 8000,
            style: {
              background: '#ECFDF5',
              border: '2px solid #34D399',
              padding: '16px',
              color: '#065F46',
              fontWeight: 'bold',
            },
            icon: diffMins === 0 ? '⏰' : '🔔',
          });

          // 3. System Notification
          if (Notification.permission === 'granted') {
            new Notification('EcoSort Reminder', {
              body: message,
              icon: '/favicon.ico',
              tag: reminder.id.toString()
            });
          }
          
          notifiedRef.current.add(notificationKey);
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
    checkReminders(); // Check immediately on mount
    const interval = setInterval(checkReminders, 60000);

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
    setReminderForm({ title: '', date: '', time: '', type: 'recycle', repeat: 'none' });
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleReminderCompletion = (id) => {
    setReminders(reminders.map(r => {
      if (r.id === id) {
        const today = new Date().toISOString().split('T')[0];
        // If already completed today, toggle off. Else mark completed today.
        const isCompletedToday = r.lastCompleted === today;
        return { 
          ...r, 
          lastCompleted: isCompletedToday ? null : today 
        };
      }
      return r;
    }));
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
    { id: 'events', label: 'My Events', icon: Calendar },
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
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{myEvents.length}</div>
            <div className="text-sm text-gray-600">Events Joined</div>
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
                          <h4 className="font-bold text-gray-800">{center.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{center.type}</p>
                          <div className="flex gap-2 mt-2">
                             <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                <MapPin className="w-3 h-3 mr-1" />
                                {center.distance}
                             </div>
                          </div>
                        </div>
                        <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                            <MapPin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
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
                  reminders.map((reminder) => {
                    const isDoneToday = reminder.lastCompleted === new Date().toISOString().split('T')[0];
                    return (
                    <div key={reminder.id} className={`p-3 rounded-xl group hover:shadow-md transition-all ${isDoneToday ? 'bg-emerald-50 opacity-75' : 'glass-soft'}`}>
                      <div className="flex items-start gap-3">
                        <button 
                            onClick={() => toggleReminderCompletion(reminder.id)}
                            className={`mt-1 flex-shrink-0 transition-colors ${isDoneToday ? 'text-emerald-600' : 'text-gray-300 hover:text-emerald-500'}`}
                            title={isDoneToday ? "Mark as not done" : "Mark as done for today"}
                        >
                            <CheckCircle className={`w-5 h-5 ${isDoneToday ? 'fill-emerald-100' : ''}`} />
                        </button>
                        
                        <div className={`text-xl ${isDoneToday ? 'opacity-50' : ''}`}>{reminder.icon}</div>
                        <div className={`flex-1 min-w-0 ${isDoneToday ? 'line-through text-gray-400' : ''}`}>
                          <div className="font-semibold text-gray-800 text-sm truncate">{reminder.title}</div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <Clock className="w-3 h-3" />
                            {reminder.time}
                            {reminder.repeat && reminder.repeat !== 'none' && (
                                <span className="flex items-center gap-1 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded ml-2 font-medium capitalize">
                                    <RefreshCw className="w-3 h-3" />
                                    {reminder.repeat}
                                </span>
                            )}
                          </div>
                          {reminder.repeat === 'none' && (
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                {reminder.date}
                            </div>
                          )}
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
                  )})
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
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <div className="text-sm text-gray-600">Events Joined</div>
                        <div className="font-bold text-gray-900">{myEvents.length}</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Events Tab */}
        {activeTab === 'events' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {myEvents.length > 0 ? (
                    myEvents.map(ticket => {
                        const event = ticket.event;
                        const date = new Date(event.date);
                        return (
                            <motion.div 
                                key={ticket._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100"
                            >
                                <div className="h-32 bg-gray-200 relative">
                                     {event.image ? (
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                            <Calendar className="w-12 h-12 text-white/50" />
                                        </div>
                                    )}
                                    <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase
                                        ${ticket.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                                    `}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {date.toDateString()}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="w-4 h-4 mr-2" />
                                            {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {event.location}
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/events/${event._id}`}
                                        className="block w-full text-center py-2 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors"
                                    >
                                        View Event
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })
                 ) : (
                     <div className="col-span-full text-center py-10 bg-white rounded-2xl shadow-sm">
                         <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                         <h3 className="text-lg font-bold text-gray-600">No events joined yet</h3>
                         <Link to="/events" className="text-emerald-500 hover:underline mt-2 inline-block">Browse Community Events</Link>
                     </div>
                 )}
             </div>
        )}
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

                <div className="grid grid-cols-2 gap-4">
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
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Repeat
                    </label>
                    <select
                        value={reminderForm.repeat}
                        onChange={(e) => setReminderForm({ ...reminderForm, repeat: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                    >
                        <option value="none">Never</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                    </div>
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
