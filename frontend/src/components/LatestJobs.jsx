import React, { useState } from "react";
import LatestJobsCard from "./LatestJobsCard";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LatestJobs = () => {
  const navigate = useNavigate();

  const { allJobs } = useSelector((store) => store.job);
  return (
    <section className="w-full bg-[#F9FAFB] py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
          Latest & Top <span className="text-[#38567d]">Job Openings</span>
        </h2>
        {/* Grid of Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 my-5">
          {allJobs.length !== 0 ? (
            allJobs
              ?.slice(0, 6)
              .map((job, idx) => (
                <LatestJobsCard
                  
                  onClick={() => navigate(`/description/${job._id}`)}
                  job={job}
                  key={idx}
                />
              ))
          ) : (
            <h1>No Jobs Found</h1>
          )}
        </div>
        <div className="text-center">
          <Button className="text-sm bg-[#d32f2f] hover:bg-[#b71c1c] text-white  hover:text-white px-6 py-3  font-medium rounded-md transition">
            <Link to="/jobs"> See More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
