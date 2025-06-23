import store from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectUserRoutes = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role!=="student") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectUserRoutes;
