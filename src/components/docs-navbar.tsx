"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "nextra-theme-docs";
import { LocaleSwitcher } from "./i18n/LocaleSwitcher";
import { useCurrentLocale } from "../i18n/client-locale";
import { defaultLocale, type Locale } from "../i18n/routing";

const docsHomeHref = "/get-started/introduction";

const navItems = [
  { href: docsHomeHref, labelKey: "documentation" },
  { href: "/reference/api-reference", labelKey: "apiReference" },
  { href: "/integrations", labelKey: "integrations" },
  { href: "/reference/changelog", labelKey: "changelog" }
] as const;

const navbarCopy = {
  en: {
    documentation: "Documentation",
    apiReference: "API Reference",
    integrations: "Integrations",
    changelog: "Changelog",
    primary: "Primary"
  },
  it: {
    documentation: "Documentazione",
    apiReference: "Riferimento API",
    integrations: "Integrazioni",
    changelog: "Changelog",
    primary: "Navigazione principale"
  }
} as const satisfies Record<Locale, Record<"documentation" | "apiReference" | "integrations" | "changelog" | "primary", string>>;

type DocsNavbarProps = {
  initialLocale?: Locale;
};

export function DocsNavbar({ initialLocale }: DocsNavbarProps) {
  const pathname = usePathname();
  const locale = useCurrentLocale(initialLocale ?? defaultLocale);
  const copy = navbarCopy[locale];

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
              fill="white"
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
              fill="#7DD3FC"
              fontSize="24"
              fontWeight="700"
              fontFamily="Urbanist, sans-serif"
              letterSpacing="0.1"
            >
              AiFlow
            </text>
          </svg>
          <span className="docs-logo-badge">{copy.documentation}</span>
        </span>
      }
      logoLink={docsHomeHref}
    >
      <div key="docs-navbar-actions" className="docs-navbar-actions">
        <nav aria-label={copy.primary} className="docs-topnav">
          {navItems.map((item) => {
            const nonDocsPrefixes = navItems
              .filter((navItem) => navItem.href !== docsHomeHref)
              .map((navItem) => navItem.href);
            const isDocsPath = !nonDocsPrefixes.some(
              (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
            );
            const isActive =
              item.href === docsHomeHref
                ? isDocsPath
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`docs-topnav-link${isActive ? " is-active" : ""}`}
              >
                {copy[item.labelKey]}
              </Link>
            );
          })}
        </nav>
        <LocaleSwitcher initialLocale={initialLocale} />
      </div>
    </Navbar>
  );
}
