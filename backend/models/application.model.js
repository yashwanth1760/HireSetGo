import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
      type:String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }

},{timestamps:true});

export const  Application = mongoose.model('Application',applicationSchema);