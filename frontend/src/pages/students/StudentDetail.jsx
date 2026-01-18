import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  TrashIcon,
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import ConfirmModal from "../../components/ConfirmModal";
import {
  getStudentById,
  deleteStudent,
  getTeachers,
  extractList,
  assignTeacherToStudent,
  removeTeacherFromStudent,
} from "../../services/api";

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving] = useState(false);

  const formatDate = (value) => {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString();
  };

  useEffect(() => {
    fetchStudent();
    fetchTeachers();
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getStudentById(id);
      // Backend returns ApiResponse with data wrapped in 'data' property
      const studentData = response.data?.data || response.data;
      setStudent(studentData);
      setSelectedTeacherId(
        studentData?.teacherId ? String(studentData.teacherId) : "",
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers({ page: 0, size: 1000 });
      const list = extractList(response.data);
      setTeachers(list);
    } catch (err) {
      setTeachers([]);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteStudent(id);
      navigate("/students", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student");
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacherId) return;
    setAssigning(true);
    setError("");
    try {
      const response = await assignTeacherToStudent(id, selectedTeacherId);
      const updated = response.data?.data || response.data;
      setStudent(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign teacher");
    } finally {
      setAssigning(false);
    }
  };

  const handleRemoveTeacher = async () => {
    setRemoving(true);
    setError("");
    try {
      const response = await removeTeacherFromStudent(id);
      const updated = response.data?.data || response.data;
      setStudent(updated);
      setSelectedTeacherId("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove teacher");
    } finally {
      setRemoving(false);
    }
  };

  if (loading) return <Spinner text="Loading student details..." />;

  if (error && !student) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <div className="text-red-400 mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link to="/students">
            <Button variant="secondary">Back to Students</Button>
          </Link>
        </div>
      </div>
    );
  }

  const teacherDisplay =
    student?.teacherName ||
    (student?.teacherId ? `Teacher #${student.teacherId}` : null);

  const infoItems = [
    { icon: EnvelopeIcon, label: "Email", value: student?.email },
    { icon: PhoneIcon, label: "Phone", value: student?.phone },
    { icon: MapPinIcon, label: "Address", value: student?.address },
    { icon: AcademicCapIcon, label: "Department", value: student?.department },
    {
      icon: CalendarIcon,
      label: "Enrollment Date",
      value: formatDate(student?.enrollmentDate),
    },
    { icon: AcademicCapIcon, label: "Age", value: student?.age },
    { icon: AcademicCapIcon, label: "Grade", value: student?.grade },
    { icon: AcademicCapIcon, label: "Teacher", value: teacherDisplay },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Students
        </Link>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6">
            {error}
          </div>
        )}

        {/* Student Card */}
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-800">
            <div>
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                {student?.name || "Unknown Student"}
              </h1>
              <p className="text-gray-400">
                Student ID: {student?.studentId || "N/A"}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={<PencilIcon className="h-4 w-4" />}
                onClick={() => navigate(`/students/${id}/edit`)}
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

          {/* Info Grid */}
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

          {/* Teacher Assignment */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Assign Teacher
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full sm:w-80 px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">Select a teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name || "Unknown"}
                    {t.subject ? ` • ${t.subject}` : ""}
                  </option>
                ))}
              </select>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAssignTeacher}
                  loading={assigning}
                  disabled={!selectedTeacherId}
                >
                  Assign
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveTeacher}
                  loading={removing}
                  disabled={!student?.teacherId}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>

          {/* Show More Button */}
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Student"
        message={`Are you sure you want to delete ${student?.name}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  );
}
