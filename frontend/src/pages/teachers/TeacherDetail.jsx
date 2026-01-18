import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  TrashIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";
import { getTeacherById, deleteTeacher } from "../../services/api";

export default function TeacherDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getTeacherById(id);
      // Backend returns ApiResponse with data wrapped in 'data' property
      const teacherData = response.data?.data || response.data;
      setTeacher(teacherData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load teacher details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteTeacher(id);
      navigate("/teachers", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete teacher");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Spinner text="Loading teacher details..." />;

  if (error && !teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <div className="text-red-400 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/teachers">
            <Button variant="secondary">Back to Teachers</Button>
          </Link>
        </div>
      </div>
    );
  }

  const infoItems = [
    { icon: EnvelopeIcon, label: "Email", value: teacher?.email },
    { icon: PhoneIcon, label: "Phone", value: teacher?.phone },
    { icon: MapPinIcon, label: "Address", value: teacher?.address },
    { icon: BriefcaseIcon, label: "Department", value: teacher?.department },
    { icon: AcademicCapIcon, label: "Subject", value: teacher?.subject },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/teachers"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Teachers
        </Link>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        <div className="glass rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-800">
            <div>
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                {teacher?.name || "Unknown Teacher"}
              </h1>
              <p className="text-gray-400">
                {teacher?.subject || "No Subject"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={<PencilIcon className="h-4 w-4" />}
                onClick={() => navigate(`/teachers/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<TrashIcon className="h-4 w-4" />}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {infoItems
              .filter((item) => item.value)
              .slice(0, showMore ? undefined : 3)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
                  >
                    <Icon className="h-6 w-6 text-primary-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-400 mb-1">
                        {item.label}
                      </div>
                      <div className="text-white font-medium break-words">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {infoItems.filter((item) => item.value).length > 3 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-6 flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors mx-auto"
            >
              {showMore ? (
                <>
                  Show Less <ChevronUpIcon className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More <ChevronDownIcon className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${teacher?.name}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
}
