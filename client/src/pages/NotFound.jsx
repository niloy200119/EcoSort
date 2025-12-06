import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, SearchX, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-ultra rounded-3xl p-12 border-2 border-[#2E6F40]/30"
        >
          {/* Sad Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200 
            }}
            className="mb-8"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="inline-block"
            >
              <div className="relative">
                {/* Sad Face */}
                <div className="w-32 h-32 mx-auto bg-[#2E6F40]/20 rounded-full flex items-center justify-center border-4 border-[#2E6F40]/40">
                  {/* Eyes */}
                  <div className="flex gap-6 mb-4">
                    <motion.div 
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="w-3 h-3 bg-[#2E6F40] rounded-full"
                    />
                    <motion.div 
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="w-3 h-3 bg-[#2E6F40] rounded-full"
                    />
                  </div>
                </div>
                {/* Sad Mouth */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <path 
                      d="M 5 15 Q 20 5 35 15" 
                      stroke="#2E6F40" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                {/* Tear */}
                <motion.div
                  animate={{ 
                    y: [0, 20, 20],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute top-16 left-8 w-2 h-3 bg-blue-400 rounded-full"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* 404 Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-8xl font-bold text-[#2E6F40] mb-4">404</h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <SearchX className="w-6 h-6 text-[#2E6F40]" />
              <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
            </div>
            <p className="text-gray-200 text-lg mb-8">
              Oops! The page you're looking for seems to have been recycled. 
              Let's get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 bg-[#2E6F40] text-white rounded-xl hover:bg-[#245a33] transition-all shadow-lg hover:shadow-[#2E6F40]/50 font-semibold"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-[#2E6F40]/20 text-white rounded-xl hover:bg-[#2E6F40]/30 transition-all border border-[#2E6F40]/40 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-8 border-t border-[#2E6F40]/20"
          >
            <p className="text-gray-300 text-sm mb-3">Quick Links:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/scanner" className="text-[#2E6F40] hover:text-white text-sm font-medium transition-colors">
                Scanner
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/map" className="text-[#2E6F40] hover:text-white text-sm font-medium transition-colors">
                Map
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/guide" className="text-[#2E6F40] hover:text-white text-sm font-medium transition-colors">
                Guide
              </Link>
              <span className="text-gray-400">•</span>
              <Link to="/login" className="text-[#2E6F40] hover:text-white text-sm font-medium transition-colors">
                Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
