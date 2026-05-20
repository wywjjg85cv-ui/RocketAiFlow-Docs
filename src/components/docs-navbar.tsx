"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "nextra-theme-docs";
import { LocaleSwitcher } from "./i18n/LocaleSwitcher";
import { useCurrentLocale } from "../i18n/client-locale";
import { getCanonicalPathForPathname, localizeHref } from "../i18n/docs-routes";
import { defaultLocale, isLocale, type Locale } from "../i18n/routing";

const docsHomeHref = "/get-started/introduction";

const navItems = [
  { href: docsHomeHref, labelKey: "documentation" },
  { href: "/integrations", labelKey: "integrations" },
  { href: "/reference/changelog", labelKey: "changelog" }
] as const;

const navbarCopy = {
  en: {
    documentation: "Documentation",
    integrations: "Integrations",
    changelog: "Changelog",
    contactSales: "Contact Sales",
    mobileContactSales: "Contact",
    primary: "Primary"
  },
  it: {
    documentation: "Documentazione",
    integrations: "Integrazioni",
    changelog: "Changelog",
    contactSales: "Contatta sales",
    mobileContactSales: "Contatta",
    primary: "Navigazione principale"
  }
} as const satisfies Record<
  Locale,
  Record<
    "documentation" | "integrations" | "changelog" | "contactSales" | "mobileContactSales" | "primary",
    string
  >
>;

type DocsNavbarProps = {
  initialLocale?: Locale;
};

function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function DocsNavbar({ initialLocale }: DocsNavbarProps) {
  const pathname = usePathname();
  const pathLocale = getLocaleFromPathname(pathname);
  const locale = useCurrentLocale(initialLocale ?? pathLocale);
  const copy = navbarCopy[locale];
  const canonicalPath = getCanonicalPathForPathname(pathname) ?? pathname;

  return (
    <Navbar
      logo={
        <span className="docs-logo-lockup">
          <svg
            viewBox="0 0 276 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="docs-brand-logo"
            aria-label="RocketAiFlow"
            role="img"
          >
            <image
              href="/logo-rocket.svg"
              x="0"
              y="0"
              width="46"
              height="60"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="60"
              y="24"
              fill="currentColor"
              fontSize="18"
              fontWeight="600"
              fontFamily="Urbanist, sans-serif"
              letterSpacing="0.2"
            >
              Rocket
            </text>
            <text
              x="60"
              y="46"
              fill="var(--docs-logo-accent)"
              fontSize="24"
              fontWeight="700"
              fontFamily="Urbanist, sans-serif"
              letterSpacing="0.1"
            >
              AiFlow
            </text>
          </svg>
        </span>
      }
      logoLink={localizeHref(docsHomeHref, locale)}
    >
      <div key="docs-navbar-actions" className="docs-navbar-actions">
        <nav aria-label={copy.primary} className="docs-topnav">
          {navItems.map((item) => {
            const nonDocsPrefixes = navItems
              .filter((navItem) => navItem.href !== docsHomeHref)
              .map((navItem) => navItem.href);
            const isDocsPath = !nonDocsPrefixes.some(
              (prefix) => canonicalPath === prefix || canonicalPath.startsWith(`${prefix}/`)
            );
            const isActive =
              item.href === docsHomeHref
                ? isDocsPath
                : canonicalPath === item.href || canonicalPath.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={localizeHref(item.href, locale)}
                className={`docs-topnav-link${isActive ? " is-active" : ""}`}
              >
                {copy[item.labelKey]}
              </Link>
            );
          })}
        </nav>
        <a
          className="docs-contact-sales-button"
          data-analytics-event="docs_contact_sales_click"
          data-analytics-label={copy.contactSales}
          data-mobile-label={copy.mobileContactSales}
          href="https://rocketaiflow.com/it/contatti"
          rel="noopener noreferrer"
          target="_blank"
        >
          {copy.contactSales}
        </a>
        <LocaleSwitcher initialLocale={initialLocale ?? pathLocale} />
      </div>
    </Navbar>
  );
}
