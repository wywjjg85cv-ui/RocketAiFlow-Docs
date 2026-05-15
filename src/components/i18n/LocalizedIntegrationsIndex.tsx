"use client";

import Link from "next/link";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type IntegrationStatus = "available" | "category" | "onRequest" | "validate" | "technicalReview";

type IntegrationItem = {
  name: string;
  status: IntegrationStatus;
  description: string;
  href?: string;
};

const integrationsCopy: Record<Locale, {
  title: string;
  paragraphs: string[];
  statusLabels: Record<IntegrationStatus, string>;
  cards: IntegrationItem[];
  listTitle: string;
  integrations: IntegrationItem[];
  intakeTitle: string;
  intakeItems: string[];
}> = {
  en: {
    title: "Integrations",
    paragraphs: [
      "RocketAiFlow integrations connect voice agents to the systems that move calls, enrich context, and complete business actions.",
      "Systems that expose APIs, webhooks, SDKs, or SIP connectivity can usually be connected through custom functions, provider-specific setup, or an assisted validation flow."
    ],
    statusLabels: {
      available: "Available",
      category: "Category",
      onRequest: "On request",
      validate: "To validate",
      technicalReview: "Technical review"
    },
    cards: [
      {
        name: "Telephony",
        status: "category",
        description: "Connect RocketAiFlow with SIP trunks, PBX systems, and provider-specific telephony setups.",
        href: "/integrations/telephony"
      },
      {
        name: "Custom API functions",
        status: "available",
        description: "Use GET, POST, PUT, PATCH, or DELETE functions to connect business tools that expose APIs.",
        href: "/build/add-functions#functions-can-trigger-api-backed-actions"
      }
    ],
    listTitle: "Application integrations",
    integrations: [
      {
        name: "HubSpot",
        status: "onRequest",
        description: "CRM integration candidate for contact lookup, lead updates, call activity logging, and workflow actions."
      },
      {
        name: "Salesforce",
        status: "onRequest",
        description: "CRM integration candidate for account/contact lookup, lead qualification updates, tasks, and call outcome logging."
      },
      {
        name: "GoHighLevel",
        status: "onRequest",
        description: "CRM and automation candidate for contacts, opportunities, campaign context, and follow-up actions."
      },
      {
        name: "Zendesk",
        status: "onRequest",
        description: "Support integration candidate for ticket lookup, knowledge context, and post-call ticket updates."
      },
      {
        name: "Cal.com",
        status: "onRequest",
        description: "Scheduling integration candidate for availability lookup, appointment booking, and rescheduling workflows."
      },
      {
        name: "Zapier",
        status: "validate",
        description: "Workflow automation candidate for webhook-based actions that send RocketAiFlow outcomes to other apps."
      },
      {
        name: "WhatsApp Business",
        status: "validate",
        description: "Channel integration candidate. Validate provider path, voice/calling support, message flow, and compliance constraints."
      },
      {
        name: "Stripe",
        status: "validate",
        description: "Payment/billing integration candidate. Validate allowed operations, API scopes, security boundaries, and audit expectations."
      },
      {
        name: "Other REST APIs or webhooks",
        status: "technicalReview",
        description: "Any system with reachable APIs can be evaluated for custom functions, provided authentication, payloads, limits, and data handling are clear."
      }
    ],
    intakeTitle: "Information needed for the first integration validation",
    intakeItems: [
      "target platform and use case",
      "API documentation or webhook documentation",
      "authentication method, scopes, and sandbox access",
      "objects and fields to read or update",
      "required contact fields and dynamic parameters",
      "expected action during the call and expected result after the call",
      "rate limits, privacy constraints, audit needs, and error handling rules"
    ]
  },
  it: {
    title: "Integrazioni",
    paragraphs: [
      "Le integrazioni RocketAiFlow collegano gli agenti vocali ai sistemi che gestiscono chiamate, arricchiscono il contesto e completano azioni di business.",
      "I sistemi che espongono API, webhook, SDK o connettività SIP possono in genere essere collegati tramite functions custom, setup specifico del provider o validazione assistita."
    ],
    statusLabels: {
      available: "Disponibile",
      category: "Categoria",
      onRequest: "Su richiesta",
      validate: "Da validare",
      technicalReview: "Valutazione tecnica"
    },
    cards: [
      {
        name: "Telefonia",
        status: "category",
        description: "Collega RocketAiFlow a trunk SIP, sistemi PBX e setup telefonici specifici per provider.",
        href: "/integrations/telephony"
      },
      {
        name: "Functions API custom",
        status: "available",
        description: "Usa functions GET, POST, PUT, PATCH o DELETE per collegare tool aziendali che espongono API.",
        href: "/build/add-functions#functions-can-trigger-api-backed-actions"
      }
    ],
    listTitle: "Integrazioni applicative",
    integrations: [
      {
        name: "HubSpot",
        status: "onRequest",
        description: "Candidato CRM per recupero contatti, aggiornamento lead, log attività chiamata e azioni workflow."
      },
      {
        name: "Salesforce",
        status: "onRequest",
        description: "Candidato CRM per recupero account/contatti, aggiornamenti qualificazione lead, task e log esito chiamata."
      },
      {
        name: "GoHighLevel",
        status: "onRequest",
        description: "Candidato CRM e automation per contatti, opportunità, contesto campagna e azioni di follow-up."
      },
      {
        name: "Zendesk",
        status: "onRequest",
        description: "Candidato support per recupero ticket, contesto knowledge e aggiornamenti ticket post-chiamata."
      },
      {
        name: "Cal.com",
        status: "onRequest",
        description: "Candidato scheduling per recupero disponibilità, prenotazione appuntamenti e workflow di reschedule."
      },
      {
        name: "Zapier",
        status: "validate",
        description: "Candidato workflow automation per azioni via webhook che inviano outcome RocketAiFlow ad altre app."
      },
      {
        name: "WhatsApp Business",
        status: "validate",
        description: "Candidato canale. Valida percorso provider, supporto voce/chiamate, flusso messaggi e vincoli compliance."
      },
      {
        name: "Stripe",
        status: "validate",
        description: "Candidato pagamenti/billing. Valida operazioni consentite, scope API, confini di sicurezza e audit."
      },
      {
        name: "Altre API REST o webhook",
        status: "technicalReview",
        description: "Ogni sistema con API raggiungibili può essere valutato per functions custom, se autenticazione, payload, limiti e trattamento dati sono chiari."
      }
    ],
    intakeTitle: "Informazioni necessarie per la prima validazione integrazione",
    intakeItems: [
      "piattaforma target e caso d'uso",
      "documentazione API o documentazione webhook",
      "metodo di autenticazione, scope e accesso sandbox",
      "oggetti e campi da leggere o aggiornare",
      "campi contatto richiesti e parametri dinamici",
      "azione attesa durante la chiamata e risultato atteso dopo la chiamata",
      "rate limit, vincoli privacy, audit e gestione errori"
    ]
  }
};

function useIntegrationsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return integrationsCopy[locale];
}

export function LocalizedIntegrationsTitle() {
  return <>{useIntegrationsCopy().title}</>;
}

export function LocalizedIntegrationsIntro() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      {copy.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedIntegrationsCards() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-2">
        {copy.cards.map((card) => (
          <IntegrationCard key={card.name} integration={card} labels={copy.statusLabels} />
        ))}
      </div>
    </section>
  );
}

function StatusPill({ status, labels }: { status: IntegrationStatus; labels: Record<IntegrationStatus, string> }) {
  return <span className={`docs-status-pill docs-status-pill-${status}`}>{labels[status]}</span>;
}

function IntegrationCard({ integration, labels }: { integration: IntegrationItem; labels: Record<IntegrationStatus, string> }) {
  const content = (
    <>
      <span className="docs-card-heading-row">
        <strong>{integration.name}</strong>
        <StatusPill status={integration.status} labels={labels} />
      </span>
      <span>{integration.description}</span>
    </>
  );

  if (integration.href) {
    return (
      <Link className="docs-home-card" href={integration.href}>
        {content}
      </Link>
    );
  }

  return <div className="docs-home-card docs-home-card-static">{content}</div>;
}

export function LocalizedIntegrationsList() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      <h2>{copy.listTitle}</h2>
      <div className="docs-home-card-grid docs-home-card-grid-2">
        {copy.integrations.map((integration) => (
          <IntegrationCard key={integration.name} integration={integration} labels={copy.statusLabels} />
        ))}
      </div>
    </section>
  );
}

export function LocalizedIntegrationsIntake() {
  const copy = useIntegrationsCopy();

  return (
    <section className="docs-home-section">
      <h2>{copy.intakeTitle}</h2>
      <ul>
        {copy.intakeItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
