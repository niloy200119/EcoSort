import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarNew from './components/NavbarNew';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AIChatbot from './components/AIChatbot';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import ScanResult from './pages/ScanResult';
import Map from './pages/Map';
import LiveWasteMap from './pages/LiveWasteMap';
import Guide from './pages/Guide';
import DashboardNew from './pages/DashboardEnhanced';
import LoginNew from './pages/LoginNew';
import RegisterNew from './pages/RegisterNew';
import AdminDashboard from './pages/AdminDashboard';
import WasteManagerDashboard from './pages/WasteManagerDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavbarNew />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/scan-result" element={<ScanResult />} />
            <Route path="/map" element={<Map />} />
            <Route path="/live-map" element={<LiveWasteMap />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/dashboard" element={
              <ProtectedRoute requireRole="citizen">
                <DashboardNew />
              </ProtectedRoute>
            } />
            <Route path="/waste-manager/dashboard" element={
              <ProtectedRoute requireRole="waste-manager">
                <WasteManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requireRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginNew />} />
            <Route path="/register" element={<RegisterNew />} />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
