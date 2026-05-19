"use client";

import { Search } from "nextra/components";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "../../i18n/client-locale";
import { defaultLocale, isLocale, type Locale } from "../../i18n/routing";

const searchCopy: Record<Locale, { placeholder: string }> = {
  en: {
    placeholder: "Search documentation…"
  },
  it: {
    placeholder: "Cerca nella documentazione…"
  }
};

function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function LocalizedSearch() {
  const pathname = usePathname();
  const pathLocale = getLocaleFromPathname(pathname);
  const locale = useCurrentLocale(pathLocale);

  return <Search placeholder={searchCopy[locale].placeholder} />;
}
