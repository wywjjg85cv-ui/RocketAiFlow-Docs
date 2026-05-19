"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey =
  | "whereToGo"
  | "campaignForm"
  | "campaignList"
  | "realtime"
  | "afterCalls"
  | "nextSteps";

type ScreenshotKey = "campaignsList" | "campaignForm";

type CardCopy = {
  title: string;
  href: string;
  description: string;
};

type CampaignField = {
  field: string;
  value: string;
  note: ReactNode;
};

type ScreenshotPanel = {
  title: string;
  description: string;
  crop: "top" | "bottom";
};

type SectionCopy = {
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
  fields?: CampaignField[];
  fieldGroups?: {
    title: string;
    fields: CampaignField[];
  }[];
};

type AiDialerFlowsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  tableHeaders: {
    field: string;
    example: string;
    use: string;
  };
  screenshotLabel: string;
  screenshotReplace: string;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshots: Record<ScreenshotKey, { title: string; description: string; src?: string; alt?: string; panels?: ScreenshotPanel[] }>;
  nextSteps: {
    cards: CardCopy[];
  };
};

const aiDialerFlowsCopy: Record<Locale, AiDialerFlowsCopy> = {
  en: {
    title: "AI Dialer Flows",
    intro: [
      "AI Dialer Flows is where you create and manage outbound Dialer Campaigns.",
      "Use this page when you want to connect a campaign, an agent, a trunk, scheduling rules, retry behavior, recording options, and contact execution into one outbound workflow. The campaign also defines where the call is connected after the dialer reaches the customer."
    ],
    headings: {
      whereToGo: "Open Dialer Campaigns",
      campaignForm: "Configure the campaign",
      campaignList: "Read the campaigns table",
      realtime: "Realtime monitoring",
      afterCalls: "Review call results",
      nextSteps: "Next steps"
    },
    tableHeaders: {
      field: "Field",
      example: "Example",
      use: "Use"
    },
    screenshotLabel: "Screenshot",
    screenshotReplace: "Replace with real UI capture",
    sections: {
      whereToGo: {
        paragraphs: [
          "Go to AI Dialer Flows, open Dialer Campaigns, then press Add Campaign to create a new outbound campaign.",
          "The campaign is the operational object that tells RocketAiFlow which agent should call, which trunk should be used, how many concurrent calls are allowed, when the campaign is active, and how retry should work."
        ],
        bullets: [
          <>Use <strong>Add Campaign</strong> for a new campaign.</>,
          <>Use <strong>Edit Campaign</strong> when you need to update an existing campaign.</>,
          <>Use <strong>Concurrent Call Capacity</strong> to control how many calls the campaign can manage at the same time.</>
        ]
      },
      campaignForm: {
        paragraphs: [
          "The Edit Campaign form contains the core execution settings for a Dialer Campaign.",
          "Select the agent that should handle the conversation and the trunk that should place the outbound call. For advanced telephony setups, you can also write the trunk name directly and specify the context and extension where the call should be connected after the customer answers.",
          "Scheduling is part of the same campaign setup. Start and Until define the campaign lifetime, Timezone controls how weekdays and hours are interpreted, and Retry controls how unanswered contacts are rescheduled."
        ],
        fieldGroups: [
          {
            title: "Core campaign settings",
            fields: [
              {
                field: "Name",
                value: "test",
                note: "Campaign name shown in the campaign table and in monitoring."
              },
              {
                field: "Concurrent Call Capacity",
                value: "1",
                note: "Maximum number of calls this campaign can manage at the same time."
              },
              {
                field: "Active",
                value: "Active",
                note: "The campaign can generate calls only when it is active and inside its schedule."
              },
              {
                field: "Enable Recording",
                value: "false",
                note: "Enable only when recordings are required for the campaign and legal/compliance rules allow it."
              },
              {
                field: "Agent Setting",
                value: "test",
                note: "The AI voice agent that handles the conversation."
              },
              {
                field: "Trunk Name",
                value: "providerPjsip",
                note: "The trunk used to place outbound calls. In advanced setups, write the trunk name explicitly when it must match a specific telephony route."
              },
              {
                field: "Context",
                value: "raf-pjsipProvider",
                note: "Advanced setting that defines the telephony context where the answered customer call is connected."
              },
              {
                field: "Exten",
                value: "configured destination",
                note: "Advanced setting that defines the extension reached inside the selected context after the dialer calls the customer."
              }
            ]
          },
          {
            title: "Scheduling and retry",
            fields: [
              {
                field: "Retry",
                value: "3",
                note: "How many retry attempts are allowed when the contact result is different from answer."
              },
              {
                field: "Retry Minutes To Reschedule",
                value: "5",
                note: "How many minutes RocketAiFlow waits before rescheduling the contact after a retryable outcome."
              },
              {
                field: "By Weekday",
                value: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
                note: "Days when the campaign is allowed to call."
              },
              {
                field: "By Hour",
                value: "00-23",
                note: "Hours when the campaign is allowed to call."
              },
              {
                field: "Start",
                value: "04/30/2026, 11:52 AM",
                note: "Campaign start date and time."
              },
              {
                field: "Until",
                value: "05/30/2026, 11:52 AM",
                note: "Campaign end date and time."
              },
              {
                field: "Timezone",
                value: "Europe/Rome",
                note: "Timezone used to evaluate campaign duration, weekdays, hours, start, and until."
              }
            ]
          }
        ]
      },
      campaignList: {
        paragraphs: [
          "The Dialer Campaigns list includes quick switches to enable or disable each campaign and to turn recording on or off when recording is required."
        ]
      },
      realtime: {
        paragraphs: [
          <>
            Realtime campaign behavior is described in{" "}
            <LocalizedInlineLink href="/monitoring/dialer-dashboard-panels">
              Dialer Dashboard Panels
            </LocalizedInlineLink>
            . Use that page to read Dialer Status, active calls, call limits, dialing rate,
            outcomes, Real-Time Agents & Trunks, talk time, ring time, and selected time-range
            performance.
          </>,
          "During a live run, the Dialer dashboard is the main operational view for outbound. If Dialer Status shows calls in progress, the campaign is actively generating calls. If the trunk moves from Not In Use to In Use, calls are using the telephony path."
        ]
      },
      afterCalls: {
        paragraphs: [
          "Use Call Records to review outcome, transcript, recording state when enabled, talk time, ring time, and any data saved by functions.",
          "When results are unclear, review the Dialer dashboard before changing prompt, contacts, trunk, or campaign settings."
        ]
      }
    },
    screenshots: {
      campaignsList: {
        title: "Dialer Campaigns list",
        description: "Screenshot of the Dialer Campaigns page with the Add Campaign button and the campaigns table.",
        src: "/screenshots/docs/dialer-campaigns-list.png",
        alt: "Dialer Campaigns list with Add Campaign button, active status summary, and campaigns table."
      },
      campaignForm: {
        title: "Edit Campaign form",
        description: "Screenshot of Name, Concurrent Call Capacity, Active, Enable Recording, Agent Setting, Trunk Name, Context, and Exten.",
        src: "/screenshots/docs/campaign-call-capacity-schedule.png",
        alt: "Edit Campaign form with call capacity, scheduling, agent, and trunk settings.",
        panels: [
          {
            title: "Campaign configuration",
            description: "Name, active status, recording, agent, trunk, context, extension, and concurrent call capacity.",
            crop: "top"
          },
          {
            title: "Scheduling and retry",
            description: "Retry behavior, active days, active hours, start date, end date, and timezone.",
            crop: "bottom"
          }
        ]
      },
    },
    nextSteps: {
      cards: [
        {
          title: "Import Contacts",
          href: "/run-workflows/import-contacts",
          description: "Prepare a CSV import or create contacts manually for Dialer Campaigns."
        },
        {
          title: "Dialer Dashboard Panels",
          href: "/monitoring/dialer-dashboard-panels",
          description: "Read the realtime and selected time-range Dialer panels."
        },
        {
          title: "Call Records",
          href: "/run-workflows/call-records",
          description: "Review the result of each outbound call after the campaign runs."
        }
      ]
    }
  },
  it: {
    title: "AI Dialer Flows",
    intro: [
      "AI Dialer Flows è la sezione dove crei e gestisci le campagne outbound.",
      "Usa questa pagina quando vuoi collegare campagna, agente, trunk, regole di schedulazione, retry, registrazione e contatti in un workflow outbound eseguibile. La campagna definisce anche dove collegare la chiamata dopo che il dialer raggiunge il customer."
    ],
    headings: {
      whereToGo: "Apri Dialer Campaigns",
      campaignForm: "Configura la campagna",
      campaignList: "Leggi la tabella campagne",
      realtime: "Monitoraggio realtime",
      afterCalls: "Rivedi i risultati delle chiamate",
      nextSteps: "Prossimi passi"
    },
    tableHeaders: {
      field: "Campo",
      example: "Esempio",
      use: "Uso"
    },
    screenshotLabel: "Screenshot",
    screenshotReplace: "Sostituisci con uno screenshot reale dell'interfaccia",
    sections: {
      whereToGo: {
        paragraphs: [
          "Vai in AI Dialer Flows, apri Dialer Campaigns e premi Add Campaign per creare una nuova campagna outbound.",
          "La campagna è l'oggetto operativo che dice a RocketAiFlow quale agente deve chiamare, quale trunk deve usare, quante chiamate concorrenti sono consentite, quando la campagna è attiva e come deve funzionare il retry."
        ],
        bullets: [
          <>Usa <strong>Add Campaign</strong> per creare una nuova campagna.</>,
          <>Usa <strong>Edit Campaign</strong> quando devi modificare una campagna esistente.</>,
          <>Usa <strong>Concurrent Call Capacity</strong> per controllare quante chiamate la campagna può gestire nello stesso momento.</>
        ]
      },
      campaignForm: {
        paragraphs: [
          "Il form Edit Campaign contiene le impostazioni principali di esecuzione di una Dialer Campaign.",
          "Seleziona l'agente che deve gestire la conversazione e il trunk che deve effettuare la chiamata outbound. Nei setup telefonici più avanzati puoi anche scrivere direttamente il nome del trunk e indicare contesto ed extension dove collegare la chiamata dopo che il customer risponde.",
          "La schedulazione fa parte della stessa configurazione campagna. Start e Until definiscono la durata della campagna, Timezone controlla come vengono interpretati giorni e ore, e Retry gestisce la rischedulazione dei contatti che non rispondono."
        ],
        fieldGroups: [
          {
            title: "Impostazioni principali",
            fields: [
              {
                field: "Name",
                value: "test",
                note: "Nome della campagna mostrato nella tabella e nel monitoraggio."
              },
              {
                field: "Concurrent Call Capacity",
                value: "1",
                note: "Numero massimo di chiamate che questa campagna può gestire nello stesso momento."
              },
              {
                field: "Active",
                value: "Active",
                note: "La campagna può generare chiamate solo quando è attiva e dentro la schedulazione."
              },
              {
                field: "Enable Recording",
                value: "false",
                note: "Abilitala solo quando le registrazioni sono richieste dalla campagna e le regole legal/compliance lo consentono."
              },
              {
                field: "Agent Setting",
                value: "test",
                note: "L'agente Voice AI che gestisce la conversazione."
              },
              {
                field: "Trunk Name",
                value: "providerPjsip",
                note: "Il trunk usato per effettuare le chiamate outbound. Nei setup avanzati scrivi il nome del trunk quando deve corrispondere a una route telefonica specifica."
              },
              {
                field: "Context",
                value: "raf-pjsipProvider",
                note: "Impostazione avanzata che definisce il contesto telefonico dove viene collegata la chiamata dopo la risposta del customer."
              },
              {
                field: "Exten",
                value: "destinazione configurata",
                note: "Impostazione avanzata che definisce l'extension raggiunta dentro il contesto selezionato dopo che il dialer chiama il customer."
              }
            ]
          },
          {
            title: "Schedulazione e retry",
            fields: [
              {
                field: "Retry",
                value: "3",
                note: "Numero di tentativi consentiti quando l'esito del contatto è diverso da answer."
              },
              {
                field: "Retry Minutes To Reschedule",
                value: "5",
                note: "Minuti di attesa prima di rischedulare il contatto dopo un esito ritentabile."
              },
              {
                field: "By Weekday",
                value: "Mon, Tue, Wed, Thu, Fri, Sat, Sun",
                note: "Giorni in cui la campagna può chiamare."
              },
              {
                field: "By Hour",
                value: "00-23",
                note: "Ore in cui la campagna può chiamare."
              },
              {
                field: "Start",
                value: "04/30/2026, 11:52 AM",
                note: "Data e ora di inizio campagna."
              },
              {
                field: "Until",
                value: "05/30/2026, 11:52 AM",
                note: "Data e ora di fine campagna."
              },
              {
                field: "Timezone",
                value: "Europe/Rome",
                note: "Timezone usato per valutare durata campagna, giorni, ore, start e until."
              }
            ]
          }
        ]
      },
      campaignList: {
        paragraphs: [
          "Nella lista Dialer Campaigns ci sono switch rapidi per abilitare o disabilitare ogni campagna e per attivare o disattivare il recording quando la registrazione è richiesta."
        ]
      },
      realtime: {
        paragraphs: [
          <>
            La parte realtime delle campagne è descritta in{" "}
            <LocalizedInlineLink href="/monitoring/dialer-dashboard-panels">
              Pannelli Dashboard Dialer
            </LocalizedInlineLink>
            . Usa quella pagina per leggere Dialer Status, chiamate attive, limiti, dialing rate,
            outcome, Real-Time Agents & Trunks, talk time, ring time e performance sull'intervallo
            selezionato.
          </>,
          "Durante un run live, la dashboard Dialer è la vista operativa principale dell'outbound. Se Dialer Status mostra calls in progress, la campagna sta generando chiamate. Se il trunk passa da Not In Use a In Use, le chiamate stanno usando il percorso telefonico."
        ]
      },
      afterCalls: {
        paragraphs: [
          "Usa Registro chiamate per rivedere outcome, transcript, stato registrazione quando abilitata, talk time, ring time e dati salvati dalle functions.",
          "Quando i risultati non sono chiari, rivedi la dashboard Dialer prima di cambiare prompt, contatti, trunk o impostazioni campagna."
        ]
      }
    },
    screenshots: {
      campaignsList: {
        title: "Lista Dialer Campaigns",
        description: "Screenshot della pagina Dialer Campaigns con il bottone Add Campaign e la tabella campagne.",
        src: "/screenshots/docs/dialer-campaigns-list.png",
        alt: "Lista Dialer Campaigns con bottone Add Campaign, riepilogo stati active e tabella campagne."
      },
      campaignForm: {
        title: "Form Edit Campaign",
        description: "Screenshot di Name, Concurrent Call Capacity, Active, Enable Recording, Agent Setting, Trunk Name, Context ed Exten.",
        src: "/screenshots/docs/campaign-call-capacity-schedule.png",
        alt: "Form Edit Campaign con impostazioni di call capacity, schedulazione, agente e trunk.",
        panels: [
          {
            title: "Configurazione campagna",
            description: "Name, stato active, recording, agente, trunk, context, exten e concurrent call capacity.",
            crop: "top"
          },
          {
            title: "Scheduling e retry",
            description: "Retry, giorni attivi, fasce orarie, data di inizio, data di fine e timezone.",
            crop: "bottom"
          }
        ]
      },
    },
    nextSteps: {
      cards: [
        {
          title: "Importa contatti",
          href: "/run-workflows/import-contacts",
          description: "Prepara un import CSV o crea manualmente i contatti per le Dialer Campaigns."
        },
        {
          title: "Pannelli Dashboard Dialer",
          href: "/monitoring/dialer-dashboard-panels",
          description: "Leggi i pannelli Dialer realtime e sull'intervallo selezionato."
        },
        {
          title: "Registro chiamate",
          href: "/run-workflows/call-records",
          description: "Rivedi il risultato di ogni chiamata outbound dopo l'esecuzione della campagna."
        }
      ]
    }
  }
};

function useAiDialerFlowsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: aiDialerFlowsCopy[locale], locale };
}

function LocalizedInlineLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      <span>{children}</span>
    </Link>
  );
}

export function LocalizedAiDialerFlowsTitle() {
  const { copy } = useAiDialerFlowsCopy();
  return copy.title;
}

export function LocalizedAiDialerFlowsIntro() {
  const { copy } = useAiDialerFlowsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedAiDialerFlowsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  const { copy } = useAiDialerFlowsCopy();
  return copy.headings[sectionKey];
}

export function LocalizedAiDialerFlowsSection({
  sectionKey
}: {
  sectionKey: Exclude<SectionKey, "nextSteps">;
}) {
  const { copy } = useAiDialerFlowsCopy();
  const section = copy.sections[sectionKey];

  return (
    <section className="docs-home-section">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {section.fields ? <LocalizedCampaignFieldsTable fields={section.fields} /> : null}
      {section.fieldGroups?.map((group) => (
        <section className="docs-field-group" key={group.title}>
          <h3>{group.title}</h3>
          <LocalizedCampaignFieldsTable fields={group.fields} />
        </section>
      ))}
    </section>
  );
}

function LocalizedCampaignFieldsTable({ fields }: { fields: CampaignField[] }) {
  const { copy } = useAiDialerFlowsCopy();

  return (
    <table className="docs-field-table">
      <thead>
        <tr>
          <th>{copy.tableHeaders.field}</th>
          <th>{copy.tableHeaders.example}</th>
          <th>{copy.tableHeaders.use}</th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field) => (
          <tr key={field.field}>
            <td>
              <code>{field.field}</code>
            </td>
            <td>
              <code>{field.value}</code>
            </td>
            <td>{field.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LocalizedAiDialerFlowsScreenshot({ screenshotKey }: { screenshotKey: ScreenshotKey }) {
  const { copy } = useAiDialerFlowsCopy();
  const screenshot = copy.screenshots[screenshotKey];

  if (screenshot.src) {
    if (screenshot.panels?.length) {
      return (
        <section className="docs-home-section">
          <div className="docs-screenshot-split-grid">
            {screenshot.panels.map((panel) => (
              <figure className="docs-screenshot docs-screenshot-split" key={panel.title}>
                <div className="docs-screenshot-frame docs-screenshot-split-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={`docs-screenshot-img docs-screenshot-split-img docs-screenshot-split-img-${panel.crop}`}
                    src={screenshot.src}
                    alt={`${screenshot.alt ?? screenshot.title}: ${panel.title}`}
                    loading="lazy"
                  />
                </div>
                <figcaption className="docs-screenshot-caption docs-screenshot-split-caption">
                  <strong>{panel.title}</strong>
                  <span>{panel.description}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="docs-home-section">
        <figure className="docs-screenshot">
          <div className="docs-screenshot-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="docs-screenshot-img" src={screenshot.src} alt={screenshot.alt ?? screenshot.title} loading="lazy" />
          </div>
        </figure>
      </section>
    );
  }

  return (
    <section className="docs-home-section">
      <div className="docs-image-placeholder">
        <div className="docs-image-placeholder-box" aria-label={`Image placeholder: ${screenshot.title}`}>
          <p className="docs-image-placeholder-label">{copy.screenshotLabel}</p>
          <p className="docs-image-placeholder-title">{screenshot.title}</p>
          <p className="docs-image-placeholder-description">{screenshot.description}</p>
          <p className="docs-image-placeholder-replace">{copy.screenshotReplace}</p>
        </div>
      </div>
    </section>
  );
}

export function LocalizedAiDialerFlowsNextSteps() {
  const { copy, locale } = useAiDialerFlowsCopy();

  return (
    <section className="docs-home-section">
      <div className="docs-home-card-grid docs-home-card-grid-2">
        {copy.nextSteps.cards.map((card) => (
          <Link className="docs-home-card" href={localizeHref(card.href, locale)} key={card.href}>
            <span className="docs-home-card-title">{card.title}</span>
            <span className="docs-home-card-description">{card.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
