import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CATEGORY_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  FORM_TYPE_OPTIONS,
  STATUS_OPTIONS,
  WORK_MODE_OPTIONS,
} from "./config";
import { extractErrorMessages } from "./helper";
import {
  FormInput,
  FormMultiSelect,
  FormSingleSelect,
  FormTextarea,
  SlugCreator,
} from "./ui";
import { ModalDatePicker } from "./ui/date-picker";
import FormImageUploader from "./ui/image-upload";
import { FormStatusPicker } from "./ui/status-picker";
import { JobFormSchema } from "./validation";

interface JobFormProps {
  initialData?: Partial<JobFormValues>;
  onSubmit: (data: JobFormValues) => void;
  submitLabel?: string;
  isEditing?: boolean;
}

export function JobForm({
  initialData = {},
  onSubmit,
  submitLabel = "İlanı Oluştur",
  isEditing = false,
}: JobFormProps) {
  // Başlangıç değerleri ile formu oluştur
  const defaultValues: Partial<JobFormValues> = {
    title: "Senior Software Developer",
    description:
      "We are looking for an experienced software developer to join innovative projects at one of Turkey's leading technology companies.",
    slug: "senior-software-developer",
    status: "draft",
    image: "",
    location: "",
    workMode: "Any",
    employmentType: "Any",
    experienceLevel: "Any",
    html: "not-included",
    json: "not-included",
    formType: "default",
    categories: ["software"],
    deadline: null,
    ...initialData,
  };

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(JobFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = handleSubmit(onSubmit, (validationErrors) => {
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
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative z-10 mx-auto flex max-w-4xl flex-col gap-y-8 py-6"
    >
      {/* Form Başlığı */}
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900">
          {isEditing ? "İş İlanı Düzenleme" : "İş İlanı Oluşturma"}
        </h1>
        <p className="text-sm text-zinc-500">
          İş ilanınız için başlık, açıklama ve diğer detayları düzenleyin.
          İçeriği eklemek için editör panelini kullanabilirsiniz.
        </p>
      </div>

      {/* Temel Bilgiler Kartı */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">Temel Bilgiler</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* İlan Başlığı */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <FormInput
                  id="title"
                  label="İlan Başlığı"
                  isRequired={true}
                  placeholder="Örn: Senior Frontend Developer"
                  error={errors.title?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Slug */}
          <div className="col-span-2">
            <SlugCreator
              label="Slug"
              isRequired={true}
              watchedValue={watch("title")}
              value={watch("slug")}
              onChange={(val) =>
                setValue("slug", val, { shouldValidate: true })
              }
              errorMessage={errors.slug?.message}
              hint="URL'de görünecek benzersiz tanımlayıcı. Özel karakterler ve boşluk içermemeli."
              containerClassName="w-full"
              name="slug"
              id="slug"
            />
          </div>

          {/* Açıklama */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <FormTextarea
                  id="description"
                  label="Kısa Açıklama"
                  isRequired={true}
                  rows={4}
                  placeholder="İlanın kısa açıklaması. Bu metin arama sonuçlarında ve liste görünümünde kullanılacak."
                  error={errors.description?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Görsel */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <FormImageUploader
                  id="image"
                  label="İlan Görseli"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.image?.message}
                  helperText="İş ilanınız için kapak görseli. PNG, JPG, WEBP formatında, boş bırakılabilir."
                  previewSize="medium"
                />
              )}
            />
          </div>

          {/* Status */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <FormStatusPicker
                  id="status"
                  label="İlan Durumu"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.status?.message}
                  helperText="İlanın yayında olup olmadığını seçin."
                  options={STATUS_OPTIONS}
                  isRequired={true}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* İş Detayları Kartı */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">İş Detayları</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Lokasyon */}
          <div>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <FormInput
                  id="location"
                  label="Lokasyon"
                  placeholder="Örn: İstanbul, Türkiye"
                  helperText="Lokasyon belirtmek istemiyorsanız bu alanı boş bırakabilirsiniz."
                  error={errors.location?.message}
                  {...field}
                />
              )}
            />
          </div>

          {/* Çalışma Şekli */}
          <div>
            <Controller
              control={control}
              name="workMode"
              render={({ field }) => (
                <FormSingleSelect
                  id="workMode"
                  label="Çalışma Şekli"
                  options={WORK_MODE_OPTIONS}
                  value={field.value}
                  selectedValues={[]}
                  onChange={field.onChange}
                  error={errors.workMode?.message}
                />
              )}
            />
          </div>

          {/* İstihdam Türü */}
          <div>
            <Controller
              control={control}
              name="employmentType"
              render={({ field }) => (
                <FormSingleSelect
                  id="employmentType"
                  label="İstihdam Türü"
                  options={EMPLOYMENT_TYPE_OPTIONS}
                  value={field.value}
                  selectedValues={[]}
                  onChange={field.onChange}
                  error={errors.employmentType?.message}
                />
              )}
            />
          </div>

          {/* Deneyim Seviyesi */}
          <div>
            <Controller
              control={control}
              name="experienceLevel"
              render={({ field }) => (
                <FormSingleSelect
                  id="experienceLevel"
                  label="Deneyim Seviyesi"
                  options={EXPERIENCE_LEVEL_OPTIONS}
                  value={field.value}
                  selectedValues={[]}
                  onChange={field.onChange}
                  error={errors.experienceLevel?.message}
                />
              )}
            />
          </div>

          {/* Kategoriler */}
          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <FormMultiSelect
                  id="categories"
                  label="Kategoriler"
                  options={CATEGORY_OPTIONS}
                  selectedValues={field.value || []}
                  onChange={field.onChange}
                  error={errors.categories?.message}
                  helperText="İlanın hangi iş kategorilerine ait olduğunu seçin. Birden fazla kategori seçebilirsiniz."
                />
              )}
            />
          </div>

          {/* Form Tipi */}
          <div>
            <Controller
              control={control}
              name="formType"
              render={({ field }) => (
                <FormSingleSelect
                  id="formType"
                  label="Başvuru Form Tipi"
                  options={FORM_TYPE_OPTIONS}
                  value={field.value}
                  selectedValues={[]}
                  onChange={field.onChange}
                  error={errors.formType?.message}
                  helperText="Başvuran adayların dolduracağı form tipini seçin."
                />
              )}
            />
          </div>

          {/* Son Başvuru Tarihi */}
          <div>
            <Controller
              control={control}
              name="deadline"
              render={({ field: { value, onChange } }) => (
                <ModalDatePicker
                  id="deadline"
                  label="Son Başvuru Tarihi"
                  value={value as any}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  onChange={onChange}
                  error={errors.deadline?.message}
                  helperText="İsteğe bağlı. Belirtilmezse ilan kapatılana kadar başvurular açık kalır."
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Sabit gönder butonu */}
      <div className="fixed right-8 bottom-8 flex flex-col items-center justify-center">
        <button
          type="submit"
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
  );
}
