import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setJobFilters } from "@/redux/jobSlice";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./Footer";

const Jobs = () => {
  const dispatch = useDispatch();

  const allJobs = useSelector((store) => store.job.allJobs);
  const filters = useSelector((store) => store.job.filters) || {};

  // Safe destructuring with default arrays
  const { Location = [], Industry = [], Salary = [] } = filters;

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/job/getJob`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          dispatch(setJobFilters({ Location: [], Industry: [], Salary: [] }));
        }
      } catch (error) {
        console.error("Error fetching jobs:");
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  const filterJobs = (jobList) => {
    return jobList.filter((job) => {
      const matchesLocation =
        Location.length === 0 ||
        Location.some((loc) =>
          job.location?.toLowerCase().includes(loc.toLowerCase())
        );

      const matchesIndustry =
        Industry.length === 0 ||
        Industry.some((ind) =>
          job.industry?.toLowerCase().includes(ind.toLowerCase())
        );

      const matchesSalary =
        Salary.length === 0 ||
        Salary.some((range) => {
          const [min, max] =
            range === "25+ LPA"
              ? [25, 100000]
              : range.split(" - ").map((s) => parseFloat(s));
          const minNum = min * 100000;
          const maxNum = max * 100000;

          const salaryVal = parseFloat(job.salary);
          return salaryVal >= minNum && salaryVal <= maxNum;
        });

      return matchesLocation && matchesIndustry && matchesSalary;
    });
  };

  const filteredJobs = filterJobs(allJobs);

  return (
    <div>
      <Navbar />
      <div className="w-full">
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="scroll-thin overflow-y-auto max-h-[85vh] lg:sticky top-24 bg-white rounded-xl shadow p-4">
              <FilterCard />
            </div>

            {/* Job List */}
            <div className="w-full lg:w-[80%] text-center">
              {filteredJobs.length === 0 ? (
                <span className="text-gray-600 font-medium text-lg">
                  No jobs found matching your filters.
                </span>
              ) : (
                <div className="pb-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence mode="wait">
                      {filteredJobs.map((job) => (
                        <motion.div
                          key={job._id}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.2 }}
                        >
                          <JobCard job={job} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Jobs;
