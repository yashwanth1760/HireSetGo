import store from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectAdminRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectAdminRoutes;
