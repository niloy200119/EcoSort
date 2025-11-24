import { motion } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';

// Generate particle data outside component to satisfy React purity rules
const generateParticles = () => [...Array(25)].map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 15 + Math.random() * 10,
  size: 12 + Math.random() * 16,
  type: Math.random() > 0.7 ? 'sparkle' : 'leaf'
}));

const generateFireflies = () => [...Array(10)].map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  xMove: Math.random() * 40 - 20,
  yMove: Math.random() * 40 - 20,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 3
}));

const PARTICLES = generateParticles();
const FIREFLIES = generateFireflies();

const AmbientParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: '-50px',
          }}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, 30, -20, 40, 0],
            opacity: [0, 0.4, 0.6, 0.4, 0],
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        >
          {particle.type === 'sparkle' ? (
            <Sparkles 
              className="text-emerald-300" 
              style={{ width: particle.size, height: particle.size }}
            />
          ) : (
            <Leaf 
              className="text-mint" 
              style={{ width: particle.size, height: particle.size }}
            />
          )}
        </motion.div>
      ))}
      
      {/* Fireflies - Ambient Glow Points */}
      {FIREFLIES.map((firefly) => (
        <motion.div
          key={`firefly-${firefly.id}`}
          className="absolute w-2 h-2 rounded-full bg-lime-glow shadow-lg"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            boxShadow: '0 0 10px rgba(132, 204, 22, 0.6)'
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
            x: [0, firefly.xMove],
            y: [0, firefly.yMove],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            delay: firefly.delay,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;