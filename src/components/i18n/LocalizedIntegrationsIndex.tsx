"use client";

import Link from "next/link";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

const integrationsCopy: Record<Locale, {
  title: string;
  paragraphs: string[];
  cardTitle: string;
  cardDescription: string;
}> = {
  en: {
    title: "Integrations",
    paragraphs: [
      "RocketAiFlow integrations connect voice agents to the systems that move calls, enrich context, and complete business actions.",
      "Start with the integration category that matches the system you need to connect."
    ],
    cardTitle: "Telephony",
    cardDescription: "Connect RocketAiFlow with Asterisk-based PBX systems and trunk-based call flows."
  },
  it: {
    title: "Integrazioni",
    paragraphs: [
      "Le integrazioni RocketAiFlow collegano gli agenti vocali ai sistemi che gestiscono chiamate, arricchiscono il contesto e completano azioni di business.",
      "Parti dalla categoria di integrazione che corrisponde al sistema che devi collegare."
    ],
    cardTitle: "Telephony",
    cardDescription: "Collega RocketAiFlow a sistemi PBX basati su Asterisk e a flussi di chiamata trunk-based."
  }
};

function useIntegrationsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return integrationsCopy[locale];
}

export function LocalizedIntegrationsTitle() {
  return <>{useIntegrationsCopy().title}</>;
}

export function LocalizedIntegrationsIntro() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      {copy.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedIntegrationsCards() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-2">
        <Link className="docs-home-card" href="/integrations/telephony/asterisk-based-pbx-systems">
          <span className="docs-home-card-title">{copy.cardTitle}</span>
          <span className="docs-home-card-description">{copy.cardDescription}</span>
        </Link>
      </div>
    </section>
  );
}
