import { z } from "zod";

declare global {
  type JobFormValues = z.infer<typeof JobFormSchema>;
  type Job = z.infer<typeof JobSchema>;
}

export const JobFormSchema = z.object({
  // Temel bilgiler
  title: z.string().min(10, "İş ilanı başlığı en az 10 karakter olmalıdır"),
  description: z.string().min(20, "İş tanımı en az 20 karakter olmalıdır"),
  slug: z
    .string()
    .min(3, "Slug en az 3 karakter olmalıdır")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece küçük harfler, sayılar ve tire içerebilir",
    ),
  status: z.string().default("draft"),

  // İlan görseli (opsiyonel)
  image: z.string().optional().nullable(),

  // Lokasyon bilgileri
  location: z.string().optional().nullable(),
  workMode: z.string().optional().nullable(),

  // İş detayları
  employmentType: z.string().optional().nullable(),
  experienceLevel: z.string().optional().nullable(),

  // İçerik ve form bilgileri
  html: z.string().min(1, "HTML içeriği zorunludur"),
  json: z.string().min(1, "JSON içeriği zorunludur"),
  formType: z.string().default("basic"),

  // Kategoriler (en az 1 kategori zorunlu)
  categories: z.array(z.string()).min(1, "En az bir kategori seçilmelidir"),

  // Son başvuru tarihi (opsiyonel)
  deadline: z.date().nullable().optional(),
});

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
