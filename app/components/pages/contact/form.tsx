import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";

// Zod schema
const contactSchema = z.object({
  name: z.string().min(2, "First name is required"),
  surname: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  topic: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const defaultValues: ContactFormValues = {
  name: "",
  surname: "",
  email: "",
  topic: "",
  message: "",
};

const topics = [
  { value: "", label: "Select a subject", disabled: true },
  { value: "general", label: "General Information" },
  { value: "proposal", label: "Collaboration / Proposal" },
  { value: "support", label: "Support Request" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const ContactFormSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Burada API'ye gönderim yapılabilir
    await new Promise((r) => setTimeout(r, 1000));
    reset();
  };

  return (
    <div className="border border-gray-100 bg-white p-5 sm:p-8">
      <h3 className="mb-2 text-xl font-semibold text-gray-900">Contact Us</h3>
      <p className="mb-6 text-sm text-gray-600">
        Fill out the form, and our team will get back to you as soon as
        possible.
        <span className="text-primary-700 block font-medium">
          All fields are required.
        </span>
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`focus:border-primary-700 focus:ring-primary-500 w-full border px-3 py-2 text-gray-900 ring-1 ring-transparent transition outline-none ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your first name"
              autoComplete="given-name"
            />
            {errors.name && (
              <span className="text-xs text-red-600">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="surname"
              className="mb-2 block text-xs font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="surname"
              {...register("surname")}
              className={`focus:border-primary-700 focus:ring-primary-500 w-full border px-3 py-2 text-gray-900 ring-1 ring-transparent transition outline-none ${
                errors.surname ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your last name"
              autoComplete="family-name"
            />
            {errors.surname && (
              <span className="text-xs text-red-600">
                {errors.surname.message}
              </span>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`focus:border-primary-700 focus:ring-primary-500 w-full border px-3 py-2 text-gray-900 ring-1 ring-transparent transition outline-none ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="example@email.com"
            autoComplete="email"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="topic"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Subject
          </label>
          <select
            id="topic"
            {...register("topic")}
            className={`focus:border-primary-700 focus:ring-primary-500 w-full appearance-none border bg-white px-3 py-2 text-gray-900 ring-1 ring-transparent transition outline-none ${
              errors.topic ? "border-red-500" : "border-gray-200"
            }`}
          >
            {topics.map((t) => (
              <option key={t.value} value={t.value} disabled={t.disabled}>
                {t.label}
              </option>
            ))}
          </select>
          {errors.topic && (
            <span className="text-xs text-red-600">{errors.topic.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Your Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message")}
            className={`focus:border-primary-700 focus:ring-primary-500 w-full border px-3 py-2 text-gray-900 ring-1 ring-transparent transition outline-none ${
              errors.message ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Write your message"
          />
          {errors.message && (
            <span className="text-xs text-red-600">
              {errors.message.message}
            </span>
          )}
        </div>
        <div className="mt-8 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="text-primary-700 size-4" />
            Your information is kept confidential and will not be shared with
            third parties.
          </span>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-700 w-full py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
        {isSubmitSuccessful && (
          <div className="mt-4 text-center text-sm text-green-600">
            Thank you! Your message has been sent.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactFormSection;
