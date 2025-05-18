declare global {
  type BlogStatus = "published" | "draft" | "archived" | "deleted";
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
    value: "archived",
    actionLabel: "Arşivle",
    statusLabel: "Arşivlendi",
    buttonLabel: "Arşiv Olarak Beklet",
    config: {
      label: "Arşivlenmiş",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  },
];
