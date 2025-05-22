import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDashboardApplicant } from "./store";

interface Props {}

export const Pagination: React.FC<Props> = ({}) => {
  const {
    applicantsPagination,
    setApplicantsFilters,
    getApplicants,
    applicantsStatus,
  } = useDashboardApplicant();

  const handlePrevious = () => {
    if (applicantsPagination?.currentPage > 1) {
      const newPage = applicantsPagination.currentPage - 1;
      setApplicantsFilters({ page: newPage });
      getApplicants();
    }
  };

  const handleNext = () => {
    if (applicantsPagination?.currentPage < applicantsPagination?.totalPages) {
      const newPage = applicantsPagination.currentPage + 1;
      setApplicantsFilters({ page: newPage });
      getApplicants();
    }
  };

  const handlePageClick = (page: number) => {
    setApplicantsFilters({ page });
    getApplicants();
  };

  // Sayfa numaralarını gösterme mantığı: mevcut sayfa, bir önceki, bir sonraki ve ilk/son sayfalar
  const renderPageNumbers = () => {
    if (!applicantsPagination || applicantsPagination.totalPages <= 1) {
      return null;
    }

    const { currentPage, totalPages } = applicantsPagination;
    const pages: (number | string)[] = [];

    // İlk sayfa her zaman gösterilir
    pages.push(1);

    // Eğer mevcut sayfa 3'ten büyükse "..." göster
    if (currentPage > 3) {
      pages.push("...");
    }

    // Mevcut sayfanın bir önceki ve bir sonraki sayfasını göster
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Eğer mevcut sayfa toplam sayfa sayısından 2 veya daha fazla küçükse "..." göster
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Son sayfa her zaman gösterilir (eğer 1'den farklıysa)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`ellipsis-${index}`} className="px-2 text-zinc-400">
            ...
          </span>
        );
      }

      const isActive = page === currentPage;
      return (
        <button
          key={`page-${page}`}
          onClick={() => handlePageClick(page as number)}
          className={`h-8 w-8 rounded-md ${
            isActive
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
          } flex items-center justify-center text-sm font-medium transition-colors`}
          disabled={isActive}
        >
          {page}
        </button>
      );
    });
  };

  // Sayfalama bilgileri veya sayfa yoksa gösterme
  if (!applicantsPagination || applicantsPagination.totalItems === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
      {/* Toplam Başvuran ve Sayfa Bilgisi */}
      <div className="text-sm text-zinc-500">
        {applicantsPagination.totalItems} başvuran arasından{" "}
        {(applicantsPagination.currentPage - 1) *
          applicantsPagination.pageSize +
          1}
        -
        {Math.min(
          applicantsPagination.currentPage * applicantsPagination.pageSize,
          applicantsPagination.totalItems,
        )}{" "}
        gösteriliyor
      </div>

      {/* Sayfalama Kontrolleri */}
      <div className="flex items-center gap-2">
        {/* Önceki Sayfa Butonu */}
        <button
          onClick={handlePrevious}
          disabled={
            applicantsPagination.currentPage <= 1 ||
            applicantsStatus === "loading"
          }
          className={`flex h-8 items-center justify-center rounded-md border border-zinc-200 px-2 text-sm ${
            applicantsPagination.currentPage <= 1 ||
            applicantsStatus === "loading"
              ? "cursor-not-allowed bg-zinc-50 text-zinc-300"
              : "bg-white text-zinc-700 hover:bg-zinc-50"
          } transition-colors`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1">Önceki</span>
        </button>

        {/* Sayfa Numaraları */}
        <div className="flex items-center gap-1">{renderPageNumbers()}</div>

        {/* Sonraki Sayfa Butonu */}
        <button
          onClick={handleNext}
          disabled={
            applicantsPagination.currentPage >=
              applicantsPagination.totalPages || applicantsStatus === "loading"
          }
          className={`flex h-8 items-center justify-center rounded-md border border-zinc-200 px-2 text-sm ${
            applicantsPagination.currentPage >=
              applicantsPagination.totalPages || applicantsStatus === "loading"
              ? "cursor-not-allowed bg-zinc-50 text-zinc-300"
              : "bg-white text-zinc-700 hover:bg-zinc-50"
          } transition-colors`}
        >
          <span className="mr-1">Sonraki</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
