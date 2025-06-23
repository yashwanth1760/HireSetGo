import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    location: user?.profile?.location || "",
    linkedin: user?.profile?.linkedin || "",
    profile: null,
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const { name } = e.target;
    if (file) {
      setInput((prev) => ({ ...prev, [name]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("location", input.location);
    formData.append("linkedin", input.linkedin);

    if (input.profile) formData.append("profile", input.profile);
    if (input.resume) formData.append("resume", input.resume);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success("Profile Updated Successfully");
        setOpen(false);
        navigate("/profile");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-h-[90vh] overflow-y-scroll"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#1a1a1a]">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={input.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={input.phoneNumber}
                onChange={handleChange}
                placeholder="+91 XXXXX-XXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={input.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                name="linkedin"
                value={input.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={handleChange}
              placeholder="HTML, CSS, JavaScript"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profile">Upload Profile Image (PNG/JPG)</Label>
            <Input
              id="profile"
              name="profile"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Upload Resume (PDF)</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
            />
          </div>

          {loading ? (
            <Button
              type="submit"
              disabled
              className="w-full bg-red-600 hover:bg-red-700 text-white mt-2 cursor-not-allowed"
            >
              Submitting...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white mt-2"
            >
              Save Changes
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
