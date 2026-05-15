"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

const SKIP_INTERNAL_LINK_PATTERN =
  /^\/(?:_next|_pagefind|api|screenshots|favicon\.ico|favicon\.svg|logo|logo192\.png|logo512\.png)(?:\/|$)/;
const FILE_LINK_PATTERN = /\.[a-zA-Z0-9]+(?:[?#].*)?$/;

function shouldLocalizeHref(href: string) {
  return (
    href.startsWith("/") &&
    !href.startsWith("//") &&
    !href.startsWith("/#") &&
    !SKIP_INTERNAL_LINK_PATTERN.test(href) &&
    !FILE_LINK_PATTERN.test(href)
  );
}

function localizeDocumentLinks(locale: Locale) {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !shouldLocalizeHref(href)) {
      return;
    }

    const localizedHref = localizeHref(href, locale);

    if (localizedHref !== href) {
      link.setAttribute("href", localizedHref);
    }
  });
}

export function LocalizedInternalLinks() {
  const locale = useCurrentLocale(defaultLocale);
  const pathname = usePathname();

  useEffect(() => {
    localizeDocumentLinks(locale);

    const observer = new MutationObserver(() => {
      localizeDocumentLinks(locale);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [locale, pathname]);

  return null;
}
