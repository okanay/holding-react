import globals from "@/globals.css?url";
import leaflet from "../../public/leaflet.css?url";

import { detectLanguage } from "@/i18n/action";
import { ACTIVE_LANGUAGE_DICTONARY } from "@/i18n/config";
import LanguageProvider from "@/i18n/provider";
import { RootProviders } from "@/providers";
import { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  loader: async (ctx) => {
    const segments = ctx.location.pathname.split("/").filter(Boolean);
    const [lang, ...restSegments] = segments;

    const isSupported = ACTIVE_LANGUAGE_DICTONARY.some(
      ({ value }) => value === lang,
    );

    if (isSupported) {
      return { lang };
    }

    const restPath = restSegments.length ? `/${restSegments.join("/")}` : "";
    const detectedLanguage = await detectLanguage();

    return redirect({
      to: `/${detectedLanguage}${restPath}`,
      throw: true,
    });
  },
  head: () => {
    return {
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#ffffff",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#000000",
        },
      ],
      links: [
        {
          rel: "preload stylesheet",
          as: "style",
          type: "text/css",
          crossOrigin: "anonymous",
          href: globals,
        },
        {
          rel: "preload stylesheet",
          as: "style",
          type: "text/css",
          crossOrigin: "anonymous",
          href: leaflet,
        },
        {
          rel: "icon",
          href: "/metadata/favicons/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/metadata/favicons/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/metadata/site.webmanifest",
          color: "#ffffff",
        },
        {
          rel: "sitemap",
          type: "application/xml",
          title: "sitemap",
          href: `/api/sitemap`,
        },
        {
          rel: "preload",
          as: "image",
          type: "image/svg+xml",
          href: `/images/brand.svg`,
        },
        {
          rel: "preload stylesheet",
          as: "style",
          crossOrigin: "anonymous",
          href: `/fonts/custom-sans/font.css`,
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          href: `/fonts/custom-sans/regular.woff2`,
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          href: `/fonts/custom-sans/medium.woff2`,
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          href: `/fonts/custom-sans/semibold.woff2`,
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          href: `/fonts/custom-sans/bold.woff2`,
        },
      ],
    };
  },
  component: RootComponent,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang } = Route.useLoaderData();
  const language = ACTIVE_LANGUAGE_DICTONARY.find(
    (entry) => entry.value === lang,
  );

  return (
    <html lang={language.seo.locale} dir={language.seo.direction}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { lang } = Route.useLoaderData();
  return (
    <RootDocument>
      <LanguageProvider serverLanguage={lang}>
        <RootProviders>
          <Outlet />
        </RootProviders>
      </LanguageProvider>
    </RootDocument>
  );
}
