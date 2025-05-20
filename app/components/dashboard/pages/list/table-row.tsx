import { Link } from "@/i18n/link";
import { formatDate } from "@/utils/format-date";
import {
  AlertCircle,
  Briefcase,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  RefreshCw,
  SearchX,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { JobView, useDashboardJob } from "./store";

// JobRow bileşeni - Her bir iş ilanı satırı
export const JobRow: React.FC<{ job: JobView }> = ({ job }) => {
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refreshJobs, updateJobStatus, deleteJob } = useDashboardJob();

  // İlanın durum bilgisine göre renk ve ikon belirleme
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "published":
        return {
          icon: <CheckCircle size={16} />,
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          label: "Yayında",
        };
      case "draft":
        return {
          icon: <Clock size={16} />,
          color: "text-amber-600 bg-amber-50 border-amber-200",
          label: "Taslak",
        };
      case "closed":
        return {
          icon: <XCircle size={16} />,
          color: "text-red-600 bg-red-50 border-red-200",
          label: "Kapalı",
        };
      case "deleted":
        return {
          icon: <AlertCircle size={16} />,
          color: "text-zinc-600 bg-zinc-50 border-zinc-200",
          label: "Silinmiş",
        };
      default:
        return {
          icon: <AlertCircle size={16} />,
          color: "text-zinc-600 bg-zinc-50 border-zinc-200",
          label: "Bilinmiyor",
        };
    }
  };

  const statusConfig = getStatusConfig(job.status);

  // İş ilanını sil
  const handleDelete = async () => {
    if (isDeleting) return;

    const confirmDelete = window.confirm(
      "Bu iş ilanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    );

    if (confirmDelete) {
      setIsDeleting(true);
      try {
        const success = await deleteJob(job.id);
        if (success) {
          toast.success("İş ilanı başarıyla silindi");
          refreshJobs();
        } else {
          toast.error("İş ilanı silinirken bir hata oluştu");
        }
      } catch (error) {
        toast.error("İşlem sırasında bir hata oluştu");
      } finally {
        setIsDeleting(false);
        setShowActions(false);
      }
    }
  };

  // Durum güncelleme
  const handleStatusUpdate = async (newStatus: string) => {
    try {
      const success = await updateJobStatus(job.id, newStatus);
      if (success) {
        toast.success(
          `İlan durumu "${getStatusConfig(newStatus).label}" olarak güncellendi`,
        );
        refreshJobs();
      } else {
        toast.error("Durum güncellenirken bir hata oluştu");
      }
    } catch (error) {
      toast.error("İşlem sırasında bir hata oluştu");
    } finally {
      setShowActions(false);
    }
  };

  return (
    <tr className="hover:bg-primary-50/40 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start">
          {/* İlan görseli (varsa) */}
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
            {job.details.image ? (
              <img
                src={job.details.image}
                alt={job.details.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-job.jpg";
                }}
              />
            ) : (
              <Briefcase className="h-5 w-5 text-zinc-400" />
            )}
          </div>

          <div className="ml-4">
            <div className="text-sm font-medium text-zinc-900">
              {job.details.title}
            </div>

            <div className="mt-1 flex flex-wrap gap-2 text-xs text-zinc-500">
              {job.details.workMode && job.details.workMode !== "Any" && (
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.details.workMode}
                </span>
              )}

              {job.categories?.length > 0 && (
                <span>
                  {job.categories.map((c) => c.displayName).join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConfig.color}`}
        >
          {statusConfig.icon}
          <span className="ml-1">{statusConfig.label}</span>
        </span>
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500">
        {job.details.applicants || 0} başvuru
      </td>

      <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-500">
        <div className="flex flex-col">
          <span>{formatDate(job.createdAt, "tr")}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
        <div className="z-10 mt-2 flex shrink-0 flex-row items-center justify-end gap-2 p-2">
          <a
            href={`/tr/jobs/${job.slug}`}
            target="_blank"
            className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
            title="Görüntüle"
          >
            <Eye className="h-4 w-4" />
          </a>

          <Link
            to={`/dashboard/job/edit/${job.id}`}
            className="shrink-0 items-center justify-center rounded-md border border-blue-200 bg-white p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            <Edit className="h-4 w-4" />
          </Link>

          {job.status === "published" ? (
            <button
              onClick={() => handleStatusUpdate("closed")}
              className="inline-flex items-center justify-center rounded-md border border-amber-200 bg-white p-2 text-amber-500 hover:bg-amber-50 hover:text-amber-600"
              title="Kapat"
            >
              <XCircle className="h-4 w-4" />
            </button>
          ) : job.status === "closed" ? (
            <button
              onClick={() => handleStatusUpdate("published")}
              className="inline-flex items-center justify-center rounded-md border border-emerald-200 bg-white p-2 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
              title="Yeniden Yayınla"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : null}

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center rounded-md border border-red-200 bg-white p-2 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
            title="Sil"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};
