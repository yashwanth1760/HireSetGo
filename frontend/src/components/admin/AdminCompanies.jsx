import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const AdminCompanies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input,setInput]= useState("");
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
  return (
    <div>
      <Navbar />
      <div className="w-full b">
        <div className="max-w-5xl mx-auto my-10">
          <div className="flex items-center justify-between gap-2">
            <Input placeholder="Filter by name" 
            onChange ={(e)=>setInput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/companies/create")} >New Company</Button>
          </div>
          <div className="my-2">
            <CompaniesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanies;
