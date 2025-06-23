// src/hooks/useGetAllAdminJobs.jsx
import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllAdminJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/job/getAdminJob`, {
          withCredentials: true,
        });
        if (res.data.success) {
           (res.data.jobs); // ✅ Corrected
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          dispatch(setAllAdminJobs([]));
          console.warn("Jobs fetch failed:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:");
      }
    };

    getAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;
