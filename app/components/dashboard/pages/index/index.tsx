import { Link } from "@/i18n/link";
import { Briefcase, ChevronRight, PlusCircle, Users } from "lucide-react";

export function DashboardIndexPage() {
  return (
    <div className="container mx-auto mt-20 px-8 transition-all sm:mt-0">
      {/* Hoş Geldiniz Başlığı */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
          Hoş Geldiniz
        </h1>
        <p className="mt-2 text-lg text-zinc-600">
          Holding yönetim panelinizde içeriklerinizi yönetin ve yeni ilanlar
          oluşturun.
        </p>
      </div>

      {/* Ana Kartlar Bölümü */}
      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Yeni İlan Oluştur Kartı */}
        <Link
          to="/dashboard/job/create"
          className="group block overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 p-7 shadow-sm transition-all hover:border-blue-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
            <PlusCircle className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-zinc-900">
            Yeni İlan Oluştur
          </h3>
          <p className="mb-5 text-base text-zinc-600">
            Yeni bir iş ilanı oluşturmak için tıklayın.
          </p>
          <span className="inline-flex items-center gap-2 text-base font-medium text-blue-600 transition-colors group-hover:text-blue-800">
            Yeni iş ilanı oluştur
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>

        {/* Tüm İlanlar Kartı */}
        <Link
          to="/dashboard/job/list"
          className="group block overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 p-7 shadow-sm transition-all hover:border-zinc-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-zinc-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200">
            <Briefcase className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-zinc-900">
            Tüm İlanlar
          </h3>
          <p className="mb-5 text-base text-zinc-600">
            Tüm iş ilanlarınızı görüntüleyin ve yönetin.
          </p>
          <span className="inline-flex items-center gap-2 text-base font-medium text-zinc-600 transition-colors group-hover:text-zinc-900">
            İlanları görüntüle
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>

        {/* Başvurular Kartı */}
        <Link
          to="/dashboard/applicants"
          className="group block overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-100 p-7 shadow-sm transition-all hover:border-amber-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-colors group-hover:bg-amber-200">
            <Users className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-zinc-900">
            Başvurular
          </h3>
          <p className="mb-5 text-base text-zinc-600">
            İş ilanlarına gelen başvuruları yönetin.
          </p>
          <span className="inline-flex items-center gap-2 text-base font-medium text-amber-600 transition-colors group-hover:text-amber-800">
            Başvuruları görüntüle
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
