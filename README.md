# EcoSort - Intelligent Waste Management System

![EcoSort Banner](https://img.shields.io/badge/EcoSort-Green%20Tech-2E6F40?style=for-the-badge)

## 🌱 Project Overview

EcoSort is a comprehensive waste management platform designed to tackle environmental challenges in Bangladesh. The system features AI-powered chatbot assistance, real-time waste vehicle tracking, multi-role authentication (Citizen, Waste Manager, Admin), and location-based services for efficient waste management.

## ✨ Features

### Core Features
- **🤖 AI Chatbot Assistant**: Google Gemini-powered chatbot providing instant waste management guidance and answers
- **🗺️ Live Waste Map**: Real-time tracking of waste collection vehicles with interactive Leaflet maps
- **📍 Recycling Centers Locator**: Find nearby recycling facilities with category filters (plastic, glass, metal, paper, electronics)
- **👥 Multi-Role Authentication**: Role-based access for Citizens, Waste Managers, and Admins
- **📚 Segregation Guide**: Comprehensive searchable database of waste disposal methods
- **📅 Collection Reminders**: Timely alerts for waste collection schedules
- **🏆 Community Impact Points**: Gamified system rewarding eco-friendly actions
- **📊 User Dashboard**: Track personal environmental impact and progress

### User Roles
- **Citizen** (Forest Green Theme): Access to all waste management features and AI assistance
- **Waste Manager** (Ash Gray Theme): Manage waste collection routes and vehicle tracking
- **Admin** (Amber/Orange Theme): System administration and user management

## 🛠️ Technology Stack

### Frontend
- **React 19** with **Vite 7.2.4**
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **React Leaflet + Leaflet** for interactive maps
- **React Toastify** for notifications
- **Zustand** for state management
- **Socket.io Client** for real-time features
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** for database
- **Multer** for file uploads
- **CORS** enabled

### External APIs & Integrations
- **Google Gemini AI**: AI chatbot assistant
- **OpenStreetMap + Leaflet**: Map rendering
- **OpenCage Geocoding**: Address lookup and reverse geocoding
- **OpenWeather API**: Weather data integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- API Keys (see [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) for details)

## 🚀 Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/niloy200119/EcoSort.git
cd EcoSort
\`\`\`

### 2. Install Dependencies

#### Install Server Dependencies
\`\`\`bash
cd server
npm install
\`\`\`

#### Install Client Dependencies
\`\`\`bash
cd ../client
npm install
\`\`\`

### 3. Configure Environment Variables

Create `.env.development` file in the `client` folder:

\`\`\`bash
cd client
\`\`\`

Add the following configuration:

\`\`\`env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000

# Google Gemini AI (Chatbot)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# OpenCage Geocoding API
VITE_OPENCAGE_API_KEY=your_opencage_api_key_here

# OpenWeather API
VITE_WEATHER_API_KEY=your_openweather_api_key_here
\`\`\`

**📖 For detailed API setup instructions, see [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md)**

### 4. Run the Application

#### Start the Backend Server
\`\`\`bash
cd server
npm run dev
\`\`\`
The server will run on `http://localhost:5000`

#### Start the Frontend (in a new terminal)
\`\`\`bash
cd client
npm run dev
\`\`\`
The frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Authentication & User Roles

#### Registration
- Navigate to `/register`
- Choose your role: **Citizen**, **Waste Manager**, or **Admin**
- Fill in the required information:
  - **Email**: Must contain `@` and end with `.com`
  - **NID**: Must be exactly 10 digits
  - **Password**: Minimum 6 characters
  - **Organization** (for Waste Managers and Admins)
- Green toast notifications will alert you of any validation errors

#### Login
- Navigate to `/login`
- Select your role and enter credentials
- Each role has a distinct theme:
  - **Citizen**: Forest Green (#2E6F40)
  - **Admin**: Amber/Orange (#f59e0b)
  - **Waste Manager**: Ash Gray (#6b7280)

### Features by Role

#### All Users (Anonymous) Can:
- Browse the Segregation Guide
- View the recycling facilities map
- Access the 404 error page (try navigating to an invalid route!)

#### Registered Citizens Can:
- Chat with AI Chatbot Assistant (powered by Google Gemini)
- View Live Waste Collection Map with real-time vehicle tracking
- Find nearby recycling centers with category filters
- Save favorite recycling locations
- Set up collection reminders
- Track personal impact points
- View scan history

#### Waste Managers Can:
- Access Waste Manager Dashboard (Ash Gray theme)
- Manage waste collection routes
- Track waste collection vehicles in real-time
- Update collection schedules
- Monitor collection efficiency

#### Admins Can:
- Access Admin Dashboard (Orange theme)
- Manage waste classification database
- Update recycling facility information
- Manage user accounts
- Broadcast announcements
- System configuration and monitoring

## 🎯 Key Pages & Components

### Pages
1. **Home** (`/`) - Landing page with feature overview and role selection
2. **Register** (`/register`) - Multi-role registration with validation
3. **Login** (`/login`) - Role-based authentication
4. **Dashboard** (`/dashboard`) - User statistics and activity tracking
5. **Live Waste Map** (`/map`) - Real-time vehicle tracking and recycling centers
6. **Guide** (`/guide`) - Searchable waste disposal database
7. **Scanner** (`/scanner`) - AI-powered waste identification
8. **Scan Result** (`/scan-result`) - Detailed disposal instructions
9. **Waste Manager Dashboard** (`/waste-manager`) - Ash gray themed manager interface
10. **Admin Dashboard** (`/admin`) - Orange themed admin interface
11. **404 Not Found** (`*`) - Animated error page with sad face and tears

### Components
- **AIChatbot** - Floating chatbot with Google Gemini AI integration (bottom-left, forest green theme)
- **NavbarNew** - Role-aware navigation with theme switching
- **Chat** - Real-time messaging component
- **ThemeProvider** - Dynamic theme switching based on user role

## 🔌 API Endpoints

### Backend Endpoints

- `POST /api/scan` - Upload image for AI classification
- `GET /api/health` - Server health check
- `GET /api/centers` - Get recycling centers
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/users` - Get user list (admin only)

### External API Integration

All external APIs are configured in `client/src/config/api.js`:

\`\`\`javascript
export const EXTERNAL_APIS = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  OPENCAGE_API_KEY: import.meta.env.VITE_OPENCAGE_API_KEY,
  WEATHER_API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
};
\`\`\`

**See [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) for detailed setup instructions.**

## 🎨 Color Scheme & Theming

The application uses a sophisticated role-based theming system:

### Global Theme
- **Background**: Forest Green gradient (`#1a4d2e → #2E6F40 → #1a4d2e`)

### Role-Specific Themes

#### Citizen Theme (Forest Green)
- **Primary**: `#2E6F40` (Forest Green)
- **Accent**: `#1a5a30` (Dark Green)
- **Background**: Transparent (inherits global forest green)
- **Text**: White (`#ffffff`)

#### Admin Theme (Amber/Orange)
- **Primary**: `#f59e0b` (Amber)
- **Accent**: `#d97706` (Dark Amber)
- **Background**: Transparent (inherits global forest green)
- **Text**: White (`#ffffff`)

#### Waste Manager Theme (Ash Gray)
- **Primary**: `#6b7280` (Ash Gray)
- **Accent**: `#4b5563` (Dark Gray)
- **Background**: Gray gradient (`#374151 → #6b7280 → #374151`)
- **Text**: White (`#ffffff`)

### Toast Notifications
- **Color**: Forest Green (`#2E6F40`)
- **Theme**: Dark mode with white text
- **Position**: Top-right
- **Auto-close**: 3 seconds

## 👥 Team Members

- **A.B.M. Mostakim Niloy** - Reg: 2021331088
- **Md. Saminul Amin** - Reg: 2021331014
- **Abdul Samad Shanto** - Reg: 2021331059

## 📄 License

This project is created for academic purposes.

## 🔮 Future Enhancements

- [ ] Real CNN model integration for waste image classification
- [ ] Complete MongoDB database integration with all models
- [ ] JWT-based authentication system
- [ ] Real-time notifications via Socket.io
- [ ] Mobile app version (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (Bengali, English)
- [ ] Community forums and discussions
- [ ] Corporate dashboard for businesses
- [ ] QR code scanning for waste bins
- [ ] Blockchain-based reward system
- [ ] Weather-based collection scheduling
- [ ] Integration with city waste management systems

## ✅ Recently Implemented

- ✅ Google Gemini AI chatbot integration
- ✅ Live waste vehicle tracking with Leaflet maps
- ✅ Multi-role authentication (Citizen, Waste Manager, Admin)
- ✅ Role-based theming system
- ✅ Form validation with toast notifications
- ✅ Email validation (@ and .com required)
- ✅ NID validation (exactly 10 digits)
- ✅ Password validation (minimum 6 characters)
- ✅ Animated 404 error page
- ✅ OpenCage geocoding integration
- ✅ Recycling center locator with category filters
- ✅ Real-time vehicle position updates
- ✅ User geolocation features

## 🔒 Validation Rules

The application enforces strict validation rules for user security:

### Email Validation
- Must contain `@` symbol
- Must end with `.com`
- Pattern: `/^[^\s@]+@[^\s@]+\.com$/`
- Example: `user@example.com` ✅ | `user@example` ❌

### NID Validation
- Must be exactly 10 digits
- No letters or special characters allowed
- Pattern: `/^\d{10}$/`
- Example: `1234567890` ✅ | `123456789` ❌

### Password Validation
- Minimum 6 characters required
- Example: `mypass123` ✅ | `pass` ❌

All validation errors are displayed using **greenish toast notifications** (#2E6F40) in the top-right corner with a 3-second auto-close timer.

## 📞 Contact

For questions or feedback, please reach out to the team members.

---

**Made with 💚 for a cleaner Bangladesh**
