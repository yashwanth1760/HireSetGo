import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAllCompanies } from "@/redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("Techve Solutions");
  const [description, setDescription] = useState(
    "A leading provider of innovative IT solutions and services."
  );
  const [website, setWebsite] = useState("https://techverse.com");
  const [location, setLocation] = useState("Hyderabad, India");
  const [industry, setIndustry] = useState("IT");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const registerNewCompany = async () => {
    if (
      !companyName ||
      !description ||
      !website ||
      !location ||
      !industry ||
      !logo
    ) {
      toast.error("⚠️ Please fill all fields and upload a logo.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("description", description);
      formData.append("website", website);
      formData.append("location", location);
      formData.append("industry", industry);
      formData.append("logo", logo);

      const res = await axios.post(
        `http://localhost:5000/api/company/registerCompany`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        toast.success("✅ Company registered successfully!");

        // Refresh list
        const refreshed = await axios.get(
          `http://localhost:5000/api/company/getCompanyDetails`,
          {
            withCredentials: true,
          }
        );

        if (refreshed.data.status) {
          dispatch(setAllCompanies(refreshed.data.companies));
        }

        navigate("/admin/companies");
      } else {
        toast.error("❌ Failed to register company.");
      }
    } catch (error) {
      console.error("Error registering company:");
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#1f1f1f] mb-2 text-center">
          Showcase Your Company on Hire
          <span className="text-red-600">Set</span>Go 🚀
        </h2>
        <p className="text-gray-600 text-sm text-center mb-10">
          Fill in the details below to showcase your organization to thousands
          of job seekers.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Company Name
            </label>
            <Input
              placeholder="e.g. Techve Solutions"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Website
            </label>
            <Input
              placeholder="https://yourcompany.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Upload Company Logo
            </label>
            <Input
              type="file"
              name="logo"
              accept="image/*"
              onChange={onFileUpload}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Company Location
            </label>
            <Input
              placeholder="e.g. Hyderabad, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Industry
            </label>
            <Input
              placeholder="e.g. IT, Healthcare, Education"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Description
            </label>
            <Textarea
              rows={4}
              placeholder="Describe what your company does and your mission."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#F83002] hover:bg-[#c62828] text-white"
              onClick={registerNewCompany}
              disabled={loading}
            >
              {loading ? "Registering..." : "🚀 Register Company"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
