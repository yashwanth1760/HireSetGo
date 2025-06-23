//business logic

import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, experience, location, salary, jobType, position, company,responsibilities,benefits,industry  } = req.body;
        if (!title || !description || !requirements || !experience || !location || !jobType || !position || !company || !salary) {
            return res.status(400).json({ message: "Please fill all the fields", success: false });
        }

        const job = await Job.create({
            title: title,
            description: description,
            requirements: requirements,
            experience: experience,
            location: location,
            jobType: jobType,
            salary: salary,
            position: position,
            company: company,
            responsibilities:responsibilities,
            benefits:benefits,
            industry:industry,
            created_by: req.id
        });
        return res.status(201).json({ message: "Job posted successfully", success: true, job: job });

    } catch (error) {
         
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";    // /jobs?keyword=developer

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 }); // find all jobs

        if (!jobs) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ message: "Jobs found successfully", success: true, jobs: jobs });

    } catch (error) {
         
        return res.status(500).json({ message: "Internal Server Error", success: false });

    }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: [
        { path: "user" },
        { path: "job" }
      ]
    }).populate("company");

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ message: "Job found successfully", success: true, job });

  } catch (error) {
     
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


//admin created jobs
export const getAdminJob = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }) // ✅ corrected field
      .populate({
        path: "applications",
        populate: [{ path: "user" }, { path: "job" }],
      })
      .populate("company");

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
        jobs:[]
      });
    }

    return res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
