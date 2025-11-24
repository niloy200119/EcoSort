import { Recycle, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-ultra rounded-4xl px-6 sm:px-10 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* About */}
          <div className="max-w-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="w-8 h-8 text-lime-glow animate-glow-pulse" />
              <span className="text-2xl font-bold gradient-text-emerald font-comfortaa">EcoSort</span>
            </div>
            <p className="text-sm text-sage font-nunito leading-relaxed">
              Making waste management intelligent, gentle, and effortless for everyone in Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[180px]">
            <h3 className="text-moss font-bold mb-4 font-comfortaa text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sage font-nunito text-sm">
              <li>
                <Link to="/" className="hover:text-moss transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/scanner" className="hover:text-moss transition-colors">
                  AI Scanner
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-moss transition-colors">
                  Recycling Map
                </Link>
              </li>
              <li>
                <Link to="/guide" className="hover:text-moss transition-colors">
                  Segregation Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1 min-w-[180px]">
            <h3 className="text-moss font-bold mb-4 font-comfortaa text-lg">Resources</h3>
            <ul className="space-y-2 text-sage font-nunito text-sm">
              <li>
                <a href="#" className="hover:text-moss transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-moss transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-moss transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-moss transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-moss font-bold mb-4 font-comfortaa text-lg">Contact Us</h3>
            <ul className="space-y-2 text-sage font-nunito text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-soft" />
                <span>Sylhet, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-soft" />
                <span>info@ecosort.bd</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-soft" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-sage font-nunito">
          <p>&copy; 2025 EcoSort. All rights reserved.</p>
          <p className="mt-2 text-sage/80">
            Built by A.B.M. Mostakim Niloy, Md. Saminul Amin, Abdul Samad Shanto
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
