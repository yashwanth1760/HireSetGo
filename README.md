
---

```md
# 💼 HireSetGo – Full-Stack Job Portal

**HireSetGo** is a modern job portal web application designed to connect job seekers with employers through a seamless and responsive platform. It supports user authentication, job postings, applicant tracking, and admin control — all built with a professional tech stack and clean UI.

---

## 🚀 Project Overview

- 🧑‍💼 Users can browse, filter, and apply for jobs
- 🏢 Recruiters can post jobs and manage applicants
- 🛠️ Admins can monitor users, jobs, and companies
- 🖥️ Fully responsive frontend built with React and Tailwind CSS
- 🔐 JWT-based secure login system
- ☁️ Cloudinary integration for image uploads (e.g., company logos)

---

## 🧱 Tech Stack

### Frontend
- React + Vite
- Redux Toolkit
- Tailwind CSS
- Radix UI
- React Router DOM
- Axios

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage
- Cookie-parser, dotenv, CORS

---

## 🗂️ Folder Structure

```

/backend
/controllers
/models
/routes
/middlewares
/utilis
index.js

/frontend
/src
/components
/pages
/redux
/utils
/hooks
index.html

````

---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
npm install
````

Create a `.env` file inside `/backend`:

```
PORT=5001
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then run:

```bash
npm run dev
```

---

### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

Make sure your frontend API calls are pointed to the backend at `http://localhost:5001/api`.

---

## 🌐 Deployment

* **Frontend**: [Vercel](https://vercel.com/)
* **Backend**: [Render](https://render.com/)
* Cloud Storage: Cloudinary

---

## 🔒 Environment Variables

### Backend:

* `PORT`
* `MONGODB_URL`
* `JWT_SECRET`
* `CLOUDINARY_*` (Cloudinary API keys)

Frontend:

* Uses static API URLs unless moved to `.env` and injected in build

---

## 📌 Notes

* JWT tokens are stored in cookies for secure user sessions
* Cloudinary handles file uploads via Multer
* CORS enabled between frontend and backend during development

---

## 📬 Contributions

Feel free to fork, star, and contribute via PRs or issues!
Open to feature requests, bug reports, and improvements.

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).

---
