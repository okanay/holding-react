import { useEffect } from "react";
import { DashboardProvider, useDashboard } from "../../store";
import { ApplicantsTable } from "./table";
import { Pagination } from "./pagination";
import { Filter } from "./filter";

export const DashboardApplicantsPage = () => {
  return (
    <DashboardProvider>
      <ApplicantsPageContent />
    </DashboardProvider>
  );
};

const ApplicantsPageContent = () => {
  const { applicants, getApplicants, applicantsStatus } = useDashboard();

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
