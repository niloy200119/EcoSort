import { Link, useLocation } from 'react-router-dom';
import { Recycle, Menu, X, Shield, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import { useTheme } from '../hooks/useTheme';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, role, user, logout } = useAuthStore();
  const { switchTheme } = useTheme();

  // Sync theme with role on mount and auth changes
  useEffect(() => {
    if (isAuthenticated && role) {
      switchTheme(role);
    } else {
      switchTheme('citizen');
    }
  }, [isAuthenticated, role, switchTheme]);

  const isActive = (path) => location.pathname === path;

  // Different nav links based on role
  const citizenLinks = [
    { path: '/', label: 'Home' },
    { path: '/scanner', label: 'Scanner' },
    { path: '/map', label: 'Map' },
    { path: '/guide', label: 'Guide' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const adminLinks = [
    { path: '/', label: 'Home' },
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/map', label: 'Centers' },
    { path: '/guide', label: 'Guide' },
  ];

  const navLinks = !isAuthenticated ? citizenLinks.filter(l => l.path !== '/dashboard') : role === 'admin' ? adminLinks : citizenLinks;

  const handleLogout = () => {
    logout();
    switchTheme('citizen');
    setIsOpen(false);
  };

  // Dynamic styling based on role
  const navStyle = role === 'admin' ? {
    bg: 'backdrop-blur-xl bg-amber-100/20 border-b border-amber-300/20',
    logo: 'text-amber-500',
    logoGlow: 'animate-pulse',
    textActive: 'bg-amber-400/60 backdrop-blur-md text-amber-900',
    textInactive: 'text-amber-700 hover:text-amber-900 hover:bg-amber-200/30',
    button: 'bg-amber-400/60 backdrop-blur-xl text-amber-900',
    buttonHover: 'hover:scale-105',
    icon: Shield,
  } : {
    bg: 'backdrop-blur-xl bg-emerald-soft/5 border-b border-emerald-soft/10',
    logo: 'text-lime-glow',
    logoGlow: 'animate-glow-pulse',
    textActive: 'glass-mint text-moss shadow-sm',
    textInactive: 'text-sage hover:text-moss hover:bg-emerald-soft/10',
    button: 'glass-ultra text-moss',
    buttonHover: 'hover:scale-105',
    icon: Recycle,
  };

  const IconComponent = navStyle.icon;

  return (
    <nav className={`${navStyle.bg} sticky top-0 z-40 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <IconComponent className={`w-8 h-8 ${navStyle.logo} ${navStyle.logoGlow}`} />
            <span className={`text-2xl font-bold font-comfortaa ${role === 'admin' ? 'text-amber-900' : 'gradient-text-emerald'}`}>
              EcoSort {role === 'admin' && <span className="text-sm font-normal">Admin</span>}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium font-nunito px-3 py-1 rounded-full transition-all ${
                  isActive(link.path)
                    ? navStyle.textActive
                    : navStyle.textInactive
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${navStyle.textInactive}`}>
                  <User className="w-4 h-4" />
                  <span className="text-sm font-nunito">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`${navStyle.button} px-6 py-2 rounded-full font-quicksand font-semibold ${navStyle.buttonHover} transition-transform focus:outline-none focus:ring-0 flex items-center gap-2`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={`font-quicksand font-semibold ${navStyle.textInactive} transition-colors focus:outline-none focus:ring-0`}>
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className={`${navStyle.button} px-6 py-2 rounded-full font-quicksand font-semibold ${navStyle.buttonHover} transition-transform focus:outline-none focus:ring-0`}>
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${navStyle.textInactive} focus:outline-none focus:ring-0`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden ${role === 'admin' ? 'bg-amber-100/40 backdrop-blur-md border-t border-amber-300/20' : 'glass-ultra border-t border-emerald-soft/10'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-full text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? navStyle.textActive
                    : navStyle.textInactive
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-current/10 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className={`px-3 py-2 ${navStyle.textInactive}`}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user?.name}</span>
                    </div>
                    {role === 'admin' && (
                      <p className="text-xs mt-1">{user?.organization}</p>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full ${navStyle.button} px-3 py-2 rounded-full font-quicksand font-semibold transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-0`}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-full text-center font-quicksand ${navStyle.textInactive}`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className={`block ${navStyle.button} px-3 py-2 rounded-full text-center font-quicksand font-semibold`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
