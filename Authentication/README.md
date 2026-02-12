# MERN Authentication System 🔐

A robust and beautiful Authentication System built with the **MERN Stack** (MongoDB, Express, React, Node.js).
This project features secure Signup, Login, persistent sessions using Cookies, and a polished UI with animations.

## 🌟 Features

*   **Secure Authentication**:
    *   Signup & Login with Password Hashing (bcrypt).
    *   JWT (JSON Web Token) implementation.
    *   **HttpOnly Cookies** for secure session management.
*   **Modern UI/UX**:
    *   Built with **React** & **Tailwind CSS**.
    *   Smooth animations using **Framer Motion**.
    *   Toast notifications for user feedback (`react-hot-toast`).
*   **Image Handling**:
    *   Profile image upload support (Cloudinary).
    *   Dynamic profile avatars (Image or Initials).
*   **Educational Code**:
    *   The codebase is heavily commented to help beginners understand the flow.

## 🛠️ Tech Stack

**Frontend:**
*   React (Vite)
*   Tailwind CSS (Styling)
*   Axios (API Requests)
*   Framer Motion (Animations)
*   React Router DOM (Navigation)

**Backend:**
*   Node.js & Express.js
*   MongoDB (Database) & Mongoose
*   JWT (Authentication)
*   Bcrypt (Security)
*   Cloudinary (Image Storage)

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
*   Node.js installed.
*   MongoDB installed or a MongoDB Atlas connection string.
*   Cloudinary Account (for image uploads).

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Authentication
```

### 2. Backend Setup
Navigate to the `backend` folder and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENVIRONMENT=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the Backend Server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies.
```bash
cd frontend
npm install
```

Start the Frontend Server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📂 Project Structure

```
Authentication/
├── backend/            # Express Server
│   ├── config/         # Database & Token config
│   ├── controllers/    # API Logic (Signup, Login)
│   ├── middlewares/    # Auth Checks & File Uploads
│   ├── models/         # Database Schemas
│   └── routes/         # API Endpoints
│
└── frontend/           # React Application
    ├── public/         # Static assets
    └── src/
        ├── assets/     # Images
        ├── context/    # Global State (UserContext)
        ├── Pages/      # Login, Signup, Home
        └── App.jsx     # Routing
```

## 🔒 Security Highlights
- **HttpOnly Cookies**: Prevents XSS attacks by hiding tokens from JavaScript.
- **Bcrypt**: Ensures passwords are never stored as plain text.
- **Cors Config**: Restricts API access to trusted domains.

## 🤝 Contributing
Feel free to fork this project and submit pull requests!

---
Made with ❤️ by Naman
