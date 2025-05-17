// @ts-ignore
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./providers/query";
import { DefaultNotFound } from "./routes/$lang/not-found";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "false",
    defaultNotFoundComponent: () => <DefaultNotFound />,
    scrollRestoration: true,
    scrollBehavior: "instant",
  } as any);

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
