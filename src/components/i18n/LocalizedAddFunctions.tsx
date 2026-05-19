"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
  callout?: ReactNode;
  callouts?: ReactNode[];
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type AddFunctionsCopy = {
  title: string;
  intro: ReactNode[];
  setup: SectionCopy;
  preconfigured: SectionCopy;
  hangup: SectionCopy;
  transfer: SectionCopy;
  rescheduled: SectionCopy;
  leadQualification: SectionCopy;
  decide: SectionCopy;
  apiBacked: SectionCopy;
  customApi: SectionCopy;
  dynamicValues: SectionCopy;
  promptUsage: SectionCopy;
  bestPractices: SectionCopy;
  validation: SectionCopy;
  mistakes: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey =
  | "setup"
  | "preconfigured"
  | "hangup"
  | "transfer"
  | "rescheduled"
  | "leadQualification"
  | "decide"
  | "apiBacked"
  | "customApi"
  | "dynamicValues"
  | "promptUsage"
  | "bestPractices"
  | "validation"
  | "mistakes"
  | "nextSteps";

const openAiPromptGuidanceUrl = "https://developers.openai.com/api/docs/guides/prompt-guidance";
const openAiFunctionCallingUrl = "https://developers.openai.com/api/docs/guides/function-calling";

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" className="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function ExternalDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-inline-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ExternalLinkIcon />
    </a>
  );
}

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      <span>{children}</span>
    </Link>
  );
}

const addFunctionsCopy: Record<Locale, AddFunctionsCopy> = {
  en: {
    title: "Configure Agent Functions",
    intro: [
      "Functions give the voice agent controlled ways to act during the call: transfer the call, save a callback, record structured data, or call an API.",
      "The most important use case is connecting RocketAiFlow to the tools the company already uses. Through API-backed functions, the agent can update CRM records, check availability, create follow-ups, route requests, or use internal software automatically while following the rules you define."
    ],
    setup: {
      title: "Where functions are configured",
      paragraphs: [
        "Open the AI Voice Agent and use the Functions area to add preconfigured functions or create a custom API-backed function.",
        "For each function, configure the name, description, endpoint behavior, parameters, required fields, enum values, and any dynamic values the function needs."
      ],
      items: [
        "use preconfigured functions for call control and common workflow actions",
        "use custom functions when the agent must call software used by the business",
        "save the function, then mention the exact function name and trigger condition in the agent prompt"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-setup.png",
          alt: "RocketAiFlow agent Functions area showing function setup options for creating and configuring agent actions."
        }
      ]
    },
    preconfigured: {
      title: "Preconfigured Function Examples",
      paragraphs: [
        "RocketAiFlow includes ready functions that can be used as a starting point instead of building every action from zero.",
        "Use these examples first when they match the workflow. When the agent needs to call business systems through APIs, RocketAiFlow lets you create and call as many custom functions as the workflow requires.",
        <>For <code>hangup_call</code>, <code>transfer</code>, and <code>rescheduled_contact</code>, keep the preconfigured parameters exactly as they are. Do not delete, rename, or change the parameter structure. These parameters are already aligned with RocketAiFlow&apos;s internal APIs. Adapt descriptions and allowed values only where the function asks you to.</>
      ],
      items: [
        <><code>hangup_call</code>: ends the call cleanly when the workflow is complete.</>,
        <><code>transfer</code>: sends the call to a human destination or extension.</>,
        <><code>rescheduled_contact</code>: saves a future callback time for the contact.</>,
        <><code>save_lead_qualification</code>: records the lead qualification result collected by the agent.</>
      ]
    },
    hangup: {
      title: "hangup_call",
      paragraphs: [
        <>Use <code>hangup_call</code> when the agent should close the active call after the workflow is complete.</>,
        "When you select this preconfigured function, RocketAiFlow automatically sets the internal endpoint used to close the call. You do not need to configure the endpoint manually.",
        <>Keep the <code>reason</code> parameter exactly as provided. Do not delete it, rename it, or change its structure. Change only the descriptions:</>,
        "This keeps the endpoint safe and lets the LLM focus on deciding when the call is complete and what closure reason should be recorded."
      ],
      items: [
        "function description: explain when the agent should end the call",
        <><code>reason</code> setup: keep it as a required string and keep <code>Use enum</code> enabled</>,
        <><code>reason</code> description: explain what reason the agent should pass when closing the call</>,
        <><code>booking_completed</code>: use it when the main objective of the conversation has been completed</>,
        <><code>goodbye</code>: use it when the conversation has naturally ended and there is nothing else to say</>,
        <><code>abandoned_call</code>: use it when the user stops participating or the call is no longer usable</>
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-hangup-call.png",
          alt: "hangup_call preconfigured function showing reason required, Use enum enabled, and allowed values for closing the call."
        }
      ]
    },
    transfer: {
      title: "transfer",
      paragraphs: [
        "Use a transfer function when the agent should move the active call to another destination.",
        <>RocketAiFlow provides preconfigured transfer options that automatically use the internal transfer API. Choose the option that matches the workflow, then adapt only descriptions and allowed values. Do not delete, rename, or replace the provided <code>exten</code> parameter.</>,
        <>If no custom transfer context is selected, RocketAiFlow uses the default context <code>raf-internal</code>. Keep <code>Priority</code> as <code>1</code> unless your telephony route requires another value.</>
      ],
      items: [
        <><code>transfer</code>: transfers the call to the phone number or extension provided in the <code>exten</code> parameter.</>,
        <><code>transfer_call</code>: created by <strong>Transfer To Extension</strong>. Use it for a known extension or phone number. Keep <code>exten</code> required and leave <code>Use enum</code> off. Example: transfer to <code>600</code>.</>,
        <><code>transfer_to_service</code>: created by <strong>Transfer To Service</strong>. Use it for a supported department. Keep <code>exten</code> required and keep <code>Use enum</code> enabled with supported values such as <code>sales</code>, <code>support</code>, and <code>administration</code>.</>,
        <><strong>Mode</strong> and <strong>Priority</strong>: use <code>Custom</code> only when you need a different transfer context, and change priority only when your route requires it.</>
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-transfer-extension.png",
          alt: "Transfer To Extension preset showing transfer_call, required exten parameter, custom mode, raf-internal context, and priority 1.",
          caption: "Transfer To Extension"
        },
        {
          src: "/screenshots/docs/function-transfer-service.png",
          alt: "Transfer To Service preset showing transfer_to_service, required exten enum, supported values sales support administration, custom mode, raf-internal context, and priority 1.",
          caption: "Transfer To Service"
        }
      ]
    },
    rescheduled: {
      title: "rescheduled_contact",
      paragraphs: [
        <>Use <code>rescheduled_contact</code> when the contact asks to be called back later or when the workflow needs to save a future callback.</>,
        <>This preconfigured function uses the <code>data</code> parameter. Do not delete it, rename it, or change its structure. The <code>data</code> parameter is used to store the date and time requested by the user for the next call.</>,
        "When the function runs, the rescheduled call can be saved in:",
        "For this function, change only the descriptions and the campaign value when needed. Keep the provided parameter structure so the agent can collect the requested callback time and save the contact in the correct campaign."
      ],
      items: [
        "the campaign selected in the function configuration",
        "the default campaign associated with the agent, if no specific campaign is selected"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-rescheduled-contact.png",
          alt: "rescheduled_contact preconfigured function showing data parameter, callback date and time description, campaign selection, and JSON preview.",
        }
      ],
      callout: "Pay attention: in an inbound workflow, if you want to save the callback into a campaign, the campaign must be selected explicitly. Otherwise the rescheduled call is not saved in the campaign."
    },
    leadQualification: {
      title: "save_lead_qualification",
      paragraphs: [
        <>Use <code>save_lead_qualification</code> when the agent needs to collect structured information and save the qualification result for a lead.</>,
        <>Unlike call-control functions such as <code>hangup_call</code> or <code>transfer</code>, this function is meant to be adapted to the business goal. Keep only the parameters that are useful for your qualification flow and add new ones when the agent needs to collect more information.</>,
        <>In many workflows, <code>save_lead_qualification</code> can be called more than once during the same call. Use repeated calls to save partial information as the agent collects it, instead of waiting until the end and risking losing useful data.</>,
        "Start from the example schema, then remove fields that do not support the campaign or inbound goal. Keep only the data you will review, report, or send to another system.",
        "After changing the schema, update the function and parameter descriptions so the LLM knows exactly what to collect before each save."
      ],
      items: [
        "default example parameters: lead_name, phone, email, company_name, role, interested, qualification_status",
        "progressive save pattern: call the function after important fields are collected, then call it again when new qualification data is available",
        "useful fields: customer interest, budget range, company size, preferred follow-up channel, qualification outcome, and call notes"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-save-lead-qualification.png",
          alt: "save_lead_qualification preconfigured function showing editable lead qualification parameters such as lead_name, phone, email, company_name, role, interested, and qualification_status.",
        }
      ]
    },
    decide: {
      title: "How To Decide What Belongs In A Function",
      paragraphs: [
        "Use a function when the agent must perform a real action, not only speak.",
        "Functions connect the conversation to the business workflow. With a function, the agent can transfer a call, save data, create a follow-up, or use business software through an API.",
        "Do not create a function for rules that belong in the prompt. Voice tone, phrases to say, questions to ask, and conversational behavior should stay in the prompt.",
        "Create a function when the agent must:"
      ],
      items: [
        "transfer the call",
        "end the call",
        "save data collected during the conversation",
        "retrieve information from another system",
        "update a CRM or another business tool through an API",
        "create a follow-up, callback, task, ticket, lead, or appointment"
      ]
    },
    apiBacked: {
      title: "Functions can use business software through APIs",
      paragraphs: [
        "This is the core value of functions: the agent is not limited to speaking. It can use APIs from the tools the company already works with and perform structured actions automatically.",
        "Use API-backed functions only where the workflow needs a controlled external action. The agent decides when the function should run; RocketAiFlow sends the structured request to the configured endpoint."
      ],
      items: [
        "updating a CRM after lead qualification",
        "checking availability or looking up account details",
        "creating a follow-up, ticket, task, opportunity, note, quote, or appointment",
        "calling internal software that exposes a safe API endpoint"
      ]
    },
    customApi: {
      title: "Custom API functions",
      paragraphs: [
        "Use a custom API function when a preconfigured function is not enough and the agent must call a company tool, provider, or internal service.",
        "RocketAiFlow can create custom functions for any workflow that exposes a reachable API endpoint. You can add multiple custom functions to the same agent when the workflow needs different business actions.",
        "A custom function defines the API call: method, URL, headers, body or query values, LLM-generated parameters, contact-rendered values, response usage, and error behavior."
      ],
      items: [
        "Method and URL: choose GET, POST, PUT, PATCH, or DELETE and use a fixed URL or template URL such as https://api.example.com/contacts/{t.externalId}/notes.",
        "Headers and auth: add the authentication and content headers required by the API, such as Authorization or Content-Type.",
        "LLM parameters: values the agent collects or decides during the call, such as location, callback_reason, interest_level, note, or appointment_date.",
        "Contact/template parameters: values rendered from the active contact, such as {t.name}, {t.phone}, {t.email}, {t.externalId}, or custom contact data.",
        "Required fields and enums: mark values as required when the API cannot run without them, and use enums when the API accepts only fixed options.",
        "Response and errors: describe how the agent should use the API response and what fallback to use if the API is unavailable, rejects the request, or returns missing data."
      ],
      screenshots: [
        {
          src: "/screenshots/docs/functions-builder-custom-endpoint.png",
          alt: "Custom endpoint function builder showing method, URL, headers, body, and parameter configuration."
        },
        {
          src: "/screenshots/docs/functions-builder-weather-get.png",
          alt: "Custom GET function example using a required location parameter and a template URL.",
          caption: "GET example"
        }
      ],
      callouts: [
        <div className="docs-prompt-schema" key="custom-api-example">
          <strong>Example custom API function</strong>
          <span>Name: <span className="docs-callout-token">create_crm_followup</span></span>
          <span>Method: <span className="docs-callout-token">POST</span></span>
          <span>URL: <span className="docs-callout-token">https://crm.example.com/contacts/{"{t.externalId}"}/tasks</span></span>
          <span>LLM parameters: follow-up reason, summary, priority, preferred date.</span>
          <span>Contact/template values: contact id, name, phone, email, or campaign metadata.</span>
          <span>Prompt rule: call this function only after the caller confirms they want a follow-up and the agent has collected the required fields.</span>
        </div>
      ]
    },
    dynamicValues: {
      title: "Dynamic values belong in function inputs",
      paragraphs: [
        "Function inputs do not have to stay static. They can combine values collected by the LLM with values rendered from the active contact or workflow context.",
        "When contact data is available, use contact fields inside descriptions, API URL templates, body values, or query values. This lets one function work across different contacts without hardcoding contact-specific URLs.",
        <>Example: if a custom <code>PUT</code> function must update a CRM contact and the CRM id was imported in the contact data as <code>externalId</code>, use that value in the API URL, for example <code>https://crm.example.com/contacts/{"{t.externalId}"}</code>. RocketAiFlow renders the contact id from the active contact, while the LLM can generate only the fields that need to be updated, such as status, notes, or qualification result.</>,
        "Use dynamic values when the same function should behave differently by contact, campaign, route, call metadata, or information collected during the conversation."
      ],
      items: [
        "contact fields such as name, phone, email, campaign id, externalId, or custom data keys",
        "API URL templates that include contact values when the endpoint needs them",
        "workflow, campaign, route, or call metadata",
        "runtime values collected during the conversation"
      ]
    },
    promptUsage: {
      title: "Tell the LLM when to call each function",
      paragraphs: [
        <>For RocketAiFlow, do not rely only on the function name. Add a short <code>Functions</code> section in the agent prompt and map each business situation to the exact function the agent should call. See <InlineDocsLink href="/build/configure-agent-prompt">Configure Agent Prompt</InlineDocsLink>.</>,
        <>OpenAI describes function calling as a way for models to use external functionality and data when needed to follow instructions. See the <ExternalDocsLink href={openAiFunctionCallingUrl}>OpenAI function calling guide</ExternalDocsLink> and <ExternalDocsLink href={openAiPromptGuidanceUrl}>OpenAI prompt guidance</ExternalDocsLink>.</>,
        "Write the prompt like an operating rule, not like a generic feature description."
      ],
      items: [
        <><code>transfer_to_service</code>: call it only when the caller asks for a supported department such as sales, support, or administration. Use the matching <code>exten</code> enum value.</>,
        <><code>transfer_call</code>: call it when the caller explicitly asks to speak with a human or when the workflow requires a handoff to a known extension.</>,
        <><code>rescheduled_contact</code>: call it only after the caller asks to be contacted later and the agent has collected or confirmed the callback date and time.</>,
        <><code>save_lead_qualification</code>: call it when useful qualification fields have been collected. It can be called multiple times during the same call to save partial progress, then called again when more data is available. If a required field for that update is missing, ask a short follow-up question before calling the function.</>,
        <><code>hangup_call</code>: call it only after the conversation has reached a clear closing point, such as completed booking, goodbye, abandoned call, or silence timeout.</>,
        "For every function, include a negative rule: do not call the function if the required information is missing or the user has not expressed the relevant intent."
      ],
      callouts: [
        <div className="docs-prompt-schema" key="generic">
          <strong>How to mention functions in the prompt</strong>
          <span>Reference the function by its exact name, then describe the action or condition that should trigger it.</span>
          <span>Example: “When the user asks to complete [goal], call <span className="docs-callout-token">function_name</span> to perform [action]. Before calling it, collect [required fields]. If a required field is missing, ask one short question first.”</span>
        </div>,
        <div className="docs-prompt-schema" key="example">
          <strong>Prompt example</strong>
          <span>Use <span className="docs-callout-token">save_lead_qualification</span> after useful qualification fields are collected.</span>
          <span>You may call it multiple times during the same call to save partial data, then update it again as the conversation continues.</span>
          <span>If a required field for the current update is missing, ask one short follow-up question before calling the function.</span>
          <span>Do not call the function if the customer has not provided enough information to evaluate the lead.</span>
        </div>
      ]
    },
    bestPractices: {
      title: "How To Structure Function Descriptions",
      paragraphs: [
        <>OpenAI recommends clear function names, parameter descriptions, and instructions. In RocketAiFlow, treat the function description as the call contract: it should tell the LLM exactly what the function does, when to call it, what data is required, and when not to call it.</>,
        "OpenAI does not require Markdown headings such as # inside the function description. Use clear plain text or short labels such as Purpose, Call when, Do not call when, and Arguments only if they make the description easier to read.",
        "Keep the workflow policy in the agent prompt, then use the function and parameter descriptions to make each API action precise."
      ],
      items: [
        "Function name: use a stable action name, for example save_lead_qualification or transfer_to_service.",
        "Function description: start with the business action, then add the trigger condition: call this when...",
        "Do-not-call rule: explain when the function must not be called, especially when required information is missing.",
        "Required parameters: describe what the agent must collect before the call. If a required value is missing, the agent should ask one short follow-up question first.",
        "Parameter descriptions: specify meaning, source, format, examples, and allowed values.",
        "Enums: use them only for closed sets, and make each allowed value easy to understand.",
        <>Contact-rendered values: say when a value comes from the active contact, for example <code>{"{t.externalId}"}</code>, instead of being generated by the LLM.</>,
        "One function should represent one business action. Avoid mixing transfer, saving data, lookup, and update logic in the same function.",
        "Keep the prompt and function descriptions aligned: same function name, same trigger, same required fields."
      ],
      callout: (
        <div className="docs-prompt-schema">
          <strong>Function description template</strong>
          <span>Purpose: what the function does in one business sentence.</span>
          <span>Call when: the user intent or workflow condition that should trigger the function.</span>
          <span>Do not call when: missing information, unsupported request, or unsafe condition.</span>
          <span>Before calling: required fields the agent must collect or confirm.</span>
          <span>Arguments: each parameter with source, format, example, and allowed values.</span>
        </div>
      )
    },
    validation: {
      title: "First Validation Pass",
      paragraphs: ["After saving the functions, confirm:"],
      items: [
        "the function names are clear",
        "required parameters are present",
        "transfer destinations are valid",
        "the prompt tells the agent when to call each function",
        "the agent does not call a function when required information is missing",
        "API-backed functions send the expected payload to the target business tool",
        "rescheduled callbacks are saved in the intended campaign when campaign storage is required"
      ]
    },
    mistakes: {
      title: "Common Function Mistakes",
      paragraphs: [],
      items: [
        "adding too many unrelated functions to one agent",
        "using unclear parameter names",
        "forgetting to align the prompt with the available functions",
        "testing transfers without a valid destination",
        "using a business API without checking authentication, required fields, and error handling",
        "putting too many unrelated business actions inside one function"
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Assign the agent to an inbound path once the prompt and functions are in place."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Reuse the same agent in an outbound campaign after the prompt and functions are aligned."
      },
      {
        title: "Dynamic Parameters",
        href: "/build/dynamic-parameters",
        description: "Review how contact fields and runtime values can populate prompts, greetings, and function inputs."
      }
    ]
  },
  it: {
    title: "Configura le functions dell'agente",
    intro: [
      "Le functions danno all'agente vocale modi controllati per agire durante la chiamata: trasferire la chiamata, salvare un callback, registrare dati strutturati o chiamare un'API.",
      "Il punto più importante è collegare RocketAiFlow agli strumenti che l'azienda usa già. Tramite functions basate su API, l'agente può aggiornare CRM, controllare disponibilità, creare follow-up, instradare richieste o usare software interni automaticamente seguendo le regole che definisci."
    ],
    setup: {
      title: "Dove si configurano le functions",
      paragraphs: [
        "Apri l'AI Voice Agent e usa l'area Functions per aggiungere functions preconfigurate o creare una function custom basata su API.",
        "Per ogni function configura nome, descrizione, comportamento endpoint, parametri, campi required, valori enum e valori dinamici necessari."
      ],
      items: [
        "usa le functions preconfigurate per call control e azioni comuni del workflow",
        "usa functions custom quando l'agente deve chiamare software usati dall'azienda",
        "salva la function, poi cita nel prompt dell'agente il nome esatto della function e la condizione in cui deve essere chiamata"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-setup.png",
          alt: "Area Functions dell'agente RocketAiFlow con opzioni per creare e configurare azioni dell'agente."
        }
      ]
    },
    preconfigured: {
      title: "Esempi di functions preconfigurate",
      paragraphs: [
        "RocketAiFlow include funzioni pronte che puoi usare come base di partenza invece di costruire ogni azione da zero.",
        "Usa prima questi esempi quando corrispondono al workflow. Quando l'agente deve chiamare sistemi aziendali tramite API, RocketAiFlow ti permette di creare e chiamare tutte le functions custom necessarie al workflow.",
        <>Per <code>hangup_call</code>, <code>transfer</code> e <code>rescheduled_contact</code>, mantieni i parametri preconfigurati esattamente come sono. Non eliminarli, non rinominarli e non modificarne la struttura. Sono già allineati alle API interne di RocketAiFlow. Adatta solo descrizioni e valori consentiti dove la funzione lo richiede.</>
      ],
      items: [
        <><code>hangup_call</code>: chiude la chiamata quando il workflow è completo.</>,
        <><code>transfer</code>: trasferisce la chiamata a una destinazione umana o a un interno.</>,
        <><code>rescheduled_contact</code>: salva una data futura di callback per il contatto.</>,
        <><code>save_lead_qualification</code>: registra il risultato di qualificazione lead raccolto dall'agente.</>
      ]
    },
    hangup: {
      title: "hangup_call",
      paragraphs: [
        <>Usa <code>hangup_call</code> quando l'agente deve chiudere la chiamata attiva dopo aver completato il workflow.</>,
        "Quando selezioni questa funzione preconfigurata, RocketAiFlow imposta automaticamente l'endpoint interno usato per chiudere la chiamata. Non devi configurare manualmente l'endpoint.",
        <>Mantieni il parametro <code>reason</code> esattamente come viene fornito. Non eliminarlo, non rinominarlo e non modificarne la struttura. Cambia solo le descrizioni:</>,
        "In questo modo l'endpoint resta sicuro e l'LLM si concentra sul decidere quando la chiamata è completa e quale motivo di chiusura deve essere registrato."
      ],
      items: [
        "descrizione funzione: spiega quando l'agente deve terminare la chiamata",
        <>setup di <code>reason</code>: lascialo come string required e mantieni <code>Use enum</code> abilitato</>,
        <>descrizione del parametro <code>reason</code>: spiega quale motivo l'agente deve passare quando chiude la chiamata</>,
        <><code>booking_completed</code>: usalo quando l'obiettivo principale della conversazione è stato completato</>,
        <><code>goodbye</code>: usalo quando la conversazione si è conclusa naturalmente e non c'è altro da dire</>,
        <><code>abandoned_call</code>: usalo quando l'utente smette di partecipare o la chiamata non è più utilizzabile</>
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-hangup-call.png",
          alt: "Funzione preconfigurata hangup_call con reason required, Use enum abilitato e valori consentiti per chiudere la chiamata."
        }
      ]
    },
    transfer: {
      title: "transfer",
      paragraphs: [
        "Usa una funzione di transfer quando l'agente deve spostare la chiamata attiva verso un'altra destinazione.",
        <>RocketAiFlow include opzioni di transfer preconfigurate che usano automaticamente l'API interna di transfer. Scegli l'opzione più adatta al workflow, poi modifica solo descrizioni e valori consentiti. Non eliminare, rinominare o sostituire il parametro <code>exten</code> fornito.</>,
        <>Se non selezioni un contesto di transfer personalizzato, RocketAiFlow usa il contesto di default <code>raf-internal</code>. Mantieni <code>Priority</code> a <code>1</code>, salvo routing telefonico specifico.</>
      ],
      items: [
        <><code>transfer</code>: trasferisce la chiamata al numero di telefono o interno fornito nel parametro <code>exten</code>.</>,
        <><code>transfer_call</code>: viene creata da <strong>Transfer To Extension</strong>. Usala per un interno o numero noto. Mantieni <code>exten</code> required e lascia <code>Use enum</code> disattivato. Esempio: transfer a <code>600</code>.</>,
        <><code>transfer_to_service</code>: viene creata da <strong>Transfer To Service</strong>. Usala per un reparto supportato. Mantieni <code>exten</code> required e <code>Use enum</code> abilitato con valori come <code>sales</code>, <code>support</code> e <code>administration</code>.</>,
        <><strong>Mode</strong> e <strong>Priority</strong>: usa <code>Custom</code> solo quando serve un contesto di transfer diverso, e cambia la priority solo quando la rotta lo richiede.</>
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-transfer-extension.png",
          alt: "Preset Transfer To Extension con transfer_call, parametro exten required, mode custom, context raf-internal e priority 1.",
          caption: "Transfer To Extension"
        },
        {
          src: "/screenshots/docs/function-transfer-service.png",
          alt: "Preset Transfer To Service con transfer_to_service, exten enum required, valori consentiti sales support administration, mode custom, context raf-internal e priority 1.",
          caption: "Transfer To Service"
        }
      ]
    },
    rescheduled: {
      title: "rescheduled_contact",
      paragraphs: [
        <>Usa <code>rescheduled_contact</code> quando il contatto chiede di essere richiamato più avanti o quando il workflow deve salvare un callback futuro.</>,
        <>Questa funzione preconfigurata usa il parametro <code>data</code>. Non eliminarlo, non rinominarlo e non modificarne la struttura. Il parametro <code>data</code> serve a salvare data e ora richieste dall'utente per la prossima chiamata.</>,
        "Quando la funzione viene eseguita, la chiamata rischedulata può essere salvata in:",
        "Per questa funzione cambia solo descrizioni e valore campagna quando serve. Mantieni la struttura dei parametri fornita, così l'agente può raccogliere l'orario di callback richiesto e salvare il contatto nella campagna corretta."
      ],
      items: [
        "la campagna selezionata nella configurazione della funzione",
        "la campagna di default associata all'agente, se non viene selezionata una campagna specifica"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-rescheduled-contact.png",
          alt: "Funzione preconfigurata rescheduled_contact con parametro data, descrizione data e ora callback, selezione campagna e JSON preview.",
        }
      ],
      callout: "Fai attenzione: in un workflow inbound, se vuoi salvare il callback dentro una campagna, la campagna deve essere selezionata obbligatoriamente. Altrimenti la chiamata da rischedulare non viene salvata nella campagna."
    },
    leadQualification: {
      title: "save_lead_qualification",
      paragraphs: [
        <>Usa <code>save_lead_qualification</code> quando l'agente deve raccogliere informazioni strutturate e salvare il risultato di qualificazione di un lead.</>,
        <>A differenza delle funzioni di call control come <code>hangup_call</code> o <code>transfer</code>, questa funzione è pensata per essere adattata all'obiettivo di business. Mantieni solo i parametri utili al tuo flusso di qualificazione e aggiungine di nuovi quando l'agente deve raccogliere più informazioni.</>,
        <>In molti workflow, <code>save_lead_qualification</code> può essere chiamata più volte durante la stessa chiamata. Usa chiamate ripetute per salvare informazioni parziali man mano che l'agente le raccoglie, invece di aspettare solo la fine e rischiare di perdere dati utili.</>,
        "Parti dallo schema di esempio, poi rimuovi i campi che non servono alla campagna o al flusso inbound. Mantieni solo i dati che andrai davvero a rivedere, riportare o inviare a un altro sistema.",
        "Dopo aver cambiato lo schema, aggiorna descrizione della function e descrizioni dei parametri, così l'LLM sa cosa raccogliere prima di ogni salvataggio."
      ],
      items: [
        "parametri di esempio preimpostati: lead_name, phone, email, company_name, role, interested, qualification_status",
        "salvataggio progressivo: chiama la function dopo aver raccolto campi importanti, poi richiamala quando sono disponibili nuovi dati di qualificazione",
        "campi utili: interesse del customer, range di budget, dimensione azienda, canale di follow-up preferito, outcome di qualificazione e note chiamata"
      ],
      screenshots: [
        {
          src: "/screenshots/docs/function-save-lead-qualification.png",
          alt: "Funzione preconfigurata save_lead_qualification con parametri modificabili come lead_name, phone, email, company_name, role, interested e qualification_status.",
        }
      ]
    },
    decide: {
      title: "Come decidere cosa mettere in una function",
      paragraphs: [
        "Usa una function quando l'agente deve eseguire un'azione reale, non solo parlare.",
        "Le functions collegano la conversazione al workflow aziendale. Con una function, l'agente può trasferire una chiamata, salvare dati, creare un follow-up o usare un software aziendale tramite API.",
        "Non creare una function per regole che possono stare nel prompt. Tono di voce, frasi da dire, domande da fare e comportamento conversazionale vanno nel prompt.",
        "Crea una function quando l'agente deve:"
      ],
      items: [
        "trasferire la chiamata",
        "chiudere la chiamata",
        "salvare dati raccolti durante la conversazione",
        "recuperare informazioni da un altro sistema",
        "aggiornare un CRM o un altro software tramite API",
        "creare follow-up, callback, task, ticket, lead o appuntamenti"
      ]
    },
    apiBacked: {
      title: "Le functions possono usare software aziendali tramite API",
      paragraphs: [
        "Questo è il valore principale delle functions: l'agente non si limita a parlare. Può usare le API degli strumenti che l'azienda usa già ed eseguire automaticamente azioni strutturate.",
        "Usa functions basate su API solo dove il workflow richiede un'azione esterna controllata. L'agente decide quando la function deve partire; RocketAiFlow invia la richiesta strutturata all'endpoint configurato."
      ],
      items: [
        "aggiornare un CRM dopo la qualificazione di un lead",
        "controllare disponibilità o recuperare dettagli account",
        "creare follow-up, ticket, task, opportunità, note, preventivi o appuntamenti",
        "chiamare software interni che espongono un endpoint API sicuro"
      ]
    },
    customApi: {
      title: "Functions custom con API",
      paragraphs: [
        "Usa una function custom con API quando una function preconfigurata non basta e l'agente deve chiamare un tool aziendale, un provider o un servizio interno.",
        "RocketAiFlow può creare functions custom per qualunque workflow che espone un endpoint API raggiungibile. Puoi aggiungere più functions custom allo stesso agente quando il workflow richiede azioni aziendali diverse.",
        "Una function custom definisce la chiamata API: metodo, URL, headers, body o valori query, parametri generati dall'LLM, valori renderizzati dal contatto, uso della risposta e gestione errori."
      ],
      items: [
        "Method e URL: scegli GET, POST, PUT, PATCH o DELETE e usa una URL fissa o una template URL come https://api.example.com/contacts/{t.externalId}/notes.",
        "Headers e auth: aggiungi autenticazione e header richiesti dall'API, come Authorization o Content-Type.",
        "Parametri LLM: valori che l'agente raccoglie o decide durante la chiamata, come location, callback_reason, interest_level, note o appointment_date.",
        "Parametri contact/template: valori renderizzati dal contatto attivo, come {t.name}, {t.phone}, {t.email}, {t.externalId} o dati custom del contatto.",
        "Campi required ed enum: marca un valore come required quando l'API non può partire senza quel dato, e usa enum quando l'API accetta solo opzioni fisse.",
        "Risposta ed errori: descrivi come l'agente deve usare la risposta API e quale fallback usare se l'API non è disponibile, rifiuta la richiesta o restituisce dati mancanti."
      ],
      screenshots: [
        {
          src: "/screenshots/docs/functions-builder-custom-endpoint.png",
          alt: "Function builder per endpoint custom con metodo, URL, headers, body e configurazione parametri."
        },
        {
          src: "/screenshots/docs/functions-builder-weather-get.png",
          alt: "Esempio function custom GET con parametro location required e template URL.",
          caption: "Esempio GET"
        }
      ],
      callouts: [
        <div className="docs-prompt-schema" key="custom-api-example">
          <strong>Esempio function custom API</strong>
          <span>Nome: <span className="docs-callout-token">create_crm_followup</span></span>
          <span>Method: <span className="docs-callout-token">POST</span></span>
          <span>URL: <span className="docs-callout-token">https://crm.example.com/contacts/{"{t.externalId}"}/tasks</span></span>
          <span>Parametri LLM: motivo follow-up, summary, priorità, data preferita.</span>
          <span>Valori contact/template: id contatto, nome, telefono, email o metadata campagna.</span>
          <span>Regola prompt: chiama questa function solo dopo che il chiamante ha confermato di volere un follow-up e l'agente ha raccolto i campi required.</span>
        </div>
      ]
    },
    dynamicValues: {
      title: "I valori dinamici appartengono agli input delle functions",
      paragraphs: [
        "Gli input delle functions non devono restare statici. Possono combinare valori raccolti dall'LLM con valori renderizzati dal contatto attivo o dal contesto del workflow.",
        "Quando i dati del contatto sono disponibili, usa i campi del contatto in descrizioni, template URL, body o query. Così una stessa function funziona su contatti diversi senza hardcodare URL specifiche.",
        <>Esempio: se una function custom <code>PUT</code> deve aggiornare un contatto nel tuo CRM e l'id del CRM è stato caricato nei dati del contatto come <code>externalId</code>, puoi usare quel valore nella URL API, per esempio <code>https://crm.example.com/contacts/{"{t.externalId}"}</code>. RocketAiFlow renderizza l'id dal contatto attivo, mentre l'LLM genera solo i campi da aggiornare, come stato, note o risultato della qualificazione.</>,
        "Usa valori dinamici quando la stessa function deve comportarsi diversamente per contatto, campagna, route, metadata chiamata o informazioni raccolte durante la conversazione."
      ],
      items: [
        "campi del contatto come name, phone, email, campaign id, externalId o chiavi custom dentro data",
        "template URL API che includono valori del contatto quando l'endpoint ne ha bisogno",
        "metadata di workflow, campagna, route o chiamata",
        "valori raccolti durante la conversazione"
      ]
    },
    promptUsage: {
      title: "Spiega all'LLM quando chiamare ogni function",
      paragraphs: [
        <>In RocketAiFlow non basta dare un nome chiaro alla function. Nel prompt dell'agente aggiungi una breve sezione <code>Functions</code> e collega ogni situazione di business al nome esatto della function da chiamare. Vedi <InlineDocsLink href="/build/configure-agent-prompt">Configura il prompt</InlineDocsLink>.</>,
        <>OpenAI descrive le function come strumenti che permettono al modello di usare funzionalità e dati esterni quando servono per seguire le istruzioni. Vedi la <ExternalDocsLink href={openAiFunctionCallingUrl}>guida OpenAI sulle function calling</ExternalDocsLink> e la <ExternalDocsLink href={openAiPromptGuidanceUrl}>prompt guidance di OpenAI</ExternalDocsLink>.</>,
        "Scrivi il prompt come una regola operativa, non come una descrizione generica della funzionalità."
      ],
      items: [
        <><code>transfer_to_service</code>: chiamala solo quando il chiamante chiede un reparto supportato, per esempio sales, support o administration. Usa il valore enum corretto in <code>exten</code>.</>,
        <><code>transfer_call</code>: chiamala quando il chiamante chiede esplicitamente di parlare con una persona o quando il workflow richiede un trasferimento a un interno noto.</>,
        <><code>rescheduled_contact</code>: chiamala solo dopo che il chiamante ha chiesto di essere ricontattato e l'agente ha raccolto o confermato data e ora del callback.</>,
        <><code>save_lead_qualification</code>: chiamala quando sono stati raccolti campi utili per la qualificazione. Può essere chiamata più volte durante la stessa chiamata per salvare progressivamente i dati, poi richiamata quando sono disponibili nuove informazioni. Se manca un campo required per quell'aggiornamento, fai prima una breve domanda di follow-up.</>,
        <><code>hangup_call</code>: chiamala solo quando la conversazione ha raggiunto un punto di chiusura chiaro, per esempio prenotazione completata, saluto finale, chiamata abbandonata o silence timeout.</>,
        "Per ogni function, aggiungi anche una regola negativa: non chiamarla se mancano le informazioni richieste o se l'utente non ha espresso l'intenzione corretta."
      ],
      callouts: [
        <div className="docs-prompt-schema" key="generic">
          <strong>Come citare le functions nel prompt</strong>
          <span>Richiama la function con il suo nome esatto, poi descrivi l'azione o la condizione in cui deve essere chiamata.</span>
          <span>Esempio: “Quando l'utente chiede di completare [obiettivo], chiama <span className="docs-callout-token">function_name</span> per eseguire [azione]. Prima di chiamarla, raccogli [campi richiesti]. Se manca un campo required, fai prima una domanda breve.”</span>
        </div>,
        <div className="docs-prompt-schema" key="example">
          <strong>Esempio prompt</strong>
          <span>Usa <span className="docs-callout-token">save_lead_qualification</span> dopo aver raccolto campi utili per qualificare il lead.</span>
          <span>Puoi chiamarla più volte durante la stessa chiamata per salvare dati parziali, poi aggiornarli mentre la conversazione prosegue.</span>
          <span>Se manca un campo obbligatorio per l'aggiornamento corrente, fai prima una breve domanda di follow-up.</span>
          <span>Non chiamare la function se il cliente non ha dato abbastanza informazioni per valutare il lead.</span>
        </div>
      ]
    },
    bestPractices: {
      title: "Come strutturare le descrizioni delle functions",
      paragraphs: [
        <>OpenAI raccomanda nomi funzione, descrizioni parametro e istruzioni chiare. In RocketAiFlow, considera la descrizione della function come il contratto di chiamata: deve dire all'LLM cosa fa la function, quando chiamarla, quali dati servono e quando non chiamarla.</>,
        "OpenAI non richiede heading Markdown come # dentro la description della function. Usa testo chiaro oppure label brevi come Scopo, Chiamala quando, Non chiamarla quando e Argomenti solo se rendono la descrizione più leggibile.",
        "Tieni la policy del workflow nel prompt dell'agente, poi usa descrizione della function e descrizione dei parametri per rendere precisa ogni azione API."
      ],
      items: [
        "Nome function: usa un nome azione stabile, per esempio save_lead_qualification o transfer_to_service.",
        "Descrizione function: parti dall'azione di business, poi aggiungi la condizione di attivazione: chiamala quando...",
        "Regola negativa: spiega quando la function non deve essere chiamata, soprattutto se mancano informazioni required.",
        "Parametri required: descrivi cosa l'agente deve raccogliere prima della chiamata. Se manca un valore required, l'agente deve fare prima una breve domanda di follow-up.",
        "Descrizione parametri: specifica significato, origine del valore, formato, esempi e valori consentiti.",
        "Enum: usali solo per insiemi chiusi e rendi chiaro il significato di ogni valore consentito.",
        <>Valori renderizzati dal contatto: indica quando un valore arriva dal contatto attivo, per esempio <code>{"{t.externalId}"}</code>, invece di essere generato dall'LLM.</>,
        "Una function deve rappresentare una sola azione di business. Evita di mischiare transfer, salvataggio dati, lookup e update nella stessa function.",
        "Mantieni allineati prompt e descrizioni: stesso nome function, stesso trigger, stessi campi required."
      ],
      callout: (
        <div className="docs-prompt-schema">
          <strong>Template descrizione function</strong>
          <span>Scopo: cosa fa la function in una frase di business.</span>
          <span>Chiamala quando: intenzione utente o condizione del workflow che deve attivarla.</span>
          <span>Non chiamarla quando: informazione mancante, richiesta non supportata o condizione non sicura.</span>
          <span>Prima di chiamarla: campi required da raccogliere o confermare.</span>
          <span>Argomenti: ogni parametro con origine, formato, esempio e valori consentiti.</span>
        </div>
      )
    },
    validation: {
      title: "Prima validazione",
      paragraphs: ["Dopo aver salvato le functions, conferma che:"],
      items: [
        "i nomi delle funzioni siano chiari",
        "i parametri required siano presenti",
        "le destinazioni di transfer siano valide",
        "il prompt dica all'agente quando chiamare ogni funzione",
        "l'agente non chiami una function quando mancano informazioni required",
        "le functions basate su API inviino il payload atteso allo strumento aziendale di destinazione",
        "i callback rischedulati vengano salvati nella campagna prevista quando serve salvarli in campagna"
      ]
    },
    mistakes: {
      title: "Errori comuni sulle functions",
      paragraphs: [],
      items: [
        "aggiungere troppe functions non correlate nello stesso agente",
        "usare nomi parametro poco chiari",
        "non allineare il prompt alle funzioni disponibili",
        "testare transfer senza una destinazione valida",
        "usare un'API aziendale senza controllare autenticazione, campi required e gestione errori",
        "mettere troppe azioni di business non correlate dentro la stessa function"
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Assegna l'agente a un percorso inbound quando prompt e functions sono pronti."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Riusa lo stesso agente in una campagna outbound dopo aver allineato prompt e functions."
      },
      {
        title: "Parametri dinamici",
        href: "/build/dynamic-parameters",
        description: "Rivedi come campi contatto e valori runtime possono popolare prompt, greeting e input delle functions."
      }
    ]
  }
};

function useAddFunctionsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return addFunctionsCopy[locale];
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
      {section.screenshots?.map((screenshot) => (
        <figure className="docs-screenshot" key={screenshot.src}>
          <div className="docs-screenshot-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="docs-screenshot-img" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
          </div>
          {screenshot.caption ? <figcaption className="docs-screenshot-caption">{screenshot.caption}</figcaption> : null}
        </figure>
      ))}
      {[...(section.callout ? [section.callout] : []), ...(section.callouts ?? [])].map((callout, index) => (
        <div className="docs-feature-callout" key={index}>
          <div className="docs-feature-callout-body">{callout}</div>
        </div>
      ))}
    </section>
  );
}

function CardGrid({ cards }: { cards: LinkCard[] }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <div className="docs-home-card-grid docs-home-card-grid-2">
      {cards.map((card) => (
        <Link key={card.href} className="docs-home-card" href={localizeHref(card.href, locale)}>
          <span className="docs-home-card-title">{card.title}</span>
          <span className="docs-home-card-description">{card.description}</span>
        </Link>
      ))}
    </div>
  );
}

export function LocalizedAddFunctionsTitle() {
  return <>{useAddFunctionsCopy().title}</>;
}

export function LocalizedAddFunctionsHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useAddFunctionsCopy();
  const labels: Record<HeadingKey, string> = {
    setup: copy.setup.title,
    preconfigured: copy.preconfigured.title,
    hangup: copy.hangup.title,
    transfer: copy.transfer.title,
    rescheduled: copy.rescheduled.title,
    leadQualification: copy.leadQualification.title,
    decide: copy.decide.title,
    apiBacked: copy.apiBacked.title,
    customApi: copy.customApi.title,
    dynamicValues: copy.dynamicValues.title,
    promptUsage: copy.promptUsage.title,
    bestPractices: copy.bestPractices.title,
    validation: copy.validation.title,
    mistakes: copy.mistakes.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedAddFunctionsIntro() {
  const copy = useAddFunctionsCopy();
  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedAddFunctionsPreconfiguredExamples() {
  return <Section section={useAddFunctionsCopy().preconfigured} />;
}

export function LocalizedAddFunctionsSetup() {
  return <Section section={useAddFunctionsCopy().setup} />;
}

export function LocalizedAddFunctionsHangup() {
  return <Section section={useAddFunctionsCopy().hangup} />;
}

export function LocalizedAddFunctionsTransfer() {
  return <Section section={useAddFunctionsCopy().transfer} />;
}

export function LocalizedAddFunctionsRescheduled() {
  return <Section section={useAddFunctionsCopy().rescheduled} />;
}

export function LocalizedAddFunctionsLeadQualification() {
  return <Section section={useAddFunctionsCopy().leadQualification} />;
}

export function LocalizedAddFunctionsDecide() {
  return <Section section={useAddFunctionsCopy().decide} />;
}

export function LocalizedAddFunctionsApiBacked() {
  return <Section section={useAddFunctionsCopy().apiBacked} />;
}

export function LocalizedAddFunctionsCustomApi() {
  return <Section section={useAddFunctionsCopy().customApi} />;
}

export function LocalizedAddFunctionsDynamicValues() {
  return <Section section={useAddFunctionsCopy().dynamicValues} />;
}

export function LocalizedAddFunctionsPromptUsage() {
  return <Section section={useAddFunctionsCopy().promptUsage} />;
}

export function LocalizedAddFunctionsBestPractices() {
  return <Section section={useAddFunctionsCopy().bestPractices} />;
}

export function LocalizedAddFunctionsValidation() {
  return <Section section={useAddFunctionsCopy().validation} />;
}

export function LocalizedAddFunctionsMistakes() {
  return <Section section={useAddFunctionsCopy().mistakes} />;
}

export function LocalizedAddFunctionsNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={useAddFunctionsCopy().nextSteps} />
    </section>
  );
}
