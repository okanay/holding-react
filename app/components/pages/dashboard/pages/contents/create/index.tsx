import { DashboardProvider, useDashboard } from "../../../store";
import { Editor } from "../../../tiptap";
import { TiptapProvider } from "../../../tiptap/store";
import { CreatContentAction } from "./action";
import { CreateContentHeader } from "./header";
import { CreateContentProvider, useCreateContent } from "./store";

export const CreateContentPage = () => {
  return (
    <DashboardProvider>
      <CreateContentProvider>
        <TiptapProvider initialContent={""}>
          <CreateContentHeader />
          <Page />
        </TiptapProvider>
      </CreateContentProvider>
    </DashboardProvider>
  );
};

const Page = () => {
  const { view } = useDashboard();
  const { editorContent } = useCreateContent();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-cover relative overflow-hidden border border-t-0 bg-zinc-50 pb-8">
        <div
          data-visible={view.content.create === "form"}
          className="w-full px-4 transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <CreatContentAction />
        </div>

        <div
          data-visible={view.content.create === "editor"}
          className="mx-auto w-full max-w-5xl transition-all duration-300 ease-in-out data-[visible=false]:invisible data-[visible=false]:absolute data-[visible=false]:opacity-0 data-[visible=true]:opacity-100"
        >
          <Editor key={editorContent ? "loaded" : "loading"} />
        </div>
      </div>
    </div>
  );
};
