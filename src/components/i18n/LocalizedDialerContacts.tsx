"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey =
  | "manageContacts"
  | "automaticDialing"
  | "templateData"
  | "campaignActions"
  | "nextSteps";

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

type DialerContactsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshotAlt: string;
  screenshotCaption: string;
  nextSteps: LinkCard[];
};

const screenshotPath = "/screenshots/docs/dialer-contacts-list.png";

const dialerContactsCopy: Record<Locale, DialerContactsCopy> = {
  en: {
    title: "Campaign Contacts",
    intro: [
      "Campaign Contacts is where you manage the contacts attached to an AI Dialer Flow campaign.",
      "These contacts are the list the dialer uses to place outbound calls automatically. During the call, RocketAiFlow also provides the contact data to the selected agent so template variables can be replaced with the values of the contact being called."
    ],
    headings: {
      manageContacts: "Manage campaign contacts",
      automaticDialing: "Use contacts for automatic dialing",
      templateData: "Pass contact data to the agent",
      campaignActions: "Review and manage the list",
      nextSteps: "Next steps"
    },
    sections: {
      manageContacts: {
        title: "Manage campaign contacts",
        paragraphs: [
          "From this page you can add contacts to a campaign, edit existing contacts, update scheduled call details, and remove contacts that should no longer be used by the dialer.",
          "Use the campaign filter when you need to review only the contacts connected to a specific outbound campaign."
        ],
        items: [
          "use Add Contact to create a campaign contact manually",
          "use Edit to update an existing campaign contact",
          "use Delete to remove a contact from the campaign list",
          "use search and campaign filters to find a customer quickly"
        ]
      },
      automaticDialing: {
        title: "Use contacts for automatic dialing",
        paragraphs: [
          "The dialer reads this list when the campaign is active and inside its configured schedule window.",
          "A contact becomes eligible for a call based on campaign schedule, Scheduled At, availability, priority, retry rules, and concurrent call capacity."
        ],
        items: [
          "Scheduled At controls when the contact can be called",
          "Availability shows whether the contact is currently available for dialing",
          "Priority helps control the order in which contacts are selected",
          "CampaignId confirms which campaign owns the contact"
        ]
      },
      templateData: {
        title: "Pass contact data to the agent",
        paragraphs: [
          "When the dialer calls a contact, RocketAiFlow automatically makes that contact data available to the agent selected in the campaign.",
          "If the agent greeting, prompt, or function configuration uses template variables, RocketAiFlow replaces those placeholders with values from the current contact.",
          "This includes standard values such as phone, name, contact id, priority, scheduled time and campaign id, plus custom fields stored in data when they are present on the contact."
        ]
      },
      campaignActions: {
        title: "Review and manage the list",
        paragraphs: [
          "The top actions help you filter contacts, refresh the table, download data when needed, delete selected records, and add a new contact.",
          "Use this page when you need to understand exactly which contacts are still available to a campaign and which data will be passed into the agent at call time."
        ]
      }
    },
    screenshotAlt: "Campaign Contacts page showing campaign filter, customer search, contact table, scheduled time, availability, priority, campaign id and contact actions.",
    screenshotCaption: "Campaign Contacts list with campaign filter, customer search, scheduled contact data and row actions.",
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Configure campaign schedule, trunk, agent, retry rules and concurrent call capacity."
      },
      {
        title: "Import Contacts",
        href: "/run-workflows/import-contacts",
        description: "Upload a CSV and associate contacts with an outbound campaign."
      },
      {
        title: "Call Records",
        href: "/run-workflows/call-records",
        description: "Review the call result after the dialer has called campaign contacts."
      }
    ]
  },
  it: {
    title: "Contatti campagna",
    intro: [
      "Contatti campagna è la sezione dove gestisci i contatti collegati a una campagna AI Dialer Flow.",
      "Questi contatti sono la lista che il dialer usa per effettuare chiamate outbound automatiche. Durante la chiamata, RocketAiFlow fornisce anche i dati del contatto all'agente selezionato, così le variabili del template possono essere sostituite con i valori del contatto che sta venendo chiamato."
    ],
    headings: {
      manageContacts: "Gestisci i contatti campagna",
      automaticDialing: "Usa i contatti per il dialer automatico",
      templateData: "Passa i dati contatto all'agente",
      campaignActions: "Rivedi e gestisci la lista",
      nextSteps: "Prossimi passi"
    },
    sections: {
      manageContacts: {
        title: "Gestisci i contatti campagna",
        paragraphs: [
          "Da questa pagina puoi aggiungere contatti a una campagna, modificare contatti esistenti, aggiornare i dettagli di schedulazione e rimuovere i contatti che non devono più essere usati dal dialer.",
          "Usa il filtro campagna quando devi vedere solo i contatti collegati a una specifica campagna outbound."
        ],
        items: [
          "usa Add Contact per creare manualmente un contatto campagna",
          "usa Edit per aggiornare un contatto campagna esistente",
          "usa Delete per rimuovere un contatto dalla lista della campagna",
          "usa ricerca e filtri campagna per trovare rapidamente un customer"
        ]
      },
      automaticDialing: {
        title: "Usa i contatti per il dialer automatico",
        paragraphs: [
          "Il dialer legge questa lista quando la campagna è attiva e si trova dentro la finestra oraria configurata.",
          "Un contatto diventa disponibile per la chiamata in base a schedule della campagna, Pianificato per, availability, priority, retry rules e concurrent call capacity."
        ],
        items: [
          "Pianificato per controlla quando il contatto può essere chiamato",
          "Availability mostra se il contatto è disponibile per il dialer",
          "Priority aiuta a controllare l'ordine con cui i contatti vengono selezionati",
          "CampaignId conferma a quale campagna appartiene il contatto"
        ]
      },
      templateData: {
        title: "Passa i dati contatto all'agente",
        paragraphs: [
          "Quando il dialer chiama un contatto, RocketAiFlow rende automaticamente disponibili quei dati all'agente selezionato nella campagna.",
          "Se greeting, prompt o configurazione delle function dell'agente usano variabili template, RocketAiFlow sostituisce quei placeholder con i valori del contatto corrente.",
          "Questo include valori standard come phone, name, contact id, priority, scheduled time e campaign id, più i campi custom salvati in data quando sono presenti sul contatto."
        ]
      },
      campaignActions: {
        title: "Rivedi e gestisci la lista",
        paragraphs: [
          "Le azioni in alto permettono di filtrare i contatti, aggiornare la tabella, scaricare dati quando serve, eliminare record selezionati e aggiungere un nuovo contatto.",
          "Usa questa pagina quando devi capire quali contatti sono ancora disponibili per una campagna e quali dati verranno passati all'agente durante la chiamata."
        ]
      }
    },
    screenshotAlt: "Pagina Contatti campagna con filtro campagna, ricerca customer, tabella contatti, data pianificata, availability, priority, campaign id e azioni contatto.",
    screenshotCaption: "Lista Contatti campagna con filtro campagna, ricerca customer, dati pianificati e azioni riga.",
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Configura schedule campagna, trunk, agente, retry rules e concurrent call capacity."
      },
      {
        title: "Importa contatti",
        href: "/run-workflows/import-contacts",
        description: "Carica un CSV e associa i contatti a una campagna outbound."
      },
      {
        title: "Registro chiamate",
        href: "/run-workflows/call-records",
        description: "Rivedi il risultato della chiamata dopo che il dialer ha chiamato i contatti campagna."
      }
    ]
  }
};

function useDialerContactsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: dialerContactsCopy[locale], locale };
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

function SplitScreenshot({ copy }: { copy: DialerContactsCopy }) {
  return (
    <figure className="docs-screenshot">
      <div className="docs-screenshot-even-split-grid">
        <div className="docs-screenshot-frame docs-screenshot-even-split-frame">
          <img
            className="docs-screenshot-img docs-screenshot-even-split-img"
            src={screenshotPath}
            alt={copy.screenshotAlt}
            loading="lazy"
          />
        </div>
        <div className="docs-screenshot-frame docs-screenshot-even-split-frame">
          <img
            className="docs-screenshot-img docs-screenshot-even-split-img docs-screenshot-even-split-img-right"
            src={screenshotPath}
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </div>
      </div>
      <figcaption className="docs-screenshot-caption">{copy.screenshotCaption}</figcaption>
    </figure>
  );
}

export function LocalizedDialerContactsTitle() {
  return <>{useDialerContactsCopy().copy.title}</>;
}

export function LocalizedDialerContactsIntro() {
  const { copy } = useDialerContactsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <SplitScreenshot copy={copy} />
    </section>
  );
}

export function LocalizedDialerContactsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return <>{useDialerContactsCopy().copy.headings[sectionKey]}</>;
}

export function LocalizedDialerContactsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  return <Section section={useDialerContactsCopy().copy.sections[sectionKey]} />;
}

export function LocalizedDialerContactsNextSteps() {
  const { copy, locale } = useDialerContactsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-3">
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
