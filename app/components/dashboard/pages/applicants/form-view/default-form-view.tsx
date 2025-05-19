import React, { useState } from "react";
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  FileText,
  MessageSquare,
  User,
} from "lucide-react";
import { FormSingleSelect } from "@/components/dashboard/form/ui";
import { Applicant, useDashboard } from "@/components/dashboard/store";

interface DefaultFormViewProps {
  applicant: Applicant;
}

const statusOptions: JobFormSelectOption[] = [
  { name: "received", label: "Yeni Başvuru", labelEn: "Received" },
  { name: "screening", label: "İnceleniyor", labelEn: "Screening" },
  {
    name: "interviewing",
    label: "Mülakat Aşamasında",
    labelEn: "Interviewing",
  },
  { name: "hired", label: "İşe Alındı", labelEn: "Hired" },
  { name: "rejected", label: "Reddedildi", labelEn: "Rejected" },
];

export const DefaultFormView: React.FC<DefaultFormViewProps> = ({
  applicant,
}) => {
  const formData = JSON.parse(applicant.formJson);
  const { updateApplicantStatus } = useDashboard();

  const handleStatusUpdate = async (newStatus: Applicant["status"]) => {
    if (newStatus === applicant.status) return;
    await updateApplicantStatus(applicant.id, newStatus);
  };

  return (
    <div className="border-cover border-t bg-white p-6">
      {/* Kişisel Bilgiler */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {formData.fullName && (
            <>
              <User size={16} className="text-zinc-400" />
              <span className="text-sm font-semibold text-zinc-700">
                {formData.fullName}
              </span>
              <span className="mx-1 text-zinc-400">|</span>
            </>
          )}
          <Briefcase size={14} className="text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700">
            {formData.jobTitle || "Pozisyon Yok"}
          </span>
          {formData.currentCompany && (
            <>
              <span className="mx-1 text-zinc-400">•</span>
              <span className="text-sm font-medium text-zinc-700">
                {formData.currentCompany}
              </span>
            </>
          )}
        </div>

        <FormSingleSelect
          helperText="Başvuru durumunu düzenle."
          className="min-w-64 appearance-none text-sm text-nowrap"
          options={statusOptions}
          value={applicant.status}
          selectedValues={statusOptions
            .filter((s) => s.name === applicant.status)
            .map((s) => s.name)}
          onChange={async (val) => {
            await handleStatusUpdate(val as any);
          }}
          onCreateActive={false}
        />
      </div>

      {/* İletişim Bilgileri */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-zinc-400" />
          <a
            href={`mailto:${formData.email}`}
            className="text-sm font-medium text-zinc-700 hover:underline"
          >
            {formData.email || "Email Yok"}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-zinc-400" />
          <a
            href={`tel:${formData.phone}`}
            className="text-sm font-medium text-zinc-700 hover:underline"
          >
            {formData.phone || "Telefon Yok"}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700">
            {formData.currentLocation || "Lokasyon Yok"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays size={16} className="text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700">
            {formData.appliedAt
              ? new Date(formData.appliedAt).toLocaleString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Başvuru Tarihi Yok"}
          </span>
        </div>
      </div>

      {/* Profil Linkleri */}
      <div className="mb-6 space-y-2">
        {formData.linkedinUrl && (
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-zinc-400" />
            <a
              href={formData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-semibold break-all hover:underline"
            >
              LinkedIn
            </a>
          </div>
        )}
        {formData.githubUrl && (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-zinc-400"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <a
              href={formData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-semibold break-all hover:underline"
            >
              GitHub
            </a>
          </div>
        )}
        {formData.portfolioUrl && (
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-zinc-400" />
            <a
              href={formData.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-semibold break-all hover:underline"
            >
              Portfolio
            </a>
          </div>
        )}
        {formData.resumeUrl && (
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-zinc-400" />
            <a
              href={formData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-semibold hover:underline"
            >
              CV / Özgeçmiş
            </a>
          </div>
        )}
        {formData.otherUrl && (
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-zinc-400" />
            <a
              href={formData.otherUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary text-sm font-semibold break-all hover:underline"
            >
              Diğer Bağlantı
            </a>
          </div>
        )}
      </div>

      {/* Ek Bilgiler */}
      {formData.additionalInfo && (
        <div className="mt-6">
          <div className="mb-2 flex items-center gap-2">
            <MessageSquare size={16} className="text-zinc-400" />
            <span className="text-sm font-semibold text-zinc-700">Ön Yazı</span>
          </div>
          <div className="border-primary/10 bg-primary/5 rounded-md border p-3">
            <p className="text-xs leading-relaxed whitespace-pre-line text-zinc-700">
              {formData.additionalInfo}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
