import { Link, useLocation } from 'react-router-dom';
import { Recycle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/scanner', label: 'Scanner' },
    { path: '/map', label: 'Map' },
    { path: '/guide', label: 'Guide' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="backdrop-blur-xl bg-emerald-soft/5 border-b border-emerald-soft/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="w-8 h-8 text-lime-glow animate-glow-pulse" />
            <span className="text-2xl font-bold gradient-text-emerald font-comfortaa">EcoSort</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium font-nunito px-3 py-1 rounded-full transition-all ${
                  isActive(link.path)
                    ? 'glass-mint text-moss shadow-sm'
                    : 'text-sage hover:text-moss hover:bg-emerald-soft/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="font-quicksand font-semibold text-sage hover:text-moss transition-colors focus:outline-none focus:ring-0">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="glass-ultra px-6 py-2 rounded-full font-quicksand font-semibold text-moss hover:scale-105 transition-transform focus:outline-none focus:ring-0">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sage focus:outline-none focus:ring-0"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-ultra border-t border-emerald-soft/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-full text-base font-medium ${
                  isActive(link.path)
                    ? 'glass-mint text-moss'
                    : 'text-sage hover:bg-emerald-soft/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="block w-full text-left px-3 py-2 text-sage font-quicksand font-semibold focus:outline-none focus:ring-0">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="block w-full text-left px-3 py-2 glass-mint rounded-full font-quicksand font-semibold mt-2 focus:outline-none focus:ring-0">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
