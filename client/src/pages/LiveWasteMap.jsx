import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Phone, Clock, Truck, MapPinned, Loader, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function LiveWasteMap() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [liveVehicles, setLiveVehicles] = useState([]);
  const mapRef = useRef(null);

  // Mock recycling centers data with real coordinates
  const recyclingCenters = [
    {
      id: 1,
      name: 'Dhaka Central Recycling Center',
      address: 'Tejgaon, Dhaka',
      category: 'general',
      phone: '+880 1XXX-111111',
      hours: '9 AM - 6 PM',
      accepts: ['Plastic', 'Paper', 'Metal', 'Glass'],
      lat: 23.7639,
      lng: 90.3889
    },
    {
      id: 2,
      name: 'E-Waste Collection Point',
      address: 'Gulshan, Dhaka',
      category: 'ewaste',
      phone: '+880 1XXX-222222',
      hours: '10 AM - 5 PM',
      accepts: ['Electronics', 'Batteries', 'Cables'],
      lat: 23.7805,
      lng: 90.4160
    },
    {
      id: 3,
      name: 'Community Compost Center',
      address: 'Dhanmondi, Dhaka',
      category: 'compost',
      phone: '+880 1XXX-333333',
      hours: '8 AM - 4 PM',
      accepts: ['Food Waste', 'Garden Waste', 'Organic Materials'],
      lat: 23.7461,
      lng: 90.3742
    },
    {
      id: 4,
      name: 'Plastic Recycling Hub',
      address: 'Mirpur, Dhaka',
      category: 'plastic',
      phone: '+880 1XXX-444444',
      hours: '9 AM - 7 PM',
      accepts: ['PET Bottles', 'HDPE', 'PP', 'Plastic Bags'],
      lat: 23.8223,
      lng: 90.3654
    },
    {
      id: 5,
      name: 'Metal Scrap Yard',
      address: 'Uttara, Dhaka',
      category: 'metal',
      phone: '+880 1XXX-555555',
      hours: '8 AM - 6 PM',
      accepts: ['Aluminum', 'Steel', 'Copper', 'Iron'],
      lat: 23.8759,
      lng: 90.3795
    }
  ];

  // Simulate live waste collection vehicles
  useEffect(() => {
    const mockVehicles = [
      { id: 'V1', name: 'Truck DHK-1234', lat: 23.7506, lng: 90.3756, status: 'collecting', zone: 'Zone 1' },
      { id: 'V2', name: 'Truck DHK-5678', lat: 23.7689, lng: 90.3912, status: 'in-transit', zone: 'Zone 2' },
      { id: 'V3', name: 'Truck DHK-9012', lat: 23.8103, lng: 90.4125, status: 'collecting', zone: 'Zone 3' },
      { id: 'V4', name: 'Truck DHK-3456', lat: 23.8456, lng: 90.3598, status: 'returning', zone: 'Zone 4' },
    ];
    
    setLiveVehicles(mockVehicles);

    // Simulate vehicle movement every 5 seconds
    const interval = setInterval(() => {
      setLiveVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        lat: vehicle.lat + (Math.random() - 0.5) * 0.002,
        lng: vehicle.lng + (Math.random() - 0.5) * 0.002
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get user's current location
  const getUserLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setLoadingLocation(false);
          
          // Reverse geocoding using OpenCage API
          if (OPENCAGE_API_KEY && OPENCAGE_API_KEY !== 'your_opencage_geocoding_api_key_here') {
            reverseGeocode(location.lat, location.lng);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoadingLocation(false);
          // Default to Dhaka center if geolocation fails
          setUserLocation({ lat: 23.8103, lng: 90.4125 });
        }
      );
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
      );
      if (response.data.results && response.data.results.length > 0) {
        console.log('Location:', response.data.results[0].formatted);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  const categories = [
    { id: 'all', label: 'All Centers', color: 'emerald' },
    { id: 'general', label: 'General', color: 'blue' },
    { id: 'ewaste', label: 'E-Waste', color: 'purple' },
    { id: 'compost', label: 'Compost', color: 'green' },
    { id: 'plastic', label: 'Plastic', color: 'amber' },
    { id: 'metal', label: 'Metal', color: 'gray' }
  ];

  const filteredCenters = selectedCategory === 'all' 
    ? recyclingCenters 
    : recyclingCenters.filter(c => c.category === selectedCategory);

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat?.color || 'emerald';
  };

  const getVehicleIcon = (status) => {
    const colors = {
      'collecting': '#10b981',
      'in-transit': '#3b82f6',
      'returning': '#f59e0b'
    };
    
    return L.divIcon({
      html: `<div style="background: ${colors[status] || '#10b981'}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
          <path d="M15 18H9"></path>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
          <circle cx="17" cy="18" r="2"></circle>
          <circle cx="7" cy="18" r="2"></circle>
        </svg>
      </div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const getCenterIcon = (category) => {
    const color = getCategoryColor(category);
    const colorMap = {
      emerald: '#10b981',
      blue: '#3b82f6',
      purple: '#a855f7',
      green: '#22c55e',
      amber: '#f59e0b',
      gray: '#6b7280'
    };

    return L.divIcon({
      html: `<div style="background: ${colorMap[color]}; width: 40px; height: 40px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>`,
      className: '',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-ultra rounded-3xl p-8 border-2 border-emerald-300/30"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-emerald-50 mb-2 flex items-center gap-3">
                <MapPinned className="w-10 h-10 text-emerald-400" />
                Live Waste Map
              </h1>
              <p className="text-emerald-200">Track waste collection vehicles and find recycling centers in real-time</p>
            </div>
            <button
              onClick={getUserLocation}
              disabled={loadingLocation}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg disabled:opacity-50"
            >
              {loadingLocation ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Navigation className="w-5 h-5" />
              )}
              {loadingLocation ? 'Locating...' : 'My Location'}
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="glass-soft rounded-2xl p-4 border border-emerald-300/20">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? `bg-${cat.color}-600 text-white shadow-lg`
                    : 'bg-emerald-900/30 text-emerald-200 hover:bg-emerald-800/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="glass-ultra rounded-2xl overflow-hidden border-2 border-emerald-300/30" style={{ height: '600px' }}>
              {GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here' ? (
                <MapContainer
                  center={userLocation || [23.8103, 90.4125]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Recycling Centers */}
                  {filteredCenters.map((center) => (
                    <Marker
                      key={center.id}
                      position={[center.lat, center.lng]}
                      icon={getCenterIcon(center.category)}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-lg mb-2">{center.name}</h3>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {center.address}
                            </p>
                            <p className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {center.phone}
                            </p>
                            <p className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {center.hours}
                            </p>
                            <div className="mt-2">
                              <p className="font-semibold">Accepts:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {center.accepts.map((item, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Live Vehicles */}
                  {liveVehicles.map((vehicle) => (
                    <Marker
                      key={vehicle.id}
                      position={[vehicle.lat, vehicle.lng]}
                      icon={getVehicleIcon(vehicle.status)}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold">{vehicle.name}</h3>
                          <p className="text-sm">Status: <span className="font-semibold">{vehicle.status}</span></p>
                          <p className="text-sm">Zone: {vehicle.zone}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* User Location */}
                  {userLocation && (
                    <>
                      <Marker position={[userLocation.lat, userLocation.lng]}>
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold">You are here</h3>
                          </div>
                        </Popup>
                      </Marker>
                      <Circle
                        center={[userLocation.lat, userLocation.lng]}
                        radius={500}
                        pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1 }}
                      />
                    </>
                  )}
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-full bg-emerald-900/20">
                  <div className="text-center p-8">
                    <AlertCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-emerald-100 mb-2">Map API Not Configured</h3>
                    <p className="text-emerald-300 text-sm">
                      Add your Google Maps API key to .env file to enable live map
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Vehicles Sidebar */}
          <div className="space-y-4">
            <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
              <h3 className="text-xl font-bold text-emerald-50 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Live Vehicles
              </h3>
              <div className="space-y-3">
                {liveVehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-emerald-900/30 rounded-xl border border-emerald-700/30"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="w-5 h-5 text-emerald-400" />
                      <div className="flex-1">
                        <div className="font-semibold text-emerald-100">{vehicle.name}</div>
                        <div className="text-xs text-emerald-300">{vehicle.zone}</div>
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded inline-block ${
                      vehicle.status === 'collecting' ? 'bg-green-500/20 text-green-300' :
                      vehicle.status === 'in-transit' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {vehicle.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* API Info */}
            <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
              <h3 className="text-lg font-bold text-emerald-50 mb-3">🔑 API Integrations</h3>
              <div className="space-y-2 text-sm text-emerald-200">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${GOOGLE_MAPS_API_KEY !== 'your_google_maps_api_key_here' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span>Google Maps API</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${OPENCAGE_API_KEY !== 'your_opencage_geocoding_api_key_here' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span>OpenCage Geocoding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span>Live Vehicle Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centers List */}
        <div className="glass-ultra rounded-2xl p-6 border border-emerald-300/20">
          <h3 className="text-xl font-bold text-emerald-50 mb-4">
            Recycling Centers ({filteredCenters.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCenters.map((center) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-emerald-900/30 rounded-xl border border-emerald-700/30 hover:bg-emerald-800/40 transition-all"
              >
                <h4 className="font-bold text-emerald-100 mb-2">{center.name}</h4>
                <div className="space-y-2 text-sm text-emerald-300">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {center.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {center.hours}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {center.accepts.map((item, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-emerald-600/30 text-emerald-200 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
