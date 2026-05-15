"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type TelephonyStatus = "documented" | "onRequest" | "validate" | "technicalReview";

type TelephonyIntegration = {
  name: string;
  status: TelephonyStatus;
  description: string;
  href?: string;
};

type TelephonyCopy = {
  title: string;
  intro: ReactNode[];
  statusLabels: Record<TelephonyStatus, string>;
  listTitle: string;
  integrations: TelephonyIntegration[];
  intakeTitle: string;
  intakeItems: string[];
};

const telephonyCopy: Record<Locale, TelephonyCopy> = {
  en: {
    title: "Telephony Integrations",
    intro: [
      "Connect RocketAiFlow to SIP trunks, VoIP providers, and PBX systems so AI voice agents can receive inbound calls, run outbound campaigns, and transfer calls through your existing telephony stack.",
      "Start from a documented setup when available, or use a technical validation path for provider-specific SIP environments."
    ],
    statusLabels: {
      documented: "Available",
      onRequest: "On request",
      validate: "To validate",
      technicalReview: "Technical review"
    },
    listTitle: "Integration list",
    integrations: [
      {
        name: "Asterisk-based PBX Systems",
        status: "documented",
        description: "PJSIP trunk setup documented for inbound routing, outbound campaigns, and transfer context.",
        href: "/integrations/telephony/asterisk-based-pbx-systems"
      },
      {
        name: "3CX",
        status: "onRequest",
        description: "SIP/PBX integration candidate. Validate trunk direction, outbound rules, inbound routing, codecs, NAT, and transfer behavior during the first setup."
      },
      {
        name: "Twilio SIP Trunking",
        status: "validate",
        description: "Common SIP provider candidate. Validate authentication, caller ID, SIP headers, media path, and number routing before documenting a self-serve flow."
      },
      {
        name: "Telnyx SIP Trunking",
        status: "validate",
        description: "Common SIP provider candidate. Validate inbound numbers, outbound origination, caller ID, transfer behavior, and media settings."
      },
      {
        name: "Vonage SIP",
        status: "validate",
        description: "Provider-specific validation needed for trunk authentication, routing, caller ID, and call transfer behavior."
      },
      {
        name: "RingCentral",
        status: "validate",
        description: "Cloud telephony validation needed. Confirm SIP access, routing model, extension behavior, and transfer constraints."
      },
      {
        name: "Aircall",
        status: "validate",
        description: "Cloud telephony validation needed. Confirm whether the customer setup exposes SIP trunking or requires a provider-specific workflow."
      },
      {
        name: "Dialpad",
        status: "validate",
        description: "Cloud telephony validation needed. Confirm SIP trunk availability, routing rules, and transfer path before promising support."
      },
      {
        name: "8x8",
        status: "validate",
        description: "Cloud PBX validation needed. Confirm SIP trunking, number routing, region, codecs, and outbound behavior."
      },
      {
        name: "Genesys Cloud",
        status: "validate",
        description: "Contact-center validation needed. Confirm SIP trunking, queues/flows, transfer behavior, and operational limits."
      },
      {
        name: "Five9",
        status: "validate",
        description: "Contact-center validation needed. Confirm SIP access, campaign routing, transfer behavior, and compliance constraints."
      },
      {
        name: "Talkdesk",
        status: "validate",
        description: "Contact-center validation needed. Confirm SIP connectivity, routing flow, transfer path, and call-record expectations."
      },
      {
        name: "Zoom Phone",
        status: "validate",
        description: "Cloud phone validation needed. Confirm region support, SIP trunk access, routing rules, caller ID, and transfer behavior."
      },
      {
        name: "Other SIP providers or PBX systems",
        status: "technicalReview",
        description: "Any SIP-capable provider may be evaluated, but compatibility depends on the customer's network, provider settings, and routing requirements."
      }
    ],
    intakeTitle: "Information needed for the first customer validation",
    intakeItems: [
      "provider or PBX name and version",
      "cloud or on-prem deployment",
      "inbound direction, outbound direction, or both",
      "SIP endpoint, authentication method, and allowed IPs",
      "number format, caller ID rules, and routing rules",
      "codec, RTP, NAT, firewall, and region constraints",
      "transfer behavior, destination context, and concurrency limits"
    ]
  },
  it: {
    title: "Integrazioni Telefonia",
    intro: [
      "Collega RocketAiFlow a trunk SIP, provider VoIP e sistemi PBX per far ricevere chiamate inbound agli AI voice agent, avviare campagne outbound e trasferire chiamate usando la tua infrastruttura telefonica.",
      "Parti da un setup documentato quando disponibile, oppure usa un percorso di validazione tecnica per ambienti SIP specifici del provider."
    ],
    statusLabels: {
      documented: "Disponibile",
      onRequest: "Su richiesta",
      validate: "Da validare",
      technicalReview: "Valutazione tecnica"
    },
    listTitle: "Lista integrazioni",
    integrations: [
      {
        name: "Sistemi PBX basati su Asterisk",
        status: "documented",
        description: "Setup trunk PJSIP documentato per inbound routing, campagne outbound e contesto di transfer.",
        href: "/integrations/telephony/asterisk-based-pbx-systems"
      },
      {
        name: "3CX",
        status: "onRequest",
        description: "Candidato per integrazione SIP/PBX. Valida direzione del trunk, outbound rules, routing inbound, codec, NAT e comportamento di transfer durante il primo setup."
      },
      {
        name: "Twilio SIP Trunking",
        status: "validate",
        description: "Provider SIP comune. Valida autenticazione, caller ID, header SIP, percorso media e routing numeri prima di documentare un flusso self-service."
      },
      {
        name: "Telnyx SIP Trunking",
        status: "validate",
        description: "Provider SIP comune. Valida numeri inbound, origination outbound, caller ID, comportamento di transfer e impostazioni media."
      },
      {
        name: "Vonage SIP",
        status: "validate",
        description: "Serve validazione specifica per autenticazione trunk, routing, caller ID e comportamento di transfer."
      },
      {
        name: "RingCentral",
        status: "validate",
        description: "Serve validazione cloud telephony. Conferma accesso SIP, modello di routing, comportamento degli interni e vincoli di transfer."
      },
      {
        name: "Aircall",
        status: "validate",
        description: "Serve validazione cloud telephony. Conferma se il setup cliente espone SIP trunking o richiede un workflow specifico del provider."
      },
      {
        name: "Dialpad",
        status: "validate",
        description: "Serve validazione cloud telephony. Conferma disponibilità SIP trunk, regole di routing e percorso di transfer prima di promettere supporto."
      },
      {
        name: "8x8",
        status: "validate",
        description: "Serve validazione cloud PBX. Conferma SIP trunking, routing numeri, regione, codec e comportamento outbound."
      },
      {
        name: "Genesys Cloud",
        status: "validate",
        description: "Serve validazione contact center. Conferma SIP trunking, code/flow, comportamento di transfer e limiti operativi."
      },
      {
        name: "Five9",
        status: "validate",
        description: "Serve validazione contact center. Conferma accesso SIP, routing campagna, comportamento di transfer e vincoli compliance."
      },
      {
        name: "Talkdesk",
        status: "validate",
        description: "Serve validazione contact center. Conferma connettività SIP, flusso di routing, percorso di transfer e aspettative sui call records."
      },
      {
        name: "Zoom Phone",
        status: "validate",
        description: "Serve validazione cloud phone. Conferma supporto regione, accesso SIP trunk, regole di routing, caller ID e comportamento di transfer."
      },
      {
        name: "Altri provider SIP o sistemi PBX",
        status: "technicalReview",
        description: "Ogni provider con SIP può essere valutato, ma la compatibilità dipende da rete cliente, impostazioni provider e requisiti di routing."
      }
    ],
    intakeTitle: "Informazioni necessarie per la prima validazione cliente",
    intakeItems: [
      "nome e versione del provider o PBX",
      "deployment cloud o on-prem",
      "direzione inbound, outbound o entrambe",
      "endpoint SIP, metodo di autenticazione e IP consentiti",
      "formato numeri, regole caller ID e regole di routing",
      "codec, RTP, NAT, firewall e vincoli di regione",
      "comportamento di transfer, contesto destinazione e limiti di concorrenza"
    ]
  }
};

function useTelephonyCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return telephonyCopy[locale];
}

function StatusPill({ status, labels }: { status: TelephonyStatus; labels: Record<TelephonyStatus, string> }) {
  return <span className={`docs-status-pill docs-status-pill-${status}`}>{labels[status]}</span>;
}

function IntegrationCard({ integration, labels }: { integration: TelephonyIntegration; labels: Record<TelephonyStatus, string> }) {
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

export function LocalizedTelephonyIntegrationsTitle() {
  return <>{useTelephonyCopy().title}</>;
}

export function LocalizedTelephonyIntegrationsIntro() {
  const copy = useTelephonyCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedTelephonyIntegrationsList() {
  const copy = useTelephonyCopy();

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

export function LocalizedTelephonyIntegrationsIntake() {
  const copy = useTelephonyCopy();

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
