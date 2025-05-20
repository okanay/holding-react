import { useNavigate } from "@/i18n/navigate";
import { useTiptapContext } from "../../tiptap/store";
import { LoadingBlocker } from "../../form/ui/loading-blocker";
import { JobForm } from "../../form";
import { toast } from "sonner";

export const CreateNewJobAction = () => {
  const { editor } = useTiptapContext();
  const navigate = useNavigate();

  const handleCreateForm = async (values: JobFormValues) => {
    const html = editor.getHTML();
    const json = JSON.stringify(editor.getJSON());

    const fixedData: JobFormValues = {
      ...values,
      html,
      json,
    };

    const APL_URL_BASE = import.meta.env.VITE_APP_BACKEND_URL;
    const FETCH_URL = APL_URL_BASE + "/auth/create-new-job";

    try {
      const response = await fetch(FETCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(fixedData),
      });

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        toast.error(data.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
        return;
      }

      toast.success("İlan başarıyla oluşturuldu!");
      navigate({ to: "/dashboard/" });
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <LoadingBlocker loading={false} label="İlan Oluşturuluyor..." />

      <JobForm
        initialData={undefined}
        submitLabel="İlanı Oluştur"
        onSubmit={(values: JobFormValues) => handleCreateForm(values)}
      />
    </>
  );
};
