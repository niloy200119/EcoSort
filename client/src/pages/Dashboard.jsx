import { useState } from 'react';
import { Award, Camera, TrendingUp, Calendar, MapPin, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock user data
  const [user] = useState({
    name: 'A.B.M. Mostakim Niloy',
    points: 350,
    level: 'Eco Warrior',
    scansThisMonth: 23,
    joinDate: 'September 2024'
  });

  const recentScans = [
    { id: 1, item: 'Plastic Bottle', method: 'Recycle', points: 10, date: '2024-11-23' },
    { id: 2, item: 'Cardboard Box', method: 'Recycle', points: 10, date: '2024-11-22' },
    { id: 3, item: 'Food Scraps', method: 'Compost', points: 10, date: '2024-11-21' },
    { id: 4, item: 'Old Phone', method: 'E-Waste', points: 15, date: '2024-11-20' },
    { id: 5, item: 'Glass Jar', method: 'Recycle', points: 10, date: '2024-11-19' }
  ];

  const upcomingReminders = [
    { id: 1, title: 'Recycling Collection', date: '2024-11-25', time: '8:00 AM' },
    { id: 2, title: 'Compost Pickup', date: '2024-11-27', time: '9:00 AM' },
    { id: 3, title: 'General Waste', date: '2024-11-26', time: '7:00 AM' }
  ];

  const achievements = [
    { id: 1, title: 'First Scan', icon: '🌟', unlocked: true },
    { id: 2, title: '10 Scans', icon: '⭐', unlocked: true },
    { id: 3, title: 'Recycling Hero', icon: '♻️', unlocked: true },
    { id: 4, title: '50 Scans', icon: '🏆', unlocked: false },
    { id: 5, title: 'Eco Champion', icon: '👑', unlocked: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Track your environmental impact and continue your eco journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-white shadow-lg"
          >
            <Trophy className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold mb-1">{user.points}</p>
            <p className="text-yellow-100">Impact Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg"
          >
            <Camera className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold mb-1">{user.scansThisMonth}</p>
            <p className="text-green-100">Scans This Month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg"
          >
            <Award className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold mb-1">{user.level}</p>
            <p className="text-blue-100">Current Level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg"
          >
            <TrendingUp className="w-10 h-10 mb-3" />
            <p className="text-3xl font-bold mb-1">+15%</p>
            <p className="text-purple-100">vs Last Month</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Recent Scans
              </h2>
              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{scan.item}</p>
                      <p className="text-sm text-gray-500">{scan.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {scan.method}
                      </span>
                      <span className="text-yellow-600 font-bold">+{scan.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/scanner">
                <button className="w-full mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-dark transition-colors">
                  Scan New Item
                </button>
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`text-center p-4 rounded-lg transition-all ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-2 border-yellow-400'
                        : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-semibold text-gray-700">
                      {achievement.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Reminders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Reminders
              </h2>
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
                  >
                    <p className="font-semibold text-gray-900">{reminder.title}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {reminder.date} at {reminder.time}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary transition-colors">
                Add Reminder
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/scanner">
                  <button className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-dark transition-colors flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5" />
                    Scan Item
                  </button>
                </Link>
                <Link to="/map">
                  <button className="w-full bg-secondary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Find Centers
                  </button>
                </Link>
                <Link to="/guide">
                  <button className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    Browse Guide
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
