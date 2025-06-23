import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// You'll need to download these from simpleicons.org or use a library like react-icons
import { FaInstagram, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";

const Footer = () => {
  const { user } = useSelector((store) => store.auth);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === null) {
      navigate("/login");
    } else {
      if (value === "") {
        toast.error("Please enter your email");
      } else {
        toast.success("Thanks for reaching out!");
        setValue("");
      }
    }
  };

  return (
    <footer className="bg-[#F9FAFB] text-black py-10 px-4 border-t mt-8 border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold ">
            Hire<span className="text-[#F83002]">Set</span>Go
          </h2>
          <p className="mt-2 text-gray-600 text-sm">
            Your trusted partner in finding career opportunities that matter.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-[#38567D]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#38567D]">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && user.role == "student" ? (
              <li>
                <Link to="/jobs">Browse Jobs</Link>
              </li>
            ) : (
              ""
            )}

            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Roles */}
        <div>
          <h3 className="text-lg font-semibold text-[#38567D]">
            Popular Roles
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li>Frontend Developer</li>
            <li>Backend Engineer</li>
            <li>Product Manager</li>
            <li>UI/UX Designer</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-[#38567D]">Subscribe</h3>
          <p className="mt-2 text-sm text-gray-600">
            Get the latest job updates delivered to your inbox.
          </p>
          <div className="mt-4 flex items-center border border-gray-300 rounded-full overflow-hidden">
            <input
              type="email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent px-4 py-2 text-sm w-full outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#F83002] hover:bg-red-600 px-4 py-2 text-sm font-medium text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HireSetGo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
