import { Link } from "@/i18n/link";
import { ArrowLeft, FileText, PencilRuler } from "lucide-react";
import { EditorRichMenu } from "../../tiptap/menu";
import { useDashboard } from "../../store";
import { twMerge } from "tailwind-merge";

export function CreateBlogHeader() {
  const { view, setView } = useDashboard();

  const changeMode = (newMode: "form" | "editor") => {
    setView({
      ...view,
      job: {
        ...view.job,
        create: newMode,
      },
    });
  };

  return (
    <header
      className={twMerge(
        "top-0 z-40 mt-14 border border-zinc-200 bg-zinc-50 sm:mt-auto",
        view.job.create === "editor" ? "sticky" : "relative",
      )}
    >
      {/* Ana header kısmı - her zaman görünür */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1">
        {/* Sol kısım: Geri butonu ve başlık */}
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard/"
            className="bg-primary border-primary-cover text-color-primary flex size-8 flex-shrink-0 items-center justify-center rounded-md border transition-opacity duration-300 hover:opacity-75"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="px-6 py-2 sm:py-4">
            <h2 className="text-lg font-semibold text-zinc-800 transition-all duration-300">
              İş İlanı Oluştur
            </h2>
            <p className="line-clamp-1 text-sm text-zinc-500 transition-all duration-300">
              Yeni bir iş ilanı oluşturmak için gerekli bilgileri girin veya
              editörü kullanarak ilanınızı özelleştirin.
            </p>
          </div>
        </div>

        <div className="border-cover flex flex-shrink-0 overflow-hidden rounded border bg-zinc-50">
          <button
            onClick={() => changeMode("form")}
            className={`flex h-10 items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              view.job.create === "form"
                ? "bg-primary text-white"
                : "bg-transparent text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <FileText size={16} className="mr-1" />
            <span className="hidden sm:block">Form</span>
          </button>
          <button
            onClick={() => changeMode("editor")}
            className={`flex h-10 items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              view.job.create === "editor"
                ? "bg-primary text-white"
                : "bg-transparent text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            <PencilRuler size={16} className="mr-1" />
            <span className="hidden sm:block">Editor</span>
          </button>
        </div>
      </div>

      {/* Editör menüsü - sadece editor modunda göster */}
      {view.job.create === "editor" && <EditorRichMenu />}
    </header>
  );
}
