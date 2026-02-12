# **MERN Authentication System 🔐**

A robust and beautiful Authentication System built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features secure Signup, Login, persistent sessions using Cookies, and a polished UI with animations.

## **🌐 Live Demo**

- **Frontend (Vercel)**: [https://authapp-murex.vercel.app](https://authapp-murex.vercel.app)
- **Backend (Render)**: [https://ultimate-backend-gtx9.onrender.com](https://ultimate-backend-gtx9.onrender.com)
- **GitHub Repo**: [https://github.com/thecodexnam/Ultimate-Backend](https://github.com/thecodexnam/Ultimate-Backend)

---

## **🌟 Features**

### **Secure Authentication**
- Signup & Login with password hashing (**bcrypt**)
- **JWT** (JSON Web Token) based authentication
- **HttpOnly Cookies** for secure session management

### **Modern UI/UX**
- Built with **React (Vite)** & **Tailwind CSS**
- Smooth animations using **Framer Motion**
- Toast notifications for user feedback (`react-hot-toast`)

### **Image Handling**
- Profile image upload support (**Cloudinary**)
- Dynamic profile avatars (Profile Image or Initials)

### **Educational Code**
- Clean, commented code to help beginners understand the flow

---

## **🛠️ Tech Stack**

### **Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- Framer Motion
- React Router DOM
- React Hot Toast

### **Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT
- Bcrypt
- Cloudinary

---

## **🚀 Getting Started (Local)**

### **Prerequisites**
- Node.js installed
- MongoDB (local or Atlas)
- Cloudinary account (for profile image uploads)

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/thecodexnam/Ultimate-Backend.git
cd Ultimate-Backend/Authentication
```

### **2️⃣ Backend Setup**

Go to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend:

```bash
npm run dev
```

Backend will run on: `http://localhost:8000`

### **3️⃣ Frontend Setup**

Open a new terminal, go to the frontend folder, and install dependencies:

```bash
cd ../frontend
npm install
```

For local development, create a `.env` file in `frontend` (optional but recommended):

```env
VITE_SERVER_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## **🌍 Deployment (Vercel + Render)**

### **Vercel (Frontend)**

Set this environment variable in your Vercel project:

```env
VITE_SERVER_URL=https://ultimate-backend-gtx9.onrender.com
```

Then redeploy the frontend.

### **Render (Backend)**

Set these environment variables in your Render service:

```env
FRONTEND_URL=https://authapp-murex.vercel.app
NODE_ENV=production
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then redeploy the backend.

> **Note**: With this setup, login/signup on the live site correctly redirects to the Home page and keeps you authenticated.

---

## **📂 Project Structure**

```
Authentication/
├── backend/              # Express Server
│   ├── config/           # DB, token & cloud config
│   ├── controllers/      # API logic (Signup, Login, Logout, Get User)
│   ├── middleWares/      # Auth checks, file uploads
│   ├── models/           # Mongoose schemas
│   └── routes/           # API routes
│
└── frontend/             # React Application
    ├── public/           # Static assets
    └── src/
        ├── assets/       # Images (e.g., default avatar)
        ├── context/      # Global state (UserContext)
        ├── Pages/        # Login, Signup, Home pages
        └── App.jsx       # Routes definition
```

---

## **🔒 Security Highlights**

- **HttpOnly Cookies**: Tokens are not accessible via JavaScript, helping prevent XSS
- **Bcrypt**: Passwords are hashed before saving to the database
- **CORS Config**: Backend only accepts requests from trusted origins (localhost + deployed frontend)

---

## **🤝 Contributing**

Feel free to fork the project, open issues, or submit pull requests.

---

## **📝 License**

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ by Naman**

---

## **📧 Contact**

For any questions or suggestions, feel free to reach out!

- GitHub: [@thecodexnam](https://github.com/thecodexnam)

