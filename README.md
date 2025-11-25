# EcoSort - Intelligent Waste Management System

![EcoSort Banner](https://img.shields.io/badge/EcoSort-Green%20Tech-2E7D32?style=for-the-badge)

## 🌱 Project Overview

EcoSort is an intelligent web application designed to tackle waste management challenges in Bangladesh through AI-powered image recognition and location-based services. It provides clear, actionable guidance on proper waste segregation and disposal.

## ✨ Features

- **🤖 AI Waste Scanner**: Upload photos of waste items for instant identification and disposal instructions
- **🗺️ Recycling Map**: Interactive map showing nearby recycling centers and facilities
- **📚 Segregation Guide**: Comprehensive searchable database of waste disposal methods
- **📅 Collection Reminders**: Timely alerts for waste collection schedules
- **🏆 Community Impact Points**: Gamified system rewarding eco-friendly actions
- **👤 User Dashboard**: Track personal environmental impact and progress

## 🛠️ Technology Stack

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** for database
- **Multer** for file uploads
- **CORS** enabled

### AI Integration
- Mock AI endpoint (simulating CNN-based image classification)
- Ready for integration with TensorFlow/PyTorch models

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

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

### 3. Run the Application

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

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

### Anonymous Users Can:
- Browse the Segregation Guide
- View the recycling facilities map

### Registered Users Can:
- Use the AI Waste Scanner
- Save favorite recycling locations
- Set up collection reminders
- Track personal impact points
- View scan history

### Admin Can:
- Manage waste classification database
- Update recycling facility information
- Manage user accounts
- Broadcast announcements

## 🎯 Key Pages

1. **Home** - Landing page with feature overview
2. **Scanner** - AI-powered waste identification
3. **Scan Result** - Detailed disposal instructions
4. **Map** - Recycling centers location finder
5. **Guide** - Searchable waste disposal database
6. **Dashboard** - User statistics and history
7. **Login/Register** - Authentication pages

## 🔌 API Endpoints

### Current Endpoints

- `POST /api/scan` - Upload image for AI classification
- `GET /api/health` - Server health check
- `GET /api/centers` - Get recycling centers (coming soon)

### Mock AI Response Format

\`\`\`json
{
  "itemType": "Plastic Bottle (PET)",
  "disposalMethod": "Recycle",
  "instructions": "Rinse the bottle thoroughly...",
  "additionalInfo": "PET is highly recyclable...",
  "impact": "Recycling one plastic bottle saves..."
}
\`\`\`

## 🧪 Mock AI Integration

The current implementation uses a "Wizard of Oz" approach for the AI:
- Frontend sends image to backend
- Backend simulates 2-second processing time
- Returns pre-defined mock responses
- **Ready for real AI model integration** - just replace the `/api/scan` endpoint logic

### Future AI Integration
When your CNN model is ready:
1. Deploy the TensorFlow/PyTorch model via Flask/FastAPI
2. Update the `/api/scan` endpoint to call the Python service
3. No frontend changes needed!

## 🎨 Color Scheme

- **Primary**: `#2E7D32` (Green)
- **Secondary**: `#81C784` (Light Green)
- **Dark**: `#1B5E20` (Dark Green)

## 👥 Team Members

- **A.B.M. Mostakim Niloy** - Reg: 2021331088
- **Md. Saminul Amin** - Reg: 2021331014
- **Abdul Samad Shanto** - Reg: 2021331059

## 📄 License

This project is created for academic purposes.

## 🔮 Future Enhancements

- [ ] Real CNN model integration
- [ ] MongoDB database connection
- [ ] User authentication with JWT
- [ ] Real-time notifications
- [ ] Mobile app version
- [ ] Integration with Google Maps API
- [ ] Multi-language support (Bengali)
- [ ] Community forums
- [ ] Corporate dashboard for businesses

## 📞 Contact

For questions or feedback, please reach out to the team members.

---

**Made with 💚 for a cleaner Bangladesh**
