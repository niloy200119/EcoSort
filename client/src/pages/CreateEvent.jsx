import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Award, Image as ImageIcon } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'cleanup',
    capacity: 50,
    pointsRequired: 0,
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time
      const eventDate = new Date(`${formData.date}T${formData.time}`);
      
      const payload = {
        ...formData,
        date: eventDate.toISOString()
      };

      await axios.post(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CREATE_EVENT}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Event created successfully!');
      navigate('/events');
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to create event');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-comfortaa">Organize an Event</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Event Title</label>
            <input 
              type="text" 
              name="title"
              required
              minLength={5}
              maxLength={100}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="e.g., Beach Cleanup Drive 2024"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Type</label>
                <select 
                    name="type" 
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="cleanup">Cleanup Drive</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="rally">Rally</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Location</label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="text" 
                        name="location"
                        required
                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="e.g., Central Park"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Date</label>
                <input 
                    type="date" 
                    name="date"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Time</label>
                <input 
                    type="time" 
                    name="time"
                    required
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.time}
                    onChange={handleChange}
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Description</label>
            <textarea 
              name="description"
              required
              minLength={10}
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              placeholder="Describe what the event is about..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Capacity</label>
                <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="number" 
                        name="capacity"
                        min={1}
                        required
                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.capacity}
                        onChange={handleChange}
                    />
                </div>
             </div>
             
             <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Minimum Points Required</label>
                <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="number" 
                        name="pointsRequired"
                        min={0}
                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        value={formData.pointsRequired}
                        onChange={handleChange}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave 0 if open to everyone</p>
             </div>
          </div>

           <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Cover Image URL (Optional)</label>
                <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        type="url" 
                        name="image"
                        className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
            </div>

          <div className="pt-4 flex gap-4">
             <button 
                type="button" 
                onClick={() => navigate('/events')}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold font-comfortaa hover:bg-gray-200 transition-colors"
            >
                Cancel
            </button>
            <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold font-comfortaa hover:shadow-lg transition-all disabled:opacity-50"
            >
                {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
