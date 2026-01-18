# 🎓 EduManage - Student Management System Frontend

A modern, feature-rich React frontend for managing students and teachers with a beautiful UI powered by Tailwind CSS.

## ✨ Features Implemented

### 🎯 Core Features

#### 1️⃣ **Page Navigation (Routing)**
- ✅ Home page with hero section and feature cards
- ✅ Student list page with grid layout
- ✅ Student detail page with full information
- ✅ Teacher list page with search
- ✅ Teacher detail page with actions
- ✅ Create student/teacher forms
- ✅ Login/authentication page
- ✅ Client-side navigation using React Router

#### 2️⃣ **API Integration**
- ✅ Axios HTTP client with interceptors
- ✅ JWT token authentication
- ✅ GET requests for fetching data
- ✅ POST requests for creating records
- ✅ DELETE requests with confirmation
- ✅ Loading states during API calls
- ✅ Error handling with user feedback

#### 3️⃣ **Reusable Components**
- ✅ `<Card />` - List item display component
- ✅ `<Navbar />` - Navigation bar with routing
- ✅ `<Button />` - Customizable button with variants
- ✅ `<Spinner />` - Loading indicator
- ✅ `<SearchBar />` - Search input component
- ✅ `<Pagination />` - Page navigation
- ✅ `<ConfirmModal />` - Delete confirmation dialog

#### 4️⃣ **State Management**
- ✅ `useState` for form data and UI state
- ✅ `useEffect` for API calls on mount
- ✅ Conditional rendering based on state
- ✅ Search filtering with local state

#### 5️⃣ **Controlled Forms**
- ✅ Input fields bound to state
- ✅ Real-time validation
- ✅ Error messages per field
- ✅ Reset functionality
- ✅ Redirect after successful submit

### ⭐ UX Features

#### 6️⃣ **Loading Indicators**
- ✅ Spinner component with customizable sizes
- ✅ Loading text for context
- ✅ Button loading states
- ✅ Prevents blank screens

#### 7️⃣ **Conditional UI**
- ✅ "Show More / Show Less" toggle on detail pages
- ✅ Buttons displayed based on data availability
- ✅ Empty state messages when no data
- ✅ Dynamic rendering based on search results

#### 8️⃣ **Safe Rendering**
- ✅ Optional chaining (`?.`) throughout
- ✅ Fallback values for undefined data
- ✅ Empty state components
- ✅ Error boundaries with user-friendly messages

#### 9️⃣ **Client-Side Navigation**
- ✅ `<Link>` components instead of `<a>` tags
- ✅ `useNavigate` for programmatic navigation
- ✅ No page reloads, SPA experience
- ✅ Active link highlighting in navbar

### 🔐 CRUD Features

#### 🔟 **Create Item**
- ✅ Form submission with validation
- ✅ POST request to backend
- ✅ Navigate to detail page after success
- ✅ Error handling with user feedback

#### 1️⃣1️⃣ **Read Item**
- ✅ List view with grid layout
- ✅ Detail view with comprehensive info
- ✅ Route parameters (`:id`)
- ✅ Fetch individual item data

#### 1️⃣2️⃣ **Delete Item**
- ✅ Delete button on detail pages
- ✅ Confirmation modal before delete
- ✅ Loading state during deletion
- ✅ Redirect after successful delete

### 🎨 UI / Styling Features

#### 1️⃣3️⃣ **Responsive Design**
- ✅ Mobile-first layout (320px+)
- ✅ Tablet optimizations
- ✅ Desktop grid layouts
- ✅ Flexible navigation bar

#### 1️⃣4️⃣ **Utility-First Styling**
- ✅ Tailwind CSS integration
- ✅ Custom color system (primary, surface, card)
- ✅ Consistent spacing scale
- ✅ Dark theme with glass morphism effects

#### 1️⃣5️⃣ **Icons & Visual Cues**
- ✅ Heroicons integration
- ✅ Action icons (edit, delete, add)
- ✅ Status icons (email, phone, location)
- ✅ Visual separators and borders

### 🧠 Architectural Features

#### 1️⃣6️⃣ **Clean Folder Structure**
```
src/
├── components/       # Reusable UI components
├── pages/           # Route components
│   ├── auth/        # Authentication pages
│   ├── students/    # Student-related pages
│   └── teachers/    # Teacher-related pages
└── services/        # API abstraction layer
```

#### 1️⃣7️⃣ **Proxy Configuration**
- ✅ `/api` proxy to `http://localhost:8080`
- ✅ No hard-coded backend URLs
- ✅ Easy deployment configuration
- ✅ CORS handling

#### 1️⃣8️⃣ **Error Handling**
- ✅ API failure messages
- ✅ Network error handling
- ✅ 401 redirect to login
- ✅ Graceful fallback UI

### 🚀 Advanced Features

#### 1️⃣9️⃣ **Search / Filter**
- ✅ Real-time search input
- ✅ Filter by name, email, ID
- ✅ Case-insensitive matching
- ✅ Reset to page 1 on search

#### 2️⃣0️⃣ **Pagination**
- ✅ Client-side pagination
- ✅ Customizable items per page
- ✅ Previous/Next navigation
- ✅ Page counter display

#### 2️⃣1️⃣ **Confirmation Modals**
- ✅ Delete confirmation dialog
- ✅ Loading state in modal
- ✅ Backdrop with blur effect
- ✅ Keyboard accessibility

#### 2️⃣2️⃣ **Environment Config**
- ✅ Vite proxy configuration
- ✅ API abstraction layer
- ✅ Token management
- ✅ Development vs production setup

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 22.x or higher
- Backend running on `http://localhost:8080`
- npm or yarn package manager

### Quick Start
```bash
# 1. Navigate to project directory
cd "c:\Users\nithi\Desktop\StudentManagement -front-end\my-react-app"

# 2. Install dependencies (already done)
npm install

# 3. Start development server
npm run dev
# Opens at http://localhost:5173

# 4. Start backend
# In another terminal, start your Spring Boot backend on port 8080
```

---

## 🚀 Commands

### Development
```bash
npm run dev       # Start dev server with HMR
```

### Production
```bash
npm run build     # Create optimized build in /dist
npm run preview   # Preview production build locally
```

### Code Quality
```bash
npm run lint      # Run ESLint
```

---

## 🗂️ Project Structure

```
my-react-app/
├── public/                         # Static assets
├── src/
│   ├── assets/                    # Images, fonts
│   ├── components/                # Reusable components
│   │   ├── Button.jsx             # Customizable button
│   │   ├── Card.jsx               # List item card
│   │   ├── ConfirmModal.jsx       # Delete confirmation
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── Pagination.jsx         # Page navigation
│   │   ├── SearchBar.jsx          # Search input
│   │   └── Spinner.jsx            # Loading indicator
│   ├── pages/                     # Route pages
│   │   ├── Home.jsx               # Landing page
│   │   ├── auth/
│   │   │   └── Login.jsx          # Login form
│   │   ├── students/
│   │   │   ├── StudentList.jsx    # Students grid
│   │   │   ├── StudentDetail.jsx  # Student info
│   │   │   └── CreateStudent.jsx  # Create form
│   │   └── teachers/
│   │       ├── TeacherList.jsx    # Teachers grid
│   │       ├── TeacherDetail.jsx  # Teacher info
│   │       └── CreateTeacher.jsx  # Create form
│   ├── services/
│   │   └── api.js                 # API abstraction
│   ├── App.jsx                    # Main app + routes
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global Tailwind styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite + API proxy
├── tailwind.config.js             # Tailwind theme
├── postcss.config.js              # PostCSS config
└── eslint.config.js               # ESLint rules
```

---

## 🔌 API Integration

### Proxy Configuration
- **Base URL**: `/api` → `http://localhost:8080`
- **Configured in**: `vite.config.js`
- **Benefit**: No CORS issues, easy deployment

### Authentication
```javascript
// Token stored in localStorage
// Automatically attached to all requests via Axios interceptors
// On 401 error → redirect to /login
```

### Endpoints

#### Students
```http
GET    /api/students           # Fetch all students
GET    /api/students/:id       # Get student by ID
POST   /api/students           # Create new student
DELETE /api/students/:id       # Delete student
```

#### Teachers
```http
GET    /api/teachers           # Fetch all teachers
GET    /api/teachers/:id       # Get teacher by ID
POST   /api/teachers           # Create new teacher
DELETE /api/teachers/:id       # Delete teacher
```

#### Authentication
```http
POST   /api/login              # User login (returns JWT)
```

---

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#0f766e` | CTAs, highlights |
| Surface | `#0b1726` | Background |
| Card | `#0f1f33` | Component bg |
| Border | `#22344d` | Dividers |

### Typography
- **Display**: Manrope (headings)
- **Body**: Inter (text)
- **Size Scale**: Tailwind defaults + custom

### Effects
- **Glass Morphism**: Semi-transparent cards
- **Animations**: 300ms transitions
- **Shadows**: Soft blur effects
- **Focus States**: Ring highlights

### Responsive Breakpoints
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2 | UI library |
| React Router | 7.1 | Client-side routing |
| Axios | 1.7 | HTTP client |
| Tailwind CSS | 3.4 | Utility CSS |
| Heroicons | 2.2 | SVG icons |
| Vite | 7.2 | Build tool |
| clsx | 2.1 | Class utilities |

---

## 🔐 Authentication Flow

```
User Input
    ↓
POST /api/login
    ↓
Backend returns JWT
    ↓
Store token in localStorage
    ↓
Attach token to requests
    ↓
If 401 → Logout & Redirect to /login
```

---

## 📱 Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Hamburger menu (can be added)
- Full-width inputs
- Stacked buttons

### Tablet (641px - 1024px)
- 2-column grid for cards
- Sidebar space available
- Touch-friendly spacing

### Desktop (> 1024px)
- 3-column grid
- Full navigation
- Optimized spacing

---

## 🚦 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Backend
```bash
# In your Spring Boot project
# Run on port 8080
```

### Step 3: Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### Step 4: Test Login
- Navigate to `http://localhost:5173/login`
- Use credentials (adjust based on your backend):
  - Email: `admin@example.com`
  - Password: `password123`

---

## 📝 Example: Adding a New Feature

### 1. Create API Function
```javascript
// src/services/api.js
export const getNewData = () => api.get('/new-endpoint');
```

### 2. Create Page Component
```javascript
// src/pages/NewPage.jsx
import { useEffect, useState } from 'react';
import { getNewData } from '../services/api';

export default function NewPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await getNewData();
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  // JSX...
}
```

### 3. Add Route
```javascript
// src/App.jsx
<Route path="/new" element={<NewPage />} />
```

### 4. Update Navigation
```javascript
// src/components/Navbar.jsx
{ to: '/new', label: 'New', icon: NewIcon }
```

---

## 🐛 Troubleshooting

### Issue: API returns 401 (Unauthorized)
**Solution**: Check JWT token in `localStorage`
```javascript
console.log(localStorage.getItem('token'));
```

### Issue: CORS errors
**Solution**: Ensure Vite proxy is configured in `vite.config.js`

### Issue: Styles not applying
**Solution**: Run `npm install` and check `tailwind.config.js`

### Issue: Components not loading
**Solution**: Check import paths and file naming

---

## 🎯 Feature Checklist

- [x] Single Page Application (SPA)
- [x] JWT authentication
- [x] CRUD operations
- [x] Search & filter
- [x] Pagination
- [x] Form validation
- [x] Loading indicators
- [x] Error handling
- [x] Responsive design
- [x] Glass morphism UI
- [x] Dark theme
- [x] Component library
- [x] API abstraction
- [x] Proxy configuration

---

## 📄 File Descriptions

### Components

| Component | Purpose |
|-----------|---------|
| `Button.jsx` | Reusable button with variants (primary, secondary, danger, ghost) |
| `Card.jsx` | List item card with tags and actions |
| `Navbar.jsx` | Top navigation with links and auth |
| `Spinner.jsx` | Loading indicator with size options |
| `SearchBar.jsx` | Search input with icon |
| `Pagination.jsx` | Previous/Next page navigation |
| `ConfirmModal.jsx` | Delete confirmation dialog |

### Pages

| Page | Purpose |
|------|---------|
| `Home.jsx` | Landing page with features |
| `Login.jsx` | Authentication form |
| `StudentList.jsx` | Grid of students + search |
| `StudentDetail.jsx` | Student info + delete |
| `CreateStudent.jsx` | Student creation form |
| `TeacherList.jsx` | Grid of teachers + search |
| `TeacherDetail.jsx` | Teacher info + delete |
| `CreateTeacher.jsx` | Teacher creation form |

### Services

| File | Purpose |
|------|---------|
| `api.js` | Axios setup + endpoint functions |

---

## 🔗 Links

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios](https://axios-http.com)
- [Vite](https://vite.dev)
- [Heroicons](https://heroicons.com)

---

## 📄 License

Part of Student Management System project.

---

## 🎉 Summary

This frontend provides a complete, production-ready student management interface with:
- Modern React architecture
- Beautiful Tailwind CSS styling
- Comprehensive CRUD operations
- Smooth user experience
- Professional error handling
- Responsive design for all devices

**Happy coding! 🚀**

---

**Built with ❤️ using React + Vite + Tailwind CSS**
