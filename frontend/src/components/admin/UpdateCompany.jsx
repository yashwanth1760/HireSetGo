import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "../shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCompany, setAllCompanies } from "@/redux/companySlice";


const UpdateCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const company = useSelector((state) => state.companie.current);

  // Fetch company data by ID
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/getCompanyDetailsById/${id}`,
          { withCredentials: true }
        );
        if (res.data.status) {
          dispatch(setCurrentCompany(res.data.company));
        } else {
          toast.error("❌ Failed to load company data.");
        }
      } catch (err) {
        console.error("Fetch error:");
        toast.error("❌ Error fetching company.");
      }
    };
    fetchCompany();
  }, [id, dispatch]);

  // Sync Redux company data to form
  useEffect(() => {
    if (company) {
      setCompanyName(company.name || "");
      setWebsite(company.website || "");
      setLocation(company.location || "");
      setIndustry(company.industry || "");
      setDescription(company.description || "");
    }
  }, [company]);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", companyName);
      formData.append("website", website);
      formData.append("location", location);
      formData.append("industry", industry);
      formData.append("description", description);
      if (logo) formData.append("logo", logo);

      const res = await axios.put(
        `http://localhost:5000/api/company/updateCompany/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status) {
        toast.success("✅ Company updated successfully!");
        // Refresh all companies
        const refreshed = await axios.get(`http://localhost:5000/api/company/getCompanyDetails`, {
          withCredentials: true,
        });
        if (refreshed.data.status) {
          dispatch(setAllCompanies(refreshed.data.companies));
        }
        navigate("/admin/companies");
      } else {
        toast.error("❌ Update failed.");
      }
    } catch (error) {
      console.error("Update error:");
      toast.error(error?.response?.data?.message || "❌ Error updating company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Edit Company 🛠️</h2>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Name</label>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload New Logo (optional)</label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <Input value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => navigate("/admin/companies")}>
              Cancel
            </Button>
            <Button
              onClick={() => setConfirmOpen(true)}
              className="bg-[#F83002] hover:bg-[#c62828] text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "💾 Update"}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Update</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to update this company's details?</p>
          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button className="bg-[#F83002] text-white" onClick={handleUpdate}>
              Yes, Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCompany;
