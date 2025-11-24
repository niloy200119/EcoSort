import { useState } from 'react';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock recycling centers data
  const recyclingCenters = [
    {
      id: 1,
      name: 'Sylhet Central Recycling Center',
      address: 'Zindabazar, Sylhet',
      category: 'general',
      phone: '+880 1XXX-111111',
      hours: '9 AM - 6 PM',
      accepts: ['Plastic', 'Paper', 'Metal', 'Glass'],
      lat: 24.8949,
      lng: 91.8687
    },
    {
      id: 2,
      name: 'E-Waste Collection Point',
      address: 'Ambarkhana, Sylhet',
      category: 'ewaste',
      phone: '+880 1XXX-222222',
      hours: '10 AM - 5 PM',
      accepts: ['Electronics', 'Batteries', 'Cables'],
      lat: 24.8998,
      lng: 91.8714
    },
    {
      id: 3,
      name: 'Community Compost Center',
      address: 'Upashahar, Sylhet',
      category: 'compost',
      phone: '+880 1XXX-333333',
      hours: '8 AM - 4 PM',
      accepts: ['Food Waste', 'Garden Waste', 'Organic Materials'],
      lat: 24.9045,
      lng: 91.8611
    },
    {
      id: 4,
      name: 'Plastic Recycling Hub',
      address: 'Chowhatta, Sylhet',
      category: 'plastic',
      phone: '+880 1XXX-444444',
      hours: '9 AM - 7 PM',
      accepts: ['PET Bottles', 'HDPE', 'PP', 'Plastic Bags'],
      lat: 24.8867,
      lng: 91.8756
    }
  ];

  const categories = [
    { value: 'all', label: 'All Centers' },
    { value: 'general', label: 'General Recycling' },
    { value: 'ewaste', label: 'E-Waste' },
    { value: 'compost', label: 'Compost' },
    { value: 'plastic', label: 'Plastic' }
  ];

  const filteredCenters = selectedCategory === 'all'
    ? recyclingCenters
    : recyclingCenters.filter(center => center.category === selectedCategory);

  const openInMaps = (lat, lng, name) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-emerald-mist/40 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-comfortaa gradient-text-emerald">
            Recycling Centers Map
          </h1>
          <p className="text-xl text-sage font-nunito">
            Find the nearest recycling facilities in Sylhet
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-quicksand font-semibold transition-all focus:outline-none focus:ring-0 ${
                  selectedCategory === category.value
                    ? 'glass-mint text-moss'
                    : 'glass-soft text-sage hover:bg-emerald-mist/30'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="glass-ultra rounded-3xl overflow-hidden mb-8">
          <div className="h-96 bg-linear-to-br from-emerald-mist/50 to-mint/40 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-lime-glow mx-auto mb-4 animate-float-soft" />
              <p className="text-xl font-semibold text-moss font-comfortaa">Interactive Map</p>
              <p className="text-sage mt-2 font-nunito">Map integration coming soon!</p>
              <p className="text-sage/70 mt-1 text-sm font-nunito">(For demo: showing list view below)</p>
            </div>
            {/* Mock map pins */}
            {filteredCenters.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute bg-lime-glow rounded-full w-4 h-4 border-2 border-emerald-mist/80 shadow-lg animate-glow-pulse"
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${30 + index * 10}%`
                }}
              />
            ))}
          </div>
        </div>

        {/* Centers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCenters.map((center, index) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-ultra rounded-3xl p-6 hover:scale-105 transition-transform animate-breathe"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-moss mb-2 font-comfortaa">
                    {center.name}
                  </h3>
                  <p className="text-sage flex items-center gap-2 font-nunito">
                    <MapPin className="w-4 h-4" />
                    {center.address}
                  </p>
                </div>
                <span className="glass-mint text-moss px-3 py-1 rounded-full text-sm font-quicksand font-semibold">
                  {center.category}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sage flex items-center gap-2 font-nunito">
                  <Phone className="w-4 h-4 text-primary" />
                  {center.phone}
                </p>
                <p className="text-sage flex items-center gap-2 font-nunito">
                  <Clock className="w-4 h-4 text-primary" />
                  {center.hours}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-moss mb-2 font-comfortaa">Accepts:</p>
                <div className="flex flex-wrap gap-2">
                  {center.accepts.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-mist/50 text-moss px-3 py-1 rounded-full text-sm font-nunito"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => openInMaps(center.lat, center.lng, center.name)}
                className="w-full glass-mint text-moss px-4 py-3 rounded-full font-quicksand font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 focus:outline-none focus:ring-0"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>
            </motion.div>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No recycling centers found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
