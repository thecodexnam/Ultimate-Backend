# MERN Application Deployment Guide

This guide covers deploying the backend to Render and the frontend to Vercel.

## 1. Deploy the Backend (Render)

Render provides a free Web Service that is perfect for Node.js backends.

1. Go to [Render](https://render.com) and create a free account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your repository.
4. Fill in the deployment details:
   - **Name**: `todo-backend` (or similar)
   - **Environment**: `Node`
   - **Region**: (Choose the closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Scroll down to **Advanced** and click **Add Environment Variable**. You need to add these EXACTLY as they are in your local `.env`:
   - `PORT`: (Render will set this automatically, you can skip)
   - `MONGO_URI`: `your_mongodb_connection_string`
   - `JWT_SECRET`: `your_jwt_secret_key`
   - `FRONTEND_URL`: (Wait to set this until you deploy the frontend and get the Vercel URL)
6. Click **Create Web Service**.
7. Wait a few minutes. Once it says "Deploy Live", copy your Render URL (e.g., `https://todo-backend-xyz.onrender.com`).

---

## 2. Deploy the Frontend (Vercel)

Vercel is optimized for frontend frameworks like React/Vite.

1. Go to [Vercel](https://vercel.com) and create a free account (sign up with GitHub).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. In the **Configure Project** section:
   - **Framework Preset**: `Vite` (Vercel should auto-detect this)
   - **Root Directory**: Click the edit icon and select the `frontend` folder.
5. Open the **Environment Variables** section and add:
   - **Name**: `VITE_API_URL`
   - **Value**: `paste_your_render_backend_url_here` (Ensure there is NO trailing slash `/` at the end of the URL)
6. Click **Deploy**.
7. Once finished, visit your live Vercel domain (e.g., `https://todo-frontend-xyz.vercel.app`).

---

## 3. Final Connection Step

Your frontend is now talking to your backend, BUT your backend is likely blocking it due to CORS.

1. Go back to your Backend dashboard on Render.
2. Go to the **Environment** tab.
3. Add/Update the `FRONTEND_URL` variable:
   - **Name**: `FRONTEND_URL`
   - **Value**: `paste_your_vercel_frontend_url_here` (Ensure there is NO trailing slash `/`)
4. Save the changes (Render will automatically redeploy).

**🎉 Congratulations! Your Full-Stack App is Live!**
If you face issues with routes directly (like `/login`), the `vercel.json` file added to your frontend ensures React Router handles it without showing a 404 error.
