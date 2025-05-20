import {
  DashboardApplicantProvider,
  useDashboardApplicant,
} from "@/components/dashboard/pages/applicants/store";
import { useEffect } from "react";
import { Filter } from "./filter";
import { Pagination } from "./pagination";
import { ApplicantsTable } from "./table";

export const DashboardApplicantsPage = () => {
  return (
    <DashboardApplicantProvider>
      <ApplicantsPageContent />
    </DashboardApplicantProvider>
  );
};

const ApplicantsPageContent = () => {
  const { applicants, getApplicants, applicantsStatus } =
    useDashboardApplicant();

  useEffect(() => {
    getApplicants();
  }, []);

  if (applicantsStatus !== "success") return;

  return (
    <div className="container mx-auto px-4 py-6">
      <Filter />
      <ApplicantsTable applicants={applicants} />
      <Pagination />
    </div>
  );
};
