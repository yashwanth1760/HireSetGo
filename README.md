# HireSetGo Project

## Project Overview
HireSetGo is a full-stack job portal application consisting of a backend API server and a React-based frontend client. The backend is built with Node.js, Express, and MongoDB, providing RESTful APIs for user, company, job, and application management. The frontend is built with React and Vite, offering a modern and responsive user interface for job seekers and administrators.

---

## Backend

### Technologies
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for file uploads
- Multer for handling multipart/form-data
- CORS, Cookie Parser, dotenv for environment management

### Setup and Running

1. Navigate to the backend directory:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:

   ```
   PORT=5001
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the backend server in development mode:

   ```bash
   npm run dev
   ```

5. The backend server will be running at `http://localhost:5001`.

---

## Frontend

### Technologies

* React
* Vite
* Redux Toolkit
* Tailwind CSS
* Radix UI components
* React Router DOM

### Setup and Running

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

4. The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use).

---

## Running the Full Project

* Start the backend server first (`npm run dev` in the `backend` folder).
* Then start the frontend server (`npm run dev` in the `frontend` folder).
* The frontend is configured to communicate with the backend API at `http://localhost:5001/api`.

---

## Folder Structure Overview

```
/backend
  /controllers       # API route controllers for users, jobs, companies, applications
  /middlewares       # Express middlewares (authentication, file upload, etc.)
  /models            # Mongoose models for database schemas
  /routes            # Express route definitions
  /utilis            # Utility functions (DB connection, Cloudinary setup, etc.)
  index.js           # Backend server entry point
/frontend
  /src
    /components      # React components (UI, pages, admin, auth, shared)
    /hooks           # Custom React hooks
    /redux           # Redux slices and store
    /utils           # Utility functions and constants
  index.html         # Frontend HTML entry
  package.json       # Frontend dependencies and scripts
```

---

## Environment Variables

* Backend:

  * `PORT` (optional): Port number for backend server (default 5001)
  * `MONGODB_URL`: MongoDB connection string

* Frontend:

  * No specific environment variables required by default

---

## Notes

* Ensure MongoDB is running and accessible via the connection string.
* The backend uses CORS to allow requests from the frontend development server.
* File uploads are handled via Cloudinary integration.
* Authentication is implemented using JWT tokens.

---

This README provides a comprehensive overview and setup instructions for the HireSetGo project.

````

---

### 📌 Final Steps in Terminal:

1. Save your `README.md` after removing conflict markers.
2. Run:
   ```bash
   git add README.md
   git commit -m "Resolved README.md merge conflict"
   git push
````

Done! Let me know if you want a shorter version for GitHub summary or badges added.
