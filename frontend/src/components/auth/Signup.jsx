import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import store from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { USER_API_END_POINT } from "@/utils/constant";

const Signup = () => {
  useEffect(() => {
    document.title = "Signup | HireSetGo";
  }, []);

  useGetAllJobs()

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    ///calling backend logic api
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/user/register`, formData, {
        //This sends a POST request to the backend API (typically to register a user) and waits for the response. axios is a popular JavaScript library used to make HTTP requests from the browser or Node.js.
        headers: { "Content-Type": "multipart/form-data" }, // ells the server how the data is encoded. multipart/form-data is necessary for file uploads. Axios sets this automatically when you send a FormData object — but it’s fine to declare it manually.
        withCredentials: true, //This tells the browser to include credentials (like cookies, JWT tokens in cookies, etc.) in cross-origin requests.
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/login");
        toast.success("User created successfully");
      }
    } catch (error) {
      const msg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong";
      toast.error(msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 border border-gray-200 rounded-md p-5 my-10"
        >
          <h1 className="font-bold text-xl md:text-2xl mb-5 text-center md:text-left">
            Sign Up
          </h1>

          <div className="my-2 flex flex-col gap-1">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          <div className="my-2 flex flex-col gap-1">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="my-2 flex flex-col gap-1">
            <Label>Phone Number</Label>
            <Input
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
          </div>

          <div className="my-2 flex flex-col gap-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              autoComplete="new-password"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-5">
            <RadioGroup defaultValue="comfortable" className="flex gap-4">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer  accent-black "
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black "
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div>
            {loading ? (
              <Button
                type="submit"
                className="w-full my-3 text-sm md:text-base bg-[#F83002] hover:bg-red-700 text-white"
              >
               <Loader2 className="animate-spin mr-2 w-4 h-4"/>  Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-3 text-sm md:text-base bg-[#F83002] hover:bg-red-700 text-white"
              >
                Signup
              </Button>
            )}

            <h4 className="text-sm text-muted-foreground text-center">
              Already have an account?
              <span className="mx-2 text-md text-black">
                <Link to="/login">Login</Link>
              </span>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
