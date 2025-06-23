import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { uploadToCloudinary } from "../utilis/Cloudinary.js";
import { getDataUri } from "../utilis/streamUpload.js";

// Register a new company

export const companyRegister = async (req, res) => {
  try {
    const { companyName, description, website, location, industry } = req.body;

    const file = req?.files?.logo?.[0];
     ("files:", req.files); // Add this in controller

    if (!file) {
      return res.status(400).json({
        message: "Logo file is required",
        status: false,
      });
    }

    const datauri = getDataUri(file);
    const cloudResponse = await uploadToCloudinary(
      datauri.content,
      "image",
      `logo-${Date.now()}`,
      "logos"
    );

    const logoUrl = cloudResponse.secure_url;

    // Basic validation
    if (!companyName || !website || !location || !industry || !description) {
      return res.status(400).json({
        message: "Please fill all required fields",
        status: false,
      });
    }

    // Check if company already exists by name (case-insensitive)
    const existingCompany = await Company.findOne({
      name: { $regex: new RegExp(`^${companyName}$`, "i") },
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
        status: false,
      });
    }

    // Create company
    const newCompany = await Company.create({
      name: companyName,
      description,
      website,
      location,
      logo: logoUrl, // ✅ Correct field
      industry,
      createdBy: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      status: true,
      company: newCompany,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};



// Get all companies created by the logged-in user
export const getCompanyDetails = async (req, res) => {
  try {
    const userId = req.id;
     ("User ID:", userId);

    const companies = await Company.find({ createdBy: userId });

    if (!companies || companies.length === 0) {
      return res.status(200).json({ companies: [], status: false, message: "No company found" });
    }

    return res.status(200).json({ companies, status: true });

  } catch (error) {
    
    return res.status(500).json({ message: "Internal Server Error", status: false });
  }
};

// Get a single company by its ID
export const getCompanyDetailsById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found", status: false });
    }

    return res.status(200).json({ company, status: true });

  } catch (error) {
   
    return res.status(500).json({ message: "Internal Server Error", status: false });
  }
};


export const updateCompany = async (req, res) => {
  try {
    const { id: companyId } = req.params;
    const { name, description, website, location, industry } = req.body;

    if (!companyId) {
      return res.status(400).json({ status: false, message: "Missing company ID" });
    }

    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (description) updatedFields.description = description;
    if (website) updatedFields.website = website;
    if (location) updatedFields.location = location;
    if (industry) updatedFields.industry = industry;


    const file = req.files?.logo?.[0];
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResult = await uploadToCloudinary(
        fileUri.content,
        "image",
        `logo-${Date.now()}`,
        "logos"
      );
      updatedFields.logo = cloudResult.secure_url;
    }

    const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedFields, {
      new: true,
    });

    if (!updatedCompany) {
      return res.status(404).json({
        status: false,
        message: "❌ Company not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "✅ Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
   
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};


export const deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    // 1. Find all jobs under this company
    const jobs = await Job.find({ company: companyId });
    const jobIds = jobs.map((job) => job._id);

    // 2. Delete applications tied to those jobs
    await Application.deleteMany({ job: { $in: jobIds } });

    // 3. Delete the jobs themselves
    await Job.deleteMany({ _id: { $in: jobIds } });

    // 4. Remove company ref from users
    await User.updateMany(
      { "profile.company": companyId },
      { $unset: { "profile.company": "" } }
    );

    // 5. Delete the company itself
    await Company.findByIdAndDelete(companyId);

    res.status(200).json({ status: true, message: "✅ Company and related data deleted successfully." });
  } catch (error) {
   
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
