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
  preconfigured: SectionCopy;
  hangup: SectionCopy;
  transfer: SectionCopy;
  rescheduled: SectionCopy;
  leadQualification: SectionCopy;
  decide: SectionCopy;
  apiBacked: SectionCopy;
  dynamicValues: SectionCopy;
  promptUsage: SectionCopy;
  bestPractices: SectionCopy;
  validation: SectionCopy;
  mistakes: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey =
  | "preconfigured"
  | "hangup"
  | "transfer"
  | "rescheduled"
  | "leadQualification"
  | "decide"
  | "apiBacked"
  | "dynamicValues"
  | "promptUsage"
  | "bestPractices"
  | "validation"
  | "mistakes"
  | "nextSteps";

const addFunctionsCopy: Record<Locale, AddFunctionsCopy> = {
  en: {
    title: "Configure Agent Functions",
    intro: [
      "Functions give the agent controlled ways to act during the call.",
      "For a first implementation, keep the function set small and directly tied to the workflow you are testing."
    ],
    preconfigured: {
      title: "Preconfigured Function Examples",
      paragraphs: [
        "RocketAiFlow includes ready functions that can be used as a starting point instead of building every action from zero.",
        "Use these examples first when they match the workflow. Create a custom endpoint only when the agent needs to call a business system through an API.",
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
        <><code>abandoned_call</code>: use it when the user stops participating or the call is no longer usable</>,
        <><code>silence_timeout</code>: use it when the configured silence timeout is reached</>
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
        "RocketAiFlow provides three preconfigured transfer functions. Each one automatically sets the internal API used to transfer the call. You do not need to configure the API manually.",
        <>Choose the option that matches the workflow, then adapt only descriptions and allowed values. Do not delete, rename, or replace the provided <code>exten</code> parameter.</>,
        <>You can also choose the transfer context used for the <code>exten</code>. If you do not select a context, RocketAiFlow uses the preconfigured default context <code>raf-internal</code>.</>
      ],
      items: [
        <><code>transfer</code>: transfers the call to the phone number or extension provided in the <code>exten</code> parameter.</>,
        <><code>transfer_call</code>: created by the <strong>Transfer To Extension</strong> preset. It transfers the call to the phone number or extension provided. Keep <code>exten</code> required and leave <code>Use enum</code> off, because the value is a phone number or extension. Example: if the user says "let me talk to a human", call this function with <code>exten</code> set to <code>600</code>.</>,
        <><code>transfer_to_service</code>: created by the <strong>Transfer To Service</strong> preset. It transfers the call to the correct supported service. Keep <code>exten</code> required and keep <code>Use enum</code> enabled, because the value must be one of the supported services: <code>sales</code>, <code>support</code>, or <code>administration</code>. Do not invent other service values.</>,
        <><strong>Transfer To Extension</strong>: ready setup for an extension or phone number. Leave the default mode for the first test. Switch to <code>Custom</code> only if you need to use a different transfer context. If no custom context is selected, RocketAiFlow uses <code>raf-internal</code>; keep <code>Priority</code> as <code>1</code> unless your route requires another value.</>,
        <><strong>Transfer To Service</strong>: ready setup for a service/department transfer. Leave the default mode for the first test. Switch to <code>Custom</code> only if you need to use a different transfer context. If no custom context is selected, RocketAiFlow uses <code>raf-internal</code>; keep <code>Priority</code> as <code>1</code> unless your route requires another value.</>,
        <><strong>Mode</strong>: choose <code>Custom</code> when you want to select a custom transfer context. Otherwise keep the default mode for the first test.</>,
        <><strong>Priority</strong>: keep the default value for the first test unless your telephony route requires another priority.</>
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
        "You can start from a broad schema that includes identity fields, qualification outcome, interest level, budget, timeline, decision maker status, requested action, callback/demo dates, lead score, summary, notes, and raw interview data.",
        "Do not keep the full schema by default. For each campaign or inbound flow, remove the parameters that do not support the business objective and keep only the fields you will actually review or send to another system.",
        "For example, you may track:",
        "Customize the function by removing parameters that do not matter and adding the fields required by your business process. Then update the function and parameter descriptions so the LLM knows exactly what to collect before saving the lead qualification."
      ],
      items: [
        "default example parameters: lead_name, phone, email, company_name, role, interested, qualification_status",
        "extended optional parameters: interest_level, not_interested_reason, pain_points, current_solution, budget_level, timeline, decision_maker, requested_action, callback_at_utc, demo_requested, demo_at_utc, lead_score, ai_summary, important_notes, raw_interview_data",
        "customer interest",
        "budget range",
        "company size",
        "preferred follow-up channel",
        "qualification outcome",
        "notes collected during the call"
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
        "Use a function when the agent needs to:",
        "Functions are the practical bridge between the conversation and the rest of the business workflow. This is where RocketAiFlow becomes more than a static voice script.",
        "Do not add functions for behavior that can be handled by prompt instructions alone."
      ],
      items: [
        "transfer the call",
        "end the call",
        "request structured information from another system"
      ]
    },
    apiBacked: {
      title: "Functions can trigger API-backed actions",
      paragraphs: [
        "Functions can support external actions such as:",
        "The goal is not to add APIs everywhere. The goal is to add functions only where the workflow needs structured interaction with another system."
      ],
      items: [
        "updating a CRM after lead qualification",
        "checking availability before appointment booking",
        "looking up account or contact details",
        "sending a follow-up action after a call outcome is confirmed",
        "routing the call based on an external rule or decision service"
      ]
    },
    dynamicValues: {
      title: "Dynamic values belong in function inputs",
      paragraphs: [
        "Function inputs do not have to stay static. They can receive context-specific values such as:",
        "When contact data is available, you can use contact fields inside function descriptions and inside API URL templates. This lets the same function call the right endpoint or pass the right context without hardcoding values for every contact.",
        <>Example: if a custom <code>PUT</code> function must update a CRM contact and the CRM id was imported in the contact data as <code>data.externalId</code>, use that value in the API URL, for example <code>https://crm.example.com/contacts/{"{t.data.externalId}"}</code>. RocketAiFlow renders the contact id from the active contact, while the LLM can generate only the fields that need to be updated, such as status, notes, or qualification result.</>,
        "This is useful when one function should behave differently depending on who is calling, which campaign is running, or what the agent has already learned during the call."
      ],
      items: [
        "contact fields, for example name, phone, email, campaign id, or custom data keys",
        "API URL templates that include contact values when the endpoint needs them",
        "function descriptions that mention contact values so the LLM knows how to use available context",
        "workflow variables",
        "campaign identifiers",
        "route or call metadata",
        "runtime values collected during the conversation"
      ]
    },
    promptUsage: {
      title: "Tell the LLM when to call each function",
      paragraphs: [
        <>OpenAI describes function calling as a way for models to use external functionality and data when needed to follow instructions. See the <a href="https://developers.openai.com/api/docs/guides/function-calling" target="_blank" rel="noreferrer">OpenAI function calling guide</a>.</>,
        <>For RocketAiFlow, do not rely only on the function name. Add a short <code>Functions</code> section in the agent prompt and map each business situation to the exact function the agent should call. This matches OpenAI&apos;s broader recommendation to structure prompts with clear sections and instructions. See <a href="https://developers.openai.com/api/docs/guides/prompt-guidance" target="_blank" rel="noreferrer">OpenAI prompt guidance</a>.</>,
        "Write the prompt like an operating rule, not like a generic feature description."
      ],
      items: [
        <><code>transfer_to_service</code>: call it only when the caller asks for a supported department such as sales, support, or administration. Use the matching <code>exten</code> enum value.</>,
        <><code>transfer_call</code>: call it when the caller explicitly asks to speak with a human or when the workflow requires a handoff to a known extension.</>,
        <><code>rescheduled_contact</code>: call it only after the caller asks to be contacted later and the agent has collected or confirmed the callback date and time.</>,
        <><code>save_lead_qualification</code>: call it after the agent has collected the required qualification fields. If a required field is missing, ask a short follow-up question before calling the function.</>,
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
          <span>Use <span className="docs-callout-token">save_lead_qualification</span> only after you have collected the required qualification fields.</span>
          <span>If a required field is missing, ask one short follow-up question before calling the function.</span>
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
        <>Contact-rendered values: say when a value comes from the active contact, for example <code>{"{t.data.externalId}"}</code>, instead of being generated by the LLM.</>,
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
        "the prompt tells the agent when to call each function"
      ]
    },
    mistakes: {
      title: "Common Function Mistakes",
      paragraphs: [],
      items: [
        "adding too many functions before the first test",
        "using unclear parameter names",
        "forgetting to align the prompt with the available functions",
        "testing transfers without a valid destination"
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/ai-inbound-routing",
        description: "Assign the agent to an inbound path once the prompt and functions are in place."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Reuse the same agent in an outbound campaign after the first inbound behavior is stable."
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
      "Le functions danno all'agente modi controllati per agire durante la chiamata.",
      "Per la prima implementazione, tieni il set di funzioni piccolo e collegato direttamente al workflow che stai testando."
    ],
    preconfigured: {
      title: "Esempi di functions preconfigurate",
      paragraphs: [
        "RocketAiFlow include funzioni pronte che puoi usare come base di partenza invece di costruire ogni azione da zero.",
        "Usa prima questi esempi quando corrispondono al workflow. Crea un endpoint custom solo quando l'agente deve chiamare un sistema aziendale tramite API.",
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
        <><code>abandoned_call</code>: usalo quando l'utente smette di partecipare o la chiamata non è più utilizzabile</>,
        <><code>silence_timeout</code>: usalo quando viene raggiunto il timeout di silenzio configurato</>
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
        "RocketAiFlow include tre funzioni di transfer preconfigurate. Ognuna imposta automaticamente l'API interna usata per trasferire la chiamata. Non devi configurare manualmente l'API.",
        <>Scegli l'opzione più adatta al workflow, poi modifica solo descrizioni e valori consentiti. Non eliminare, rinominare o sostituire il parametro <code>exten</code> fornito.</>,
        <>Puoi anche scegliere il contesto di transfer usato per l'<code>exten</code>. Se non selezioni nessun contesto, RocketAiFlow usa il contesto preconfigurato di default <code>raf-internal</code>.</>
      ],
      items: [
        <><code>transfer</code>: trasferisce la chiamata al numero di telefono o interno fornito nel parametro <code>exten</code>.</>,
        <><code>transfer_call</code>: viene creata dal preset <strong>Transfer To Extension</strong>. Trasferisce la chiamata al numero di telefono o interno fornito. Mantieni <code>exten</code> required e lascia <code>Use enum</code> disattivato, perché il valore è un numero o interno. Esempio: se l'utente dice "fammi parlare con un operatore", chiama questa funzione con <code>exten</code> impostato a <code>600</code>.</>,
        <><code>transfer_to_service</code>: viene creata dal preset <strong>Transfer To Service</strong>. Trasferisce la chiamata al servizio supportato corretto. Mantieni <code>exten</code> required e mantieni <code>Use enum</code> abilitato, perché il valore deve essere uno dei servizi supportati: <code>sales</code>, <code>support</code> o <code>administration</code>. Non inventare altri valori servizio.</>,
        <><strong>Transfer To Extension</strong>: setup pronto per un interno o numero telefonico. Lascia il mode di default per il primo test. Cambia a <code>Custom</code> solo se vuoi usare un contesto di transfer diverso. Se non selezioni un contesto personalizzato, RocketAiFlow usa <code>raf-internal</code>; mantieni <code>Priority</code> a <code>1</code> salvo routing specifico.</>,
        <><strong>Transfer To Service</strong>: setup pronto per trasferire verso un servizio o reparto. Lascia il mode di default per il primo test. Cambia a <code>Custom</code> solo se vuoi usare un contesto di transfer diverso. Se non selezioni un contesto personalizzato, RocketAiFlow usa <code>raf-internal</code>; mantieni <code>Priority</code> a <code>1</code> salvo routing specifico.</>,
        <><strong>Mode</strong>: scegli <code>Custom</code> quando vuoi selezionare un contesto di transfer personalizzato. Altrimenti lascia il mode di default per il primo test.</>,
        <><strong>Priority</strong>: lascia il valore di default per il primo test, salvo routing telefonico specifico.</>
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
        "Puoi partire da uno schema ampio che include dati identificativi, outcome di qualificazione, livello di interesse, budget, timeline, ruolo decisionale, azione richiesta, date callback/demo, lead score, summary, note e raw interview data.",
        "Non tenere tutto lo schema di default. Per ogni campagna o flusso inbound, rimuovi i parametri che non supportano l'obiettivo di business e mantieni solo i campi che andrai davvero a rivedere o inviare a un altro sistema.",
        "Per esempio puoi tracciare:",
        "Personalizza la funzione rimuovendo i parametri che non servono e aggiungendo i campi richiesti dal tuo processo di business. Poi aggiorna la descrizione della funzione e le descrizioni dei parametri, così l'LLM sa esattamente cosa raccogliere prima di salvare la qualificazione del lead."
      ],
      items: [
        "parametri di esempio preimpostati: lead_name, phone, email, company_name, role, interested, qualification_status",
        "parametri opzionali estesi: interest_level, not_interested_reason, pain_points, current_solution, budget_level, timeline, decision_maker, requested_action, callback_at_utc, demo_requested, demo_at_utc, lead_score, ai_summary, important_notes, raw_interview_data",
        "interesse del customer",
        "range di budget",
        "dimensione azienda",
        "canale di follow-up preferito",
        "outcome di qualificazione",
        "note raccolte durante la chiamata"
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
        "Usa una function quando l'agente deve:",
        "Le functions sono il ponte pratico tra conversazione e resto del workflow aziendale. Qui RocketAiFlow diventa più di uno script vocale statico.",
        "Non aggiungere functions per comportamenti che possono essere gestiti solo con istruzioni nel prompt."
      ],
      items: [
        "trasferire la chiamata",
        "chiudere la chiamata",
        "richiedere informazioni strutturate da un altro sistema"
      ]
    },
    apiBacked: {
      title: "Le functions possono attivare azioni via API",
      paragraphs: [
        "Le functions possono supportare azioni esterne come:",
        "L'obiettivo non è aggiungere API ovunque. L'obiettivo è aggiungere functions solo dove il workflow ha bisogno di interagire in modo strutturato con un altro sistema."
      ],
      items: [
        "aggiornare un CRM dopo la qualificazione di un lead",
        "controllare disponibilità prima di prenotare un appuntamento",
        "recuperare dettagli account o contatto",
        "creare un follow-up dopo la conferma dell'esito della chiamata",
        "instradare la chiamata in base a una regola esterna o a un decision service"
      ]
    },
    dynamicValues: {
      title: "I valori dinamici appartengono agli input delle functions",
      paragraphs: [
        "Gli input delle functions non devono restare statici. Possono ricevere valori specifici del contesto come:",
        "Quando i dati del contatto sono disponibili, puoi usare i campi del contatto nelle descrizioni della funzione e nella composizione delle URL per chiamate API. Questo permette alla stessa function di chiamare l'endpoint corretto o passare il contesto giusto senza creare valori statici per ogni contatto.",
        <>Esempio: se una function custom <code>PUT</code> deve aggiornare un contatto nel tuo CRM e l'id del CRM è stato caricato nei dati del contatto come <code>data.externalId</code>, puoi usare quel valore nella URL API, per esempio <code>https://crm.example.com/contacts/{"{t.data.externalId}"}</code>. RocketAiFlow renderizza l'id dal contatto attivo, mentre l'LLM genera solo i campi da aggiornare, come stato, note o risultato della qualificazione.</>,
        "Questo è utile quando una stessa function deve comportarsi diversamente in base a chi chiama, quale campagna è in corso o cosa l'agente ha già raccolto durante la chiamata."
      ],
      items: [
        "campi del contatto, ad esempio name, phone, email, campaign id o chiavi custom dentro data",
        "template URL API che includono valori del contatto quando l'endpoint ne ha bisogno",
        "descrizioni funzione che citano valori del contatto così l'LLM sa usare il contesto disponibile",
        "variabili del workflow",
        "identificativi campagna",
        "metadata di route o chiamata",
        "valori raccolti durante la conversazione"
      ]
    },
    promptUsage: {
      title: "Spiega all'LLM quando chiamare ogni function",
      paragraphs: [
        <>OpenAI descrive le function come strumenti che permettono al modello di usare funzionalità e dati esterni quando servono per seguire le istruzioni. Vedi la <a href="https://developers.openai.com/api/docs/guides/function-calling" target="_blank" rel="noreferrer">guida OpenAI sulle function calling</a>.</>,
        <>In RocketAiFlow non basta dare un nome chiaro alla function. Nel prompt dell'agente aggiungi una breve sezione <code>Functions</code> e collega ogni situazione di business al nome esatto della function da chiamare. Questo segue anche la raccomandazione OpenAI di strutturare i prompt con sezioni e istruzioni chiare. Vedi la <a href="https://developers.openai.com/api/docs/guides/prompt-guidance" target="_blank" rel="noreferrer">prompt guidance di OpenAI</a>.</>,
        "Scrivi il prompt come una regola operativa, non come una descrizione generica della funzionalità."
      ],
      items: [
        <><code>transfer_to_service</code>: chiamala solo quando il chiamante chiede un reparto supportato, per esempio sales, support o administration. Usa il valore enum corretto in <code>exten</code>.</>,
        <><code>transfer_call</code>: chiamala quando il chiamante chiede esplicitamente di parlare con una persona o quando il workflow richiede un trasferimento a un interno noto.</>,
        <><code>rescheduled_contact</code>: chiamala solo dopo che il chiamante ha chiesto di essere ricontattato e l'agente ha raccolto o confermato data e ora del callback.</>,
        <><code>save_lead_qualification</code>: chiamala dopo che l'agente ha raccolto i campi richiesti per la qualificazione. Se manca un campo required, fai prima una breve domanda di follow-up.</>,
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
          <span>Usa <span className="docs-callout-token">save_lead_qualification</span> solo dopo aver raccolto i campi richiesti per qualificare il lead.</span>
          <span>Se manca un campo obbligatorio, fai prima una breve domanda di follow-up.</span>
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
        <>Valori renderizzati dal contatto: indica quando un valore arriva dal contatto attivo, per esempio <code>{"{t.data.externalId}"}</code>, invece di essere generato dall'LLM.</>,
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
        "il prompt dica all'agente quando chiamare ogni funzione"
      ]
    },
    mistakes: {
      title: "Errori comuni sulle functions",
      paragraphs: [],
      items: [
        "aggiungere troppe functions prima del primo test",
        "usare nomi parametro poco chiari",
        "non allineare il prompt alle funzioni disponibili",
        "testare transfer senza una destinazione valida"
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/ai-inbound-routing",
        description: "Assegna l'agente a un percorso inbound quando prompt e functions sono pronti."
      },
      {
        title: "AI Dialer Flows",
        href: "/run-workflows/ai-dialer-flows",
        description: "Riusa lo stesso agente in una campagna outbound dopo aver stabilizzato il comportamento inbound."
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

export function LocalizedAddFunctionsTitle() {
  return <>{useAddFunctionsCopy().title}</>;
}

export function LocalizedAddFunctionsHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useAddFunctionsCopy();
  const labels: Record<HeadingKey, string> = {
    preconfigured: copy.preconfigured.title,
    hangup: copy.hangup.title,
    transfer: copy.transfer.title,
    rescheduled: copy.rescheduled.title,
    leadQualification: copy.leadQualification.title,
    decide: copy.decide.title,
    apiBacked: copy.apiBacked.title,
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
