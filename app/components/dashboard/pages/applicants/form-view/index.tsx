import React from "react";
import { DefaultFormView } from "./default-form-view";

type FormComponentProps = {
  json: unknown;
};

const FORM_TYPE_COMPONENTS: Record<string, React.FC<FormComponentProps>> = {
  default: DefaultFormView,
};

interface ApplicantFormViewProps {
  json: unknown;
  formType: string;
}

export function ApplicantFormView({ json, formType }: ApplicantFormViewProps) {
  const FormComponent =
    FORM_TYPE_COMPONENTS[formType] ?? FORM_TYPE_COMPONENTS.default;

  return <FormComponent json={json} />;
}
