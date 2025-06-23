import React from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import AboutPng from "../../src/assets/About.png"

const About = () => {
  return (
<>
    
    <Navbar/>
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Empowering India's Workforce with{" "}
            <span className="text-[#38567d]">Smarter Hiring</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            At HireSetGo, we're not just a job portal — we’re a movement to
            reshape the way talent and opportunity meet in a fast-evolving
            world.
          </p>
        </div>

        {/* Section: Our Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-semibold text-[#38567d] mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Founded with a vision to eliminate hiring friction in India’s
              growing tech ecosystem, HireSetGo bridges job seekers and
              companies with seamless experiences.
            </p>
            <p className="text-lg text-gray-700">
              From AI-powered interview prep to real-time job tracking and
              resume building, our platform is crafted for the modern workforce.
            </p>
          </div>
          <img
            src={AboutPng}
            alt="Our Journey"
            className="rounded-xl w-full shadow-lg"
          />
        </div>

        {/* Section: Our Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-[#38567d] mb-6 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-[#f9fafb] rounded-xl shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600 text-sm">
                We blend AI and automation to bring futuristic hiring solutions
                to today’s market.
              </p>
            </div>
            <div className="p-6 bg-[#f9fafb] rounded-xl shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600 text-sm">
                Clear job listings, verified companies, and real-time
                application tracking.
              </p>
            </div>
            <div className="p-6 bg-[#f9fafb] rounded-xl shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Empowerment
              </h3>
              <p className="text-gray-600 text-sm">
                Helping students, freshers & professionals take control of their
                careers.
              </p>
            </div>
            <div className="p-6 bg-[#f9fafb] rounded-xl shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Impact</h3>
              <p className="text-gray-600 text-sm">
                We’re building for the next billion — one opportunity at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-[#f9fafb] p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#38567d] mb-3">
              🚀 Our Mission
            </h3>
            <p className="text-gray-700">
              To empower individuals and startups through transparent job
              discovery, AI-powered preparation tools, and streamlined hiring
              experiences.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-[#f9fafb] p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#38567d] mb-3">
              💡 What We Offer
            </h3>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Verified job listings curated for relevance</li>
              <li>Resume builder & interview prep guides</li>
              <li>Admin panel for companies to post & manage jobs</li>
              <li>Real-time applicant tracking system</li>
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-[#f9fafb] p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#38567d] mb-3">
              🌐 Our Vision
            </h3>
            <p className="text-gray-700">
              We envision a future where career growth is accessible, inclusive,
              and data-driven — transforming how hiring happens across India and
              beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;
