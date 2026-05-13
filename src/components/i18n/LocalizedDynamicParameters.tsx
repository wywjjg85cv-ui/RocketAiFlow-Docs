"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
  callout?: ReactNode;
  screenshot?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type DynamicParametersCopy = {
  title: string;
  intro: ReactNode[];
  model: SectionCopy;
  templateVariables: SectionCopy;
  outboundInbound: SectionCopy;
  functionUsage: SectionCopy;
  bestPractices: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey =
  | "model"
  | "templateVariables"
  | "outboundInbound"
  | "functionUsage"
  | "bestPractices"
  | "nextSteps";

const defaultTemplateVariables = [
  "{t.CampaignId}",
  "{t.ContactId}",
  "{t.id}",
  "{t.name}",
  "{t.phone}",
  "{t.priority}",
  "{t.surname}",
  "{t.totalGlobal}"
];

const contactTemplateScreenshot = "/screenshots/docs/contact-template-custom-cf.png";

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="docs-inline-link" href={href}>
      <span>{children}</span>
    </Link>
  );
}

const dynamicParametersCopy: Record<Locale, DynamicParametersCopy> = {
  en: {
    title: "Dynamic Parameters",
    intro: [
      "Dynamic parameters let the agent use real contact and workflow data instead of static text.",
      "Use them when the greeting, prompt, function description, function input, or API URL needs values from the current contact or call."
    ],
    model: {
      title: "What dynamic parameters are",
      paragraphs: [
        "In RocketAiFlow, dynamic values usually come from two places:",
        "Keep this distinction clear when you configure functions. Some values are known before the call starts; other values must be collected by the agent during the conversation."
      ],
      items: [
        <><strong>Contact/template values:</strong> values already stored on the outbound contact or on the inbound contact matched through <UiPill>Contact Inbounds</UiPill>.</>,
        <><strong>LLM-generated values:</strong> values the model extracts or creates during the call, such as intent, callback time, lead status, notes, city, or qualification result.</>
      ]
    },
    templateVariables: {
      title: "Contact template variables",
      paragraphs: [
        "Contact templates define which contact fields can be inserted dynamically in agent fields.",
        "The default template includes the main parameters of a contact created in RocketAiFlow:",
        <>You can edit the default template and add custom keys. Custom keys are rendered from <code>data</code>. For example, if you add a key named <code>cf</code>, the variable becomes <code>{`{t.data.cf}`}</code>.</>,
        "Create separate templates for different contact schemas. If one workflow imports custom fields like data.externalId and another imports data.cf or data.policyNumber, add those keys to the relevant template so they appear as selectable variables when creating or editing an agent.",
        "This reduces typing mistakes: instead of manually writing variable names, use the variables suggested by the UI."
      ],
      items: defaultTemplateVariables.map((variable) => <code key={variable}>{variable}</code>),
      screenshot: {
        src: contactTemplateScreenshot,
        alt: "Contact template editor showing the custom cf key added to the template.",
        caption: "Custom contact template key"
      }
    },
    outboundInbound: {
      title: "How variables are rendered",
      paragraphs: [
        "A variable is replaced only when the matching value exists on the contact used for that call.",
        "If the value does not exist, the variable is not rendered. Before using custom variables, make sure the contact data contains the expected key-value pairs."
      ],
      items: [
        <><strong>Outbound:</strong> variables are rendered from the contact loaded into the campaign. Custom fields must be included in the contact <code>data</code> object.</>,
        <><strong>Inbound:</strong> variables are rendered only when Agent settings allow contact lookup and <UiPill>Contact Inbounds</UiPill> contains a contact list with a number that matches the caller.</>,
        <>In fields that support variables, type <code>@</code> to open suggestions or click the variables shown under the field.</>,
        <>To prepare contacts, see <InlineDocsLink href="/run-workflows/import-contacts#associate-contacts-with-a-campaign-or-agent">Import Contacts</InlineDocsLink>.</>
      ]
    },
    functionUsage: {
      title: "Use dynamic values in functions",
      paragraphs: [
        "Dynamic values are useful when a function must call the right API endpoint or pass the right context without hardcoding a value for every contact.",
        <>Example: if a custom <code>PUT</code> function updates a CRM contact and the CRM id is stored on the contact as <code>data.externalId</code>, use that value in the API URL, for example <code>https://crm.example.com/contacts/{"{t.data.externalId}"}</code>.</>,
        "RocketAiFlow renders the contact id from the active contact. The LLM can then generate only the values that must be updated, such as status, notes, or qualification result."
      ],
      items: [
        "use contact/template values for known data such as phone, name, CRM id, campaign id, plan, branch, or custom contact fields",
        "use LLM-generated values for information discovered during the call",
        "use template values in function descriptions when the LLM needs context",
        "use template values in API URLs when the external endpoint needs a contact-specific identifier"
      ]
    },
    bestPractices: {
      title: "Keep it practical",
      paragraphs: [
        "Dynamic parameters are useful when they make the workflow more accurate. They are not useful when they make the function hard to read or debug."
      ],
      items: [
        "pass only the values required by the action",
        "name custom data keys clearly",
        "document where each value comes from",
        "test one contact and one workflow path first",
        "do not depend on a custom key until you have confirmed it exists in the contact data"
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "Create Your First AI Voice Agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Use template variables in the agent greeting, prompt, functions, and Agent settings."
      },
      {
        title: "Configure Agent Functions",
        href: "/build/add-functions",
        description: "Use contact fields and runtime values inside function descriptions and API URL templates."
      },
      {
        title: "Import Contacts",
        href: "/run-workflows/import-contacts",
        description: "Prepare outbound campaign contacts or inbound agent contacts with the expected data keys."
      }
    ]
  },
  it: {
    title: "Parametri dinamici",
    intro: [
      "I parametri dinamici permettono all'agente di usare dati reali del contatto e del workflow invece di testo statico.",
      "Usali quando greeting, prompt, descrizione function, input function o URL API devono usare valori del contatto o della chiamata corrente."
    ],
    model: {
      title: "Cosa sono i parametri dinamici",
      paragraphs: [
        "In RocketAiFlow, i valori dinamici arrivano di solito da due punti:",
        "Mantieni chiara questa distinzione quando configuri le functions. Alcuni valori sono noti prima che la chiamata inizi; altri devono essere raccolti dall'agente durante la conversazione."
      ],
      items: [
        <><strong>Valori contatto/template:</strong> valori già salvati nel contatto outbound o nel contatto inbound trovato tramite <UiPill>Contact Inbounds</UiPill>.</>,
        <><strong>Valori generati dall'LLM:</strong> valori che il modello estrae o crea durante la chiamata, come intento, orario callback, stato lead, note, città o risultato della qualificazione.</>
      ]
    },
    templateVariables: {
      title: "Variabili del contact template",
      paragraphs: [
        "I contact template definiscono quali campi del contatto possono essere inseriti dinamicamente nei campi dell'agente.",
        "Il template di default include i principali parametri di un contatto creato in RocketAiFlow:",
        <>Puoi modificare il template di default e aggiungere chiavi custom. Le chiavi custom vengono renderizzate da <code>data</code>. Per esempio, se aggiungi una chiave chiamata <code>cf</code>, la variabile diventa <code>{`{t.data.cf}`}</code>.</>,
        "Crea template diversi in base alle variabili custom che vuoi caricare nei contatti. Per esempio, se un workflow usa data.externalId e un altro usa data.cf o data.policyNumber, aggiungi quelle chiavi nel template corretto così saranno disponibili come variabili selezionabili quando crei o modifichi un agente.",
        "Questo riduce gli errori di typing: invece di scrivere manualmente i nomi delle variabili, usa i suggerimenti mostrati dalla UI."
      ],
      items: defaultTemplateVariables.map((variable) => <code key={variable}>{variable}</code>),
      screenshot: {
        src: contactTemplateScreenshot,
        alt: "Editor del contact template con la chiave custom cf aggiunta al template.",
        caption: "Chiave custom nel contact template"
      }
    },
    outboundInbound: {
      title: "Come vengono renderizzate le variabili",
      paragraphs: [
        "Una variabile viene sostituita solo quando il valore corrispondente esiste nel contatto usato per quella chiamata.",
        "Se il valore non esiste, la variabile non viene renderizzata. Prima di usare variabili custom, assicurati che i dati del contatto contengano le key-value attese."
      ],
      items: [
        <><strong>Outbound:</strong> le variabili vengono renderizzate dal contatto caricato nella campagna. I campi custom devono essere dentro l'oggetto <code>data</code> del contatto.</>,
        <><strong>Inbound:</strong> le variabili vengono renderizzate solo se negli Agent settings è abilitato il recupero del contatto e <UiPill>Contact Inbounds</UiPill> contiene una lista con un numero che corrisponde al chiamante.</>,
        <>Nei campi che supportano le variabili, digita <code>@</code> per aprire i suggerimenti oppure clicca le variabili mostrate sotto il campo.</>,
        <>Per preparare i contatti, vedi <InlineDocsLink href="/run-workflows/import-contacts#associate-contacts-with-a-campaign-or-agent">Import Contacts</InlineDocsLink>.</>
      ]
    },
    functionUsage: {
      title: "Usa valori dinamici nelle functions",
      paragraphs: [
        "I valori dinamici sono utili quando una function deve chiamare l'endpoint API corretto o passare il contesto giusto senza creare valori statici per ogni contatto.",
        <>Esempio: se una function custom <code>PUT</code> aggiorna un contatto nel tuo CRM e l'id CRM è salvato nel contatto come <code>data.externalId</code>, puoi usare quel valore nella URL API, per esempio <code>https://crm.example.com/contacts/{"{t.data.externalId}"}</code>.</>,
        "RocketAiFlow renderizza l'id dal contatto attivo. L'LLM può generare solo i valori da aggiornare, come stato, note o risultato della qualificazione."
      ],
      items: [
        "usa valori contatto/template per dati già noti come phone, name, CRM id, campaign id, piano, filiale o campi custom del contatto",
        "usa valori generati dall'LLM per informazioni scoperte durante la chiamata",
        "usa valori template nelle descrizioni delle functions quando l'LLM ha bisogno di contesto",
        "usa valori template nelle URL API quando l'endpoint esterno ha bisogno di un identificativo specifico del contatto"
      ]
    },
    bestPractices: {
      title: "Mantieni il setup pratico",
      paragraphs: [
        "I parametri dinamici sono utili quando rendono il workflow più preciso. Non sono utili quando rendono la function difficile da leggere o da debuggare."
      ],
      items: [
        "passa solo i valori richiesti dall'azione",
        "dai nomi chiari alle chiavi custom dentro data",
        "documenta da dove arriva ogni valore",
        "testa prima un contatto e un solo percorso di workflow",
        "non dipendere da una chiave custom finché non hai verificato che esista nei dati del contatto"
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Crea il primo AI Voice Agent",
        href: "/build/create-your-first-ai-voice-agent",
        description: "Usa le variabili template in greeting, prompt, functions e Agent settings."
      },
      {
        title: "Configura le functions",
        href: "/build/add-functions",
        description: "Usa campi contatto e valori runtime dentro descrizioni function e template URL API."
      },
      {
        title: "Import Contacts",
        href: "/run-workflows/import-contacts",
        description: "Prepara contatti per campagne outbound o agenti inbound con le chiavi data attese."
      }
    ]
  }
};

function useDynamicParametersCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return dynamicParametersCopy[locale];
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
      {section.screenshot ? (
        <figure className="docs-screenshot">
          <div className="docs-screenshot-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="docs-screenshot-img" src={section.screenshot.src} alt={section.screenshot.alt} loading="lazy" />
          </div>
          {section.screenshot.caption ? <figcaption className="docs-screenshot-caption">{section.screenshot.caption}</figcaption> : null}
        </figure>
      ) : null}
      {section.callout ? <div className="docs-note-callout">{section.callout}</div> : null}
    </section>
  );
}

function CardGrid({ cards }: { cards: LinkCard[] }) {
  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {cards.map((card) => (
        <Link key={card.href} className="docs-home-card" href={card.href}>
          <span className="docs-home-card-title">{card.title}</span>
          <span className="docs-home-card-description">{card.description}</span>
        </Link>
      ))}
    </div>
  );
}

export function LocalizedDynamicParametersTitle() {
  return <>{useDynamicParametersCopy().title}</>;
}

export function LocalizedDynamicParametersHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useDynamicParametersCopy();
  const labels: Record<HeadingKey, string> = {
    model: copy.model.title,
    templateVariables: copy.templateVariables.title,
    outboundInbound: copy.outboundInbound.title,
    functionUsage: copy.functionUsage.title,
    bestPractices: copy.bestPractices.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedDynamicParametersIntro() {
  const copy = useDynamicParametersCopy();
  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedDynamicParametersModel() {
  return <Section section={useDynamicParametersCopy().model} />;
}

export function LocalizedDynamicParametersTemplateVariables() {
  return <Section section={useDynamicParametersCopy().templateVariables} />;
}

export function LocalizedDynamicParametersOutboundInbound() {
  return <Section section={useDynamicParametersCopy().outboundInbound} />;
}

export function LocalizedDynamicParametersFunctionUsage() {
  return <Section section={useDynamicParametersCopy().functionUsage} />;
}

export function LocalizedDynamicParametersBestPractices() {
  return <Section section={useDynamicParametersCopy().bestPractices} />;
}

export function LocalizedDynamicParametersNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={useDynamicParametersCopy().nextSteps} />
    </section>
  );
}
