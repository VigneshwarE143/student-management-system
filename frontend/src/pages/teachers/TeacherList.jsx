import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { getTeachers, searchTeachers, extractList } from "../../services/api";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    const computePageSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 8; // 4 columns -> 4x2
      if (width >= 1024) return 6; // 3 columns -> 3x2
      if (width >= 640) return 4; // 2 columns -> 2x2
      return 2; // 1 column -> 2x1
    };
    const update = () => {
      setItemsPerPage(computePageSize());
      setCurrentPage(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const term = searchQuery.trim();
    const timer = setTimeout(() => {
      if (term) {
        runSearch(term);
      } else {
        setFilteredTeachers(teachers);
        setCurrentPage(1);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, teachers]);

  const fetchTeachers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getTeachers({ page: 0, size: 1000 });
      const teachersData = extractList(response.data);
      setTeachers(teachersData);
      setFilteredTeachers(teachersData);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      const errorMessage =
        err.response?.status === 403
          ? "Access denied. Please log in to view teachers."
          : err.response?.data?.message || "Failed to load teachers";
      setError(errorMessage);
      setTeachers([]);
      setFilteredTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const runSearch = async (term) => {
    try {
      const normalizedTerm = term.toLowerCase();
      const localMatch = teachers.filter((teacher) =>
        teacher.name?.toLowerCase().startsWith(normalizedTerm),
      );
      setFilteredTeachers(localMatch);
      setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed.");
    }
  };

  const totalPages = Math.max(
    1,
    Math.ceil((filteredTeachers?.length || 0) / itemsPerPage),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTeachers = Array.isArray(filteredTeachers)
    ? filteredTeachers.slice(startIndex, startIndex + itemsPerPage)
    : [];

  if (loading) return <Spinner text="Loading teachers..." />;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col min-h-[70vh]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Teachers
            </h1>
            <p className="text-gray-400">
              Showing {filteredTeachers?.length || 0} teacher
              {(filteredTeachers?.length || 0) !== 1 && "s"}
            </p>
          </div>
          <Link to="/teachers/create">
            <Button icon={<PlusIcon className="h-5 w-5" />}>Add Teacher</Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, email, or subject..."
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTeachers.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <UserGroupIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No teachers found
            </h3>
            <p className="text-gray-400 mb-6">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Get started by adding your first teacher"}
            </p>
            {!searchQuery && (
              <Link to="/teachers/create">
                <Button icon={<PlusIcon className="h-5 w-5" />}>
                  Add Teacher
                </Button>
              </Link>
            )}
          </div>
        )}

        <div className="flex flex-col flex-1">
          {/* Teachers Grid */}
          {paginatedTeachers.length > 0 && (
            <>
              <div className="grid-auto-fit">
                {paginatedTeachers.map((teacher) => (
                  <Card
                    key={teacher.id}
                    title={teacher.name || "Unknown"}
                    subtitle={teacher.subject || "No Subject"}
                    actions={
                      <div className="flex items-center gap-2">
                        <Link to={`/teachers/${teacher.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<EyeIcon className="h-4 w-4" />}
                          >
                            View
                          </Button>
                        </Link>
                        <Link to={`/teachers/${teacher.id}/edit`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={<PencilSquareIcon className="h-4 w-4" />}
                          >
                            Edit
                          </Button>
                        </Link>
                      </div>
                    }
                    tags={[
                      {
                        label: teacher.department || "No Department",
                        icon: <BriefcaseIcon className="h-3.5 w-3.5" />,
                      },
                    ]}
                  >
                    <div className="space-y-2 mt-3">
                      {teacher.email && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <EnvelopeIcon className="h-4 w-4" />
                          <span className="text-sm truncate">
                            {teacher.email}
                          </span>
                        </div>
                      )}
                      {teacher.phone && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <PhoneIcon className="h-4 w-4" />
                          <span className="text-sm">{teacher.phone}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
