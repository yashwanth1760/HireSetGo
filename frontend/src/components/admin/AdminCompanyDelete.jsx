import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Mail } from "lucide-react";

const AdminCompanyDelete = () => {
  const navigate = useNavigate();

  const mailTo = `mailto:chalamallan11@gmail.com?subject=Request to Delete a Company Profile&body=Hello Team,%0D%0A%0D%0AI would like to request the deletion of the following company profile:%0D%0A%0D%0A- Company Name: [Your Company Name]%0D%0A- Company ID: [Your Company ID]%0D%0A%0D%0AReason for Deletion (optional): [Add your reason here]%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl border border-gray-200">
        {/* Header with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-yellow-600" size={28} />
          <h2 className="text-xl font-semibold text-yellow-700">
            Company Deletion Requires Manual Review
          </h2>
        </div>

        {/* Info Message */}
        <p className="text-gray-700 mb-4">
          For compliance and verification purposes, deletion of company profiles
          is restricted and must be reviewed by our support team.
        </p>

        {/* Guidelines */}
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-5">
          <li>Company profiles cannot be deleted directly from this panel.</li>
          <li>To proceed, please send us a formal request via email.</li>
          <li>Ensure that the company ID and reason (if any) are clearly mentioned.</li>
          <li>We typically respond to such requests within <strong>24 hours</strong>.</li>
        </ul>

        <p className="text-gray-600 mb-6">
          Click the button below to open your email client with a pre-filled message.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <a href={mailTo}>
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <Mail size={16} />
              Continue & Email Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyDelete;
