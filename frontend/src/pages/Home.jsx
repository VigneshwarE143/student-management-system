import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button";

export default function Home() {
  const role =
    localStorage.getItem("userRole") ||
    sessionStorage.getItem("userRole") ||
    "";
  const features = [
    {
      icon: AcademicCapIcon,
      title: "Student Management",
      description: "Manage student records, enrollments, and academic progress",
      to: "/students",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: UserGroupIcon,
      title: "Teacher Management",
      description: "Handle teacher profiles, assignments, and schedules",
      to: "/teachers",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: ChartBarIcon,
      title: "Analytics & Reports",
      description: "View comprehensive analytics and generate reports",
      to: "#",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const showAdmins = role === "ADMIN";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary-400 to-emerald-400 bg-clip-text text-transparent">
              EduManage
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A comprehensive student management system designed to streamline
            administrative tasks and enhance educational workflows.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/students">
              <Button size="lg" icon={<AcademicCapIcon className="h-6 w-6" />}>
                View Students
              </Button>
            </Link>
            <Link to="/teachers">
              <Button
                variant="secondary"
                size="lg"
                icon={<UserGroupIcon className="h-6 w-6" />}
              >
                View Teachers
              </Button>
            </Link>
            {showAdmins && (
              <Link to="/admins">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<UserGroupIcon className="h-6 w-6" />}
                >
                  View Admins
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.to}
                className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} mb-5`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-primary-400 font-medium">
                  <span>Learn more</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">
                500+
              </div>
              <div className="text-gray-400">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Teachers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                20+
              </div>
              <div className="text-gray-400">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
