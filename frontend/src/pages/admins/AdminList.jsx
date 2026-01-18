import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import SearchBar from "../../components/SearchBar";
import ConfirmModal from "../../components/ConfirmModal";
import {
  getAdmins,
  deleteAdmin,
  getStoredToken,
  extractList,
} from "../../services/api";

export default function AdminList() {
  const navigate = useNavigate();
  const role =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole") ||
    "";
  const token = getStoredToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "ADMIN") navigate("/");
  }, [role, token, navigate]);

  const [admins, setAdmins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const computeLimit = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 8; // 4 columns -> 4x2
      if (width >= 1024) return 6; // 3 columns -> 3x2
      if (width >= 640) return 4; // 2 columns -> 2x2
      return 2; // 1 column -> 2x1
    };
    const update = () => setLimit(computeLimit());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const result = admins.filter(
      (a) =>
        a.name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q),
    );
    setFiltered(result);
  }, [searchQuery, admins]);

  const fetchAdmins = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdmins({ page: 0, size: 1000 });
      const list = extractList(res.data);
      setAdmins(list);
      setFiltered(list);
    } catch (err) {
      const errorMessage =
        err.response?.status === 403
          ? "Access denied. Please log in to view admins."
          : err.response?.data?.message || "Failed to load admins";
      setError(errorMessage);
      setAdmins([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => setConfirm({ open: true, id });
  const handleDelete = async () => {
    try {
      await deleteAdmin(confirm.id);
      setConfirm({ open: false, id: null });
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete admin");
    }
  };

  const visible = viewAll ? filtered : filtered.slice(0, limit);

  if (loading) return <Spinner text="Loading admins..." />;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Admins
            </h1>
            <p className="text-gray-400">
              Showing {visible.length} of {filtered.length}
            </p>
          </div>
          <Link to="/admins/create">
            <Button icon={<PlusIcon className="h-5 w-5" />}>
              Create Admin
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search admins by name or email"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        <div className="grid-auto-fit">
          {visible.map((a) => (
            <Card
              key={a.id}
              title={a.name || "Unknown"}
              subtitle={a.email}
              tags={[
                {
                  label: "Admin",
                  icon: <UserGroupIcon className="h-3.5 w-3.5" />,
                },
              ]}
            >
              <div className="flex gap-3 mt-4">
                <Button
                  variant="secondary"
                  icon={<PencilSquareIcon className="h-5 w-5" />}
                  onClick={() => navigate(`/admins/${a.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  icon={<TrashIcon className="h-5 w-5" />}
                  onClick={() => confirmDelete(a.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length > limit && (
          <div className="flex justify-center mt-6">
            <Button variant="ghost" onClick={() => setViewAll(!viewAll)}>
              {viewAll ? "Show Less" : "View All"}
            </Button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirm.open}
        onClose={() => setConfirm({ open: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Admin"
        message="Are you sure you want to delete this admin?"
      />
    </div>
  );
}
