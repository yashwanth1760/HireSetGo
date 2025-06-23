import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {

        const userId = req.id;
        const jobId = req.params.id;
        

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }
        const applicant = await Application.findOne({ job: jobId, user: userId });
        if (applicant) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        const newApplication = new Application({
            user: userId,
            job: jobId
        });

        job.applications.push(newApplication._id);

        await job.save();
        await newApplication.save();

        return res.status(201).json({ message: "Application submitted successfully", success: true });


    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error", success: false });

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ user: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'company', options: { sort: { createdAt: -1 } } }
        });

        if (!application) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }

        return res.status(200).json({ application, success: true });


    } catch (error) {
         
        return res.status(500).json({ message: "Internal Server Error", success: false });

    }
}

//getting how many applicants applied 
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {
                sort: { createdAt: -1 }
            },
            populate: { path: "user", options: { sort: { createdAt: -1 } } }
        });

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ job, success: true });

    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const updateStatus = async (req,res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }
        const application = await Application.findOne({ _id:applicationId});
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({ application, success: true });
    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}
