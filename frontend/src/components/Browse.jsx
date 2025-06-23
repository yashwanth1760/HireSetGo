import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllJobs, setSearchQuery } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const Browse = () => {
  const searchedQuery = useSelector((store) => store.job.searchQuery);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllSearchedJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/job/getJob?keyword=${searchedQuery}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching searched jobs:");
      }
    };

    if (searchedQuery) {
      fetchAllSearchedJobs();
    }
  }, [dispatch, searchedQuery]);

  const allJobs = useSelector((store) => store.job.allJobs);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  });

  return (
    <div>
      <Navbar />
      <div className="w-full">
        <div className="max-w-7xl mx-auto my-10">
          <h1 className="font-bold text-xl my-10">
            Search Results ({allJobs.length})
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allJobs.map((item, index) => (
              <JobCard key={index} job={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
