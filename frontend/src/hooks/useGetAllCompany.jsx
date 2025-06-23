import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetAllCompanies } from "@/redux/companySlice";
import axios from "axios";


const useGetAllCompany = () => {
  const dispatch = useDispatch(); // ✅ Correct usage

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/company/getCompanyDetails`, {
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
