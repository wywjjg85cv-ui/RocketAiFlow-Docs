"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";

type HeadingKey = "dialer" | "cadvisor" | "mysql" | "nodeExporter" | "asteriskLog" | "asteriskOverview" | "relatedPages";

type DialerPanelSectionKey =
  | "realTimeOverview"
  | "realTimeAgentsTrunks"
  | "allCampaignsPerformance"
  | "singleCampaignPerformance";

const dialerPanelDetailIds: Record<DialerPanelSectionKey, string> = {
  realTimeOverview: "real-time-overview",
  realTimeAgentsTrunks: "real-time-agents-trunks",
  allCampaignsPerformance: "all-campaigns-performance",
  singleCampaignPerformance: "single-campaign-performance"
};

type ScreenshotCopy = {
  src: string;
  alt: string;
  caption: ReactNode;
  title?: string;
  description?: ReactNode;
  points?: ReactNode[];
  detailId?: string;
  detailPanels?: DashboardPanelCopy[];
};

type DashboardPanelCopy = {
  title: string;
  src: string;
  alt: string;
  description: ReactNode;
  compactImage?: boolean;
  spanTwo?: boolean;
  wide?: boolean;
};

type DashboardSection = {
  title: string;
  paragraphs: ReactNode[];
  screenshots: ScreenshotCopy[];
};

type CardCopy = {
  title: string;
  href: string;
  description: string;
};

type DashboardsCopy = {
  title: string;
  intro: ReactNode[];
  panelDetailsPageTitle: string;
  panelDetailsIntro: ReactNode[];
  panelDetailsHeading: string;
  panelDetailsLinkLabel: string;
  headings: Record<HeadingKey, string>;
  sections: Record<Exclude<HeadingKey, "relatedPages">, DashboardSection>;
  relatedCards: CardCopy[];
};

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

const dashboardsCopy: Record<Locale, DashboardsCopy> = {
  en: {
    title: "Pre-Provisioned Dashboards",
    intro: [
      "RocketAiFlow includes pre-provisioned Grafana dashboards so teams can monitor outbound campaigns, telephony, containers, database behavior, and host health from the first deployment.",
      "The Dialer dashboard is the strongest operational view for outbound work: it shows campaign state, live dialing pressure, call limits, outcomes, active calls, and performance over the selected time range."
    ],
    panelDetailsPageTitle: "Dialer Dashboard Panels",
    panelDetailsIntro: [
      "Use this page when you want to go deeper than the full Dialer dashboard screenshots. Each section isolates the Grafana panels and explains what the data means in operational terms.",
      "The live panels refresh frequently and show the current Prometheus values. The performance panels use the selected Grafana time range, so changing the time picker changes those totals, percentages, and averages."
    ],
    panelDetailsHeading: "What each panel represents",
    panelDetailsLinkLabel: "View panel breakdown",
    headings: {
      dialer: "Dialer dashboard",
      cadvisor: "cAdvisor dashboard",
      mysql: "MySQL dashboard",
      nodeExporter: "Node Exporter dashboard",
      asteriskLog: "Asterisk Log dashboard",
      asteriskOverview: "Asterisk Overview dashboard",
      relatedPages: "Related pages"
    },
    sections: {
      dialer: {
        title: "Dialer dashboard",
        paragraphs: [
          "Use the Dialer dashboard as the main control room for outbound campaigns. It helps operators see whether campaigns are active, whether calls are being generated, how close the system is to the configured call limits, and how outcomes evolve in real time.",
          "The dashboard is easier to explain as four separate views: live campaign control, agent and trunk readiness, all-campaign performance, and single-campaign performance."
        ],
        screenshots: [
          {
            title: "Real-Time Overview",
            detailId: "real-time-overview",
            src: "/screenshots/docs/dashboard-dialer-realtime-overview-cropped.png",
            alt: "Grafana dialer dashboard showing all campaign status, outcomes, dialing rate, active calls, and call limits.",
            description:
              "Start here during an outbound run. This view combines live campaign state with outcome totals, dialing pressure, active calls, configured limits, and per-campaign status.",
            points: [
              <>Use <strong>Total Outcomes</strong> and <strong>Call Outcomes</strong> to understand whether the run is producing answers, no answers, busy signals, congestion, or failures. These two panels reset every day.</>,
              <>Use <strong>Dialing Rate</strong> and <strong>Calls Volume</strong> to see whether the dialer is generating traffic at the expected pace.</>,
              <>Use the <strong>Dialer</strong> table to compare each campaign status, active flag, active calls, and call limit in one operational list.</>,
              <>Use <strong>Active Calls vs Limit</strong> to confirm whether the system is close to saturation or still has capacity available.</>
            ],
            detailPanels: [
              {
                title: "Dialer table",
                src: "/screenshots/docs/dashboard-dialer-realtime-dialer-table.png",
                alt: "Dialer table listing campaign name, dialer status, active flag, active calls, and call limit.",
                description:
                  "Lists every campaign with Campaign Name, Dialer Status, Campaign Active, Active Calls, and Call Limit. Read the status first: Calls In Progress is healthy; No Available Contacts means the list is empty or exhausted; Campaign Stopped means it is not running; Not scheduled means the current time is outside the campaign window; trunk warnings mean telephony setup or trunk reachability must be fixed before calls can flow.",
                wide: true
              },
              {
                title: "Total Outcomes",
                src: "/screenshots/docs/dashboard-dialer-realtime-total-outcomes.png",
                alt: "Total Outcomes panel with Answer, No Answer, Busy, Congestion, Failed, and Total Calls counts.",
                description:
                  "Shows the current daily count for each outcome across all campaigns. Read it as a simple scoreboard: Answer means the call was answered, No Answer means nobody picked up, Busy means the line was busy, Congestion means the telephony side could not complete the call cleanly, Failed means the call failed, and Total Calls is the overall call count for the day."
              },
              {
                title: "Call Outcomes",
                src: "/screenshots/docs/dashboard-dialer-realtime-call-outcomes.png",
                alt: "Call Outcomes pie chart showing the percentage split between answers, no answers, busy, congestion, and failed calls.",
                description:
                  "Shows the same daily outcomes as percentages. Use it when totals are high and you want to understand the mix quickly: a larger Answer slice is good, while larger No Answer, Busy, Congestion, or Failed slices show where call quality or telephony delivery may need attention."
              },
              {
                title: "Dialing Rate",
                src: "/screenshots/docs/dashboard-dialer-realtime-dialing-rate.png",
                alt: "Dialing Rate chart showing outbound calling pressure over time.",
                description:
                  "Shows the all-campaign calls-per-second signal over time. Higher peaks mean the dialer is trying to place calls faster. A flat line near zero usually means campaigns are idle, stopped, outside schedule, or have no contacts ready."
              },
              {
                title: "Calls Volume",
                src: "/screenshots/docs/dashboard-dialer-realtime-calls-volume.png",
                alt: "Calls Volume chart comparing active calls against the configured calls limit.",
                description:
                  "Compares the configured Calls Limit with the number of launched or active calls. Read the red line as the ceiling and the blue line as usage. If blue stays close to red, the dialer is using almost all available capacity; if blue is far below red, there is still room to launch more calls."
              },
              {
                title: "Active Calls vs Limit",
                src: "/screenshots/docs/dashboard-dialer-realtime-active-calls-vs-limit.png",
                alt: "Active Calls vs Limit gauge showing percentage of configured outbound call capacity in use.",
                description:
                  "Shows Active Calls divided by Calls Limit as a percentage. Green means there is capacity left, orange means usage is high, and red means the dialer is close to the configured ceiling. Use this before increasing pacing or campaign limits.",
                compactImage: true
              }
            ],
            caption:
              "Real-Time Overview is the outbound command center: campaign status, active calls, call limits, dialing rate, outcomes, and live pressure are visible in one place."
          },
          {
            title: "Real-Time Agents & Trunks",
            detailId: "real-time-agents-trunks",
            src: "/screenshots/docs/dashboard-dialer-realtime-agents-trunks-cropped.png",
            alt: "Grafana real-time agents and trunks panel showing endpoint states and trunk state timeline.",
            description:
              "Use this view when the campaign is active but calls are not behaving as expected. It separates campaign logic from telephony readiness by showing endpoint state and timeline changes.",
            points: [
              <>Use <strong>Endpoints by State</strong> to quickly see unavailable, <UiPill>Not In Use</UiPill>, invalid, <UiPill>In Use</UiPill>, or other endpoint states.</>,
              <>Use the <strong>Endpoint State Timeline</strong> to understand when an endpoint changed state during the selected time range.</>,
              <>Use the <strong>Endpoints</strong> table to identify the endpoint, state code, device state, provider host, and source event behind the issue.</>,
              <>Review this view before changing campaign pacing, because a trunk or endpoint problem can look like a campaign problem.</>
            ],
            detailPanels: [
              {
                title: "Endpoints by State",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoints-by-state.png",
                alt: "Endpoints by State panel with unavailable, not in use, and invalid endpoint counts.",
                description:
                  <>Shows how many endpoints or trunks are in each state. <UiPill>Not In Use</UiPill> means the trunk is registered and free. <UiPill>In Use</UiPill> means the trunk is handling a call. Busy, Ringing, or Ring + InUse indicate other call-related states. Unavailable, Unreachable, Invalid, Offline, or Unknown mean the endpoint is not ready: check registration, provider, and endpoint configuration.</>
              },
              {
                title: "Endpoint State Timeline",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoint-state-timeline.png",
                alt: "Endpoint State Timeline showing when a provider endpoint is not in use or in use.",
                description:
                  <>Shows how the selected endpoint changed state during the time range. Read it from left to right: long green sections usually mean the endpoint was idle and available, while <UiPill>In Use</UiPill> or busy sections show when calls were active. Sudden unavailable or invalid sections help explain call failures.</>,
                spanTwo: true
              },
              {
                title: "Endpoints table",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoints-table.png",
                alt: "Endpoints table listing endpoint name, state code, device state, provider host, and source event.",
                description:
                  "Shows the raw endpoint list behind the summary: endpoint name, state code, readable device state, provider host, and source event. Use it to find the exact endpoint to troubleshoot, especially when the summary shows Unavailable, Unreachable, Invalid, or Offline.",
                wide: true
              }
            ],
            caption:
              <>Real-Time Agents & Trunks shows which endpoints and trunks are available, unavailable, invalid, <UiPill>Not In Use</UiPill>, or <UiPill>In Use</UiPill>. Use it to confirm trunk readiness before blaming campaign logic.</>
          },
          {
            title: "All Campaigns Performance",
            detailId: "all-campaigns-performance",
            src: "/screenshots/docs/dashboard-dialer-all-campaigns-performance-cropped.png",
            alt: "Grafana all campaigns performance dashboard with outcomes over time, call distribution, talk time, and ring time.",
            description:
              "Use this view after or during a wider outbound window when you want to evaluate the combined performance of every campaign in the selected time range.",
            points: [
              <>Use <strong>Call Outcomes Over Time</strong> to spot answer, busy, no-answer, congestion, and failure trends across all campaigns.</>,
              <>Use <strong>Calls in Selected Time Range</strong> and <strong>Call Outcomes Distribution</strong> to compare total call volume and outcome mix.</>,
              <>Use <strong>Avg Talk Time</strong>, <strong>Avg Ring Time</strong>, and <strong>Total Talk Time</strong> to understand conversation quality and operational load.</>,
              <>Use the talk-time and ring-time charts to detect changes caused by list quality, telephony behavior, or campaign configuration.</>
            ],
            detailPanels: [
              {
                title: "Call Outcomes Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-outcomes-over-time.png",
                alt: "All campaigns Call Outcomes Over Time chart with answer, no answer, busy, failed, and congestion series.",
                description:
                  "Shows how many new outcomes were added in each time bucket across all campaigns. Read the lines as trend, not lifetime totals: a green rise means more answered calls in that period; yellow, blue, orange, or red rises show more no answers, busy lines, congestion, or failures.",
                wide: true
              },
              {
                title: "Avg Ring Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-ring-time.png",
                alt: "All campaigns average ring time stat panel.",
                description:
                  "Shows average ring duration in seconds for the selected range. Higher values mean calls spend longer ringing before answer, failure, or timeout. Use it to spot contact availability or carrier behavior changes."
              },
              {
                title: "Total Talk Time",
                src: "/screenshots/docs/dashboard-dialer-all-total-talk-time.png",
                alt: "All campaigns total talk time stat panel.",
                description:
                  "Shows total connected talk time produced by all campaigns in the selected range. This is the easiest way to see how much real conversation time the dialer generated."
              },
              {
                title: "Avg Talk Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-talk-time.png",
                alt: "All campaigns average talk time stat panel.",
                description:
                  "Shows average connected conversation time in seconds for the selected range. It is calculated from total talk time divided by the number of measured conversations. Higher values usually mean longer conversations; very low values can point to early hangups or weak contact quality."
              },
              {
                title: "Calls in Selected Time Range",
                src: "/screenshots/docs/dashboard-dialer-all-calls-selected-range.png",
                alt: "All campaigns Calls in Selected Time Range panel with outcome totals and total calls.",
                description:
                  "Shows totals calculated only for the selected Grafana time range. If you change the time picker, these numbers change. Use it for reporting a specific window, such as the last 30 minutes, today, or one campaign run."
              },
              {
                title: "Call Outcomes Distribution",
                src: "/screenshots/docs/dashboard-dialer-all-outcomes-distribution.png",
                alt: "All campaigns Call Outcomes Distribution pie chart.",
                description:
                  "Shows the selected time range as percentages instead of counts. Use it to judge call quality at a glance: compare the Answer share against No Answer, Busy, Congestion, and Failed."
              },
              {
                title: "Average Talk Time Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-talk-time-over-time.png",
                alt: "All campaigns average talk time over time chart.",
                description:
                  "Shows average talk time per time bucket. A stable line means conversation length is consistent; spikes or drops show periods where calls became longer or shorter."
              },
              {
                title: "Average Ring Time Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-ring-time-over-time.png",
                alt: "All campaigns average ring time over time chart.",
                description:
                  "Shows average ring time per time bucket. If the line rises, calls are taking longer to answer or end. That can indicate contact-list quality, carrier behavior, or endpoint issues."
              },
              {
                title: "Talk Time Distribution",
                src: "/screenshots/docs/dashboard-dialer-all-talk-time-distribution.png",
                alt: "All campaigns talk time distribution histogram.",
                description:
                  "Groups calls by talk-time bucket in seconds. Taller bars show where most conversations fall. Use it to see whether the campaign traffic is mostly short calls, normal conversations, or long outliers."
              }
            ],
            caption:
              "All Campaigns Performance summarizes the selected time range across every campaign, including outcomes, distribution, talk time, ring time, and total call volume."
          },
          {
            title: "Single Campaign Performance",
            detailId: "single-campaign-performance",
            src: "/screenshots/docs/dashboard-dialer-single-campaign-performance-cropped.png",
            alt: "Grafana single campaign performance dashboard with outcomes, timing, and distribution for one campaign.",
            description:
              "Use this view when one campaign needs its own review. It keeps the same operational metrics as the aggregate view, but filters the analysis to a single campaign.",
            points: [
              <>Use <strong>Call Outcomes Over Time</strong> to see the campaign's own answer, busy, no-answer, congestion, and failure pattern.</>,
              <>Use <strong>Calls in Selected Time Range</strong> and <strong>Call Outcomes Distribution</strong> to judge whether the campaign list and pacing are producing the expected outcome mix.</>,
              <>Use <strong>Avg Talk Time</strong>, <strong>Avg Ring Time</strong>, and <strong>Total Talk Time</strong> to compare this campaign against other outbound runs.</>,
              <>Use this dashboard before changing the campaign, because it avoids mixing one campaign's behavior with the rest of the dialer traffic.</>
            ],
            detailPanels: [
              {
                title: "Call Outcomes Over Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-outcomes-over-time.png",
                alt: "Single campaign Call Outcomes Over Time chart.",
                description:
                  "Shows new outcomes per time bucket for the selected campaign only. Use it to see whether one campaign is improving, degrading, or showing a specific period with more no answers, busy lines, congestion, or failures.",
                wide: true
              },
              {
                title: "Avg Ring Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-ring-time.png",
                alt: "Single campaign average ring time stat panel.",
                description:
                  "Shows average ring duration for this campaign. Use it to compare contact reachability and telephony behavior against other campaigns or time windows."
              },
              {
                title: "Total Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-total-talk-time.png",
                alt: "Single campaign total talk time stat panel.",
                description:
                  "Shows the total connected talk time generated by this campaign in the selected range. It measures the real conversation output of that specific outbound run."
              },
              {
                title: "Avg Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-talk-time.png",
                alt: "Single campaign average talk time stat panel.",
                description:
                  "Shows average connected conversation time for this campaign. Use it to understand whether this campaign is producing meaningful conversations or mostly short interactions."
              },
              {
                title: "Calls in Selected Time Range",
                src: "/screenshots/docs/dashboard-dialer-campaign-calls-selected-range.png",
                alt: "Single campaign Calls in Selected Time Range panel.",
                description:
                  "Shows totals for the selected campaign and selected Grafana time range. Use this when you need campaign-level reporting instead of totals mixed across all campaigns."
              },
              {
                title: "Call Outcomes Distribution",
                src: "/screenshots/docs/dashboard-dialer-campaign-outcomes-distribution.png",
                alt: "Single campaign Call Outcomes Distribution pie chart.",
                description:
                  "Shows the selected campaign as percentages. Use it to compare one campaign with another: a stronger campaign usually has a larger Answer share and lower Congestion or Failed share."
              },
              {
                title: "Average Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-talk-time-over-time.png",
                alt: "Single campaign average talk time over time chart.",
                description:
                  "Shows how average talk time changes during the campaign. Use it to identify moments where conversations become shorter, longer, or less stable."
              },
              {
                title: "Average Ring Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-ring-time-over-time.png",
                alt: "Single campaign average ring time over time chart.",
                description:
                  "Shows how ring time changes during the campaign. Spikes can indicate contact availability changes, carrier behavior, or temporary endpoint or trunk issues."
              },
              {
                title: "Talk Time Distribution",
                src: "/screenshots/docs/dashboard-dialer-campaign-talk-time-distribution.png",
                alt: "Single campaign talk time distribution histogram.",
                description:
                  "Groups this campaign's calls by talk-time bucket in seconds. Use it to see whether the campaign is dominated by short calls, normal conversations, or long outliers."
              }
            ],
            caption:
              "Campaign Performance isolates one campaign so teams can review outcome quality, timing, and behavior without mixing it with other outbound runs."
          }
        ]
      },
      cadvisor: {
        title: "cAdvisor dashboard",
        paragraphs: [
          "Use cAdvisor to understand container-level resource behavior. It helps separate application workflow issues from container pressure, CPU spikes, and memory growth."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-cadvisor-containers.png",
            alt: "Grafana cAdvisor dashboard showing host overview, CPU, and memory usage by container.",
            caption:
              "cAdvisor shows container CPU and memory patterns across RocketAiFlow services, helping teams identify runtime pressure before changing workflow configuration."
          }
        ]
      },
      mysql: {
        title: "MySQL dashboard",
        paragraphs: [
          "Use the MySQL dashboard when persistence, campaign data, contacts, call records, or backend response time need investigation."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-mysql-overview.png",
            alt: "Grafana MySQL dashboard showing connection status, command rate, uptime, CPU, memory, and load average.",
            caption:
              "MySQL panels show database connection state, command activity, uptime, CPU, memory, and load, which helps confirm whether database behavior is part of an issue."
          }
        ]
      },
      nodeExporter: {
        title: "Node Exporter dashboard",
        paragraphs: [
          "Use Node Exporter for host-level health. It gives the baseline view of CPU, memory, disk, network, filesystem usage, and uptime for the server running the platform."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-node-exporter-host.png",
            alt: "Grafana Node Exporter dashboard showing CPU, memory, disk, network, filesystem, and host uptime.",
            caption:
              "Node Exporter is the host health baseline: CPU, RAM, disk, network, filesystem usage, and uptime show whether the server itself is healthy."
          }
        ]
      },
      asteriskLog: {
        title: "Asterisk Log dashboard",
        paragraphs: [
          "Use Asterisk Log for event-level telephony review. It is useful when calls fail, trunks behave unexpectedly, or warnings and errors need to be checked against a specific time window."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-asterisk-log.png",
            alt: "Grafana Asterisk Log dashboard showing warnings, errors, notices, total log lines, error percentage, and historical logs by level.",
            caption:
              "Asterisk Log highlights warnings, errors, notices, log volume, and historical severity, making telephony issues easier to spot during an incident."
          }
        ]
      },
      asteriskOverview: {
        title: "Asterisk Overview dashboard",
        paragraphs: [
          "Use Asterisk Overview for the high-level telephony control plane. It shows Asterisk uptime, reload state, active calls, calls per second, active channels, endpoints, and bridges."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-asterisk-overview.png",
            alt: "Grafana Asterisk Overview dashboard showing uptime, active calls, max active calls, calls per second, active channels, endpoints, and bridges.",
            caption:
              "Asterisk Overview gives the telephony service picture at a glance: uptime, active calls, call capacity, channels, endpoints, bridges, and call rate."
          }
        ]
      }
    },
    relatedCards: [
      {
        title: "Dialer Dashboard Panels",
        href: "/monitoring/dialer-dashboard-panels",
        description: "Open the deeper breakdown of each Dialer dashboard panel."
      },
      {
        title: "Monitoring and Visibility",
        href: "/monitoring/monitoring-and-visibility",
        description: "See how dashboards fit into the full operating view."
      },
      {
        title: "Logs and Traces",
        href: "/monitoring/logs-and-traces",
        description: "Move from dashboard symptoms to event and path-level evidence."
      },
      {
        title: "Troubleshooting",
        href: "/troubleshoot/troubleshooting",
        description: "Use the setup checks when dashboard signals point to a workflow issue."
      }
    ]
  },
  it: {
    title: "Dashboard preconfigurate",
    intro: [
      "RocketAiFlow include dashboard Grafana preconfigurate per monitorare campagne outbound, telefonia, container, database e stato del server fin dal primo deploy.",
      "La dashboard Dialer è la vista operativa più importante per l'outbound: mostra stato campagne, pressione di chiamata live, limiti, outcome, chiamate attive e performance nell'intervallo selezionato."
    ],
    panelDetailsPageTitle: "Pannelli Dashboard Dialer",
    panelDetailsIntro: [
      "Usa questa pagina quando vuoi approfondire oltre gli screenshot completi della dashboard Dialer. Ogni sezione isola i pannelli Grafana e spiega cosa significano i dati dal punto di vista operativo.",
      "I pannelli live si aggiornano spesso e mostrano i valori correnti di Prometheus. I pannelli performance usano l'intervallo selezionato in Grafana: cambiando il time picker cambiano totali, percentuali e medie."
    ],
    panelDetailsHeading: "Cosa rappresenta ogni pannello",
    panelDetailsLinkLabel: "Approfondisci i pannelli",
    headings: {
      dialer: "Dashboard Dialer",
      cadvisor: "Dashboard cAdvisor",
      mysql: "Dashboard MySQL",
      nodeExporter: "Dashboard Node Exporter",
      asteriskLog: "Dashboard Asterisk Log",
      asteriskOverview: "Dashboard Asterisk Overview",
      relatedPages: "Pagine correlate"
    },
    sections: {
      dialer: {
        title: "Dashboard Dialer",
        paragraphs: [
          "Usa la dashboard Dialer come control room delle campagne outbound. Aiuta gli operatori a vedere se le campagne sono attive, se le chiamate vengono generate, quanto il sistema è vicino ai limiti configurati e come evolvono gli esiti in tempo reale.",
          "La dashboard si spiega meglio come quattro viste separate: controllo live delle campagne, stato agenti e trunk, performance di tutte le campagne e performance di una singola campagna."
        ],
        screenshots: [
          {
            title: "Real-Time Overview",
            detailId: "real-time-overview",
            src: "/screenshots/docs/dashboard-dialer-realtime-overview-cropped.png",
            alt: "Dashboard Grafana Dialer con stato campagne, outcome, dialing rate, chiamate attive e limiti.",
            description:
              "Parti da qui durante un run outbound. Questa vista unisce stato live delle campagne, totali outcome, pressione del dialer, chiamate attive, limiti configurati e stato per campagna.",
            points: [
              <>Usa <strong>Total Outcomes</strong> e <strong>Call Outcomes</strong> per capire se il run sta generando answer, no answer, busy, congestion o failed. Questi due pannelli si azzerano ogni giorno.</>,
              <>Usa <strong>Dialing Rate</strong> e <strong>Calls Volume</strong> per vedere se il dialer sta producendo traffico al ritmo previsto.</>,
              <>Usa la tabella <strong>Dialer</strong> per confrontare stato, active flag, active calls e call limit di ogni campagna.</>,
              <>Usa <strong>Active Calls vs Limit</strong> per capire se il sistema è vicino alla saturazione o ha ancora capacità disponibile.</>
            ],
            detailPanels: [
              {
                title: "Tabella Dialer",
                src: "/screenshots/docs/dashboard-dialer-realtime-dialer-table.png",
                alt: "Tabella Dialer con campaign name, dialer status, campaign active, active calls e call limit.",
                description:
                  "Elenca ogni campagna con Campaign Name, Dialer Status, Campaign Active, Active Calls e Call Limit. Leggi prima lo status: Calls In Progress è sano; No Available Contacts significa lista vuota o esaurita; Campaign Stopped significa campagna non in esecuzione; Not scheduled indica che l'orario corrente è fuori finestra; gli stati sul trunk indicano che configurazione o raggiungibilità telefonica vanno corrette prima che le chiamate partano.",
                wide: true
              },
              {
                title: "Total Outcomes",
                src: "/screenshots/docs/dashboard-dialer-realtime-total-outcomes.png",
                alt: "Pannello Total Outcomes con conteggi Answer, No Answer, Busy, Congestion, Failed e Total Calls.",
                description:
                  "Mostra il conteggio giornaliero corrente di ogni esito su tutte le campagne. Leggilo come uno score generale: Answer significa chiamata risposta, No Answer significa nessuna risposta, Busy significa linea occupata, Congestion indica che la parte telefonica non ha completato bene la chiamata, Failed indica chiamata fallita e Total Calls è il totale chiamate del giorno."
              },
              {
                title: "Call Outcomes",
                src: "/screenshots/docs/dashboard-dialer-realtime-call-outcomes.png",
                alt: "Grafico Call Outcomes con percentuali di answer, no answer, busy, congestion e failed.",
                description:
                  "Mostra gli stessi esiti giornalieri in percentuale. Usalo quando i numeri assoluti sono alti e vuoi capire rapidamente il mix: una fetta Answer più grande è positiva, mentre No Answer, Busy, Congestion o Failed più grandi indicano dove controllare qualità lista o telefonia."
              },
              {
                title: "Dialing Rate",
                src: "/screenshots/docs/dashboard-dialer-realtime-dialing-rate.png",
                alt: "Grafico Dialing Rate con pressione outbound nel tempo.",
                description:
                  "Mostra il segnale calls-per-second di tutte le campagne nel tempo. Picchi più alti indicano che il dialer sta provando a lanciare chiamate più velocemente. Una linea vicina a zero di solito indica campagne inattive, ferme, fuori schedule o senza contatti pronti."
              },
              {
                title: "Calls Volume",
                src: "/screenshots/docs/dashboard-dialer-realtime-calls-volume.png",
                alt: "Grafico Calls Volume che confronta active calls e calls limit.",
                description:
                  "Confronta Calls Limit configurato e chiamate lanciate o attive. Leggi la linea rossa come limite massimo e la linea blu come utilizzo. Se il blu resta vicino al rosso, il dialer sta usando quasi tutta la capacità; se resta molto sotto, c'è ancora spazio per lanciare chiamate."
              },
              {
                title: "Active Calls vs Limit",
                src: "/screenshots/docs/dashboard-dialer-realtime-active-calls-vs-limit.png",
                alt: "Gauge Active Calls vs Limit con percentuale della capacità outbound in uso.",
                description:
                  "Mostra Active Calls diviso Calls Limit in percentuale. Verde significa capacità disponibile, arancione significa uso alto, rosso significa che il dialer è vicino al limite configurato. Usalo prima di aumentare pacing o limiti campagna.",
                compactImage: true
              }
            ],
            caption:
              "Real-Time Overview è il centro operativo outbound: stato campagna, active calls, limiti, dialing rate, outcome e pressione live sono visibili nella stessa vista."
          },
          {
            title: "Real-Time Agents & Trunks",
            detailId: "real-time-agents-trunks",
            src: "/screenshots/docs/dashboard-dialer-realtime-agents-trunks-cropped.png",
            alt: "Pannello Grafana Real-Time Agents & Trunks con stati endpoint e timeline dello stato trunk.",
            description:
              "Usa questa vista quando la campagna è attiva ma le chiamate non si comportano come previsto. Ti aiuta a separare la logica campagna dalla readiness telefonica mostrando stati endpoint e cambiamenti nel tempo.",
            points: [
              <>Usa <strong>Endpoints by State</strong> per vedere subito endpoint unavailable, <UiPill>Not In Use</UiPill>, invalid, <UiPill>In Use</UiPill> o altri stati.</>,
              <>Usa <strong>Endpoint State Timeline</strong> per capire quando un endpoint ha cambiato stato nell'intervallo selezionato.</>,
              <>Usa la tabella <strong>Endpoints</strong> per identificare endpoint, state code, device state, provider host e source event.</>,
              <>Controlla questa vista prima di modificare il pacing campagna, perché un problema di trunk o endpoint può sembrare un problema del dialer.</>
            ],
            detailPanels: [
              {
                title: "Endpoints by State",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoints-by-state.png",
                alt: "Pannello Endpoints by State con conteggio endpoint unavailable, not in use e invalid.",
                description:
                  <>Mostra quanti endpoint o trunk sono in ogni stato. <UiPill>Not In Use</UiPill> significa che il trunk è registrato e libero. <UiPill>In Use</UiPill> significa che il trunk sta gestendo una chiamata. Busy, Ringing o Ring + InUse indicano altri stati legati a una chiamata. Unavailable, Unreachable, Invalid, Offline o Unknown indicano che l'endpoint non è pronto: controlla registrazione, provider e configurazione endpoint.</>
              },
              {
                title: "Endpoint State Timeline",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoint-state-timeline.png",
                alt: "Timeline Endpoint State con cambiamenti tra not in use e in use.",
                description:
                  <>Mostra come cambia stato l'endpoint selezionato nell'intervallo temporale. Leggilo da sinistra a destra: sezioni verdi lunghe indicano endpoint attivo; sezioni <UiPill>In Use</UiPill> indicano chiamate attive. <UiPill>Not In Use</UiPill> indica che il trunk è libero. Se compaiono unavailable o invalid, possono spiegare fallimenti chiamata.</>,
                spanTwo: true
              },
              {
                title: "Tabella Endpoints",
                src: "/screenshots/docs/dashboard-dialer-agents-endpoints-table.png",
                alt: "Tabella Endpoints con endpoint, state code, device state, provider host e source event.",
                description:
                  "Mostra la lista endpoint dietro i riepiloghi: nome endpoint, state code, device state leggibile, provider host e source event. Usala per trovare l'endpoint esatto da investigare, soprattutto quando vedi Unavailable, Unreachable, Invalid o Offline.",
                wide: true
              }
            ],
            caption:
              <>Real-Time Agents & Trunks mostra endpoint e trunk disponibili, non disponibili, invalidi, <UiPill>Not In Use</UiPill> o <UiPill>In Use</UiPill>. Serve a confermare che il trunk sia pronto prima di intervenire sulla logica campagna.</>
          },
          {
            title: "All Campaigns Performance",
            detailId: "all-campaigns-performance",
            src: "/screenshots/docs/dashboard-dialer-all-campaigns-performance-cropped.png",
            alt: "Dashboard Grafana performance all campaigns con outcome nel tempo, distribuzione chiamate, talk time e ring time.",
            description:
              "Usa questa vista durante o dopo una finestra outbound più ampia, quando vuoi valutare la performance complessiva di tutte le campagne nell'intervallo selezionato.",
            points: [
              <>Usa <strong>Call Outcomes Over Time</strong> per individuare trend di answer, busy, no answer, congestion e failed su tutte le campagne.</>,
              <>Usa <strong>Calls in Selected Time Range</strong> e <strong>Call Outcomes Distribution</strong> per confrontare volume totale e mix degli esiti.</>,
              <>Usa <strong>Avg Talk Time</strong>, <strong>Avg Ring Time</strong> e <strong>Total Talk Time</strong> per leggere qualità conversazioni e carico operativo.</>,
              <>Usa i grafici di talk time e ring time per intercettare cambiamenti legati a qualità lista, telefonia o configurazione campagna.</>
            ],
            detailPanels: [
              {
                title: "Call Outcomes Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-outcomes-over-time.png",
                alt: "Grafico Call Outcomes Over Time per tutte le campagne con serie answer, no answer, busy, failed e congestion.",
                description:
                  "Mostra quanti nuovi esiti vengono aggiunti in ogni intervallo temporale su tutte le campagne. Leggi le linee come trend, non come totali assoluti: una crescita verde indica più chiamate risposte in quel periodo; giallo, blu, arancione o rosso indicano più no answer, busy, congestion o failed.",
                wide: true
              },
              {
                title: "Avg Ring Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-ring-time.png",
                alt: "Pannello Avg Ring Time per tutte le campagne.",
                description:
                  "Mostra in secondi quanto squillano in media le chiamate nell'intervallo selezionato. Valori più alti indicano che le chiamate restano più tempo in ringing prima di risposta, errore o timeout. Usalo per individuare cambi di disponibilità contatti o comportamento carrier."
              },
              {
                title: "Total Talk Time",
                src: "/screenshots/docs/dashboard-dialer-all-total-talk-time.png",
                alt: "Pannello Total Talk Time per tutte le campagne.",
                description:
                  "Mostra il tempo totale di conversazione connessa prodotto da tutte le campagne nell'intervallo selezionato. È il modo più semplice per capire quanto tempo reale di conversazione ha generato il dialer."
              },
              {
                title: "Avg Talk Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-talk-time.png",
                alt: "Pannello Avg Talk Time per tutte le campagne.",
                description:
                  "Mostra in secondi la durata media delle conversazioni connesse nell'intervallo selezionato. È calcolato come tempo totale parlato diviso numero di conversazioni misurate. Valori più alti indicano conversazioni più lunghe; valori molto bassi possono indicare hangup rapidi o lista debole."
              },
              {
                title: "Calls in Selected Time Range",
                src: "/screenshots/docs/dashboard-dialer-all-calls-selected-range.png",
                alt: "Pannello Calls in Selected Time Range per tutte le campagne con totali per esito e totale chiamate.",
                description:
                  "Mostra i totali calcolati solo sull'intervallo selezionato in Grafana. Se cambi il time picker, questi numeri cambiano. Usalo per report su una finestra precisa, per esempio ultimi 30 minuti, oggi o un run specifico."
              },
              {
                title: "Call Outcomes Distribution",
                src: "/screenshots/docs/dashboard-dialer-all-outcomes-distribution.png",
                alt: "Grafico Call Outcomes Distribution per tutte le campagne.",
                description:
                  "Mostra l'intervallo selezionato in percentuale invece che in conteggi. Serve a leggere la qualità a colpo d'occhio: confronta la quota Answer con No Answer, Busy, Congestion e Failed."
              },
              {
                title: "Average Talk Time Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-talk-time-over-time.png",
                alt: "Grafico Average Talk Time Over Time per tutte le campagne.",
                description:
                  "Mostra il talk time medio per ogni intervallo temporale. Una linea stabile indica durata conversazioni costante; picchi o cali mostrano periodi in cui le chiamate diventano più lunghe o più brevi."
              },
              {
                title: "Average Ring Time Over Time",
                src: "/screenshots/docs/dashboard-dialer-all-avg-ring-time-over-time.png",
                alt: "Grafico Average Ring Time Over Time per tutte le campagne.",
                description:
                  "Mostra il ring time medio per ogni intervallo temporale. Se la linea sale, le chiamate impiegano più tempo a ricevere risposta o a chiudersi. Può indicare qualità lista, comportamento carrier o problemi endpoint."
              },
              {
                title: "Talk Time Distribution",
                src: "/screenshots/docs/dashboard-dialer-all-talk-time-distribution.png",
                alt: "Istogramma Talk Time Distribution per tutte le campagne.",
                description:
                  "Raggruppa le chiamate per bucket di durata in secondi. Le barre più alte indicano dove si concentra la maggior parte delle conversazioni. Usalo per capire se il traffico è composto soprattutto da chiamate brevi, conversazioni normali o outlier lunghi."
              }
            ],
            caption:
              "All Campaigns Performance sintetizza l'intervallo selezionato su tutte le campagne: outcome, distribuzione, talk time, ring time e volume totale."
          },
          {
            title: "Single Campaign Performance",
            detailId: "single-campaign-performance",
            src: "/screenshots/docs/dashboard-dialer-single-campaign-performance-cropped.png",
            alt: "Dashboard Grafana performance single campaign con outcome, timing e distribuzione di una campagna.",
            description:
              "Usa questa vista quando una campagna deve essere analizzata da sola. Mantiene le stesse metriche operative della vista aggregata, ma filtra l'analisi su una singola campagna.",
            points: [
              <>Usa <strong>Call Outcomes Over Time</strong> per leggere il pattern specifico della campagna: answer, busy, no answer, congestion e failed.</>,
              <>Usa <strong>Calls in Selected Time Range</strong> e <strong>Call Outcomes Distribution</strong> per capire se lista e pacing producono il mix di esiti atteso.</>,
              <>Usa <strong>Avg Talk Time</strong>, <strong>Avg Ring Time</strong> e <strong>Total Talk Time</strong> per confrontare questa campagna con altri run outbound.</>,
              <>Usa questa dashboard prima di modificare la campagna, perché evita di mescolare il comportamento della singola campagna con il resto del traffico dialer.</>
            ],
            detailPanels: [
              {
                title: "Call Outcomes Over Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-outcomes-over-time.png",
                alt: "Grafico Call Outcomes Over Time per una singola campagna.",
                description:
                  "Mostra i nuovi esiti per ogni intervallo temporale solo sulla campagna selezionata. Serve a capire se una campagna sta migliorando, peggiorando o ha un periodo specifico con più no answer, busy, congestion o failed.",
                wide: true
              },
              {
                title: "Avg Ring Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-ring-time.png",
                alt: "Pannello Avg Ring Time per una singola campagna.",
                description:
                  "Mostra la durata media dello squillo per questa campagna. Serve a confrontare raggiungibilità contatti e comportamento telefonico rispetto ad altre campagne o finestre temporali."
              },
              {
                title: "Total Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-total-talk-time.png",
                alt: "Pannello Total Talk Time per una singola campagna.",
                description:
                  "Mostra il tempo totale di conversazione connessa generato da questa campagna nell'intervallo selezionato. Misura l'output reale di conversazione di quello specifico run outbound."
              },
              {
                title: "Avg Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-talk-time.png",
                alt: "Pannello Avg Talk Time per una singola campagna.",
                description:
                  "Mostra la durata media delle conversazioni connesse per questa campagna. Aiuta a capire se genera conversazioni utili o soprattutto interazioni molto brevi."
              },
              {
                title: "Calls in Selected Time Range",
                src: "/screenshots/docs/dashboard-dialer-campaign-calls-selected-range.png",
                alt: "Pannello Calls in Selected Time Range per una singola campagna.",
                description:
                  "Mostra i totali della campagna selezionata nell'intervallo Grafana scelto. Usalo quando ti serve un report a livello campagna, non un totale mescolato con tutte le altre campagne."
              },
              {
                title: "Call Outcomes Distribution",
                src: "/screenshots/docs/dashboard-dialer-campaign-outcomes-distribution.png",
                alt: "Grafico Call Outcomes Distribution per una singola campagna.",
                description:
                  "Mostra la campagna selezionata in percentuale. Serve a confrontare una campagna con un'altra: una campagna più forte di solito ha più quota Answer e meno Congestion o Failed."
              },
              {
                title: "Average Talk Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-talk-time-over-time.png",
                alt: "Grafico Average Talk Time per una singola campagna.",
                description:
                  "Mostra come cambia il talk time medio durante la campagna. Serve a individuare momenti in cui le conversazioni diventano più corte, più lunghe o meno stabili."
              },
              {
                title: "Average Ring Time",
                src: "/screenshots/docs/dashboard-dialer-campaign-avg-ring-time-over-time.png",
                alt: "Grafico Average Ring Time per una singola campagna.",
                description:
                  "Mostra come cambia il ring time durante la campagna. I picchi possono indicare variazioni di disponibilità contatti, comportamento carrier o problemi temporanei su endpoint o trunk."
              },
              {
                title: "Talk Time Distribution",
                src: "/screenshots/docs/dashboard-dialer-campaign-talk-time-distribution.png",
                alt: "Istogramma Talk Time Distribution per una singola campagna.",
                description:
                  "Raggruppa le chiamate della campagna per bucket di durata in secondi. Serve a capire se la campagna è dominata da chiamate brevi, conversazioni normali o outlier lunghi."
              }
            ],
            caption:
              "Campaign Performance isola una singola campagna per analizzare qualità degli esiti, timing e comportamento senza mescolarla con altri run outbound."
          }
        ]
      },
      cadvisor: {
        title: "Dashboard cAdvisor",
        paragraphs: [
          "Usa cAdvisor per capire il comportamento delle risorse a livello container. Aiuta a separare problemi di workflow da pressione runtime, picchi CPU e crescita memoria."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-cadvisor-containers.png",
            alt: "Dashboard Grafana cAdvisor con host overview, CPU e memoria per container.",
            caption:
              "cAdvisor mostra CPU e memoria dei servizi RocketAiFlow, così il team può individuare pressione runtime prima di modificare configurazioni applicative."
          }
        ]
      },
      mysql: {
        title: "Dashboard MySQL",
        paragraphs: [
          "Usa la dashboard MySQL quando devi investigare persistenza, dati campagna, contatti, call record o tempi di risposta backend."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-mysql-overview.png",
            alt: "Dashboard Grafana MySQL con stato connessione, command rate, uptime, CPU, memoria e load average.",
            caption:
              "I pannelli MySQL mostrano connessione, attività comandi, uptime, CPU, memoria e load: utili per capire se il database contribuisce al problema."
          }
        ]
      },
      nodeExporter: {
        title: "Dashboard Node Exporter",
        paragraphs: [
          "Usa Node Exporter per la salute del server. È la vista base su CPU, memoria, disco, rete, filesystem e uptime della macchina che ospita la piattaforma."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-node-exporter-host.png",
            alt: "Dashboard Grafana Node Exporter con CPU, memoria, disco, rete, filesystem e uptime host.",
            caption:
              "Node Exporter è la baseline dell'host: CPU, RAM, disco, rete, filesystem e uptime indicano se il server è sano."
          }
        ]
      },
      asteriskLog: {
        title: "Dashboard Asterisk Log",
        paragraphs: [
          "Usa Asterisk Log per la revisione telefonica a livello evento. È utile quando le chiamate falliscono, i trunk si comportano in modo inatteso o warning/errori vanno letti su una finestra temporale precisa."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-asterisk-log.png",
            alt: "Dashboard Grafana Asterisk Log con warnings, errors, notices, total log lines, percentuale errori e storico per livello.",
            caption:
              "Asterisk Log evidenzia warning, errori, notice, volume log e severità storica, rendendo più semplice individuare problemi telefonici durante un incidente."
          }
        ]
      },
      asteriskOverview: {
        title: "Dashboard Asterisk Overview",
        paragraphs: [
          "Usa Asterisk Overview per la vista alta del piano telefonico. Mostra uptime Asterisk, reload, chiamate attive, calls per second, canali, endpoint e bridge."
        ],
        screenshots: [
          {
            src: "/screenshots/docs/dashboard-asterisk-overview.png",
            alt: "Dashboard Grafana Asterisk Overview con uptime, active calls, max active calls, calls per second, canali, endpoint e bridge.",
            caption:
              "Asterisk Overview dà subito lo stato del servizio telefonico: uptime, chiamate attive, capacità, canali, endpoint, bridge e call rate."
          }
        ]
      }
    },
    relatedCards: [
      {
        title: "Pannelli Dashboard Dialer",
        href: "/monitoring/dialer-dashboard-panels",
        description: "Apri l'approfondimento dei singoli pannelli della dashboard Dialer."
      },
      {
        title: "Monitoring e visibilità",
        href: "/monitoring/monitoring-and-visibility",
        description: "Vedi come le dashboard entrano nella vista operativa completa."
      },
      {
        title: "Log e trace",
        href: "/monitoring/logs-and-traces",
        description: "Passa dai sintomi in dashboard all'evidenza su eventi e percorsi."
      },
      {
        title: "Risoluzione problemi",
        href: "/troubleshoot/troubleshooting",
        description: "Usa i controlli di setup quando i segnali dashboard indicano un problema di workflow."
      }
    ]
  }
};

function useDashboardsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return dashboardsCopy[locale];
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

function DashboardPanelDetail({ panel }: { panel: DashboardPanelCopy }) {
  const className = [
    "docs-dashboard-panel-detail",
    panel.wide ? "docs-dashboard-panel-detail-wide" : "",
    panel.spanTwo ? "docs-dashboard-panel-detail-span-two" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <figure className={panel.compactImage ? "docs-screenshot docs-dashboard-panel-image-compact" : "docs-screenshot"}>
        <div className="docs-screenshot-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="docs-screenshot-img" src={panel.src} alt={panel.alt} loading="lazy" />
        </div>
      </figure>
      <h3 className="docs-dashboard-panel-title">{panel.title}</h3>
      <p>{panel.description}</p>
    </article>
  );
}

function DashboardScreenshotDetail({ screenshot }: { screenshot: ScreenshotCopy }) {
  const copy = useDashboardsCopy();
  const locale = useCurrentLocale(defaultLocale);

  if (!screenshot.title && !screenshot.description && !screenshot.points?.length) {
    return <ProductScreenshot screenshot={screenshot} />;
  }

  return (
    <section className="docs-home-section docs-home-section-nested">
      {screenshot.title ? <h3>{screenshot.title}</h3> : null}
      <ProductScreenshot screenshot={screenshot} />
      {screenshot.description ? <p>{screenshot.description}</p> : null}
      {screenshot.points?.length ? (
        <ul>
          {screenshot.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      ) : null}
      {screenshot.detailPanels?.length && screenshot.detailId ? (
        <p>
          <Link
            className="docs-inline-link"
            href={localizeHref(`/monitoring/dialer-dashboard-panels#${screenshot.detailId}`, locale)}
          >
            <span>
              {copy.panelDetailsLinkLabel}: {screenshot.title}
            </span>
          </Link>
        </p>
      ) : null}
    </section>
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

function DashboardSection({ section }: { section: DashboardSection }) {
  return (
    <section className="docs-home-section docs-home-section-nested">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.screenshots.map((screenshot) => (
        <DashboardScreenshotDetail key={screenshot.src} screenshot={screenshot} />
      ))}
    </section>
  );
}

export function LocalizedPreProvisionedDashboardsTitle() {
  return <>{useDashboardsCopy().title}</>;
}

export function LocalizedPreProvisionedDashboardsIntro() {
  const copy = useDashboardsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedPreProvisionedDashboardsHeading({ labelKey }: { labelKey: HeadingKey }) {
  return <>{useDashboardsCopy().headings[labelKey]}</>;
}

export function LocalizedPreProvisionedDashboardsSection({
  sectionKey
}: {
  sectionKey: Exclude<HeadingKey, "relatedPages">;
}) {
  return <DashboardSection section={useDashboardsCopy().sections[sectionKey]} />;
}

export function LocalizedPreProvisionedDashboardsRelatedPages() {
  return <Cards cards={useDashboardsCopy().relatedCards} />;
}

export function LocalizedDialerDashboardPanelsTitle() {
  return <>{useDashboardsCopy().panelDetailsPageTitle}</>;
}

export function LocalizedDialerDashboardPanelsIntro() {
  const copy = useDashboardsCopy();

  return (
    <section className="docs-home-section">
      {copy.panelDetailsIntro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

function getDialerPanelScreenshot(copy: DashboardsCopy, sectionKey: DialerPanelSectionKey) {
  return copy.sections.dialer.screenshots.find(
    (screenshot) => screenshot.detailId === dialerPanelDetailIds[sectionKey]
  );
}

function DialerDashboardPanelSection({ screenshot }: { screenshot: ScreenshotCopy }) {
  const copy = useDashboardsCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      {screenshot.description ? <p>{screenshot.description}</p> : null}
      <p className="docs-dashboard-panel-kicker">{copy.panelDetailsHeading}</p>
      <div className="docs-panel-grid docs-panel-grid-three docs-dashboard-panel-grid">
        {screenshot.detailPanels?.map((panel) => (
          <DashboardPanelDetail key={panel.src} panel={panel} />
        ))}
      </div>
    </section>
  );
}

export function LocalizedDialerDashboardPanelsHeading({
  sectionKey
}: {
  sectionKey: DialerPanelSectionKey;
}) {
  const copy = useDashboardsCopy();
  return <>{getDialerPanelScreenshot(copy, sectionKey)?.title ?? ""}</>;
}

export function LocalizedDialerDashboardPanelsSection({
  sectionKey
}: {
  sectionKey: DialerPanelSectionKey;
}) {
  const copy = useDashboardsCopy();
  const screenshot = getDialerPanelScreenshot(copy, sectionKey);

  return screenshot ? <DialerDashboardPanelSection screenshot={screenshot} /> : null;
}

export function LocalizedDialerDashboardPanelsPage() {
  return (
    <>
      <LocalizedDialerDashboardPanelsSection sectionKey="realTimeOverview" />
      <LocalizedDialerDashboardPanelsSection sectionKey="realTimeAgentsTrunks" />
      <LocalizedDialerDashboardPanelsSection sectionKey="allCampaignsPerformance" />
      <LocalizedDialerDashboardPanelsSection sectionKey="singleCampaignPerformance" />
    </>
  );
}
