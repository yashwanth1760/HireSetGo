import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.route("/applyJob/:id").get(isAuthenticated, applyJob);
router.route("/getAppliedJobs").get( isAuthenticated, getAppliedJobs);
router.route("/getApplicants/:id").get(isAuthenticated,getApplicants);
router.route("/updateStatus/:id").post(isAuthenticated,updateStatus);

export default router;