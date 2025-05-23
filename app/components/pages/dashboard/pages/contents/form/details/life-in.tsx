import { PlusCircle } from "lucide-react";
import React from "react";
import {
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

interface Props {
  watch: UseFormWatch<ContentFormValues>;
  setValue: UseFormSetValue<ContentFormValues>;
  getValues: UseFormGetValues<ContentFormValues>;
  errors: any;
}

export const LifeInDetailsForm: React.FC<Props> = ({
  watch,
  setValue,
  getValues,
  errors,
}) => {
  // Logic preserved, UI temizlendi - ileride düzenlenecek
  const currentDetails = watch("detailsJson") || {};

  const updateDetailField = (fieldName: string, value: any) => {
    const updatedDetails = {
      ...currentDetails,
      [fieldName]: value,
    };
    setValue("detailsJson", updatedDetails, { shouldValidate: true });
  };

  return (
    <div className="flex w-full max-w-md flex-col items-start justify-center bg-white py-6">
      <div className="mb-2 flex items-center space-x-3">
        <PlusCircle className="h-6 w-6 text-blue-500" />
        <span className="text-base font-semibold text-zinc-800">
          Kurumsal Detaylar
        </span>
      </div>
      <div className="flex items-start space-x-2 text-zinc-600">
        <span className="text-sm italic">
          Form alanları sayfa tasarımı doğrultusunda eklenicek.
        </span>
      </div>
    </div>
  );
};
