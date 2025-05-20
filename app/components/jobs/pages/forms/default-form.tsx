import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { extractErrorMessages } from "@/components/dashboard/form/helper";
import { FormInput, FormTextarea } from "@/components/dashboard/form/ui";
import { Check, Loader, Send } from "lucide-react";
import { FileUploader } from "../../ui/file-uploader";
import { PhoneInput } from "@/components/dashboard/form/ui/phone-input";

// Form veri tipi
const applicationSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  currentLocation: z.string().optional(),
  currentCompany: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .optional(),
  resumeUrl: z.string().min(1, "Please upload your resume"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Please enter a valid Portfolio URL")
    .optional()
    .or(z.literal("")),
  otherUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  additionalInfo: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const DefaultApplicationForm = ({ job }: { job: Job }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      currentLocation: "",
      currentCompany: "",
      resumeUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
      otherUrl: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    // Form verilerini hazırla
    const formData = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      formType: job.details.formType || "default",
      formJson: JSON.stringify({
        ...data,
        jobId: job.id,
        jobTitle: job.details.title,
        appliedAt: new Date().toISOString(),
      }),
    };

    try {
      // API endpoint (backend routes'a göre ayarlandı)
      const API_URL_BASE =
        import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:8080";
      const response = await fetch(`${API_URL_BASE}/public/jobs/${job.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Başvuru gönderilirken bir hata oluştu",
        );
      }

      // Başarılı başvuru
      setSubmitSuccess(true);
      toast.success("Başvurunuz başarıyla alındı", {
        description:
          "Başvurunuz için teşekkür ederiz. En kısa sürede değerlendirilecektir.",
      });
    } catch (error) {
      toast.error("Başvuru gönderilirken bir hata oluştu", {
        description:
          error instanceof Error
            ? error.message
            : "Lütfen daha sonra tekrar deneyin",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit, (validationErrors) => {
    const allErrorMessages = extractErrorMessages(validationErrors);
    const errorCount = allErrorMessages.length;

    if (errorCount > 0) {
      toast.error("Form Validation Errors", {
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

  if (submitSuccess) {
    return (
      <div className="mx-auto w-full max-w-3xl bg-white p-10 md:p-16">
        <div className="flex flex-col items-center gap-4">
          {/* Modern, simple confirmation icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-green-700">
            Application Received
          </h2>
          <p className="max-w-xl text-center text-zinc-800">
            Your application for the position of{" "}
            <span className="font-semibold underline underline-offset-4">
              {job.details.title}
            </span>{" "}
            has been successfully submitted and merged into our system. We will
            contact you as soon as possible.
          </p>
          <div className="mt-2 text-sm text-zinc-500">
            Submitted on{" : "}
            <span className="font-semibold text-zinc-800">
              {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4">
      <div className="mx-auto w-full max-w-3xl rounded-lg bg-white">
        <form onSubmit={handleFormSubmit} className="py-6">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="mb-4 border-b border-zinc-200 pb-2 text-lg font-semibold text-zinc-800">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <Controller
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                      <FormInput
                        id="fullName"
                        label="Full Name"
                        isRequired={true}
                        placeholder="Your full name"
                        error={errors.fullName?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Email */}
                <div>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormInput
                        id="email"
                        label="Email Address"
                        isRequired={true}
                        placeholder="example@email.com"
                        error={errors.email?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Phone */}
                <div>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInput
                        id="phone"
                        label="Phone Number"
                        isRequired
                        value={field.value}
                        onChange={field.onChange}
                        defaultCountry="TR"
                        error={errors.phone?.message}
                      />
                    )}
                  />
                </div>

                {/* Location */}
                <div>
                  <Controller
                    control={control}
                    name="currentLocation"
                    render={({ field }) => (
                      <FormInput
                        id="currentLocation"
                        label="Current City/Country"
                        placeholder="Istanbul, Turkey"
                        error={errors.currentLocation?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Company */}
                <div>
                  <Controller
                    control={control}
                    name="currentCompany"
                    render={({ field }) => (
                      <FormInput
                        id="currentCompany"
                        label="Current Company"
                        placeholder="Your current company"
                        error={errors.currentCompany?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="mb-4 border-b border-zinc-200 pb-2 text-lg font-semibold text-zinc-800">
                Links
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* LinkedIn */}
                <div>
                  <Controller
                    control={control}
                    name="linkedinUrl"
                    render={({ field }) => (
                      <FormInput
                        id="linkedinUrl"
                        label="LinkedIn Profile"
                        placeholder="https://linkedin.com/in/username"
                        error={errors.linkedinUrl?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* GitHub */}
                <div>
                  <Controller
                    control={control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormInput
                        id="githubUrl"
                        label="GitHub Profile"
                        placeholder="https://github.com/username"
                        error={errors.githubUrl?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <Controller
                    control={control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormInput
                        id="portfolioUrl"
                        label="Portfolio Website"
                        placeholder="https://portfolio.com"
                        error={errors.portfolioUrl?.message}
                        {...field}
                      />
                    )}
                  />
                </div>

                {/* Other URL */}
                <div>
                  <Controller
                    control={control}
                    name="otherUrl"
                    render={({ field }) => (
                      <FormInput
                        id="otherUrl"
                        label="Other Link"
                        placeholder="Another website"
                        error={errors.otherUrl?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="mb-4 border-b border-zinc-200 pb-2 text-lg font-semibold text-zinc-800">
                Additional Information
              </h3>

              {/* CV Upload - To be added in the future */}
              <div className="space-y-4">
                <div>
                  <Controller
                    control={control}
                    name="resumeUrl"
                    render={({ field }) => (
                      <FileUploader
                        id="resumeUrl"
                        label="Resume/CV Upload"
                        helperText="Upload your resume in PDF or Word format (max. 10MB)"
                        isRequired={true}
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.resumeUrl?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Additional Note */}
              <div>
                <Controller
                  control={control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormTextarea
                      id="additionalInfo"
                      label="Additional Note / Cover Letter"
                      rows={5}
                      placeholder="You can provide additional information about yourself, your motivation, or why you think you are suitable for this position."
                      error={errors.additionalInfo?.message}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary-600 disabled:bg-primary-300 inline-flex items-center gap-2 rounded-md px-6 py-2.5 text-base font-semibold text-white transition-all disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-xs text-pretty text-zinc-500">
            <p>
              By submitting this form, you agree that your personal data will be
              reviewed by our company. Your data will be processed and stored in
              accordance with our privacy policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
