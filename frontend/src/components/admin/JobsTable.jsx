import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Edit2,
  Briefcase,
  Calendar,
  IndianRupee,
  View,
  Eye,
  MoreHorizontalIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { useNavigate } from "react-router-dom";

const JobsTable = () => {


  useGetAllAdminJobs();
  const navigate = useNavigate();

  const allAdminJobs = useSelector((state) => state.job.allAdminJobs);
  const searchJobByText = useSelector((state) => state.job.searchJobByText);

  const [filterJobs, setFilterJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const filtered =
      allAdminJobs?.filter((job) => {
        if (!searchJobByText) return true;
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      }) || [];
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  const handleConfirmEdit = () => {
    if (selectedJobId) {
       navigate(`/admin/job/${selectedJobId}`)
      setOpen(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#1f1f1f] mb-6">Jobs Posted</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filterJobs?.length > 0 ? (
          filterJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-gray-50 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={job?.company?.logo}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                    alt="Logo"
                  />
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500">{job?.company?.name}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{job.jobType}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{job.salary}</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Popover>
                  <PopoverTrigger>
                    <div className="flex items-center justify-center gap-2">
                      <MoreHorizontalIcon/>
                       
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      className="bg-[#F83002] hover:bg-[#F830020e] flex items-center gap-1"
                      onClick={() => {
                        setSelectedJobId(job._id);
                        setOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                      Delete Job
                    </Button>
                    <Button
                      variant="ghost"
                      className="bg-[#F83002] hover:bg-[#F830020e] flex items-center gap-1"
                      onClick={() =>{
                         navigate(`/admin/job/${job._id}/applicants`)
                      }}
                    >
                      <Eye size={16} />
                      View Details
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">No jobs found.</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to Delete this job’s details?</p>
          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#F83002] text-white"
              onClick={handleConfirmEdit}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsTable;
