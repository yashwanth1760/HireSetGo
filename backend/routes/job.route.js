import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJob, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/getJob").get( isAuthenticated, getAllJobs);
router.route("/getJobById/:id").get(isAuthenticated,getJobById);
router.route("/getAdminJob").get(isAuthenticated,getAdminJob);

export default router;