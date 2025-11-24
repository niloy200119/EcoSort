import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Map, Book, Award, Recycle, Sparkles, Leaf, TreePine, Zap } from 'lucide-react';
import AmbientParticles from '../components/AmbientParticles';

const Home = () => {
  const features = [
    {
      icon: <Camera className="w-10 h-10" />,
      title: "AI Waste Scanner",
      description: "Instantly identify waste items with our advanced AI technology",
      gradient: "from-emerald-soft to-mint",
      animation: "scan-beam"
    },
    {
      icon: <Map className="w-10 h-10" />,
      title: "Recycling Map",
      description: "Find nearby recycling centers and drop-off points in real-time",
      gradient: "from-mint to-lime-glow",
      animation: "pulse"
    },
    {
      icon: <Book className="w-10 h-10" />,
      title: "Segregation Guide",
      description: "Comprehensive database of waste disposal methods and tips",
      gradient: "from-lime-glow to-emerald-soft",
      animation: "expand"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Impact Points",
      description: "Earn rewards and track your environmental contribution",
      gradient: "from-mint to-emerald-300",
      animation: "grow"
    }
  ];

  const journeySteps = [
    { step: 1, title: "Scan Waste", icon: <Camera className="w-8 h-8" />, desc: "Take a photo of your waste item" },
    { step: 2, title: "Get Classification", icon: <Sparkles className="w-8 h-8" />, desc: "AI identifies and categorizes it" },
    { step: 3, title: "Find Disposal", icon: <Map className="w-8 h-8" />, desc: "Locate nearest recycling facility" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AmbientParticles />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="z-10"
            >
              <motion.div 
                className="inline-block mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Recycle className="w-16 h-16 text-emerald-soft animate-glow-pulse" />
              </motion.div>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight font-comfortaa animate-breathe">
                Welcome to <br />
                <span className="gradient-text-emerald">EcoSort</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-sage mb-8 leading-relaxed font-nunito">
                Your intelligent companion for waste management in <span className="font-semibold gradient-text-lime">Bangladesh</span>.
                Make recycling simple with AI-powered guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/scanner">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group relative px-8 py-4 glass-ultra rounded-full text-lg font-bold font-quicksand overflow-hidden focus:outline-none focus:ring-0"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Camera className="w-6 h-6 group-hover:animate-float-soft" />
                      Scan Waste with AI
                      <Sparkles className="w-5 h-5 animate-sparkle-burst" />
                    </span>
                  </motion.button>
                </Link>
                
                <Link to="/guide">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="px-8 py-4 glass-soft rounded-full text-lg font-bold font-quicksand border border-mint/20"
                  >
                    <span className="flex items-center gap-2">
                      <Book className="w-6 h-6" />
                      Explore Guide
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              <div className="relative glass-mint rounded-4xl p-8 shadow-2xl animate-breathe">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-10 right-10 text-emerald-soft opacity-20"
                >
                  <Recycle className="w-32 h-32" />
                </motion.div>
                
                <div className="relative z-10 flex flex-col items-center justify-center py-12">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <TreePine className="w-40 h-40 text-lime-glow mb-6 animate-sprout" />
                  </motion.div>
                  <p className="text-2xl font-bold gradient-text-emerald text-center font-comfortaa">
                    Making Sylhet Greener
                  </p>
                  <p className="text-sage text-center mt-2 font-nunito">
                    One scan at a time 🌿
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 font-comfortaa">
              <span className="gradient-text-emerald">Powerful Features</span>
            </h2>
            <p className="text-xl text-sage font-nunito">Everything you need for smart waste management</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative glass-mint p-8 rounded-4xl cursor-pointer overflow-hidden animate-breathe"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                {/* Animated icon container */}
                <motion.div 
                  className="mb-6 text-lime-glow relative z-10"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3 text-moss relative z-10 font-comfortaa">
                  {feature.title}
                </h3>
                <p className="text-sage relative z-10 leading-relaxed font-nunito">
                  {feature.description}
                </p>

                {/* Tree sprout animation on hover */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ y: 20 }}
                  whileHover={{ y: -10 }}
                >
                  <TreePine className="w-8 h-8 text-emerald-soft animate-sprout" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-20 opacity-5 animate-float-soft">
          <Recycle className="w-64 h-64 text-emerald-soft" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 font-comfortaa">
              How It <span className="gradient-text-lime">Works</span>
            </h2>
            <p className="text-xl text-sage font-nunito">Three simple steps to make a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-soft rounded-4xl p-8 text-center hover:scale-105 transition-all duration-500 animate-breathe" style={{ animationDelay: `${index * 0.3}s` }}>
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-emerald-soft to-mint rounded-full flex items-center justify-center font-bold text-xl shadow-lg font-quicksand gradient-text-emerald"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="inline-block mb-6 text-lime-glow"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {step.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 text-moss font-comfortaa">{step.title}</h3>
                  <p className="text-sage font-nunito">{step.desc}</p>

                  {/* Growing tree animation */}
                  <motion.div
                    className="mt-6"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <TreePine className="w-8 h-8 text-emerald-soft mx-auto animate-sprout" />
                  </motion.div>
                </div>

                {/* Connector arrow */}
                {index < journeySteps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Zap className="w-8 h-8 text-lime-glow animate-glow-pulse" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 font-comfortaa">
              <span className="gradient-text-emerald">Community Impact</span>
            </h2>
            <p className="text-xl text-sage font-nunito">
              Join thousands making Bangladesh greener
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "10K+", label: "Items Scanned", icon: <Camera className="w-8 h-8" /> },
              { value: "500+", label: "Active Users", icon: <Award className="w-8 h-8" /> },
              { value: "50+", label: "Recycling Centers", icon: <Map className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-mint rounded-4xl p-8 text-center animate-breathe"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <motion.div
                  className="inline-block mb-4 text-lime-glow"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-5xl font-bold gradient-text-lime mb-2 font-comfortaa">{stat.value}</p>
                <p className="text-sage text-lg font-nunito">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="glass-ultra rounded-4xl p-12"
          >
            <Leaf className="w-16 h-16 mx-auto mb-6 text-emerald-soft animate-leaf-drift" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6 font-comfortaa gradient-text-emerald animate-breathe">
              Ready to Start Your Eco Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-sage font-nunito leading-relaxed">
              Join our community and make Sylhet greener, one scan at a time
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-10 py-5 glass-mint rounded-full text-xl font-bold font-quicksand shadow-2xl inline-flex items-center gap-3"
              >
                <Sparkles className="w-6 h-6 animate-sparkle-burst" />
                Get Started Free
                <TreePine className="w-6 h-6 animate-sprout" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
