# Zenith AI: Neural Productivity Ecosystem

Zenith AI is a next-generation task management platform powered by high-fidelity AI heuristics. It transforms mundane task listing into a strategic, neural-driven growth experience. system powered by AI. It helps users organize, prioritize, and execute their work through smart automation and coaching insights.

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Vite + React Router
- **AI Engine**: OpenRouter (LLM-based categorization and coaching)
- **Design Persona**: Premium Dark Mode with Glassmorphism and Fluid Animations

---

## 🎨 Premium Features

### 1. **AI Brain (Powered by OpenRouter)**
- **Auto-Categorization**: Every task created is automatically analyzed to assign a Priority (High/Medium/Low), Category (Development, Personal, etc.), and Estimated Time.
- **Smart Breakdown**: Complex tasks can be broken down into 3-5 sub-steps with a single click.
- **Procrastination Buster**: Get personalized motivational tips and a "2-minute micro-action" to help you start your most daunting tasks.
- **Dynamic Planner**: An AI-generated 9:00 AM to 5:00 PM schedule based on your current task priorities and deadlines.

### 2. **Productivity Insights**
- Real-time analysis of your completion rates.
- AI-driven coaching reports that identify your "Focus Density" and provide actionable improvement tips.

### 3. **Production-Ready Security**
- **JWT Authentication**: Secure, cookie-based sessions with lazy-loading secret resolution to prevent environment race conditions.
- **Hashed Passwords**: User security via `bcryptjs` hashing.
- **Isolated User Data**: Users can only see and interact with their own tasks and AI insights.

---

## 📁 Updated Project Structure

```
Coach Tasker/
├── backend/
│   ├── index.js          # Express server & core API
│   ├── controllers/      # AI and Auth logic handlers
│   ├── middleware/       # JWT and session security
│   ├── models/           # MongoDB schemas (Task, User)
│   ├── routes/           # RESTful API endpoints
│   └── config/           # DB and AI service config
│
└── frontend/
    ├── src/
    │   ├── component/    # Premium UI components (Glass NavBar, Card Grid)
    │   ├── style/        # Design System (index.css, form.css, auth.css)
    │   └── App.jsx       # Global Routing
```

---

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env` in the `backend/` directory:
```
PORT=4000
MONGO_URL=your_mongodb_connection_url
JWT_SECRET=your_secure_secret
OPEN_ROUTER=your_openrouter_api_key
```

### 2. Installation
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### 3. Deployment
- **Frontend**: Best deployed on **Vercel** (pre-configured `vercel.json` included).
- **Backend**: Best deployed on **Render** (as a Web Service).

---

## 🛠️ Security & Scaling
- **JWT Verification**: Implemented in `authMiddleware.js` for all task-specific routes.
- **Vite Optimization**: Downgraded to v5.x for maximum compatibility with Node.js 22.x LTS environments.
- **Lazy Env Loading**: Critical fix implemented to ensure API keys are parsed before controllers initialize.

**Status**: ✅ Production Ready (Rebranded & UI Enhanced)
**Last Updated**: March 16, 2026
