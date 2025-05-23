import React from "react";
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { LifeInDetailsForm } from "./life-in";
import { MediaDetailsForm } from "./media";
import { WhyJoinForm } from "./why-join";
import { AnnouncementsForm } from "./announcements";
import { CONTENT_CATEGORY_OPTIONS } from "../config";
import { FinancialReportDetailsForm } from "./report";

interface Props {
  category: string;
  watch: UseFormWatch<ContentFormValues>;
  setValue: UseFormSetValue<ContentFormValues>;
  getValues: UseFormGetValues<ContentFormValues>;
  errors: any;
}

type DetailComponentProps = {
  watch: UseFormWatch<ContentFormValues>;
  setValue: UseFormSetValue<ContentFormValues>;
  getValues: UseFormGetValues<ContentFormValues>;
  errors: any;
};

const DETAIL_COMPONENTS: Record<string, React.FC<DetailComponentProps> | null> =
  {
    media: MediaDetailsForm,
    announcements: AnnouncementsForm,
    "life-in": LifeInDetailsForm,
    "why-join": WhyJoinForm,
    report: FinancialReportDetailsForm,
  };

export function ContentDetailsForm({
  category,
  watch,
  setValue,
  getValues,
  errors,
}: Props) {
  const DetailComponent = DETAIL_COMPONENTS[category] || null;
  if (!DetailComponent) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6">
      <DetailComponent
        watch={watch}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />
    </div>
  );
}
