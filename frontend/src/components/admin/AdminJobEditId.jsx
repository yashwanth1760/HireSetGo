import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Mail } from "lucide-react";

const AdminJobEditId = () => {
  const navigate = useNavigate();

  const mailTo = `mailto:chalamallan11@gmail.com?subject=Request to Delete a Job Posting&body=Hello Team,%0D%0A%0D%0AI would like to request the deletion of the following job:%0D%0A%0D%0A- Job Title: [Your Job Title]%0D%0A- Job ID: [Your Job ID]%0D%0A%0D%0AReason (optional): [Add your reason here]%0D%0A%0D%0AThank you,%0D%0A[Your Name]`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="text-yellow-600" size={28} />
          <h2 className="text-xl font-semibold text-yellow-700">
            Deletion Request Required
          </h2>
        </div>

        <p className="text-gray-700 mb-4">
          For security and moderation reasons, deletion of job postings must be
          approved by our internal team.
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-5">
          <li>Your job posting cannot be deleted directly from this panel.</li>
          <li>To proceed, please email us the job details.</li>
          <li>Our team will respond to your request within 24 hours.</li>
        </ul>

        <p className="text-gray-600 mb-6">
          Click the button below to open your email client. We've pre-filled the
          message for you.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)} // Go back
          >
            Cancel
          </Button>
          <a href={mailTo}>
            <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
              <Mail size={16} /> Continue & Email Us
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminJobEditId;
