# TODO Application - Complete Implementation Guide

## Project Overview
This is a **Full-Stack Task Management Application** built with:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + React Router
- **Authentication**: JWT (JSON Web Tokens)

---

## 📁 Project Structure

```
Ultimate Backend/TODO/
├── backend/
│   ├── index.js          # Main server file with all API routes
│   ├── schema.js         # MongoDB schemas for Task and User
│   ├── db.config.js      # Database connection configuration
│   ├── package.json      # Backend dependencies
│   └── .env              # Environment variables (NEW)
│
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main app component with routing
    │   ├── main.jsx      # React entry point
    │   ├── component/
    │   │   ├── NavBar.jsx        # Navigation (UPDATED - Added logout & user display)
    │   │   ├── Login.jsx         # Login page
    │   │   ├── SignUp.jsx        # Signup page
    │   │   ├── TaskList.jsx      # Display all tasks (IMPROVED - Better error handling)
    │   │   ├── AddTask.jsx       # Create new task (FIXED - Date field naming)
    │   │   └── UpdateTask.jsx    # Edit task
    │   └── style/
    │       ├── NavBar.css        # (UPDATED - Added logout button styles)
    │       ├── addtask.css
    │       ├── App.css
    │       ├── index.css
    │       ├── tasklist.css
    │       └── updateTask.css
    ├── package.json
    └── .env              # Environment variables (NEW)
```

---

## 🔑 Key Features Implemented

### 1. **User Authentication**
- ✅ User Signup with JWT token generation
- ✅ User Login with token validation
- ✅ Token stored in localStorage after login
- ✅ User email displayed in NavBar when logged in
- ✅ Logout functionality to clear session

### 2. **Task Management**
- ✅ Create tasks with title, description, and deadline
- ✅ View all tasks in a table format
- ✅ Update existing tasks
- ✅ Delete individual tasks
- ✅ Bulk delete multiple selected tasks
- ✅ Select/deselect all tasks

### 3. **Security Features**
- ✅ JWT token-based authentication
- ✅ Token stored in cookies (set by backend)
- ✅ Token stored in localStorage (for frontend access)
- ✅ Password comparison for login (currently plain text - see improvements below)

### 4. **User Experience**
- ✅ Clean, responsive UI with modern styling
- ✅ Error handling and user feedback via alerts
- ✅ Navigation between pages using React Router
- ✅ Automatic clearing of old localStorage data to prevent conflicts
- ✅ Conditional rendering (e.g., "Add Task" only visible when logged in)

---

## 🔧 Technologies & Dependencies

### Backend
```json
{
  "express": "^5.2.1",           // Web server framework
  "mongoose": "^9.2.1",          // MongoDB object modeling
  "mongodb": "^7.1.0",           // MongoDB driver
  "jsonwebtoken": "^9.x.x",      // JWT token generation (CHECK VERSION)
  "cors": "^2.8.6",              // Cross-origin requests
  "cookie-parser": "^1.4.7",     // Parse cookies
  "nodemon": "^3.1.11"           // Auto-restart on file changes
}
```

### Frontend
```json
{
  "react": "^18.3.1",                    // UI library
  "react-dom": "^18.3.1",                // React rendering
  "react-router-dom": "^7.13.0",         // Routing between pages
  "vite": "^7.3.1",                      // Build tool
  "eslint": "^9.39.1"                    // Code quality
}
```

---

## 🚀 How to Run the Project

### Backend Setup
```bash
cd backend
npm install
npm run dev  # Starts on http://localhost:4000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

---

## 📚 API Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|-------|
| POST | `/signup` | Register new user | ❌ No |
| POST | `/login` | Login user | ❌ No |
| GET | `/tasks` | Fetch all tasks | ⚠️ (Not enforced yet) |
| POST | `/add-task` | Create new task | ⚠️ (Not enforced yet) |
| GET | `/task/:id` | Fetch single task | ❌ No |
| PUT | `/task/:id` | Update task | ⚠️ (Not enforced yet) |
| DELETE | `/tasks/:id` | Delete single task | ⚠️ (Not enforced yet) |
| DELETE | `/delete-multiple` | Delete multiple tasks | ⚠️ (Not enforced yet) |

**Note**: ⚠️ = Should be protected but isn't enforced yet

---

## 🔐 Authentication Flow

```
User Signup → JWT Token Created → Token Stored (Cookie + LocalStorage) 
→ User Logged In → Token Sent with Requests → User Can Add/Edit/Delete Tasks 
→ User Logout → Clear LocalStorage → Redirect to Login
```

### LocalStorage Keys
- `user`: Stores user's email
- `token`: Stores JWT authentication token

---

## ✅ What Was Fixed/Improved

### Bug Fixes
1. ✅ **Removed unused import** in `AddTask.jsx` (was importing `data` unnecessarily)
2. ✅ **Fixed date field naming** - Changed from `date` to `deadline` to match backend
3. ✅ **Added error handling** in login catch block (was empty)
4. ✅ **Fixed TaskList delete function** - Now uses `alert()` instead of undefined `setError()`
5. ✅ **Added validation** to delete multiple - Shows alert if no tasks selected
6. ✅ **Fixed multiple delete** - Now properly removes deleted items from UI

### New Features Added
1. ✅ **Logout button** in NavBar with localStorage clearing
2. ✅ **User email display** in NavBar when logged in
3. ✅ **Conditional rendering** - "Add Task" only shows when user is logged in
4. ✅ **Better error handling** in fetch calls
5. ✅ **Environment variables** setup (.env files)
6. ✅ **NavBar styling** for logout button and user info

---

## 🎨 Component Explanations

### **NavBar.jsx** (Enhanced)
```javascript
- Displays app logo and navigation
- Shows current logged-in user email
- Logout button: Clears localStorage and redirects to login
- "Add Task" link only visible when user is logged in
```

### **Login.jsx**
```javascript
- Clears localStorage on mount (prevents old project data)
- Takes email and password as input
- Sends to /login endpoint
- Stores user email and token in localStorage
- Redirects to home page after successful login
```

### **SignUp.jsx**
```javascript
- Takes name, email, password as input
- Sends to /signup endpoint
- Stores token in cookie
- Redirects to login page
```

### **TaskList.jsx** (Improved)
```javascript
- Fetches all tasks from backend on mount
- Displays tasks in a table
- Checkbox to select individual tasks
- "Select All" checkbox
- Delete single task button
- Delete multiple selected tasks button
- Update button to edit task
```

### **AddTask.jsx** (Fixed)
```javascript
- Form to create new task
- Fields: title, description, deadline (was date - FIXED)
- Validates on backend
- Resets form after successful creation
- Redirects to home page
```

### **UpdateTask.jsx**
```javascript
- Fetches existing task by ID from URL params
- Pre-fills form with task data
- Updates task on submit
- Redirects to home after update
```

---

## ⚠️ Important Issues to Address (Future Improvements)

### 🔴 Critical Security Issues
1. **Password Hashing**: Passwords are stored as plain text!
   - **Fix**: Install `bcrypt` and hash passwords before storing
   ```javascript
   npm install bcrypt
   // In signup route:
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **Protected Routes**: Tasks are not linked to users
   - **Fix**: Add `userId` field to Task schema and filter tasks by logged-in user

3. **JWT Secret Hardcoded**: Currently `"your_jwt_secret_key"`
   - **Fix**: Move to `.env` file and use `process.env.JWT_SECRET`

4. **Missing JWT Verification**: Protected routes don't verify tokens
   - **Fix**: Use the `verifyJWTToken` middleware on protected routes

### 🟡 Medium Priority Issues
1. **No Input Validation**: Frontend needs form validation
   - Add regex checks for email, minimum password length

2. **Date Display**: Task dates show ISO format
   - **Fix**: Format dates using `new Date(date).toLocaleDateString()`

3. **Error Messages**: Generic alerts instead of specific error feedback
   - **Fix**: Display actual error messages from backend

4. **CORS Vulnerability**: Frontend URL hardcoded
   - **Fix**: Use environment variables

---

## 📝 File-by-File Improvements Made

### **Updated Files**:
- ✅ `AddTask.jsx` - Fixed imports and date field naming
- ✅ `NavBar.jsx` - Added logout and user display
- ✅ `NavBar.css` - Added button styling
- ✅ `Login.jsx` - Fixed hook ordering (already done)
- ✅ `TaskList.jsx` - Improved error handling
- ✅ `backend/index.js` - Added error handling to login catch

### **New Files Created**:
- ✅ `backend/.env` - Environment variables
- ✅ `frontend/.env` - API URL configuration

---

## 🧪 Testing the Application

### Test Signup
```
1. Go to http://localhost:5173/signup
2. Enter name, email, password
3. Click "Sign Up"
4. Should redirect to login page
5. Check localStorage in DevTools
```

### Test Login
```
1. Go to http://localhost:5173/login
2. Enter email and password (same as signup)
3. Click "Login"
4. Check localStorage - should have 'user' and 'token'
5. NavBar should show "Welcome, your-email"
6. Should redirect to home page
```

### Test Add Task
```
1. After login, click "Add Task"
2. Enter title, description, deadline
3. Click "Add Task"
4. Should appear in task list
5. Reload page - task should persist in database
```

### Test Update Task
```
1. Click "Update" on any task
2. Change title/description
3. Click "Update Task"
4. Should see updated values in list
```

### Test Delete Task
```
1. Click "Delete" on single task
2. Task should disappear from UI
3. For multiple: Check multiple tasks, click "Delete"
4. All selected tasks should be removed
```

### Test Logout
```
1. Click "Logout" in NavBar
2. localStorage should be cleared
3. Should redirect to login page
4. "Add Task" should not be visible
```

---

## 📦 Next Steps for Production

1. **Add password hashing** (bcrypt)
2. **Implement JWT verification** on all protected routes
3. **Add database indexing** on user email field
4. **Add rate limiting** to prevent brute force attacks
5. **Add input validation** on both frontend and backend
6. **Setup HTTPS** for secure communication
7. **Add error logging** system
8. **Add user profile page** with settings
9. **Add task filtering** by status (complete/incomplete)
10. **Add pagination** for large task lists

---

## 🤝 Contributing
All files are properly structured and ready for enhancement. Follow the existing patterns when adding new features.

---

## 📞 Troubleshooting

**Q: Tasks not appearing after adding?**
A: Check MongoDB connection in backend console. Ensure database is running.

**Q: Login fails with "Invalid Credentials"?**
A: Ensure you're using the same email/password from signup. Check console for errors.

**Q: NavBar shows "Login" instead of username?**
A: localStorage might be cleared. Try logging in again.

**Q: Cannot access "Add Task" page?**
A: Must be logged in. The page is hidden from the NavBar when not logged in.

**Q: CORS Error?**
A: Backend CORS is set to `http://localhost:5173`. Ensure frontend is running on this URL.

---

**Last Updated**: March 1, 2026
**Status**: ✅ Fully Functional (with noted security improvements needed)
