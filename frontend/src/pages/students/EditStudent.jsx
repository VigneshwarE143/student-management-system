import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { getStudentById, updateStudent } from "../../services/api";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    enrollmentDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getStudentById(id);
      const studentData = response.data?.data || response.data;
      setFormData({
        name: studentData.name || "",
        studentId: studentData.studentId || "",
        email: studentData.email || "",
        phone: studentData.phone || "",
        address: studentData.address || "",
        department: studentData.department || "",
        enrollmentDate: studentData.enrollmentDate || "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: "" });
    }
    setError("");
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = "Name is required";
    if (!formData.studentId?.trim())
      errors.studentId = "Student ID is required";
    if (!formData.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.department?.trim())
      errors.department = "Department is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError("");

    try {
      await updateStudent(id, formData);
      navigate(`/students/${id}`, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update student. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "studentId", label: "Student ID", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Phone Number", type: "tel", required: false },
    { name: "address", label: "Address", type: "text", required: false },
    { name: "department", label: "Department", type: "text", required: true },
    {
      name: "enrollmentDate",
      label: "Enrollment Date",
      type: "date",
      required: false,
    },
  ];

  if (loading) return <Spinner text="Loading student details..." />;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to={`/students/${id}`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Student Details
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Edit Student
          </h1>
          <p className="text-gray-400">Update student information</p>
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

          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all ${
                  validationErrors[field.name]
                    ? "ring-2 ring-red-500 focus:ring-red-400"
                    : "focus:ring-2 focus:ring-primary-400"
                }`}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              {validationErrors[field.name] && (
                <p className="mt-1 text-sm text-red-400">
                  {validationErrors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              fullWidth
              loading={submitting}
              icon={<CheckIcon className="h-5 w-5" />}
            >
              Update Student
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/students/${id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
