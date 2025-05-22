import { RootTeamPage } from "@/components/pages/team";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/_statik/team")({
  component: RootTeamPage,
});
