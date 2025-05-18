import { useNavigate } from "@/i18n/navigate";
import { useTiptapContext } from "../../tiptap/store";
import { useDashboard } from "../../store";
import { LoadingBlocker } from "../../ui/loading-blocker";
import { CreateJobForm } from "../../form";

export const CreateNewJobAction = () => {
  const { editor } = useTiptapContext();
  const {} = useDashboard();
  const navigate = useNavigate();

  const handleCreateForm = async (values: any) => {
    // const status = await createBlog();
    // if (!status) return;

    navigate({ to: "/editor/list" });
  };

  return (
    <>
      <LoadingBlocker loading={false} label="İlan Oluşturuluyor..." />

      <CreateJobForm
        initialData={undefined}
        submitLabel="İlanı Oluştur"
        onSubmit={(values: any) => handleCreateForm(values)}
      />
    </>
  );
};
