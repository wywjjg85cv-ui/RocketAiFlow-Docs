"use client";

import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type LegalPageKey =
  | "overview"
  | "terms"
  | "privacy"
  | "aiTransparency"
  | "security"
  | "imprint";

const legalTitles: Record<Locale, Record<LegalPageKey, string>> = {
  en: {
    overview: "Legal Status",
    terms: "Pilot Terms",
    privacy: "Data Protection",
    aiTransparency: "AI Transparency",
    security: "Security",
    imprint: "Company Notice"
  },
  it: {
    overview: "Stato legal",
    terms: "Termini pilot",
    privacy: "Data protection",
    aiTransparency: "Trasparenza AI",
    security: "Security",
    imprint: "Legal notice"
  }
};

export function LocalizedLegalTitle({ pageKey }: { pageKey: LegalPageKey }) {
  const locale = useCurrentLocale(defaultLocale);

  return <>{legalTitles[locale][pageKey]}</>;
}

export function LocalizedLegalEnglish({ children }: { children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return locale === "en" ? (
    <section lang="en" className="docs-legal-language-section">
      {children}
    </section>
  ) : null;
}

export function LocalizedLegalItalian({ children }: { children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return locale === "it" ? (
    <section lang="it" className="docs-legal-language-section">
      {children}
    </section>
  ) : null;
}
