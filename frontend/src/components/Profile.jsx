import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, MapPin, FileText } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto
                      ? user?.profile?.profilePhoto
                      : "https://github.com/shadcn.png"
                  }
                  alt="User Avatar"
                />
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">
                  {user?.fullName || "Your Name"}
                </h1>

                {user?.role === "student" ? (
                  <>
                    <p className="text-gray-600 text-sm max-w-sm">
                      {user?.profile?.bio ||
                        "Passionate full-stack developer with a focus on performance, accessibility, and clean UI."}
                    </p>
                  </>
                ) : (
                  <>
                   <p className="text-gray-600 text-sm max-w-sm">Recruiter/Admin</p>
                  </>
                )}
              </div>
            </div>
            <Button
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white transition"
              onClick={() => setOpen(!open)}
            >
              <Pen size={16} /> Edit Profile
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" size={20} />
              <span className="text-gray-800">
                {user?.email || "Not Provided"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Contact className="text-gray-500" size={20} />
              <span className="text-gray-800">
                {user?.phoneNumber || "Not Provided"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-500" size={20} />
              <span className="text-gray-800">
                {user?.profile?.location || "Location not added"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaLinkedin className="text-gray-500" size={20} />
              {user?.profile?.linkedin ? (
                <a
                  href={user.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.profile.linkedin}
                </a>
              ) : (
                <span className="text-gray-500">Not Linked</span>
              )}
            </div>
          </div>

          {/* Skills */}
          <div>
            {user?.role === "student" ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                {user?.profile?.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="text-sm px-3 py-1 capitalize border border-black bg-white text-black font-bold"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Not Added</p>
                )}
              </>
            ) : (
              <></>
            )}
          </div>

          {/* Resume */}
          <div className="grid w-full items-start gap-2">
            <Label className="text-md font-bold flex items-center gap-2">
              <FileText size={18} /> Resume
            </Label>
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={user?.profile?.resume}
                className="text-blue-600 hover:underline"
              >
                {user.profile.resumeOriginalName || "Download Resume"}
              </a>
            ) : (
              <span className="text-gray-500">Not Uploaded (Add Resume To Stand out)</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}

        {user?.role === "student" ? (
          <>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 my-2">
              <h1>Applied Jobs</h1>
              <AppliedJobTable />
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Update Dialog */}
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
