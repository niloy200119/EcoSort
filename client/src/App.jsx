import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarNew from './components/NavbarNew';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import ScanResult from './pages/ScanResult';
import Map from './pages/Map';
import Guide from './pages/Guide';
import DashboardNew from './pages/DashboardEnhanced';
import LoginNew from './pages/LoginNew';
import RegisterNew from './pages/RegisterNew';
import AdminDashboard from './pages/AdminDashboard';

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
            <Route path="/guide" element={<Guide />} />
            <Route path="/dashboard" element={
              <ProtectedRoute requireRole="citizen">
                <DashboardNew />
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
      </div>
    </Router>
  );
}

export default App;
