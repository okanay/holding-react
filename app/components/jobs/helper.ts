import {
  WORK_MODE_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/components/dashboard/form/config";

// Helper: İngilizce label'ı döndürür
export function getLabelEnFromDictionary(
  options: JobFormSelectOption[],
  value: string | undefined | null,
): string {
  if (!value) return "";
  const found = options.find((opt) => opt.name === value);
  return found?.labelEn ?? "";
}

// Work Mode (İngilizce label) - "Any" hariç
export function workModeOptions(jobs: Job[]): string[] {
  const workModes = Array.from(
    new Set(
      jobs
        .map((job) => job.details.workMode)
        .filter((mode) => !!mode && mode !== "Any"),
    ),
  );
  return workModes
    .map((mode) => getLabelEnFromDictionary(WORK_MODE_OPTIONS, mode))
    .filter((labelEn): labelEn is string => !!labelEn);
}

// Employment Type (İngilizce label) - "Any" hariç
export function employmentTypeOptions(jobs: Job[]): string[] {
  const employmentTypes = Array.from(
    new Set(
      jobs
        .map((job) => job.details.employmentType)
        .filter((type) => !!type && type !== "Any"),
    ),
  );
  return employmentTypes
    .map((type) => getLabelEnFromDictionary(EMPLOYMENT_TYPE_OPTIONS, type))
    .filter((labelEn): labelEn is string => !!labelEn);
}

// Kategoriler (İngilizce label) - "Any" gibi bir durum yok, mevcut haliyle doğru
export function categoryOptions(jobs: Job[]): string[] {
  const categories = jobs.flatMap((job) =>
    job.categories.map((cat) =>
      getLabelEnFromDictionary(CATEGORY_OPTIONS, cat.name),
    ),
  );
  return Array.from(new Set(categories)).filter(
    (labelEn): labelEn is string => !!labelEn,
  );
}

// Lokasyonlar (İngilizce) - undefined veya "" hariç
export function locationOptions(jobs: Job[]): string[] {
  const locations = jobs
    .map((job) => job.details.location)
    .filter((loc) => loc !== undefined && loc !== "");
  const uniqueLocations = Array.from(new Set(locations));
  return uniqueLocations;
}
