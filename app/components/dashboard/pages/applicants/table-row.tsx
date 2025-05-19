import React, { useState } from "react";
import { User } from "lucide-react";
import { Applicant } from "../../store";
import { formatDate } from "@/utils/format-date";
import { ApplicantFormView } from "./form-view";

interface ApplicantRowProps {
  applicant: Applicant;
}

export const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant }) => {
  const [open, setOpen] = useState(false);
  const formData = JSON.parse(applicant.formJson);

  return (
    <li>
      <button
        className={`flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-zinc-50`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 overflow-hidden">
          <h3 className="truncate font-medium text-zinc-900">
            {applicant.fullName}
          </h3>
          <p className="truncate text-sm text-zinc-500">
            {formData.jobTitle || "Bilinmeyen Pozisyon"}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1 rounded-full px-2 text-xs font-medium">
              {applicant.status}
            </span>
            <span className="text-xs text-zinc-400">
              {formatDate(applicant.createdAt, "tr")}
            </span>
          </div>
        </div>
      </button>

      <div
        aria-expanded={!open}
        className={`grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out aria-expanded:grid-rows-[0fr]`}
      >
        <div className="overflow-hidden transition-[grid-template-rows] duration-300 ease-out">
          <ApplicantFormView
            json={applicant.formJson}
            formType={applicant.formType}
          />
        </div>
      </div>
    </li>
  );
};
