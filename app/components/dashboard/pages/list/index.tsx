import { useEffect } from "react";
import { Pagination } from "./pagination";
import { DashboardJobProvider, useDashboardJob } from "./store";
import { JobTable } from "./table";
import { Filter } from "./filter";

export const DashboardJobsListPage = () => {
  return (
    <DashboardJobProvider>
      <JobsPageContent />
    </DashboardJobProvider>
  );
};

const JobsPageContent = () => {
  const { jobs, getJobs, jobsStatus } = useDashboardJob();

  useEffect(() => {
    getJobs();
  }, []);

  if (jobsStatus !== "success") return;

  return (
    <div className="container mx-auto">
      <Filter />
      <JobTable jobs={jobs as any} />
      <Pagination />
    </div>
  );
};
