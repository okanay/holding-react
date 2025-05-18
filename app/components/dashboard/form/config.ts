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
  }
}

// FormType seçenekleri
export const FORM_TYPE_OPTIONS: SelectOption[] = [
  { value: "default", label: "Standart Form" },
];

// Çalışma Şekli seçenekleri
export const WORK_MODE_OPTIONS: SelectOption[] = [
  { value: "Any", label: "Tüm Çalışma Şekilleri" },
  { value: "Remote", label: "Uzaktan" },
  { value: "Hybrid", label: "Hibrit" },
  { value: "On-Site", label: "Ofiste" },
];

// İstihdam Türü seçenekleri
export const EMPLOYMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "Any", label: "Tüm İstihdam Türleri" },
  { value: "Full-Time", label: "Tam Zamanlı" },
  { value: "Part-Time", label: "Yarı Zamanlı" },
];

// Deneyim seviyesi seçenekleri
export const EXPERIENCE_LEVEL_OPTIONS: SelectOption[] = [
  { value: "Any", label: "Tüm Deneyim Seviyeleri" },
  { value: "Intern", label: "Stajyer" },
  { value: "Entry", label: "Giriş Seviyesi" },
  { value: "Mid-level", label: "Orta Seviye" },
  { value: "Senior", label: "Senior" },
];

// Kategori seçenekleri (örnek)
export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "software", label: "Yazılım Geliştirme" },
  { value: "design", label: "Tasarım" },
  { value: "marketing", label: "Pazarlama" },
  { value: "sales", label: "Satış" },
  { value: "customer-service", label: "Müşteri Hizmetleri" },
  { value: "finance", label: "Finans" },
  { value: "hr", label: "İnsan Kaynakları" },
  { value: "operations", label: "Operasyon" },
  { value: "product", label: "Ürün" },
  { value: "other", label: "Diğer" },
];

export const STATUS_OPTIONS = BLOG_OPTIONS.map((option) => ({
  value: option.value,
  label: option.statusLabel,
  color: option.config.color,
}));
