import { useState } from 'react';
import { Mail, Lock, User, MapPin, Recycle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Mock registration - in real app, would call backend API
    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        // Simulate successful registration
        localStorage.setItem('user', JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          location: formData.location
        }));
        navigate('/dashboard');
      } else {
        setError('Please fill in all fields');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-emerald-mist/60 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Recycle className="w-16 h-16 text-lime-glow animate-glow-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-2 font-comfortaa gradient-text-emerald">Join EcoSort</h1>
          <p className="text-sage font-nunito">Start your journey to a greener future</p>
        </div>

        {/* Registration Form */}
        <div className="glass-ultra rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-moss mb-2 font-nunito">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 glass-soft border border-emerald-soft/30 rounded-full text-moss placeholder:text-sage/70 focus:outline-none focus:ring-0"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-moss mb-2 font-nunito">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 glass-soft border border-emerald-soft/30 rounded-full text-moss placeholder:text-sage/70 focus:outline-none focus:ring-0"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Location Field */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-moss mb-2 font-nunito">
                Location (City)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage w-5 h-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 glass-soft border border-emerald-soft/30 rounded-full text-moss placeholder:text-sage/70 focus:outline-none focus:ring-0"
                  placeholder="Sylhet, Bangladesh"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-moss mb-2 font-nunito">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 glass-soft border border-emerald-soft/30 rounded-full text-moss placeholder:text-sage/70 focus:outline-none focus:ring-0"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-moss mb-2 font-nunito">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage w-5 h-5" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 glass-soft border border-emerald-soft/30 rounded-full text-moss placeholder:text-sage/70 focus:outline-none focus:ring-0"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50/80 border border-red-300 text-red-700 px-4 py-3 rounded-2xl font-nunito">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-quicksand font-semibold text-moss transition-transform focus:outline-none focus:ring-0 ${
                loading
                  ? 'bg-emerald-mist/40 cursor-not-allowed'
                  : 'glass-mint hover:scale-105 animate-sprout'
              }`}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-emerald-soft/30"></div>
            <span className="px-4 text-sage text-sm font-nunito">or</span>
            <div className="flex-1 border-t border-emerald-soft/30"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sage font-nunito">
              Already have an account?{' '}
              <Link to="/login" className="text-moss font-semibold hover:text-lime-glow">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 text-center text-sm text-sage font-nunito">
          By registering, you agree to our{' '}
          <a href="#" className="text-moss hover:text-lime-glow">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-moss hover:text-lime-glow">Privacy Policy</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
