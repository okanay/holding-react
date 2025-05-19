import React, { useState } from "react";
import {
  Search,
  Calendar,
  Filter as FilterIcon,
  X,
  RefreshCw,
} from "lucide-react";
import { useDashboard } from "../../store";

interface Props {}

export const Filter: React.FC<Props> = ({}) => {
  const {
    getApplicants,
    applicantsFilters,
    setApplicantsFilters,
    applicantsStatus,
  } = useDashboard();

  const [isOpen, setIsOpen] = useState(false);

  // Form gönderildiğinde filtreleri uygula
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtre değiştiğinde her zaman ilk sayfadan başla
    getApplicants({ ...applicantsFilters, page: 1 });
  };

  // Tüm filtreleri sıfırla
  const handleReset = () => {
    // Varsayılan filtreler
    const defaultFilters = {
      page: 1,
      limit: 10,
      fullName: "",
      email: "",
      status: "",
      startDate: "",
      endDate: "",
      sortBy: "created_at",
      sortOrder: "desc" as "asc" | "desc",
    };

    // Store'daki filtreleri sıfırla
    setApplicantsFilters(defaultFilters);
    // Yeni veriler getir
    getApplicants(defaultFilters);
  };

  // Filtreleri güncelleme fonksiyonu
  const updateFilter = (key: string, value: string) => {
    const newFilters = {
      ...applicantsFilters,
      [key]: value,
      page: 1, // Filtre değiştiğinde her zaman ilk sayfadan başla
    };
    setApplicantsFilters(newFilters);
  };

  // Enter tuşu ile arama yapma
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      getApplicants({ ...applicantsFilters, page: 1 });
    }
  };

  // Bireysel filtreyi temizle
  const handleClearSingleFilter = (filterKey: string) => {
    const newFilters = {
      ...applicantsFilters,
      [filterKey]: "",
      page: 1,
    };

    setApplicantsFilters(newFilters);
    getApplicants(newFilters);
  };

  // Aktif filtre sayısını hesapla (sıralama hariç)
  const activeFilterCount = Object.entries(applicantsFilters).filter(
    ([key, value]) =>
      value &&
      value !== "" &&
      key !== "page" &&
      key !== "limit" &&
      key !== "sortBy" &&
      key !== "sortOrder",
  ).length;

  return (
    <div className="mb-6">
      {/* Hızlı Arama ve Filtre Açma Butonu */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex h-10 items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${
              activeFilterCount > 0
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
            style={{ minHeight: "32px" }}
          >
            <FilterIcon className="h-3 w-3" />
            Filtrele
            {activeFilterCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative w-full flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={applicantsFilters.fullName || ""}
              onChange={(e) => updateFilter("fullName", e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="block h-10 w-full rounded-md border border-zinc-200 bg-white py-2 pr-3 pl-10 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Aday ismi ile ara..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => getApplicants({ ...applicantsFilters, page: 1 })}
            disabled={applicantsStatus === "loading"}
            className="h-10 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            Uygula
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={activeFilterCount === 0 || applicantsStatus === "loading"}
            className={`inline-flex h-10 items-center gap-1 rounded-md border px-3 py-2 text-sm font-medium ${
              activeFilterCount === 0 || applicantsStatus === "loading"
                ? "cursor-not-allowed border-zinc-100 bg-zinc-50 text-zinc-300"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            <X className="h-4 w-4" />
            Temizle
          </button>

          <button
            type="button"
            onClick={() => getApplicants(applicantsFilters)}
            disabled={applicantsStatus === "loading"}
            className="inline-flex h-10 items-center gap-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${applicantsStatus === "loading" ? "animate-spin" : ""}`}
            />
            Yenile
          </button>
        </div>
      </div>

      {/* Genişletilmiş Filtre Paneli */}
      {isOpen && (
        <form
          id="applicants-filter-form"
          onSubmit={handleSubmit}
          className="mb-4 rounded-md border border-zinc-200 bg-white p-4"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {/* E-posta Filtresi */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                E-posta
              </label>
              <input
                type="text"
                id="email"
                value={applicantsFilters.email || ""}
                onChange={(e) => updateFilter("email", e.target.value)}
                className="block w-full rounded-md border border-zinc-200 px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="E-posta ile ara..."
              />
            </div>

            {/* Durum Filtresi */}
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                Durum
              </label>
              <select
                id="status"
                value={applicantsFilters.status || ""}
                onChange={(e) => updateFilter("status", e.target.value)}
                className="block w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Tüm Durumlar</option>
                <option value="received">Yeni Başvuru</option>
                <option value="screening">İnceleniyor</option>
                <option value="interviewing">Mülakat Aşamasında</option>
                <option value="hired">İşe Alındı</option>
                <option value="rejected">Reddedildi</option>
              </select>
            </div>

            {/* Başlangıç Tarihi Filtresi */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                Başlangıç Tarihi
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  value={applicantsFilters.startDate || ""}
                  onChange={(e) => updateFilter("startDate", e.target.value)}
                  className="block w-full rounded-md border border-zinc-200 px-3 py-2 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Bitiş Tarihi Filtresi */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                Bitiş Tarihi
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  value={applicantsFilters.endDate || ""}
                  onChange={(e) => updateFilter("endDate", e.target.value)}
                  className="block w-full rounded-md border border-zinc-200 px-3 py-2 pl-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Sıralama Alanı */}
            <div>
              <label
                htmlFor="sortBy"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                Sıralama Kriteri
              </label>
              <select
                id="sortBy"
                value={applicantsFilters.sortBy || "created_at"}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
                className="block w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="created_at">Başvuru Tarihi</option>
                <option value="full_name">Ad Soyad</option>
                <option value="email">E-posta</option>
                <option value="status">Durum</option>
              </select>
            </div>

            {/* Sıralama Yönü */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-1 block text-xs font-medium text-zinc-700"
              >
                Sıralama Yönü
              </label>
              <select
                id="sortOrder"
                value={applicantsFilters.sortOrder || "desc"}
                onChange={(e) =>
                  updateFilter("sortOrder", e.target.value as "asc" | "desc")
                }
                className="block w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="desc">Azalan (Yeniden Eskiye)</option>
                <option value="asc">Artan (Eskiden Yeniye)</option>
              </select>
            </div>
          </div>

          {/* Butonlar */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Sıfırla
            </button>
            <button
              type="submit"
              disabled={applicantsStatus === "loading"}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              Uygula
            </button>
          </div>
        </form>
      )}

      {/* Aktif Filtreler Özeti */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700">
          <span className="font-medium">Aktif Filtreler:</span>

          {applicantsFilters.fullName && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
              Ad: {applicantsFilters.fullName}
              <button
                type="button"
                onClick={() => handleClearSingleFilter("fullName")}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {applicantsFilters.email && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
              E-posta: {applicantsFilters.email}
              <button
                type="button"
                onClick={() => handleClearSingleFilter("email")}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {applicantsFilters.status && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
              Durum:{" "}
              {applicantsFilters.status === "received"
                ? "Yeni Başvuru"
                : applicantsFilters.status === "screening"
                  ? "İnceleniyor"
                  : applicantsFilters.status === "interviewing"
                    ? "Mülakat Aşamasında"
                    : applicantsFilters.status === "hired"
                      ? "İşe Alındı"
                      : applicantsFilters.status === "rejected"
                        ? "Reddedildi"
                        : applicantsFilters.status}
              <button
                type="button"
                onClick={() => handleClearSingleFilter("status")}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {applicantsFilters.startDate && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
              Başlangıç: {applicantsFilters.startDate}
              <button
                type="button"
                onClick={() => handleClearSingleFilter("startDate")}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {applicantsFilters.endDate && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1">
              Bitiş: {applicantsFilters.endDate}
              <button
                type="button"
                onClick={() => handleClearSingleFilter("endDate")}
                className="ml-1 text-blue-500 hover:text-blue-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900"
          >
            <X className="h-3 w-3" />
            Tümünü Temizle
          </button>
        </div>
      )}
    </div>
  );
};
