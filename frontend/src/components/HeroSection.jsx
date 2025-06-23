import React, { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBrowseSearch = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-16 px-4 bg-[#F9FAFB]  ">
      {/* Tagline Badge */}
      <span className="px-4 py-1.5 rounded-full bg-[#FFECEC] text-[#F83002] font-semibold text-sm tracking-wide">
        India’s Trusted Career Platform
      </span>

      {/* Heading */}
      <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#1F1F1F] leading-tight">
        Search, Apply & <br />
        <span className="text-[#F83002]">
          <Typewriter
            words={[
              "Find Your Dream Role",
              "Get Hired Instantly",
              "Explore New Careers",
              "Land Top Offers",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </span>
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-[#4B5563] text-base md:text-lg max-w-xl mx-auto">
        Join thousands of professionals across India discovering career
        opportunities that fit their goals.
      </p>
      <div className="mt-6 flex w-full max-w-xl mx-auto border border-gray-300 rounded-full shadow-sm overflow-hidden bg-white">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your Dream Job here..."
          className="flex-1 px-5 py-3 text-sm md:text-base text-gray-800 placeholder-gray-500 outline-none"
        />
        <button
          onClick={handleBrowseSearch}
          className="px-6 py-3   font-medium text-sm md:text-base  transition rounded-r-full"
        >
          <Search className="text-gray-700 hover:animate-pulse cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
