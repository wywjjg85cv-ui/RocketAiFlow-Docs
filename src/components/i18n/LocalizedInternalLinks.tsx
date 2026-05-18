"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "../../i18n/client-locale";
import {
  getCanonicalPathForPathname,
  localizeHref,
  normalizePathname
} from "../../i18n/docs-routes";
import { defaultLocale, locales, type Locale } from "../../i18n/routing";

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

function getPathLocale(pathname: string, fallbackLocale: Locale): Locale {
  const [maybeLocale] = normalizePathname(pathname).slice(1).split("/");
  return locales.includes(maybeLocale as Locale) ? (maybeLocale as Locale) : fallbackLocale;
}

function clearActiveNavSectionState() {
  document
    .querySelectorAll<HTMLElement>(".docs-sidebar-section-active, .docs-sidebar-section-active-item")
    .forEach((element) => {
      element.classList.remove("docs-sidebar-section-active", "docs-sidebar-section-active-item");
    });
}

function markActiveParentSections(link: HTMLAnchorElement) {
  let nestedList = link.closest("ul");

  while (nestedList) {
    const parentListItem = nestedList.parentElement?.closest("li");

    if (!parentListItem) {
      break;
    }

    const sectionControl = Array.from(parentListItem.children).find(
      (child) => child instanceof HTMLElement && child.matches("button, a")
    );

    parentListItem.classList.add("docs-sidebar-section-active-item");
    sectionControl?.classList.add("docs-sidebar-section-active");

    nestedList = parentListItem.parentElement?.closest("ul") ?? null;
  }
}

function markActiveNavLinks(pathname: string, locale: Locale) {
  const currentCanonicalPath = getCanonicalPathForPathname(pathname);
  clearActiveNavSectionState();

  document
    .querySelectorAll<HTMLAnchorElement>(
      ".nextra-sidebar a:has(.docs-nav-label), .nextra-mobile-nav a:has(.docs-nav-label)"
    )
    .forEach((link) => {
      const href = link.getAttribute("href");
      const linkCanonicalPath = href ? getCanonicalPathForPathname(localizeHref(href, locale)) : undefined;
      const isActive = Boolean(currentCanonicalPath && linkCanonicalPath === currentCanonicalPath);
      const parentListItem = link.closest("li");

      if (isActive) {
        link.classList.add("docs-sidebar-active");
        link.dataset.state = "active";
        link.setAttribute("aria-current", "page");
        parentListItem?.classList.add("active");
        markActiveParentSections(link);
        return;
      }

      link.classList.remove("docs-sidebar-active");

      if (link.dataset.state === "active") {
        delete link.dataset.state;
      }

      if (link.getAttribute("aria-current") === "page") {
        link.removeAttribute("aria-current");
      }

      parentListItem?.classList.remove("active");
    });
}

export function LocalizedInternalLinks() {
  const storedLocale = useCurrentLocale(defaultLocale);
  const pathname = usePathname();
  const locale = getPathLocale(pathname, storedLocale);

  useEffect(() => {
    localizeDocumentLinks(locale);
    markActiveNavLinks(pathname, locale);

    const observer = new MutationObserver(() => {
      localizeDocumentLinks(locale);
      markActiveNavLinks(pathname, locale);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [locale, pathname]);

  return null;
}
