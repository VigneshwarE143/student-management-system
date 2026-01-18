import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { isTokenValid } from "./services/api";
import Login from "./pages/auth/Login";
import StudentList from "./pages/students/StudentList";
import StudentDetail from "./pages/students/StudentDetail";
import CreateStudent from "./pages/students/CreateStudent";
import EditStudent from "./pages/students/EditStudent";
import TeacherList from "./pages/teachers/TeacherList";
import TeacherDetail from "./pages/teachers/TeacherDetail";
import CreateTeacher from "./pages/teachers/CreateTeacher";
import EditTeacher from "./pages/teachers/EditTeacher";
import AdminList from "./pages/admins/AdminList";
import CreateAdmin from "./pages/admins/CreateAdmin";
import AdminDetail from "./pages/admins/AdminDetail";
import EditAdmin from "./pages/admins/EditAdmin";

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity on app load and navigation
    const checkAuth = () => {
      const publicPaths = ["/login"];
      const currentPath = window.location.pathname;

      if (!publicPaths.includes(currentPath) && !isTokenValid()) {
        navigate("/login");
      }
    };

    checkAuth();
    // Check token validity periodically (every minute)
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Student Routes */}
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />

        {/* Teacher Routes */}
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teachers/create" element={<CreateTeacher />} />
        <Route path="/teachers/:id/edit" element={<EditTeacher />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />

        {/* Admin Routes (ADMIN only) */}
        <Route path="/admins" element={<AdminList />} />
        <Route path="/admins/create" element={<CreateAdmin />} />
        <Route path="/admins/:id/edit" element={<EditAdmin />} />
        <Route path="/admins/:id" element={<AdminDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
