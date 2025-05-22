import React from "react";
import { JobView } from "./store";
import { JobRow } from "./table-row";
import { EmptyState } from "./table-empty";

interface TableProps {
  jobs: JobView[];
}

export const JobTable: React.FC<TableProps> = ({ jobs }) => {
  if (!jobs || jobs.length <= 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-zinc-200">
          <thead className="bg-zinc-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase"
              >
                İlan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase"
              >
                Durum
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase"
              >
                Başvurular
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-zinc-500 uppercase"
              >
                Tarih
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium tracking-wider text-zinc-500 uppercase"
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
