import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTiptapContext } from "../tiptap/store";
import { z } from "zod";

type Props = {
  initialData: any;
  onSubmit: (data: any) => void;
  submitLabel: string;
};

const FormSchema = z.object({
  title: z.string().min(1, "İsim alanı zorunludur"),
  description: z.string().min(1, "Açıklama alanı zorunludur"),
});

export function CreateJobForm({ initialData, submitLabel, onSubmit }: Props) {
  const { editor } = useTiptapContext();
  const {} = useForm<any>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: { ...initialData },
  });

  return (
    <form
      onSubmit={() => {}}
      className="relative z-10 mx-auto flex max-w-7xl flex-col gap-y-6 py-6"
    >
      <div className="mb-4">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900">
          İş İlanı Oluşturma
        </h1>
        <p className="text-sm text-zinc-500">
          İş ilanlarınız için başlık, açıklama ve diğer detayları düzenleyin.
          İlan içeriğini eklemek için "İçerik" sekmesini kullanabilirsiniz.
        </p>
      </div>

      <div className="fixed right-8 bottom-8 flex flex-col items-center justify-center">
        <button
          type="submit"
          className="bg-primary flex items-center gap-2 rounded px-8 py-2 text-lg font-semibold text-white shadow-xl transition-transform duration-300 hover:scale-105"
        >
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
  );
}
