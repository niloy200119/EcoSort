# EcoSort Features

## ✅ Completed Features

### Dual-Role System
- **Citizens (Green Theme)**
  - Points tracking with level progression
  - Waste scanning functionality
  - Achievements system
  - Nearby recycling centers
  - Scan history
  - Impact metrics (CO₂ saved, items recycled)
  
- **Admins (Amber/Orange Theme)**
  - Waste collection analytics
  - Municipal performance dashboard
  - Citizen engagement metrics
  - Waste composition charts
  - Alert system
  - Time-range filtering

### Authentication
- NID-based login (Bangladesh format: 10, 13, or 17 digits)
- Role selection (Citizen/Admin)
- Protected routes with role guards
- Persistent sessions (localStorage)
- Theme auto-switch based on role

### Reminder System 🔔
- ✅ **NEW: Alarm-based reminders**
  - Add custom reminders with date & time
  - Browser notification permission
  - Alerts 5 minutes before scheduled time
  - Types: Waste Collection, Compost, General Waste, E-Waste
  - Delete reminders
  - Persistent storage (localStorage)

### UI/UX
- Modern glassmorphism design
- Framer Motion animations
- Responsive layout
- Dynamic theme switching
- Real-time HMR (Hot Module Replacement)

## 🎨 Theme System

### Citizen Theme (Green)
- Primary: Emerald (#10b981)
- Background: Green gradients
- Icon: Recycle symbol

### Admin Theme (Amber/Orange)
- Primary: Amber (#f59e0b)
- Background: Orange gradients
- Icon: Shield symbol

## 🔧 Technical Stack

### Frontend
- React 18 + Vite
- Tailwind CSS v4
- Zustand (state management)
- Framer Motion (animations)
- Recharts (analytics)
- React Router v6
- date-fns

### APIs Used
- Notification API (for reminders)
- localStorage (persistence)

## 📱 Citizen Dashboard Features

### Overview Tab
- Points display with progress bar
- Quick actions (Scanner, Map, Guide, Goals)
- Recent scans
- Impact summary sidebar

### Scans Tab
- Complete scan history
- Item categorization
- Points per scan
- Date tracking

### Achievements Tab
- Unlockable badges
- Progress indicators
- Gamification

### Centers Tab
- Nearby recycling locations
- Distance calculation
- Center types
- Get directions link

## 📊 Admin Dashboard Features

### Analytics
- Waste Collection Trends (Area Chart)
- Waste Composition (Pie Chart)
- Municipal Performance (Bar Chart)
- Citizen Engagement (Line Chart)

### Controls
- Time range selector (7/30/90 days)
- Export functionality
- Alert system with priority levels

## 🚀 Deployment

### Environment Variables
- `VITE_API_BASE_URL`: Backend API endpoint
  - Development: `http://localhost:5000`
  - Production: Your backend URL

### Vercel Configuration
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites configured

## 🔒 Known Issues

### Minor Warnings
- `motion` unused import warning (false positive - used in AnimatePresence)
- Tailwind v4 gradient syntax suggestions (cosmetic)

### Pending Backend Integration
- API endpoints not connected (frontend ready)
- Mock data in use
- Partner handling backend deployment

## 📝 Usage

### For Citizens
1. Register with NID
2. Login and scan waste items
3. Earn points and unlock achievements
4. Set reminders for collection days
5. Find nearby recycling centers

### For Admins
1. Login with admin credentials
2. View municipal analytics
3. Track citizen engagement
4. Monitor waste composition
5. Export reports

## 🎯 Next Steps

1. Connect to backend API
2. Real-time data integration
3. Push notifications (service workers)
4. Mobile app (React Native)
5. QR code scanning functionality
