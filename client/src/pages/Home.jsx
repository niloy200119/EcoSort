import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Map, Book, Award, Recycle, MapPin } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "AI Waste Scanner",
      description: "Instantly identify waste items and get disposal instructions"
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Recycling Map",
      description: "Find nearby recycling centers and drop-off points"
    },
    {
      icon: <Book className="w-8 h-8" />,
      title: "Segregation Guide",
      description: "Comprehensive database of waste disposal methods"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Impact Points",
      description: "Earn rewards for your eco-friendly actions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <Recycle className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary">EcoSort</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your intelligent companion for waste management in Bangladesh. 
              Make recycling simple with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/scanner">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-dark transition-colors shadow-lg"
                >
                  Start Scanning
                </motion.button>
              </Link>
              <Link to="/guide">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Browse Guide
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-green-50 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Make an Impact Today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of users in Bangladesh who are making their cities cleaner 
              and greener, one scan at a time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-primary mb-2">10K+</p>
                <p className="text-gray-700">Items Scanned</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-gray-700">Active Users</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-lg">
                <p className="text-4xl font-bold text-primary mb-2">50+</p>
                <p className="text-gray-700">Recycling Centers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Eco Journey?
          </h2>
          <p className="text-xl mb-8">
            Sign up now and start making a difference in your community.
          </p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Get Started Free
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
