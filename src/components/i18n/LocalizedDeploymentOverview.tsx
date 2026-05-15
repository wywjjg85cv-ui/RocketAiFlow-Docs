"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type CardCopy = {
  title: string;
  href?: string;
  description: string;
};

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
};

type DeploymentCopy = {
  title: string;
  intro: ReactNode[];
  pathsTitle: string;
  paths: CardCopy[];
  setup: SectionCopy;
  nextStepsTitle: string;
  nextSteps: CardCopy[];
};

type HeadingKey = "paths" | "setup" | "nextSteps";

const deploymentCopy: Record<Locale, DeploymentCopy> = {
  en: {
    title: "Deployment Overview",
    intro: [
      "Deploying RocketAiFlow means choosing where the platform will run and how it will connect to the customer's telephony and business systems.",
      "Start with a clean, controlled setup, validate the technical environment, then expand to more routes, campaigns, integrations, or volume."
    ],
    pathsTitle: "Deployment paths",
    paths: [
      {
        title: "Clean dedicated server",
        description: "Install RocketAiFlow on a dedicated Linux server prepared for the first deployment."
      },
      {
        title: "Customer environment integration",
        description: "Keep existing PBX, Asterisk, databases, or internal systems separate and connect them through explicit integration points."
      },
      {
        title: "SIP / PBX integration",
        href: "/integrations/telephony",
        description: "Connect customer PBX systems, SIP trunks, or provider paths when calls must pass through an existing telephony environment."
      },
      {
        title: "API actions",
        href: "/build/add-functions",
        description: "Use functions to connect the agent to CRMs, calendars, databases, helpdesks, webhooks, or internal APIs."
      },
    ],
    setup: {
      title: "Recommended setup",
      paragraphs: [
        "For the first deployment, provide a clean dedicated Linux server. The RocketAiFlow team will install and prepare the product so the environment is ready for validation.",
        "If the customer already has Asterisk, a PBX, databases, or internal systems, keep RocketAiFlow separate when possible and connect to those systems through SIP trunks, APIs, and explicit routing rules."
      ],
      items: [
        "Use a clean server for the first installation to reduce conflicts with existing services.",
        "Connect the customer PBX or SIP provider through trunk configuration when the existing telephony environment must remain in control.",
        "Install on a machine that already hosts customer services only when that choice has been reviewed and approved as an advanced setup."
      ]
    },
    nextStepsTitle: "Next steps",
    nextSteps: [
      {
        title: "Quickstart",
        href: "/get-started/quickstart",
        description: "Create the first working inbound or outbound workflow."
      },
      {
        title: "Create an AI voice agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configure voice, LLM, functions, transcription, and agent settings."
      },
      {
        title: "Telephony integrations",
        href: "/integrations/telephony",
        description: "Review PBX, SIP, and provider integration options."
      },
      {
        title: "Monitoring and visibility",
        href: "/observe/monitoring-and-visibility",
        description: "Confirm the live operating view before scaling."
      }
    ]
  },
  it: {
    title: "Panoramica deploy",
    intro: [
      "Fare deploy in RocketAiFlow significa scegliere dove installare la piattaforma e come collegarla alla telefonia e ai sistemi aziendali del cliente.",
      "Parti da un setup pulito e controllato, valida l'ambiente tecnico e poi espandi verso più route, campagne, integrazioni o volume."
    ],
    pathsTitle: "Percorsi deploy",
    paths: [
      {
        title: "Server dedicato pulito",
        description: "Installa RocketAiFlow su un server Linux dedicato e preparato per il primo deploy."
      },
      {
        title: "Integrazione con ambiente cliente",
        description: "Mantieni PBX, Asterisk, database o sistemi interni separati e collegali tramite punti di integrazione espliciti."
      },
      {
        title: "Integrazione SIP / PBX",
        href: "/integrations/telephony",
        description: "Collega PBX cliente, trunk SIP o provider quando le chiamate devono passare da un ambiente telefonico esistente."
      },
      {
        title: "Azioni API",
        href: "/build/add-functions",
        description: "Usa le functions per collegare l'agente a CRM, calendari, database, helpdesk, webhook o API interne."
      },
    ],
    setup: {
      title: "Setup consigliato",
      paragraphs: [
        "Per il primo deploy consigliamo un server Linux dedicato e pulito fornito dal cliente. Il team RocketAiFlow esegue l'installazione e prepara il prodotto per la validazione.",
        "Se il cliente ha già Asterisk, un PBX, database o sistemi interni, quando possibile mantieni RocketAiFlow separato e collegalo a quei sistemi tramite trunk SIP, API e regole di routing esplicite."
      ],
      items: [
        "Usa un server pulito per la prima installazione, così riduci conflitti con servizi già presenti.",
        "Collega il PBX o provider SIP del cliente tramite configurazione trunk quando l'ambiente telefonico esistente deve rimanere centrale.",
        "Installa su una macchina che ospita già servizi del cliente solo quando questa scelta è stata valutata e approvata come setup avanzato."
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Quickstart",
        href: "/get-started/quickstart",
        description: "Crea il primo workflow inbound o outbound funzionante."
      },
      {
        title: "Crea un AI voice agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Configura voice, LLM, functions, transcription e agent settings."
      },
      {
        title: "Integrazioni telefonia",
        href: "/integrations/telephony",
        description: "Rivedi opzioni PBX, SIP e provider."
      },
      {
        title: "Monitoring e visibilità",
        href: "/observe/monitoring-and-visibility",
        description: "Conferma la vista operativa live prima di scalare."
      }
    ]
  }
};

function useDeploymentCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return deploymentCopy[locale];
}

function Section({ section }: { section: SectionCopy }) {
  return (
    <section className="docs-home-section">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.items ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Cards({ cards }: { cards: CardCopy[] }) {
  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {cards.map((card) => {
        const content = (
          <>
            <strong>{card.title}</strong>
            <span>{card.description}</span>
          </>
        );

        return card.href ? (
          <Link key={card.title} className="docs-home-card" href={card.href}>
            {content}
          </Link>
        ) : (
          <div key={card.title} className="docs-home-card docs-home-card-static">
            {content}
          </div>
        );
      })}
    </div>
  );
}

export function LocalizedDeploymentOverviewTitle() {
  return <>{useDeploymentCopy().title}</>;
}

export function LocalizedDeploymentOverviewHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useDeploymentCopy();

  if (labelKey === "paths") {
    return <>{copy.pathsTitle}</>;
  }

  if (labelKey === "nextSteps") {
    return <>{copy.nextStepsTitle}</>;
  }

  return <>{copy[labelKey].title}</>;
}

export function LocalizedDeploymentOverviewIntro() {
  const copy = useDeploymentCopy();

  return (
    <div className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export function LocalizedDeploymentOverviewPaths() {
  return <Cards cards={useDeploymentCopy().paths} />;
}

export function LocalizedDeploymentOverviewSetup() {
  return <Section section={useDeploymentCopy().setup} />;
}

export function LocalizedDeploymentOverviewNextSteps() {
  return <Cards cards={useDeploymentCopy().nextSteps} />;
}
