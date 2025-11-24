import { useState } from 'react';
import { Search, Recycle, Trash2, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Guide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock waste items database
  const wasteItems = [
    {
      id: 1,
      name: 'Plastic Bottles (PET)',
      category: 'plastic',
      disposal: 'Recycle',
      icon: '🍾',
      instructions: 'Rinse the bottle and remove the cap. Place in recycling bin.',
      canRecycle: true
    },
    {
      id: 2,
      name: 'Food Scraps',
      category: 'organic',
      disposal: 'Compost',
      icon: '🥬',
      instructions: 'Add to compost bin or green waste collection.',
      canRecycle: false
    },
    {
      id: 3,
      name: 'Cardboard Boxes',
      category: 'paper',
      disposal: 'Recycle',
      icon: '📦',
      instructions: 'Flatten boxes and place in paper recycling bin.',
      canRecycle: true
    },
    {
      id: 4,
      name: 'Batteries',
      category: 'ewaste',
      disposal: 'Special Collection',
      icon: '🔋',
      instructions: 'Take to designated e-waste collection point. Never throw in regular trash.',
      canRecycle: true
    },
    {
      id: 5,
      name: 'Glass Jars',
      category: 'glass',
      disposal: 'Recycle',
      icon: '🏺',
      instructions: 'Rinse and remove lids. Place in glass recycling bin.',
      canRecycle: true
    },
    {
      id: 6,
      name: 'Pizza Boxes',
      category: 'paper',
      disposal: 'Compost/Trash',
      icon: '🍕',
      instructions: 'Clean parts can be recycled. Greasy parts should be composted or trashed.',
      canRecycle: false
    },
    {
      id: 7,
      name: 'Aluminum Cans',
      category: 'metal',
      disposal: 'Recycle',
      icon: '🥫',
      instructions: 'Rinse and crush. Place in metal recycling bin.',
      canRecycle: true
    },
    {
      id: 8,
      name: 'Old Electronics',
      category: 'ewaste',
      disposal: 'E-Waste Center',
      icon: '📱',
      instructions: 'Take to e-waste collection point. Contains valuable materials.',
      canRecycle: true
    },
    {
      id: 9,
      name: 'Plastic Bags',
      category: 'plastic',
      disposal: 'Special Recycling',
      icon: '🛍️',
      instructions: 'Return to grocery stores with bag recycling programs.',
      canRecycle: true
    },
    {
      id: 10,
      name: 'Newspapers',
      category: 'paper',
      disposal: 'Recycle',
      icon: '📰',
      instructions: 'Keep dry and place in paper recycling bin.',
      canRecycle: true
    },
    {
      id: 11,
      name: 'Styrofoam',
      category: 'plastic',
      disposal: 'Trash',
      icon: '📦',
      instructions: 'Most facilities cannot recycle styrofoam. Dispose in regular trash.',
      canRecycle: false
    },
    {
      id: 12,
      name: 'Garden Waste',
      category: 'organic',
      disposal: 'Compost',
      icon: '🌿',
      instructions: 'Add to compost bin or green waste collection.',
      canRecycle: false
    }
  ];

  const categories = [
    { value: 'all', label: 'All Items', icon: '📋' },
    { value: 'plastic', label: 'Plastic', icon: '♻️' },
    { value: 'paper', label: 'Paper', icon: '📄' },
    { value: 'organic', label: 'Organic', icon: '🌱' },
    { value: 'metal', label: 'Metal', icon: '⚙️' },
    { value: 'glass', label: 'Glass', icon: '🍾' },
    { value: 'ewaste', label: 'E-Waste', icon: '🔌' }
  ];

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDisposalColor = (disposal) => {
    if (disposal.includes('Recycle')) return 'bg-green-100 text-green-800 border-green-500';
    if (disposal.includes('Compost')) return 'bg-green-100 text-green-800 border-green-500';
    if (disposal.includes('Special')) return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    return 'bg-red-100 text-red-800 border-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Waste Segregation Guide
          </h1>
          <p className="text-xl text-gray-600">
            Search our comprehensive database to learn how to dispose of any item
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for an item... (e.g., plastic bottle, batteries)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{item.icon}</div>
                {item.canRecycle ? (
                  <Recycle className="w-6 h-6 text-green-500" />
                ) : (
                  <Trash2 className="w-6 h-6 text-gray-400" />
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.name}
              </h3>

              <div className={`border-2 rounded-lg px-4 py-2 mb-4 text-center font-bold ${getDisposalColor(item.disposal)}`}>
                {item.disposal}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {item.instructions}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500 capitalize">
                  Category: <span className="font-semibold text-primary">{item.category}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No items found matching your search.</p>
            <p className="text-gray-400 mt-2">Try searching for something else or browse all items.</p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-primary/10 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Can't Find What You're Looking For?
          </h3>
          <p className="text-gray-700 mb-4">
            Use our AI Scanner to identify any waste item instantly! Simply take a photo and 
            get immediate disposal instructions.
          </p>
          <a href="/scanner">
            <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-dark transition-colors">
              Try AI Scanner
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Guide;
