import { useState } from 'react';
import { Mail, Lock, Recycle, Shield, Users, CreditCard, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { useTheme } from '../hooks/useTheme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({
    email: '',
    nid: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { switchTheme } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    switchTheme(newRole);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.com$/.test(email);
  };

  const validateNID = (nid) => {
    return /^\d{10}$/.test(nid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email. Must contain @ and end with .com');
      setLoading(false);
      return;
    }
    
    if (!validateNID(formData.nid)) {
      toast.error('Invalid NID. Must be exactly 10 digits');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
        await login(formData.email, formData.password);
        
        const currentUser = useAuthStore.getState().user;
        if (currentUser.role === 'user' && (role === 'waste-manager' || role === 'citizen')) {
            useAuthStore.getState().updateUser({ role: role });
        }
        
        switchTheme(role);
        toast.success(`Welcome back!`);

        const actualRole = currentUser.role || role;
        
        if (actualRole === 'citizen' || actualRole === 'user') {
          navigate('/dashboard');
        } else if (actualRole === 'waste-manager' || actualRole === 'waste_manager') {
          navigate('/waste-manager/dashboard');
        } else if (actualRole === 'admin') {
          navigate('/admin/dashboard');
        } else {
            navigate('/dashboard');
        }

    } catch (err) {
        console.error(err);
        setError(err.message || 'Login failed. Please check your credentials.');
        toast.error(err.message || 'Login failed');
    } finally {
        setLoading(false);
    }
  };

  const roleStyles = {
    citizen: {
      bg: 'bg-citizen-auth',
      glass: 'glass-ultra',
      text: 'text-moss',
      textSoft: 'text-sage',
      accent: 'text-lime-glow',
      buttonActive: 'glass-mint',
      buttonInactive: 'glass-soft',
      glow: 'animate-glow-pulse',
      icon: Recycle
    },
    'waste-manager': {
      bg: 'bg-forest-auth',
      glass: 'glass-ultra',
      text: 'text-emerald-50',
      textSoft: 'text-emerald-200',
      accent: 'text-emerald-400',
      buttonActive: 'bg-emerald-600/60 backdrop-blur-xl',
      buttonInactive: 'bg-emerald-900/40 backdrop-blur-md',
      glow: 'animate-breathe',
      icon: Truck
    },
    admin: {
      bg: 'bg-admin-auth',
      glass: 'glass-ultra',
      text: 'text-amber-900',
      textSoft: 'text-amber-700',
      accent: 'text-amber-500',
      buttonActive: 'bg-amber-400/60 backdrop-blur-xl',
      buttonInactive: 'bg-amber-100/40 backdrop-blur-md',
      glow: 'animate-pulse',
      icon: Shield
    }
  };

  const currentStyle = roleStyles[role];
  const IconComponent = currentStyle.icon;

  return (
    <div className={`min-h-screen ${currentStyle.bg} flex items-center justify-center py-12 px-4 transition-colors duration-700`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <IconComponent className={`w-16 h-16 ${currentStyle.accent} ${currentStyle.glow}`} />
              </motion.div>
            </AnimatePresence>
          </div>
          <h1 className={`text-4xl font-bold mb-2 font-comfortaa ${currentStyle.text}`}>
            Welcome Back!
          </h1>
          <p className={`${currentStyle.textSoft} font-nunito`}>
            {role === 'citizen' ? 'Login to continue your eco journey' : role === 'waste-manager' ? 'Manage waste collection operations' : 'Access administrative dashboard'}
          </p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-3 mb-8">
          <button
            type="button"
            onClick={() => handleRoleSwitch('citizen')}
            className={`flex-1 py-3 px-4 rounded-2xl font-quicksand font-semibold transition-all focus:outline-none focus:ring-0 ${
              role === 'citizen' ? currentStyle.buttonActive : currentStyle.buttonInactive
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-1" />
            <span className="text-sm">Citizen</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('waste-manager')}
            className={`flex-1 py-3 px-4 rounded-2xl font-quicksand font-semibold transition-all focus:outline-none focus:ring-0 ${
              role === 'waste-manager' ? currentStyle.buttonActive : currentStyle.buttonInactive
            }`}
          >
            <Truck className="w-4 h-4 inline-block mr-1" />
            <span className="text-sm">Manager</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            className={`flex-1 py-3 px-4 rounded-2xl font-quicksand font-semibold transition-all focus:outline-none focus:ring-0 ${
              role === 'admin' ? currentStyle.buttonActive : currentStyle.buttonInactive
            }`}
          >
            <Shield className="w-4 h-4 inline-block mr-1" />
            <span className="text-sm">Admin</span>
          </button>
        </div>

        {/* Login Form */}
        <div className={`${currentStyle.glass} rounded-3xl p-8`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* NID Field */}
            <div>
              <label htmlFor="nid" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                National ID (NID)
              </label>
              <div className="relative">
                <CreditCard className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                <input
                  type="text"
                  id="nid"
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                  placeholder="Enter your NID"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#" className={`text-sm ${currentStyle.text} hover:${currentStyle.accent} font-nunito`}>
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50/80 border border-red-300 text-red-700 px-4 py-3 rounded-2xl font-nunito"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-full font-quicksand font-semibold transition-transform focus:outline-none focus:ring-0 ${
                loading
                  ? 'bg-gray-300/40 cursor-not-allowed text-gray-600'
                  : `${currentStyle.buttonActive} ${currentStyle.text} hover:scale-105`
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className={`flex-1 border-t border-current/20 ${currentStyle.textSoft}`}></div>
            <span className={`px-4 ${currentStyle.textSoft} text-sm font-nunito`}>or</span>
            <div className={`flex-1 border-t border-current/20 ${currentStyle.textSoft}`}></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className={`${currentStyle.textSoft} font-nunito`}>
              Don't have an account?{' '}
              <Link to="/register" className={`${currentStyle.text} font-semibold hover:${currentStyle.accent}`}>
                Register here
              </Link>
            </p>
          </div>

          {/* Guest Access */}
          {role === 'citizen' && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className={`${currentStyle.textSoft} text-sm hover:${currentStyle.text} font-nunito`}
              >
                Continue as Guest
              </button>
            </div>
          )}
        </div>
      </motion.div>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="dark"
        style={{
          '--toastify-color-success': '#2E6F40',
          '--toastify-color-error': '#2E6F40',
          '--toastify-color-warning': '#2E6F40',
          '--toastify-color-info': '#2E6F40',
          '--toastify-text-color-light': '#ffffff'
        }}
      />
    </div>
  );
}
