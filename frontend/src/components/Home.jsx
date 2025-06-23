import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import AdminHeroSection from "./admin/AdminHeroSection";
import AdminFooter from "./admin/AdminFooter";
import UnAuthorizedHeroSection from "./auth/UnAuthorizedHeroSection";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      {!user ? (
        <>
        <UnAuthorizedHeroSection/>
        <Footer />
        </>
      ) : user.role === "student" ? (
           
        <>
        
          <HeroSection />
          <CategoryCarousel />
          <LatestJobs />
          <Footer />
        </>
      ) : (
        <>
          <AdminHeroSection />
          <AdminFooter />
        </>
      )}
    </div>
  );
};

export default Home;
