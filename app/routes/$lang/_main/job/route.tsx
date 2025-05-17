import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/_main/job")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    return {};
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="border-cover border-b">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-primary-600 py-4 text-3xl font-bold">
          <span className="font-extrabold">HOI</span>
          <span className="relative">
            Holding
            <span className="bg-primary-600 absolute -top-2 -right-2 h-2 w-2 rounded-full"></span>
          </span>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="border-cover border-t bg-zinc-50 py-6"></footer>;
}
