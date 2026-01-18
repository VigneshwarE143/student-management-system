import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { getAdminById } from "../../services/api";

export default function AdminDetail() {
  const navigate = useNavigate();
  const role =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole") ||
    "";
  useEffect(() => {
    if (role !== "ADMIN") navigate("/");
  }, [role, navigate]);

  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch();
  }, [id]);

  const fetch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminById(id);
      const data = res.data?.data || res.data;
      setAdmin(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner text="Loading admin..." />;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto glass rounded-2xl p-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}
        {admin && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  {admin.name}
                </h2>
                <p className="text-gray-400">{admin.email}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
