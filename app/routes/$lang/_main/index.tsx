import { Link } from "@/i18n/link";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="from-primary-50/40 via-primary-50 to-primary-700/40 flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br p-8">
      {/* Title */}
      <h1 className="text-primary-950 mb-3 text-center text-3xl font-extrabold tracking-tight">
        Our Homepage is Under Construction
      </h1>
      {/* Description */}
      <p className="text-primary-900 mb-7 max-w-md text-center text-lg">
        We're working to welcome you soon. Interested in joining us? See our job
        postings.
        <br />
        <span className="text-primary-500 text-sm">
          (Bringing coffee is still allowed!)
        </span>
      </p>
      {/* Button */}
      <Link
        to="/jobs"
        className="from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus-visible:ring-primary-400 rounded-lg bg-gradient-to-r px-7 py-3 text-base font-semibold text-white shadow-sm transition focus-visible:ring-2 focus-visible:outline-none"
      >
        Go to Job Postings
      </Link>
    </div>
  );
}
