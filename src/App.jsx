import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import MentorProfile from './pages/MentorProfile';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/mentor/:id" element={<MentorProfile />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
