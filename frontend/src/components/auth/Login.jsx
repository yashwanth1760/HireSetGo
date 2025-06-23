import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import store from "@/redux/store";
import { USER_API_END_POINT } from "@/utils/constant";

const Login = () => {
  useEffect(() => {
    document.title = "Login | HireSetGo";
  }, []);

  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      email: input.email,
      password: input.password,
      role: input.role,
    };

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/user/login`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success("Login Success");
      }
      if (res.data.success === false) {
        toast.error("Invalid Email or Password");
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
            Login
          </h1>

          {/* Email */}
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

          {/* Password */}
          <div className="my-2 flex flex-col gap-1">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {/* Role Radio Buttons */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 my-5">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black"
                />
                <Label>Student</Label>
              </label>
              <label className="flex items-center gap-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer accent-black"
                />
                <Label>Recruiter</Label>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            {loading ? (
              <Button
                type="submit"
                className="w-full my-3 text-sm md:text-base bg-[#F83002] hover:bg-red-700 text-white"
              >
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-3 text-sm md:text-base bg-[#F83002] hover:bg-red-700 text-white"
              >
                Login
              </Button>
            )}

            <h4 className="text-sm text-muted-foreground text-center">
              Don’t have an account?
              <span className="mx-2 text-md text-black">
                <Link to="/signup">Signup</Link>
              </span>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
