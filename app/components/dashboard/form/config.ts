import { z } from "zod";
import { BLOG_OPTIONS } from "../constants/blog-options";

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
  location: z
    .string()
    .min(2, "Lokasyon en az 2 karakter olmalıdır")
    .optional()
    .nullable(),
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

// Form için tip tanımlaması
declare global {
  type JobFormValues = z.infer<typeof JobFormSchema>;

  interface SelectOption {
    value: string;
    label: string;
    labelEn?: string;
  }
}

// FormType seçenekleri
export const FORM_TYPE_OPTIONS: SelectOption[] = [
  { value: "default", label: "Standart Form" },
];

// Çalışma Şekli seçenekleri
export const WORK_MODE_OPTIONS: SelectOption[] = [
  { value: "Any", label: "Tüm Çalışma Şekilleri", labelEn: "All Work Modes" },
  { value: "Remote", label: "Uzaktan", labelEn: "Remote" },
  { value: "Hybrid", label: "Hibrit", labelEn: "Hybrid" },
  { value: "On-Site", label: "Ofiste", labelEn: "On-Site" },
];

// İstihdam Türü seçenekleri
export const EMPLOYMENT_TYPE_OPTIONS: SelectOption[] = [
  {
    value: "Any",
    label: "Tüm İstihdam Türleri",
    labelEn: "All Employment Types",
  },
  { value: "Full-Time", label: "Tam Zamanlı", labelEn: "Full-Time" },
  { value: "Part-Time", label: "Yarı Zamanlı", labelEn: "Part-Time" },
];

// Deneyim seviyesi seçenekleri
export const EXPERIENCE_LEVEL_OPTIONS: SelectOption[] = [
  {
    value: "Any",
    label: "Tüm Deneyim Seviyeleri",
    labelEn: "All Experience Levels",
  },
  { value: "Intern", label: "Stajyer", labelEn: "Intern" },
  { value: "Entry", label: "Giriş Seviyesi", labelEn: "Entry Level" },
  { value: "Mid-level", label: "Orta Seviye", labelEn: "Mid-level" },
  { value: "Senior", label: "Senior", labelEn: "Senior" },
];

// Kategori seçenekleri (örnek)
export const CATEGORY_OPTIONS: SelectOption[] = [
  {
    value: "software",
    label: "Yazılım Geliştirme",
    labelEn: "Software Development",
  },
  { value: "design", label: "Tasarım", labelEn: "Design" },
  { value: "marketing", label: "Pazarlama", labelEn: "Marketing" },
  { value: "sales", label: "Satış", labelEn: "Sales" },
  {
    value: "customer-service",
    label: "Müşteri Hizmetleri",
    labelEn: "Customer Service",
  },
  { value: "finance", label: "Finans", labelEn: "Finance" },
  { value: "hr", label: "İnsan Kaynakları", labelEn: "Human Resources" },
  { value: "operations", label: "Operasyon", labelEn: "Operations" },
  { value: "product", label: "Ürün", labelEn: "Product" },
  { value: "other", label: "Diğer", labelEn: "Other" },
];

export const STATUS_OPTIONS = BLOG_OPTIONS.map((option) => ({
  value: option.value,
  label: option.statusLabel,
  color: option.config.color,
}));
