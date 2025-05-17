import { Briefcase, Filter, MapPin, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  categoryOptions,
  dummyJobs,
  employmentTypeOptions,
  locationOptions,
  workModeOptions,
} from "../dummy";
import { JobCard } from "../ui/card";
import { Select } from "../ui/select";

function groupJobsByCategory(jobs: Job[]): Record<string, Job[]> {
  const grouped: Record<string, Job[]> = {};

  jobs.forEach((job) => {
    if (job.categories && job.categories.length > 0) {
      job.categories.forEach((category) => {
        const categoryName = category.displayName;
        if (!grouped[categoryName]) {
          grouped[categoryName] = [];
        }
        grouped[categoryName].push(job);
      });
    } else {
      // Kategorisi olmayan ilanlar için
      const uncategorized = "Diğer İlanlar";
      if (!grouped[uncategorized]) {
        grouped[uncategorized] = [];
      }
      grouped[uncategorized].push(job);
    }
  });

  return grouped;
}

export const JobPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    workMode: "",
    category: "",
    employmentType: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on criteria
  const filteredJobs = useMemo(() => {
    return dummyJobs.filter((job) => {
      // Search filter (title and description)
      if (
        filters.search &&
        !job.details.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) &&
        !job.details.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Other filters
      if (filters.location && job.details.location !== filters.location)
        return false;
      if (filters.workMode && job.details.workMode !== filters.workMode)
        return false;
      if (
        filters.employmentType &&
        job.details.employmentType !== filters.employmentType
      )
        return false;
      if (
        filters.category &&
        !job.categories.some((cat) => cat.displayName === filters.category)
      )
        return false;

      return true;
    });
  }, [filters]);

  // Group jobs by category
  const groupedJobs = useMemo(
    () => groupJobsByCategory(filteredJobs),
    [filteredJobs],
  );

  // Update a single filter
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      workMode: "",
      category: "",
      employmentType: "",
    });
  };

  // Count active filters (excluding search)
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => key !== "search" && value !== "",
  ).length;

  return (
    <main className="mx-auto min-h-dvh max-w-3xl py-8">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold text-zinc-900">
          Career Opportunities
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-zinc-500">
          Join our team and make an impact. We're looking for talented
          individuals to help us shape the future.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="Search for positions..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="focus:border-primary focus:ring-primary/20 border-cover block w-full rounded-md border bg-white px-4 py-3 pr-12 pl-11 transition placeholder:text-zinc-400 focus:ring-2 focus:outline-none"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter("search", "")}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle + Summary */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition ${
            showFilters || activeFilterCount > 0
              ? "border-primary bg-primary-50 text-primary"
              : "border-cover bg-white text-zinc-700 hover:border-zinc-300"
          }`}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-primary ml-1 rounded-full px-2 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="text-sm text-zinc-500">
          {filteredJobs.length}{" "}
          {filteredJobs.length === 1 ? "position" : "positions"} found
        </div>
      </div>

      {/* Filters Row */}
      {showFilters && (
        <div className="border-cover mb-8 rounded-md border bg-white p-4">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="font-medium text-zinc-800">Filter Positions</h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary-600 text-sm"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                <MapPin className="h-4 w-4 text-zinc-400" />
                Location
              </div>
              <Select
                label="Location"
                options={locationOptions(dummyJobs)}
                value={filters.location}
                onChange={(value) => updateFilter("location", value)}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                <svg
                  className="h-4 w-4 text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 9C2 8.44772 2.44772 8 3 8H21C21.5523 8 22 8.44772 22 9V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V9Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 8V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Work Mode
              </div>
              <Select
                label="Work Mode"
                options={workModeOptions(dummyJobs)}
                value={filters.workMode}
                onChange={(value) => updateFilter("workMode", value)}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                <svg
                  className="h-4 w-4 text-zinc-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3 7H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 17H21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Category
              </div>
              <Select
                label="Category"
                options={categoryOptions(dummyJobs)}
                value={filters.category}
                onChange={(value) => updateFilter("category", value)}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-zinc-700">
                <Briefcase className="h-4 w-4 text-zinc-400" />
                Job Type
              </div>
              <Select
                label="Job Type"
                options={employmentTypeOptions(dummyJobs)}
                value={filters.employmentType}
                onChange={(value) => updateFilter("employmentType", value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Job Listings */}
      {Object.keys(groupedJobs).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedJobs).map(([category, jobs]) => (
            <div
              key={category}
              className="rounded-md border border-zinc-100 bg-white p-6"
            >
              <h2 className="mb-5 flex items-center justify-between border-b border-zinc-100 pb-3 text-xl font-semibold text-zinc-800">
                <span>{category}</span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-sm font-medium text-zinc-600">
                  {jobs.length}
                </span>
              </h2>
              <div className="space-y-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-zinc-100 bg-white px-4 py-16 text-center">
          <div className="mb-4 rounded-full bg-zinc-100 p-3">
            <Search className="h-6 w-6 text-zinc-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-zinc-800">
            No positions found
          </h3>
          <p className="mb-6 max-w-md text-zinc-500">
            We couldn't find any positions matching your criteria. Try adjusting
            your filters or search term.
          </p>
          <button
            onClick={clearFilters}
            className="bg-primary hover:bg-primary-600 focus:ring-primary rounded-md px-6 py-2.5 text-white transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none"
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
};
