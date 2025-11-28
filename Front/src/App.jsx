import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

// Pages
import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";
import About from "@/pages/public/About";
import NotFound from "@/pages/public/NotFound";

import InternshipList from "@/pages/dashboard/intern/InternshipList"; 
import MyApplications from "@/pages/dashboard/intern/MyApplications";
import ManageOffers from "@/pages/dashboard/admin/ManageOffers";
import ManageApplications from "@/pages/dashboard/admin/ManageApplications";
import ManageUsers from "@/pages/dashboard/admin/ManageUsers";
import MyInterns from "@/pages/dashboard/supervisor/MyInterns";
import Workshops from "@/pages/dashboard/supervisor/Workshops";
import ProfileSettings from "@/pages/dashboard/shared/ProfileSettings";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import QuizBuilder from "@/pages/dashboard/admin/QuizBuilder";
import TakeQuiz from "@/pages/dashboard/intern/TakeQuiz";
import PublicWorkshops from "@/pages/public/PublicWorkshops";
import ForgotPassword from "@/pages/public/ForgotPassword";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        
        {/* === PUBLIC LAYOUT (Navbar + Footer) === */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/internships" element={<InternshipList />} /> {/* Reusing list for public browsing */}
          <Route path="/workshops" element={<PublicWorkshops />} />
        </Route>

        {/* === AUTH PAGES (No Layout) === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* === DASHBOARD (Sidebar Layout) === */}
        <Route element={<ProtectedRoute />}>
           <Route path="/dashboard" element={<DashboardLayout />}>
             <Route index element={<DashboardHome />} />
             
             {/* Shared / Intern */}
             <Route path="internships" element={<InternshipList />} />
             <Route path="applications" element={<MyApplications />} />
             <Route path="profile" element={<ProfileSettings />} />
             <Route path="quiz/:offerId" element={<TakeQuiz />} />

             {/* Admin */}
             <Route path="admin/offers" element={<ManageOffers />} />
             <Route path="admin/offers/:offerId/quiz" element={<QuizBuilder />} />
             <Route path="admin/applications" element={<ManageApplications />} />  
             <Route path="admin/users" element={<ManageUsers />} />

             {/* Supervisor */}
             <Route path="supervisor/interns" element={<MyInterns />} />
             <Route path="supervisor/workshops" element={<Workshops />} />
           </Route>
        </Route>

        {/* === 404 CATCH ALL === */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;