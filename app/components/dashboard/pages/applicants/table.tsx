import React from "react";
import { ApplicantRow } from "./table-row";
import { SearchX, RefreshCw, Filter } from "lucide-react";
import { Applicant, useDashboardApplicant } from "./store";
import { EmptyState } from "./table-empty";

interface TableProps {
  applicants: Applicant[];
}

export const ApplicantsTable: React.FC<TableProps> = ({ applicants }) => {
  if (applicants.length <= 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white">
      <ul className="divide-y divide-zinc-100 overflow-hidden">
        {applicants.map((applicant) => (
          <ApplicantRow key={applicant.id} applicant={applicant} />
        ))}
      </ul>
    </div>
  );
};
