"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type FaqItem = {
  question: string;
  answer: ReactNode;
};

type FaqCopy = {
  title: string;
  intro: string[];
  faqs: FaqItem[];
};

function FaqLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return <Link href={localizeHref(href, locale)}>{children}</Link>;
}

const faqCopy: Record<Locale, FaqCopy> = {
  en: {
    title: "FAQ",
    intro: [
      "Use these answers as a quick decision guide while you configure, run, observe, and troubleshoot RocketAiFlow.",
      "For deeper steps, open the linked pages from each answer."
    ],
    faqs: [
      {
        question: "Where should I start if this is my first setup?",
        answer: (
          <>
            Start with <FaqLink href="/get-started/quickstart">Quickstart</FaqLink>, then create one focused agent, connect one route or campaign, run one controlled call, and review the result before adding more complexity.
          </>
        )
      },
      {
        question: "Is RocketAiFlow only for outbound campaigns?",
        answer:
          "No. RocketAiFlow is outbound-first and inbound-ready. Outbound campaigns are a primary operating model, but the same agent, prompt, function, telephony, and observability model also supports controlled inbound workflows."
      },
      {
        question: "What is the safest first pilot scope?",
        answer:
          "Use one agent, one prompt, one route or one small outbound campaign, conservative call limits, and a small contact list. A narrow pilot makes call behavior, telephony issues, prompt changes, and outcome review easier to understand."
      },
      {
        question: "What should my first agent prompt include?",
        answer: (
          <>
            Define the agent role, business goal, tone, information to collect, boundaries, transfer rules, and clean completion rules. Use <FaqLink href="/build/configure-agent-prompt">Configure Agent Prompt</FaqLink> when you need the full prompt structure.
          </>
        )
      },
      {
        question: "Which functions should I add first?",
        answer: (
          <>
            Start with the actions the workflow truly needs, such as transfer, hangup, or one business API action. Add custom functions after the call path is stable, and use <FaqLink href="/build/dynamic-parameters">Dynamic Parameters</FaqLink> when function inputs must come from contacts, runtime context, or workflow variables.
          </>
        )
      },
      {
        question: "Do I need inbound routing before testing an agent?",
        answer: (
          <>
            Not always. You can test the agent from the <FaqLink href="/run-workflows/phone">Phone</FaqLink> area first, then connect the validated agent to <FaqLink href="/run-workflows/ai-inbound-routing">AI Inbound Routing</FaqLink>.
          </>
        )
      },
      {
        question: "When should I import contacts?",
        answer: (
          <>
            Import contacts when you are preparing an outbound campaign. Keep the first CSV small, validate field mapping, and only scale the list after the first calls behave correctly. See <FaqLink href="/run-workflows/import-contacts">Import Contacts</FaqLink>.
          </>
        )
      },
      {
        question: "What should I review after the first call?",
        answer: (
          <>
            Open <FaqLink href="/run-workflows/call-records">Call Records</FaqLink> and check status, outcome, timing, transcript, recording state when enabled, and any useful review notes. This confirms whether the workflow behaved as expected.
          </>
        )
      },
      {
        question: "What should I monitor during an outbound run?",
        answer: (
          <>
            Start from <FaqLink href="/observe/pre-provisioned-dashboards">Pre-Provisioned Dashboards</FaqLink>. The Dialer dashboard shows campaign state, active calls, call limits, dialing rate, total outcomes, selected-range performance, talk time, and ring time.
          </>
        )
      },
      {
        question: "Why does Real-Time Agents & Trunks matter?",
        answer:
          "It separates campaign behavior from telephony readiness. If the campaign looks active but calls do not move correctly, endpoint and trunk state can show whether the issue is registration, reachability, provider behavior, or endpoint configuration."
      },
      {
        question: "Where do I learn what each Dialer panel means?",
        answer: (
          <>
            Use <FaqLink href="/observe/dialer-dashboard-panels">Dialer Dashboard Panels</FaqLink>. It explains Total Outcomes, Call Outcomes, Dialing Rate, Calls Volume, Active Calls vs Limit, endpoint state, talk time, ring time, and selected time-range panels.
          </>
        )
      },
      {
        question: "When should I use logs and traces?",
        answer: (
          <>
            Use <FaqLink href="/observe/logs-and-traces">Logs and Traces</FaqLink> when a dashboard shows a symptom but you need event-level evidence, service timing, API action behavior, trace correlation, or the exact path of a workflow issue.
          </>
        )
      },
      {
        question: "What is the safest way to troubleshoot?",
        answer: (
          <>
            Change one thing at a time, run one controlled test, and review one call record plus the matching dashboard, log, or trace evidence. For the full path, use <FaqLink href="/troubleshoot/investigating-workflow-issues">Investigating Workflow Issues</FaqLink>.
          </>
        )
      },
      {
        question: "Why is trunk configuration important so early?",
        answer:
          "Because routing and campaign symptoms can be telephony symptoms. If the trunk, provider credentials, routing, codec, or registration is wrong, inbound calls may not arrive and outbound calls may not start even when the agent and prompt are correct."
      },
      {
        question: "Does RocketAiFlow support every SIP provider automatically?",
        answer: (
          <>
            No. RocketAiFlow is designed for SIP and PBX environments, including Asterisk-based integration, but provider compatibility depends on deployment and configuration. Validate the provider path during setup. See <FaqLink href="/integrations/telephony">Telephony Integrations</FaqLink>.
          </>
        )
      },
      {
        question: "Is RocketAiFlow cloud-only?",
        answer: (
          <>
            No. The documentation is written for practical on-premise or customer-environment deployment models as well as guided pilot setups. Use <FaqLink href="/deploy/deployment-overview">Deployment Overview</FaqLink> to align the install path, telephony, APIs, monitoring, and operational ownership.
          </>
        )
      },
      {
        question: "Where are the legal, privacy, and security notes?",
        answer: (
          <>
            Start from <FaqLink href="/legal">Legal</FaqLink>. The current legal pages describe the pre-incorporation project status, AI transparency, data protection expectations, shared responsibility, and security posture without claiming unavailable certifications.
          </>
        )
      }
    ]
  },
  it: {
    title: "FAQ",
    intro: [
      "Usa queste risposte come guida rapida mentre configuri, esegui, osservi e risolvi problemi in RocketAiFlow.",
      "Per i passaggi dettagliati, apri le pagine collegate dentro ogni risposta."
    ],
    faqs: [
      {
        question: "Da dove devo partire se è il primo setup?",
        answer: (
          <>
            Parti da <FaqLink href="/get-started/quickstart">Quickstart</FaqLink>, poi crea un agente focalizzato, collega una route o una campagna, esegui una chiamata controllata e rivedi il risultato prima di aggiungere complessità.
          </>
        )
      },
      {
        question: "RocketAiFlow serve solo per campagne outbound?",
        answer:
          "No. RocketAiFlow è outbound-first e inbound-ready. Le campagne outbound sono un modello operativo principale, ma lo stesso modello di agente, prompt, funzioni, telefonia e osservabilità supporta anche workflow inbound controllati."
      },
      {
        question: "Qual è lo scope più sicuro per il primo pilot?",
        answer:
          "Usa un agente, un prompt, una route o una piccola campagna outbound, limiti chiamata conservativi e una lista contatti ridotta. Un pilot stretto rende più semplice capire comportamento chiamate, problemi telefonici, modifiche prompt e outcome."
      },
      {
        question: "Cosa deve contenere il primo prompt dell'agente?",
        answer: (
          <>
            Definisci ruolo dell'agente, obiettivo business, tono, informazioni da raccogliere, limiti, regole di transfer e chiusura pulita. Usa <FaqLink href="/build/configure-agent-prompt">Configura il prompt</FaqLink> quando ti serve la struttura completa.
          </>
        )
      },
      {
        question: "Quali funzioni devo aggiungere per prime?",
        answer: (
          <>
            Parti solo dalle azioni che il workflow richiede davvero, come transfer, hangup o una singola azione API business. Aggiungi funzioni custom dopo aver stabilizzato il percorso chiamata e usa <FaqLink href="/build/dynamic-parameters">Parametri dinamici</FaqLink> quando gli input devono arrivare da contatti, runtime o variabili workflow.
          </>
        )
      },
      {
        question: "Serve configurare routing inbound prima di testare un agente?",
        answer: (
          <>
            Non sempre. Puoi testare prima l'agente dall'area <FaqLink href="/run-workflows/phone">Phone</FaqLink>, poi collegare l'agente validato a <FaqLink href="/run-workflows/ai-inbound-routing">AI Inbound Routing</FaqLink>.
          </>
        )
      },
      {
        question: "Quando devo importare i contatti?",
        answer: (
          <>
            Importa i contatti quando prepari una campagna outbound. Mantieni il primo CSV piccolo, valida il mapping dei campi e scala la lista solo dopo che le prime chiamate si comportano correttamente. Vedi <FaqLink href="/run-workflows/import-contacts">Importa contatti</FaqLink>.
          </>
        )
      },
      {
        question: "Cosa devo controllare dopo la prima chiamata?",
        answer: (
          <>
            Apri <FaqLink href="/run-workflows/call-records">Call Records</FaqLink> e controlla status, outcome, timing, transcript, stato registrazione quando abilitata e note utili di review. Questo conferma se il workflow si è comportato come previsto.
          </>
        )
      },
      {
        question: "Cosa devo monitorare durante un run outbound?",
        answer: (
          <>
            Parti da <FaqLink href="/observe/pre-provisioned-dashboards">Dashboard preconfigurate</FaqLink>. La dashboard Dialer mostra stato campagna, chiamate attive, limiti, dialing rate, outcome, performance sull'intervallo selezionato, talk time e ring time.
          </>
        )
      },
      {
        question: "Perché Real-Time Agents & Trunks è importante?",
        answer:
          "Perché separa il comportamento della campagna dalla readiness telefonica. Se la campagna sembra attiva ma le chiamate non avanzano correttamente, stato endpoint e trunk aiutano a capire se il problema è registrazione, raggiungibilità, provider o configurazione endpoint."
      },
      {
        question: "Dove capisco cosa significa ogni pannello Dialer?",
        answer: (
          <>
            Usa <FaqLink href="/observe/dialer-dashboard-panels">Pannelli Dashboard Dialer</FaqLink>. Spiega Total Outcomes, Call Outcomes, Dialing Rate, Calls Volume, Active Calls vs Limit, stato endpoint, talk time, ring time e pannelli sull'intervallo selezionato.
          </>
        )
      },
      {
        question: "Quando devo usare log e trace?",
        answer: (
          <>
            Usa <FaqLink href="/observe/logs-and-traces">Log e trace</FaqLink> quando una dashboard mostra un sintomo ma serve evidenza a livello evento, timing dei servizi, comportamento di azioni API, correlazione trace o percorso esatto del problema.
          </>
        )
      },
      {
        question: "Qual è il modo più sicuro per fare troubleshooting?",
        answer: (
          <>
            Cambia una cosa alla volta, esegui un test controllato e rivedi un call record insieme all'evidenza di dashboard, log o trace. Per il percorso completo usa <FaqLink href="/troubleshoot/investigating-workflow-issues">Analisi problemi workflow</FaqLink>.
          </>
        )
      },
      {
        question: "Perché la configurazione trunk è così importante all'inizio?",
        answer:
          "Perché sintomi di routing o campagna possono essere sintomi telefonici. Se trunk, credenziali provider, routing, codec o registrazione sono sbagliati, le chiamate inbound possono non arrivare e le outbound possono non partire anche se agente e prompt sono corretti."
      },
      {
        question: "RocketAiFlow supporta automaticamente ogni provider SIP?",
        answer: (
          <>
            No. RocketAiFlow è pensato per ambienti SIP e PBX, inclusa integrazione basata su Asterisk, ma la compatibilità provider dipende da deploy e configurazione. Valida il percorso provider durante il setup. Vedi <FaqLink href="/integrations/telephony">Integrazioni telefonia</FaqLink>.
          </>
        )
      },
      {
        question: "RocketAiFlow è solo cloud?",
        answer: (
          <>
            No. La documentazione è scritta anche per modelli on-premise o customer-environment, oltre ai pilot guidati. Usa <FaqLink href="/deploy/deployment-overview">Panoramica deploy</FaqLink> per allineare installazione, telefonia, API, monitoring e ownership operativa.
          </>
        )
      },
      {
        question: "Dove sono le note legal, privacy e security?",
        answer: (
          <>
            Parti da <FaqLink href="/legal">Legal</FaqLink>. Le pagine attuali descrivono lo stato pre-costituzione del progetto, trasparenza AI, protezione dati, shared responsibility e postura security senza dichiarare certificazioni non disponibili.
          </>
        )
      }
    ]
  }
};

function useFaqCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return faqCopy[locale];
}

export function LocalizedFaqTitle() {
  return <>{useFaqCopy().title}</>;
}

export function LocalizedFaqIntro() {
  const copy = useFaqCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedFaqList() {
  const copy = useFaqCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-accordion">
        {copy.faqs.map((faq) => (
          <details key={faq.question} className="docs-accordion-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
