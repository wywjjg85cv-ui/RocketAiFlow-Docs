"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type HeadingKey = "dashboardFoundation" | "recoveryPattern" | "nextSteps";

type SectionCopy = {
  paragraphs?: ReactNode[];
  afterParagraphs?: ReactNode[];
  items?: ReactNode[];
  orderedItems?: ReactNode[];
};

type TroubleshootingCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<HeadingKey, string>;
  sections: Record<HeadingKey, SectionCopy>;
  nextSteps: {
    title: string;
    href: string;
    description: string;
  }[];
};

const troubleshootingCopy: Record<Locale, TroubleshootingCopy> = {
  en: {
    title: "Troubleshooting",
    intro: [
      "Use this page when an early test does not match expectations and you need to understand where to look before changing configuration.",
      "Start from visible operational signals: trunk state, Dialer Status, Real-Time Agents & Trunks, associated contacts, concurrent call capacity, and call records.",
      "Change one layer at a time. Do not edit prompt, trunk, routing, and campaign settings together while you are diagnosing the same issue."
    ],
    headings: {
      dashboardFoundation: "Advanced analysis with dashboards, logs, and traces",
      recoveryPattern: "A practical recovery pattern",
      nextSteps: "Next steps"
    },
    sections: {
      dashboardFoundation: {
        paragraphs: [
          "For advanced analysis, review the Grafana dashboards to understand whether the issue belongs to the system, telephony layer, database, container runtime, or workflow behavior.",
          "Use Grafana Logs Drilldown when you need to move from a live symptom to the related logs and traces. This is useful when the problem crosses a campaign, API action, function call, endpoint, or internal service."
        ],
        items: [
          <><code>Dialer Dashboard</code> shows outbound campaign status, active calls, limits, dialing rate, and live outcomes</>,
          <><code>Real-Time Agents & Trunks</code> shows whether agents, endpoints, and trunks are available, in use, or unavailable</>,
          <><code>Logs Drilldown</code> helps inspect logs and traces from Grafana when the issue needs deeper evidence</>,
          <>use <code>Node Exporter Full</code> to confirm host and system health</>,
          <>use <code>Asterisk Overview</code> to review telephony behavior at a higher level</>,
          <>use <code>Asterisk Log</code> when you need telephony-related log review</>,
          <>use <code>cAdvisor</code> when container runtime pressure may be involved</>,
          <>use <code>MySQL 8</code> when the database may be contributing to the incident</>
        ],
        afterParagraphs: [
          "If dashboards, logs, and traces do not show a system-level issue, continue with the inbound or outbound checks below and use the screenshots as the reference for what to verify."
        ]
      },
      recoveryPattern: {
        paragraphs: ["When something is unclear:"],
        orderedItems: [
          "return to one known agent",
          "use one controlled route or one small campaign",
          "place one manual test call",
          "review one call record"
        ],
        items: [
          "active calls versus configured limits",
          "campaign status and dialing activity",
          "endpoint and trunk state",
          "recent talk time and ring time trends"
        ]
      },
      nextSteps: {}
    },
    nextSteps: [
      {
        title: "Call Records",
        href: "/run-workflows/ai-dialer-flows/call-records",
        description: "Return to the exact call record for the test you are diagnosing."
      },
      {
        title: "Dialer Dashboard Panels",
        href: "/monitoring/dialer-dashboard-panels",
        description: "Review the outbound campaign panels for status, active calls, limits, outcomes, and live pressure."
      },
      {
        title: "Monitoring and Visibility",
        href: "/monitoring/monitoring-and-visibility",
        description: "Review the live operational layer around dashboards, logs, traces, telephony, and infrastructure."
      },
      {
        title: "Logs and Traces",
        href: "/monitoring/logs-and-traces",
        description: "Use OpenTelemetry-based logs and traces when the issue spans campaigns, endpoints, services, or API actions."
      }
    ]
  },
  it: {
    title: "Risoluzione problemi",
    intro: [
      "Usa questa pagina quando un primo test non torna e vuoi capire dove guardare prima di cambiare configurazione.",
      "Parti dai segnali operativi visibili: stato trunk, Dialer Status, Real-Time Agents & Trunks, contatti associati, capacità di chiamate concorrenti e call records.",
      "Cambia un livello alla volta. Non modificare insieme prompt, trunk, routing e impostazioni campagna mentre stai diagnosticando lo stesso problema."
    ],
    headings: {
      dashboardFoundation: "Analisi avanzata con dashboard, log e trace",
      recoveryPattern: "Un pattern pratico di recupero",
      nextSteps: "Passaggi successivi"
    },
    sections: {
      dashboardFoundation: {
        paragraphs: [
          "Per un'analisi avanzata, controlla anche le dashboard Grafana per capire se il problema dipende dal sistema, dalla telefonia, dal database, dal runtime dei container o dal comportamento del workflow.",
          "Usa Logs Drilldown di Grafana quando devi passare da un sintomo live ai log e ai trace collegati. È utile quando il problema attraversa campagna, azione API, function, endpoint o servizio interno."
        ],
        items: [
          <><code>Dialer Dashboard</code> mostra stato campagna outbound, chiamate attive, limiti, dialing rate e outcome live</>,
          <><code>Real-Time Agents & Trunks</code> mostra se agenti, endpoint e trunk sono disponibili, in uso o non raggiungibili</>,
          <><code>Logs Drilldown</code> aiuta a ispezionare log e trace da Grafana quando serve un'evidenza più profonda</>,
          <>usa <code>Node Exporter Full</code> per confermare salute host e sistema</>,
          <>usa <code>Asterisk Overview</code> per rivedere il comportamento telefonico a livello più alto</>,
          <>usa <code>Asterisk Log</code> quando serve una revisione dei log telefonici</>,
          <>usa <code>cAdvisor</code> quando potrebbe esserci pressione sul runtime dei container</>,
          <>usa <code>MySQL 8</code> quando il database potrebbe contribuire all'incidente</>
        ],
        afterParagraphs: [
          "Se dashboard, log e trace non mostrano problemi a livello di sistema, continua con i controlli inbound o outbound qui sotto e usa gli screenshot come riferimento."
        ]
      },
      recoveryPattern: {
        paragraphs: ["Quando qualcosa non è chiaro:"],
        orderedItems: [
          "torna a un agente noto",
          "usa una route controllata o una piccola campagna",
          "esegui una chiamata manuale di test",
          "rivedi un solo call record"
        ],
        items: [
          "chiamate attive rispetto ai limiti configurati",
          "stato campagna e attività di dialing",
          "stato endpoint e trunk",
          "trend recenti di talk time e ring time"
        ]
      },
      nextSteps: {}
    },
    nextSteps: [
      {
        title: "Registro chiamate",
        href: "/run-workflows/ai-dialer-flows/call-records",
        description: "Torna al call record esatto del test che stai diagnosticando."
      },
      {
        title: "Pannelli Dashboard Dialer",
        href: "/monitoring/dialer-dashboard-panels",
        description: "Rivedi i pannelli outbound per stato campagna, chiamate attive, limiti, outcome e pressione live."
      },
      {
        title: "Monitoring e visibilità",
        href: "/monitoring/monitoring-and-visibility",
        description: "Rivedi il livello operativo live tra dashboard, log, trace, telefonia e infrastruttura."
      },
      {
        title: "Log e trace",
        href: "/monitoring/logs-and-traces",
        description: "Usa log e trace basati su OpenTelemetry quando il problema attraversa campagne, endpoint, servizi o azioni API."
      }
    ]
  }
};

function useTroubleshootingCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: troubleshootingCopy[locale], locale };
}

function renderParagraphs(paragraphs: ReactNode[] | undefined) {
  return paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>) ?? null;
}

function renderList(items: ReactNode[] | undefined) {
  return items ? <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : null;
}

function renderOrderedList(items: ReactNode[] | undefined) {
  return items ? <ol>{items.map((item, index) => <li key={index}>{item}</li>)}</ol> : null;
}

export function LocalizedTroubleshootingTitle() {
  return <>{useTroubleshootingCopy().copy.title}</>;
}

export function LocalizedTroubleshootingIntro() {
  return (
    <section className="docs-home-section">
      {renderParagraphs(useTroubleshootingCopy().copy.intro)}
    </section>
  );
}

export function LocalizedTroubleshootingHeading({ labelKey }: { labelKey: HeadingKey }) {
  return <>{useTroubleshootingCopy().copy.headings[labelKey]}</>;
}

export function LocalizedTroubleshootingSection({ sectionKey }: { sectionKey: HeadingKey }) {
  const section = useTroubleshootingCopy().copy.sections[sectionKey];

  return (
    <section className="docs-home-section docs-home-section-nested">
      {renderParagraphs(section.paragraphs)}
      {renderOrderedList(section.orderedItems)}
      {renderList(section.items)}
      {renderParagraphs(section.afterParagraphs)}
    </section>
  );
}

export function LocalizedTroubleshootingRecoverySection() {
  const { copy, locale } = useTroubleshootingCopy();
  const section = copy.sections.recoveryPattern;

  return (
    <section className="docs-home-section docs-home-section-nested">
      {renderParagraphs(section.paragraphs)}
      {renderOrderedList(section.orderedItems)}
      <p>{locale === "it" ? "Poi rivedi i segnali operativi collegati:" : "Then review the related operational signals:"}</p>
      {renderList(section.items)}
    </section>
  );
}

export function LocalizedTroubleshootingNextSteps() {
  const { copy, locale } = useTroubleshootingCopy();

  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {copy.nextSteps.map((card) => (
        <Link key={card.href} className="docs-home-card" href={localizeHref(card.href, locale)}>
          <strong>{card.title}</strong>
          <span>{card.description}</span>
        </Link>
      ))}
    </div>
  );
}
