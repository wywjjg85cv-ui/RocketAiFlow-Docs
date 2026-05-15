"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";

type HeadingKey = "whyTogether" | "grafanaDrilldown" | "whenToUse" | "investigationPath" | "relatedPages";

type CardCopy = {
  title: string;
  href: string;
  description: string;
};

type ScreenshotCopy = {
  src: string;
  alt: string;
  caption: string;
};

type LogsAndTracesCopy = {
  title: string;
  headings: Record<HeadingKey, string>;
  intro: ReactNode[];
  whyTogetherIntro: ReactNode;
  whyTogetherItems: ReactNode[];
  drilldownParagraphs: ReactNode[];
  drilldownItems: ReactNode[];
  screenshots: ScreenshotCopy[];
  whenToUseItems: ReactNode[];
  investigationItems: ReactNode[];
  relatedCards: CardCopy[];
};

const logsAndTracesCopy: Record<Locale, LogsAndTracesCopy> = {
  en: {
    title: "Logs and Traces",
    headings: {
      whyTogether: "Why they belong together",
      grafanaDrilldown: "Grafana Drilldown",
      whenToUse: "When to use logs and traces",
      investigationPath: "Practical investigation path",
      relatedPages: "Related pages"
    },
    intro: [
      "RocketAiFlow uses OpenTelemetry-based observability so teams can inspect what happens across workflow execution, telephony behavior, API actions, runtime services, and supporting infrastructure.",
      "Logs and traces should be read together. Logs show event detail: what happened, when it happened, which service produced it, and which metadata was attached. Traces show the path: how the same operation moved across services and where latency, failure, or unexpected behavior started."
    ],
    whyTogetherIntro:
      "In production investigations, a single log line is rarely enough. A trace without the related log context can also be too abstract. Using both gives operators a clearer view of:",
    whyTogetherItems: [
      "call launch and campaign execution events",
      "trunk, endpoint, and telephony state changes",
      "function and API action behavior",
      "service latency and error paths",
      "metadata such as campaign, contact, operation, result, service name, and trace identifiers"
    ],
    drilldownParagraphs: [
      "Grafana Drilldown is the advanced review surface for log and trace investigation. Use it when dashboards show that something changed and you need to filter, search, and correlate the supporting events."
    ],
    drilldownItems: [
      "filter logs by level, service, fields, labels, and time range",
      "search inside log messages and structured metadata",
      "open a log event and follow the linked trace ID",
      "review spans, service operations, timing, and structured metadata",
      "correlate logs and traces without jumping between disconnected tools"
    ],
    screenshots: [
      {
        src: "/screenshots/docs/grafana-drilldown-logs-trace-link.png",
        alt: "Grafana Drilldown logs view showing log volume, searchable log events, structured fields, and a linked trace.",
        caption:
          "Grafana Drilldown lets operators search logs, inspect structured metadata, and follow a trace link from the selected log event."
      },
      {
        src: "/screenshots/docs/grafana-drilldown-traces-overview.png",
        alt: "Grafana Drilldown traces view showing span rate, duration distribution, service attributes, and trace breakdown.",
        caption:
          "Trace views show request rate, duration, service attributes, and span-level behavior so teams can understand where a workflow path spends time."
      }
    ],
    whenToUseItems: [
      "a call, campaign, transfer, or API action behaves differently than expected",
      "a dashboard shows a shift but not the underlying event",
      "the issue crosses multiple services or external integrations",
      "timing, latency, or retry behavior needs a concrete explanation",
      "troubleshooting needs evidence before changing prompts, routing, campaigns, or functions"
    ],
    investigationItems: [
      "Start from the symptom in monitoring, call records, or campaign analytics.",
      "Narrow the time range and the affected route, campaign, contact, trunk, or service.",
      "Use logs to find the event detail and structured metadata.",
      "Follow the trace ID when the issue crosses services or needs timing analysis.",
      "Return to the owning layer with evidence: telephony, workflow logic, runtime, API action, or data."
    ],
    relatedCards: [
      {
        title: "Monitoring and Visibility",
        href: "/observe/monitoring-and-visibility",
        description: "Return to the main observability model for live operations."
      },
      {
        title: "Pre-Provisioned Dashboards",
        href: "/observe/pre-provisioned-dashboards",
        description: "Start from the dashboard view before moving into log or trace evidence."
      },
      {
        title: "Investigating Workflow Issues",
        href: "/troubleshoot/investigating-workflow-issues",
        description: "Follow the broader troubleshooting path from symptom to evidence."
      }
    ]
  },
  it: {
    title: "Log e trace",
    headings: {
      whyTogether: "Perché usarli insieme",
      grafanaDrilldown: "Grafana Drilldown",
      whenToUse: "Quando usare log e trace",
      investigationPath: "Percorso pratico di investigazione",
      relatedPages: "Pagine correlate"
    },
    intro: [
      "RocketAiFlow usa osservabilità basata su OpenTelemetry per monitorare quello che succede durante l'esecuzione dei workflow, il comportamento telefonico, le azioni API, i servizi runtime e l'infrastruttura di supporto.",
      "Log e trace vanno letti insieme. I log mostrano il dettaglio dell'evento: cosa è successo, quando è successo, quale servizio lo ha prodotto e quali metadati sono associati. I trace mostrano il percorso: come la stessa operazione attraversa i servizi e dove iniziano latenza, errori o comportamenti inattesi."
    ],
    whyTogetherIntro:
      "In un'investigazione di produzione, una singola riga di log spesso non basta. Anche un trace senza il contesto dei log può essere troppo astratto. Usarli insieme dà agli operatori una vista più chiara su:",
    whyTogetherItems: [
      "eventi di avvio chiamata ed esecuzione campagna",
      "cambi di stato di trunk, endpoint e telefonia",
      "comportamento di function e azioni API",
      "latenza dei servizi e percorsi di errore",
      "metadati come campagna, contatto, operazione, risultato, nome servizio e identificativi trace"
    ],
    drilldownParagraphs: [
      "Grafana Drilldown è la vista avanzata per analizzare log e trace. Usala quando una dashboard mostra che qualcosa è cambiato e devi filtrare, cercare e correlare gli eventi che spiegano il problema."
    ],
    drilldownItems: [
      "filtrare i log per livello, servizio, campi, label e intervallo temporale",
      "cercare dentro messaggi di log e metadati strutturati",
      "aprire un evento di log e seguire il trace ID collegato",
      "rivedere span, operazioni dei servizi, timing e metadati strutturati",
      "correlare log e trace senza saltare tra strumenti separati"
    ],
    screenshots: [
      {
        src: "/screenshots/docs/grafana-drilldown-logs-trace-link.png",
        alt: "Vista log di Grafana Drilldown con volume log, eventi ricercabili, campi strutturati e trace collegato.",
        caption:
          "Grafana Drilldown permette agli operatori di cercare nei log, ispezionare metadati strutturati e seguire il trace collegato all'evento selezionato."
      },
      {
        src: "/screenshots/docs/grafana-drilldown-traces-overview.png",
        alt: "Vista trace di Grafana Drilldown con span rate, distribuzione durata, attributi servizio e dettaglio trace.",
        caption:
          "Le viste trace mostrano rate, durata, attributi servizio e comportamento degli span, così il team capisce dove un workflow consuma tempo."
      }
    ],
    whenToUseItems: [
      "una chiamata, campagna, transfer o azione API si comporta in modo diverso dal previsto",
      "una dashboard mostra una variazione ma non l'evento che l'ha causata",
      "il problema attraversa più servizi o integrazioni esterne",
      "timing, latenza o retry devono essere spiegati con evidenza concreta",
      "il troubleshooting richiede evidenza prima di modificare prompt, routing, campagne o functions"
    ],
    investigationItems: [
      "Parti dal sintomo in monitoring, call record o campaign analytics.",
      "Restringi l'intervallo temporale e route, campagna, contatto, trunk o servizio coinvolto.",
      "Usa i log per trovare il dettaglio dell'evento e i metadati strutturati.",
      "Segui il trace ID quando il problema attraversa più servizi o richiede analisi dei tempi.",
      "Torna al livello responsabile con evidenza: telefonia, logica workflow, runtime, azione API o dati."
    ],
    relatedCards: [
      {
        title: "Monitoring e visibilità",
        href: "/observe/monitoring-and-visibility",
        description: "Torna al modello principale di osservabilità per le operations live."
      },
      {
        title: "Dashboard preconfigurate",
        href: "/observe/pre-provisioned-dashboards",
        description: "Parti dalla vista dashboard prima di passare all'evidenza di log o trace."
      },
      {
        title: "Analisi problemi workflow",
        href: "/troubleshoot/investigating-workflow-issues",
        description: "Segui il percorso completo dal sintomo all'evidenza."
      }
    ]
  }
};

function useLogsAndTracesCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return logsAndTracesCopy[locale];
}

function ProductScreenshot({ screenshot }: { screenshot: ScreenshotCopy }) {
  return (
    <figure className="docs-screenshot">
      <div className="docs-screenshot-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
      </div>
      <figcaption className="docs-screenshot-caption">{screenshot.caption}</figcaption>
    </figure>
  );
}

function Cards({ cards }: { cards: CardCopy[] }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {cards.map((card) => (
        <Link key={card.href} className="docs-home-card" href={localizeHref(card.href, locale)}>
          <strong>{card.title}</strong>
          <span>{card.description}</span>
        </Link>
      ))}
    </div>
  );
}

export function LocalizedLogsAndTracesTitle() {
  return <>{useLogsAndTracesCopy().title}</>;
}

export function LocalizedLogsAndTracesHeading({ labelKey }: { labelKey: HeadingKey }) {
  return <>{useLogsAndTracesCopy().headings[labelKey]}</>;
}

export function LocalizedLogsAndTracesIntro() {
  const copy = useLogsAndTracesCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedLogsAndTracesWhyTogether() {
  const copy = useLogsAndTracesCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      <p>{copy.whyTogetherIntro}</p>
      <ul>
        {copy.whyTogetherItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function LocalizedLogsAndTracesGrafanaDrilldown() {
  const copy = useLogsAndTracesCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      {copy.drilldownParagraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.drilldownItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {copy.screenshots.map((screenshot) => (
        <ProductScreenshot key={screenshot.src} screenshot={screenshot} />
      ))}
    </section>
  );
}

export function LocalizedLogsAndTracesWhenToUse() {
  const copy = useLogsAndTracesCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      <ul>
        {copy.whenToUseItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function LocalizedLogsAndTracesInvestigationPath() {
  const copy = useLogsAndTracesCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      <ol>
        {copy.investigationItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

export function LocalizedLogsAndTracesRelatedPages() {
  return <Cards cards={useLogsAndTracesCopy().relatedCards} />;
}
