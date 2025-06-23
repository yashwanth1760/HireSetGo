import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String },
  website: {
    type: String,
    // match: [/^https?:\/\/.+\..+/, 'Enter a valid URL']
  },
  location: { type: String },
  logo: { type: String, default: "" },
  industry: {
    type: String,
    enum: ['IT', 'Finance', 'Healthcare', 'Education', 'Other'],
    default: 'Other'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


export const Company = mongoose.model('Company', companySchema);  