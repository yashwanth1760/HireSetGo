import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";

const ScrollToTopLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return <Outlet />;
};

export default ScrollToTopLayout;
