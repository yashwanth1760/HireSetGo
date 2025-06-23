import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllUserJobs } from "@/redux/jobSlice";

const AppliedJobTable = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUserJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/application/getAppliedJobs`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllUserJobs(res.data.application));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:");
      }
    };

    fetchAllUserJobs();
  }, [dispatch]);

  const appliedJobs = useSelector((store) => store.job.allUserJobs);

  return (
    <div className="w-full overflow-x-auto py-4">
      <Table>
        <TableCaption className="text-sm text-muted-foreground">
          A list of your recently applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs?.map((jb, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(jb.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{jb?.job?.title || "N/A"}</TableCell>
              <TableCell>{jb?.job?.company?.name || "N/A"}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    jb.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : jb.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {jb.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
