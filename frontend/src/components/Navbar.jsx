import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { logout } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!(
    localStorage.getItem("token") || sessionStorage.getItem("token")
  );
  const role =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole") ||
    "";
  const email =
    localStorage.getItem("userEmail") ||
    sessionStorage.getItem("userEmail") ||
    "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/students", label: "Students", icon: AcademicCapIcon },
    { to: "/teachers", label: "Teachers", icon: UserGroupIcon },
  ];

  if (role === "ADMIN") {
    navLinks.push({ to: "/admins", label: "Admins", icon: UserGroupIcon });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-display font-bold text-white hover:text-primary-400 transition-colors"
          >
            <AcademicCapIcon className="h-8 w-8 text-primary-400" />
            <span>EduManage</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.to)
                      ? "bg-primary-500/20 text-primary-400"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Profile / Auth */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-200">
                <span className="text-sm font-medium">{email || "User"}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-primary-500/20 text-primary-300">
                  {role || ""}
                </span>
              </div>
            )}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
