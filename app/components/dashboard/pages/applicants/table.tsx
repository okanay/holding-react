import React from "react";
import { Applicant } from "../../store";
import { ApplicantRow } from "./table-row";

interface TableProps {
  applicants: Applicant[];
}

export const ApplicantsTable: React.FC<TableProps> = ({ applicants }) => {
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
