import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Share2, MessageCircle, Send, Award, ArrowLeft } from 'lucide-react';
import useAuthStore from '../store/authStore';
import { API_CONFIG, API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchEventDetails();
    fetchPosts();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_EVENT_DETAILS(id)}`);
      setEvent(response.data.data);
    } catch (error) {
      toast.error('Failed to load event details');
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.GET_EVENT_POSTS(id)}`);
      setPosts(response.data.data);
    } catch (error) {
      console.error('Failed to load posts', error);
    }
  };

  const handleJoin = async () => {
    if (!isAuthenticated) return navigate('/login');
    
    setJoining(true);
    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.JOIN_EVENT(id)}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Application submitted successfully!');
      fetchEventDetails(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join event');
    } finally {
      setJoining(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.CREATE_EVENT_POST(id)}`,
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost('');
      fetchPosts();
      toast.success('Posted!');
    } catch (error) {
      toast.error('Failed to post message');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!event) return null;

  const date = new Date(event.date);
  const isPast = new Date() > date;
  const isFull = event.participants.length >= event.capacity;
  const hasJoined = event.participants.some(p => p._id === user?._id); // Note: this depends on populate
  // Actually, participants in event model are ObjectIds. However, in getById I populated name.
  // Wait, I only populated name in controller: .populate("participants", "name");
  // So p is { _id, name }.
  // Let's check safely. 
  const hasActuallyJoined = user && event.participants.some(p => p._id === user._id || p === user._id);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/events')} className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Events
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl mb-10">
            <div className="h-64 sm:h-96 md:h-[500px] relative">
                {event.image ? (
                    <img src={event.image} className="w-full h-full object-cover" alt="Event" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center">
                        <Calendar className="w-32 h-32 text-white/30" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                     <span className="inline-block px-3 py-1 bg-emerald-500 text-white rounded-full text-sm font-bold w-fit mb-3 uppercase tracking-wider">
                        {event.type}
                     </span>
                     <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
                     <div className="flex flex-wrap items-center text-gray-200 mt-2 gap-4 md:gap-8">
                        <div className="flex items-center"><Calendar className="w-5 h-5 mr-2" />{date.toDateString()}</div>
                        <div className="flex items-center"><Clock className="w-5 h-5 mr-2" />{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        <div className="flex items-center"><MapPin className="w-5 h-5 mr-2" />{event.location}</div>
                     </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-2/3 border-r border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">About this Event</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                    </div>

                    {/* Community Forum Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                            <MessageCircle className="w-6 h-6 mr-2 text-emerald-500" />
                            Community Discussion
                        </h3>
                        
                        {isAuthenticated ? (
                            <form onSubmit={handlePost} className="mb-8">
                                <div className="relative">
                                    <textarea
                                        value={newPost}
                                        onChange={(e) => setNewPost(e.target.value)}
                                        placeholder="Ask a question or start a discussion..."
                                        className="w-full p-4 pr-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none h-24"
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!newPost.trim()}
                                        className="absolute bottom-3 right-3 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-500 mb-8">
                                <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log in</Link> to join the discussion
                            </div>
                        )}

                        <div className="space-y-6">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div key={post._id} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold">
                                            {post.user?.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-800">{post.user?.name || 'Unknown'}</span>
                                                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-600">{post.content}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center italic">No posts yet. Be the first!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="p-8 md:w-1/3 bg-gray-50/50">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 sticky top-24">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Organizer</h3>
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold mr-3">
                                    {event.organizer?.name?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{event.organizer?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{event.organizer?.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                             <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Capacity</span>
                                <span className="font-bold text-gray-800">{event.capacity} People</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Spots Left</span>
                                <span className="font-bold text-emerald-600">{Math.max(0, event.capacity - event.participants.length)}</span>
                             </div>
                             <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">Points Req</span>
                                <span className="font-bold text-amber-600">{event.pointsRequired}</span>
                             </div>
                        </div>

                        {!isAuthenticated ? (
                             <button onClick={() => navigate('/login')} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold font-comfortaa hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-200">
                                Login to Join
                            </button>
                        ) : hasActuallyJoined ? (
                            <div className="w-full py-3 bg-green-100 text-green-700 rounded-xl font-bold font-comfortaa text-center flex items-center justify-center">
                                <Award className="w-5 h-5 mr-2" />
                                You are attending
                            </div>
                        ) : isPast ? (
                            <button disabled className="w-full py-3 bg-gray-300 text-gray-500 rounded-xl font-bold font-comfortaa cursor-not-allowed">
                                Event Ended
                            </button>
                        ) : isFull ? (
                            <button disabled className="w-full py-3 bg-red-100 text-red-500 rounded-xl font-bold font-comfortaa cursor-not-allowed">
                                Event is Full
                            </button>
                        ) : (
                            <button 
                                onClick={handleJoin} 
                                disabled={joining || user.points < event.pointsRequired}
                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold font-comfortaa hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {joining ? 'Joining...' : 'Join Event'}
                            </button>
                        )}
                        
                        {isAuthenticated && user.points < event.pointsRequired && !hasActuallyJoined && (
                            <p className="text-xs text-red-500 mt-2 text-center">
                                You need {event.pointsRequired - user.points} more points to join.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
