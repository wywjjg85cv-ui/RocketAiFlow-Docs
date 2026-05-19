"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey = "requirements" | "setup" | "validation" | "review" | "keepNarrow" | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type AiInboundRoutingCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshotAlt: string;
  screenshotCaption: string;
  nextSteps: LinkCard[];
};

const screenshotPath = "/screenshots/docs/inbound-route-connection.png";

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

const aiInboundRoutingCopy: Record<Locale, AiInboundRoutingCopy> = {
  en: {
    title: "AI Inbound Routing",
    intro: [
      "AI Inbound Routing connects an inbound trunk path to the AI voice agent that should answer incoming calls.",
      "This is where the route becomes operational: select the trunk that receives the call, select the agent that should answer, then set how many concurrent calls that agent can handle through this route."
    ],
    headings: {
      requirements: "What you need before routing",
      setup: "Basic routing setup",
      validation: "What to verify",
      review: "Routing review questions",
      keepNarrow: "Keep the first route narrow",
      nextSteps: "Next steps"
    },
    sections: {
      requirements: {
        title: "What you need before routing",
        paragraphs: ["Before configuring the route, make sure the telephony path and the agent are ready."],
        items: [
          "the AI voice agent already exists",
          "the prompt and greeting have been configured",
          "transfer, hangup, or fallback behavior is available if the workflow needs it",
          "the inbound trunk is configured, enabled, and registered",
          "the expected concurrent call capacity for the first test is clear"
        ]
      },
      setup: {
        title: "Basic routing setup",
        paragraphs: [
          <>Open <UiPill>Inbound Ai</UiPill>, then <UiPill>AI Inbound Routing</UiPill>, and create or edit the inbound route.</>
        ],
        items: [
          <><strong>Trunk:</strong> select the inbound trunk or entry point that receives the call from the telephony provider or PBX.</>,
          <><strong>Agent:</strong> select the AI voice agent that must answer calls arriving through that trunk.</>,
          <><strong>Active:</strong> enable or disable the inbound route without deleting its configuration.</>,
          <><strong>Concurrent calls:</strong> set the maximum number of simultaneous calls the selected agent can handle on this inbound route. Calls that exceed this limit are returned as busy.</>
        ]
      },
      validation: {
        title: "What to verify",
        paragraphs: ["After saving the route, place a controlled inbound test call and confirm the full path."],
        items: [
          "the call enters through the expected trunk",
          "the route sends the call to the expected agent",
          "the greeting starts as expected",
          "the prompt behavior matches the intended use case",
          "transfer or hangup logic works when requested",
          "the concurrent call limit is not higher than what the agent, trunk, and deployment can handle"
        ]
      },
      review: {
        title: "Routing review questions",
        paragraphs: ["If the inbound route is not behaving correctly, review the routing layer before changing the prompt."],
        items: [
          "is the correct trunk selected?",
          "is the correct agent selected?",
          "is the trunk registered and reachable?",
          "is the concurrent call limit too high or too low for the current test?",
          "does the agent have the required functions for transfer, callback, or hangup?"
        ]
      },
      keepNarrow: {
        title: "Keep the first route narrow",
        paragraphs: [
          "Avoid combining too many scenarios in the first inbound configuration.",
          "It is easier to validate one clear route than to debug multiple agents, trunks, fallback paths, and concurrency changes at the same time."
        ]
      }
    },
    screenshotAlt: "AI Inbound Routing form showing route name, phone number, active state, recording setting, selected agent, selected trunk, and concurrent call limit.",
    screenshotCaption: "AI Inbound Routing connects the inbound trunk, the answering agent, and the concurrent call limit for that route.",
    nextSteps: [
      {
        title: "Phone",
        href: "/run-workflows/phone",
        description: "Run focused agent tests before or after connecting a real inbound trunk route."
      },
      {
        title: "Call Records",
        href: "/run-workflows/call-records",
        description: "Review the call outcome, transcript, timing, recording, and workflow data after the test."
      },
      {
        title: "Contact Inbounds",
        href: "/run-workflows/inbound-ai/contact-inbounds",
        description: "Prepare contact lookup data when inbound callers should be recognized by phone number."
      }
    ]
  },
  it: {
    title: "AI Inbound Routing",
    intro: [
      "AI Inbound Routing collega un percorso trunk inbound all'AI voice agent che deve rispondere alle chiamate in ingresso.",
      "Qui la route diventa operativa: selezioni il trunk che riceve la chiamata, selezioni l'agente che deve rispondere e imposti quante chiamate concorrenti quell'agente può gestire tramite questa route."
    ],
    headings: {
      requirements: "Cosa serve prima del routing",
      setup: "Setup base della route",
      validation: "Cosa verificare",
      review: "Domande di review del routing",
      keepNarrow: "Mantieni stretta la prima route",
      nextSteps: "Passaggi successivi"
    },
    sections: {
      requirements: {
        title: "Cosa serve prima del routing",
        paragraphs: ["Prima di configurare la route, assicurati che percorso telefonico e agente siano pronti."],
        items: [
          "l'AI voice agent esiste già",
          "prompt e greeting sono stati configurati",
          "transfer, hangup o fallback sono disponibili se il workflow li richiede",
          "il trunk inbound è configurato, attivo e registrato",
          "la capacità di chiamate concorrenti attesa per il primo test è chiara"
        ]
      },
      setup: {
        title: "Setup base della route",
        paragraphs: [
          <>Apri <UiPill>Inbound Ai</UiPill>, poi <UiPill>AI Inbound Routing</UiPill>, e crea o modifica la route inbound.</>
        ],
        items: [
          <><strong>Trunk:</strong> seleziona il trunk inbound o entry point che riceve la chiamata dal provider telefonico o dal PBX.</>,
          <><strong>Agent:</strong> seleziona l'AI voice agent che deve rispondere alle chiamate arrivate da quel trunk.</>,
          <><strong>Active:</strong> attiva o disattiva la route inbound senza eliminare la configurazione.</>,
          <><strong>Concurrent calls:</strong> imposta il numero massimo di chiamate simultanee che l'agente selezionato può gestire su questa route inbound. Le chiamate che superano questo limite vanno in busy.</>
        ]
      },
      validation: {
        title: "Cosa verificare",
        paragraphs: ["Dopo aver salvato la route, fai una chiamata inbound controllata e conferma tutto il percorso."],
        items: [
          "la chiamata entra dal trunk atteso",
          "la route manda la chiamata all'agente corretto",
          "il greeting parte come previsto",
          "il comportamento del prompt corrisponde al caso d'uso",
          "transfer o hangup funzionano quando richiesti",
          "il limite di chiamate concorrenti non supera quello che agente, trunk e deploy possono gestire"
        ]
      },
      review: {
        title: "Domande di review del routing",
        paragraphs: ["Se la route inbound non si comporta correttamente, controlla prima il layer di routing invece di cambiare subito il prompt."],
        items: [
          "è selezionato il trunk corretto?",
          "è selezionato l'agente corretto?",
          "il trunk è registrato e raggiungibile?",
          "il limite di chiamate concorrenti è troppo alto o troppo basso per il test corrente?",
          "l'agente ha le functions richieste per transfer, callback o hangup?"
        ]
      },
      keepNarrow: {
        title: "Mantieni stretta la prima route",
        paragraphs: [
          "Evita di combinare troppi scenari nella prima configurazione inbound.",
          "È più semplice validare una route chiara che debuggare insieme più agenti, trunk, fallback e modifiche di concorrenza."
        ]
      }
    },
    screenshotAlt: "Form AI Inbound Routing con nome route, numero di telefono, stato active, recording, agente selezionato, trunk selezionato e limite di chiamate concorrenti.",
    screenshotCaption: "AI Inbound Routing collega trunk inbound, agente che risponde e limite di chiamate concorrenti per quella route.",
    nextSteps: [
      {
        title: "Phone",
        href: "/run-workflows/phone",
        description: "Esegui test mirati dell'agente prima o dopo il collegamento a una route trunk inbound reale."
      },
      {
        title: "Registro chiamate",
        href: "/run-workflows/call-records",
        description: "Rivedi outcome, transcript, timing, registrazione e dati workflow dopo il test."
      },
      {
        title: "Contatti inbound",
        href: "/run-workflows/inbound-ai/contact-inbounds",
        description: "Prepara i dati di lookup quando i chiamanti inbound devono essere riconosciuti dal numero."
      }
    ]
  }
};

function useAiInboundRoutingCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: aiInboundRoutingCopy[locale], locale };
}

function Section({ section }: { section: SectionCopy }) {
  return (
    <section className="docs-home-section">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.items ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LocalizedAiInboundRoutingTitle() {
  return <>{useAiInboundRoutingCopy().copy.title}</>;
}

export function LocalizedAiInboundRoutingIntro() {
  const { copy } = useAiInboundRoutingCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedAiInboundRoutingHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return <>{useAiInboundRoutingCopy().copy.headings[sectionKey]}</>;
}

export function LocalizedAiInboundRoutingSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  return <Section section={useAiInboundRoutingCopy().copy.sections[sectionKey]} />;
}

export function LocalizedAiInboundRoutingSetup() {
  const { copy } = useAiInboundRoutingCopy();

  return (
    <section className="docs-home-section">
      {copy.sections.setup.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.sections.setup.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          <img className="docs-screenshot-img" src={screenshotPath} alt={copy.screenshotAlt} loading="lazy" />
        </div>
        <figcaption className="docs-screenshot-caption">{copy.screenshotCaption}</figcaption>
      </figure>
    </section>
  );
}

export function LocalizedAiInboundRoutingNextSteps() {
  const { copy, locale } = useAiInboundRoutingCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-2">
        {copy.nextSteps.map((card) => (
          <Link className="docs-home-card" href={localizeHref(card.href, locale)} key={card.href}>
            <span className="docs-home-card-title">{card.title}</span>
            <span className="docs-home-card-description">{card.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
