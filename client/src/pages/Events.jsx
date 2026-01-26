import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Filter, Plus, Clock, Search, CheckCircle } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import axios from 'axios';

export default function Events() {
  const { isAuthenticated, role, token, user } = useAuthStore();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_EVENTS}`);
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || event.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-light/20 to-teal-light/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold font-comfortaa text-emerald-900 mb-2">Community Events</h1>
            <p className="text-emerald-700">Join cleanup drives, workshops, and more!</p>
          </div>
          
          {isAuthenticated && (
            <Link 
              to="/events/create" 
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Organize Event</span>
            </Link>
          )}
        </div>

        {/* Filters & Search */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-emerald-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-emerald-50 border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-all text-emerald-800 placeholder-emerald-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['all', 'cleanup', 'workshop', 'seminar', 'rally'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
                  filter === type 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-2">No events found</h3>
            <p className="text-emerald-600">Try adjusting your filters or organize one yourself!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event, user }) {
  const date = new Date(event.date);
  const isJoined = user && event.participants.includes(user.id || user._id);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border ${isJoined ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-50'} group`}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-white opacity-50" />
            </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-800 uppercase tracking-wide">
            {event.type}
            </div>
            {isJoined && (
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Joined
                </div>
            )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-emerald-50 rounded-lg p-2 text-center min-w-[60px]">
            <span className="block text-sm font-bold text-emerald-500 uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
            <span className="block text-2xl font-bold text-emerald-900">{date.getDate()}</span>
          </div>
          <div className="text-right">
             {event.pointsRequired > 0 && (
                <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-1">
                    ★ {event.pointsRequired} Points Req
                </span>
             )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-2 text-emerald-500" />
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="w-4 h-4 mr-2 text-emerald-500" />
            <span>{event.participants.length} / {event.capacity} joined</span>
          </div>
        </div>

        <Link 
          to={`/events/${event._id}`}
          className="block w-full text-center py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
