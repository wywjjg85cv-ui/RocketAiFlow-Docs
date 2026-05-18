"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type CardCopy = {
  title: string;
  href: string;
  description: string;
};

type MonitoringCopy = {
  title: string;
  intro: ReactNode[];
  operatingModel: {
    title: string;
    paragraphs: ReactNode[];
    items: ReactNode[];
  };
  whatToUse: {
    title: string;
    items: {
      title: string;
      description: ReactNode;
    }[];
  };
  dialerSignals: {
    title: string;
    paragraphs: ReactNode[];
    items: ReactNode[];
  };
  relatedPages: {
    title: string;
    cards: CardCopy[];
  };
};

const monitoringCopy: Record<Locale, MonitoringCopy> = {
  en: {
    title: "Monitoring and Visibility",
    intro: [
      "Monitoring is the operational entry point for RocketAiFlow. Start here to check outbound campaign execution, telephony readiness, platform health, and the evidence behind a live issue.",
      "Use dashboards first for real-time state and selected time-range trends. Use Dialer Dashboard Panels when you need to interpret a specific metric, then move to logs and traces when you need event-level evidence."
    ],
    operatingModel: {
      title: "Operating model",
      paragraphs: [
        "Open Monitoring when a campaign, trunk, endpoint, host, container, database, or API action needs operational verification. Start from the symptom and follow the evidence to the layer that owns the issue.",
        "Start with the Dialer dashboard for campaign state and outcome quality. Use platform dashboards when the symptom points to telephony, containers, database, or host pressure. Move to logs and traces when you need the exact event path, timing, or downstream behavior."
      ],
      items: [
        <>Open <strong>Pre-Provisioned Dashboards</strong> for live campaign state, Dialer performance, telephony readiness, Asterisk, containers, MySQL, and host visibility.</>,
        <>Open <strong>Dialer Dashboard Panels</strong> when a specific Dialer metric needs interpretation.</>,
        <>Open <strong>Logs and Traces</strong> when you need event detail, service timing, API action behavior, or OpenTelemetry correlation.</>,
        <>Open <strong>Call Records</strong> from the workflow area when you need the result of a specific call, transcript, recording state, or timing.</>
      ]
    },
    whatToUse: {
      title: "What to use",
      items: [
        {
          title: "Outbound campaign monitoring",
          description:
            "Use the Dialer dashboard. It is the main outbound control room for campaign status, active calls, call limits, dialing rate, outcomes, and selected time-range performance."
        },
        {
          title: "Trunk and endpoint readiness",
          description:
            "Use Real-Time Agents & Trunks inside the Dialer dashboard. It shows whether endpoints and trunks are available, not in use, in use, unavailable, or invalid."
        },
        {
          title: "Panel-level interpretation",
          description:
            "Use Dialer Dashboard Panels to interpret Total Outcomes, Call Outcomes, dialing rate, call volume, endpoint state, talk time, ring time, and selected-range performance."
        },
        {
          title: "Telephony and platform health",
          description:
            "Use Asterisk Overview, Asterisk Log, cAdvisor, MySQL, and Node Exporter dashboards. These views help separate workflow issues from telephony, runtime, database, container, or host pressure."
        },
        {
          title: "Deeper investigation",
          description:
            "Use Logs and Traces when a dashboard shows a symptom but you need to understand the event, service path, timing, or downstream API behavior behind it."
        }
      ]
    },
    dialerSignals: {
      title: "Dialer real-time signals",
      paragraphs: [
        "During a live outbound run, the first question is whether the campaign is actually producing calls and outcomes. The Dialer dashboard answers that with campaign status, active calls, call limits, dialing rate, outcome totals, and selected-range performance.",
        "Real-Time Agents & Trunks is part of the same operational view because it separates campaign behavior from telephony readiness. If campaigns look healthy but calls are not moving, endpoint and trunk state are the next place to check."
      ],
      items: [
        <>If <strong>Dialer Status</strong> shows calls in progress, the campaign is actively generating calls.</>,
        <>If <strong>Real-Time Agents & Trunks</strong> shows the selected trunk as <strong>Not In Use</strong>, it is available; when calls are active it should move to <strong>In Use</strong>.</>,
        <>If endpoints are <strong>Unavailable</strong> or <strong>Invalid</strong>, investigate trunk, registration, provider, or endpoint configuration before changing campaign pacing.</>
      ]
    },
    relatedPages: {
      title: "Related pages",
      cards: [
        {
          title: "Pre-Provisioned Dashboards",
          href: "/monitoring/pre-provisioned-dashboards",
          description: "Review the Dialer, Asterisk, cAdvisor, MySQL, and Node Exporter dashboards."
        },
        {
          title: "Dialer Dashboard Panels",
          href: "/monitoring/dialer-dashboard-panels",
          description: "Read the Dialer panel guide when operators need metric-by-metric guidance."
        },
        {
          title: "Logs and Traces",
          href: "/monitoring/logs-and-traces",
          description: "Use OpenTelemetry-based logs and traces when a dashboard symptom needs evidence."
        },
        {
          title: "Troubleshooting",
          href: "/troubleshoot/troubleshooting",
          description: "Use setup checks when monitoring points to a workflow configuration issue."
        }
      ]
    }
  },
  it: {
    title: "Monitoring e visibilità",
    intro: [
      "Il monitoraggio è il punto di ingresso operativo di RocketAiFlow. Parti da qui per controllare esecuzione delle campagne outbound, readiness telefonica, salute della piattaforma ed evidenze dietro un problema live.",
      "Usa prima le dashboard per stato in tempo reale e trend sull'intervallo selezionato. Usa Pannelli Dashboard Dialer quando devi interpretare una metrica specifica, poi passa a log e trace quando ti serve evidenza a livello evento."
    ],
    operatingModel: {
      title: "Modello operativo",
      paragraphs: [
        "Apri Monitoraggio quando devi verificare una campagna, un trunk, un endpoint, un host, un container, il database o una chiamata API. Parti dal sintomo e segui l'evidenza fino al livello che genera il problema.",
        "Parti dalla dashboard Dialer per stato campagna e qualità outcome. Usa le dashboard di piattaforma quando il sintomo punta a telefonia, container, database o pressione host. Passa a log e trace quando ti servono percorso esatto dell'evento, timing o comportamento downstream."
      ],
      items: [
        <>Apri <strong>Dashboard preconfigurate</strong> per stato live delle campagne, performance Dialer, readiness telefonica, Asterisk, container, MySQL e visibilità host.</>,
        <>Apri <strong>Pannelli Dashboard Dialer</strong> quando devi interpretare una metrica specifica del Dialer.</>,
        <>Apri <strong>Log e trace</strong> quando servono dettaglio evento, timing dei servizi, comportamento delle azioni API o correlazione OpenTelemetry.</>,
        <>Apri <strong>Registro chiamate</strong> nell'area workflow quando devi rivedere risultato di una singola chiamata, transcript, stato registrazione o timing.</>
      ]
    },
    whatToUse: {
      title: "Dove guardare",
      items: [
        {
          title: "Monitoraggio campagne outbound",
          description:
            "Usa la dashboard Dialer. È la control room principale dell'outbound per stato campagne, chiamate attive, limiti, dialing rate, outcome e performance nell'intervallo selezionato."
        },
        {
          title: "Disponibilità trunk ed endpoint",
          description:
            "Usa Real-Time Agents & Trunks dentro la dashboard Dialer. Mostra se endpoint e trunk sono disponibili, not in use, in use, unavailable o invalid."
        },
        {
          title: "Lettura dei singoli pannelli",
          description:
            "Usa Pannelli Dashboard Dialer per interpretare Total Outcomes, Call Outcomes, dialing rate, call volume, stato endpoint, talk time, ring time e performance sull'intervallo selezionato."
        },
        {
          title: "Salute telefonia e piattaforma",
          description:
            "Usa le dashboard Asterisk Overview, Asterisk Log, cAdvisor, MySQL e Node Exporter. Aiutano a separare problemi di workflow da telefonia, runtime, database, container o pressione host."
        },
        {
          title: "Analisi avanzata",
          description:
            "Usa Log e trace quando una dashboard mostra un sintomo ma devi capire evento, percorso dei servizi, timing o comportamento di API downstream."
        }
      ]
    },
    dialerSignals: {
      title: "Segnali real-time del Dialer",
      paragraphs: [
        "Durante un run outbound live, la prima domanda è se la campagna sta davvero generando chiamate ed esiti. La dashboard Dialer risponde con stato campagna, chiamate attive, limiti, dialing rate, outcome e performance sull'intervallo selezionato.",
        "Real-Time Agents & Trunks fa parte della stessa vista operativa perché separa il comportamento della campagna dalla readiness telefonica. Se la campagna sembra corretta ma le chiamate non avanzano, stato endpoint e trunk sono il controllo successivo."
      ],
      items: [
        <>Se <strong>Dialer Status</strong> mostra calls in progress, la campagna sta generando chiamate.</>,
        <>Se <strong>Real-Time Agents & Trunks</strong> mostra il trunk selezionato come <strong>Not In Use</strong>, è disponibile; quando le chiamate sono attive deve passare a <strong>In Use</strong>.</>,
        <>Se gli endpoint sono <strong>Unavailable</strong> o <strong>Invalid</strong>, controlla trunk, registration, provider o configurazione endpoint prima di modificare il pacing campagna.</>
      ]
    },
    relatedPages: {
      title: "Pagine correlate",
      cards: [
        {
          title: "Dashboard preconfigurate",
          href: "/monitoring/pre-provisioned-dashboards",
          description: "Rivedi le dashboard Dialer, Asterisk, cAdvisor, MySQL e Node Exporter."
        },
        {
          title: "Pannelli Dashboard Dialer",
          href: "/monitoring/dialer-dashboard-panels",
          description: "Apri la guida dei pannelli Dialer quando agli operatori serve una lettura metrica per metrica."
        },
        {
          title: "Log e trace",
          href: "/monitoring/logs-and-traces",
          description: "Usa log e trace basati su OpenTelemetry quando un sintomo in dashboard richiede evidenza."
        },
        {
          title: "Risoluzione problemi",
          href: "/troubleshoot/troubleshooting",
          description: "Usa i controlli di setup quando il monitoraggio indica un problema di configurazione workflow."
        }
      ]
    }
  }
};

function useMonitoringCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: monitoringCopy[locale], locale };
}

function Cards({ cards }: { cards: CardCopy[] }) {
  const { locale } = useMonitoringCopy();

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

export function LocalizedMonitoringAndVisibilityTitle() {
  return <>{useMonitoringCopy().copy.title}</>;
}

export function LocalizedMonitoringAndVisibilityIntro() {
  const { copy } = useMonitoringCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedMonitoringAndVisibilityOperatingModel() {
  const { copy } = useMonitoringCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      {copy.operatingModel.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.operatingModel.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function LocalizedMonitoringAndVisibilityOperatingModelTitle() {
  return <>{useMonitoringCopy().copy.operatingModel.title}</>;
}

export function LocalizedMonitoringAndVisibilityWhatToUse() {
  const { copy } = useMonitoringCopy();

  return (
    <section className="docs-home-card-grid docs-home-card-grid-2">
      {copy.whatToUse.items.map((item) => (
        <article key={item.title} className="docs-home-card">
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </article>
      ))}
    </section>
  );
}

export function LocalizedMonitoringAndVisibilityWhatToUseTitle() {
  return <>{useMonitoringCopy().copy.whatToUse.title}</>;
}

export function LocalizedMonitoringAndVisibilityDialerSignals() {
  const { copy } = useMonitoringCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      {copy.dialerSignals.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.dialerSignals.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function LocalizedMonitoringAndVisibilityDialerSignalsTitle() {
  return <>{useMonitoringCopy().copy.dialerSignals.title}</>;
}

export function LocalizedMonitoringAndVisibilityRelatedPages() {
  return <Cards cards={useMonitoringCopy().copy.relatedPages.cards} />;
}

export function LocalizedMonitoringAndVisibilityRelatedPagesTitle() {
  return <>{useMonitoringCopy().copy.relatedPages.title}</>;
}
