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
  | "associateCampaign"
  | "associateAgent"
  | "mapping"
  | "fields"
  | "progress"
  | "uploadedFiles"
  | "issues"
  | "validation"
  | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs?: ReactNode[];
  callout?: ReactNode;
  items?: ReactNode[];
  orderedItems?: ReactNode[];
  screenshot?: {
    src: string;
    alt: string;
    caption: string;
    splitHorizontally?: boolean;
  };
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
  sections: Record<Exclude<SectionKey, "associate" | "fields" | "nextSteps">, SectionCopy>;
  fields: FieldRow[];
  imagePlaceholder: {
    label: string;
    title: string;
    description: string;
  };
  nextSteps: LinkCard[];
};

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

const contactInboundsUrl = "/run-workflows/inbound-ai/contact-inbounds#use-contact-data-in-the-agent";

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      <span>{children}</span>
    </Link>
  );
}

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
      associate: "Select the campaign or agent",
      associateCampaign: "Outbound campaign",
      associateAgent: "Inbound agent",
      mapping: "Minimum mapping",
      fields: "Contact fields",
      progress: "Track import progress",
      uploadedFiles: "Uploaded CSV files",
      issues: "Common import issues",
      validation: "Validation checklist",
      nextSteps: "Next steps"
    },
    sections: {
      prepareCsv: {
        title: "Prepare the CSV first",
        paragraphs: [<>For the minimum import, use a CSV with one column: <code>phone</code>.</>]
      },
      usage: {
        title: "Select the correct usage",
        paragraphs: [
          "Choose the usage based on where the list should be available.",
          "After you select Usage, RocketAiFlow automatically shows the campaign selector for outbound contacts or the agent selector for inbound contacts."
        ],
        callout: (
          <>
            Duplicate handling is different by usage. For inbound contacts, RocketAiFlow checks the phone number and does not insert contacts with the same number into the database. For outbound campaign contacts, this uniqueness check is not applied, so duplicate phone numbers are accepted.
          </>
        ),
        items: [
          <>Use <UiPill>AI Dialer Flows</UiPill> when contacts must be attached to an outbound campaign.</>,
          <>Use <UiPill>Inbound Ai</UiPill> when the agent must automatically retrieve the contact data associated with the caller phone number.</>
        ]
      },
      associateCampaign: {
        title: "Outbound campaign",
        paragraphs: [
          "For outbound, select the campaign that must receive the imported contacts. The contact can provide values for greetings, prompt variables, function context, and call review."
        ],
        callout: (
          <>
            Campaign contacts are consumed. A contact leaves the active list when the customer answers or when all retry attempts have been used. When the list is exhausted, upload new contacts or use the reload contacts option to make contacts available again.
          </>
        )
      },
      associateAgent: {
        title: "Inbound agent",
        paragraphs: [
          <>For inbound, select the agent that must use the imported contacts through <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink>.</>
        ],
        callout: (
          <>
            <strong>Inbound contact lookup:</strong> inbound template variables work only when the agent can retrieve contact data and <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink> has a contact whose phone number matches the caller.
          </>
        ),
        orderedItems: [
          <>Agent settings allow contact lookup from <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink>.</>,
          <><InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink> contains a loaded list with a contact matching the caller phone number.</>
        ],
        items: [
          "If a template variable does not exist on the matched contact, it is not rendered.",
          "Custom values should be stored as key-value pairs inside data, so templates can use paths such as {t.data.birthDate}."
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
      uploadedFiles: {
        title: "Uploaded CSV files",
        paragraphs: [
          "The uploaded CSV list shows every import file and the available actions for each file. Use it to review previous uploads, check the import state, and access options such as reloading contacts when a campaign needs contacts again."
        ],
        screenshot: {
          src: "/screenshots/docs/contact-import-files-list.png",
          alt: "RocketAiFlow uploaded CSV files list with import status and available actions.",
          caption: "Uploaded CSV files list",
          splitHorizontally: true
        }
      },
      issues: {
        title: "Common import issues",
        items: [
          "phone values are missing or malformed",
          "the wrong column is mapped to Phone"
        ]
      },
      validation: {
        title: "Validation checklist",
        items: [
          "the expected number of contacts was processed",
          "valid rows were inserted",
          "failed rows are understood"
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
        href: "/run-workflows/call-records",
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
      associate: "Seleziona la campagna o l'agente",
      associateCampaign: "Campagna outbound",
      associateAgent: "Agente inbound",
      mapping: "Mappatura minima",
      fields: "Campi del contatto",
      progress: "Controlla l'avanzamento import",
      uploadedFiles: "File CSV caricati",
      issues: "Problemi comuni di import",
      validation: "Checklist di validazione",
      nextSteps: "Prossimi passi"
    },
    sections: {
      prepareCsv: {
        title: "Prepara prima il CSV",
        paragraphs: [<>Per l'import minimo basta un CSV con una sola colonna: <code>phone</code>.</>]
      },
      usage: {
        title: "Seleziona l'uso corretto",
        paragraphs: [
          "Scegli l'uso in base a dove la lista deve essere disponibile.",
          "Dopo aver selezionato Usage, RocketAiFlow mostra automaticamente la campagna per i contatti outbound oppure l'agente per i contatti inbound."
        ],
        callout: (
          <>
            La gestione dei duplicati cambia in base all'uso. Per i contatti inbound, RocketAiFlow controlla il numero di telefono e non inserisce nel database contatti con lo stesso numero. Per i contatti di una campagna outbound, questo controllo di unicità non viene applicato: i duplicati vengono accettati.
          </>
        ),
        items: [
          <>Usa <UiPill>AI Dialer Flows</UiPill> quando i contatti devono essere collegati a una campagna outbound.</>,
          <>Usa <UiPill>Inbound Ai</UiPill> quando l'agente deve recuperare automaticamente i dati del contatto associato al numero che sta chiamando.</>
        ]
      },
      associateCampaign: {
        title: "Campagna outbound",
        paragraphs: [
          "Per l'outbound, seleziona la campagna che deve ricevere i contatti importati. Il contatto può fornire valori per greeting, variabili del prompt, contesto delle functions e review della chiamata."
        ],
        callout: (
          <>
            I contatti importati nella campagna vengono consumati. Un contatto esce dalla lista attiva quando il customer risponde oppure quando tutti i tentativi previsti sono stati eseguiti e viene raggiunto il retry massimo. Quando la lista è esaurita, carica nuovi contatti oppure usa l'opzione ricarica contatti per renderli di nuovo disponibili.
          </>
        )
      },
      associateAgent: {
        title: "Agente inbound",
        paragraphs: [
          <>Per l'inbound, seleziona l'agente che deve usare i contatti importati tramite <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink>.</>
        ],
        callout: (
          <>
            <strong>Recupero contatto inbound:</strong> le variabili inbound funzionano solo quando l'agente può recuperare i dati contatto e <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> contiene un contatto con numero di telefono uguale al chiamante.
          </>
        ),
        orderedItems: [
          <>Gli Agent settings permettono il recupero del contatto da <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink>.</>,
          <><InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> contiene una lista caricata con un contatto che corrisponde al numero chiamante.</>
        ],
        items: [
          "Se una variabile del template non esiste sul contatto trovato, non viene renderizzata.",
          "I valori custom devono essere salvati come key-value dentro data, così i template possono usare percorsi come {t.data.birthDate}."
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
      uploadedFiles: {
        title: "File CSV caricati",
        paragraphs: [
          "La lista dei file CSV caricati mostra tutti gli import e le opzioni disponibili per ogni file. Usala per rivedere gli upload precedenti, controllare lo stato dell'import e accedere ad azioni come ricarica contatti quando una campagna deve rendere nuovamente disponibili i contatti."
        ],
        screenshot: {
          src: "/screenshots/docs/contact-import-files-list.png",
          alt: "Lista file CSV caricati in RocketAiFlow con stato import e opzioni disponibili.",
          caption: "Lista file CSV caricati",
          splitHorizontally: true
        }
      },
      issues: {
        title: "Problemi comuni di import",
        items: [
          "i valori phone sono mancanti o non validi",
          "la colonna sbagliata è stata mappata su Phone"
        ]
      },
      validation: {
        title: "Checklist di validazione",
        items: [
          "il numero atteso di contatti è stato processato",
          "le righe valide sono state inserite",
          "le righe fallite sono comprese"
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
        href: "/run-workflows/call-records",
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

export function LocalizedImportContactsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "associate" | "fields" | "nextSteps"> }) {
  const { copy } = useImportContactsCopy();
  const section = copy.sections[sectionKey];

  return (
    <section className="docs-home-section">
      {section.paragraphs?.map((paragraph, index) => (
        <p key={`p-${index}`}>{paragraph}</p>
      ))}
      {section.callout ? (
        <div className="docs-feature-callout docs-feature-callout-warning">
          <div className="docs-feature-callout-body">{section.callout}</div>
        </div>
      ) : null}
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
      {section.screenshot?.splitHorizontally ? (
        <figure className="docs-screenshot">
          <div className="docs-screenshot-horizontal-split-grid">
            {(["left", "right"] as const).map((crop) => (
              <div className={`docs-screenshot-frame docs-screenshot-horizontal-split-frame docs-screenshot-horizontal-split-frame-${crop}`} key={crop}>
                <img
                  className={`docs-screenshot-img docs-screenshot-horizontal-split-img docs-screenshot-horizontal-split-img-${crop}`}
                  src={section.screenshot?.src}
                  alt={`${section.screenshot?.alt} ${crop === "left" ? "left side" : "right side"}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <figcaption className="docs-screenshot-caption">{section.screenshot.caption}</figcaption>
        </figure>
      ) : section.screenshot ? (
        <figure className="docs-screenshot">
          <div className="docs-screenshot-frame">
            <img className="docs-screenshot-img" src={section.screenshot.src} alt={section.screenshot.alt} loading="lazy" />
          </div>
          <figcaption className="docs-screenshot-caption">{section.screenshot.caption}</figcaption>
        </figure>
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
    <figure className="docs-screenshot docs-screenshot-half">
      <div className="docs-screenshot-frame">
        <img
          className="docs-screenshot-img"
          src="/screenshots/docs/contact-import.png"
          alt={copy.imagePlaceholder.description}
          loading="lazy"
        />
      </div>
      <figcaption className="docs-screenshot-caption">{copy.imagePlaceholder.title}</figcaption>
    </figure>
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
