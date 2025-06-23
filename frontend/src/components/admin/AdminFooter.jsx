import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const AdminFooter = () => {
  return (
    <footer className="bg-[#F9FAFB] text-black py-10 px-4 border-t mt-8 border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">
            Hire<span className="text-[#D32F2F]">Set</span>Go
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Simplifying hiring for modern teams. Trusted by 2500+ companies.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-[#D32F2F]">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Admin Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-[#D32F2F]">Admin Panel</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li><Link to="/admin/jobs">Post a Job</Link></li>
            <li><Link to="/admin/applicants">Applicants</Link></li>
            <li><Link to="/admin/companies">Company Profile</Link></li>
          </ul>
        </div>

        {/* Hiring Insights */}
        <div>
          <h3 className="text-lg font-semibold text-[#D32F2F]">Hiring Insights</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>Track Applications</li>
            <li>Manage Job Listings</li>
            <li>Analytics Dashboard</li>
            <li>Recruiter Resources</li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-[#D32F2F]">About HireSetGo</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li><Link to="/about">Our Mission</Link></li>
            <li><Link to="/contact">Support</Link></li>
            <li><Link to="/about">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireSetGo Recruiter Panel. All rights reserved.
      </div>
    </footer>
  );
};

export default AdminFooter;
