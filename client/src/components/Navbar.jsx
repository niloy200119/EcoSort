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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Recycle className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">EcoSort</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="text-primary font-medium hover:text-dark transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-dark transition-colors">
                Register
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-green-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="block w-full text-left px-3 py-2 text-primary font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <button className="block w-full text-left px-3 py-2 bg-primary text-white rounded-md font-medium mt-2">
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
