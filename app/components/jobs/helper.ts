import {
  WORK_MODE_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
} from "@/components/dashboard/form/config";

export function locationOptions(jobs: Job[]): string[] {
  // Sadece mevcut işlerdeki lokasyonları benzersiz olarak döndür
  const locations = jobs.map((job) => job.details.location);
  return Array.from(new Set(locations));
}

export function workModeOptions(jobs: Job[]): string[] {
  // Sadece mevcut işlerdeki workMode değerlerini WORK_MODE_OPTIONS ile filtreleyip labelEn değerini döndür
  const workModes = jobs
    .map((job) => job.details.workMode)
    .filter((mode, idx, arr) => arr.indexOf(mode) === idx); // benzersiz
  return workModes
    .map((mode) => {
      const opt = WORK_MODE_OPTIONS.find((opt) => opt.value === mode);
      return opt?.labelEn;
    })
    .filter((labelEn): labelEn is string => !!labelEn);
}

export function employmentTypeOptions(jobs: Job[]): string[] {
  // Sadece mevcut işlerdeki employmentType değerlerini EMPLOYMENT_TYPE_OPTIONS ile filtreleyip labelEn değerini döndür
  const employmentTypes = jobs
    .map((job) => job.details.employmentType)
    .filter((type, idx, arr) => arr.indexOf(type) === idx); // benzersiz
  return employmentTypes
    .map((type) => {
      const opt = EMPLOYMENT_TYPE_OPTIONS.find((opt) => opt.value === type);
      return opt?.labelEn;
    })
    .filter((labelEn): labelEn is string => !!labelEn);
}

export function categoryOptions(jobs: Job[]): string[] {
  const categories = jobs.flatMap((job) =>
    job.categories.map((cat) => cat.displayName),
  );
  return Array.from(new Set(categories));
}
