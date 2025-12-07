import { useState, useEffect } from 'react';
import { 
  Truck, MapPin, Calendar, CheckCircle, Clock, 
  AlertTriangle, Users, Package, TrendingUp, BarChart3, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import authService from '../services/authService';
import Chat from '../components/Chat';

export default function WasteManagerDashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMode, setChatMode] = useState('citizens');
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    todayCollections: 0,
    completedRoutes: 0,
    activeVehicles: 0,
    pendingRequests: 0,
    totalWasteToday: '0 tons',
    recyclingRate: '0%'
  });

  const [collectionSchedule, setSchedule] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [citizenRequests, setRequests] = useState([]);

  useEffect(() => {
    const fetchManagerData = async () => {
        try {
            const [statsData, scheduleData, vehiclesData, requestsData] = await Promise.all([
                authService.getManagerStats(),
                authService.getSchedule(),
                authService.getVehicles(),
                authService.getRequests()
            ]);

            if (statsData?.data?.stats) setStats(statsData.data.stats);
            if (scheduleData?.data?.schedule) setSchedule(scheduleData.data.schedule);
            if (vehiclesData?.data?.vehicles) setVehicles(vehiclesData.data.vehicles);
            if (requestsData?.data?.requests) setRequests(requestsData.data.requests);

        } catch (error) {
            console.error("Failed to fetch manager data", error);
        } finally {
            setLoading(false);
        }
    };

    fetchManagerData();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'maintenance': return 'bg-red-100 text-red-700 border-red-300';
      case 'idle': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-cyan-600 bg-cyan-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'vehicles', label: 'Vehicles' },
    { id: 'requests', label: 'Requests' }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-ultra rounded-3xl p-8 border-2 border-emerald-300/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-50 mb-2">
                Welcome, {user?.name || 'Manager'}! 🚛
              </h1>
              <p className="text-emerald-200">{user?.organization || 'Waste Management'} - {user?.location || 'Dhaka'}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-emerald-200">Today's Date</div>
              <div className="text-2xl font-bold text-emerald-50">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Today\'s Collections', value: stats.todayCollections, icon: Package, color: 'emerald' },
            { label: 'Completed Routes', value: stats.completedRoutes, icon: CheckCircle, color: 'green' },
            { label: 'Active Vehicles', value: stats.activeVehicles, icon: Truck, color: 'blue' },
            { label: 'Pending Requests', value: stats.pendingRequests, icon: AlertTriangle, color: 'amber' },
            { label: 'Total Waste Today', value: stats.totalWasteToday, icon: TrendingUp, color: 'purple' },
            { label: 'Recycling Rate', value: stats.recyclingRate, icon: BarChart3, color: 'lime' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-soft rounded-2xl p-6 border border-emerald-300/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 bg-${stat.color}-500/20 rounded-xl`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-emerald-50 mb-1">{stat.value}</div>
              <div className="text-sm text-emerald-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="glass-ultra rounded-2xl p-2 border border-emerald-300/20">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-emerald-200 hover:bg-emerald-800/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule Summary */}
            <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
              <h3 className="text-xl font-bold text-emerald-50 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Schedule
              </h3>
              <div className="space-y-3">
                {collectionSchedule.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-emerald-900/30 rounded-xl">
                    <div>
                      <div className="font-semibold text-emerald-100">{item.zone}</div>
                      <div className="text-sm text-emerald-300">{item.time} - {item.type}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Requests */}
            <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
              <h3 className="text-xl font-bold text-emerald-50 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Citizen Requests
              </h3>
              <div className="space-y-3">
                {citizenRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-emerald-900/30 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-emerald-100">{req.name}</div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(req.priority)}`}>
                        {req.priority}
                      </span>
                    </div>
                    <div className="text-sm text-emerald-300 mb-1">{req.request}</div>
                    <div className="flex items-center justify-between text-xs text-emerald-400">
                      <span>{req.address}</span>
                      <span>{req.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
            <h3 className="text-xl font-bold text-emerald-50 mb-4">Collection Schedule</h3>
            <div className="space-y-3">
              {collectionSchedule.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-emerald-900/30 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${getStatusColor(item.status).replace('text-', 'bg-').replace('100', '500/20')}`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-emerald-100">{item.zone}</div>
                      <div className="text-sm text-emerald-300">{item.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-100 font-medium">{item.time}</div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vehicles' && (
          <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
            <h3 className="text-xl font-bold text-emerald-50 mb-4">Vehicle Fleet Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-5 bg-emerald-900/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Truck className="w-6 h-6 text-emerald-400" />
                      <div className="font-bold text-emerald-100">{vehicle.number}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Users className="w-4 h-4" />
                      <span>Driver: {vehicle.driver}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300">
                      <MapPin className="w-4 h-4" />
                      <span>Location: {vehicle.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
            <h3 className="text-xl font-bold text-emerald-50 mb-4">Citizen Service Requests</h3>
            <div className="space-y-4">
              {citizenRequests.map((req) => (
                <div key={req.id} className="p-5 bg-emerald-900/30 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-emerald-100 text-lg">{req.name}</div>
                      <div className="text-emerald-300 text-sm">{req.time}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getPriorityColor(req.priority)}`}>
                      {req.priority} priority
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="text-sm text-emerald-200 mb-1">Request Type:</div>
                    <div className="text-emerald-100 font-medium">{req.request}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-300 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{req.address}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                      Assign Vehicle
                    </button>
                    <button className="flex-1 px-4 py-2 bg-emerald-900/50 text-emerald-200 border border-emerald-600 rounded-lg hover:bg-emerald-800/50 transition-colors">
                      Contact Citizen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Toggle */}
        <div className="glass-ultra rounded-2xl p-4 border border-emerald-300/20">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setChatMode('citizens')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                chatMode === 'citizens'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-900/30 text-emerald-200'
              }`}
            >
              <Users className="w-5 h-5" />
              Chat with Citizens
            </button>
            <button
              onClick={() => setChatMode('admin')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                chatMode === 'admin'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-900/30 text-emerald-200'
              }`}
            >
              <Shield className="w-5 h-5" />
              Chat with Admin
            </button>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <Chat chatWith={chatMode} />
    </div>
  );
}
