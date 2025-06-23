import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetAllCompanies } from "@/redux/companySlice";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";


const useGetAllCompany = () => {
  const dispatch = useDispatch(); // ✅ Correct usage

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/company/getCompanyDetails`, {
          withCredentials: true,
        });

        if (res.data.status) {
           ("Fetched Companies:", res.data.companies);
          dispatch(SetAllCompanies(res.data.companies)); // ✅ Array
        } else {
          dispatch(SetAllCompanies([]));
        }
      } catch (error) {
        console.error("❌ Error fetching companies:");
      }
    };

    fetchCompanies();
  }, [dispatch]);
};

export default useGetAllCompany;
