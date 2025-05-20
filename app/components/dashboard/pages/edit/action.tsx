import { useNavigate } from "@/i18n/navigate";
import { useTiptapContext } from "../../tiptap/store";
import { LoadingBlocker } from "../../form/ui/loading-blocker";
import { JobForm } from "../../form";
import { toast } from "sonner";

export const EditJobAction = ({
  jobId,
  initialData,
}: {
  jobId: string;
  initialData: JobFormValues;
}) => {
  const { editor } = useTiptapContext();
  const navigate = useNavigate();

  const handleEditForm = async (values: JobFormValues) => {
    const html = editor.getHTML();
    const json = JSON.stringify(editor.getJSON());

    const fixedData: JobFormValues = {
      ...values,
      html,
      json,
    };

    const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
    const FETCH_URL = `${APL_URL_BASE}/job/${jobId}`;

    try {
      const response = await fetch(FETCH_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fixedData),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
        return;
      }

      toast.success("İlan başarıyla güncellendi!");
      navigate({ to: "/dashboard/" });
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <LoadingBlocker loading={false} label="İlan Güncelleniyor..." />

      <JobForm
        isEditing={true}
        initialData={initialData}
        submitLabel="İlanı Güncelle"
        onSubmit={(values: JobFormValues) => handleEditForm(values)}
      />
    </>
  );
};
