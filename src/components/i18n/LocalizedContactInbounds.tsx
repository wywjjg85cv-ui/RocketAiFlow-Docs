"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey = "manageContacts" | "agentFilters" | "listActions" | "templateData" | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type ContactInboundsCopy = {
  title: string;
  intro: ReactNode[];
  templateCallout: ReactNode;
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshotAlt: string;
  screenshotCaption: string;
  nextSteps: LinkCard[];
};

const screenshotPath = "/screenshots/docs/contact-inbounds-list.png";
const agentSettingsUrl = "/build/create-your-first-ai-voice-agent#agent-settings";

function VariableBadge({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      <span>{children}</span>
    </Link>
  );
}

const contactInboundsCopy: Record<Locale, ContactInboundsCopy> = {
  en: {
    title: "Contact Inbounds",
    intro: [
      "Contact Inbounds is where you manage the contact records available to inbound agents.",
      "When an inbound call arrives, RocketAiFlow can match the caller phone number with one of these contacts and make that data available to the selected agent."
    ],
    templateCallout: (
      <>
        Inbound template variables render only when the agent has contact lookup enabled and Contact Inbounds contains a contact list associated with that agent with a phone number matching the caller. If there is no match, variables such as <VariableBadge>{`{t.name}`}</VariableBadge> or <VariableBadge>{`{t.data.birthDate}`}</VariableBadge> are not rendered.
      </>
    ),
    headings: {
      manageContacts: "Manage inbound contacts",
      agentFilters: "Filter by agent",
      listActions: "Manage the list",
      templateData: "Use contact data in the agent",
      nextSteps: "Next steps"
    },
    sections: {
      manageContacts: {
        title: "Manage inbound contacts",
        paragraphs: [
          "From this page you can add new inbound contacts, edit existing records, update contact details, and remove contacts that should no longer be used.",
          "In practical terms, this is the place where you keep the inbound contact list clean and ready for caller matching."
        ],
        items: [
          "use Add Contact Inbound to create a new contact",
          "use Edit to update an existing contact",
          "use Delete to remove a contact from inbound matching",
          "use search to find a customer by name, phone, or related contact data"
        ]
      },
      agentFilters: {
        title: "Filter by agent",
        paragraphs: [
          "Use the agent filter when different voice agents use different inbound contact lists.",
          "After selecting an agent, the table shows only the contacts associated with that agent, making review and cleanup easier."
        ]
      },
      listActions: {
        title: "Manage the list",
        paragraphs: [
          "The top actions let you refresh the table, import or export data, and remove a contact list when it should no longer be used.",
          "Deleting a list removes those contacts from inbound matching, so use it only when the list is obsolete or was imported incorrectly."
        ]
      },
      templateData: {
        title: "Use contact data in the agent",
        paragraphs: [
          <>If <InlineDocsLink href={agentSettingsUrl}>Agent settings</InlineDocsLink> allow contact lookup for templates, the matched contact can provide values for greetings, prompt variables, and function context.</>,
          "Those contact fields become dynamic variables available to the agent. When the agent uses a template variable, RocketAiFlow replaces the placeholder with the value stored on the matched inbound contact.",
          "This is useful when the agent should personalize the conversation based on the caller's stored name, phone, contact id, or custom data fields."
        ]
      }
    },
    screenshotAlt: "Contact Inbounds page showing agent filter, customer search, contact table, edit and delete actions, import and list management buttons.",
    screenshotCaption: "Contact Inbounds list with agent filter, customer search, contact rows, and list actions.",
    nextSteps: [
      {
        title: "Import Contacts",
        href: "/run-workflows/import-contacts",
        description: "Upload a CSV and associate inbound contacts with the agent that should use them."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Connect the agent to a real inbound trunk route after the contact list is ready."
      }
    ]
  },
  it: {
    title: "Contatti inbound",
    intro: [
      "Contatti inbound è la sezione dove gestisci i contatti disponibili per gli agenti inbound.",
      "Quando arriva una chiamata inbound, RocketAiFlow può associare il numero chiamante a uno di questi contatti e rendere quei dati disponibili all'agente selezionato."
    ],
    templateCallout: (
      <>
        Le variabili inbound vengono renderizzate solo se l'agente ha il recupero contatto abilitato e Contatti inbound contiene una lista associata a quell'agente con un numero che corrisponde al chiamante. Se non c'è corrispondenza, variabili come <VariableBadge>{`{t.name}`}</VariableBadge> o <VariableBadge>{`{t.data.birthDate}`}</VariableBadge> non vengono renderizzate.
      </>
    ),
    headings: {
      manageContacts: "Gestisci i contatti inbound",
      agentFilters: "Filtra per agente",
      listActions: "Gestisci la lista",
      templateData: "Usa i dati contatto nell'agente",
      nextSteps: "Prossimi passi"
    },
    sections: {
      manageContacts: {
        title: "Gestisci i contatti inbound",
        paragraphs: [
          "Da questa pagina puoi aggiungere nuovi contatti inbound, modificare contatti esistenti, aggiornare i dettagli e rimuovere i contatti che non devono più essere usati.",
          "In pratica, questa è l'area dove mantieni pulita e pronta la lista dei contatti usata per riconoscere chi sta chiamando."
        ],
        items: [
          "usa Add Contact Inbound per creare un nuovo contatto",
          "usa Edit per aggiornare un contatto esistente",
          "usa Delete per rimuovere un contatto dal matching inbound",
          "usa la ricerca per trovare un customer per nome, telefono o altri dati collegati"
        ]
      },
      agentFilters: {
        title: "Filtra per agente",
        paragraphs: [
          "Usa il filtro per agente quando agenti diversi devono usare liste contatti inbound diverse.",
          "Dopo aver selezionato un agente, la tabella mostra solo i contatti associati a quell'agente, così review e pulizia sono più semplici."
        ]
      },
      listActions: {
        title: "Gestisci la lista",
        paragraphs: [
          "Le azioni in alto permettono di aggiornare la tabella, importare o esportare dati ed eliminare una lista di contatti quando non deve più essere usata.",
          "Eliminare una lista rimuove quei contatti dal matching inbound: usalo solo quando la lista è obsoleta o è stata importata in modo errato."
        ]
      },
      templateData: {
        title: "Usa i dati contatto nell'agente",
        paragraphs: [
          <>Se negli <InlineDocsLink href={agentSettingsUrl}>Agent settings</InlineDocsLink> è abilitato il recupero del contatto per i template, il contatto trovato può fornire valori per greeting, variabili del prompt e contesto delle functions.</>,
          "Questi campi diventano variabili dinamiche disponibili all'agente. Quando l'agente usa una variabile del template, RocketAiFlow sostituisce il placeholder con il valore salvato sul contatto inbound trovato.",
          "È utile quando l'agente deve personalizzare la conversazione usando nome, telefono, contact id o campi custom salvati sul contatto."
        ]
      }
    },
    screenshotAlt: "Pagina Contatti inbound con filtro agente, ricerca customer, tabella contatti, azioni edit e delete, import e gestione lista.",
    screenshotCaption: "Lista Contatti inbound con filtro agente, ricerca customer, righe contatto e azioni lista.",
    nextSteps: [
      {
        title: "Importa contatti",
        href: "/run-workflows/import-contacts",
        description: "Carica un CSV e associa i contatti inbound all'agente che deve usarli."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Collega l'agente a una route trunk inbound reale quando la lista contatti è pronta."
      }
    ]
  }
};

function useContactInboundsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: contactInboundsCopy[locale], locale };
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

export function LocalizedContactInboundsTitle() {
  return <>{useContactInboundsCopy().copy.title}</>;
}

export function LocalizedContactInboundsIntro() {
  const { copy } = useContactInboundsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="docs-feature-callout docs-feature-callout-warning">
        <div className="docs-feature-callout-body">{copy.templateCallout}</div>
      </div>
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          <img className="docs-screenshot-img" src={screenshotPath} alt={copy.screenshotAlt} loading="lazy" />
        </div>
        <figcaption className="docs-screenshot-caption">{copy.screenshotCaption}</figcaption>
      </figure>
    </section>
  );
}

export function LocalizedContactInboundsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return <>{useContactInboundsCopy().copy.headings[sectionKey]}</>;
}

export function LocalizedContactInboundsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  return <Section section={useContactInboundsCopy().copy.sections[sectionKey]} />;
}

export function LocalizedContactInboundsNextSteps() {
  const { copy, locale } = useContactInboundsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-2">
        {copy.nextSteps.map((card) => (
          <Link className="docs-home-card" href={localizeHref(card.href, locale)} key={card.href}>
            <span className="docs-home-card-title">{card.title}</span>
            <span className="docs-home-card-description">{card.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
