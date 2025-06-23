import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { resetAuth } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import { resetJobState } from "@/redux/jobSlice";
import { resetCompany } from "@/redux/companySlice";
import { resetApplicationState } from "@/redux/applicationSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(resetApplicationState());
        dispatch(resetAuth());
        dispatch(resetCompany());
        dispatch(resetJobState());
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const commonLinks =
    user?.role === "student"
      ? [
          { to: "/", label: "Home" },
          { to: "/jobs", label: "Jobs" },
          { to: "/prep", label: "Prepare" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact Us" },
        ]
      : user?.role === "recruiter"
      ? [
          { to: "/", label: "Home" },
          { to: "/admin/companies", label: "Companies" },
          { to: "/admin/jobs", label: "Jobs" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact Us" },
        ]
      : [];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-2xl font-bold">
          Hire<span className="text-[#F83002]">Set</span>Go
        </Link>

        {/* Large screen nav links */}
        <ul className="hidden lg:flex font-medium items-center gap-6 text-gray-700">
          {commonLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-[#F83002]">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth section */}
        <div className="lg:flex items-center gap-4 hidden">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-gray-300">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F83002] hover:bg-red-700 text-white">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="User"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName || "User"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || user.email}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-gray-700">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link" className="p-0 h-auto">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile avatar/login */}
        <div className="block lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex flex-col gap-3">
                {user &&
                  commonLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-sm font-medium hover:text-[#F83002]"
                    >
                      {link.label}
                    </Link>
                  ))}
                <hr />
                {!user ? (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="bg-[#F83002] hover:bg-red-700 text-white w-full">
                        Signup
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto ||
                            "https://github.com/shadcn.png"
                          }
                          alt="User"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">
                          {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-left">
                      <Link className="text-left" to="/profile">
                        View Profile
                      </Link>
                    </Button>
                    <Button
                      variant="link"
                      className="text-left px-0"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
