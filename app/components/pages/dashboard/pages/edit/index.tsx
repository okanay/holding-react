// app/components/dashboard/pages/edit/index.tsx
import { Editor } from "../../tiptap";
import { TiptapProvider } from "../../tiptap/store";
import { DashboardProvider, useDashboard } from "../../store";
import { EditBlogHeader } from "./header";
import { EditJobAction } from "./action";
import { Route } from "@/routes/$lang/_auth/dashboard/jobs.edit.$id";
import { EditJobProvider, useEditJob } from "./store";

export const DashboardEditJobPage = () => {
  const { id } = Route.useLoaderData();

  return (
    <DashboardProvider>
      <EditJobProvider>
        <TiptapProvider initialContent="">
          <EditBlogHeader />
          <EditJobContent jobId={id} />
        </TiptapProvider>
      </EditJobProvider>
    </DashboardProvider>
  );
};

const EditJobContent = ({ jobId }: { jobId: string }) => {
  const { view } = useDashboard();
  const { job, editorContent } = useEditJob();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-cover relative overflow-hidden border border-t-0 bg-zinc-50 pb-8">
        <div
          data-visible={view.job.create === "form"}
          className="w-full px-4 transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <EditJobAction jobId={jobId} />
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
