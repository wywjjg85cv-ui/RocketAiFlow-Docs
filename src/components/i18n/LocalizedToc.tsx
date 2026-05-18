"use client";

import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type IntroductionTocLabelKey =
  | "what"
  | "operatingPath"
  | "coreConcepts"
  | "agentsAndPrompts"
  | "functionsAndApiActions"
  | "inboundOutboundWorkflows"
  | "telephonyPilotSetup"
  | "observabilityReview"
  | "implementationPaths"
  | "validateEarly"
  | "quickLinks"
  | "commonQuestions";

type QuickstartTocLabelKey =
  | "beforeYouStart"
  | "chooseOnePath"
  | "sharedFoundation"
  | "confirmTrunkPath"
  | "createFirstAgent"
  | "configurePrompt"
  | "addInitialFunctions"
  | "testAgentInPhone"
  | "inboundQuickstartFlow"
  | "createAiInboundRouting"
  | "runInboundTestCall"
  | "reviewInboundResult"
  | "outboundQuickstartFlow"
  | "importContacts"
  | "createOutboundCampaign"
  | "runOutboundTestCall"
  | "reviewOutboundRecords"
  | "monitorOutboundDashboard"
  | "whatToCheck"
  | "troubleshootingInbound"
  | "troubleshootingOutbound"
  | "nextSteps";

const tocCopy = {
  en: {
    title: "On This Page",
    backToTop: "Back to top",
    introduction: {
      what: "What RocketAiFlow is",
      operatingPath: "Recommended documentation path",
      coreConcepts: "Core concepts",
      agentsAndPrompts: "Agents and prompts",
      functionsAndApiActions: "Functions and API actions",
      inboundOutboundWorkflows: "Inbound and outbound workflows",
      telephonyPilotSetup: "Telephony and pilot setup",
      observabilityReview: "Monitoring and review",
      implementationPaths: "Practical implementation paths",
      validateEarly: "What to validate early",
      quickLinks: "Quick links",
      commonQuestions: "Common questions"
    },
    quickstart: {
      beforeYouStart: "Before you start",
      chooseOnePath: "Choose one path",
      sharedFoundation: "Common setup",
      confirmTrunkPath: "1. Configure and verify the trunk",
      createFirstAgent: "2. Create the first agent",
      configurePrompt: "3. Configure the prompt",
      addInitialFunctions: "4. Add the initial functions",
      testAgentInPhone: "Test the agent with Phone",
      inboundQuickstartFlow: "Inbound quickstart flow",
      createAiInboundRouting: "5A. Create AI Inbound Routing",
      runInboundTestCall: "6A. Run an inbound test call",
      reviewInboundResult: "7A. Review the inbound result",
      outboundQuickstartFlow: "Outbound quickstart flow",
      createOutboundCampaign: "5B. Create a first outbound campaign",
      importContacts: "6B. Import contacts",
      runOutboundTestCall: "7B. Run an outbound test call",
      reviewOutboundRecords: "8B. Review outbound records and monitoring",
      monitorOutboundDashboard: "9B. Monitor dashboard and performance",
      whatToCheck: "What to check if something goes wrong",
      troubleshootingInbound: "Inbound",
      troubleshootingOutbound: "Outbound",
      nextSteps: "Next steps"
    }
  },
  it: {
    title: "In questa pagina",
    backToTop: "Torna su",
    introduction: {
      what: "Che cos'è RocketAiFlow",
      operatingPath: "Percorso consigliato nella documentazione",
      coreConcepts: "Concetti principali",
      agentsAndPrompts: "Agenti e prompt",
      functionsAndApiActions: "Funzioni e azioni API",
      inboundOutboundWorkflows: "Workflow inbound e outbound",
      telephonyPilotSetup: "Telefonia e setup pilot",
      observabilityReview: "Monitoraggio e revisione",
      implementationPaths: "Percorsi pratici di implementazione",
      validateEarly: "Cosa validare subito",
      quickLinks: "Link rapidi",
      commonQuestions: "Domande frequenti"
    },
    quickstart: {
      beforeYouStart: "Prima di iniziare",
      chooseOnePath: "Scegli un percorso",
      sharedFoundation: "Configurazione comune",
      confirmTrunkPath: "1. Configura e verifica il trunk",
      createFirstAgent: "2. Crea il primo agente",
      configurePrompt: "3. Configura il prompt",
      addInitialFunctions: "4. Aggiungi le funzioni iniziali",
      testAgentInPhone: "Prova l'agente con Phone",
      inboundQuickstartFlow: "Flusso quickstart inbound",
      createAiInboundRouting: "5A. Crea AI Inbound Routing",
      runInboundTestCall: "6A. Esegui una chiamata inbound di test",
      reviewInboundResult: "7A. Rivedi il risultato inbound",
      outboundQuickstartFlow: "Flusso quickstart outbound",
      createOutboundCampaign: "5B. Crea una prima campagna outbound",
      importContacts: "6B. Importa i contatti",
      runOutboundTestCall: "7B. Esegui una chiamata outbound di test",
      reviewOutboundRecords: "8B. Rivedi record outbound e monitoraggio",
      monitorOutboundDashboard: "9B. Monitora dashboard e performance",
      whatToCheck: "Cosa controllare se qualcosa non funziona",
      troubleshootingInbound: "Inbound",
      troubleshootingOutbound: "Outbound",
      nextSteps: "Passaggi successivi"
    }
  }
} as const satisfies Record<
  Locale,
  {
    title: string;
    backToTop: string;
    introduction: Record<IntroductionTocLabelKey, string>;
    quickstart: Record<QuickstartTocLabelKey, string>;
  }
>;

function useTocCopy() {
  const locale = useCurrentLocale(defaultLocale);

  return tocCopy[locale];
}

export function LocalizedTocTitle() {
  return <>{useTocCopy().title}</>;
}

export function LocalizedBackToTop() {
  return <>{useTocCopy().backToTop}</>;
}

export function LocalizedIntroductionTocLabel({ labelKey }: { labelKey: IntroductionTocLabelKey }) {
  return <>{useTocCopy().introduction[labelKey]}</>;
}

export function LocalizedQuickstartTocLabel({ labelKey }: { labelKey: QuickstartTocLabelKey }) {
  return <>{useTocCopy().quickstart[labelKey]}</>;
}
