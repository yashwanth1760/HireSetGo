import mongoose from "mongoose";

//job application creation
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [
        { type: String } // says the skills
    ],
    responsibilities: {
        type: String
    },
    benefits: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    industry: {
        type: String,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applications: [  // required by while applying
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);