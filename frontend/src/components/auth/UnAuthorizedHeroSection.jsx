import React from "react";
import { UserPlus, Briefcase, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const metrics = [
  { number: "1,000+", label: "Jobs Posted" },
  { number: "500+", label: "Successful Hires" },
  { number: "200+", label: "Active Recruiters" },
  { number: "1200+", label: "Students Placed" },
];

const companies = ["TCS", "Wipro", "Infosys", "Zoho", "Accenture", "Amazon"];

const reviews = [
  {
    name: "Ananya Verma",
    role: "Placed as UI/UX Designer",
    review:
      "HireSetGo made my job hunt so much easier. Within a week of applying, I landed an interview and got placed at a startup in Bangalore!",
  },
  {
    name: "Siddharth Rao",
    role: "Backend Developer at SaaSify",
    review:
      "I loved how clear the job postings were and how easily I could connect with recruiters. Super helpful for freshers like me!",
  },
  {
    name: "Meena Raghavan",
    role: "HR at EduTech India",
    review:
      "We received quality applicants within hours of posting. The dashboard makes filtering and shortlisting candidates very efficient.",
  },
  {
    name: "Vikram Patel",
    role: "Placed as Full Stack Developer",
    review:
      "After months of struggling with generic job sites, HireSetGo gave me direct access to real tech opportunities. Highly recommended!",
  },
];

const UnAuthorizedHeroSection = () => {
  return (
    <div className="w-full  text-center pb-20">
      {/* HERO CTA */}
      <div className="py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#d32f2f] mb-4">
          Your Career Starts Here.
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Whether you're here to hire or to get hired, HireSetGo makes it easy.
          Join India’s fastest growing job & recruitment platform.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white px-6 py-3 rounded-lg text-sm">
            <Link to="/signup">
              <div className="flex">
                <UserPlus className="mr-2" size={18} />
                Sign Up as Student
              </div>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="text-[#d32f2f] border-[#d32f2f] hover:bg-[#ffecec] px-6 py-3 rounded-lg text-sm"
          >
            <Link to="/signup">
              <div className="flex">
                <Briefcase className="mr-2" size={18} />
                Sign Up as Recruiter
              </div>
            </Link>
          </Button>
        </div>
      </div>

      {/* SUCCESS METRICS */}
      <div className="py-14 bg-[#F9FAFB] px-4">
        <h2 className="text-2xl font-bold mb-8 text-[#1f1f1f]">
          Our Impact So Far
        </h2>
        <div className="flex justify-center gap-12 flex-wrap text-left max-w-5xl mx-auto">
          {metrics.map((item, idx) => (
            <div key={idx}>
              <h3 className="text-3xl font-bold text-[#d32f2f]">
                {item.number}
              </h3>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMPANIES */}
      <div className="bg-white py-12 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-[#1f1f1f]">
          Companies Hiring from Us
        </h2>
        <div className="flex justify-center flex-wrap gap-6">
          {companies.map((company, idx) => (
            <div
              key={idx}
              className="bg-white px-6 py-4 rounded-xl shadow border border-gray-200 text-gray-700 font-semibold"
            >
              {company}
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="bg-[#F9FAFB] py-14 px-4">
        <h2 className="text-2xl font-semibold mb-10 text-[#1f1f1f]">
          Hear From Our Users
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto text-left">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-2 text-[#d32f2f]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#d32f2f" stroke="none" />
                ))}
              </div>
              <p className="text-gray-800 text-sm mb-3">{item.review}</p>
              <p className="text-sm font-semibold text-[#1f1f1f]">
                {item.name}{" "}
                <span className="text-gray-500"> – {item.role}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnAuthorizedHeroSection;
