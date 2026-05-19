"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey = "sharedRecords" | "overview" | "recording" | "dataOutcome" | "reviewFlow" | "nextSteps";
type ScreenshotKey = "overview" | "recording" | "dataOutcome";

type SectionCopy = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
};

type ScreenshotCopy = {
  src: string;
  alt: string;
  caption: string;
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type CallRecordsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshots: Record<ScreenshotKey, ScreenshotCopy>;
  nextSteps: LinkCard[];
};

const callRecordsCopy: Record<Locale, CallRecordsCopy> = {
  en: {
    title: "Call Records",
    intro: [
      "Call Records is the shared review surface for outbound and inbound calls.",
      "Use one explanation for both flows: the call detail keeps the same operational meaning. What changes is only where the call came from, such as a Dialer Campaign, AI Inbound Routing, or Phone test."
    ],
    headings: {
      sharedRecords: "Use the same review model for inbound and outbound",
      overview: "Read the call overview",
      recording: "Review the recording when enabled",
      dataOutcome: "Review Data and Lead Qualification Outcome",
      reviewFlow: "Use the record as the source of truth",
      nextSteps: "Next steps"
    },
    sections: {
      sharedRecords: {
        title: "Use the same review model for inbound and outbound",
        paragraphs: [
          "Do not duplicate the concept for inbound call records and outbound call records. The record detail should explain the same evidence for both directions.",
          "An outbound record usually starts from a campaign contact. An inbound record usually starts from a caller matched through inbound routing or contact lookup. After the call is created, the review fields are read in the same way."
        ],
        items: [
          "caller or contact identity",
          "agent used by the call",
          "timeline, status, reason and cause",
          "ring time, hold time and talk time",
          "recording and transcript when enabled",
          "contact data and function output saved during the call"
        ]
      },
      overview: {
        title: "Read the call overview",
        paragraphs: [
          "The overview gives the first operational answer: who was called or who called in, which agent handled the interaction, when the call happened, and how it ended.",
          "Use the duration and timeline areas to separate telephony behavior from conversation behavior. For example, ring time helps explain answer delay, while talk time helps explain how long the agent stayed in the workflow."
        ]
      },
      recording: {
        title: "Review the recording when enabled",
        paragraphs: [
          "The recording panel appears when recording is enabled for the call path. It shows the generated filename and gives operators a quick way to listen to or download the audio.",
          "Use recordings for deeper review when transcript alone is not enough, for example when you need to verify audio quality, interruptions, silence, or the exact customer phrasing."
        ]
      },
      dataOutcome: {
        title: "Review Data and Lead Qualification Outcome",
        paragraphs: [
          "The Data section reports custom data that the customer loaded on the contact. These values come from the contact record and are useful for context, personalization, template variables, and downstream review.",
          "Lead Qualification Outcome is where RocketAiFlow shows the structured data collected by the agent during the conversation. In a lead qualification workflow, this can include fields such as email, phone, timeline, lead name, AI summary, interest level, score, requested action, demo date, pain points, important notes and raw interview data.",
          "If a value was not available or was not collected, the record can show an empty value or the unresolved placeholder. This makes the call record useful for spotting which data is missing before changing the prompt or function schema."
        ]
      },
      reviewFlow: {
        title: "Use the record as the source of truth",
        paragraphs: [
          "Start from the call record before changing route, campaign, prompt or function configuration.",
          "The record tells you whether the problem is in telephony, contact data, agent behavior, function output, recording setup, or timing."
        ],
        items: [
          "check overview and timeline first",
          "check recording and transcript when available",
          "check Data to confirm contact fields were passed correctly",
          "check Lead Qualification Outcome to confirm what the agent collected",
          "change one configuration area at a time after review"
        ]
      }
    },
    screenshots: {
      overview: {
        src: "/screenshots/docs/call-record-overview-timeline.png",
        alt: "RocketAiFlow call record overview with caller card, voice agent details, duration and timeline status.",
        caption: "The overview and timeline show caller identity, agent, contact id, call timestamps, status, reason, cause, ring time and talk time."
      },
      recording: {
        src: "/screenshots/docs/call-record-recording.png",
        alt: "RocketAiFlow call record recording panel with recording status, filename, listen button, download button and audio player.",
        caption: "The recording panel is available when recording is enabled and lets operators listen to or download the audio file."
      },
      dataOutcome: {
        src: "/screenshots/docs/call-record-data-lead-qualification.png",
        alt: "RocketAiFlow call record data section and lead qualification outcome section with custom contact data and structured fields collected by the agent.",
        caption: "Data contains custom contact fields loaded by the customer. Lead Qualification Outcome contains structured information collected or saved by the agent during the call."
      }
    },
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Review the campaign configuration that generated outbound calls."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Review the inbound route that sent calls to an agent."
      },
      {
        title: "Troubleshooting",
        href: "/troubleshoot/troubleshooting",
        description: "Use diagnostics when the call record shows an unexpected result."
      }
    ]
  },
  it: {
    title: "Registro chiamate",
    intro: [
      "Il Registro chiamate è la superficie di review condivisa per chiamate outbound e inbound.",
      "Usa una spiegazione unica per entrambi i flussi: il dettaglio della chiamata mantiene lo stesso significato operativo. Cambia solo da dove nasce la chiamata, per esempio Dialer Campaign, AI Inbound Routing o test da Phone."
    ],
    headings: {
      sharedRecords: "Usa lo stesso modello di review per inbound e outbound",
      overview: "Leggi la panoramica della chiamata",
      recording: "Rivedi la registrazione quando abilitata",
      dataOutcome: "Rivedi Data e Lead Qualification Outcome",
      reviewFlow: "Usa il record come fonte principale",
      nextSteps: "Prossimi passi"
    },
    sections: {
      sharedRecords: {
        title: "Usa lo stesso modello di review per inbound e outbound",
        paragraphs: [
          "Non conviene duplicare il concetto tra inbound call record e outbound call record. Il dettaglio del record deve spiegare le stesse evidenze per entrambe le direzioni.",
          "Un record outbound di solito nasce da un contatto campagna. Un record inbound di solito nasce da un chiamante gestito da routing inbound o contact lookup. Dopo la creazione della chiamata, i campi di review si leggono nello stesso modo."
        ],
        items: [
          "identità chiamante o contatto",
          "agente usato dalla chiamata",
          "timeline, status, reason e cause",
          "ring time, hold time e talk time",
          "registrazione e transcript quando abilitati",
          "dati contatto e output delle function salvati durante la chiamata"
        ]
      },
      overview: {
        title: "Leggi la panoramica della chiamata",
        paragraphs: [
          "La panoramica dà la prima risposta operativa: chi è stato chiamato o chi ha chiamato, quale agente ha gestito l'interazione, quando è avvenuta la chiamata e come si è chiusa.",
          "Usa le aree durata e timeline per separare il comportamento telefonico dal comportamento conversazionale. Per esempio, il ring time aiuta a capire il tempo di risposta, mentre il talk time aiuta a capire quanto l'agente è rimasto nel workflow."
        ]
      },
      recording: {
        title: "Rivedi la registrazione quando abilitata",
        paragraphs: [
          "Il pannello Recording appare quando la registrazione è abilitata per il percorso della chiamata. Mostra il nome del file generato e permette agli operatori di ascoltare o scaricare rapidamente l'audio.",
          "Usa le registrazioni per una review più profonda quando il transcript non basta, per esempio quando devi verificare qualità audio, interruzioni, silenzi o la formulazione esatta del customer."
        ]
      },
      dataOutcome: {
        title: "Rivedi Data e Lead Qualification Outcome",
        paragraphs: [
          "La sezione Data riporta i dati custom che il cliente ha caricato nel contatto. Questi valori arrivano dal record contatto e servono per contesto, personalizzazione, variabili template e review successive.",
          "Lead Qualification Outcome è la sezione dove RocketAiFlow mostra i dati strutturati raccolti dall'agente durante la conversazione. In un workflow di qualificazione lead può includere campi come email, phone, timeline, lead name, AI summary, interest level, score, requested action, demo date, pain points, important notes e raw interview data.",
          "Se un valore non era disponibile o non è stato raccolto, il record può mostrare un valore vuoto o il placeholder non risolto. Questo rende il call record utile per capire quali dati mancano prima di modificare prompt o schema della function."
        ]
      },
      reviewFlow: {
        title: "Usa il record come fonte principale",
        paragraphs: [
          "Parti dal call record prima di modificare route, campagna, prompt o configurazione delle function.",
          "Il record ti dice se il problema riguarda telefonia, dati contatto, comportamento dell'agente, output della function, setup registrazione o timing."
        ],
        items: [
          "controlla prima overview e timeline",
          "controlla registrazione e transcript quando disponibili",
          "controlla Data per confermare che i campi contatto siano passati correttamente",
          "controlla Lead Qualification Outcome per confermare cosa ha raccolto l'agente",
          "modifica una sola area di configurazione alla volta dopo la review"
        ]
      }
    },
    screenshots: {
      overview: {
        src: "/screenshots/docs/call-record-overview-timeline.png",
        alt: "Registro chiamata RocketAiFlow con scheda chiamante, dettagli voice agent, durata e stato timeline.",
        caption: "Overview e timeline mostrano identità chiamante, agente, contact id, timestamp, status, reason, cause, ring time e talk time."
      },
      recording: {
        src: "/screenshots/docs/call-record-recording.png",
        alt: "Pannello Recording del registro chiamata RocketAiFlow con stato registrazione, filename, pulsante listen, download e player audio.",
        caption: "Il pannello Recording è disponibile quando la registrazione è abilitata e permette agli operatori di ascoltare o scaricare il file audio."
      },
      dataOutcome: {
        src: "/screenshots/docs/call-record-data-lead-qualification.png",
        alt: "Sezione Data e Lead Qualification Outcome nel registro chiamata RocketAiFlow con dati custom del contatto e campi strutturati raccolti dall'agente.",
        caption: "Data contiene i campi custom del contatto caricati dal cliente. Lead Qualification Outcome contiene le informazioni strutturate raccolte o salvate dall'agente durante la chiamata."
      }
    },
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Rivedi la configurazione della campagna che ha generato le chiamate outbound."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Rivedi la route inbound che ha inviato le chiamate all'agente."
      },
      {
        title: "Diagnostica",
        href: "/troubleshoot/troubleshooting",
        description: "Usa la diagnostica quando il call record mostra un risultato inatteso."
      }
    ]
  }
};

function useCallRecordsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: callRecordsCopy[locale], locale };
}

export function LocalizedCallRecordsTitle() {
  return useCallRecordsCopy().copy.title;
}

export function LocalizedCallRecordsIntro() {
  const { copy } = useCallRecordsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCallRecordsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return useCallRecordsCopy().copy.headings[sectionKey];
}

export function LocalizedCallRecordsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  const { copy } = useCallRecordsCopy();
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

export function LocalizedCallRecordsScreenshot({ screenshotKey }: { screenshotKey: ScreenshotKey }) {
  const { copy } = useCallRecordsCopy();
  const screenshot = copy.screenshots[screenshotKey];

  return (
    <section className="docs-home-section">
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="docs-screenshot-img" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
        </div>
        <figcaption className="docs-screenshot-caption">{screenshot.caption}</figcaption>
      </figure>
    </section>
  );
}

export function LocalizedCallRecordsNextSteps() {
  const { copy, locale } = useCallRecordsCopy();

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
