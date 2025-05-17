import { z } from "zod";

declare global {
  export type Job = z.infer<typeof JobSchema>;
}

export const JobSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  status: z.enum(["draft", "published", "closed", "deleted"]),
  deadline: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  details: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    workMode: z.string().optional(),
    employmentType: z.string().optional(),
    experienceLevel: z.string().optional(),
    html: z.string(),
    json: z.string(),
    formType: z.string(),
    applicants: z.number(),
  }),
  categories: z
    .array(
      z.object({
        name: z.string(),
        displayName: z.string(),
        createdAt: z.string().datetime(),
      }),
    )
    .optional(),
});

export const JobsResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    jobs: z.array(JobSchema),
    pagination: z.object({
      currentPage: z.number(),
      pageSize: z.number(),
      totalItems: z.number(),
      totalPages: z.number(),
    }),
  }),
});
