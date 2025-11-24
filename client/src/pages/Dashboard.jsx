import { useState } from 'react';
import { Award, Camera, TrendingUp, Calendar, MapPin, Trophy, Leaf } from 'lucide-react';
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
    <div className="min-h-screen bg-emerald-mist/40 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-comfortaa gradient-text-emerald">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl text-sage font-nunito">
            Track your environmental impact and continue your eco journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-mint rounded-3xl p-6 text-moss shadow-lg animate-breathe"
          >
            <Trophy className="w-10 h-10 mb-3 text-lime-glow" />
            <p className="text-3xl font-bold mb-1 font-comfortaa">{user.points}</p>
            <p className="text-sage font-nunito">Impact Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-ultra rounded-3xl p-6 text-moss shadow-lg animate-breathe"
          >
            <Camera className="w-10 h-10 mb-3 text-emerald-soft" />
            <p className="text-3xl font-bold mb-1 font-comfortaa">{user.scansThisMonth}</p>
            <p className="text-sage font-nunito">Scans This Month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-soft rounded-3xl p-6 text-moss shadow-lg animate-breathe"
          >
            <Award className="w-10 h-10 mb-3 text-emerald-soft" />
            <p className="text-3xl font-bold mb-1 font-comfortaa">{user.level}</p>
            <p className="text-sage font-nunito">Current Level</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-soft rounded-3xl p-6 text-moss shadow-lg animate-breathe"
          >
            <TrendingUp className="w-10 h-10 mb-3 text-lime-glow" />
            <p className="text-3xl font-bold mb-1 font-comfortaa">+15%</p>
            <p className="text-sage font-nunito">vs Last Month</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Scans */}
          <div className="lg:col-span-2">
            <div className="glass-ultra rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-moss mb-6 flex items-center gap-2 font-comfortaa">
                <Camera className="w-6 h-6 text-emerald-soft" />
                Recent Scans
              </h2>
              <div className="space-y-4">
                {recentScans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 glass-soft rounded-2xl hover:scale-[1.01] transition-transform"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-moss font-nunito">{scan.item}</p>
                      <p className="text-sm text-sage font-nunito">{scan.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="bg-emerald-mist/60 text-moss px-3 py-1 rounded-full text-sm font-quicksand font-semibold">
                        {scan.method}
                      </span>
                      <span className="text-lime-glow font-bold font-comfortaa">+{scan.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/scanner">
                <button className="w-full mt-6 glass-mint text-moss px-6 py-3 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform focus:outline-none focus:ring-0">
                  Scan New Item
                </button>
              </Link>
            </div>

            {/* Achievements */}
            <div className="glass-ultra rounded-3xl p-6 mt-8">
              <h2 className="text-2xl font-bold text-moss mb-6 flex items-center gap-2 font-comfortaa">
                <Trophy className="w-6 h-6 text-lime-glow" />
                Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`text-center p-4 rounded-2xl transition-all ${
                      achievement.unlocked
                        ? 'glass-mint'
                        : 'glass-soft opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-semibold text-moss font-nunito">
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
            <div className="glass-ultra rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-moss mb-6 flex items-center gap-2 font-comfortaa">
                <Calendar className="w-6 h-6 text-emerald-soft" />
                Reminders
              </h2>
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="p-4 glass-soft rounded-2xl"
                  >
                    <p className="font-semibold text-moss font-nunito">{reminder.title}</p>
                    <p className="text-sm text-sage mt-1 font-nunito">
                      {reminder.date} at {reminder.time}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 glass-mint text-moss px-4 py-2 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform focus:outline-none focus:ring-0">
                Add Reminder
              </button>
            </div>

            {/* Quick Actions */}
            <div className="glass-ultra rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-moss mb-6 font-comfortaa">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/scanner">
                  <button className="w-full glass-mint text-moss px-4 py-3 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
                    <Camera className="w-5 h-5" />
                    Scan Item
                  </button>
                </Link>
                <Link to="/map">
                  <button className="w-full glass-soft text-moss px-4 py-3 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
                    <MapPin className="w-5 h-5" />
                    Find Centers
                  </button>
                </Link>
                <Link to="/guide">
                  <button className="w-full glass-soft text-moss px-4 py-3 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform focus:outline-none focus:ring-0 flex items-center justify-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-soft" />
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
