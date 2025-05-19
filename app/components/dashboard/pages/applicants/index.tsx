import { useEffect } from "react";
import { DashboardProvider, useDashboard } from "../../store";
import { ApplicantsTable } from "./table";

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
      {/* İçerik */}
      <div className="grid grid-cols-1 gap-6">
        {/* Başvuran Listesi */}
        <ApplicantsTable applicants={applicants} />
      </div>
    </div>
  );
};
