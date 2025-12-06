import { useState } from 'react';
import { Mail, Lock, User, MapPin, Recycle, CreditCard, Building2, Shield, Users, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { useTheme } from '../hooks/useTheme';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [role, setRole] = useState('citizen'); // 'citizen', 'waste-manager', or 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nid: '',
    location: '',
    organization: '', // For admins only
    designation: '', // For admins only
    password: '',
    confirmPassword: ''
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

  const validateNID = (nid) => {
    // NID must be exactly 10 digits
    return /^\d{10}$/.test(nid);
  };

  const validateEmail = (email) => {
    // Email must contain @ and .com
    return /^[^\s@]+@[^\s@]+\.com$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!validateEmail(formData.email)) {
      toast.error('Invalid email. Must contain @ and end with .com');
      setLoading(false);
      return;
    }

    if (!validateNID(formData.nid)) {
      toast.error('Invalid NID number. Must be exactly 10 digits');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (role === 'admin' && !formData.organization) {
      toast.error('Organization name is required for administrators');
      setLoading(false);
      return;
    }

    if (role === 'waste-manager' && !formData.organization) {
      toast.error('Organization name is required for waste managers');
      setLoading(false);
      return;
    }

    // Mock registration - in real app, would call backend API
    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
        nid: formData.nid,
        location: formData.location,
        role: role,
        ...((role === 'admin' || role === 'waste-manager') && {
          organization: formData.organization,
          designation: formData.designation
        }),
        points: role === 'citizen' ? 0 : null,
        joinedDate: new Date().toISOString()
      };

      login(userData);
      switchTheme(role);

      if (role === 'citizen') {
        navigate('/dashboard');
      } else if (role === 'waste-manager') {
        navigate('/waste-manager/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
      
      setLoading(false);
    }, 1500);
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
        className="max-w-2xl w-full"
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
            Join EcoSort
          </h1>
          <p className={`${currentStyle.textSoft} font-nunito`}>
            {role === 'citizen' ? 'Start your journey to a greener future' : role === 'waste-manager' ? 'Manage waste collection operations' : 'Monitor and manage waste systems'}
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

        {/* Registration Form */}
        <div className={`${currentStyle.glass} rounded-3xl p-8`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                    placeholder="John Doe"
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
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              {/* Location Field */}
              <div>
                <label htmlFor="location" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                  {role === 'citizen' ? 'City' : 'Work Zone/Division'}
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                    placeholder={role === 'citizen' ? 'Sylhet, Bangladesh' : role === 'waste-manager' ? 'Dhaka Zone 3' : 'Dhaka North City Corporation'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Admin and Waste Manager fields */}
            <AnimatePresence>
              {(role === 'admin' || role === 'waste-manager') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  <div>
                    <label htmlFor="organization" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                      Organization
                    </label>
                    <div className="relative">
                      <Building2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                        placeholder={role === 'admin' ? 'Department of Environment' : 'City Waste Management'}
                        required={role === 'admin' || role === 'waste-manager'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="designation" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                      Designation
                    </label>
                    <div className="relative">
                      {role === 'admin' ? (
                        <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                      ) : (
                        <Truck className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                      )}
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                        placeholder={role === 'admin' ? 'Environmental Officer' : 'Collection Manager'}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-semibold ${currentStyle.text} mb-2 font-nunito`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentStyle.textSoft} w-5 h-5`} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 ${currentStyle.buttonInactive} border border-current/20 rounded-full ${currentStyle.text} placeholder:text-current/60 focus:outline-none focus:ring-0`}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
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
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className={`flex-1 border-t border-current/20 ${currentStyle.textSoft}`}></div>
            <span className={`px-4 ${currentStyle.textSoft} text-sm font-nunito`}>or</span>
            <div className={`flex-1 border-t border-current/20 ${currentStyle.textSoft}`}></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className={`${currentStyle.textSoft} font-nunito`}>
              Already have an account?{' '}
              <Link to="/login" className={`${currentStyle.text} font-semibold hover:${currentStyle.accent}`}>
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className={`mt-6 text-center text-sm ${currentStyle.textSoft} font-nunito`}>
          By registering, you agree to our{' '}
          <a href="#" className={`${currentStyle.text} hover:${currentStyle.accent}`}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" className={`${currentStyle.text} hover:${currentStyle.accent}`}>Privacy Policy</a>
        </div>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}
