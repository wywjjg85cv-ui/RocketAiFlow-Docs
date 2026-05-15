import { NextResponse, type NextRequest } from "next/server";
import {
  docsHomePath,
  getCanonicalPathForLocalizedPath,
  getCanonicalPathForPathname,
  getLocalizedPath,
  normalizePathname,
  pathToSegments
} from "./i18n/docs-routes";
import { defaultLocale, isLocale, localeCookieMaxAge, localeCookieName, normalizeLocale } from "./i18n/routing";

const PUBLIC_FILE_PATTERN = /\.[a-zA-Z0-9]+$/;

function shouldSkip(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_pagefind") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/screenshots") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE_PATTERN.test(pathname)
  );
}

function redirect(request: NextRequest, pathname: string, locale = defaultLocale) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookieName, locale, {
    maxAge: localeCookieMaxAge,
    path: "/",
    sameSite: "lax"
  });
  return response;
}

export function proxy(request: NextRequest) {
  const pathname = normalizePathname(request.nextUrl.pathname);

  if (shouldSkip(pathname)) {
    return NextResponse.next();
  }

  const cookieLocale = normalizeLocale(request.cookies.get(localeCookieName)?.value);
  const segments = pathToSegments(pathname);
  const [maybeLocale, ...rest] = segments;

  if (!segments.length) {
    return redirect(request, getLocalizedPath(docsHomePath, cookieLocale), cookieLocale);
  }

  if (isLocale(maybeLocale)) {
    const locale = maybeLocale;

    if (!rest.length) {
      return redirect(request, getLocalizedPath(docsHomePath, locale), locale);
    }

    const localizedPath = `/${rest.join("/")}`;
    const canonicalFromLocalized = getCanonicalPathForLocalizedPath(locale, localizedPath);
    const canonicalFromEnglishPath = getCanonicalPathForPathname(localizedPath);

    if (!canonicalFromLocalized && canonicalFromEnglishPath) {
      return redirect(request, getLocalizedPath(canonicalFromEnglishPath, locale), locale);
    }

    const response = NextResponse.next();
    response.cookies.set(localeCookieName, locale, {
      maxAge: localeCookieMaxAge,
      path: "/",
      sameSite: "lax"
    });
    return response;
  }

  const canonicalPath = getCanonicalPathForPathname(pathname);

  if (canonicalPath) {
    return redirect(request, getLocalizedPath(canonicalPath, cookieLocale), cookieLocale);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
