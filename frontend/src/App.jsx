import React from "react";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import NotFound from "./components/shared/NotFound";
import TitleWrapper from "./components/shared/TitleWrapper";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import AdminCompanies from "./components/admin/AdminCompanies";
import AdminJobs from "./components/admin/AdminJobs";
import CreateCompany from "./components/admin/CreateCompany";
import UpdateCompany from "./components/admin/UpdateCompany";
import CreateJobs from "./components/admin/CreateJobs";
import AdminJobEditId from "./components/admin/AdminJobEditId";
import AdminViewApplicants from "./components/admin/AdminViewApplicants";
import AdminCompanyDelete from "./components/admin/AdminCompanyDelete";
import About from "./components/About";
import PrepPage from "./components/Prep";
import ContactPage from "./components/Contact";
import ProtectAdminRoutes from "./components/admin/ProtectAdminRoutes";
import ProtectUserRoutes from "./components/ProtectUserRoutes";
import ProtectAdminUserRoutes from "./components/ProtectAdminUserRoutes";
import ScrollToTopLayout from "./components/shared/ScrollToTopLayout";

const appRouter = createBrowserRouter([
  {
    element: <ScrollToTopLayout />,
    children: [
      {
        path: "/",
        element: (
          <TitleWrapper>
            <Home />
          </TitleWrapper>
        ),
      },
      {
        path: "/login",
        element: (
          <TitleWrapper title="Login | HireSetGo">
            <Login />
          </TitleWrapper>
        ),
      },
      {
        path: "/signup",
        element: (
          <TitleWrapper title="Signup | HireSetGo">
            <Signup />
          </TitleWrapper>
        ),
      },
      {
        path: "/jobs",
        element: (
          <TitleWrapper title="Jobs | HireSetGo">
            <ProtectUserRoutes>
              <Jobs />
            </ProtectUserRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/browse",
        element: (
          <TitleWrapper title="Browse | HireSetGo">
            <ProtectUserRoutes>
              <Browse />
            </ProtectUserRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/profile",
        element: (
          <TitleWrapper title="Profile | HireSetGo">
            <ProtectAdminUserRoutes>
              <Profile />
            </ProtectAdminUserRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/description/:id",
        element: (
          <TitleWrapper title="Job Details">
            <ProtectUserRoutes>
              <JobDescription />
            </ProtectUserRoutes>
          </TitleWrapper>
        ),
      },

      {
        path: "/prep",
        element: (
          <TitleWrapper title="Preparation">
            <ProtectUserRoutes>
              <PrepPage />
            </ProtectUserRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/contact",
        element: (
          <TitleWrapper title="Preparation">
            <ContactPage />
          </TitleWrapper>
        ),
      },
      {
        path: "/about",
        element: (
          <TitleWrapper title="About | HireSetGo">
            <About />
          </TitleWrapper>
        ),
      },
      // admin ke liye yja se start hoga

      {
        path: "/admin/companies",
        element: (
          <TitleWrapper title="Admin | Companies">
            <ProtectAdminRoutes>
              <AdminCompanies />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <TitleWrapper title="Admin | Jobs">
            <ProtectAdminRoutes>
              <AdminJobs />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <TitleWrapper title="Create Company">
            <ProtectAdminRoutes>
              <CreateCompany />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <TitleWrapper title="Company | HireSetGo">
            <ProtectAdminRoutes>
              <UpdateCompany />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/job/create",
        element: (
          <TitleWrapper title="Create Job | HireSetGo">
            <ProtectAdminRoutes>
              <CreateJobs />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/job/:id",
        element: (
          <TitleWrapper title="Delete Job ⚠️">
            <ProtectAdminRoutes>
              <AdminJobEditId />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },

      {
        path: "/admin/job/:id/applicants",
        element: (
          <TitleWrapper title="Applicants">
            <ProtectAdminRoutes>
              <AdminViewApplicants />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },
      {
        path: "/admin/company/delete",
        element: (
          <TitleWrapper title="Delete Company ⚠️">
            <ProtectAdminRoutes>
              <AdminCompanyDelete />
            </ProtectAdminRoutes>
          </TitleWrapper>
        ),
      },

      {
        path: "*",
        element: (
          <TitleWrapper title="404 | Page Not Found">
            <NotFound />
          </TitleWrapper>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
