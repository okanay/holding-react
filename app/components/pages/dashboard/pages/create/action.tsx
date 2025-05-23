import { useNavigate } from "@/i18n/navigate";
import { useTiptapContext } from "../../tiptap/store";
import { LoadingBlocker } from "../../form/ui/loading-blocker";
import { JobForm } from "../../form";
import { useCreateJob } from "./store";
import { useState } from "react";

export const CreateNewJobAction = () => {
  const { editor } = useTiptapContext();
  const navigate = useNavigate();
  const { createJob, formData } = useCreateJob();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form gönderildiğinde
  const handleCreateForm = async (values: JobFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Editör içeriğini al
      const html = editor.getHTML();
      const json = JSON.stringify(editor.getJSON());

      // Verileri birleştir
      const fixedData: JobFormValues = {
        ...values,
        html,
        json,
      };

      // Yeni iş ilanı oluştur
      const success = await createJob(fixedData);

      if (success) {
        // Başarılı olursa iş ilanları listesine yönlendir
        navigate({ to: "/dashboard/jobs/" });
      }
    } catch (error) {
      console.error("İş ilanı oluşturulurken hata:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingBlocker loading={isSubmitting} label="İlan Oluşturuluyor..." />

      <JobForm
        initialData={formData}
        submitLabel="İlanı Oluştur"
        onSubmit={(values: JobFormValues) => handleCreateForm(values)}
      />
    </>
  );
};
