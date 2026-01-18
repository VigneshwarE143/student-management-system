import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import { login, teacherLogin, clearAuth } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState("ADMIN");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Clear any existing auth data first
      clearAuth();

      const response =
        role === "TEACHER"
          ? await teacherLogin(formData)
          : await login(formData);
      // backend wraps payload as { status, message, data: { token }, timestamp }
      const token =
        response.data?.data?.token ||
        response.data?.token ||
        response.data?.jwt;
      if (token) {
        // Security: Use sessionStorage for all users (auto-logout on browser close)
        sessionStorage.setItem("token", token);
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const tokenRole =
            payload.role || payload.authorities || payload.scope || role;
          const email = payload.sub || payload.email || "";
          sessionStorage.setItem("userRole", tokenRole || "");
          sessionStorage.setItem("userEmail", email);

          // Log token expiration time for debugging
          if (payload.exp) {
            const expiresAt = new Date(payload.exp * 1000);
            console.log(`Token expires at: ${expiresAt.toLocaleString()}`);
          }
        } catch {}
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-600">
              <AcademicCapIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Login as
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("ADMIN")}
                className={`px-3 py-2 rounded-lg text-sm ${
                  role === "ADMIN"
                    ? "bg-primary-500/20 text-primary-300"
                    : "glass"
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole("TEACHER")}
                className={`px-3 py-2 rounded-lg text-sm ${
                  role === "TEACHER"
                    ? "bg-primary-500/20 text-primary-300"
                    : "glass"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            icon={<LockClosedIcon className="h-5 w-5" />}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Demo credentials: admin@example.com / password123
        </p>
      </div>
    </div>
  );
}
