"use client";

import { useCurrentLocale } from "../../i18n/client-locale";
import { defaultLocale, type Locale } from "../../i18n/routing";

type ApiReferenceCopy = {
  title: string;
  paragraphs: string[];
};

const apiReferenceCopy: Record<Locale, ApiReferenceCopy> = {
  en: {
    title: "API Reference",
    paragraphs: [
      "RocketAiFlow APIs are available inside each customer installation.",
      "In the customer environment, open the /api/docs section of that installation to browse the available endpoints, request parameters, payloads, and responses."
    ]
  },
  it: {
    title: "Riferimento API",
    paragraphs: [
      "Le API RocketAiFlow sono disponibili dentro ogni installazione cliente.",
      "Nell'ambiente del cliente, apri la sezione /api/docs di quella installazione per consultare gli endpoint disponibili, i parametri delle richieste, i payload e le risposte."
    ]
  }
};

function useApiReferenceCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return apiReferenceCopy[locale];
}

export function LocalizedApiReferenceTitle() {
  return <>{useApiReferenceCopy().title}</>;
}

export function LocalizedApiReference() {
  const copy = useApiReferenceCopy();

  return (
    <section className="docs-home-section">
      {copy.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
