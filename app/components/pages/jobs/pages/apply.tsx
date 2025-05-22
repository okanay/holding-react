import React from "react";
import { Route } from "@/routes/$lang/_main/jobs/$slug/route";
import { DefaultApplicationForm } from "./forms/default-form";

const FORM_TYPE_COMPONENTS: Record<string, React.FC<{ job: Job }>> = {
  default: DefaultApplicationForm,
};

export function JobApplyPage() {
  const { data, slug, lang } = Route.useLoaderData() as {
    data: Job;
    slug: string;
    lang: Language;
  };

  const formType = data.details.formType || "default";

  const FormComponent =
    FORM_TYPE_COMPONENTS[formType] || FORM_TYPE_COMPONENTS.default;

  return <FormComponent job={data} />;
}
