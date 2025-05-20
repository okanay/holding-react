import { Editor } from "../../tiptap";
import { TiptapProvider } from "../../tiptap/store";
import { DashboardProvider, useDashboard } from "../../store";
import { EditBlogHeader } from "./header";
import DummyText from "../../tiptap/dummy";
import { EditJobAction } from "./action";
import { Route } from "@/routes/$lang/_auth/dashboard/job.edit.$id";

export const DashboardEditJobPage = () => {
  return (
    <DashboardProvider>
      <TiptapProvider initialContent={DummyText}>
        <EditBlogHeader />
        <InnerElements />
      </TiptapProvider>
    </DashboardProvider>
  );
};

const InnerElements = () => {
  const { view } = useDashboard();

  const { id } = Route.useLoaderData();
  const initialData = undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative overflow-hidden bg-white pb-8">
        <div
          data-visible={view.job.create === "form"}
          className="w-full px-4 transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <EditJobAction jobId={id} initialData={initialData} />
        </div>

        <div
          data-visible={view.job.create === "editor"}
          className="w-full transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <Editor />
        </div>
      </div>
    </div>
  );
};
