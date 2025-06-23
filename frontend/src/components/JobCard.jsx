import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job._id;

  const daysAgo = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentAt = new Date();
    const timeDifference = currentAt - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="relative border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
      {/* Top row: Posted time and badge */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} Days ago`}
        </span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
          Verified
        </span>
      </div>

      {/* Logo and Company Info */}
      <div className="flex items-center gap-4 text-left pb-2">
        <img
          src={job?.company?.logo || "https://via.placeholder.com/40"}
          alt="Company logo"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="text-base font-semibold text-gray-800">
            {job?.company?.name || "Company Name"}
          </p>
          <p className="text-sm text-muted-foreground">
            {job.location || "India"}
          </p>
        </div>
      </div>

      {/* Title and Description */}
      <div className="text-left">
        <h2 className="text-lg font-bold text-[#333] mb-2">
          {job.title || "Job Title"}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.description || "Job description not available."}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 text-xs mt-2">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
          {job.position ? `${job.position} Positions` : "Positions"}
        </span>
        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-medium">
          {job.jobType || "Full-time"}
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">
          ₹{job.salary ? `${(job.salary / 100000).toFixed(2)} LPA` : "Salary"}
        </span>
      </div>

      {/* Bottom Row: Tags + Button */}
      <div className="flex justify-between items-center pt-3 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {job?.location === "Remote" && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              💻 Remote Friendly
            </span>
          )}
          {job?.salary > 1500000 && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              💰 High Paying
            </span>
          )}
          {daysAgo(job?.createdAt) <= 2 && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
              🆕 New
            </span>
          )}
        </div>

        <Button
          variant="outline"
          className="text-sm rounded-full px-4 py-2"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
