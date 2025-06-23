import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { companyRegister, deleteCompany, getCompanyDetails, getCompanyDetailsById, updateCompany } from "../controllers/company.controller.js";
import { multiUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/registerCompany").post(isAuthenticated,multiUpload,companyRegister);
router.route("/getCompanyDetails").get(isAuthenticated,getCompanyDetails);
router.route("/getCompanyDetailsById/:id").get(isAuthenticated,getCompanyDetailsById);
router.route("/updateCompany/:id").put(isAuthenticated,multiUpload,updateCompany);
router.route("/deleteCompany/:id").delete(isAuthenticated,deleteCompany);


export default router; 