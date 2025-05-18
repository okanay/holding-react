import { Editor } from "../../tiptap";
import { TiptapProvider } from "../../tiptap/store";
import { DashboardProvider, useDashboard } from "../../store";
import { CreateBlogHeader } from "./header";
import { ImageProvider } from "@/components/image/store";
import DummyText from "../../tiptap/dummy";
import { CreateNewJobAction } from "./action";

export const DashboardCreateNewJobPage = () => {
  return (
    <DashboardProvider>
      <TiptapProvider initialContent={DummyText}>
        <ImageProvider>
          <CreateBlogHeader />
          <InnerElements />
        </ImageProvider>
      </TiptapProvider>
    </DashboardProvider>
  );
};

const InnerElements = () => {
  const { view } = useDashboard();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative overflow-hidden bg-white pb-8">
        <div
          data-visible={view.job.create === "form"}
          className="w-full px-4 transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <CreateNewJobAction />
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
