import { useState } from 'react';
import { Award, Camera, TrendingUp, Calendar, MapPin, Trophy, Leaf, Recycle, Sparkles, Target } from 'lucide-react';
import { motion } from 'framer-motion';
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

const mockReminders = [
  { id: 1, title: 'Recycling Collection', date: '2024-11-25', time: '8:00 AM', type: 'recycle' },
  { id: 2, title: 'Compost Pickup', date: '2024-11-27', time: '9:00 AM', type: 'compost' },
  { id: 3, title: 'General Waste', date: '2024-11-26', time: '7:00 AM', type: 'general' }
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

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
        totalPoints: user?.points || 0,
        scansThisMonth: 0,
        recyclingRate: 0,
        level: 1,
        nextLevelPoints: 1000
    },
    recentScans: [],
    centers: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
            const [statsData, locationsData] = await Promise.all([
                authService.getDashboardStats(),
                authService.getLocations().catch(() => ({ data: { locations: [] } }))
            ]);

            setDashboardData(prev => ({
                ...prev,
                stats: statsData?.data?.stats || prev.stats,
                recentScans: statsData?.data?.recentScans || [],
                centers: locationsData?.data?.locations || []
            }));
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchDashboardData();
  }, []);

  const { totalPoints, scansThisMonth, recyclingRate, nextLevelPoints } = dashboardData.stats;
  const progressToNext = ((totalPoints / nextLevelPoints) * 100).toFixed(0);

  const getMethodColor = (method) => {
    const colors = {
      'Recycle': 'bg-emerald-100/60 text-emerald-700 border-emerald-300/40',
      'Compost': 'bg-lime-100/60 text-lime-700 border-lime-300/40',
      'E-Waste': 'bg-purple-100/60 text-purple-700 border-purple-300/40',
      'Landfill': 'bg-gray-100/60 text-gray-700 border-gray-300/40'
    };
    return colors[method] || colors['Recycle'];
  };

  return (
    <div className="min-h-screen bg-citizen-auth py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 font-comfortaa gradient-text-emerald">
                Welcome back, {user?.name?.split(' ')[0] || 'Citizen'}! 👋
              </h1>
              <p className="text-xl text-sage font-nunito">
                Track your environmental impact and continue your eco journey
              </p>
            </div>
            <Link to="/scanner">
              <button className="glass-mint px-6 py-3 rounded-full font-quicksand font-semibold text-moss hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none">
                <Camera className="w-5 h-5" />
                Scan New Item
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-mint rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="flex items-start justify-between mb-3">
              <Trophy className="w-10 h-10 text-lime-glow animate-glow-pulse" />
              {/* <span className="text-xs bg-lime-100/60 text-lime-700 px-2 py-1 rounded-full">+50 today</span> */}
            </div>
            <p className="text-4xl font-bold mb-1 font-comfortaa text-moss">{totalPoints}</p>
            <p className="text-sage font-nunito mb-2">Impact Points</p>
            <div className="w-full bg-emerald-100/40 rounded-full h-2 mb-1">
              <div 
                className="bg-linear-to-r from-emerald-400 to-lime-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
            <p className="text-xs text-sage">{Math.max(0, nextLevelPoints - totalPoints)} points to next level</p>
          </motion.div>

          {/* Scans This Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-ultra rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <Camera className="w-10 h-10 mb-3 text-emerald-soft" />
            <p className="text-4xl font-bold mb-1 font-comfortaa text-moss">{scansThisMonth}</p>
            <p className="text-sage font-nunito">Scans This Month</p>
          </motion.div>

          {/* Recycling Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-soft rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <Recycle className="w-10 h-10 mb-3 text-forest animate-spin" style={{ animationDuration: '8s' }} />
            <p className="text-4xl font-bold mb-1 font-comfortaa text-moss">{recyclingRate}%</p>
            <p className="text-sage font-nunito">Recycling Rate</p>
          </motion.div>

          {/* Member Since / Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-ultra rounded-3xl p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles className="w-10 h-10 mb-3 text-lime-glow animate-pulse" />
            <p className="text-2xl font-bold mb-1 font-comfortaa text-moss">Level {dashboardData.stats.level}</p>
            <p className="text-sage font-nunito">Eco Warrior</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'scans', 'achievements', 'centers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-2xl font-quicksand font-semibold transition-all focus:outline-none capitalize ${
                activeTab === tab
                  ? 'glass-mint text-moss shadow-md'
                  : 'glass-soft text-sage hover:text-moss'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Scans */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-soft rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-moss font-comfortaa">Recent Scans</h2>
                <Link to="/scanner" className="text-sm text-emerald-soft hover:text-lime-glow font-nunito">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {dashboardData.recentScans.length > 0 ? (
                    dashboardData.recentScans.map((scan, index) => (
                    <motion.div
                        key={scan.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-emerald-soft/20"
                    >
                        <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100/60 flex items-center justify-center">
                            <Recycle className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-moss font-nunito">{scan.item}</p>
                            <p className="text-sm text-sage">{new Date(scan.date).toLocaleDateString()}</p>
                        </div>
                        </div>
                        <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMethodColor(scan.method || 'Recycle')}`}>
                            {scan.method || 'Recycle'}
                        </span>
                        <p className="text-sm text-lime-glow font-bold mt-1">+{scan.points} pts</p>
                        </div>
                    </motion.div>
                    ))
                ) : (
                    <p className="text-center text-sage py-4">No scans yet. Start by scanning an item!</p>
                )}
              </div>
            </motion.div>

            {/* Reminders & Quick Actions */}
            <div className="space-y-6">
              {/* Upcoming Reminders */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-ultra rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-moss font-comfortaa">Reminders</h2>
                  <button className="text-sm text-emerald-soft hover:text-lime-glow font-nunito">
                    + Add
                  </button>
                </div>
                <div className="space-y-3">
                  {mockReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className="flex items-center gap-3 p-3 bg-white/30 rounded-xl border border-emerald-soft/20"
                    >
                      <Calendar className="w-5 h-5 text-emerald-soft" />
                      <div className="flex-1">
                        <p className="font-semibold text-moss text-sm font-nunito">{reminder.title}</p>
                        <p className="text-xs text-sage">{reminder.date} • {reminder.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-mint rounded-3xl p-6"
              >
                <h2 className="text-2xl font-bold text-moss font-comfortaa mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/scanner" className="glass-soft p-4 rounded-xl hover:scale-105 transition-transform text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-emerald-soft" />
                    <p className="text-sm font-semibold text-moss font-nunito">Scan Item</p>
                  </Link>
                  <Link to="/map" className="glass-soft p-4 rounded-xl hover:scale-105 transition-transform text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-emerald-soft" />
                    <p className="text-sm font-semibold text-moss font-nunito">Find Centers</p>
                  </Link>
                  <Link to="/guide" className="glass-soft p-4 rounded-xl hover:scale-105 transition-transform text-center">
                    <Leaf className="w-8 h-8 mx-auto mb-2 text-emerald-soft" />
                    <p className="text-sm font-semibold text-moss font-nunito">Waste Guide</p>
                  </Link>
                  <button className="glass-soft p-4 rounded-xl hover:scale-105 transition-transform text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-emerald-soft" />
                    <p className="text-sm font-semibold text-moss font-nunito">Set Goals</p>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-soft rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold text-moss font-comfortaa mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'glass-mint border-lime-glow/40 shadow-lg'
                      : 'glass-soft border-gray-300/30 opacity-60'
                  }`}
                >
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <h3 className="text-lg font-bold text-moss font-comfortaa mb-1">{achievement.title}</h3>
                  <p className="text-sm text-sage font-nunito">{achievement.description}</p>
                  {achievement.unlocked && (
                    <div className="mt-3 flex items-center gap-2 text-lime-glow text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      Unlocked!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'centers' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-soft rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold text-moss font-comfortaa mb-6">Nearby Recycling Centers</h2>
            <div className="space-y-4">
              {dashboardData.centers.length > 0 ? (
                dashboardData.centers.map((center) => (
                    <div
                    key={center._id || center.id}
                    className="flex items-center justify-between p-5 glass-ultra rounded-2xl hover:scale-102 transition-transform"
                    >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100/60 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                        <p className="font-semibold text-moss font-nunito text-lg">{center.name}</p>
                        <p className="text-sm text-sage">{center.type?.replace('_', ' ') || 'Center'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-soft">{center.address}</p>
                        <Link to="/map" className="text-xs text-lime-glow hover:underline">
                        Get Directions →
                        </Link>
                    </div>
                    </div>
                ))
              ) : (
                  <p className="text-center text-sage">No centers found.</p>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'scans' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-soft rounded-3xl p-6"
          >
            <h2 className="text-2xl font-bold text-moss font-comfortaa mb-6">All Scans</h2>
            <div className="space-y-3">
              {mockRecentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center justify-between p-5 glass-ultra rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100/60 flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-moss font-nunito">{scan.item}</p>
                      <p className="text-sm text-sage">{scan.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMethodColor(scan.method)}`}>
                      {scan.method}
                    </span>
                    <p className="text-lime-glow font-bold mt-2">+{scan.points} points</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
