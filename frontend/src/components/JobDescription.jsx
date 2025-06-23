import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Globe, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";


const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const singleJob = useSelector((state) => state.job.singleJob);
  const user = useSelector((state) => state.auth.user);
  const [isApplying, setIsApplying] = useState(false);

  // ✅ Match your job object structure: application.applicant
const isApplied = singleJob?.applications?.some(app => app?.user?._id === user?._id) || false;



  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/job/getJobById/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(SetSingleJob(res.data.job));
        }
      } catch (err) {
        toast.error("Failed to load job details");
      }
    };

    fetchJob();
  }, [jobId, dispatch]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/application/applyJob/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const updatedApplications = [...(singleJob.applications || []), res.data.application];
        dispatch(SetSingleJob({ ...singleJob, applications: updatedApplications }));
        toast.success("Applied Successfully 🎉");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Application failed");
    } finally {
      setIsApplying(false);
    }
  };

  if (!singleJob) {
    return <div className="text-center py-10">Loading job details...</div>;
  }

  const {
    title,
    company,
    location,
    jobType,
    createdAt,
    salary,
    experience,
    position,
    requirements,
    description,
    responsibilities,
    benefits,
    applications,
  } = singleJob;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="w-full min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 p-10 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#d32f2f]">{title}</h1>
            <p className="mt-1 text-gray-600 text-sm">
              at <span className="font-medium text-gray-900">{company?.name}</span>
            </p>
          </div>
          <Button
            disabled={isApplied || isApplying}
            onClick={handleApply}
            className={`${
              isApplied || isApplying
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#d32f2f] hover:bg-[#b71c1c] text-white"
            } px-6 py-3 text-sm font-medium rounded-md transition`}
          >
            {isApplying ? "Please wait..." : isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-700">
          <Info icon={<MapPin />} label={location} />
          <Info icon={<Briefcase />} label={jobType} />
          <Info icon={<Calendar />} label={`Posted: ${formattedDate}`} />
          <Info icon={<Globe />} label="Remote Available" />
          <Info icon="₹" label={`${(salary / 100000).toFixed(2)} LPA`} />
          <Info icon="Exp:" label={`${experience} years`} />
          <Info icon="🧍" label={`${position} Positions`} />
          <Info icon="📥" label={`${applications?.length || 0} Applicants`} />
        </div>

        {/* Skills */}
        <Section title="Required Skills">
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(requirements) ? requirements.map((skill, i) => (
              <ul key={i} className=" p-2 rounded-xl text-gray-800 border border-gray-300">
                <li>{skill}</li>
              </ul>
            )):
            <>
            </>
          
          }
          </div>
        </Section>

        {/* Description */}
        {description && (
          <Section title="Job Description">
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </Section>
        )}

        {/* Responsibilities */}
        {responsibilities && (
          <Section title="Responsibilities">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {responsibilities
                .split(".")
                .filter((line) => line.trim())
                .map((item, i) => (
                  <li key={i}>{item.trim()}.</li>
                ))}
            </ul>
          </Section>
        )}

        {/* Benefits */}
        {benefits && (
          <Section title="Perks & Benefits">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {benefits
                .split(".")
                .filter((b) => b.trim())
                .map((item, i) => (
                  <li key={i}>{item.trim()}.</li>
                ))}
            </ul>
          </Section>
        )}

        {/* Bottom Apply Button */}
        <div className="text-center mt-10">
          <Button
            onClick={handleApply}
            disabled={isApplied || isApplying}
            className={`${
              isApplied || isApplying
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#d32f2f] hover:bg-[#b71c1c] text-white"
            } px-10 py-4 text-md font-semibold rounded-lg`}
          >
            {isApplying ? "Please wait..." : isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-sm text-gray-800">
    <span>{typeof icon === "string" ? icon : <span className="text-gray-500">{icon}</span>}</span>
    <span>{label}</span>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
    {children}
  </div>
);

export default JobDescription;
