import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setAllCompanies } from "@/redux/companySlice";

const CreateJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/getCompanyDetails`,
          {
            withCredentials: true,
          }
        );

        if (res.data.status) {
          dispatch(setAllCompanies(res.data.companies));
        } else {
          dispatch(setAllCompanies([]));
        }
      } catch (error) {
        console.error("❌ Fetch error:");
        toast.error("Failed to fetch companies.");
      }
    };

    fetchCompanies();
  }, [dispatch]);

  const adminCompanies = useSelector((store) => store.companie.list);

  const [input, setInput] = useState({
    title: "",
    description: "",
    responsibilities: "",
    benefits: "",
    location: "",
    jobType: "",
    salary: 0,
    position: 0,
    experience: 0,
    requirements: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = async () => {
    const requiredFields = [
      "title",
      "description",
      "responsibilities",
      "benefits",
      "location",
      "jobType",
      "salary",
      "position",
      "experience",
      "requirements",
      "company",
    ];

    const anyFieldMissing = requiredFields.some((field) => {
      return !input[field] || input[field].toString().trim() === "";
    });

    if (anyFieldMissing) {
      toast.error("Please fill in all fields");
    }
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/job/post`, input, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success("Job posted successfully");
        navigate("/admin/jobs");
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
       (error);
    } finally {
      setLoading(false);
    }
  };

   (input);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-[#1f1f1f] mb-2 text-center">
          Post a Job on Hire
          <span className="text-red-600">Set</span>Go 💼
        </h2>
        <p className="text-gray-600 text-sm text-center mb-10">
          Fill in the job details to find the perfect candidate.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100">
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Job Title
            </label>
            <Input
              name="title"
              onChange={handleInput}
              placeholder="e.g. Backend Engineer"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Description
            </label>
            <Textarea
              name="description"
              onChange={handleInput}
              rows={4}
              placeholder="Job description..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Responsibilities
            </label>
            <Textarea
              name="responsibilities"
              onChange={handleInput}
              rows={4}
              placeholder="List job responsibilities..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Benefits
            </label>
            <Textarea
              name="benefits"
              onChange={handleInput}
              rows={3}
              placeholder="Perks and benefits offered..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Skills (one per line)
            </label>
            <Textarea
              name="requirements"
              onChange={handleInput}
              rows={4}
              placeholder="Skills or qualifications required..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Location
            </label>
            <Input
              type="text"
              name="location"
              onChange={handleInput}
              placeholder="e.g. Hyderabad,Remote India"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Industry
            </label>
            <Input
              type="text"
              name="industry"
              onChange={handleInput}
              placeholder="IT,Finance..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Job Type
              </label>
              <Input
                type="text"
                name="jobType"
                onChange={handleInput}
                placeholder="e.g. Full-time"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Experience Required (in years)
              </label>
              <Input
                type="number"
                name="experience"
                onChange={handleInput}
                placeholder="e.g. 3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Positions Available
              </label>
              <Input
                type="number"
                name="position"
                onChange={handleInput}
                placeholder="e.g. 10"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-800 mb-1 block">
                Salary Offered
              </label>
              <Input
                type="number"
                name="salary"
                onChange={handleInput}
                placeholder="e.g. 30000000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 mb-1 block">
              Company
            </label>
            <Select
              onValueChange={(value) => {
                setInput({ ...input, company: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {adminCompanies && adminCompanies?.length > 0 ? (
                  adminCompanies?.map((job, ind) => (
                    <SelectItem key={ind} value={job._id}>
                      {job?.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-company" disabled>
                    Register a Company Before Posting Job
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {adminCompanies?.length === 0 ? (
              <p className="text-red-600 text-sm text-center py-2">
                Register a Company Before Posting Job
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/admin/jobs");
              }}
            >
              Cancel
            </Button>

            {loading ? (
              <Button className="bg-gray-400 text-white" disabled>
                Please Wait
              </Button>
            ) : (
              <Button
                className="bg-[#F83002] hover:bg-[#c62828] text-white"
                onClick={onSubmitHandle}
              >
                🚀 Post Job
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobs;
