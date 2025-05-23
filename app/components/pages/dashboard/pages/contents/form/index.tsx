// app/components/pages/dashboard/pages/contents/form/index.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { STATUS_OPTIONS } from "../../../form/config";
import { extractErrorMessages } from "../../../form/helper";
import {
  FormInput,
  FormSingleSelect,
  FormTextarea,
  SlugCreator,
} from "../../../form/ui";
import FormImageUploader from "../../../form/ui/image-upload";
import { FormStatusPicker } from "../../../form/ui/status-picker";
import {
  CONTENT_CATEGORY_OPTIONS,
  DEFAULT_CONTENT_VALUES,
  LANGUAGE_OPTIONS,
} from "./config";
import { ContentFormSchema } from "./validation";
import { ContentDetailsForm } from "./details";

interface ContentFormProps {
  initialData?: Partial<ContentFormValues>;
  onSubmit: (data: ContentFormValues) => void;
  submitLabel?: string;
  isEditing?: boolean;
}

export function ContentForm({
  initialData = {},
  onSubmit,
  submitLabel = "İçerik Oluştur",
  isEditing = false,
}: ContentFormProps) {
  const defaultValues: Partial<ContentFormValues> = {
    ...DEFAULT_CONTENT_VALUES,
    ...initialData,
  };

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContentFormValues>({
    resolver: zodResolver(ContentFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const selectedCategory = watch("category");
  const watchedTitle = watch("title");
  const watchedIdentifier = watch("identifier");

  const handleFormSubmit = handleSubmit(
    (data) => {
      onSubmit(data);
    },
    (validationErrors) => {
      const allErrorMessages = extractErrorMessages(validationErrors);
      const errorCount = allErrorMessages.length;

      if (errorCount > 0) {
        toast.error("Form Doğrulama Hataları", {
          description: (
            <ul className="mt-2 ml-4 list-disc text-sm">
              {allErrorMessages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          ),
          duration: 4000,
        });
      }
    },
  );

  return (
    <div className="border-cover min-h-screen border bg-zinc-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="mb-12 space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {isEditing ? "İçerik Düzenleme" : "İçerik Oluşturma"}
          </h1>
          <p className="max-w-2xl text-base text-zinc-600">
            İçeriğiniz için başlık, açıklama ve diğer detayları düzenleyin.
            İçeriği eklemek için editör panelini kullanabilirsiniz.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-12">
          {/* Temel Bilgiler Section */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                Temel Bilgiler
              </h2>
              <p className="text-sm text-zinc-500">
                İçeriğin temel özelliklerini belirleyin
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <div className="grid grid-cols-1 gap-8">
                {/* İçerik Başlığı */}
                <div>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormInput
                        id="title"
                        label="İçerik Başlığı"
                        isRequired={true}
                        placeholder="Örn: Şirketimiz Bloomberg'de Yer Aldı"
                        error={errors.title?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Açıklama */}
                <div>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormTextarea
                        id="description"
                        label="Kısa Açıklama"
                        isRequired={true}
                        rows={4}
                        placeholder="İçeriğin kısa açıklaması. Bu metin arama sonuçlarında ve liste görünümünde kullanılacak."
                        error={errors.description?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* İçerik Görseli - Full Width */}
                <div>
                  <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                      <FormImageUploader
                        id="image"
                        label="İçerik Görseli"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.image?.message}
                        helperText="İçerik için kapak görseli. PNG, JPG, WEBP formatında, boş bırakılabilir."
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Kategori ve İçerik Detayları Section */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                Kategori ve İçerik Detayları
              </h2>
              <p className="text-sm text-zinc-500">
                İçerik kategorisi ve özel detayları
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <div className="space-y-8">
                {/* Kategori */}
                <div>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <FormSingleSelect
                        id="category"
                        label="Kategori"
                        isRequired={true}
                        options={CONTENT_CATEGORY_OPTIONS}
                        value={field.value}
                        selectedValues={[]}
                        onChange={field.onChange}
                        error={errors.category?.message}
                        helperText="İçeriğin hangi kategoriye ait olduğunu seçin"
                      />
                    )}
                  />
                </div>

                {/* Kategori Detayları */}
                {selectedCategory && (
                  <div>
                    <ContentDetailsForm
                      category={selectedCategory}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                      errors={errors}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Dil ve URL Ayarları Section */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                Dil ve URL Ayarları
              </h2>
              <p className="text-sm text-zinc-500">
                Çoklu dil desteği ve URL yapılandırması
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Dil */}
                <div className="lg:col-span-2">
                  <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <FormSingleSelect
                        id="language"
                        label="Dil"
                        isRequired={true}
                        options={LANGUAGE_OPTIONS}
                        value={field.value}
                        selectedValues={[]}
                        onChange={field.onChange}
                        error={errors.language?.message}
                        helperText="Bu içeriğin hangi dilde olduğunu seçin"
                      />
                    )}
                  />
                </div>

                {/* Çoklu Dil Identifier - Full Width */}
                <div className="lg:col-span-2">
                  <SlugCreator
                    label="Çoklu Dil Identifier"
                    isRequired={true}
                    watchedValue={watchedTitle}
                    value={watchedIdentifier}
                    onChange={(val: string) =>
                      setValue("identifier", val, { shouldValidate: true })
                    }
                    errorMessage={errors.identifier?.message}
                    hint={
                      (
                        <div className="space-y-2 text-xs text-zinc-600">
                          <div className="font-semibold">Örnek kullanım:</div>
                          <div className="space-y-1">
                            <div>
                              Türkçe:{" "}
                              <span className="font-semibold">
                                kodlama-nasıl-yapılır
                              </span>{" "}
                              (identifier: content-1)
                            </div>
                            <div>
                              İngilizce:{" "}
                              <span className="font-semibold">how-to-code</span>{" "}
                              (identifier: content-1)
                            </div>
                          </div>
                          <div>
                            Farklı dillerdeki içeriklerin birbirine
                            bağlanabilmesi için identifier alanı aynı olmalıdır.
                          </div>
                        </div>
                      ) as any
                    }
                    name="identifier"
                    id="identifier"
                  />
                </div>

                {/* URL Slug - Full Width */}
                <div className="lg:col-span-2">
                  <SlugCreator
                    label="URL Slug"
                    isRequired={true}
                    watchedValue={watchedTitle}
                    value={watch("slug")}
                    onChange={(val: string) =>
                      setValue("slug", val, { shouldValidate: true })
                    }
                    errorMessage={errors.slug?.message}
                    hint="URL'de görünecek benzersiz tanımlayıcı. Özel karakterler ve boşluk içermemeli"
                    name="slug"
                    id="slug"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Yayın Durumu Section - En Altta */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-zinc-900">
                Yayın Durumu
              </h2>
              <p className="text-sm text-zinc-500">
                İçeriğin yayın durumunu belirleyin
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-8">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormStatusPicker
                    id="status"
                    label="İçerik Durumu"
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.status?.message}
                    helperText="İçeriğin yayında olup olmadığını seçin"
                    options={STATUS_OPTIONS}
                    isRequired={true}
                  />
                )}
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="fixed right-10 bottom-16 flex flex-col items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary disabled:bg-primary-300 flex items-center gap-2 rounded px-8 py-2 text-lg font-semibold text-white shadow-xl transition-transform duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>İşleniyor...</span>
                </>
              ) : (
                <span>{submitLabel}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
