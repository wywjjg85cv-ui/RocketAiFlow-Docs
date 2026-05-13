"use client";

import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type NavLabelKey =
  | "getStarted"
  | "build"
  | "runWorkflows"
  | "integrations"
  | "deploy"
  | "observe"
  | "troubleshoot"
  | "reference"
  | "introduction"
  | "quickstart"
  | "createFirstAgent"
  | "configureAgentPrompt"
  | "configureAgentFunctions"
  | "dynamicParameters"
  | "telephony"
  | "asteriskBasedPbxSystems"
  | "aiInboundRouting"
  | "aiDialerFlows"
  | "dialerPacingAndLimits"
  | "importContacts"
  | "contactInbounds"
  | "callRecords"
  | "callHistoryAndReview"
  | "phone"
  | "pilotSetupOverview"
  | "telephonyArchitecture"
  | "trunkConfiguration"
  | "guidedPilotSetup"
  | "customerEnvironment"
  | "monitoringAndVisibility"
  | "campaignAnalytics"
  | "endpointAndTrunkMonitoring"
  | "preProvisionedDashboards"
  | "logsOverview"
  | "tracesOverview"
  | "logsDrilldown"
  | "traceCorrelation"
  | "infrastructureMonitoring"
  | "asteriskMonitoring"
  | "containerMonitoring"
  | "databaseMonitoring"
  | "realTimePerformanceMetrics"
  | "timeRangeReporting"
  | "investigatingWorkflowIssues"
  | "faq"
  | "apiReference"
  | "changelog";

const navLabels: Record<Locale, Record<NavLabelKey, string>> = {
  en: {
    getStarted: "Get Started",
    build: "Build",
    runWorkflows: "Run Workflows",
    integrations: "Integrations",
    deploy: "Deploy",
    observe: "Observe",
    troubleshoot: "Troubleshoot",
    reference: "Reference",
    introduction: "Introduction",
    quickstart: "Quickstart",
    createFirstAgent: "Create Your First AI Voice Agent",
    configureAgentPrompt: "Configure Agent Prompt",
    configureAgentFunctions: "Configure Agent Functions",
    dynamicParameters: "Dynamic Parameters",
    telephony: "Telephony",
    asteriskBasedPbxSystems: "Asterisk-based PBX Systems",
    aiInboundRouting: "AI Inbound Routing",
    aiDialerFlows: "AI Dialer Flows",
    dialerPacingAndLimits: "Dialer Pacing and Limits",
    importContacts: "Import Contacts",
    contactInbounds: "Contact Inbounds",
    callRecords: "Call Records",
    callHistoryAndReview: "Call History and Review",
    phone: "Phone",
    pilotSetupOverview: "Pilot Setup Overview",
    telephonyArchitecture: "Telephony Architecture",
    trunkConfiguration: "Trunk Configuration",
    guidedPilotSetup: "Guided Pilot Setup",
    customerEnvironment: "Customer Environment",
    monitoringAndVisibility: "Monitoring and Visibility",
    campaignAnalytics: "Campaign Analytics",
    endpointAndTrunkMonitoring: "Endpoint and Trunk Monitoring",
    preProvisionedDashboards: "Pre-Provisioned Dashboards",
    logsOverview: "Logs Overview",
    tracesOverview: "Traces Overview",
    logsDrilldown: "Logs Drilldown",
    traceCorrelation: "Trace Correlation",
    infrastructureMonitoring: "Infrastructure Monitoring",
    asteriskMonitoring: "Asterisk Monitoring",
    containerMonitoring: "Container Monitoring",
    databaseMonitoring: "Database Monitoring",
    realTimePerformanceMetrics: "Real-Time Performance Metrics",
    timeRangeReporting: "Time-Range Reporting",
    investigatingWorkflowIssues: "Investigating Workflow Issues",
    faq: "FAQ",
    apiReference: "API Reference",
    changelog: "Changelog"
  },
  it: {
    getStarted: "Per iniziare",
    build: "Costruisci",
    runWorkflows: "Esegui workflow",
    integrations: "Integrazioni",
    deploy: "Deploy",
    observe: "Osserva",
    troubleshoot: "Troubleshooting",
    reference: "Riferimenti",
    introduction: "Introduzione",
    quickstart: "Quickstart",
    createFirstAgent: "Crea il primo AI Voice Agent",
    configureAgentPrompt: "Configura il prompt",
    configureAgentFunctions: "Configura le functions",
    dynamicParameters: "Parametri dinamici",
    telephony: "Telephony",
    asteriskBasedPbxSystems: "Asterisk-based PBX Systems",
    aiInboundRouting: "AI Inbound Routing",
    aiDialerFlows: "AI Dialer Flows",
    dialerPacingAndLimits: "Pacing e limiti dialer",
    importContacts: "Importa contatti",
    contactInbounds: "Contact Inbounds",
    callRecords: "Call Records",
    callHistoryAndReview: "Storico e revisione chiamate",
    phone: "Phone",
    pilotSetupOverview: "Panoramica setup pilot",
    telephonyArchitecture: "Architettura telephony",
    trunkConfiguration: "Configurazione trunk",
    guidedPilotSetup: "Setup pilot guidato",
    customerEnvironment: "Ambiente cliente",
    monitoringAndVisibility: "Monitoring e visibilità",
    campaignAnalytics: "Analytics campagna",
    endpointAndTrunkMonitoring: "Monitoraggio endpoint e trunk",
    preProvisionedDashboards: "Dashboard preconfigurate",
    logsOverview: "Panoramica log",
    tracesOverview: "Panoramica trace",
    logsDrilldown: "Analisi log",
    traceCorrelation: "Correlazione trace",
    infrastructureMonitoring: "Monitoraggio infrastruttura",
    asteriskMonitoring: "Monitoraggio Asterisk",
    containerMonitoring: "Monitoraggio container",
    databaseMonitoring: "Monitoraggio database",
    realTimePerformanceMetrics: "Metriche real-time",
    timeRangeReporting: "Report per intervallo",
    investigatingWorkflowIssues: "Analisi problemi workflow",
    faq: "FAQ",
    apiReference: "Riferimento API",
    changelog: "Changelog"
  }
};

export function LocalizedNavLabel({ labelKey }: { labelKey: NavLabelKey }) {
  const locale = useCurrentLocale(defaultLocale);

  return <>{navLabels[locale][labelKey]}</>;
}
