import {
  DEFAULT_LANGUAGE,
  I18N_COOKIE_NAME,
  SUPPORTED_LANGUAGES,
} from "@/i18n/config";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

export function parseCookies(cookieString: string): Record<string, string> {
  if (!cookieString) return {};
  return cookieString.split(";").reduce(
    (acc, pair) => {
      const [key, ...rest] = pair.trim().split("=");
      if (key && rest.length > 0) {
        acc[key] = decodeURIComponent(rest.join("="));
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function getLanguageFromCookie(cookieHeader: string): Language | null {
  if (!cookieHeader) return null;
  const cookies = parseCookies(cookieHeader);
  const lang = cookies[I18N_COOKIE_NAME];
  return lang && SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : null;
}

export function getLanguageFromHeader(acceptLanguage: string): Language | null {
  if (!acceptLanguage) return null;
  return acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().split("-")[0])
    .find((code) =>
      SUPPORTED_LANGUAGES.includes(code as Language),
    ) as Language | null;
}

export function getLanguageFromSearch(
  search: Record<string, unknown>,
): Language {
  const lang = typeof search?.lang === "string" ? search.lang : null;
  return lang && SUPPORTED_LANGUAGES.includes(lang as Language)
    ? (lang as Language)
    : DEFAULT_LANGUAGE;
}

export function buildSearchParams(
  searchParams: URLSearchParams,
  lang: string,
): Record<string, string> {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    if (key !== "lang") params[key] = value;
  });
  params.lang = lang;
  return params;
}

export const detectLanguage = createServerFn({
  method: "GET",
}).handler(async () => {
  const headers = getHeaders();

  // Cookie'den dil tercihini kontrol et
  const cookies = headers["cookie"];
  const langFromCookie = getLanguageFromCookie(cookies || "");

  // Accept-Language header'ını kontrol et
  const acceptLanguage = headers["accept-language"];
  const langFromHeader = getLanguageFromHeader(acceptLanguage || "");

  // Öncelik sırasına göre dil belirle
  return langFromCookie || langFromHeader || DEFAULT_LANGUAGE;
});
