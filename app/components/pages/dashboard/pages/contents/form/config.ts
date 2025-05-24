// Form için tip tanımlaması
declare global {
  interface ContentFormSelectOption {
    name: string;
    label: string;
    labelEn: string;
    description?: string;
    hasDetails?: boolean; // Ekstra form alanları olup olmadığı
  }
}

// İçerik kategorileri
export const CONTENT_CATEGORY_OPTIONS: ContentFormSelectOption[] = [
  {
    name: "media",
    label: "Medya",
    labelEn: "Media (Press Coverage)",
    description: "Basın yayınları ve medya haberleri",
    hasDetails: true,
  },
  {
    name: "report",
    label: "Finans Raporu",
    labelEn: "Financial Report",
    description: "Mali tablolar ve finansal raporlar",
    hasDetails: true,
  },
  {
    name: "announcements",
    label: "Duyurular",
    labelEn: "Latest Announcements",
    description: "Şirket duyuruları ve önemli açıklamalar",
    hasDetails: true,
  },
  {
    name: "life-in",
    label: "Yaşam İçinde",
    labelEn: "Life In",
    description: "Şirket kültürü ve çalışan deneyimleri",
    hasDetails: true,
  },
  {
    name: "why-join",
    label: "Neden Hoi Holding?",
    labelEn: "Why Hoi Holding?",
    description: "Şirket avantajları ve kariyer fırsatları",
    hasDetails: true,
  },
];

// Dil seçenekleri
export const LANGUAGE_OPTIONS: ContentFormSelectOption[] = [
  { name: "tr", label: "Türkçe", labelEn: "Turkish" },
  { name: "en", label: "İngilizce", labelEn: "English" },
];
