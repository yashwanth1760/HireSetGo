import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import connectDB from "./utilis/db.js";

const app = express(); // When you call it, it returns a new Express application instance

//middleware 
app.use(express.json()); // middleware  parse json data to js obj
app.use(express.urlencoded({ extended: true })); // middleware parse url encoded data to js obj
app.use(express.static("public")); // middleware serve static files from public folder
app.use(cookieParser()); // middleware parse cookie data to js obj
app.use(cors({
  origin: ["https://hiresetgo.vercel.app", "http://localhost:5173"],
  credentials: true,
}));

dotenv.config({}); //Loads .env file contents into process.env by default

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job",jobRoutes);
app.use("/api/application",applicationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, (req,res) => {
    connectDB();
   console.log(`http://localhost:${PORT}`);
})
