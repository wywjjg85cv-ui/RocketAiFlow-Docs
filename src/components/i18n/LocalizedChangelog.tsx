"use client";

import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

const changelogCopy = {
  en: {
    title: "Changelog",
    intro:
      "This page records RocketAiFlow documentation and release notes when a new public version is published.",
    currentLabel: "Current version",
    currentTitle: "Initial documentation release",
    currentDescription:
      "The first public documentation version is available. No later product or documentation release has been published yet.",
    futureTitle: "Future updates",
    futureDescription:
      "New entries will be added here when a release changes setup guidance, workflow behavior, monitoring, telephony, integrations, or legal documentation."
  },
  it: {
    title: "Changelog",
    intro:
      "Questa pagina raccoglie le note di documentazione e release di RocketAiFlow quando viene pubblicata una nuova versione pubblica.",
    currentLabel: "Versione attuale",
    currentTitle: "Prima versione della documentazione",
    currentDescription:
      "La prima versione pubblica della documentazione è disponibile. Al momento non è stata pubblicata una versione successiva del prodotto o della documentazione.",
    futureTitle: "Aggiornamenti futuri",
    futureDescription:
      "Le nuove voci saranno aggiunte qui quando una release modifica setup, comportamento dei workflow, monitoring, telephony, integrazioni o documentazione legal."
  }
} as const satisfies Record<
  Locale,
  {
    title: string;
    intro: string;
    currentLabel: string;
    currentTitle: string;
    currentDescription: string;
    futureTitle: string;
    futureDescription: string;
  }
>;

function useChangelogCopy() {
  const locale = useCurrentLocale(defaultLocale);

  return changelogCopy[locale];
}

export function LocalizedChangelogTitle() {
  return <>{useChangelogCopy().title}</>;
}

export function LocalizedChangelog() {
  const copy = useChangelogCopy();

  return (
    <>
      <p>{copy.intro}</p>

      <div className="docs-accordion">
        <details className="docs-accordion-item" open>
          <summary>
            {copy.currentLabel}: {copy.currentTitle}
          </summary>
          <p>{copy.currentDescription}</p>
        </details>

        <details className="docs-accordion-item">
          <summary>{copy.futureTitle}</summary>
          <p>{copy.futureDescription}</p>
        </details>
      </div>
    </>
  );
}
