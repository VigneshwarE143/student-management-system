import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "../../components/Button";
import { createStudent } from "../../services/api";

export default function CreateStudent() {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for this field
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

    setLoading(true);
    setError("");

    try {
      const response = await createStudent(formData);
      // Backend returns ApiResponse with data wrapped in 'data' property
      const createdId = response.data?.data?.id || response.data?.id;
      if (createdId) {
        navigate(`/students/${createdId}`, { replace: true });
      } else {
        navigate("/students", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      studentId: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      enrollmentDate: "",
    });
    setValidationErrors({});
    setError("");
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          to="/students"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Students
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-white mb-2">
            Add New Student
          </h1>
          <p className="text-gray-400">
            Fill in the details to create a student record
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
        >
          {/* Error Alert */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Fields */}
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

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              fullWidth
              loading={loading}
              icon={<CheckIcon className="h-5 w-5" />}
            >
              Create Student
            </Button>
            <Button type="button" variant="ghost" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
