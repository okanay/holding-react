import { STATUS_OPTIONS as STATUS } from "../constants/blog-options";

// Form için tip tanımlaması
declare global {
  interface JobFormSelectOption {
    name: string;
    label: string;
    labelEn: string;
  }
}

// Çalışma Şekli seçenekleri
export const WORK_MODE_OPTIONS: JobFormSelectOption[] = [
  { name: "Any", label: "Tüm Çalışma Şekilleri", labelEn: "All Work Modes" },
  { name: "Remote", label: "Uzaktan (Remote)", labelEn: "Remote" },
  { name: "Hybrid", label: "Hibrit (Ofis + Uzaktan)", labelEn: "Hybrid" },
  { name: "OnSite", label: "Ofiste (On-site)", labelEn: "On-site" },
  { name: "Field", label: "Saha", labelEn: "Field" },
  { name: "Flexible", label: "Esnek", labelEn: "Flexible" },
];

// İstihdam Türü seçenekleri
export const EMPLOYMENT_TYPE_OPTIONS: JobFormSelectOption[] = [
  {
    name: "Any",
    label: "Tüm İstihdam Türleri",
    labelEn: "All Employment Types",
  },
  { name: "FullTime", label: "Tam Zamanlı", labelEn: "Full-Time" },
  { name: "PartTime", label: "Yarı Zamanlı", labelEn: "Part-Time" },
  { name: "Contract", label: "Sözleşmeli", labelEn: "Contract" },
  { name: "Freelance", label: "Serbest", labelEn: "Freelance" },
  { name: "Internship", label: "Stajyer", labelEn: "Internship" },
  { name: "Temporary", label: "Dönemsel", labelEn: "Temporary" },
];

// Deneyim seviyesi seçenekleri
export const EXPERIENCE_LEVEL_OPTIONS: JobFormSelectOption[] = [
  {
    name: "Any",
    label: "Tüm Deneyim Seviyeleri",
    labelEn: "All Experience Levels",
  },
  { name: "Intern", label: "Stajyer", labelEn: "Intern" },
  { name: "Entry", label: "Yeni Mezun / Junior", labelEn: "Entry Level" },
  { name: "Mid", label: "Orta Seviye", labelEn: "Mid Level" },
  { name: "Senior", label: "Kıdemli", labelEn: "Senior" },
  { name: "Lead", label: "Lider / Takım Lideri", labelEn: "Lead" },
  { name: "Manager", label: "Yönetici", labelEn: "Manager" },
  { name: "Director", label: "Direktör", labelEn: "Director" },
  { name: "Executive", label: "Üst Düzey Yönetici", labelEn: "Executive" },
];

// Kategori seçenekleri (örnek)
export const CATEGORY_OPTIONS: JobFormSelectOption[] = [
  {
    name: "software",
    label: "Yazılım Geliştirme",
    labelEn: "Software Development",
  },
  { name: "it", label: "Bilgi Teknolojileri", labelEn: "IT & Support" },
  { name: "design", label: "Tasarım & UX", labelEn: "Design & UX" },
  { name: "product", label: "Ürün Yönetimi", labelEn: "Product Management" },
  { name: "data", label: "Veri & Analitik", labelEn: "Data & Analytics" },
  { name: "marketing", label: "Pazarlama", labelEn: "Marketing" },
  { name: "sales", label: "Satış", labelEn: "Sales" },
  {
    name: "customer-service",
    label: "Müşteri Hizmetleri",
    labelEn: "Customer Service",
  },
  {
    name: "finance",
    label: "Finans & Muhasebe",
    labelEn: "Finance & Accounting",
  },
  { name: "hr", label: "İnsan Kaynakları", labelEn: "Human Resources" },
  { name: "operations", label: "Operasyon", labelEn: "Operations" },
  { name: "legal", label: "Hukuk", labelEn: "Legal" },
  {
    name: "admin",
    label: "Ofis & Yönetici Asistanı",
    labelEn: "Administration",
  },
  { name: "engineering", label: "Mühendislik", labelEn: "Engineering" },
  { name: "education", label: "Eğitim", labelEn: "Education" },
  { name: "healthcare", label: "Sağlık", labelEn: "Healthcare" },
  { name: "logistics", label: "Lojistik", labelEn: "Logistics" },
  { name: "construction", label: "İnşaat", labelEn: "Construction" },
  { name: "other", label: "Diğer", labelEn: "Other" },
];

export const STATUS_OPTIONS = STATUS.map((option) => ({
  value: option.value,
  label: option.statusLabel,
  color: option.config.color,
}));

// FormType seçenekleri
export const FORM_TYPE_OPTIONS: JobFormSelectOption[] = [
  { name: "default", label: "Standart Form", labelEn: "Standart Form" },
];
