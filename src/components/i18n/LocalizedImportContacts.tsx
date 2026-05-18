"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey =
  | "prepareCsv"
  | "usage"
  | "associate"
  | "mapping"
  | "fields"
  | "progress"
  | "issues"
  | "validation"
  | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
  orderedItems?: ReactNode[];
};

type FieldRow = {
  field: string;
  required: string;
  purpose: string;
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type ImportContactsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "fields" | "nextSteps">, SectionCopy>;
  fields: FieldRow[];
  imagePlaceholder: {
    label: string;
    title: string;
    description: string;
  };
  nextSteps: LinkCard[];
};

const importContactsCopy: Record<Locale, ImportContactsCopy> = {
  en: {
    title: "Import Contacts",
    intro: [
      "Import Contacts lets you upload a CSV and decide where those contacts should be used.",
      "Contacts can be associated with an outbound dialer campaign or with an agent for inbound contact lookup."
    ],
    headings: {
      prepareCsv: "Prepare the CSV first",
      usage: "Select the correct usage",
      associate: "Associate contacts with a campaign or agent",
      mapping: "Minimum mapping",
      fields: "Contact fields",
      progress: "Track import progress",
      issues: "Common import issues",
      validation: "Validation checklist",
      nextSteps: "Next steps"
    },
    sections: {
      prepareCsv: {
        title: "Prepare the CSV first",
        paragraphs: ["Use a simple CSV with the fields you want RocketAiFlow to save on each contact."],
        items: ["phone", "contactId", "name", "surname", "data", "priority", "scheduledAt"]
      },
      usage: {
        title: "Select the correct usage",
        paragraphs: ["Choose the usage based on where the list should be available."],
        items: [
          "Use AI Dialer Flows when the contacts must be attached to an outbound campaign.",
          "Use the agent/inbound contact usage when contacts must be available to an agent for inbound lookup."
        ]
      },
      associate: {
        title: "Associate contacts with a campaign or agent",
        paragraphs: [
          "Use campaign association when the dialer must call the contacts. The contact can then provide values for greetings, prompt variables, function context, and call review.",
          "Use agent association when inbound calls should recover contact information through Contact Inbounds."
        ],
        orderedItems: [
          "Agent settings allow contact lookup from Contact Inbounds.",
          "Contact Inbounds contains a loaded list with a contact matching the caller phone number."
        ],
        items: [
          "If a template variable does not exist on the matched contact, it is not rendered.",
          "Custom values should be stored as key-value pairs inside data, so templates can use paths such as {t.data.cf}."
        ]
      },
      mapping: {
        title: "Minimum mapping",
        paragraphs: ["Map at least Phone. All other fields are optional, but column names should be clear and consistent before upload."]
      },
      progress: {
        title: "Track import progress",
        paragraphs: ["After the import starts, review the import counters to understand whether the file was accepted cleanly."],
        items: ["Processed", "Inserted", "Failed", "Skipped"]
      },
      issues: {
        title: "Common import issues",
        items: [
          "phone values are missing or malformed",
          "the wrong column is mapped to Phone",
          "the CSV contains duplicate or incomplete rows",
          "the campaign is started before the import is reviewed"
        ]
      },
      validation: {
        title: "Validation checklist",
        items: [
          "the expected number of contacts was processed",
          "valid rows were inserted",
          "failed rows are understood",
          "the mapped phone data is usable for outbound calling"
        ]
      }
    },
    fields: [
      { field: "phone", required: "Yes", purpose: "Destination phone number used for the outbound call." },
      { field: "contactId", required: "No", purpose: "External identifier used to correlate RocketAiFlow contacts and calls with CRM, database, or source-system records." },
      { field: "name", required: "No", purpose: "Contact first name, available for personalization and context." },
      { field: "surname", required: "No", purpose: "Contact surname, available for personalization and context." },
      { field: "data", required: "No", purpose: "Free JSON object for custom fields. Values here are available during the call and can be used as agent context." },
      { field: "priority", required: "No", purpose: "Contact priority. If omitted, RocketAiFlow loads the contact with priority 1. Higher priority contacts are selected first." },
      { field: "scheduledAt", required: "No", purpose: "Date and time when the contact becomes eligible for calling." }
    ],
    imagePlaceholder: {
      label: "Image placeholder",
      title: "CSV import and field mapping",
      description: "Import Contacts screen showing CSV upload and field mapping for phone, contactId, name, surname, data, priority, and scheduledAt."
    },
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Return to the campaign and attach the imported contacts to the outbound workflow."
      },
      {
        title: "Call Records",
        href: "/run-workflows/ai-dialer-flows/call-records",
        description: "Review the outcome after outbound calls start running."
      }
    ]
  },
  it: {
    title: "Importa contatti",
    intro: [
      "Importa contatti permette di caricare un CSV e decidere dove quei contatti devono essere usati.",
      "I contatti possono essere associati a una campagna outbound del dialer oppure a un agente per il recupero del contatto nelle chiamate inbound."
    ],
    headings: {
      prepareCsv: "Prepara prima il CSV",
      usage: "Seleziona l'uso corretto",
      associate: "Associa i contatti a una campagna o a un agente",
      mapping: "Mappatura minima",
      fields: "Campi del contatto",
      progress: "Controlla l'avanzamento import",
      issues: "Problemi comuni di import",
      validation: "Checklist di validazione",
      nextSteps: "Prossimi passi"
    },
    sections: {
      prepareCsv: {
        title: "Prepara prima il CSV",
        paragraphs: ["Usa un CSV semplice con i campi che vuoi salvare su ogni contatto RocketAiFlow."],
        items: ["phone", "contactId", "name", "surname", "data", "priority", "scheduledAt"]
      },
      usage: {
        title: "Seleziona l'uso corretto",
        paragraphs: ["Scegli l'uso in base a dove la lista deve essere disponibile."],
        items: [
          "Usa AI Dialer Flows quando i contatti devono essere collegati a una campagna outbound.",
          "Usa l'associazione agente/inbound quando i contatti devono essere disponibili a un agente per il lookup inbound."
        ]
      },
      associate: {
        title: "Associa i contatti a una campagna o a un agente",
        paragraphs: [
          "Usa l'associazione alla campagna quando il dialer deve chiamare i contatti. Il contatto può fornire valori per greeting, variabili del prompt, contesto delle functions e review della chiamata.",
          "Usa l'associazione all'agente quando le chiamate inbound devono recuperare le informazioni del contatto tramite Contatti inbound."
        ],
        orderedItems: [
          "Gli Agent settings permettono il recupero del contatto da Contatti inbound.",
          "Contatti inbound contiene una lista caricata con un contatto che corrisponde al numero chiamante."
        ],
        items: [
          "Se una variabile del template non esiste sul contatto trovato, non viene renderizzata.",
          "I valori custom devono essere salvati come key-value dentro data, così i template possono usare percorsi come {t.data.cf}."
        ]
      },
      mapping: {
        title: "Mappatura minima",
        paragraphs: ["Mappa almeno Phone. Tutti gli altri campi sono opzionali, ma i nomi colonna devono essere chiari e coerenti prima dell'upload."]
      },
      progress: {
        title: "Controlla l'avanzamento import",
        paragraphs: ["Dopo l'avvio dell'import, rivedi i contatori per capire se il file è stato accettato correttamente."],
        items: ["Processed", "Inserted", "Failed", "Skipped"]
      },
      issues: {
        title: "Problemi comuni di import",
        items: [
          "i valori phone sono mancanti o non validi",
          "la colonna sbagliata è stata mappata su Phone",
          "il CSV contiene righe duplicate o incomplete",
          "la campagna viene avviata prima di rivedere l'import"
        ]
      },
      validation: {
        title: "Checklist di validazione",
        items: [
          "il numero atteso di contatti è stato processato",
          "le righe valide sono state inserite",
          "le righe fallite sono comprese",
          "il dato telefonico mappato è utilizzabile per le chiamate outbound"
        ]
      }
    },
    fields: [
      { field: "phone", required: "Sì", purpose: "Numero di telefono di destinazione usato per la chiamata outbound." },
      { field: "contactId", required: "No", purpose: "Identificatore esterno usato per collegare contatti e chiamate RocketAiFlow a CRM, database o sistemi sorgente." },
      { field: "name", required: "No", purpose: "Nome del contatto, disponibile per personalizzazione e contesto." },
      { field: "surname", required: "No", purpose: "Cognome del contatto, disponibile per personalizzazione e contesto." },
      { field: "data", required: "No", purpose: "Oggetto JSON libero per campi custom. I valori qui salvati sono disponibili durante la chiamata e possono essere usati come contesto dell'agente." },
      { field: "priority", required: "No", purpose: "Priorità del contatto. Se omessa, RocketAiFlow carica il contatto con priorità 1. I contatti con priorità più alta vengono selezionati prima." },
      { field: "scheduledAt", required: "No", purpose: "Data e ora in cui il contatto diventa idoneo per essere chiamato." }
    ],
    imagePlaceholder: {
      label: "Placeholder immagine",
      title: "Import CSV e mappatura campi",
      description: "Schermata Importa contatti con upload CSV e mappatura dei campi phone, contactId, name, surname, data, priority e scheduledAt."
    },
    nextSteps: [
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Torna alla campagna e collega i contatti importati al workflow outbound."
      },
      {
        title: "Registro chiamate",
        href: "/run-workflows/ai-dialer-flows/call-records",
        description: "Rivedi il risultato dopo l'avvio delle chiamate outbound."
      }
    ]
  }
};

function useImportContactsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: importContactsCopy[locale], locale };
}

export function LocalizedImportContactsTitle() {
  return useImportContactsCopy().copy.title;
}

export function LocalizedImportContactsIntro() {
  const { copy } = useImportContactsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedImportContactsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return useImportContactsCopy().copy.headings[sectionKey];
}

export function LocalizedImportContactsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "fields" | "nextSteps"> }) {
  const { copy } = useImportContactsCopy();
  const section = copy.sections[sectionKey];

  return (
    <section className="docs-home-section">
      {section.paragraphs?.map((paragraph, index) => (
        <p key={`p-${index}`}>{paragraph}</p>
      ))}
      {section.orderedItems ? (
        <ol>
          {section.orderedItems.map((item, index) => (
            <li key={`ordered-${index}`}>{item}</li>
          ))}
        </ol>
      ) : null}
      {section.items ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LocalizedImportContactsFieldTable() {
  const { copy } = useImportContactsCopy();

  return (
    <section className="docs-home-section">
      <table className="docs-field-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>{copy.fields[0]?.required === "Sì" ? "Obbligatorio" : "Required"}</th>
            <th>{copy.fields[0]?.required === "Sì" ? "Uso" : "Purpose"}</th>
          </tr>
        </thead>
        <tbody>
          {copy.fields.map((field) => (
            <tr key={field.field}>
              <td><code>{field.field}</code></td>
              <td>{field.required}</td>
              <td>{field.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LocalizedImportContactsPlaceholder />
    </section>
  );
}

export function LocalizedImportContactsPlaceholder() {
  const { copy } = useImportContactsCopy();
  return (
    <div className="docs-image-placeholder">
      <div className="docs-image-placeholder-box" aria-label={`Image placeholder: ${copy.imagePlaceholder.title}`}>
        <p className="docs-image-placeholder-label">{copy.imagePlaceholder.label}</p>
        <p className="docs-image-placeholder-title">{copy.imagePlaceholder.title}</p>
        <p className="docs-image-placeholder-description">{copy.imagePlaceholder.description}</p>
      </div>
    </div>
  );
}

export function LocalizedImportContactsNextSteps() {
  const { copy, locale } = useImportContactsCopy();

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
