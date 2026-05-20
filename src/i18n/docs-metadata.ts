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
      "Scrivi prompt operativi per agenti voce RocketAiFlow, includendo obiettivo chiamata, stile conversazionale, regole functions e variabili di contesto."
  },
  "/build/add-functions": {
    title: "Configura le functions",
    description:
      "Configura le functions che l'agente RocketAiFlow usa per call control, raccolta dati strutturati, azioni via API e automazione dei software aziendali."
  },
  "/build/dynamic-parameters": {
    title: "Parametri dinamici",
    description:
      "Usa variabili template, dati contatto e valori runtime nei prompt e nelle functions RocketAiFlow."
  },
  "/run-workflows/inbound-ai/ai-inbound-routing": {
    title: "AI Inbound Routing",
    description:
      "Collega le chiamate inbound all'agente voce AI corretto e valida la prima route."
  },
  "/run-workflows/ai-dialer-flows": {
    title: "AI Dialer Flows",
    description:
      "Crea una prima campagna outbound in RocketAiFlow e preparala per un test controllato."
  },
  "/run-workflows/ai-dialer-flows/contacts": {
    title: "Contatti campagna",
    description:
      "Gestisci i contatti usati dal dialer per chiamate automatiche e variabili template dell'agente."
  },
  "/run-workflows/import-contacts": {
    title: "Importa contatti",
    description:
      "Carica e mappa i contatti per campagne outbound o recupero contatto inbound sull'agente."
  },
  "/run-workflows/inbound-ai/contact-inbounds": {
    title: "Contatti inbound",
    description:
      "Rivedi come i chiamanti inbound vengono associati ai contatti e ai workflow di follow-up."
  },
  "/run-workflows/call-records": {
    title: "Registro chiamate",
    description:
      "Rivedi panoramica chiamata, registrazioni, dati contatto, outcome di qualificazione lead, transcript e timing in RocketAiFlow."
  },
  "/run-workflows/processed-contacts": {
    title: "Contatti elaborati",
    description:
      "Rivedi i contatti già gestiti da RocketAiFlow nei workflow inbound e outbound."
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
  "/monitoring/monitoring-and-visibility": {
    title: "Monitoring e visibilità",
    description:
      "Comprendi il livello Monitoring di RocketAiFlow tra dashboard Dialer, pannelli operativi, salute piattaforma, log e trace."
  },
  "/monitoring/pre-provisioned-dashboards": {
    title: "Dashboard preconfigurate",
    description:
      "Comprendi le dashboard Grafana incluse in RocketAiFlow per monitoraggio dialer outbound, infrastruttura, database, container e telefonia Asterisk."
  },
  "/monitoring/dialer-dashboard-panels": {
    title: "Pannelli Dashboard Dialer",
    description:
      "Approfondisci i pannelli della Dashboard Dialer e capisci cosa rappresenta ogni metrica."
  },
  "/monitoring/logs-and-traces": {
    title: "Log e trace",
    description:
      "Monitora eventi RocketAiFlow e percorsi richiesta con log, trace e viste Grafana Drilldown basati su OpenTelemetry."
  },
  "/monitoring/campaign-analytics": {
    title: "Analytics campagne",
    description:
      "Comprendi outcome, pacing, stato e pattern di utilizzo delle campagne in RocketAiFlow."
  },
  "/monitoring/endpoint-and-trunk-monitoring": {
    title: "Monitoring endpoint e trunk",
    description:
      "Rivedi i segnali di stato lato telefonia che possono influenzare i workflow RocketAiFlow."
  },
  "/monitoring/real-time-performance-metrics": {
    title: "Metriche performance real-time",
    description:
      "Comprendi le categorie di metriche live usate dai team RocketAiFlow per rivedere le performance dei workflow voce."
  },
  "/monitoring/time-range-reporting": {
    title: "Reporting per intervallo temporale",
    description:
      "Confronta le performance RocketAiFlow su finestre temporali selezionate invece che su snapshot isolati."
  },
  "/monitoring/logs-drilldown": {
    title: "Logs Drilldown",
    description:
      "Passa dai sintomi live a evidenze operative con un percorso pratico di investigazione log per RocketAiFlow."
  },
  "/monitoring/trace-correlation": {
    title: "Correlazione trace",
    description:
      "Usa la correlazione dei trace per collegare sintomi workflow, percorsi API e servizi di supporto nelle indagini RocketAiFlow."
  },
  "/monitoring/container-monitoring": {
    title: "Monitoring container",
    description:
      "Usa cAdvisor per rivedere runtime container e visibilità risorse nei deploy RocketAiFlow."
  },
  "/monitoring/database-monitoring": {
    title: "Monitoring database",
    description:
      "Usa la dashboard MySQL 8 per rivedere salute database e controlli operativi in RocketAiFlow."
  },
  "/monitoring/infrastructure-monitoring": {
    title: "Monitoring infrastruttura",
    description:
      "Usa Node Exporter Full per rivedere salute host e sistema nei deploy RocketAiFlow."
  },
  "/monitoring/asterisk-monitoring": {
    title: "Monitoring Asterisk",
    description:
      "Usa le dashboard Asterisk Overview e Asterisk Log per monitorare il comportamento telefonico in RocketAiFlow."
  },
  "/troubleshoot/troubleshooting": {
    title: "Risoluzione problemi",
    description:
      "Diagnostica problemi comuni su agenti, prompt, routing, campagne, contatti, trunk e revisione chiamate."
  },
  "/troubleshoot/faq": {
    title: "FAQ",
    description:
      "Risposte pratiche alle domande comuni su setup, workflow, monitoraggio, telefonia, troubleshooting e readiness legale in RocketAiFlow."
  },
  "/legal": {
    title: "Stato legale",
    description:
      "Rivedi la readiness legale RocketAiFlow per valutazione iniziale, termini pilot, protezione dati, trasparenza AI e responsabilità condivisa."
  },
  "/legal/terms-and-commercial-model": {
    title: "Termini pilot",
    description:
      "Rivedi termini pilot, ambito di valutazione, responsabilità on-premise, confini del supporto e readiness commerciale di RocketAiFlow."
  },
  "/legal/privacy-and-data-protection": {
    title: "Protezione dati",
    description:
      "Comprendi protezione dati on-premise, dati controllati dal cliente, accesso supporto, cookie, analytics, telemetry e confini di trattamento in RocketAiFlow."
  },
  "/legal/cookie-policy": {
    title: "Cookie Policy",
    description:
      "Scopri come RocketAiFlow Docs usa archiviazione necessaria e cookie Google Analytics opzionali solo dopo consenso."
  },
  "/legal/ai-transparency": {
    title: "Trasparenza AI",
    description:
      "Rivedi le linee guida RocketAiFlow per disclosure AI, trasparenza verso i chiamanti e responsabilità del cliente nei workflow voce."
  },
  "/legal/security-and-trust": {
    title: "Sicurezza",
    description:
      "Rivedi la responsabilità condivisa di sicurezza RocketAiFlow per deploy on-premise, software, infrastruttura, secret, log e supporto."
  },
  "/legal/imprint": {
    title: "Note legali",
    description:
      "Rivedi le note legali RocketAiFlow, lo stato pre-company e le informazioni societarie ancora in attesa di finalizzazione."
  },
  "/reference/api-reference": {
    title: "Riferimento API",
    description:
      "Apri il riferimento API RocketAiFlow per rivedere endpoint, schemi e percorsi di integrazione per l'automazione dei workflow."
  },
  "/reference/changelog": {
    title: "Changelog",
    description:
      "Segui modifiche documentazione e note di rilascio RocketAiFlow mentre la prima versione pubblica evolve verso aggiornamenti futuri."
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
