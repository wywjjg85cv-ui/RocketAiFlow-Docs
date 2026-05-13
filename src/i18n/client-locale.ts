"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  defaultLocale,
  localeCookieMaxAge,
  localeCookieName,
  normalizeLocale,
  type Locale
} from "./routing";

const localeListeners = new Set<() => void>();

function getCookieLocale() {
  if (typeof document === "undefined") {
    return defaultLocale;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${localeCookieName}=`))
    ?.split("=")[1];

  return normalizeLocale(cookie);
}

function subscribeLocale(listener: () => void) {
  localeListeners.add(listener);
  return () => {
    localeListeners.delete(listener);
  };
}

function emitLocaleChange() {
  localeListeners.forEach((listener) => listener());
}

export function setClientLocale(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${localeCookieMaxAge}; SameSite=Lax`;
  emitLocaleChange();
}

export function useCurrentLocale(initialLocale: Locale = defaultLocale) {
  const locale = useSyncExternalStore(subscribeLocale, getCookieLocale, () => initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return locale;
}
