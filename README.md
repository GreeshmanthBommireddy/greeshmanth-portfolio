# 🌐 Greeshmanth Reddy Portfolio Website

A **Full-Stack Portfolio Website** to showcase my skills, projects, and contact information, built with **React (Vite)** and **Node.js (Express)**.  
Designed for potential clients, employers, and collaborators.

---

## 🎯 Project Overview
- **Project Name:** Greeshmanth Reddy Portfolio Website
- **Type:** Full-Stack Portfolio Website
- **Purpose:** Professional portfolio showcasing skills, projects, and contact information
- **Target Audience:** Potential clients, employers, and collaborators

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** [React 18.2.0](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.3.5](https://tailwindcss.com/)
- **Typography:** Playfair Display (serif) + Inter (sans-serif)
- **Icons:** [React Icons 4.11.0](https://react-icons.github.io/react-icons/)
- **Animations:** CSS transitions and transforms
- **Notifications:** [React Toastify 9.1.3](https://fkhadra.github.io/react-toastify/)

### **Backend**
- **Runtime:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Contact Form:** API endpoint for form submissions
- **WhatsApp Integration:** Automated notification messages
- **CORS:** Enabled for frontend-backend communication

---

## 🚀 Deploying to Vercel (recommended)
Follow these steps to deploy this project to Vercel (supports frontend + serverless APIs in `api/`):

1. Create or sign-in to your account at https://vercel.com.
2. Import the GitHub repository **GreeshmanthBommireddy/greeshmanth-portfolio** in Vercel (Dashboard → New Project → Import Git Repository).

Configuration suggestions (Vercel will often detect these automatically):
- Build & Output settings:
  - **Build Command:** `npm run build`
  - **Output Directory:** `frontend/dist` (the repo already contains `vercel.json` which sets this)
- Framework Preset: **Other** (or let Vercel auto-detect)

3. Add the required Environment Variables (Project Settings → Environment Variables):

| Name | Required | Notes |
|------|----------|-------|
| `MONGODB_URI` | ✅ | Your MongoDB connection string (required for DB features) |
| `TWILIO_ACCOUNT_SID` | ⚪ | Required only if you want WhatsApp notifications |
| `TWILIO_AUTH_TOKEN` | ⚪ | Required only if you want WhatsApp notifications |
| `TWILIO_WHATSAPP_NUMBER` | ⚪ | The "from" WhatsApp number registered with Twilio |

Set them for **Production** (and optionally for Preview/Development).

4. Deploy:
- Via Dashboard: Click **Deploy** after import and config.
- Via CLI (optional):
  - Install: `npm i -g vercel`
  - Login: `vercel login`
  - From repo root: `vercel` (follow prompts) or `vercel --prod` to deploy to production

5. Test locally before deploying (optional):
- Install Vercel CLI and run `vercel dev` at repository root to emulate Vercel locally (it will serve frontend and `api/` serverless routes).

6. Health check: After deployment, visit `https://<your-project>.vercel.app/api/health` to confirm the serverless API is running and `MONGODB_URI` connection state.

---

> Tip: A `.env.example` has been added to the repo with the environment variable keys used by the project. Copy it to `.env` for local testing and DO NOT commit your real secrets.


> Note: This repository is set to auto-deploy to Vercel via GitHub Actions on pushes to `main` (workflow: `.github/workflows/deploy-to-vercel.yml`).

