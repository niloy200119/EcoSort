import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Trash2,
  Recycle,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, subDays } from 'date-fns';
import useAuthStore from '../store/authStore';

// Generate mock data outside component for React purity
const wasteCollectionData = Array.from({ length: 7 }, (_, i) => ({
  date: format(subDays(new Date(), 6 - i), 'MMM dd'),
  collected: Math.floor(Math.random() * 50) + 30,
  recycled: Math.floor(Math.random() * 30) + 10,
  organic: Math.floor(Math.random() * 20) + 5,
}));

const wasteCompositionData = [
  { name: 'Plastic', value: 35, color: '#f59e0b' },
  { name: 'Organic', value: 28, color: '#10b981' },
  { name: 'Paper', value: 18, color: '#3b82f6' },
  { name: 'Metal', value: 12, color: '#8b5cf6' },
  { name: 'Glass', value: 7, color: '#ec4899' },
];

const municipalPerformance = [
  { name: 'Dhaka North', score: 85, collected: 450, recycled: 320 },
  { name: 'Dhaka South', score: 78, collected: 380, recycled: 285 },
  { name: 'Chittagong', score: 92, collected: 420, recycled: 365 },
  { name: 'Sylhet', score: 71, collected: 290, recycled: 195 },
  { name: 'Rajshahi', score: 88, collected: 340, recycled: 290 },
];

const citizenEngagement = [
  { month: 'Jan', activeUsers: 1200, scans: 3400, points: 45000 },
  { month: 'Feb', activeUsers: 1450, scans: 4200, points: 52000 },
  { month: 'Mar', activeUsers: 1680, scans: 4800, points: 61000 },
  { month: 'Apr', activeUsers: 1920, scans: 5600, points: 73000 },
  { month: 'May', activeUsers: 2150, scans: 6200, points: 84000 },
  { month: 'Jun', activeUsers: 2480, scans: 7100, points: 96000 },
];

const alerts = [
  {
    type: 'warning',
    title: 'Collection Delay',
    message: 'Sylhet Municipality - Route 5 delayed by 3 hours',
    time: '2 hours ago',
  },
  {
    type: 'success',
    title: 'Target Achieved',
    message: 'Chittagong exceeded monthly recycling target',
    time: '5 hours ago',
  },
  {
    type: 'error',
    title: 'Low Performance',
    message: 'Dhaka South - Recycling rate below threshold',
    time: '1 day ago',
  },
];

const stats = [
  {
    label: 'Total Waste Collected',
    value: '2,847 tons',
    change: '+12.5%',
    trend: 'up',
    icon: Trash2,
    color: 'text-amber-600',
    bg: 'bg-amber-100/60',
  },
  {
    label: 'Recycling Rate',
    value: '68.4%',
    change: '+5.2%',
    trend: 'up',
    icon: Recycle,
    color: 'text-green-600',
    bg: 'bg-green-100/60',
  },
  {
    label: 'Active Citizens',
    value: '2,480',
    change: '+18.3%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-100/60',
  },
  {
    label: 'Compliance Score',
    value: '82.7%',
    change: '-2.1%',
    trend: 'down',
    icon: CheckCircle2,
    color: 'text-purple-600',
    bg: 'bg-purple-100/60',
  },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-amber-50/40 py-8 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-amber-900 font-comfortaa mb-2">
                Administrative Dashboard
              </h1>
              <p className="text-amber-700 font-nunito">
                Welcome back, {user?.name || 'Admin'} • {user?.organization || 'Department of Environment'}
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-amber-100/60 backdrop-blur-md border border-amber-300/40 rounded-xl text-amber-900 focus:outline-none focus:ring-0"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <button className="px-4 py-2 bg-amber-400/60 backdrop-blur-xl text-amber-900 rounded-xl hover:scale-105 transition-transform flex items-center gap-2 focus:outline-none">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6 hover:scale-105 transition-transform"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${stat.bg} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-amber-900 font-comfortaa mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-amber-700 font-nunito">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Waste Collection Trends */}
          <div className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-amber-900 font-comfortaa mb-1">
                  Waste Collection Trends
                </h2>
                <p className="text-sm text-amber-700 font-nunito">Daily collection metrics (tons)</p>
              </div>
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={wasteCollectionData}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />
                <XAxis dataKey="date" stroke="#78350f" style={{ fontSize: '12px' }} />
                <YAxis stroke="#78350f" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="collected"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorCollected)"
                  name="Total Collected"
                />
                <Area
                  type="monotone"
                  dataKey="recycled"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRecycled)"
                  name="Recycled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Waste Composition */}
          <div className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-amber-900 font-comfortaa mb-1">
                  Waste Composition
                </h2>
                <p className="text-sm text-amber-700 font-nunito">By material type (%)</p>
              </div>
              <Filter className="w-6 h-6 text-amber-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={wasteCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelStyle={{ fontSize: '12px', fill: '#78350f' }}
                >
                  {wasteCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Municipal Performance */}
          <div className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-amber-900 font-comfortaa mb-1">
                  Municipal Performance
                </h2>
                <p className="text-sm text-amber-700 font-nunito">Efficiency score & collection</p>
              </div>
              <Building2 className="w-6 h-6 text-amber-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={municipalPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />
                <XAxis dataKey="name" stroke="#78350f" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={60} />
                <YAxis stroke="#78350f" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="score" fill="#f59e0b" name="Score (%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Citizen Engagement */}
          <div className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-amber-900 font-comfortaa mb-1">
                  Citizen Engagement
                </h2>
                <p className="text-sm text-amber-700 font-nunito">Monthly active users & scans</p>
              </div>
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={citizenEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />
                <XAxis dataKey="month" stroke="#78350f" style={{ fontSize: '12px' }} />
                <YAxis stroke="#78350f" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Active Users"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="scans"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Total Scans"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-amber-100/40 backdrop-blur-md border border-amber-200/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-amber-900 font-comfortaa">
              Recent Alerts & Notifications
            </h2>
            <Calendar className="w-6 h-6 text-amber-600" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-amber-200/40"
              >
                <div className={`p-2 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'success' ? 'bg-green-100' :
                  'bg-red-100'
                }`}>
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
                  {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {alert.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 font-nunito mb-1">{alert.title}</h3>
                  <p className="text-sm text-amber-700">{alert.message}</p>
                  <p className="text-xs text-amber-600 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
