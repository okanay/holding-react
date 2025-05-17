import {
  locationOptions,
  workModeOptions,
  categoryOptions,
  employmentTypeOptions,
  dummyJobs,
} from "../dummy";
import { JobCard } from "../ui/card";
import { Select } from "../ui/select";

export const JobPage = () => {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-4 py-8">
      {/* Arama ve Filtreler */}
      <div className="mb-8">
        {/* Filtreler */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Select
            label="Lokasyon"
            options={locationOptions(dummyJobs)}
            onChange={(value) => {}}
          />
          <Select
            label="Çalışma Şekli"
            options={workModeOptions(dummyJobs)}
            onChange={(value) => {}}
          />
          <Select
            label="Kategori"
            options={categoryOptions(dummyJobs)}
            onChange={(value) => {}}
          />
          <Select
            label="İş Tipi"
            options={employmentTypeOptions(dummyJobs)}
            onChange={(value) => {}}
          />
        </div>
      </div>

      {dummyJobs.length > 0 ? (
        dummyJobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <div className="py-12 text-center">
          <p className="text-color-font-light text-lg">
            Aramanıza uygun iş ilanı bulunamadı
          </p>
          <button className="bg-primary hover:bg-primary-dark mt-4 rounded px-4 py-2 text-white">
            Filtreleri Temizle
          </button>
        </div>
      )}
    </main>
  );
};
