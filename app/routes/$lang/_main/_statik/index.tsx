import { RootMainPage } from "@/components/pages/main";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/_statik/")({
  component: RootMainPage,
});
