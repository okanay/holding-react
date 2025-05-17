import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/i18n/link";
import { Wrench } from "lucide-react";

export const Route = createFileRoute("/$lang/_auth/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center rounded-xl bg-gradient-to-br from-yellow-50 via-white to-blue-50 p-8">
      <div className="mb-6 flex items-center justify-center rounded-full bg-yellow-100 p-4 shadow-md">
        <Wrench className="h-14 w-14 text-yellow-500" />
      </div>
      <h1 className="mb-3 text-center text-3xl font-extrabold tracking-tight text-gray-800">
        Under Development
      </h1>
      <p className="mb-4 max-w-md text-center text-lg text-gray-600">
        This page is currently being built.
        <br />
        Please check back soon!
      </p>
      <Link
        to="/job"
        className="bg-primary text-color-primary rounded-md px-6 py-2 font-semibold shadow"
      >
        Go to Job page
      </Link>
    </div>
  );
}
