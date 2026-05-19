"use client";

import {
  Activity,
  BarChart3,
  Bot,
  BookOpen,
  Braces,
  Bug,
  Clock,
  Compass,
  Database,
  FileText,
  GitBranch,
  History,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Lock,
  MessageSquareText,
  Network,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Plug,
  Radar,
  Rocket,
  Scale,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Upload,
  Users,
  Wrench,
  Zap,
  type LucideIcon
} from "lucide-react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { defaultLocale, type Locale } from "../../i18n/routing";

type NavLabelKey =
  | "getStarted"
  | "build"
  | "runWorkflows"
  | "integrations"
  | "deploy"
  | "monitoring"
  | "troubleshoot"
  | "legal"
  | "reference"
  | "introduction"
  | "quickstart"
  | "createFirstAgent"
  | "configureAgentPrompt"
  | "configureAgentFunctions"
  | "dynamicParameters"
  | "telephony"
  | "telephonyOverview"
  | "asteriskBasedPbxSystems"
  | "inboundAi"
  | "aiInboundRouting"
  | "aiDialerFlows"
  | "aiDialerFlowsOverview"
  | "dialerContacts"
  | "importContacts"
  | "contactInbounds"
  | "callRecords"
  | "processedContacts"
  | "phone"
  | "pilotSetupOverview"
  | "monitoringAndVisibility"
  | "campaignAnalytics"
  | "endpointAndTrunkMonitoring"
  | "preProvisionedDashboards"
  | "dialerDashboardPanels"
  | "logsAndTraces"
  | "logsDrilldown"
  | "traceCorrelation"
  | "infrastructureMonitoring"
  | "asteriskMonitoring"
  | "containerMonitoring"
  | "databaseMonitoring"
  | "realTimePerformanceMetrics"
  | "timeRangeReporting"
  | "troubleshootingPage"
  | "faq"
  | "legalOverview"
  | "termsAndCommercialModel"
  | "privacyAndDataProtection"
  | "aiTransparency"
  | "securityAndTrust"
  | "imprint"
  | "apiReference"
  | "changelog";

const navLabels: Record<Locale, Record<NavLabelKey, string>> = {
  en: {
    getStarted: "Get Started",
    build: "Build",
    runWorkflows: "Run Workflows",
    integrations: "Integrations",
    deploy: "Deploy",
    monitoring: "Monitoring",
    troubleshoot: "Troubleshoot",
    legal: "Legal",
    reference: "Reference",
    introduction: "Introduction",
    quickstart: "Quickstart",
    createFirstAgent: "Create Your First AI Voice Agent",
    configureAgentPrompt: "Configure Agent Prompt",
    configureAgentFunctions: "Configure Agent Functions",
    dynamicParameters: "Dynamic Parameters",
    telephony: "Telephony",
    telephonyOverview: "Overview",
    asteriskBasedPbxSystems: "Asterisk-based PBX Systems",
    inboundAi: "Inbound Ai",
    aiInboundRouting: "AI Inbound Routing",
    aiDialerFlows: "AI Dialer Flows",
    aiDialerFlowsOverview: "Overview",
    dialerContacts: "Campaign Contacts",
    importContacts: "Import Contacts",
    contactInbounds: "Contact Inbounds",
    callRecords: "Call Records",
    processedContacts: "Processed Contacts",
    phone: "Phone",
    pilotSetupOverview: "Deployment Overview",
    monitoringAndVisibility: "Monitoring and Visibility",
    campaignAnalytics: "Campaign Analytics",
    endpointAndTrunkMonitoring: "Endpoint and Trunk Monitoring",
    preProvisionedDashboards: "Pre-Provisioned Dashboards",
    dialerDashboardPanels: "Dialer Dashboard Panels",
    logsAndTraces: "Logs and Traces",
    logsDrilldown: "Logs Drilldown",
    traceCorrelation: "Trace Correlation",
    infrastructureMonitoring: "Infrastructure Monitoring",
    asteriskMonitoring: "Asterisk Monitoring",
    containerMonitoring: "Container Monitoring",
    databaseMonitoring: "Database Monitoring",
    realTimePerformanceMetrics: "Real-Time Performance Metrics",
    timeRangeReporting: "Time-Range Reporting",
    troubleshootingPage: "Troubleshooting",
    faq: "FAQ",
    legalOverview: "Legal Status",
    termsAndCommercialModel: "Pilot Terms",
    privacyAndDataProtection: "Data Protection",
    aiTransparency: "AI Transparency",
    securityAndTrust: "Security",
    imprint: "Company Notice",
    apiReference: "API Reference",
    changelog: "Changelog"
  },
  it: {
    getStarted: "Per iniziare",
    build: "Costruisci",
    runWorkflows: "Esegui workflow",
    integrations: "Integrazioni",
    deploy: "Deploy",
    monitoring: "Monitoraggio",
    troubleshoot: "Risoluzione problemi",
    legal: "Legal",
    reference: "Riferimenti",
    introduction: "Introduzione",
    quickstart: "Quickstart",
    createFirstAgent: "Crea il primo AI Voice Agent",
    configureAgentPrompt: "Configura il prompt",
    configureAgentFunctions: "Configura le functions",
    dynamicParameters: "Parametri dinamici",
    telephony: "Telefonia",
    telephonyOverview: "Panoramica",
    asteriskBasedPbxSystems: "Sistemi PBX basati su Asterisk",
    inboundAi: "Inbound Ai",
    aiInboundRouting: "AI Inbound Routing",
    aiDialerFlows: "AI Dialer Flows",
    aiDialerFlowsOverview: "Panoramica",
    dialerContacts: "Contatti campagna",
    importContacts: "Importa contatti",
    contactInbounds: "Contatti inbound",
    callRecords: "Registro chiamate",
    processedContacts: "Contatti elaborati",
    phone: "Phone",
    pilotSetupOverview: "Panoramica deploy",
    monitoringAndVisibility: "Monitoring e visibilità",
    campaignAnalytics: "Analytics campagna",
    endpointAndTrunkMonitoring: "Monitoraggio endpoint e trunk",
    preProvisionedDashboards: "Dashboard preconfigurate",
    dialerDashboardPanels: "Pannelli Dashboard Dialer",
    logsAndTraces: "Log e trace",
    logsDrilldown: "Analisi log",
    traceCorrelation: "Correlazione trace",
    infrastructureMonitoring: "Monitoraggio infrastruttura",
    asteriskMonitoring: "Monitoraggio Asterisk",
    containerMonitoring: "Monitoraggio container",
    databaseMonitoring: "Monitoraggio database",
    realTimePerformanceMetrics: "Metriche real-time",
    timeRangeReporting: "Report per intervallo",
    troubleshootingPage: "Diagnostica",
    faq: "FAQ",
    legalOverview: "Stato legal",
    termsAndCommercialModel: "Termini pilot",
    privacyAndDataProtection: "Data protection",
    aiTransparency: "Trasparenza AI",
    securityAndTrust: "Security",
    imprint: "Legal notice",
    apiReference: "Riferimento API",
    changelog: "Changelog"
  }
};

const navIcons: Record<NavLabelKey, LucideIcon> = {
  getStarted: Rocket,
  build: Wrench,
  runWorkflows: GitBranch,
  integrations: Plug,
  deploy: Server,
  monitoring: Activity,
  troubleshoot: LifeBuoy,
  legal: Scale,
  reference: BookOpen,
  introduction: Compass,
  quickstart: Zap,
  createFirstAgent: Bot,
  configureAgentPrompt: MessageSquareText,
  configureAgentFunctions: Sparkles,
  dynamicParameters: Braces,
  telephony: Phone,
  telephonyOverview: Radar,
  asteriskBasedPbxSystems: Network,
  inboundAi: PhoneIncoming,
  aiInboundRouting: PhoneIncoming,
  aiDialerFlows: PhoneOutgoing,
  aiDialerFlowsOverview: Radar,
  dialerContacts: Users,
  importContacts: Upload,
  contactInbounds: Users,
  callRecords: FileText,
  processedContacts: History,
  phone: Phone,
  pilotSetupOverview: Server,
  monitoringAndVisibility: Radar,
  campaignAnalytics: BarChart3,
  endpointAndTrunkMonitoring: Network,
  preProvisionedDashboards: LayoutDashboard,
  dialerDashboardPanels: BarChart3,
  logsAndTraces: GitBranch,
  logsDrilldown: ScrollText,
  traceCorrelation: GitBranch,
  infrastructureMonitoring: Server,
  asteriskMonitoring: Phone,
  containerMonitoring: LayoutDashboard,
  databaseMonitoring: Database,
  realTimePerformanceMetrics: Activity,
  timeRangeReporting: Clock,
  troubleshootingPage: Bug,
  faq: LifeBuoy,
  legalOverview: Scale,
  termsAndCommercialModel: ListChecks,
  privacyAndDataProtection: Lock,
  aiTransparency: Sparkles,
  securityAndTrust: ShieldCheck,
  imprint: FileText,
  apiReference: Braces,
  changelog: Clock
};

export function LocalizedNavLabel({ labelKey }: { labelKey: NavLabelKey }) {
  const locale = useCurrentLocale(defaultLocale);
  const Icon = navIcons[labelKey];

  return (
    <span className="docs-nav-label">
      <Icon aria-hidden="true" className="docs-nav-label-icon" focusable="false" size={16} strokeWidth={2} />
      <span className="docs-nav-label-text">{navLabels[locale][labelKey]}</span>
    </span>
  );
}
