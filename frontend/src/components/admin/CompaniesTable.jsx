import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setAllCompanies } from "@/redux/companySlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const CompaniesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((store) => store.companie.list);
  const searchCompanyByText = useSelector(
    (store) => store.companie.searchCompanyByText
  );
  const [open, setOpen] = useState(false);
  const [deleteOPen,setDeleteOPen] = useState(false);

  const [selectedCompanyId, setSelectedCompanyId] = useState(null); // 👈
  const [filterCompany, setfilterCompany] = useState(companies);

  // Fetch all companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/company/getCompanyDetails`,
          {
            withCredentials: true,
          }
        );

        if (res.data.status) {
          dispatch(setAllCompanies(res.data.companies));
        } else {
          dispatch(setAllCompanies([]));
        }
      } catch (error) {
        console.error("❌ Fetch error:");
        toast.error("Failed to fetch companies.");
      }
    };

    fetchCompanies();
  }, [dispatch]);

  // Handle edit confirmation
  const handleConfirmEdit = () => {
    if (selectedCompanyId) {
      navigate(`/admin/companies/${selectedCompanyId}`);
      setOpen(false);
    }
  };

  const handleDeleteConfirm=()=>{
     navigate("/admin/company/delete");
     setDeleteOPen(false);
  }

  useEffect(() => {
    const filteredCompany =
      companies?.length > 0 &&
      companies.filter((com) => {
        if (!searchCompanyByText) {
          return true;
        }

        return com?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });

    setfilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#1f1f1f] mb-4">
        Registered Companies
      </h2>
      <Table>
        <TableCaption className="text-sm text-gray-500">
          A list of your recently registered companies.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date Registered</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany && filterCompany.length > 0 ? (
            filterCompany.map((company, index) => (
              <TableRow key={company._id || index}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={company.logo} alt={company.name} />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="flex items-center gap-1 text-sm text-[#d32f2f] hover:underline"
                        onClick={() => setSelectedCompanyId(company._id)}
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 p-2 rounded-xl shadow-lg border border-gray-200 bg-white">
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => {
                            setSelectedCompanyId(company._id);
                            setOpen(true);
                          }}
                          className="text-sm justify-start text-blue-600 hover:bg-blue-50"
                          variant="ghost"
                        >
                          ✏️ Edit company details
                        </Button>

                        <Button
                          onClick={() => {
                            setDeleteOPen(true);
                          }}
                          className="text-sm justify-start text-red-600 hover:bg-red-50"
                          variant="ghost"
                        >
                          🗑️ Delete company details
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Dialog for Confirm Edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Edit</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to edit this company's details?</p>
          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#F83002] text-white"
              onClick={handleConfirmEdit}
            >
              Yes, Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={deleteOPen} onOpenChange={setDeleteOPen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to Delete this company's details?</p>
          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#F83002] text-white"
              onClick={handleDeleteConfirm}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompaniesTable;


// navigate("/admin/company/delete");
