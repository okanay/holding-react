import React from "react";

interface TableProps {
  jobs: Job[];
}

export const JobTable: React.FC<TableProps> = ({ jobs }) => {
  if (jobs.length <= 0) {
    return <EmptyState />;
  }

  return <table>table</table>;
};

export const EmptyState: React.FC = ({}) => {
  return <>empty</>;
};
