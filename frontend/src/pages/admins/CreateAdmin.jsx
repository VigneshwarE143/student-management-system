import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { createAdmin } from "../../services/api";

export default function CreateAdmin() {
  const navigate = useNavigate();
  const role =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole") ||
    "";
  useEffect(() => {
    if (role !== "ADMIN") navigate("/");
  }, [role, navigate]);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await createAdmin(form);
      setSuccess("Admin created successfully");
      setTimeout(() => navigate("/admins"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-600">
              <UserPlusIcon className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="font-display text-4xl font-bold text-white mb-2">
            Create Admin
          </h2>
          <p className="text-gray-400">Add a new administrator</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4 text-emerald-400 text-sm">
              {success}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
          </div>

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Create Admin
          </Button>
        </form>
      </div>
    </div>
  );
}
