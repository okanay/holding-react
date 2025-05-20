declare global {
  type JobStatus = "draft" | "published" | "closed" | "deleted";
}

export const STATUS_OPTIONS = [
  {
    value: "published",
    actionLabel: "Yayınla",
    statusLabel: "Yayınlandı",
    buttonLabel: "Direkt Yayına Al",
    config: {
      label: "Yayında",
      color: "text-green-600 bg-green-50 border-green-200",
    },
  },
  {
    value: "draft",
    actionLabel: "Taslak Olarak Kaydet",
    statusLabel: "Hazırlanıyor",
    buttonLabel: "Taslak Olarak Beklet",
    config: {
      label: "Taslak",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  },
  {
    value: "closed",
    actionLabel: "Kapat",
    statusLabel: "Kapatıldı",
    buttonLabel: "İlanı Kapat",
    config: {
      label: "Kapalı",
      color: "text-gray-600 bg-gray-50 border-gray-200",
    },
  },
];
