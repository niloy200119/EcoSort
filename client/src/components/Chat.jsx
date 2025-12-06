import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, Users, Shield } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function Chat({ chatWith = 'citizens' }) {
  const { user, role } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock messages for demonstration
  useEffect(() => {
    const mockMessages = chatWith === 'citizens' ? [
      { id: 1, sender: 'Citizen Ahmed', message: 'When is the next collection in Zone 3?', time: '10:30 AM', type: 'received' },
      { id: 2, sender: 'You', message: 'Collection is scheduled for tomorrow at 8:00 AM', time: '10:32 AM', type: 'sent' },
      { id: 3, sender: 'Citizen Rahman', message: 'Can I schedule a special pickup for e-waste?', time: '11:15 AM', type: 'received' },
    ] : [
      { id: 1, sender: 'Admin Officer', message: 'Please submit weekly collection report', time: '9:00 AM', type: 'received' },
      { id: 2, sender: 'You', message: 'Report submitted. Zone 3 completed 95% of scheduled routes', time: '9:15 AM', type: 'sent' },
      { id: 3, sender: 'Admin Officer', message: 'Great work! Any issues to report?', time: '9:20 AM', type: 'received' },
    ];
    
    setMessages(mockMessages);
  }, [chatWith]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'You',
      message: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'sent'
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        sender: chatWith === 'citizens' ? 'Citizen' : 'Admin Officer',
        message: 'Thank you for your response!',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'received'
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const chatIcon = chatWith === 'citizens' ? Users : Shield;
  const ChatIcon = chatIcon;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-2xl hover:bg-emerald-700 transition-all hover:scale-110 z-40"
      >
        <MessageCircle className="w-6 h-6" />
        {messages.filter(m => m.type === 'received').length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {messages.filter(m => m.type === 'received').length}
          </span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass-ultra rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-emerald-200/30"
          >
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ChatIcon className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">
                    {chatWith === 'citizens' ? 'Citizens Chat' : 'Admin Chat'}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {messages.filter(m => m.type === 'received').length} unread
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-emerald-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl p-3 ${
                      msg.type === 'sent'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {msg.type === 'received' && (
                      <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'sent' ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white/80 rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
