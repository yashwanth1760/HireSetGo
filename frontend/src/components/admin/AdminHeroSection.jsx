import React from "react";
import { Briefcase, UserPlus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminHeroSection = () => {
  return (
    <div className="w-full bg-[#fdf4f4] min-h-screen">
      {/* HERO SECTION */}
      <div className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d32f2f] mb-4">
          Find the Right Talent, Fast.
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Post jobs, manage applicants, and streamline your hiring process with
          India’s trusted hiring portal.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button className="bg-[#d32f2f] text-white px-6 py-3 rounded-lg text-sm pointer-events-none">
            <Briefcase className="mr-2" size={18} />
            Post a Job
          </Button>
        </div>
      </div>

      {/* SUCCESS STATS */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-2xl font-bold text-center text-[#1f1f1f] mb-10">
          Empowering Recruiters Across India
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-4xl font-extrabold text-[#d32f2f]">10,000+</h3>
            <p className="text-gray-600 mt-1">Jobs Successfully Posted</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-[#d32f2f]">2,500+</h3>
            <p className="text-gray-600 mt-1">Companies Onboarded</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-[#d32f2f]">98%</h3>
            <p className="text-gray-600 mt-1">Recruiter Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* COMPANIES SECTION */}
      <div className="bg-[#fffafa] py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-[#1f1f1f] mb-8">
          Trusted By Leading Companies
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["Infosys", "TCS", "Zoho", "Swiggy", "Paytm", "CRED"].map((name, idx) => (
            <div
              key={idx}
              className="px-5 py-3 bg-[#ffecec] rounded-xl font-semibold text-[#b71c1c] text-sm shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-2xl font-bold text-center text-[#1f1f1f] mb-10">
          What Recruiters Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Priya Mehta",
              company: "HR, Zoho Corp",
              text: "HireSetGo has simplified our hiring pipeline. The applicant dashboard and matching features are brilliant.",
            },
            {
              name: "Rajiv Sharma",
              company: "Talent Head, Infosys",
              text: "We received quality candidates within hours of posting. It's fast, reliable, and recruiter-friendly.",
            },
            {
              name: "Sneha Kapoor",
              company: "Recruiter, Paytm",
              text: "The best part? The simplicity. Our team loved how intuitive everything was from day one.",
            },
          ].map((review, idx) => (
            <div key={idx} className="bg-[#fff0f0] p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-3 gap-1 text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                "{review.text}"
              </p>
              <p className="font-semibold text-[#d32f2f]">{review.name}</p>
              <p className="text-sm text-gray-500">{review.company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHeroSection;
