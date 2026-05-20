"use client";

import Link from "next/link";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type IntroCard = {
  title: string;
  href: string;
  description: string;
};

type IntroSection = {
  title: string;
  paragraphs: string[];
};

type IntroFaq = {
  question: string;
  answer: string;
};

type IntroductionCopy = {
  title: string;
  lead: string;
  websiteIntro: string;
  websiteHref: string;
  websiteLink: string;
  websiteAfter: string;
  whatTitle: string;
  whatBody: string;
  usesTitle: string;
  uses: string[];
  platformFitIntro: string;
  platformFitItems: string[];
  platformFitNote: string;
  operatingPathTitle: string;
  operatingPathIntro: string;
  operatingPath: IntroCard[];
  conceptsTitle: string;
  concepts: IntroSection[];
  deploymentModels: string[];
  screenshotCaption: string;
  implementationTitle: string;
  implementationIntro: string;
  implementationCards: IntroCard[];
  validateTitle: string;
  validateIntro: string;
  validateItems: string[];
  warning: string;
  quickLinksTitle: string;
  quickLinks: IntroCard[];
  faqTitle: string;
  faqs: IntroFaq[];
};

const introductionCopy: Record<Locale, IntroductionCopy> = {
  en: {
    title: "Introduction",
    lead:
      "Meet your AI-powered voice workflow platform. RocketAiFlow helps teams automate inbound and outbound phone conversations with voice agents, campaign control, API actions, call records, and live monitoring.",
    websiteIntro: "If you arrived from the",
    websiteHref: "https://rocketaiflow.com/en",
    websiteLink: "RocketAiFlow website",
    websiteAfter:
      "use this page as the starting point. The website explains the product value; these docs show how to configure, test, monitor, and improve real voice workflows.",
    whatTitle: "What RocketAiFlow is",
    whatBody:
      "RocketAiFlow is a real-time Voice AI platform for business operations. It is outbound-first, inbound-ready, and built for real SIP and PBX workflows.",
    usesTitle: "Teams use RocketAiFlow to:",
    uses: [
      "create focused Voice AI agents",
      "route inbound calls to the right agent",
      "run outbound campaigns with controlled concurrency",
      "connect calls to business systems through functions and APIs",
      "review outcomes, transcripts, recordings when enabled, timing, and live metrics"
    ],
    platformFitIntro:
      "RocketAiFlow is designed for teams that want Voice AI workflows to run inside a customer-managed environment instead of relying only on a fully managed external phone-agent stack. It is most useful when control, integration, and operational visibility matter.",
    platformFitItems: [
      "the deployment should run on premise or in infrastructure controlled by the customer",
      "calls must connect to existing SIP trunks, PBX systems, or Asterisk-based telephony",
      "the same platform should support inbound routing and outbound campaign execution",
      "the team needs to choose or manage STT, TTS, LLM, telephony, and provider accounts",
      "agents need custom functions that call CRM, calendar, helpdesk, database, or internal APIs",
      "operators need dashboards, call records, logs, traces, and timing metrics to investigate live workflows"
    ],
    platformFitNote:
      "RocketAiFlow is best suited when the voice workflow must fit the customer's real telephony environment, data model, provider setup, API actions, and monitoring requirements.",
    operatingPathTitle: "Recommended documentation path",
    operatingPathIntro: "Use this order to move from the first test to a monitored workflow:",
    operatingPath: [
      {
        title: "1. Start",
        href: "/get-started/quickstart",
        description:
          "Validate one controlled inbound or outbound workflow."
      },
      {
        title: "2. Configure in depth",
        href: "/build/create-your-first-ai-voice-agent",
        description:
          "Review agent voice, prompts, functions, templates, and settings."
      },
      {
        title: "3. Connect",
        href: "/deploy/deployment-overview",
        description:
          "Choose the deploy path and connect trunk, routing, or campaign setup."
      },
      {
        title: "4A. Run inbound",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description:
          "Route inbound calls to the right agent."
      },
      {
        title: "4B. Run outbound",
        href: "/run-workflows/ai-dialer-flows",
        description:
          "Launch a controlled outbound campaign."
      },
      {
        title: "5. Monitoring",
        href: "/monitoring/monitoring-and-visibility",
        description:
          "Monitor live calls, trunk status, outcomes, and execution pace."
      },
      {
        title: "6. Improve",
        href: "/run-workflows/processed-contacts",
        description:
          "Use contacts, call records, transcripts, recordings, and timing metrics."
      }
    ],
    conceptsTitle: "Core concepts",
    concepts: [
      {
        title: "Agents and prompts",
        paragraphs: [
          "An agent defines the job the voice workflow performs. The prompt defines how the agent speaks, which information it should collect, what it should avoid, and when it should transfer, stop, or trigger a function.",
          "Start with one narrow use case such as lead qualification, appointment booking, routing, follow-up, or a repetitive inbound request. A narrow first agent is easier to test and safer to improve."
        ]
      },
      {
        title: "Functions and API actions",
        paragraphs: [
          "Functions let the agent do more than speak. A function can transfer a call, end a call, look up external information, update a CRM, create a booking, or notify another system.",
          "RocketAiFlow supports dynamic inputs such as contact fields, workflow variables, runtime values, and contextual parameters. This is what lets one workflow adapt to different contacts, campaigns, routes, or business cases."
        ]
      },
      {
        title: "Inbound and outbound workflows",
        paragraphs: [
          "Inbound workflows usually start from a route, entry point, queue, or trunk path. They focus on answering, qualifying, routing, collecting data, or escalating to a human team.",
          "Outbound workflows usually start from a campaign and contact list. They focus on campaign execution, scheduling, callbacks, pacing, active-call limits, outcomes, and post-call review.",
          "Both workflow types reuse the same agent, prompt, function, telephony, and monitoring model."
        ]
      },
      {
        title: "Telephony and deploy path",
        paragraphs: [
          "RocketAiFlow is built for real SIP and PBX environments. The platform uses an Asterisk-based telephony layer to support practical trunk-based connectivity and provider flexibility.",
          "Provider choice depends on the deploy path and configuration. Do not assume universal compatibility or zero-configuration interoperability; validate the trunk, codecs, registration, routing, and provider behavior during setup."
        ]
      },
      {
        title: "Monitoring and review",
        paragraphs: [
          "Live voice operations need evidence. RocketAiFlow documentation treats monitoring as part of the core workflow, not an optional extra.",
          "Use dashboards, call records, endpoint and trunk monitoring, logs, traces, transcripts, recordings when enabled, talk time, and ring time to understand what happened and what to improve."
        ]
      }
    ],
    deploymentModels: [
      "Clean dedicated Linux server with the RocketAiFlow setup script for the first installation.",
      "Customer PBX, SIP trunk, API, and monitoring integration when the workflow must fit an existing environment."
    ],
    screenshotCaption:
      "Use live operational views to validate campaign state, active calls, limits, and execution readiness before scaling.",
    implementationTitle: "Practical implementation paths",
    implementationIntro: "Choose the path that matches what you need to validate first.",
    implementationCards: [
      {
        title: "Create your first agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configure one focused AI voice agent for a real business workflow."
      },
      {
        title: "Configure prompt and functions",
        href: "/build/configure-agent-prompt",
        description: "Define behavior, collection rules, transfer logic, and the action set."
      },
      {
        title: "Connect inbound routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Route a live inbound entry point to the right agent and validate call delivery."
      },
      {
        title: "Launch an outbound campaign",
        href: "/run-workflows/ai-dialer-flows",
        description: "Import contacts, configure campaign rules, set pacing, and run a controlled test."
      },
      {
        title: "Review processed contacts",
        href: "/run-workflows/processed-contacts",
        description: "Find contacts handled by inbound and outbound workflows, then open the call record for outcome, transcript, recording and timing detail."
      },
      {
        title: "Investigate workflow issues",
        href: "/troubleshoot/troubleshooting",
        description: "Move from symptom to evidence using call history, dashboards, logs, traces, and telephony checks."
      }
    ],
    validateTitle: "What to validate early",
    validateIntro: "Before scaling a workflow, confirm these items:",
    validateItems: [
      "the agent has one clear business goal",
      "the prompt is short enough to review and specific enough to test",
      "the function set only includes actions the workflow actually needs",
      "inbound routes or outbound campaign settings are connected to the right agent",
      "trunk registration and provider behavior are validated in the target environment",
      "calls per second and active-call limits are conservative for the first run",
      "call records show the expected outcomes and timing",
      "monitoring, logs, and traces are available for investigation"
    ],
    warning:
      "Start narrow. One agent, one route or campaign, one small test list, and one operational review loop will teach more than a broad pilot with too many variables.",
    quickLinksTitle: "Quick links",
    quickLinks: [
      {
        title: "Create your first agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configure one focused Voice AI agent for a real business workflow."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Route an inbound phone number to the right agent."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Create an outbound campaign and run a controlled test."
      },
      {
        title: "Call Records",
        href: "/run-workflows/call-records",
        description: "Review outcome, transcript, recording status, and call timing."
      },
      {
        title: "Monitoring and Visibility",
        href: "/monitoring/monitoring-and-visibility",
        description: "Review live campaign state, trunk status, outcomes, and operational signals."
      },
      {
        title: "Troubleshooting",
        href: "/troubleshoot/troubleshooting",
        description: "Use guided checks when a test does not behave as expected."
      }
    ],
    faqTitle: "Common questions",
    faqs: [
      {
        question: "Is RocketAiFlow only for outbound campaigns?",
        answer:
          "No. RocketAiFlow is outbound-first and inbound-ready. Outbound campaigns are a major operating model, but the same agent and action model can support governed inbound workflows."
      },
      {
        question: "Can RocketAiFlow connect to existing business systems?",
        answer:
          "Yes. Functions and API actions can pass contextual values into external systems such as CRMs, calendars, helpdesks, internal databases, or custom operational services."
      },
      {
        question: "Does provider flexibility mean every SIP provider works automatically?",
        answer:
          "No. You need a real trunk, the correct provider credentials, and a successful registration check. If the trunk is not registered, inbound calls will not arrive and outbound calls will not start."
      },
      {
        question: "Where should I go after this introduction?",
        answer:
          "Use Quickstart if you want to configure a first workflow. Review the core concept sections here if you want the platform model first."
      }
    ]
  },
  it: {
    title: "Introduzione",
    lead:
      "Incontra la tua piattaforma Voice AI per workflow telefonici. RocketAiFlow aiuta i team ad automatizzare conversazioni inbound e outbound con agenti Voice AI, controllo campagne, azioni API, call record e monitoraggio live.",
    websiteIntro: "Se arrivi dal",
    websiteHref: "https://rocketaiflow.com/it",
    websiteLink: "sito RocketAiFlow",
    websiteAfter:
      "usa questa pagina come punto di partenza. Il sito spiega il valore del prodotto; queste docs mostrano come configurare, testare, monitorare e migliorare workflow vocali reali.",
    whatTitle: "Che cos'è RocketAiFlow",
    whatBody:
      "RocketAiFlow è una piattaforma Voice AI in tempo reale per operations aziendali. È outbound-first, inbound-ready ed è costruita per workflow SIP e PBX reali.",
    usesTitle: "I team usano RocketAiFlow per:",
    uses: [
      "creare agenti Voice AI focalizzati",
      "instradare chiamate inbound verso l'agente corretto",
      "eseguire campagne outbound con concorrenza controllata",
      "collegare le chiamate ai sistemi aziendali tramite funzioni e API",
      "rivedere outcome, transcript, registrazioni quando abilitate, timing e metriche live"
    ],
    platformFitIntro:
      "RocketAiFlow è pensato per team che vogliono eseguire workflow Voice AI in un ambiente gestito dal cliente, invece di dipendere solo da uno stack esterno completamente gestito per phone agent. È più utile quando contano controllo, integrazione e visibilità operativa.",
    platformFitItems: [
      "il deployment deve girare on-premise o in infrastruttura controllata dal cliente",
      "le chiamate devono collegarsi a trunk SIP, sistemi PBX o telefonia basata su Asterisk già esistenti",
      "la stessa piattaforma deve supportare routing inbound ed esecuzione campagne outbound",
      "il team deve scegliere o gestire STT, TTS, LLM, telefonia e account provider",
      "gli agenti devono usare functions custom che chiamano CRM, calendario, helpdesk, database o API interne",
      "gli operatori hanno bisogno di dashboard, call record, log, trace e metriche di timing per investigare workflow live"
    ],
    platformFitNote:
      "RocketAiFlow è adatto quando il workflow vocale deve integrarsi con l'ambiente telefonico reale del cliente, il suo modello dati, i provider configurati, le azioni API e le esigenze di monitoring.",
    operatingPathTitle: "Percorso consigliato nella documentazione",
    operatingPathIntro: "Segui questo ordine per passare dal primo test a un workflow configurato e monitorato:",
    operatingPath: [
      {
        title: "1. Inizia",
        href: "/get-started/quickstart",
        description:
          "Valida un workflow inbound o outbound controllato."
      },
      {
        title: "2. Approfondisci la configurazione",
        href: "/build/create-your-first-ai-voice-agent",
        description:
          "Rivedi voce agente, prompt, functions, template e settings."
      },
      {
        title: "3. Connetti",
        href: "/deploy/deployment-overview",
        description:
          "Scegli il percorso deploy e collega trunk, routing o campagna."
      },
      {
        title: "4A. Esegui inbound",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description:
          "Instrada le chiamate inbound verso l'agente corretto."
      },
      {
        title: "4B. Esegui outbound",
        href: "/run-workflows/ai-dialer-flows",
        description:
          "Avvia una campagna outbound controllata."
      },
      {
        title: "5. Monitoraggio",
        href: "/monitoring/monitoring-and-visibility",
        description:
          "Monitora chiamate live, stato trunk, outcome e ritmo di esecuzione."
      },
      {
        title: "6. Migliora",
        href: "/run-workflows/processed-contacts",
        description:
          "Usa contatti, call record, transcript, registrazioni e metriche di timing."
      }
    ],
    conceptsTitle: "Concetti principali",
    concepts: [
      {
        title: "Agenti e prompt",
        paragraphs: [
          "Un agente definisce il lavoro che il workflow vocale deve svolgere. Il prompt definisce come parla l'agente, quali informazioni deve raccogliere, cosa deve evitare e quando deve trasferire, fermarsi o chiamare una funzione.",
          "Parti da un caso d'uso stretto come lead qualification, appointment booking, routing, follow-up o una richiesta inbound ripetitiva. Un primo agente focalizzato è più semplice da testare e più sicuro da migliorare."
        ]
      },
      {
        title: "Funzioni e azioni API",
        paragraphs: [
          "Le funzioni permettono all'agente di fare più che parlare. Una funzione può trasferire una chiamata, terminarla, recuperare dati esterni, aggiornare un CRM, creare una prenotazione o notificare un altro sistema.",
          "RocketAiFlow supporta input dinamici come campi contatto, variabili workflow, valori runtime e parametri contestuali. Questo permette a un workflow di adattarsi a contatti, campagne, route o casi business diversi."
        ]
      },
      {
        title: "Workflow inbound e outbound",
        paragraphs: [
          "I workflow inbound partono di solito da una route, un entry point, una coda o un percorso trunk. Servono per rispondere, qualificare, instradare, raccogliere dati o scalare a un team umano.",
          "I workflow outbound partono di solito da una campagna e da una lista contatti. Servono per execution campaign, scheduling, callback, pacing, limiti di chiamate attive, outcome e review post-chiamata.",
          "Entrambi i tipi di workflow riusano lo stesso modello di agente, prompt, funzioni, telephony e monitoraggio."
        ]
      },
      {
        title: "Telefonia e percorso deploy",
        paragraphs: [
          "RocketAiFlow è costruito per ambienti SIP e PBX reali. La piattaforma usa un layer di telefonia basato su Asterisk per supportare connettività trunk-based pratica e flessibilità sui provider.",
          "La scelta del provider dipende dal percorso deploy e dalla configurazione. Non dare per scontata compatibilità universale o interoperabilità zero-config: valida trunk, codec, registrazione, routing e comportamento provider durante il setup."
        ]
      },
      {
        title: "Monitoraggio e revisione",
        paragraphs: [
          "Le operations vocali live richiedono evidenze. La documentazione RocketAiFlow tratta il monitoraggio come parte del workflow centrale, non come extra opzionale.",
          "Usa dashboard, call record, endpoint e trunk monitoring, log, trace, transcript, registrazioni quando abilitate, talk time e ring time per capire cosa è successo e cosa migliorare."
        ]
      }
    ],
    deploymentModels: [
      "Server Linux dedicato pulito con script di setup RocketAiFlow per la prima installazione.",
      "Integrazione con PBX cliente, trunk SIP, API e monitoring quando il workflow deve adattarsi a un ambiente esistente."
    ],
    screenshotCaption:
      "Usa le viste operative live per validare stato campagna, chiamate attive, limiti e readiness di esecuzione prima di scalare.",
    implementationTitle: "Percorsi pratici di implementazione",
    implementationIntro: "Scegli il percorso che corrisponde a ciò che devi validare per primo.",
    implementationCards: [
      {
        title: "Crea il primo agente",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configura un agente Voice AI focalizzato per un workflow business reale."
      },
      {
        title: "Configura prompt e funzioni",
        href: "/build/configure-agent-prompt",
        description: "Definisci comportamento, regole di raccolta dati, logica di transfer e set di azioni."
      },
      {
        title: "Connetti routing inbound",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Instrada un entry point inbound live verso l'agente corretto e valida la consegna della chiamata."
      },
      {
        title: "Lancia una campagna outbound",
        href: "/run-workflows/ai-dialer-flows",
        description: "Importa contatti, configura regole campagna, imposta pacing ed esegui un test controllato."
      },
      {
        title: "Rivedi i contatti elaborati",
        href: "/run-workflows/processed-contacts",
        description: "Trova i contatti gestiti da workflow inbound e outbound, poi apri il call record per outcome, transcript, registrazione e timing."
      },
      {
        title: "Investiga problemi workflow",
        href: "/troubleshoot/troubleshooting",
        description: "Passa dal sintomo all'evidenza usando storico chiamate, dashboard, log, trace e controlli telephony."
      }
    ],
    validateTitle: "Cosa validare subito",
    validateIntro: "Prima di scalare un workflow, conferma questi punti:",
    validateItems: [
      "l'agente ha un solo obiettivo business chiaro",
      "il prompt è abbastanza breve da rivedere e abbastanza specifico da testare",
      "il set di funzioni include solo le azioni realmente necessarie al workflow",
      "route inbound o impostazioni campagna outbound sono collegate all'agente corretto",
      "registrazione trunk e comportamento provider sono validati nell'ambiente target",
      "calls per second e limiti di chiamate attive sono conservativi per il primo run",
      "i call record mostrano outcome e timing attesi",
      "monitoring, log e trace sono disponibili per investigare problemi"
    ],
    warning:
      "Parti stretto. Un agente, una route o campagna, una piccola lista di test e un loop di review operativo insegnano più di un pilot ampio con troppe variabili.",
    quickLinksTitle: "Link rapidi",
    quickLinks: [
      {
        title: "Crea il primo agente",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configura un agente Voice AI focalizzato per un workflow business reale."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Instrada un numero inbound verso l'agente corretto."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Crea una campagna outbound ed esegui un test controllato."
      },
      {
        title: "Registro chiamate",
        href: "/run-workflows/call-records",
        description: "Rivedi outcome, transcript, stato registrazione e timing della chiamata."
      },
      {
        title: "Monitoring e visibilità",
        href: "/monitoring/monitoring-and-visibility",
        description: "Rivedi stato campagne live, stato trunk, outcome e segnali operativi."
      },
      {
        title: "Risoluzione problemi",
        href: "/troubleshoot/troubleshooting",
        description: "Usa controlli guidati quando un test non funziona come previsto."
      }
    ],
    faqTitle: "Domande frequenti",
    faqs: [
      {
        question: "RocketAiFlow serve solo per campagne outbound?",
        answer:
          "No. RocketAiFlow è outbound-first e inbound-ready. Le campagne outbound sono un modello operativo importante, ma lo stesso modello di agente e azioni può supportare workflow inbound governati."
      },
      {
        question: "RocketAiFlow può collegarsi ai sistemi aziendali esistenti?",
        answer:
          "Sì. Funzioni e azioni API possono passare valori contestuali verso sistemi esterni come CRM, calendari, helpdesk, database interni o servizi operativi custom."
      },
      {
        question: "Provider flexibility significa che ogni provider SIP funziona automaticamente?",
        answer:
          "No. Serve un trunk reale, le credenziali corrette del provider e una verifica di registrazione riuscita. Se il trunk non è registrato, le chiamate inbound non arrivano e le chiamate outbound non partono."
      },
      {
        question: "Dove devo andare dopo questa introduzione?",
        answer:
          "Usa Quickstart se vuoi configurare un primo workflow. Rivedi le sezioni sui concetti principali in questa pagina se vuoi prima capire il modello della piattaforma."
      }
    ]
  }
};

function DocsCard({ href, title, description }: IntroCard) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link href={localizeHref(href, locale)} className="docs-home-card">
      <strong>{title}</strong>
      <span>{description}</span>
    </Link>
  );
}

function CardGrid({ cards }: { cards: IntroCard[] }) {
  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {cards.map((card) => (
        <DocsCard key={`${card.href}-${card.title}`} {...card} />
      ))}
    </div>
  );
}

function ProductScreenshot({ caption }: { caption: string }) {
  return (
    <figure className="docs-screenshot">
      <div className="docs-screenshot-frame">
        {/* Screenshots are served from public and rendered responsively inside docs layouts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="docs-screenshot-img"
          src="/screenshots/docs/ops-dialer-table-all.png"
          alt="RocketAiFlow live dialer table showing campaign status, active calls, and call limits."
          loading="lazy"
        />
      </div>
      <figcaption className="docs-screenshot-caption">{caption}</figcaption>
    </figure>
  );
}

function useIntroductionCopy() {
  const locale = useCurrentLocale(defaultLocale);

  return introductionCopy[locale];
}

function shouldShowDeploymentModels(title: string) {
  return title.includes("Telephony") || title.includes("telephony") || title.includes("Telefonia");
}

export function LocalizedIntroductionTitle() {
  return <>{useIntroductionCopy().title}</>;
}

export function LocalizedIntroductionHero() {
  const copy = useIntroductionCopy();

  return (
    <>
      <p>{copy.lead}</p>
      <p>
        {copy.websiteIntro} <a href={copy.websiteHref}>{copy.websiteLink}</a>, {copy.websiteAfter}
      </p>
    </>
  );
}

export function LocalizedIntroductionWhat() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <p>{copy.whatBody}</p>
      <p>{copy.usesTitle}</p>
      <ul>
        {copy.uses.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function LocalizedIntroductionPlatformFit() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <p>{copy.platformFitIntro}</p>
      <ul>
        {copy.platformFitItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>{copy.platformFitNote}</p>
    </section>
  );
}

export function LocalizedIntroductionOperatingPath() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <p>{copy.operatingPathIntro}</p>
      <CardGrid cards={copy.operatingPath} />
    </section>
  );
}

export function LocalizedIntroductionConceptsIntro() {
  return null;
}

export function LocalizedIntroductionConcept({ index }: { index: number }) {
  const copy = useIntroductionCopy();
  const concept = copy.concepts[index];

  if (!concept) {
    return null;
  }

  return (
    <section className="docs-home-section docs-home-section-nested">
      {concept.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {shouldShowDeploymentModels(concept.title) ? (
        <ul>
          {copy.deploymentModels.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LocalizedIntroductionConceptsScreenshot() {
  const copy = useIntroductionCopy();

  return <ProductScreenshot caption={copy.screenshotCaption} />;
}

export function LocalizedIntroductionImplementationPaths() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <p>{copy.implementationIntro}</p>
      <CardGrid cards={copy.implementationCards} />
    </section>
  );
}

export function LocalizedIntroductionValidation() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <p>{copy.validateIntro}</p>
      <ul>
        {copy.validateItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="docs-warning-callout">{copy.warning}</div>
    </section>
  );
}

export function LocalizedIntroductionQuickLinks() {
  const copy = useIntroductionCopy();

  return (
    <section className="docs-home-section">
      <CardGrid cards={copy.quickLinks} />
    </section>
  );
}

export function LocalizedIntroductionFaqs() {
  const copy = useIntroductionCopy();

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

export function LocalizedIntroduction() {
  return (
    <>
      <LocalizedIntroductionHero />
      <LocalizedIntroductionOperatingPath />
      <LocalizedIntroductionQuickLinks />
      <LocalizedIntroductionFaqs />
    </>
  );
}
