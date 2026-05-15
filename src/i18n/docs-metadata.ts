import { normalizePathname } from "./docs-routes";
import type { Locale } from "./routing";

type DocsMetadata = {
  title: string;
  description: string;
};

const italianMetadata: Record<string, DocsMetadata> = {
  "/get-started/introduction": {
    title: "Introduzione",
    description:
      "Inizia da qui per capire RocketAiFlow, il modello operativo e il percorso più rapido verso un workflow voce reale."
  },
  "/get-started/quickstart": {
    title: "Quickstart",
    description:
      "Valida un workflow voce RocketAiFlow inbound o outbound, dalla configurazione trunk e agente alla revisione della chiamata."
  },
  "/build/create-your-first-ai-voice-agent": {
    title: "Crea il primo AI Voice Agent",
    description:
      "Configura un primo agente voce AI riutilizzabile nei workflow inbound e outbound."
  },
  "/build/configure-agent-prompt": {
    title: "Configura il prompt",
    description:
      "Scrivi prompt operativi chiari per agenti voce RocketAiFlow, includendo ruolo, obiettivo, functions, contesto e checklist di test."
  },
  "/build/add-functions": {
    title: "Configura le functions",
    description:
      "Configura le functions operative che l'agente RocketAiFlow può usare per transfer, hangup, qualificazione lead, scheduling e chiamate API."
  },
  "/build/dynamic-parameters": {
    title: "Parametri dinamici",
    description:
      "Usa variabili template, dati contatto e valori runtime nei prompt e nelle functions RocketAiFlow."
  },
  "/run-workflows/ai-inbound-routing": {
    title: "AI Inbound Routing",
    description:
      "Collega le chiamate inbound all'agente voce AI corretto e valida la prima route."
  },
  "/run-workflows/ai-dialer-flows": {
    title: "AI Dialer Flows",
    description:
      "Crea una prima campagna outbound in RocketAiFlow e preparala per un test controllato."
  },
  "/run-workflows/dialer-pacing-and-limits": {
    title: "Pacing e limiti dialer",
    description:
      "Controlla calls per second, concurrent call capacity e concorrenza outbound con un rollout pratico."
  },
  "/run-workflows/import-contacts": {
    title: "Importa contatti",
    description:
      "Carica e mappa i contatti per campagne outbound o recupero contatto inbound sull'agente."
  },
  "/run-workflows/contact-inbounds": {
    title: "Contact Inbounds",
    description:
      "Rivedi come i chiamanti inbound vengono associati ai contatti e ai workflow di follow-up."
  },
  "/run-workflows/call-records": {
    title: "Call Records",
    description:
      "Rivedi outcome, timestamp, transcript, registrazioni quando abilitate e timing delle chiamate in RocketAiFlow."
  },
  "/run-workflows/call-history-and-review": {
    title: "Storico e revisione chiamate",
    description:
      "Rivedi chiamate completate, registrazioni quando abilitate, transcript e metriche di timing per capire i workflow outbound e inbound."
  },
  "/run-workflows/phone": {
    title: "Phone",
    description:
      "Usa Phone come client WebRTC RocketAiFlow per registrazione SIP, chiamate manuali, auto-answer e test degli agenti voce AI."
  },
  "/integrations": {
    title: "Integrazioni",
    description:
      "Collega RocketAiFlow a sistemi telefonici, strumenti aziendali e provider basati su API."
  },
  "/integrations/telephony": {
    title: "Integrazioni telefonia",
    description:
      "Rivedi le integrazioni telefoniche RocketAiFlow per trunk SIP, sistemi PBX e validazione provider."
  },
  "/integrations/telephony/asterisk-based-pbx-systems": {
    title: "Sistemi PBX basati su Asterisk",
    description:
      "Collega RocketAiFlow a sistemi PBX basati su Asterisk tramite configurazione trunk PJSIP e flussi di transfer."
  },
  "/deploy/deployment-overview": {
    title: "Panoramica deploy",
    description:
      "Esegui il deploy di RocketAiFlow scegliendo setup di installazione e percorso di integrazione per telefonia, SIP/PBX e API aziendali."
  },
  "/observe/monitoring-and-visibility": {
    title: "Monitoring e visibilità",
    description:
      "Comprendi il livello Observe di RocketAiFlow tra dashboard Dialer, pannelli operativi, salute piattaforma, log e trace."
  },
  "/observe/pre-provisioned-dashboards": {
    title: "Dashboard preconfigurate",
    description:
      "Comprendi le dashboard Grafana incluse in RocketAiFlow per monitoraggio dialer outbound, infrastruttura, database, container e telefonia Asterisk."
  },
  "/observe/dialer-dashboard-panels": {
    title: "Pannelli Dashboard Dialer",
    description:
      "Approfondisci i pannelli della Dashboard Dialer e capisci cosa rappresenta ogni metrica."
  },
  "/observe/logs-and-traces": {
    title: "Log e trace",
    description:
      "Monitora eventi RocketAiFlow e percorsi richiesta con log, trace e viste Grafana Drilldown basati su OpenTelemetry."
  },
  "/observe/campaign-analytics": {
    title: "Analytics campagne",
    description:
      "Comprendi outcome, pacing, stato e pattern di utilizzo delle campagne in RocketAiFlow."
  },
  "/observe/endpoint-and-trunk-monitoring": {
    title: "Monitoring endpoint e trunk",
    description:
      "Rivedi i segnali di stato lato telefonia che possono influenzare i workflow RocketAiFlow."
  },
  "/observe/real-time-performance-metrics": {
    title: "Metriche performance real-time",
    description:
      "Comprendi le categorie di metriche live usate dai team RocketAiFlow per rivedere le performance dei workflow voce."
  },
  "/observe/time-range-reporting": {
    title: "Reporting per intervallo temporale",
    description:
      "Confronta le performance RocketAiFlow su finestre temporali selezionate invece che su snapshot isolati."
  },
  "/observe/logs-drilldown": {
    title: "Logs Drilldown",
    description:
      "Passa dai sintomi live a evidenze operative con un percorso pratico di investigazione log per RocketAiFlow."
  },
  "/observe/trace-correlation": {
    title: "Correlazione trace",
    description:
      "Usa la correlazione dei trace per collegare sintomi workflow, percorsi API e servizi di supporto nelle indagini RocketAiFlow."
  },
  "/observe/container-monitoring": {
    title: "Monitoring container",
    description:
      "Usa cAdvisor per rivedere runtime container e visibilità risorse nei deploy RocketAiFlow."
  },
  "/observe/database-monitoring": {
    title: "Monitoring database",
    description:
      "Usa la dashboard MySQL 8 per rivedere salute database e controlli operativi in RocketAiFlow."
  },
  "/observe/infrastructure-monitoring": {
    title: "Monitoring infrastruttura",
    description:
      "Usa Node Exporter Full per rivedere salute host e sistema nei deploy RocketAiFlow."
  },
  "/observe/asterisk-monitoring": {
    title: "Monitoring Asterisk",
    description:
      "Usa le dashboard Asterisk Overview e Asterisk Log per monitorare il comportamento telefonico in RocketAiFlow."
  },
  "/troubleshoot/investigating-workflow-issues": {
    title: "Analisi problemi workflow",
    description:
      "Segui un flusso pratico di investigazione che collega call records, dashboard, log e trace in RocketAiFlow."
  },
  "/troubleshoot/troubleshooting": {
    title: "Troubleshooting",
    description:
      "Diagnostica problemi comuni su agenti, prompt, routing, campagne, contatti, trunk e revisione chiamate."
  },
  "/troubleshoot/faq": {
    title: "FAQ",
    description:
      "Risposte pratiche alle domande comuni su setup, workflow, osservabilità, telefonia, troubleshooting e readiness legale in RocketAiFlow."
  },
  "/legal": {
    title: "Stato legale",
    description: "Stato legale corrente di RocketAiFlow."
  },
  "/legal/terms-and-commercial-model": {
    title: "Termini pilot",
    description: "Stato corrente dei termini pilot di RocketAiFlow."
  },
  "/legal/privacy-and-data-protection": {
    title: "Protezione dati",
    description: "Stato corrente della protezione dati per RocketAiFlow."
  },
  "/legal/ai-transparency": {
    title: "Trasparenza AI",
    description: "Stato corrente della trasparenza AI per RocketAiFlow."
  },
  "/legal/security-and-trust": {
    title: "Sicurezza",
    description: "Stato corrente delle responsabilità di sicurezza per RocketAiFlow."
  },
  "/legal/imprint": {
    title: "Note legali",
    description: "Note legali correnti per RocketAiFlow."
  },
  "/reference/api-reference": {
    title: "Riferimento API",
    description:
      "Pagina di riferimento per le future API, webhook e documentazione payload tecnica di RocketAiFlow."
  },
  "/reference/changelog": {
    title: "Changelog",
    description: "Documentazione e note di rilascio RocketAiFlow."
  }
};

const localizedMetadata: Partial<Record<Locale, Record<string, DocsMetadata>>> = {
  it: italianMetadata
};

export function getLocalizedDocsMetadata(
  canonicalPath: string,
  locale: Locale,
  fallback: DocsMetadata
) {
  return localizedMetadata[locale]?.[normalizePathname(canonicalPath)] ?? fallback;
}
