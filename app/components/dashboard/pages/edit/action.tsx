// app/components/dashboard/pages/edit/action.tsx
import { useNavigate } from "@/i18n/navigate";
import { useTiptapContext } from "../../tiptap/store";
import { LoadingBlocker } from "../../form/ui/loading-blocker";
import { JobForm } from "../../form";
import { toast } from "sonner";
import { useEditJob } from "./store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const EditJobAction = ({ jobId }: { jobId: string }) => {
  const { editor } = useTiptapContext();
  const navigate = useNavigate();
  const {
    fetchJob,
    updateJob,
    job,
    jobStatus,
    jobError,
    setInitialEditorContent,
  } = useEditJob();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // İş ilanı verilerini yükle
  useEffect(() => {
    const loadJobData = async () => {
      try {
        await fetchJob(jobId);
      } catch (error) {
        console.error("İş ilanı yüklenirken hata:", error);
      }
    };

    loadJobData();
  }, [jobId]);

  // İlan içeriği yüklendiğinde editörü güncelle
  useEffect(() => {
    if (job?.html && editor) {
      // Editör hazır olduğunda HTML içeriğini ayarla
      editor.commands.setContent(job.html);
      setInitialEditorContent(job.html);
    }
  }, [job, editor]);

  // İş ilanını güncelle
  const handleEditForm = async (values: JobFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const html = editor.getHTML();
      const json = JSON.stringify(editor.getJSON());

      const fixedData: JobFormValues = {
        ...values,
        html,
        json,
      };

      console.log(fixedData);

      const success = await updateJob(jobId, fixedData);

      if (success) {
        navigate({ to: "/dashboard/job/list" });
      }
    } catch (error) {
      toast.error("İş ilanı güncellenirken bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Yükleniyor durumu
  if (jobStatus === "loading" && !job) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="text-lg text-zinc-600">İş ilanı yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (jobStatus === "error" && !job) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-10 w-10 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-zinc-800">Bir hata oluştu</h2>
          <p className="max-w-md text-zinc-600">
            {jobError ||
              "İş ilanı yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin."}
          </p>
          <button
            onClick={() => fetchJob(jobId)}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadingBlocker loading={isSubmitting} label="İlan Güncelleniyor..." />

      {job && (
        <JobForm
          isEditing={true}
          initialData={job}
          submitLabel="İlanı Güncelle"
          onSubmit={(values: JobFormValues) => handleEditForm(values)}
        />
      )}
    </>
  );
};
