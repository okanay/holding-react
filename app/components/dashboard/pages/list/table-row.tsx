import React from "react";
import { JobView } from "./store";

interface JobRowProps {
  Job: JobView;
}

export const JobRow: React.FC<JobRowProps> = ({ Job }) => {
  return <>Job</>;
};
