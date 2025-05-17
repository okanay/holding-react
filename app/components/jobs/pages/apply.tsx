import React from "react";
import { Route } from "@/routes/$lang/_main/job/$slug/route";

const DefaultApplicationForm = ({ job }: { job: Job }) => {
  return <div>Default Application Form for {job.details.title}</div>;
};

const DeveloperApplicationForm = ({ job }: { job: Job }) => {
  return <div>Developer Application Form for {job.details.title}</div>;
};

const DesignerApplicationForm = ({ job }: { job: Job }) => {
  return <div>Designer Application Form for {job.details.title}</div>;
};

const FORM_TYPE_COMPONENTS: Record<string, React.FC<{ job: Job }>> = {
  default: DefaultApplicationForm,
  developer: DeveloperApplicationForm,
  designer: DesignerApplicationForm,
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

  return (
    <div className="mx-auto max-w-3xl">
      <FormComponent job={data} />
    </div>
  );
}
