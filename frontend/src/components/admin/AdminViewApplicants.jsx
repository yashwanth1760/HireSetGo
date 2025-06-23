import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const AdminViewApplicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const allApplicant = useSelector(store=>store.application.allApplicants);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/application/getApplicants/${id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
         (error);
      }
    };
    fetchAllApplicants();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-6">
        <h3>Applicants({allApplicant?.applications?.length})</h3>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default AdminViewApplicants;
