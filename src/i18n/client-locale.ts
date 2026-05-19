"use client";

import { createContext, createElement, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import {
  defaultLocale,
  isLocale,
  localeCookieMaxAge,
  localeCookieName,
  normalizeLocale,
  type Locale
} from "./routing";

const localeListeners = new Set<() => void>();
const InitialLocaleContext = createContext<Locale | null>(null);

function getPathLocale() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const [maybeLocale] = window.location.pathname.split("/").filter(Boolean);
  return isLocale(maybeLocale) ? maybeLocale : undefined;
}

function getBrowserLocale() {
  if (typeof document === "undefined") {
    return defaultLocale;
  }

  const pathLocale = getPathLocale();

  if (pathLocale) {
    return pathLocale;
  }

  const cookieLocale = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${localeCookieName}=`))
    ?.split("=")[1];

  return normalizeLocale(cookieLocale);
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

export function LocaleProvider({
  initialLocale,
  children
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  return createElement(InitialLocaleContext.Provider, { value: initialLocale }, children);
}

export function useCurrentLocale(initialLocale?: Locale) {
  const contextLocale = useContext(InitialLocaleContext);
  const serverLocale = contextLocale ?? initialLocale ?? defaultLocale;
  const locale = useSyncExternalStore(subscribeLocale, getBrowserLocale, () => serverLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return locale;
}
