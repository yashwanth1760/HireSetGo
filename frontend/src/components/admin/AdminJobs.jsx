import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import JobsTable from "./JobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input,setInput]= useState("");
    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[input]);
  return (
    <div>
      <Navbar />
      <div className="w-full b">
        <div className="max-w-5xl mx-auto my-10">
          <div className="flex items-center justify-between gap-2">
            <Input placeholder="Filter by Role or Company" 
            onChange ={(e)=>setInput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/job/create")} >New Job</Button>
          </div>
          <div className="my-2">
            <JobsTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
