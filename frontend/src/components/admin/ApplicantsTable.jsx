import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setApplicants } from "@/redux/applicationSlice";


const ApplicantsTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const allApplicant = useSelector((store) => store.application.allApplicants);

  // ✅ Fetch applicants on initial load
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/application/getApplicants/${id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.error("Failed to load applicants:");
      }
    };

    fetchAllApplicants();
  }, [dispatch, id]);

  // ✅ Accept / Reject handler
  const handleConfirm = async () => {
    const statusToSend = selectedStatus === "Accept" ? "approved" : "rejected";

    try {
      const res = await axios.post(
        `http://localhost:5000/api/application/updateStatus/${selectedApplicantId}`,
        { status: statusToSend },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(
          selectedStatus === "Accept"
            ? "✅ Applicant Accepted"
            : "❌ Applicant Rejected"
        );

        // ✅ Refetch applicants to reflect updated status
        const refreshed = await axios.get(
          `http://localhost:5000/api/application/getApplicants/${id}`,
          { withCredentials: true }
        );
        if (refreshed.data.success) {
          dispatch(setApplicants(refreshed.data.job));
        }
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Status update failed:");
      toast.error("Failed to update status.");
    } finally {
      setOpenDialog(false);
      setSelectedApplicantId(null);
    }
  };

  return (
    <div className="py-5">
      <Table>
        <TableCaption>A list of your Job Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allApplicant?.applications?.map((applicant) => (
            <TableRow key={applicant._id}>
              <TableCell className="font-medium">
                {applicant.user?.fullName}
              </TableCell>
              <TableCell>{applicant.user?.email}</TableCell>
              <TableCell>
                {applicant.user?.profile?.resume ? (
                  <a
                    href={applicant.user.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No Resume</span>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    applicant.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : applicant.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {applicant.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(applicant.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-green-600"
                      onClick={() => {
                        setSelectedStatus("Accept");
                        setSelectedApplicantId(applicant._id);
                        setOpenDialog(true);
                      }}
                    >
                      Accept Applicant
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        setSelectedStatus("Reject");
                        setSelectedApplicantId(applicant._id);
                        setOpenDialog(true);
                      }}
                    >
                      Reject Applicant
                    </Button>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className={
                selectedStatus === "Reject" ? "text-red-600" : "text-green-600"
              }
            >
              {selectedStatus} Applicant?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to{" "}
            <strong>{selectedStatus.toLowerCase()}</strong> this applicant?
            This action cannot be undone and the applicant will be notified.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              className={`text-white ${
                selectedStatus === "Reject" ? "bg-red-600" : "bg-green-600"
              }`}
              onClick={handleConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicantsTable;
