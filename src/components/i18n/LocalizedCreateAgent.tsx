"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";

type StepCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type SpeakProvider = {
  name: string;
  value: string;
  href: string;
};

type CreateAgentCopy = {
  title: string;
  intro: ReactNode[];
  voiceSetup: StepCopy;
  languageTitle: string;
  languages: string[];
  providerTitle: string;
  providers: SpeakProvider[];
  customProvider: ReactNode[];
  greetingTitle: string;
  templateVariables: string[];
  greeting: ReactNode[];
  templateUsageItems: ReactNode[];
  templateInboundCallout: ReactNode;
  templateNotes: ReactNode[];
  llm: StepCopy;
  llmProviders: string[];
  llmNotes: ReactNode[];
  llmScreenshotAlt: string;
  llmCustomScreenshotAlt: string;
  functions: StepCopy;
  functionPills: string[];
  functionNotes: ReactNode[];
  functionsScreenshotAlt: string;
  transcription: StepCopy;
  transcriptionSettings: string[];
  transcriptionNotes: ReactNode[];
  transcriptionScreenshotAlt: string;
  agentSettings: StepCopy;
  agentSettingsNotes: ReactNode[];
  agentSettingsScreenshotAlt: string;
  screenshotAlt: string;
  customProviderScreenshotAlt: string;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey =
  | "voiceSetup"
  | "languages"
  | "providers"
  | "greeting"
  | "llm"
  | "functions"
  | "transcription"
  | "agentSettings"
  | "nextSteps";

const screenshotPath = "/screenshots/docs/agent-creation-form.png";
const customProviderScreenshotPath = "/screenshots/docs/custom-agent-provider.png";
const llmScreenshotPath = "/screenshots/docs/llm-configuration.png";
const llmCustomScreenshotPath = "/screenshots/docs/llm-custom-provider.png";
const functionsScreenshotPath = "/screenshots/docs/functions-builder-weather-get.png";
const transcriptionScreenshotPath = "/screenshots/docs/transcription-deepgram-nova3.png";
const agentSettingsScreenshotPath = "/screenshots/docs/agent-settings-runtime.png";
const openAiPromptGuidanceUrl = "https://developers.openai.com/api/docs/guides/prompt-guidance";
const openAiFunctionCallingUrl = "https://developers.openai.com/api/docs/guides/function-calling";
const openAiTextToSpeechUrl = "https://developers.openai.com/api/docs/guides/text-to-speech";
const deepgramConfigureVoiceAgentUrl = "https://developers.deepgram.com/docs/configure-voice-agent";
const deepgramFunctionCallingUrl = "https://developers.deepgram.com/docs/voice-agents-function-calling";
const deepgramModelsUrl = "https://developers.deepgram.com/docs/models-languages-overview";
const deepgramUrl = "https://deepgram.com/";
const elevenLabsUrl = "https://elevenlabs.io/";
const cartesiaUrl = "https://cartesia.ai/";
const amazonPollyUrl = "https://aws.amazon.com/polly/";
const preconfiguredFunctionExamplesUrl = "/build/add-functions#preconfigured-function-examples";
const customApiFunctionsUrl = "/build/add-functions#custom-api-functions";
const contactInboundsUrl = "/run-workflows/inbound-ai/contact-inbounds#use-contact-data-in-the-agent";
const defaultTemplateVariables = [
  "{t.CampaignId}",
  "{t.ContactId}",
  "{t.id}",
  "{t.name}",
  "{t.phone}",
  "{t.priority}",
  "{t.surname}",
  "{t.totalGlobal}",
  "{t.data.birthDate}"
];
const speakProviders: SpeakProvider[] = [
  { name: "Deepgram", value: "deepgram", href: deepgramUrl },
  { name: "ElevenLabs", value: "eleven_labs", href: elevenLabsUrl },
  { name: "Cartesia", value: "cartesia", href: cartesiaUrl },
  { name: "OpenAI", value: "open_ai", href: openAiTextToSpeechUrl },
  { name: "Amazon Polly", value: "aws_polly", href: amazonPollyUrl }
];

function UiPill({ children }: { children: ReactNode }) {
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

function ExternalDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-inline-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ExternalLinkIcon />
    </a>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" className="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

const createAgentCopy: Record<Locale, CreateAgentCopy> = {
  en: {
    title: "Create Your First AI Voice Agent",
    intro: [
      "Use this page as the complete configuration guide for the first reusable AI Voice Agent.",
      "The agent you create here can later be attached to inbound routing, outbound campaigns, Phone tests, and workflow automations.",
      "This page covers the full agent setup: Voice, languages, speak providers, greeting message, contact template variables, LLM, functions, transcription, and Agent settings."
    ],
    voiceSetup: {
      title: "1. Create the agent and configure Voice",
      paragraphs: [
        <>Go to <UiPill>AI Voice Agent</UiPill> and click <UiPill>Add Agent</UiPill>. In the Voice section, choose a clear agent name and enter the Deepgram API key.</>,
        "Then choose the language and the speak provider. Keep the first agent easy to recognize and configure it around one clear workflow goal."
      ],
      items: [
        "Agent name: use a name that makes the agent easy to recognize later in inbound routing and outbound campaigns.",
        <><ProviderBadge href={deepgramUrl}>Deepgram</ProviderBadge> API key: required for the agent setup in this flow.</>,
        "Language: select the language the agent should use during the call.",
        "Speak Provider Type: choose the voice provider used to generate the spoken response."
      ]
    },
    languageTitle: "Available languages",
    languages: ["Multilingual", "English", "Spanish", "Dutch", "French", "German", "Italian", "Japanese"],
    providerTitle: "Available speak providers",
    providers: speakProviders,
    customProvider: [
      "When you use a provider other than Deepgram, you can select one of the available agents or choose Custom Agent.",
      "With Custom Agent, enter the endpoint URL and API key to connect a custom voice agent/provider endpoint."
    ],
    greetingTitle: "Greeting message and contact template",
    templateVariables: defaultTemplateVariables,
    greeting: [
      "Use the greeting message to define the first sentence the agent says when the call starts.",
      "Use the contact template when the greeting, prompt, or function context needs dynamic contact values instead of fixed text.",
      <>The default template already includes the main parameters that belong to a contact created in RocketAiFlow.</>,
      <>You can extend the default template with additional keys. Custom keys are rendered from <code>data</code>: for example, a template key named <code>birthDate</code> is rendered as <code>{`{t.data.birthDate}`}</code>.</>,
      "The clearest way to use templates is to separate outbound and inbound data sources:"
    ],
    templateUsageItems: [
      <><strong>Outbound:</strong> template variables are rendered from the contact loaded into the campaign. If you need custom values, import or create contacts with the expected key-value pairs inside the <code>data</code> object.</>,
      <><strong>Inbound:</strong> template variables are rendered from <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink> only when agent settings allow contact lookup and the inbound contact list contains a contact matching the caller number.</>
    ],
    templateInboundCallout: (
      <>
        For inbound calls, template variables render only when <strong>Retrieve contact data for templates</strong> is enabled in <InlineDocsLink href="#agent-settings">Agent settings</InlineDocsLink> and <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink> contains a contact list with a phone number that matches the caller. If no matching contact is associated with the agent, the variable is not rendered.
      </>
    ),
    templateNotes: [
      <>In the greeting field, type <code>@</code> to see template variable suggestions, or click one of the variables shown under the greeting input.</>,
      "A variable is replaced only when the value exists on the contact used for that call. If the value is missing, that variable is not rendered.",
      <>In the <InlineDocsLink href="#agent-settings">Agent settings</InlineDocsLink> section, we will show in detail how to enable contact lookup when someone calls inbound.</>,
      <>To prepare the source contacts, see <InlineDocsLink href="/run-workflows/import-contacts#associate-contacts-with-a-campaign-or-agent">Import Contacts</InlineDocsLink>.</>,
      <>See <InlineDocsLink href="/build/dynamic-parameters#contact-template-variables">Contact template variables</InlineDocsLink> for the detailed model and how to create template variables.</>
    ],
    screenshotAlt: "AI Voice Agent creation screen with Voice settings, language, speak provider, greeting message, and contact template variables.",
    customProviderScreenshotAlt: "Custom Agent provider setup showing endpoint URL and API key fields.",
    llm: {
      title: "2. Configure LLM",
      paragraphs: [
        "Configure the language model that controls the agent reasoning, instructions, and prompt behavior.",
        <>You can use dynamic template variables here too. Type <code>@</code> in the prompt field or choose one of the template variables shown below the prompt.</>,
        <>When you select a provider, choose the related Think Provider Model. If you select <UiPill>Custom</UiPill>, configure the custom endpoint URL and authorization header.</>,
        <>For prompt writing, start from the RocketAiFlow <InlineDocsLink href="/build/configure-agent-prompt">Configure Agent Prompt</InlineDocsLink> guide.</>
      ],
      items: [
        "Think Provider Type: choose the LLM provider.",
        "Think Provider Model: choose the model for the selected provider.",
        "Temperature: control how deterministic or creative the responses should be.",
        "Prompt: define the agent instructions and use template variables when the prompt needs contact context."
      ]
    },
    llmProviders: ["OpenAI (open_ai)", "Anthropic (anthropic)", "Google (google)", "Groq (groq)", "NVIDIA (nvidia)", "Custom"],
    llmNotes: [
      "Use the selected provider guidance to structure role, goals, instructions, examples, and function-calling rules.",
      <>With <UiPill>Custom</UiPill>, provide the endpoint URL and an authorization header, for example <code>Authorization</code> with a bearer token.</>,
      "Use a custom provider only when the model endpoint, authentication, and response behavior are already known."
    ],
    llmScreenshotAlt: "LLM configuration screen with OpenAI provider, model, prompt field, and template variables.",
    llmCustomScreenshotAlt: "Custom LLM provider configuration showing endpoint URL and authorization header.",
    functions: {
      title: "3. Configure functions",
      paragraphs: [
        "Functions are the action layer of the voice agent. Without functions, the agent can only speak; with functions, it can perform real actions during the call.",
        "Use functions when the agent must transfer a call, end a conversation, save data, reschedule a contact, qualify a lead, or call business software through an API. With custom endpoints, RocketAiFlow can connect CRM, calendars, helpdesks, databases, internal systems, or any tool that exposes APIs.",
        "The flow is simple: the LLM understands that an action is needed, selects the right function, fills the required parameters, RocketAiFlow executes the configured endpoint, and the agent uses the result to continue the conversation."
      ],
      items: [
        "ready functions: hangup_call, transfer, rescheduled_contact, save_lead_qualification",
        "custom endpoints: GET, POST, PUT, PATCH, DELETE",
        "LLM parameters generated during the call and contact values rendered when available",
        "progressive saves: save_lead_qualification can be called multiple times during the same call to save partial lead data and update it as new information appears"
      ]
    },
    functionPills: ["hangup_call", "transfer", "rescheduled_contact", "save_lead_qualification", "Custom Endpoint", "GET", "POST", "PUT", "PATCH", "DELETE"],
    functionNotes: [
      <>Attach only the functions this agent needs. For complete setup details, see <InlineDocsLink href={preconfiguredFunctionExamplesUrl}>preconfigured examples</InlineDocsLink> and <InlineDocsLink href={customApiFunctionsUrl}>custom API functions</InlineDocsLink>.</>,
      <>Reference docs: <ExternalDocsLink href={openAiFunctionCallingUrl}>OpenAI function calling</ExternalDocsLink> and <ExternalDocsLink href={deepgramFunctionCallingUrl}>Deepgram Voice Agent function calling</ExternalDocsLink>.</>
    ],
    functionsScreenshotAlt: "Functions builder showing a custom GET endpoint where the agent collects a value, inserts it into the API URL, and uses the response to continue the conversation.",
    transcription: {
      title: "4. Configure transcription",
      paragraphs: [
        "Configure transcription so the agent can understand the caller and the call record can show a readable conversation.",
        <>For the voice agent flow shown here, use <UiPill>deepgram</UiPill> as the listen provider. The screenshot shows the validated setup: <UiPill>v1</UiPill> with <UiPill>nova-3</UiPill>.</>,
        <>Deepgram documents Flux as the model family built for real-time voice agents, while <code>nova-3</code> is their high-performing general-purpose streaming and batch ASR model. If you switch to Flux or another model, validate it with a controlled call before using it in production.</>,
        <>Choose the transcription language/model based on Deepgram support. If you know the caller language, use the specific language; if the call can contain multiple languages, check Deepgram multilingual guidance before changing the setup.</>
      ],
      items: [
        "Listen Provider Type: deepgram",
        "Listen Provider Version: v1 for Nova models, v2 for Flux models",
        "Listen Provider Model: nova-3 for the validated setup shown here",
        "Keyterms: add domain terms only when the agent repeatedly mishears important words",
        "Audio Input Encoding: choose the encoding used by the real telephony audio path",
        "Audio Input Sample Rate: keep 8000 for telephony, because phone audio runs at 8 kHz"
      ]
    },
    transcriptionSettings: ["deepgram", "v1", "nova-3", "alaw", "8000"],
    transcriptionNotes: [
      <>The screenshot uses <code>alaw</code> as the audio input encoding. If your trunk or provider uses a different telephony encoding, select the matching value.</>,
      <>Keep <code>Audio Input Sample Rate</code> set to <code>8000</code> for this telephony flow.</>,
      <>Reference docs: <ExternalDocsLink href={deepgramConfigureVoiceAgentUrl}>Configure the Voice Agent</ExternalDocsLink> and <ExternalDocsLink href={deepgramModelsUrl}>Models and Languages Overview</ExternalDocsLink>.</>
    ],
    transcriptionScreenshotAlt: "Transcription settings showing Deepgram listen provider, v1, nova-3, keyterms, alaw encoding, and 8000 sample rate.",
    agentSettings: {
      title: "5. Agent settings",
      paragraphs: [
        "Use Agent settings to control runtime behavior after the agent is already configured.",
        "These settings decide how the agent reacts to silence, how long a call can last, whether call transcription is saved, and whether inbound calls can recover contact data for template variables."
      ],
      items: [
        "Post Agent Silence Hangup Seconds: how long the customer can stay silent before the system ends the call automatically.",
        "Max Call Duration Minutes: the maximum call duration before automatic hangup.",
        "Enable transcription: save the transcript for calls handled by this agent.",
        <>Retrieve contact data for templates: for inbound calls, look up the caller in <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink> and use matched contact fields to render template variables.</>,
        "Silence Recovery Message: message sent after 5 seconds of customer silence to keep the conversation alive.",
        "Silence Follow-up Message: second message sent after another 15 seconds of silence.",
        "Automatic Hangup Message: final message spoken before the automatic hangup."
      ]
    },
    agentSettingsNotes: [
      <>The silence recovery, follow-up, and hangup messages can also use template variables. Type <code>@</code> or click the variables under each field.</>,
      <>Enable <strong>Retrieve contact data for templates</strong> only when the agent is used for inbound calls and a contact list has been loaded in <InlineDocsLink href={contactInboundsUrl}>Contact Inbounds</InlineDocsLink>.</>
    ],
    agentSettingsScreenshotAlt: "Agent settings runtime screen with silence hangup seconds, max call duration, transcription, inbound contact data, silence messages, and automatic hangup message.",
    nextStepsTitle: "Next steps",
    nextSteps: [
      {
        title: "Configure Agent Prompt",
        href: "/build/configure-agent-prompt",
        description: "Define how the agent speaks, what it collects, and when it should transfer or end the call."
      },
      {
        title: "Configure Agent Functions",
        href: "/build/add-functions",
        description: "Configure ready-made functions and custom API actions for the agent workflow."
      }
    ]
  },
  it: {
    title: "Crea il primo AI Voice Agent",
    intro: [
      "Usa questa pagina come guida completa alla configurazione del primo AI Voice Agent riutilizzabile.",
      "L'agente che crei qui potrà poi essere collegato a routing inbound, campagne outbound, test da Phone e automazioni di workflow.",
      "Questa pagina copre tutto il setup agente: Voice, lingue, speak provider, greeting message, variabili del contact template, LLM, functions, transcription e Agent settings."
    ],
    voiceSetup: {
      title: "1. Crea l'agente e configura Voice",
      paragraphs: [
        <>Vai in <UiPill>AI Voice Agent</UiPill> e premi <UiPill>Add Agent</UiPill>. Nella sezione Voice scegli un nome chiaro per l'agente e inserisci l'API key di Deepgram.</>,
        "Poi scegli la lingua e lo speak provider. Mantieni il primo agente facile da riconoscere e configurato attorno a un obiettivo di workflow chiaro."
      ],
      items: [
        "Nome agente: usa un nome che renda l'agente facile da riconoscere dopo in routing inbound e campagne outbound.",
        <>API key di <ProviderBadge href={deepgramUrl}>Deepgram</ProviderBadge>: richiesta per il setup agente in questo flusso.</>,
        "Lingua: seleziona la lingua che l'agente deve usare durante la chiamata.",
        "Speak Provider Type: scegli il provider voce usato per generare la risposta parlata."
      ]
    },
    languageTitle: "Lingue disponibili",
    languages: ["Multilingual", "English", "Spanish", "Dutch", "French", "German", "Italian", "Japanese"],
    providerTitle: "Speak provider disponibili",
    providers: speakProviders,
    customProvider: [
      "Quando usi un provider diverso da Deepgram, puoi selezionare uno degli agenti disponibili oppure scegliere Custom Agent.",
      "Con Custom Agent inserisci endpoint URL e API key per collegare un agente/provider voce custom."
    ],
    greetingTitle: "Greeting message e contact template",
    templateVariables: defaultTemplateVariables,
    greeting: [
      "Usa il greeting message per definire la prima frase che l'agente dice quando parte la chiamata.",
      "Usa il contact template quando greeting, prompt o contesto funzioni devono usare valori dinamici del contatto invece di testo fisso.",
      <>Il template di default include già i parametri principali che appartengono a un contatto creato in RocketAiFlow.</>,
      <>Puoi modificare il template di default aggiungendo altre chiavi. Le chiavi custom vengono renderizzate da <code>data</code>: ad esempio, una chiave template chiamata <code>birthDate</code> viene renderizzata come <code>{`{t.data.birthDate}`}</code>.</>,
      "Il modo più chiaro per usare i template è separare le sorgenti dati outbound e inbound:"
    ],
    templateUsageItems: [
      <><strong>Outbound:</strong> le variabili del template vengono renderizzate dal contatto caricato nella campagna. Se ti servono valori custom, importa o crea contatti con le key-value attese dentro l'oggetto <code>data</code>.</>,
      <><strong>Inbound:</strong> le variabili del template vengono renderizzate da <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> solo se negli agent settings è abilitato il recupero del contatto e la lista inbound contiene un contatto associato al numero che sta chiamando.</>
    ],
    templateInboundCallout: (
      <>
        Per l'inbound, le variabili vengono renderizzate solo se in <InlineDocsLink href="#agent-settings">Agent settings</InlineDocsLink> è abilitato <strong>Retrieve contact data for templates</strong> e <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> contiene una lista con un numero che corrisponde al chiamante. Se non esiste un contatto associato all'agente per quel numero, la variabile non viene renderizzata.
      </>
    ),
    templateNotes: [
      <>Nel campo greeting puoi digitare <code>@</code> per vedere i suggerimenti delle variabili del template, oppure cliccare una delle variabili che appaiono sotto il greeting.</>,
      "Una variabile viene sostituita solo quando il valore esiste nel contatto usato per quella chiamata. Se il valore manca, quella variabile non viene renderizzata.",
      <>Nella sezione <InlineDocsLink href="#agent-settings">Agent settings</InlineDocsLink> vedremo in dettaglio come abilitare il recupero del contatto quando qualcuno chiama in inbound.</>,
      <>Per preparare i contatti sorgente, vedi <InlineDocsLink href="/run-workflows/import-contacts#associate-contacts-with-a-campaign-or-agent">Importa contatti</InlineDocsLink>.</>,
      <>Vedi <InlineDocsLink href="/build/dynamic-parameters#contact-template-variables">variabili del contact template</InlineDocsLink> per il modello dettagliato e per come creare le variabili del template.</>
    ],
    screenshotAlt: "Schermata creazione AI Voice Agent con impostazioni Voice, lingua, speak provider, greeting message e variabili contact template.",
    customProviderScreenshotAlt: "Setup provider Custom Agent con campi endpoint URL e API key.",
    llm: {
      title: "2. Configura LLM",
      paragraphs: [
        "Configura il modello linguistico che controlla ragionamento, istruzioni e comportamento del prompt dell'agente.",
        <>Anche qui puoi usare le variabili dinamiche del template. Digita <code>@</code> nel campo prompt oppure scegli una delle variabili che appaiono sotto il prompt.</>,
        <>Quando selezioni un provider, scegli il relativo Think Provider Model. Se selezioni <UiPill>Custom</UiPill>, configura endpoint URL e header di authorization.</>,
        <>Per scrivere il prompt, parti dalla guida RocketAiFlow <InlineDocsLink href="/build/configure-agent-prompt">Configura il prompt</InlineDocsLink>.</>
      ],
      items: [
        "Think Provider Type: scegli il provider LLM.",
        "Think Provider Model: scegli il modello relativo al provider selezionato.",
        "Temperature: controlla quanto devono essere deterministiche o creative le risposte.",
        "Prompt: definisci le istruzioni dell'agente e usa le variabili del template quando serve contesto del contatto."
      ]
    },
    llmProviders: ["OpenAI (open_ai)", "Anthropic (anthropic)", "Google (google)", "Groq (groq)", "NVIDIA (nvidia)", "Custom"],
    llmNotes: [
      "Usa la guida del provider scelto per strutturare ruolo, obiettivi, istruzioni, esempi e regole di function calling.",
      <>Con <UiPill>Custom</UiPill>, inserisci endpoint URL e header di authorization, ad esempio <code>Authorization</code> con bearer token.</>,
      "Usa un provider custom solo quando endpoint del modello, autenticazione e comportamento della risposta sono già chiari."
    ],
    llmScreenshotAlt: "Schermata configurazione LLM con provider OpenAI, modello, campo prompt e variabili template.",
    llmCustomScreenshotAlt: "Configurazione provider LLM custom con endpoint URL e header authorization.",
    functions: {
      title: "3. Configura le functions",
      paragraphs: [
        "Le functions sono il livello operativo del voice agent. Senza functions l'agente può solo parlare; con le functions può eseguire azioni reali durante la chiamata.",
        "Usale quando l'agente deve trasferire una chiamata, chiudere la conversazione, salvare dati, rischedulare un contatto, qualificare un lead o chiamare un software aziendale tramite API. Con endpoint custom, RocketAiFlow può collegare CRM, calendari, helpdesk, database, sistemi interni o qualunque tool che espone API.",
        "Il flusso è semplice: l'LLM capisce che serve un'azione, seleziona la function corretta, valorizza i parametri richiesti, RocketAiFlow esegue l'endpoint configurato e l'agente usa il risultato per continuare la conversazione."
      ],
      items: [
        "functions pronte: hangup_call, transfer, rescheduled_contact, save_lead_qualification",
        "endpoint custom: GET, POST, PUT, PATCH, DELETE",
        "parametri generati dall'LLM durante la chiamata e valori contatto renderizzati quando disponibili",
        "salvataggio progressivo: save_lead_qualification può essere chiamata più volte durante la stessa chiamata per salvare dati lead parziali e aggiornarli quando emergono nuove informazioni"
      ]
    },
    functionPills: ["hangup_call", "transfer", "rescheduled_contact", "save_lead_qualification", "Custom Endpoint", "GET", "POST", "PUT", "PATCH", "DELETE"],
    functionNotes: [
      <>Collega solo le functions che servono a questo agente. Per la configurazione completa, vedi <InlineDocsLink href={preconfiguredFunctionExamplesUrl}>esempi preconfigurati</InlineDocsLink> e <InlineDocsLink href={customApiFunctionsUrl}>functions custom con API</InlineDocsLink>.</>,
      <>Riferimenti: <ExternalDocsLink href={openAiFunctionCallingUrl}>function calling di OpenAI</ExternalDocsLink> e <ExternalDocsLink href={deepgramFunctionCallingUrl}>function calling per Deepgram Voice Agent</ExternalDocsLink>.</>
    ],
    functionsScreenshotAlt: "Function builder con endpoint custom GET dove l'agente raccoglie un valore, lo inserisce nella URL dell'API e usa la risposta per continuare la conversazione.",
    transcription: {
      title: "4. Configura transcription",
      paragraphs: [
        "Configura la transcription così l'agente può capire il chiamante e il call record può mostrare una conversazione leggibile.",
        <>Per il flusso Voice Agent mostrato qui usa <UiPill>deepgram</UiPill> come listen provider. Lo screenshot mostra il setup validato: <UiPill>v1</UiPill> con <UiPill>nova-3</UiPill>.</>,
        <>Nella documentazione Deepgram, Flux è la famiglia pensata per voice agent real-time, mentre <code>nova-3</code> è il modello ASR general-purpose ad alte performance per streaming e batch. Se cambi verso Flux o un altro modello, valida sempre con una chiamata controllata prima di usarlo in produzione.</>,
        <>Scegli lingua e modello in base al supporto Deepgram. Se conosci la lingua del chiamante, usa quella specifica; se la chiamata può contenere più lingue, controlla la guida multilingual Deepgram prima di cambiare setup.</>
      ],
      items: [
        "Listen Provider Type: deepgram",
        "Listen Provider Version: v1 per modelli Nova, v2 per modelli Flux",
        "Listen Provider Model: nova-3 per il setup validato mostrato qui",
        "Keyterms: aggiungi termini di dominio solo se l'agente capisce male parole importanti",
        "Audio Input Encoding: scegli l'encoding usato dal percorso audio reale della telefonia",
        "Audio Input Sample Rate: lascia 8000 per la telefonia, perché l'audio telefonico lavora a 8 kHz"
      ]
    },
    transcriptionSettings: ["deepgram", "v1", "nova-3", "alaw", "8000"],
    transcriptionNotes: [
      <>Lo screenshot usa <code>alaw</code> come audio input encoding. Se il tuo trunk o provider usa un encoding telefonico diverso, seleziona il valore corretto.</>,
      <>Lascia <code>Audio Input Sample Rate</code> impostato a <code>8000</code> per questo flusso telefonico.</>,
      <>Riferimenti: <ExternalDocsLink href={deepgramConfigureVoiceAgentUrl}>Configure the Voice Agent</ExternalDocsLink> e <ExternalDocsLink href={deepgramModelsUrl}>Models and Languages Overview</ExternalDocsLink>.</>
    ],
    transcriptionScreenshotAlt: "Impostazioni transcription con listen provider Deepgram, v1, nova-3, keyterms, encoding alaw e sample rate 8000.",
    agentSettings: {
      title: "5. Agent settings",
      paragraphs: [
        "Usa Agent settings per controllare il comportamento runtime dopo aver configurato l'agente.",
        "Queste impostazioni decidono come l'agente reagisce al silenzio, quanto può durare al massimo una chiamata, se salvare il transcript e se le chiamate inbound possono recuperare i dati del contatto per renderizzare le variabili del template."
      ],
      items: [
        "Post Agent Silence Hangup Seconds: quanto tempo può passare con il customer in silenzio prima dell'hangup automatico.",
        "Max Call Duration Minutes: durata massima della chiamata prima dell'hangup automatico.",
        "Enable transcription: salva il transcript delle chiamate gestite da questo agente.",
        <>Retrieve contact data for templates: per le chiamate inbound, cerca il chiamante in <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> e usa i campi del contatto trovato per renderizzare le variabili del template.</>,
        "Silence Recovery Message: messaggio inviato dopo 5 secondi di silenzio del customer per tenere viva la conversazione.",
        "Silence Follow-up Message: secondo messaggio inviato dopo altri 15 secondi di silenzio.",
        "Automatic Hangup Message: messaggio finale prima dell'hangup automatico."
      ]
    },
    agentSettingsNotes: [
      <>Anche i messaggi di recovery, follow-up e hangup possono usare variabili del template. Digita <code>@</code> oppure clicca le variabili sotto ogni campo.</>,
      <>Abilita <strong>Retrieve contact data for templates</strong> solo quando l'agente viene usato per chiamate inbound e in <InlineDocsLink href={contactInboundsUrl}>Contatti inbound</InlineDocsLink> è stata caricata una lista contatti.</>
    ],
    agentSettingsScreenshotAlt: "Schermata runtime Agent settings con silence hangup seconds, max call duration, transcription, inbound contact data, messaggi di silenzio e automatic hangup message.",
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Configura il prompt",
        href: "/build/configure-agent-prompt",
        description: "Definisci come parla l'agente, cosa raccoglie e quando deve trasferire o terminare la chiamata."
      },
      {
        title: "Configura le functions",
        href: "/build/add-functions",
        description: "Configura funzioni pronte e azioni API custom per il workflow dell'agente."
      }
    ]
  }
};

function useCreateAgentCopy() {
  const locale = useCurrentLocale(defaultLocale);

  return createAgentCopy[locale];
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="docs-pill-list">
      {items.map((item) => (
        <span key={item} className="docs-ui-pill">
          {item}
        </span>
      ))}
    </div>
  );
}

function ProviderList({ providers }: { providers: SpeakProvider[] }) {
  return (
    <div className="docs-pill-list">
      {providers.map((provider) => (
        <a
          key={provider.value}
          className="docs-ui-pill docs-provider-pill"
          href={provider.href}
          target="_blank"
          rel="noreferrer"
        >
          <span>{provider.name}</span>
          <span className="docs-provider-pill-code">({provider.value})</span>
          <ExternalLinkIcon />
        </a>
      ))}
    </div>
  );
}

function ProviderBadge({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-ui-pill docs-provider-pill" href={href} target="_blank" rel="noreferrer">
      {children}
      <ExternalLinkIcon />
    </a>
  );
}

function ProductScreenshot({ src = screenshotPath, alt }: { src?: string; alt: string }) {
  return (
    <figure className="docs-screenshot">
      <div className="docs-screenshot-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={src} alt={alt} loading="lazy" />
      </div>
    </figure>
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

export function LocalizedCreateAgentPage() {
  const copy = useCreateAgentCopy();

  return (
    <>
      <h1>{copy.title}</h1>

      <section className="docs-home-section">
        {copy.intro.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="docs-home-section">
        <h2>{copy.voiceSetup.title}</h2>
        {copy.voiceSetup.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <ul>
          {copy.voiceSetup.items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <ProductScreenshot alt={copy.screenshotAlt} />

        <h3>{copy.languageTitle}</h3>
        <PillList items={copy.languages} />

        <h3>{copy.providerTitle}</h3>
        <ProviderList providers={copy.providers} />

        {copy.customProvider.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <h3>{copy.greetingTitle}</h3>
        {copy.greeting.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section className="docs-home-section">
        <h2>{copy.nextStepsTitle}</h2>
        <CardGrid cards={copy.nextSteps} />
      </section>
    </>
  );
}

export function LocalizedCreateAgentTitle() {
  return <>{useCreateAgentCopy().title}</>;
}

export function LocalizedCreateAgentHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useCreateAgentCopy();
  const labels: Record<HeadingKey, string> = {
    voiceSetup: copy.voiceSetup.title,
    languages: copy.languageTitle,
    providers: copy.providerTitle,
    greeting: copy.greetingTitle,
    llm: copy.llm.title,
    functions: copy.functions.title,
    transcription: copy.transcription.title,
    agentSettings: copy.agentSettings.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedCreateAgentIntro() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCreateAgentVoiceSetup() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.voiceSetup.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.voiceSetup.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ProductScreenshot alt={copy.screenshotAlt} />
    </section>
  );
}

export function LocalizedCreateAgentLanguages() {
  return (
    <section className="docs-home-section docs-home-section-nested">
      <PillList items={useCreateAgentCopy().languages} />
    </section>
  );
}

export function LocalizedCreateAgentProviders() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      <ProviderList providers={copy.providers} />
      {copy.customProvider.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ProductScreenshot src={customProviderScreenshotPath} alt={copy.customProviderScreenshotAlt} />
    </section>
  );
}

export function LocalizedCreateAgentGreeting() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section docs-home-section-nested">
      {copy.greeting.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <PillList items={copy.templateVariables} />
      <ul>
        {copy.templateUsageItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="docs-feature-callout docs-feature-callout-warning">
        <div className="docs-feature-callout-body">{copy.templateInboundCallout}</div>
      </div>
      {copy.templateNotes.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCreateAgentLlm() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.llm.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <PillList items={copy.llmProviders} />
      <ul>
        {copy.llm.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ProductScreenshot src={llmScreenshotPath} alt={copy.llmScreenshotAlt} />
      {copy.llmNotes.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ProductScreenshot src={llmCustomScreenshotPath} alt={copy.llmCustomScreenshotAlt} />
    </section>
  );
}

export function LocalizedCreateAgentFunctions() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.functions.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <PillList items={copy.functionPills} />
      <ul>
        {copy.functions.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ProductScreenshot src={functionsScreenshotPath} alt={copy.functionsScreenshotAlt} />
      {copy.functionNotes.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCreateAgentTranscription() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.transcription.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <PillList items={copy.transcriptionSettings} />
      <ul>
        {copy.transcription.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ProductScreenshot src={transcriptionScreenshotPath} alt={copy.transcriptionScreenshotAlt} />
      {copy.transcriptionNotes.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCreateAgentAgentSettings() {
  const copy = useCreateAgentCopy();

  return (
    <section className="docs-home-section">
      {copy.agentSettings.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <ul>
        {copy.agentSettings.items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ProductScreenshot src={agentSettingsScreenshotPath} alt={copy.agentSettingsScreenshotAlt} />
      {copy.agentSettingsNotes.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCreateAgentNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={useCreateAgentCopy().nextSteps} />
    </section>
  );
}
