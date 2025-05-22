import { RootPressExamplePage } from "@/components/pages/press";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/_statik/press")({
  component: RootPressExamplePage,
});
