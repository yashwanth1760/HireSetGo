import React from "react";
import { Badge } from "@/components/ui/badge";

const LatestJobsCard = ({job,onClick}) => {
  return (
    <div 
     onClick={onClick}
    className="p-4 border rounded-xl shadow-sm bg-white space-y-3">
      {/* Company Info */}
      <div className="text-sm text-gray-600">
        <h1 className="text-lg font-semibold text-[#000]">{ job?.company?.name?  job?.company?.name:"Company Name"}</h1>
        <p className="">{ job.location ? job.location : "India"}</p>
      </div>

      {/* Job Title & Description */}
      <div>
        <h2 className="text-md font-medium text-[#38567d]">{ job.title ? job.title : "Job Title"}</h2>
        <p className="text-sm text-gray-500">
         { job.description ? job.description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis totam nulla repudiandae consectetur, doloribus earum vitae error eum ratione reiciendis sunt iure animi ducimus velit est corrupti quidem, illum excepturi?"
}
        </p>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap pt-2">
        <Badge
          className="bg-[#EDF4FA] text-black font-semibold rounded-full px-3 py-1 text-xs"
          variant="secondary"
        >
          { job.position ?  `${ job.position } positions`: " 0 Positions"}
        </Badge>
        <Badge
          className="bg-[#EDF4FA] text-[#38567d] font-semibold rounded-full px-3 py-1 text-xs"
          variant="secondary"
        >
          {job.jobType ? `${job.jobType}` :"Part Time"}
        </Badge>
        <Badge
          className="bg-[#EDF4FA] text-[#F83002] font-semibold rounded-full px-3 py-1 text-xs"
          variant="secondary"
        >
      {job.salary ? `₹ ${(job.salary / 100000).toFixed(2)} LPA` : "Not Disclosed"}

        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
