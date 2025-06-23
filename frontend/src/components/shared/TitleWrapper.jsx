// src/components/shared/TitleWrapper.jsx
import { useEffect } from "react";

const TitleWrapper = ({ title, children }) => {
  useEffect(() => {
    document.title = title || "HireSetGo — Smart Hiring";
  }, [title]);

  return children;
};

export default TitleWrapper;
