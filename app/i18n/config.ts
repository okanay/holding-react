declare global {
  type Language = "tr" | "en";
  type SameSite = "lax" | "strict" | "none" | undefined;
  type Direction = "ltr" | "rtl";
}

export const LANGUAGES: Record<string, Language> = {
  ENGLISH: "en",
  TURKISH: "tr",
} as const;

export const ACTIVE_LANGUAGE_DICTONARY = [
  {
    value: "en",
    label: "İngilizce",
    seo: { locale: "en-US", direction: "ltr" },
  },
  {
    value: "tr",
    label: "Türkçe",
    seo: { locale: "tr-TR", direction: "ltr" },
  },
];

export const ALL_LANGUAGE_DICTONARY = [
  {
    value: "en",
    label: "İngilizce",
    seo: { locale: "en-US", direction: "ltr" },
  },
  {
    value: "tr",
    label: "Türkçe",
    seo: { locale: "tr-TR", direction: "ltr" },
  },
];

export const SUPPORTED_LANGUAGES: Language[] = Object.values(LANGUAGES);
export const DEFAULT_LANGUAGE: Language = LANGUAGES.ENGLISH;
export const FALLBACK_LANGUAGE: Language = "en";
export const I18N_STORAGE_KEY = "language";
export const I18N_COOKIE_NAME = "language";
export const I18N_COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
  sameSite: "lax" as SameSite,
};
