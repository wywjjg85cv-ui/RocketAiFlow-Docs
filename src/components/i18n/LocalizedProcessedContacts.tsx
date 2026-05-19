"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey = "whatItIs" | "filters" | "reviewList" | "inboundOutbound" | "callRecordsRelation" | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type ProcessedContactsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  nextSteps: LinkCard[];
};

const processedContactsCopy: Record<Locale, ProcessedContactsCopy> = {
  en: {
    title: "Processed Contacts",
    intro: [
      "Processed Contacts is the list of contacts RocketAiFlow has already handled through inbound or outbound workflows.",
      "Use this page as the operational history: it helps you find which contact was processed, from which workflow, and what happened before opening the detailed call record."
    ],
    headings: {
      whatItIs: "What this section represents",
      filters: "Use filters to find the right contact",
      reviewList: "What to review in the list",
      inboundOutbound: "Use it for inbound and outbound",
      callRecordsRelation: "How it relates to Call Records",
      nextSteps: "Next steps"
    },
    sections: {
      whatItIs: {
        title: "What this section represents",
        paragraphs: [
          "A processed contact is a contact or caller that RocketAiFlow has already handled in a real workflow.",
          "The list is useful when you need a fast index of handled interactions before opening the full call evidence."
        ]
      },
      filters: {
        title: "Use filters to find the right contact",
        paragraphs: [
          "The list includes filters that change based on the workflow direction you are reviewing.",
          "For inbound records, filter by voice agent when you need to isolate calls handled by a specific agent. For outbound records, filter by campaign when you need to isolate contacts processed by a specific dialer campaign."
        ],
        items: [
          "use the voice agent filter for inbound review",
          "use the campaign filter for outbound review",
          "use cause and status filters to focus on answered, failed, busy, no-answer or other result groups",
          "use the date range to limit the list to the period you are investigating"
        ]
      },
      reviewList: {
        title: "What to review in the list",
        paragraphs: [
          "Use the list to identify the interaction you want to inspect, then open the related call record when you need the full detail."
        ],
        items: [
          "contact or caller identity",
          "phone number",
          "workflow source, such as campaign or inbound route",
          "agent used by the interaction",
          "final outcome or status",
          "timing information when available",
          "whether transcript or recording data is available for deeper review"
        ]
      },
      inboundOutbound: {
        title: "Use it for inbound and outbound",
        paragraphs: [
          "For outbound, this list helps you understand which campaign contacts were called or consumed by the dialer and which result they produced.",
          "For inbound, it helps you review callers handled by inbound routing or matched through contact lookup."
        ]
      },
      callRecordsRelation: {
        title: "How it relates to Call Records",
        paragraphs: [
          "Processed Contacts is the list view. Call Records is the detailed evidence view.",
          <>After finding the right contact in the list, open <InlineDocLink href="/run-workflows/call-records">Call Records</InlineDocLink> to review overview, timeline, recording when enabled, transcript, Data, Lead Qualification Outcome, timing and final status.</>
        ]
      }
    },
    screenshot: {
      src: "/screenshots/docs/processed-contacts-filters-list.png",
      alt: "Processed Contacts list showing total inbound call records, voice agent filter, cause filter, status filter, date range, and rows with customer, phone, voice agent, status, cause, start time, end time, ring time, hold time, talk time and details action.",
      caption: "Use filters to narrow the list by workflow source, result, status and date range before opening the detailed call record."
    },
    nextSteps: [
      {
        title: "Call Records",
        href: "/run-workflows/call-records",
        description: "Open the detailed call evidence for a processed contact."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Review outbound campaign configuration when processed contacts come from the dialer."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Review inbound routing when processed contacts come from inbound calls."
      }
    ]
  },
  it: {
    title: "Contatti elaborati",
    intro: [
      "Contatti elaborati è la lista dei contatti che RocketAiFlow ha già gestito tramite workflow inbound o outbound.",
      "Usa questa pagina come storico operativo: ti aiuta a trovare quale contatto è stato elaborato, da quale workflow arriva e cosa è successo prima di aprire il dettaglio del call record."
    ],
    headings: {
      whatItIs: "Cosa rappresenta questa sezione",
      filters: "Usa i filtri per trovare il contatto giusto",
      reviewList: "Cosa controllare nella lista",
      inboundOutbound: "Usala per inbound e outbound",
      callRecordsRelation: "Come si collega al Registro chiamate",
      nextSteps: "Prossimi passi"
    },
    sections: {
      whatItIs: {
        title: "Cosa rappresenta questa sezione",
        paragraphs: [
          "Un contatto elaborato è un contatto o un chiamante che RocketAiFlow ha già gestito dentro un workflow reale.",
          "La lista è utile quando ti serve un indice rapido delle interazioni gestite prima di aprire l'evidenza completa della chiamata."
        ]
      },
      filters: {
        title: "Usa i filtri per trovare il contatto giusto",
        paragraphs: [
          "La lista include filtri che cambiano in base alla direzione del workflow che stai rivedendo.",
          "Per i record inbound, filtra per voice agent quando devi isolare le chiamate gestite da un agente specifico. Per i record outbound, filtra per campaign quando devi isolare i contatti elaborati da una specifica campagna dialer."
        ],
        items: [
          "usa il filtro voice agent per la review inbound",
          "usa il filtro campaign per la review outbound",
          "usa i filtri cause e status per concentrarti su answered, failed, busy, no-answer o altri gruppi di risultato",
          "usa il date range per limitare la lista al periodo che stai analizzando"
        ]
      },
      reviewList: {
        title: "Cosa controllare nella lista",
        paragraphs: [
          "Usa la lista per individuare l'interazione da analizzare, poi apri il call record collegato quando ti serve il dettaglio completo."
        ],
        items: [
          "identità del contatto o del chiamante",
          "numero di telefono",
          "origine workflow, per esempio campagna o route inbound",
          "agente usato dall'interazione",
          "outcome o stato finale",
          "informazioni di timing quando disponibili",
          "presenza di transcript o registrazione per review più approfondite"
        ]
      },
      inboundOutbound: {
        title: "Usala per inbound e outbound",
        paragraphs: [
          "Per l'outbound, questa lista aiuta a capire quali contatti campagna sono stati chiamati o consumati dal dialer e quale risultato hanno prodotto.",
          "Per l'inbound, aiuta a rivedere i chiamanti gestiti da AI Inbound Routing o riconosciuti tramite contact lookup."
        ]
      },
      callRecordsRelation: {
        title: "Come si collega al Registro chiamate",
        paragraphs: [
          "Contatti elaborati è la vista lista. Registro chiamate è la vista di dettaglio.",
          <>Dopo aver trovato il contatto giusto nella lista, apri <InlineDocLink href="/run-workflows/call-records">Registro chiamate</InlineDocLink> per rivedere overview, timeline, registrazione quando abilitata, transcript, Data, Lead Qualification Outcome, timing e stato finale.</>
        ]
      }
    },
    screenshot: {
      src: "/screenshots/docs/processed-contacts-filters-list.png",
      alt: "Lista Contatti elaborati con totale inbound call records, filtro voice agent, filtro cause, filtro status, date range e righe con customer, phone, voice agent, status, cause, start time, end time, ring time, hold time, talk time e azione details.",
      caption: "Usa i filtri per restringere la lista per origine workflow, risultato, stato e intervallo date prima di aprire il call record dettagliato."
    },
    nextSteps: [
      {
        title: "Registro chiamate",
        href: "/run-workflows/call-records",
        description: "Apri l'evidenza dettagliata della chiamata collegata a un contatto elaborato."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Rivedi la configurazione della campagna outbound quando i contatti elaborati arrivano dal dialer."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Rivedi il routing inbound quando i contatti elaborati arrivano da chiamate inbound."
      }
    ]
  }
};

function useProcessedContactsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: processedContactsCopy[locale], locale };
}

function InlineDocLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      {children}
    </Link>
  );
}

export function LocalizedProcessedContactsTitle() {
  return useProcessedContactsCopy().copy.title;
}

export function LocalizedProcessedContactsIntro() {
  const { copy } = useProcessedContactsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedProcessedContactsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return useProcessedContactsCopy().copy.headings[sectionKey];
}

export function LocalizedProcessedContactsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  const { copy } = useProcessedContactsCopy();
  const section = copy.sections[sectionKey];

  return (
    <section className="docs-home-section">
      {section.paragraphs?.map((paragraph, index) => (
        <p key={`p-${index}`}>{paragraph}</p>
      ))}
      {section.items ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LocalizedProcessedContactsScreenshot() {
  const { copy } = useProcessedContactsCopy();

  return (
    <section className="docs-home-section">
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="docs-screenshot-img" src={copy.screenshot.src} alt={copy.screenshot.alt} loading="lazy" />
        </div>
        <figcaption className="docs-screenshot-caption">{copy.screenshot.caption}</figcaption>
      </figure>
    </section>
  );
}

export function LocalizedProcessedContactsNextSteps() {
  const { copy, locale } = useProcessedContactsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-3">
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
