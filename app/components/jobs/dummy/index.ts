export const dummyJobs: Job[] = [
  {
    id: "5dae1c71-86d7-4b28-aa2f-b6ab68bca148",
    slug: "senior-frontend-developer",
    status: "published",
    deadline: "2025-02-15T00:00:00Z",
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
    details: {
      title: "Senior Frontend Developer",
      description:
        "We are looking for an experienced frontend developer with React expertise.",
      location: "Istanbul",
      workMode: "Hybrid",
      employmentType: "Full-Time",
      experienceLevel: "Senior",
      html: "<div>Job description...</div>",
      json: "{}",
      formType: "developer",
      applicants: 12,
    },
    categories: [
      {
        name: "software",
        displayName: "Software Development",
        createdAt: "2025-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "7bce3f82-95a1-4f8c-b5d9-c7e82a5f1e92",
    slug: "ui-ux-designer",
    status: "published",
    deadline: "2025-06-10T00:00:00Z",
    createdAt: "2025-05-02T11:00:00Z",
    updatedAt: "2025-05-02T11:00:00Z",
    details: {
      title: "UI/UX Designer",
      description: "Looking for a creative designer to join our product team.",
      location: "Remote",
      workMode: "Remote",
      employmentType: "Full-Time",
      experienceLevel: "Mid-level",
      html: "<div>Job description...</div>",
      json: "{}",
      formType: "designer",
      applicants: 8,
    },
    categories: [
      {
        name: "design",
        displayName: "Design",
        createdAt: "2025-01-01T00:00:00Z",
      },
    ],
  },
  {
    id: "3a5e8d21-7c64-4f91-a3b7-8d5f19c6e072",
    slug: "backend-developer",
    status: "published",
    deadline: "2025-06-20T00:00:00Z",
    createdAt: "2025-05-03T09:00:00Z",
    updatedAt: "2025-05-03T09:00:00Z",
    details: {
      title: "Backend Developer",
      description: "Looking for a backend developer with Go expertise.",
      location: "Istanbul",
      workMode: "On-Site",
      employmentType: "Full-Time",
      experienceLevel: "Mid-level",
      html: "<div>Job description...</div>",
      json: "{}",
      formType: "developer",
      applicants: 5,
    },
    categories: [
      {
        name: "software",
        displayName: "Software Development",
        createdAt: "2025-01-01T00:00:00Z",
      },
    ],
  },
];

export function locationOptions(jobs: Job[]): string[] {
  const locations = jobs.map((job) => job.details.location);
  return Array.from(new Set(locations));
}

export function workModeOptions(jobs: Job[]): string[] {
  const workModes = jobs.map((job) => job.details.workMode);
  return Array.from(new Set(workModes));
}

export function employmentTypeOptions(jobs: Job[]): string[] {
  const employmentTypes = jobs.map((job) => job.details.employmentType);
  return Array.from(new Set(employmentTypes));
}

export function categoryOptions(jobs: Job[]): string[] {
  const categories = jobs.flatMap((job) =>
    job.categories.map((cat) => cat.displayName),
  );
  return Array.from(new Set(categories));
}
