import axios from 'axios';

// Token validation utilities
export const getStoredToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const isTokenValid = () => {
  const token = getStoredToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check if token has expired (exp is in seconds, Date.now() is in milliseconds)
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      clearAuth();
      return false;
    }
    return true;
  } catch (error) {
    clearAuth();
    return false;
  }
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userRole');
  sessionStorage.removeItem('userEmail');
};

// Response list normalization
export const extractList = (payload) => {
  const root = payload?.data ?? payload;
  if (Array.isArray(root)) return root;
  if (Array.isArray(root?.content)) return root.content;
  if (Array.isArray(root?.items)) return root.items;
  if (Array.isArray(root?.results)) return root.results;
  if (Array.isArray(root?.students)) return root.students;
  if (Array.isArray(root?.teachers)) return root.teachers;
  if (Array.isArray(root?.admins)) return root.admins;
  return [];
};

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT token
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    
    // If we have a token, validate it before using
    if (token) {
      if (!isTokenValid()) {
        // Token is expired, clear it and reject
        return Promise.reject(new Error('Token expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ========== AUTH ==========
// Note: backend exposes admin login at /api/admins/login; fall back if the route is singular
export const login = async (credentials) => {
  try {
    return await api.post('/admins/login', credentials);
  } catch (err) {
    if (err.response?.status === 404) {
      return api.post('/admin/login', credentials);
    }
    throw err;
  }
};
export const teacherLogin = (credentials) => api.post('/teachers/login', credentials);
export const logout = () => {
  clearAuth();
};

// ========== STUDENTS ==========
export const getStudents = (params) => api.get('/students', { params });
export const searchStudents = (name, params) =>
  api.get('/students/search', { params: { name, ...params } });
export const getStudentById = (id) => api.get(`/students/${id}`);
export const createStudent = (data) => api.post('/students', data);
export const updateStudent = (id, data) => api.put(`/students/${id}`, data);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const assignTeacherToStudent = (studentId, teacherId) =>
  api.put(`/students/${studentId}/teacher/${teacherId}`);
export const removeTeacherFromStudent = (studentId) =>
  api.delete(`/students/${studentId}/teacher`);

// ========== TEACHERS ==========
export const getTeachers = (params) => api.get('/teachers', { params });
export const searchTeachers = (name, params) =>
  api.get('/teachers/search', { params: { name, ...params } });
export const getTeacherById = (id) => api.get(`/teachers/${id}`);
export const createTeacher = (data) => api.post('/teachers', data);
export const updateTeacher = (id, data) => api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id) => api.delete(`/teachers/${id}`);

// ========== ADMINS (optional) ==========
export const getAdmins = (params) => api.get('/admins', { params });
export const getAdminById = (id) => api.get(`/admins/${id}`);
export const createAdmin = (data) => api.post('/admins', data);
export const updateAdmin = (id, data) => api.put(`/admins/${id}`, data);
export const deleteAdmin = (id) => api.delete(`/admins/${id}`);

export default api;
