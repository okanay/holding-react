import { Link } from "@/i18n/link";
import { Briefcase, ChevronRight, PlusCircle, Users } from "lucide-react";

export function DashboardIndexPage() {
  return (
    <div className="container mx-auto mt-20 px-8 transition-all sm:mt-0">
      {/* Hoş Geldiniz Başlığı */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Hoş Geldiniz
        </h1>
        <p className="mt-2 text-base text-zinc-600 sm:text-lg">
          Holding yönetim panelinizde içeriklerinizi yönetin ve yeni ilanlar
          oluşturun.
        </p>
      </div>

      {/* Ana Kartlar Bölümü */}
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
        {/* Yeni İlan Oluştur Kartı */}
        <Link
          to="/dashboard/jobs/create"
          className="group block overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white/80 to-blue-50 p-7 transition-all hover:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
            <PlusCircle className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 sm:text-xl">
            Yeni İlan Oluştur
          </h3>
          <p className="mb-5 text-sm text-zinc-600 sm:text-base">
            Yeni bir iş ilanı oluşturmak için tıklayın.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-800 sm:text-base">
            Yeni iş ilanı oluştur
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>

        {/* Tüm İlanlar Kartı */}
        <Link
          to="/dashboard/jobs/"
          className="group block overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white/80 to-zinc-50 p-7 transition-all hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200">
            <Briefcase className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 sm:text-xl">
            Tüm İlanlar
          </h3>
          <p className="mb-5 text-sm text-zinc-600 sm:text-base">
            Tüm iş ilanlarınızı görüntüleyin ve yönetin.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors group-hover:text-zinc-900 sm:text-base">
            İlanları görüntüle
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>

        {/* Başvurular Kartı */}
        <Link
          to="/dashboard/applicants"
          className="group block overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white/80 to-amber-50 p-7 transition-all hover:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-200">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 sm:text-xl">
            Başvurular
          </h3>
          <p className="mb-5 text-sm text-zinc-600 sm:text-base">
            İş ilanlarına gelen başvuruları yönetin.
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-600 transition-colors group-hover:text-amber-800 sm:text-base">
            Başvuruları görüntüle
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
