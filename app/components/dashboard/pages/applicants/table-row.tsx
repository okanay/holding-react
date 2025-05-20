import { formatDate } from "@/utils/format-date";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { ApplicantFormView } from "./form-view";
import { Applicant } from "./store";

interface ApplicantRowProps {
  applicant: Applicant;
}

export const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant }) => {
  const [open, setOpen] = useState(false);
  const formData = JSON.parse(applicant.formJson);

  // Durum bilgisine göre renk ve ikon belirleme
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "received":
        return {
          icon: <Clock size={14} />,
          color: "text-blue-600 bg-blue-50 border-blue-200",
        };
      case "screening":
        return {
          icon: <AlertCircle size={14} />,
          color: "text-purple-600 bg-purple-50 border-purple-200",
        };
      case "interviewing":
        return {
          icon: <Calendar size={14} />,
          color: "text-amber-600 bg-amber-50 border-amber-200",
        };
      case "hired":
        return {
          icon: <CheckCircle size={14} />,
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
        };
      case "rejected":
        return {
          icon: <XCircle size={14} />,
          color: "text-red-600 bg-red-50 border-red-200",
        };
      default:
        return {
          icon: <Clock size={14} />,
          color: "text-zinc-600 bg-zinc-50 border-zinc-200",
        };
    }
  };

  const statusConfig = getStatusConfig(applicant.status);

  // Türkçe durum metni
  const getStatusText = (status: string) => {
    switch (status) {
      case "received":
        return "Yeni Başvuru";
      case "screening":
        return "İnceleniyor";
      case "interviewing":
        return "Mülakat Aşamasında";
      case "hired":
        return "İşe Alındı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <li
      className={`border-b border-zinc-100 ${open ? "bg-blue-50/30" : ""} transition-colors duration-200`}
    >
      {/* Ana içerik butonu */}
      <button
        className={`flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-zinc-50`}
        onClick={() => setOpen(!open)}
      >
        {/* Profil Avatarı */}
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <User className="h-6 w-6" />
          </div>
        </div>

        {/* Aday Bilgileri */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="flex items-center truncate font-medium text-zinc-900">
                {applicant.fullName}
                <span
                  className={`ml-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConfig.color}`}
                >
                  {statusConfig.icon}
                  <span>{getStatusText(applicant.status)}</span>
                </span>
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-zinc-400" />
                  {formData.jobTitle || "Bilinmeyen Pozisyon"}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-zinc-400" />
                {applicant.email}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-zinc-400" />
                {applicant.phone}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                {formatDate(applicant.createdAt, "tr")}
              </span>
            </div>
          </div>
        </div>

        {/* Açılır/Kapanır Panel İkonu */}
        <div className="ml-4 flex-shrink-0 self-start">
          {open ? (
            <ChevronUp className="h-5 w-5 text-zinc-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Açılır/Kapanır Form İçeriği */}
      <div
        aria-expanded={!open}
        className={`grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out aria-expanded:grid-rows-[0fr]`}
      >
        <div className="overflow-hidden transition-[grid-template-rows] duration-300 ease-out">
          <ApplicantFormView applicant={applicant} />
        </div>
      </div>
    </li>
  );
};
