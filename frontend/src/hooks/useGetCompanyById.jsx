import { SetSingleCompany } from "@/redux/companySlice";

import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return; // safety check

    const fetchCompanyById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/getCompanyDetailsById/${id}`,
          { withCredentials: true }
        );
        if (res.data.status) {
          dispatch(SetSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("❌ Error fetching company by ID:");
      }
    };

    fetchCompanyById();
  }, [id, dispatch]); // ✅ include `id`
};

export default useGetCompanyById;
