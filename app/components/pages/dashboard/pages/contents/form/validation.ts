// app/components/pages/dashboard/pages/contents/form/validation.ts
import { z } from "zod";

declare global {
  type ContentFormValues = z.infer<typeof ContentFormSchema>;
}

export const ContentFormSchema = z.object({
  // Temel bilgiler
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  slug: z
    .string()
    .min(3, "Slug en az 3 karakter olmalıdır")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug sadece küçük harfler, sayılar ve tire içerebilir",
    ),

  // İçerik detayları
  category: z.string().min(1, "Kategori seçilmelidir"),
  language: z.string().min(1, "Dil seçilmelidir"),
  status: z.enum(["draft", "published", "closed", "deleted"]).default("draft"),

  // Identifier - çok dilli içerikleri bağlayan anahtar
  identifier: z
    .string()
    .min(3, "Identifier en az 3 karakter olmalıdır")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Identifier sadece küçük harfler, sayılar ve tire içerebilir",
    ),

  // Görsel
  imageUrl: z
    .string()
    .optional()
    .nullable()
    .refine(
      (val) =>
        val === undefined ||
        val === null ||
        val === "" ||
        /^https?:\/\/.+\..+/.test(val),
      {
        message: "Geçerli bir URL giriniz",
      },
    ),

  // İçerik (editörden gelecek)
  contentHtml: z.string().min(1, "İçerik HTML'i zorunludur"),
  contentJson: z.string().min(1, "İçerik JSON'i zorunludur"),

  // Kategori bazlı ekstra alanlar
  detailsJson: z.string().optional().nullable(),
});
