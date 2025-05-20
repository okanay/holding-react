import React from "react";
import { DefaultFormView } from "./default-form-view";
import { Applicant } from "@/components/dashboard/pages/applicants/store";

type FormComponentProps = {
  applicant: Applicant;
};

const FORM_TYPE_COMPONENTS: Record<string, React.FC<FormComponentProps>> = {
  default: DefaultFormView,
};

interface ApplicantFormViewProps {
  applicant: Applicant;
}

export function ApplicantFormView({ applicant }: ApplicantFormViewProps) {
  const FormComponent =
    FORM_TYPE_COMPONENTS[applicant.formType] ?? FORM_TYPE_COMPONENTS.default;

  return <FormComponent applicant={applicant} />;
}
