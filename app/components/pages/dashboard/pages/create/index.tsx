import { Editor } from "../../tiptap";
import { TiptapProvider } from "../../tiptap/store";
import { DashboardProvider, useDashboard } from "../../store";
import { CreateBlogHeader } from "./header";
import { CreateNewJobAction } from "./action";
import { CreateJobProvider, useCreateJob } from "./store";
import dummy_tiptap_content from "../../tiptap/dummy";

export const DashboardCreateNewJobPage = () => {
  return (
    <DashboardProvider>
      <CreateJobProvider>
        <TiptapProvider initialContent={dummy_tiptap_content}>
          <CreateBlogHeader />
          <CreateJobContent />
        </TiptapProvider>
      </CreateJobProvider>
    </DashboardProvider>
  );
};

const CreateJobContent = () => {
  const { view } = useDashboard();
  const { editorContent } = useCreateJob();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-cover relative overflow-hidden border border-t-0 bg-zinc-50 pb-8">
        <div
          data-visible={view.job.create === "form"}
          className="w-full px-4 transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <CreateNewJobAction />
        </div>

        <div
          data-visible={view.job.create === "editor"}
          className="mx-auto w-full max-w-3xl transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <Editor key={editorContent ? "loaded" : "loading"} />
        </div>
      </div>
    </div>
  );
};
