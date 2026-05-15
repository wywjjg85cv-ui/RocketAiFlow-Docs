"use client";

import Link from "next/link";
import { Callout } from "nextra/components";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type HomeCard = {
  title: string;
  href: string;
  description?: string;
};

type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    noteTitle: string;
    noteItems: string[];
  };
  callout: {
    before: string;
    link: string;
    after: string;
  };
  why: {
    title: string;
    body: string;
    bullets: string[];
  };
  evaluation: {
    title: string;
    cards: HomeCard[];
  };
  build: {
    title: string;
    cards: HomeCard[];
  };
  workflows: {
    title: string;
    cards: HomeCard[];
  };
  operate: {
    title: string;
    cards: HomeCard[];
  };
  roles: {
    title: string;
    items: string[];
  };
  checklist: {
    title: string;
    intro: string;
    items: string[];
  };
};

const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    hero: {
      eyebrow: "RocketAiFlow Docs",
      title: "Validate AI outbound campaigns and controlled inbound workflows with live visibility.",
      intro:
        "RocketAiFlow documentation is structured for teams evaluating or running an early-access pilot. Start from outbound campaign control, controlled inbound automation, API actions, call data, transcripts, recordings when enabled, and live monitoring on real voice workflows.",
      noteTitle: "What this documentation is built to answer:",
      noteItems: [
        "what RocketAiFlow is: outbound-first, inbound-ready, and designed for pilot validation on real phone workflows",
        "how to move from one agent to a controlled outbound campaign, inbound route, contact import, and test call",
        "how functions, APIs, dynamic parameters, and workflow context support real business actions",
        "how teams monitor live campaigns and review outcomes, transcripts, recordings when enabled, talk time, and ring time"
      ]
    },
    callout: {
      before: "Start with",
      link: "Get Started",
      after:
        "for the onboarding path, then move into Build, Run Workflows, Deploy, Observe, and Troubleshoot as your evaluation becomes more hands-on."
    },
    why: {
      title: "Why teams use these docs",
      body:
        "RocketAiFlow documentation is not meant to read like a static feature list. It is designed to help call centers, BPOs, sales teams, operations teams, technical leads, and solutions engineers validate whether a real phone workflow is a good fit for an early-access pilot.",
      bullets: [
        "early-access pilot onboarding without skipping operational detail",
        "platform-agnostic architecture and provider flexibility",
        "flexible telephony architecture for real SIP and PBX environments",
        "practical setup paths for outbound campaigns, controlled inbound calls, callbacks, scheduling, and contact priority",
        "API extensibility and custom business actions",
        "deployment paths for inbound, outbound, SIP/PBX integration, API actions, and monitoring",
        "live monitoring, call history, transcripts, recordings when enabled, logs, traces, and troubleshooting readiness"
      ]
    },
    evaluation: {
      title: "Start with the evaluation path",
      cards: [
        { href: "/get-started", title: "Get Started", description: "Understand the pilot-oriented platform model and how outbound, inbound, API actions, call data, and monitoring connect." },
        { href: "/get-started/quickstart", title: "Quickstart", description: "Create one agent, prompt, trunk path, contact import, controlled campaign or inbound route, and validation call." },
        { href: "/deploy/deployment-overview", title: "Deployment Overview", description: "Choose the first live path: inbound routing, outbound campaign, SIP/PBX integration, API actions, and monitoring." }
      ]
    },
    build: {
      title: "Build the workflow foundation",
      cards: [
        { href: "/build/create-your-first-ai-voice-agent", title: "Create Your First AI Voice Agent" },
        { href: "/build/configure-agent-prompt", title: "Configure Agent Prompt" },
        { href: "/build/add-functions", title: "Configure Agent Functions" },
        { href: "/build/dynamic-parameters", title: "Dynamic Parameters" }
      ]
    },
    workflows: {
      title: "Run real workflows",
      cards: [
        { href: "/run-workflows/ai-inbound-routing", title: "AI Inbound Routing" },
        { href: "/run-workflows/ai-dialer-flows", title: "AI Dialer Flows" },
        { href: "/run-workflows/dialer-pacing-and-limits", title: "Dialer Pacing and Limits" },
        { href: "/run-workflows/import-contacts", title: "Import Contacts" },
        { href: "/run-workflows/contact-inbounds", title: "Contact Inbounds" },
        { href: "/run-workflows/call-records", title: "Call Records" },
        { href: "/run-workflows/call-history-and-review", title: "Call History and Review" },
        { href: "/run-workflows/phone", title: "Phone" }
      ]
    },
    operate: {
      title: "Pilot, monitor, and operate with control",
      cards: [
        { href: "/deploy/deployment-overview", title: "Deployment Overview", description: "Connect the selected live path with trunk, agent, route or campaign, integrations, and monitoring." },
        { href: "/run-workflows/dialer-pacing-and-limits", title: "Campaign Control", description: "Control calls per second, active-call limits, callbacks, scheduled contacts, priority, and execution pressure." },
        { href: "/observe/monitoring-and-visibility", title: "Monitoring and Visibility", description: "Start from the main operational view for live campaigns, telephony state, and workflow health." },
        { href: "/observe/pre-provisioned-dashboards", title: "Pre-Provisioned Dashboards", description: "Review the ready dashboard foundation that helps teams get to live visibility faster." },
        { href: "/troubleshoot/investigating-workflow-issues", title: "Investigating Workflow Issues", description: "Follow the full path from symptom to evidence using call records, dashboards, logs, and traces." }
      ]
    },
    roles: {
      title: "Suggested next steps by role",
      items: [
        "Technical lead: start with Introduction, then review Deployment Overview and Monitoring and Visibility.",
        "Solutions engineer: start with Quickstart, then move into Configure Agent Functions and Dynamic Parameters.",
        "Operations manager: start with Monitoring and Visibility, Campaign Analytics, and Logs Drilldown."
      ]
    },
    checklist: {
      title: "Evaluation checklist",
      intro: "Use the docs to confirm these questions early:",
      items: [
        "Can one agent support a real inbound or outbound workflow without rigid setup?",
        "Can functions and API actions map to actual business steps?",
        "Can workflow context and dynamic parameters be passed cleanly?",
        "Can the pilot setup fit your telephony environment, data policies, API systems, recordings, transcripts, and monitoring needs?",
        "Can operators monitor campaign state, endpoint health, logs, and traces without guessing?"
      ]
    }
  },
  it: {
    hero: {
      eyebrow: "Documentazione RocketAiFlow",
      title: "Valida campagne Outbound AI e inbound controllato con visibilità live.",
      intro:
        "La documentazione RocketAiFlow è pensata per team che stanno valutando o avviando un pilot in early access. Parti da controllo campagne outbound, inbound controllato, azioni API, dati chiamata, trascrizioni, registrazioni quando abilitate e monitoraggio live su workflow telefonici reali.",
      noteTitle: "Questa documentazione aiuta a capire:",
      noteItems: [
        "che cos'è RocketAiFlow: outbound-first, inbound-ready e pensato per validare workflow telefonici reali in pilot",
        "come passare da un agente a campagna outbound controllata, route inbound, import contatti e chiamata di test",
        "come funzioni, API, parametri dinamici e contesto del workflow supportano azioni di business reali",
        "come monitorare campagne live e rivedere outcome, transcript, registrazioni quando abilitate, talk time e ring time"
      ]
    },
    callout: {
      before: "Inizia da",
      link: "Per iniziare",
      after:
        "per il percorso di onboarding, poi passa a Build, Run Workflows, Deploy, Observe e Troubleshoot man mano che la valutazione diventa più operativa."
    },
    why: {
      title: "Perché i team usano queste docs",
      body:
        "La documentazione RocketAiFlow non è una semplice lista statica di funzionalità. È progettata per aiutare call center, BPO, team sales, operations, technical lead e solutions engineer a validare se un workflow telefonico reale è adatto a un pilot in early access.",
      bullets: [
        "onboarding pilot senza perdere i dettagli operativi",
        "architettura platform-agnostic e flessibilità sui provider",
        "architettura telephony flessibile per ambienti SIP e PBX reali",
        "percorsi pratici per campagne outbound, inbound controllato, richiami automatici, programmazione e priorità contatti",
        "estensibilità API e azioni di business personalizzate",
        "setup guidato, fit su ambiente cliente e readiness telephony",
        "monitoraggio live, storico chiamate, transcript, registrazioni quando abilitate, log, trace e troubleshooting per operations"
      ]
    },
    evaluation: {
      title: "Parti dal percorso di valutazione",
      cards: [
        { href: "/get-started", title: "Per iniziare", description: "Comprendi il modello orientato al pilot e come outbound, inbound, azioni API, dati chiamata e monitoring si collegano." },
        { href: "/get-started/quickstart", title: "Quickstart", description: "Crea un agente, prompt, trunk path, import contatti, campagna o route inbound controllata e chiamata di validazione." },
        { href: "/deploy/deployment-overview", title: "Panoramica deploy", description: "Scegli il primo percorso live: routing inbound, campagna outbound, integrazione SIP/PBX, azioni API e monitoring." }
      ]
    },
    build: {
      title: "Costruisci la base del workflow",
      cards: [
        { href: "/build/create-your-first-ai-voice-agent", title: "Crea il primo AI Voice Agent" },
        { href: "/build/configure-agent-prompt", title: "Configura il prompt" },
        { href: "/build/add-functions", title: "Configura le functions" },
        { href: "/build/dynamic-parameters", title: "Parametri dinamici" }
      ]
    },
    workflows: {
      title: "Esegui workflow reali",
      cards: [
        { href: "/run-workflows/ai-inbound-routing", title: "Routing AI inbound" },
        { href: "/run-workflows/ai-dialer-flows", title: "Flussi AI dialer" },
        { href: "/run-workflows/dialer-pacing-and-limits", title: "Pacing e limiti dialer" },
        { href: "/run-workflows/import-contacts", title: "Importa contatti" },
        { href: "/run-workflows/contact-inbounds", title: "Contact inbounds" },
        { href: "/run-workflows/call-records", title: "Call records" },
        { href: "/run-workflows/call-history-and-review", title: "Storico e review chiamate" },
        { href: "/run-workflows/phone", title: "Phone" }
      ]
    },
    operate: {
      title: "Pilot, monitoring e operations con controllo",
      cards: [
        { href: "/deploy/deployment-overview", title: "Panoramica deploy", description: "Collega il percorso live scelto con trunk, agente, route o campagna, integrazioni e monitoring." },
        { href: "/run-workflows/dialer-pacing-and-limits", title: "Controllo campagna", description: "Controlla calls per second, limiti chiamate attive, richiami automatici, contatti programmati, priorità e pressione dialer." },
        { href: "/observe/monitoring-and-visibility", title: "Monitoring e visibilità", description: "Parti dalla vista operativa principale per campagne live, stato telephony e salute dei workflow." },
        { href: "/observe/pre-provisioned-dashboards", title: "Dashboard pre-provisionate", description: "Rivedi la base dashboard pronta che accelera la visibilità operativa." },
        { href: "/troubleshoot/investigating-workflow-issues", title: "Investigazione issue workflow", description: "Segui il percorso da sintomo a evidenza usando call record, dashboard, log e trace." }
      ]
    },
    roles: {
      title: "Prossimi passi per ruolo",
      items: [
        "Technical lead: parti da Introduzione, poi rivedi Panoramica deployment e Monitoring e visibilità.",
        "Solutions engineer: parti dal Quickstart, poi passa a Configura le functions e Parametri dinamici.",
        "Operations manager: parti da Monitoring e visibilità, Campaign Analytics e Logs Drilldown."
      ]
    },
    checklist: {
      title: "Checklist di valutazione",
      intro: "Usa le docs per validare presto queste domande:",
      items: [
        "Un singolo agente può supportare un workflow inbound o outbound reale senza setup rigido?",
        "Funzioni e azioni API possono mappare step di business concreti?",
        "Contesto del workflow e parametri dinamici possono essere passati in modo pulito?",
        "Il setup pilot può adattarsi ad ambiente telephony, policy dati, API, registrazioni, trascrizioni e monitoring richiesti?",
        "Gli operatori possono monitorare campagne, endpoint, log e trace senza procedere per tentativi?"
      ]
    }
  }
};

const heroShots = [
  { src: "/screenshots/docs/ops-total-outcomes-all.png", alt: "Grafana panel showing total outcomes across all campaigns." },
  { src: "/screenshots/docs/ops-call-outcomes-all.png", alt: "Grafana panel showing call outcome distribution across all campaigns." },
  { src: "/screenshots/docs/ops-dialing-rate-all.png", alt: "Grafana panel showing dialing rate in calls per second across all campaigns." },
  { src: "/screenshots/docs/ops-calls-volume-all.png", alt: "Grafana panel showing calls volume and active calls versus limit across all campaigns." },
  { src: "/screenshots/docs/ops-active-vs-limit-all.png", alt: "Grafana gauge showing active calls versus configured limit across all campaigns." },
  { src: "/screenshots/docs/ops-dialer-table-all.png", alt: "Grafana table showing dialer status, active state, active calls, and call limit per campaign." }
];

function ProductScreenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="docs-screenshot">
      <div className="docs-screenshot-frame">
        {/* Screenshots are served from public and rendered responsively inside docs layouts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={src} alt={alt} loading="lazy" />
      </div>
    </figure>
  );
}

function HomeCard({ href, title, description }: HomeCard) {
  return (
    <Link href={href} className="docs-home-card">
      <strong>{title}</strong>
      {description ? <span>{description}</span> : null}
    </Link>
  );
}

function CardSection({ title, cards, cols = 2 }: { title: string; cards: HomeCard[]; cols?: 2 | 3 }) {
  return (
    <section className="docs-home-section">
      <h2>{title}</h2>
      <div className={`docs-home-card-grid docs-home-card-grid-${cols}`}>
        {cards.map((card) => (
          <HomeCard key={card.href} {...card} />
        ))}
      </div>
    </section>
  );
}

export function LocalizedHome() {
  const locale = useCurrentLocale(defaultLocale);
  const copy = homeCopy[locale];

  return (
    <>
      <div className="docs-hero">
        <div>
          <p className="docs-eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>

          <div className="docs-hero-intro">{copy.hero.intro}</div>

          <div className="docs-note">
            <strong>{copy.hero.noteTitle}</strong>
            <ul>
              {copy.hero.noteItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="docs-hero-shots">
          <div className="docs-hero-shots-grid">
            {heroShots.map((shot) => (
              <ProductScreenshot key={shot.src} {...shot} />
            ))}
          </div>
        </div>
      </div>

      <Callout type="info">
        {copy.callout.before} <Link href="/get-started">{copy.callout.link}</Link> {copy.callout.after}
      </Callout>

      <section className="docs-home-section">
        <h2>{copy.why.title}</h2>
        <p>{copy.why.body}</p>
        <ul>
          {copy.why.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <CardSection title={copy.evaluation.title} cards={copy.evaluation.cards} />
      <CardSection title={copy.build.title} cards={copy.build.cards} cols={3} />
      <CardSection title={copy.workflows.title} cards={copy.workflows.cards} cols={3} />
      <CardSection title={copy.operate.title} cards={copy.operate.cards} />

      <section className="docs-home-section">
        <h2>{copy.roles.title}</h2>
        <ul>
          {copy.roles.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="docs-home-section">
        <h2>{copy.checklist.title}</h2>
        <p>{copy.checklist.intro}</p>
        <ul>
          {copy.checklist.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
