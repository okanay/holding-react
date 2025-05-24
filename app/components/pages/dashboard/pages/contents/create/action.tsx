import { useNavigate } from "@/i18n/navigate";
import { useState } from "react";
import { useCreateContent } from "./store";
import { useTiptapContext } from "../../../tiptap/store";
import { LoadingBlocker } from "../../../form/ui/loading-blocker";
import { ContentForm } from "../form";

export const CreatContentAction = () => {
  const { editor } = useTiptapContext();
  const navigate = useNavigate();
  const { createContent, formData } = useCreateContent();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form gönderildiğinde
  const handleCreateForm = async (values: ContentFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Editör içeriğini al
      const html = editor.getHTML();
      const json = JSON.stringify(editor.getJSON());

      // Verileri birleştir
      const fixedData: ContentFormValues = {
        ...values,
        contentHtml: html,
        contentJson: json,
      };

      // Yeni içerik oluştur
      const success = await createContent(fixedData);

      if (success) {
        // Başarılı olursa içerikler listesine yönlendir
        navigate({ to: "/dashboard/contents/" });
      }
    } catch (error) {
      console.error("İçerik oluşturulurken hata:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingBlocker loading={isSubmitting} label="İçerik Oluşturuluyor..." />

      <ContentForm
        initialData={formData}
        submitLabel="İçerik Oluştur"
        onSubmit={(values: ContentFormValues) => handleCreateForm(values)}
      />
    </>
  );
};
