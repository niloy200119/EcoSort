import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Sparkles, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm EcoBot 🌱 How can I help you with waste management today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const genAI = useRef(null);

  useEffect(() => {
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      genAI.current = new GoogleGenerativeAI(GEMINI_API_KEY);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (userMessage) => {
    if (!genAI.current) {
      return "AI chatbot is not configured. Please add your Gemini API key to .env file.";
    }

    try {
      const model = genAI.current.getGenerativeModel({ model: "gemini-pro" });
      
      const context = `You are EcoBot, an AI assistant for EcoSort - a waste management and recycling platform. 
      Help users with:
      - Identifying what items are recyclable
      - Finding nearby recycling centers
      - Understanding waste disposal methods
      - Learning about composting
      - E-waste management
      - Environmental impact of waste
      - Waste reduction tips
      
      Be concise, friendly, and environmentally conscious. User question: `;

      const result = await model.generateContent(context + userMessage);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini AI Error:', error);
      return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await getAIResponse(input);

    const botMessage = {
      id: messages.length + 2,
      text: aiResponse,
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const quickActions = [
    "How do I recycle plastic?",
    "What is e-waste?",
    "Find recycling centers near me",
    "How to start composting?"
  ];

  const handleQuickAction = (action) => {
    setInput(action);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 p-4 bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all hover:scale-110 z-40 animate-pulse"
      >
        <Bot className="w-6 h-6" />
        <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
      </button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            className="fixed bottom-24 left-6 w-96 h-[600px] glass-ultra rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-emerald-300/30 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-lime-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-8 h-8" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">EcoBot AI</h3>
                  <p className="text-xs text-emerald-100">Powered by Gemini</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50/50 to-lime-50/30">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white'
                        : 'bg-white/80 text-gray-800 border border-emerald-200'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-600">EcoBot</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2">
                    <Loader className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span className="text-sm text-gray-600">EcoBot is thinking...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-3 bg-emerald-50/50 border-t border-emerald-200/30">
                <p className="text-xs text-gray-600 mb-2 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action)}
                      className="text-xs px-3 py-1.5 bg-white border border-emerald-300 text-emerald-700 rounded-full hover:bg-emerald-50 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-white/90 border-t border-emerald-200/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about waste..."
                  className="flex-1 px-4 py-2 rounded-full border border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-emerald-600 to-lime-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Google Gemini AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
