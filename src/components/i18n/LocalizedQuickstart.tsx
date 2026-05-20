"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type ImageCopy = {
  src: string;
  alt: string;
  caption?: ReactNode;
  size?: "quarter" | "half";
  variant?: "campaignSplit";
};

type StepCopy = {
  paragraphs?: ReactNode[];
  items?: ReactNode[];
  secondaryItems?: ReactNode[];
  orderedItems?: ReactNode[];
  image?: ImageCopy;
  imageGrid?: ImageCopy[];
  images?: ImageCopy[];
  preListParagraphCount?: number;
  callout?: ReactNode;
};

type QuickstartCopy = {
  title: string;
  hero: ReactNode[];
  beforeStart: StepCopy;
  choosePath: StepCopy;
  sharedFoundation: StepCopy;
  trunk: StepCopy;
  agent: StepCopy;
  prompt: StepCopy;
  functions: StepCopy;
  agentPhoneTest: StepCopy;
  inboundIntro: StepCopy;
  inboundRouting: StepCopy;
  inboundTest: StepCopy;
  inboundReview: StepCopy;
  outboundIntro: StepCopy;
  importContacts: StepCopy;
  outboundCampaign: StepCopy;
  outboundTest: StepCopy;
  outboundReview: StepCopy;
  outboundDashboard: StepCopy;
  troubleshooting: StepCopy;
  nextSteps: LinkCard[];
};

const deepgramUrl = "https://deepgram.com/";

const screenshotPaths = {
  trunk: "/screenshots/docs/trunk-configuration.png",
  trunkQuickstartConfiguration: "/screenshots/docs/trunk-quickstart-configuration.png",
  trunkQuickstartRegistration: "/screenshots/docs/trunk-quickstart-registration.png",
  trunkQuickstartAuth: "/screenshots/docs/trunk-quickstart-auth.png",
  trunkQuickstartStatus: "/screenshots/docs/trunk-quickstart-status.png",
  agent: "/screenshots/docs/agent-creation-form.png",
  prompt: "/screenshots/docs/prompt-configuration.png",
  functions: "/screenshots/docs/function-setup.png",
  inbound: "/screenshots/docs/inbound-route-connection.png",
  inboundCallRecord: "/screenshots/docs/inbound-call-record-review.png",
  contacts: "/screenshots/docs/contact-import.png",
  campaign: "/screenshots/docs/outbound-campaign-setup.png",
  phone: "/screenshots/docs/phone-webrtc-client.png",
  records: "/screenshots/docs/call-records-review.png",
  recordingTranscript: "/screenshots/docs/call-review-recording-transcript.png",
  dashboard: "/screenshots/docs/campaign-dashboard-monitoring.png",
  agentsTrunks: "/screenshots/docs/realtime-agents-trunks.png",
  dialerStatus: "/screenshots/docs/dialer-status-call-in-progress.png",
  trunkStatusRegistered: "/screenshots/docs/trunk-status-registered.png",
  contactResults: "/screenshots/docs/contact-results.png",
  campaignCallCapacitySchedule: "/screenshots/docs/campaign-call-capacity-schedule.png"
};

function ExternalInlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-inline-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <svg
        aria-hidden="true"
        className="external-link-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </svg>
    </a>
  );
}

function InternalInlineLink({ href, children }: { href: string; children: ReactNode }) {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <Link className="docs-inline-link" href={localizeHref(href, locale)}>
      <span>{children}</span>
    </Link>
  );
}

function NavigationPath({ steps }: { steps: string[] }) {
  return (
    <span className="docs-nav-path">
      {steps.map((step, index) => (
        <span className="docs-nav-path-group" key={`${step}-${index}`}>
          <span className={`docs-nav-path-step${index === steps.length - 1 ? " docs-nav-path-step-action" : ""}`}>
            {step}
          </span>
          {index < steps.length - 1 ? <span className="docs-nav-path-separator" aria-hidden="true">›</span> : null}
        </span>
      ))}
    </span>
  );
}

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

const quickstartCopy: Record<Locale, QuickstartCopy> = {
  en: {
    title: "Quickstart",
    hero: [
      "Use this page when you want the shortest practical path to a working RocketAiFlow workflow.",
      "The goal is to validate one real path, review the result, and confirm that the trunk, agent, call records, and monitoring are working before you expand the setup.",
      "Complete the common setup first, then follow either the inbound path or the outbound path for the first test."
    ],
    beforeStart: {
      items: [
        <>a <ExternalInlineLink href={deepgramUrl}>Deepgram</ExternalInlineLink> API key for the agent voice setup</>,
        "SIP trunk credentials when you want to test real inbound or outbound calls",
        "for outbound, one contact to add manually or a small CSV file to import after the campaign is created"
      ],
      paragraphs: [
        "Before you start, prepare only what is needed for the first test:"
      ]
    },
    choosePath: {
      preListParagraphCount: 3,
      paragraphs: [
        "Choose what you want to validate first. You do not need to complete both paths for the first quickstart run.",
        <>Inbound: <NavigationPath steps={["Inbound Ai", "AI Inbound Routing"]} /> when an incoming call should reach the agent.</>,
        <>Outbound: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns"]} /> when a campaign should call contacts.</>
      ]
    },
    sharedFoundation: {
      paragraphs: [<>Configure the shared parts once: trunk, agent, prompt, optional functions, and a direct Phone test. After that, continue with <UiPill>AI Inbound Routing</UiPill> for inbound or <UiPill>Dialer Campaigns</UiPill> for outbound.</>]
    },
    trunk: {
      paragraphs: [
        "Inbound routing and outbound campaigns depend on a configured trunk. For a quick setup, focus on the parts that make the trunk usable: Trunk Configuration, Registration, Auth, and Trunk Status.",
        "Follow the screens in this order:"
      ],
      imageGrid: [
        {
          src: screenshotPaths.trunkQuickstartConfiguration,
          alt: "Trunk Configuration screen showing trunk enabled, trunk name, server URI, and shared user.",
          caption: <><strong>Trunk Configuration.</strong> Enable the trunk, then set the trunk name, server URI, and shared user supplied by your SIP provider.</>
        },
        {
          src: screenshotPaths.trunkQuickstartRegistration,
          alt: "Registration screen showing registration enabled, server URI, client URI, contact user, retry intervals, expiration, and line setting.",
          caption: <><strong>Registration.</strong> Enable registration when the trunk must receive inbound calls. Confirm server URI, client URI, contact user, retry intervals, expiration, and line settings.</>
        },
        {
          src: screenshotPaths.trunkQuickstartAuth,
          alt: "Auth screen showing userpass authentication with username and password fields.",
          caption: <><strong>Auth.</strong> Keep auth type on <code>userpass</code>, then enter the username and password used to register with the provider.</>
        },
        {
          src: screenshotPaths.trunkQuickstartStatus,
          alt: "Trunk Status screen showing registration Registered and endpoint Not in use.",
          caption: <><strong>Trunk Status.</strong> Check that Registration and Endpoint are OK.</>
        }
      ]
    },
    agent: {
      paragraphs: [
        "Create one agent with a clear goal, such as lead qualification, appointment intake, or routing to a human team.",
        "To quickly test voices and languages, choose the language and voice provider, then write a short greeting message. The greeting is the first message the agent says during the call.",
        <>For voice, LLM, transcription, functions, templates, and advanced Agent settings, see <InternalInlineLink href="/build/create-your-first-ai-voice-agent">Create Your First AI Voice Agent</InternalInlineLink>.</>,
        <>RocketAiFlow includes two preconfigured examples, <code>Lead Qualification IT</code> and <code>Lead Qualification EN</code>. Use them as starting examples, not production-ready agents. If you want to test a ready-made agent immediately, go to <InternalInlineLink href="#test-the-agent-in-phone">Phone</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.agent,
        alt: "Voice configuration screen showing name, Deepgram API key, language, voice provider, voice model, greeting, and contact template variables.",
        caption: <><strong>Voice.</strong> Set the agent name, language, voice provider, voice model, and greeting before the first test.</>
      }
    },
    prompt: {
      paragraphs: [
        "For the quickstart, the LLM prompt can stay minimal. Explain who the agent is, what it should do, and when it should stop or transfer the call.",
        <>If you use a preconfigured agent, the prompt is already included. For a detailed prompt structure, see <InternalInlineLink href="/build/configure-agent-prompt">Configure Agent Prompt</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.prompt,
        alt: "LLM configuration screen showing provider, temperature, model, prompt instructions, and contact template variables.",
        caption: <><strong>LLM.</strong> Choose provider and model, then add a minimal prompt to start interacting with the agent.</>
      }
    },
    functions: {
      paragraphs: [
        "Optional. Use functions only when the agent must perform an action: transfer a call, reschedule a contact, save lead data, or call an external API.",
        <>For this quickstart, you can skip them. To configure actions properly, see <InternalInlineLink href="/build/add-functions">Add Functions</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.functions,
        alt: "Function setup screen showing ready-made functions and a custom API action option."
      }
    },
    agentPhoneTest: {
      preListParagraphCount: 2,
      paragraphs: [
        "After configuring the agent, test it from the Phone section.",
        "Phone is a WebRTC client that can register SIP users, place and receive calls, and run a direct AI voice agent test. For this quickstart, use Voice agent test mode to simulate an inbound-style call to the agent without depending on trunk routing."
      ],
      items: [
        <>open <strong>Phone</strong></>,
        <>enter the password for the default SIP/WebRTC user <code>2000</code></>,
        "select the agent you created in Voice agent test mode",
        "start the call and check that the agent responds as expected"
      ],
      image: {
        src: screenshotPaths.phone,
        alt: "Phone section showing SIP configuration, voice agent test mode, keypad, status badges, volume, and auto-answer."
      }
    },
    inboundIntro: {
      preListParagraphCount: 2,
      paragraphs: [
        "Use this flow when the phone number on the inbound trunk should route incoming calls to the agent.",
        "You can also set a concurrency limit. When the limit is reached, additional incoming calls are rejected and the caller hears the number as busy."
      ],
      items: [
        "the inbound trunk is configured and registered",
        "the agent exists with prompt and required functions"
      ]
    },
    inboundRouting: {
      items: [
        "the agent you created",
        "the trunk you created",
        "whether the inbound route should be active",
        "the maximum number of concurrent calls this agent can handle on the route"
      ],
      paragraphs: [
        <>Path to follow: <NavigationPath steps={["Inbound Ai", "AI Inbound Routing", "Add Inbound"]} /> Then select only:</>
      ],
      image: {
        src: screenshotPaths.inbound,
        alt: "Inbound routing screen showing the phone number, selected agent, trunk, active switch, concurrency limit, and recording setting."
      }
    },
    inboundTest: {
      paragraphs: [
        "Call the phone number connected to the configured trunk and verify that the inbound route sends the call to the expected agent."
      ]
    },
    inboundReview: {
      paragraphs: [
        "After the test, open the Inbound Call Record and check the values saved for that call based on the options you selected. You can review the call transcript, recording when enabled, and timing data."
      ],
      image: {
        src: screenshotPaths.inboundCallRecord,
        alt: "Inbound Call Record detail showing duration, timeline, recording, and call transcript."
      }
    },
    outboundIntro: {
      preListParagraphCount: 2,
      paragraphs: [
        "Use this path when the first workflow should place calls from a campaign against a controlled contact list.",
        "Start this flow only after:"
      ],
      items: [
        "the outbound trunk path is configured and registered",
        "the agent exists",
        "the prompt and required functions are attached to the agent",
        "a contact CSV is ready or one contact can be added manually to the campaign"
      ]
    },
    importContacts: {
      preListParagraphCount: 2,
      items: [
        <><code>contactId</code> if you need to correlate the contact with an external CRM or database record</>,
        <><code>name</code> and <code>surname</code> if the agent should personalize the conversation</>,
        <><code>data</code> if you want to pass extra information to the agent during the call, such as city, plan, CRM notes, or lead type</>,
        <><code>priority</code> if some contacts should be selected before others</>,
        <><code>scheduledAt</code> if a contact should become callable only at a specific date and time</>,
        <>custom fields in <code>data</code> when the agent or API action needs business context</>
      ],
      paragraphs: [
        <>After the campaign is saved, upload a CSV for the outbound campaign and set <code>Usage</code> to <UiPill>AI Dialer Flows</UiPill>. This is required when contacts must be called by the outbound dialer.</>,
        <>Map <code>Phone</code> as the required field. All other contact fields are optional, so keep the first import limited to the values the workflow actually needs:</>,
        "Before using the contacts in a campaign, confirm:"
      ],
      orderedItems: [
        "the expected number of contacts was processed",
        "valid rows were inserted",
        "failed rows are understood"
      ],
      image: {
        src: screenshotPaths.contacts,
        alt: "Contact import and field mapping flow.",
        size: "half"
      }
    },
    outboundCampaign: {
      items: [
        "select the agent you created",
        "select the trunk you created",
        "select the campaign timezone",
        "set Concurrent Call Capacity to 1",
        "leave Retry Minutes To Reschedule at the default value",
        "save the campaign before importing contacts, because the import step needs a campaign to attach them to"
      ],
      paragraphs: [
        <>Path to follow: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns", "Add Campaigns"]} /> Then configure a simple campaign for the first test:</>,
        "Contacts are added in the next step because they need an existing campaign to attach to."
      ],
      image: {
        src: screenshotPaths.campaignCallCapacitySchedule,
        alt: "Outbound campaign setup for a small controlled test.",
        variant: "campaignSplit"
      }
    },
    outboundTest: {
      paragraphs: [
        "Start the call and verify the result in Call Records.",
        "After the first test with one contact, decide the campaign pace by selecting how many concurrent calls the campaign should place."
      ],
      image: {
        src: screenshotPaths.records,
        alt: "Outbound call records list showing campaign filters, answered and no-answer outcomes, timing, and details actions."
      }
    },
    outboundReview: {
      paragraphs: [
        "After the test call, open the Call Record and check the outcome, transcript, and timing."
      ],
      image: {
        src: screenshotPaths.recordingTranscript,
        alt: "Call record detail showing recording playback and the call transcript."
      }
    },
    outboundDashboard: {
      paragraphs: [
        "Use the Dashboard section to monitor campaign pace, active calls, call limits, dialing rate, and call outcomes in real time.",
        <>In <strong>Real-Time Agents & Trunks</strong>, check the trunk state: <UiPill>Not In Use</UiPill> means the trunk is available, while <UiPill>In Use</UiPill> means calls are running through it.</>,
        "There is also a performance view for analyzing calls over a selected time range.",
        <>All Dialer dashboard panels are described in <InternalInlineLink href="/monitoring/dialer-dashboard-panels">Dialer Dashboard Panels</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.dashboard,
        alt: "Real-time dialer dashboard showing campaign outcomes, dialing rate, calls volume, active calls, limits, and endpoint state."
      }
    },
    troubleshooting: {
      paragraphs: [
        <>If the inbound run does not behave correctly, start from <strong>Trunk status</strong>. If the trunk is not <code>Registered</code>, it cannot receive the test call and the inbound routing will not be reached.</>
      ],
      orderedItems: [
        <>
          the trunk shows <code>Registered</code> in <strong>Trunk status</strong>
          <ProductScreenshot
            src={screenshotPaths.trunkStatusRegistered}
            alt="Trunk Status screen showing registration Registered and endpoint Not in use."
          />
        </>,
        <>the inbound number or route is connected to the expected <UiPill>AI Inbound Routing</UiPill></>,
        "the correct agent is assigned",
        "the agent has the right prompt",
        "the required functions are attached, if the workflow uses transfer, hangup, or API actions",
        "the result appears in Inbound Call Records",
        <>open the campaign <strong>real-time Dashboard</strong></>,
        <>
          check <strong>Dialer Status</strong>: if it shows <code>Call in progress</code>, the campaign is placing calls
          <ProductScreenshot
            src={screenshotPaths.dialerStatus}
            alt="Dialer Status table showing Calls In Progress, Active campaign state, active calls, and call limit."
          />
        </>,
        "check the number of generated calls and active calls",
        <>
          check <strong>Real-Time Agents & Trunks</strong>: the trunk is <UiPill>Not In Use</UiPill> when available and becomes <UiPill>In Use</UiPill> while calls are running
          <ProductScreenshot
            src={screenshotPaths.agentsTrunks}
            alt="Real-Time Agents and Trunks dashboard showing endpoint states, Not In Use, and In Use timeline."
          />
        </>,
        <>
          check that the campaign has associated contacts and that <code>Scheduled At</code> is earlier than now
          <ProductScreenshot
            src={screenshotPaths.contactResults}
            alt="Campaign contact result showing customer, phone number, availability, priority, and campaign identifiers."
          />
        </>,
        <>
          check concurrent call capacity, campaign start and end dates, active days, and timezone
          <CampaignSettingsSplitScreenshot />
        </>,
        "check the final result in Call Records"
      ]
    },
    nextSteps: [
      { title: "Deployment Overview", href: "/deploy/deployment-overview", description: "Review the deploy path that connects trunk, agent, routing, campaign, and monitoring." },
      { title: "AI Inbound Routing", href: "/run-workflows/inbound-ai/ai-inbound-routing", description: "Go deeper on inbound setup after the inbound trunk and agent are ready." },
      { title: "AI Dialer Flows", href: "/run-workflows/ai-dialer-flows", description: "Go deeper on outbound campaign setup after the outbound trunk and agent are ready." },
      { title: "Configure Agent Functions", href: "/build/add-functions", description: "Review call control, transfer, rescheduling, lead qualification, and custom API functions." },
      { title: "Monitoring and Visibility", href: "/monitoring/monitoring-and-visibility", description: "Review how the first workflow should be monitored once it is live." },
      { title: "Processed Contacts", href: "/run-workflows/processed-contacts", description: "Review contacts already handled by inbound or outbound workflows before opening the detailed call record." }
    ]
  },
  it: {
    title: "Guida rapida",
    hero: [
      "Usa questa pagina quando vuoi arrivare al primo workflow funzionante in RocketAiFlow nel modo più diretto possibile.",
      "L'obiettivo è validare un percorso reale, rivedere il risultato e confermare che trunk, agente, record chiamata e monitoraggio funzionino prima di ampliare il setup.",
      "Completa prima la configurazione comune, poi segui il percorso inbound oppure il percorso outbound per il primo test."
    ],
    beforeStart: {
      paragraphs: [
        "Prima di iniziare, prepara solo quello che serve per il primo test:"
      ],
      items: [
        <>una API key di <ExternalInlineLink href={deepgramUrl}>Deepgram</ExternalInlineLink> per il setup voce dell'agente</>,
        "le credenziali del trunk SIP quando vuoi testare chiamate inbound o outbound reali",
        "per l'outbound, un contatto da aggiungere manualmente oppure un piccolo CSV da importare dopo aver creato la campagna"
      ]
    },
    choosePath: {
      preListParagraphCount: 3,
      paragraphs: [
        "Scegli cosa vuoi validare per primo. Non devi completare entrambi i percorsi per il primo quickstart.",
        <>Inbound: <NavigationPath steps={["Inbound Ai", "AI Inbound Routing"]} /> quando una chiamata in ingresso deve arrivare all'agente.</>,
        <>Outbound: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns"]} /> quando una campagna deve chiamare i contatti.</>
      ]
    },
    sharedFoundation: {
      paragraphs: [<>Configura una sola volta le parti comuni: trunk, agente, prompt, funzioni opzionali e test diretto da Phone. Poi continua con <UiPill>AI Inbound Routing</UiPill> per l'inbound oppure con <UiPill>Dialer Campaigns</UiPill> per l'outbound.</>]
    },
    trunk: {
      paragraphs: [
        "Inbound routing e campagne outbound dipendono da un trunk configurato. Per prepararlo velocemente, concentrati sulle parti che rendono il trunk utilizzabile: Trunk Configuration, Registration, Auth e Stato del trunk.",
        "Segui le schermate in questo ordine:"
      ],
      imageGrid: [
        {
          src: screenshotPaths.trunkQuickstartConfiguration,
          alt: "Schermata Trunk Configuration con trunk enabled, trunk name, server URI e shared user.",
          caption: <><strong>Trunk Configuration.</strong> Abilita il trunk, poi inserisci trunk name, server URI e shared user forniti dal provider SIP.</>
        },
        {
          src: screenshotPaths.trunkQuickstartRegistration,
          alt: "Schermata Registration con registrazione abilitata, server URI, client URI, contact user, retry interval, expiration e line.",
          caption: <><strong>Registration.</strong> Abilitala quando il trunk deve ricevere chiamate inbound. Verifica server URI, client URI, contact user, retry interval, expiration e line.</>
        },
        {
          src: screenshotPaths.trunkQuickstartAuth,
          alt: "Schermata Auth con autenticazione userpass, username e password.",
          caption: <><strong>Auth.</strong> Lascia auth type su <code>userpass</code>, poi inserisci username e password usati per registrarsi al provider.</>
        },
        {
          src: screenshotPaths.trunkQuickstartStatus,
          alt: "Schermata Stato del trunk con registration Registered ed endpoint Not in use.",
          caption: <><strong>Stato del trunk.</strong> Controlla che Registration ed Endpoint siano OK.</>
        }
      ]
    },
    agent: {
      paragraphs: [
        "Crea un agente con un obiettivo chiaro, ad esempio qualificazione lead, raccolta appuntamenti o instradamento verso un team umano.",
        "Per provare velocemente voci e lingue, scegli lingua e voice provider, poi scrivi un messaggio breve nel greeting. Il greeting è il primo messaggio che l'agente dice durante la chiamata.",
        <>Per voice, LLM, transcription, functions, template e Agent settings avanzati, vedi <InternalInlineLink href="/build/create-your-first-ai-voice-agent">Crea il primo AI Voice Agent</InternalInlineLink>.</>,
        <>RocketAiFlow include due esempi preconfigurati, <code>Lead Qualification IT</code> e <code>Lead Qualification EN</code>. Usali come esempi di partenza, non come agenti pronti per la produzione. Se vuoi testare subito un agente già pronto, vai a <InternalInlineLink href="#test-the-agent-in-phone">Phone</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.agent,
        alt: "Schermata Voice con nome agente, API key Deepgram, lingua, voice provider, modello voce, greeting e variabili template contatto.",
        caption: <><strong>Voice.</strong> Imposta nome agente, lingua, voice provider, modello voce e greeting prima del primo test.</>
      }
    },
    prompt: {
      paragraphs: [
        "Per il quickstart il prompt LLM può restare minimo. Spiega chi è l'agente, cosa deve fare e quando deve fermarsi o trasferire la chiamata.",
        <>Se usi un agente preconfigurato, il prompt è già incluso. Per una struttura completa del prompt, vedi <InternalInlineLink href="/build/configure-agent-prompt">Configura il prompt</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.prompt,
        alt: "Schermata LLM con provider, temperature, modello, prompt e variabili del template contatto.",
        caption: <><strong>LLM.</strong> Scegli provider e modello, poi inserisci un prompt minimo per iniziare a interagire con l'agente.</>
      }
    },
    functions: {
      paragraphs: [
        "Opzionale. Usa le functions solo quando l'agente deve eseguire un'azione: transfer, reschedule, salvataggio dati o chiamata a una API esterna.",
        <>Nel quickstart puoi saltarle. Per configurarle correttamente, vedi <InternalInlineLink href="/build/add-functions">Configura le functions</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.functions,
        alt: "Schermata di setup funzioni con funzioni preimpostate e opzione per una custom API action."
      }
    },
    agentPhoneTest: {
      preListParagraphCount: 2,
      paragraphs: [
        "Dopo aver configurato l'agente, provalo dalla sezione Phone.",
        "Phone è un client WebRTC che può registrare utenti SIP, fare e ricevere chiamate e avviare un test diretto dell'AI voice agent. Per questo quickstart usa Voice agent test mode per simulare una chiamata simile all'inbound verso l'agente, senza dipendere dal routing del trunk."
      ],
      items: [
        <>vai nella sezione <strong>Phone</strong></>,
        <>inserisci la password dell'utente SIP/WebRTC <code>2000</code>, creato di default</>,
        "seleziona l'agente che hai creato in Voice agent test mode",
        "avvia la chiamata e controlla che l'agente risponda come previsto"
      ],
      image: {
        src: screenshotPaths.phone,
        alt: "Sezione Phone con configurazione SIP, voice agent test mode, keypad, badge di stato, volume e auto-answer."
      }
    },
    inboundIntro: {
      preListParagraphCount: 2,
      paragraphs: [
        "Usa questo flusso quando il numero di telefono del trunk inbound deve instradare le chiamate in ingresso verso l'agente.",
        "Puoi anche impostare un limite di concorrenza. Quando il limite viene raggiunto, le altre chiamate in ingresso vengono rifiutate e il cliente sente il numero occupato."
      ],
      items: [
        "il trunk inbound è configurato e registrato",
        "l'agente esiste con prompt e funzioni richieste"
      ]
    },
    inboundRouting: {
      paragraphs: [
        <>Percorso da seguire: <NavigationPath steps={["Inbound Ai", "AI Inbound Routing", "Add Inbound"]} /> Poi seleziona solo:</>
      ],
      items: [
        "l'agente che hai creato",
        "il trunk che hai creato",
        "se la route inbound deve essere attiva",
        "il numero massimo di chiamate concorrenti che l'agente può gestire su questa route"
      ],
      image: {
        src: screenshotPaths.inbound,
        alt: "Schermata inbound routing con numero, agente selezionato, trunk, stato active, limite di concorrenza e recording."
      }
    },
    inboundTest: {
      paragraphs: [
        "Chiama il numero di telefono collegato al trunk configurato e verifica che la route inbound mandi la chiamata all'agente corretto."
      ]
    },
    inboundReview: {
      paragraphs: [
        "Dopo il test, apri l'Inbound Call Record e controlla i valori registrati su quella chiamata in base alle opzioni scelte. Puoi vedere transcript, registrazione quando abilitata e tempi della chiamata."
      ],
      image: {
        src: screenshotPaths.inboundCallRecord,
        alt: "Dettaglio Inbound Call Record con durata, timeline, registrazione e transcript."
      }
    },
    outboundIntro: {
      preListParagraphCount: 2,
      paragraphs: [
        "Usa questo percorso quando il primo workflow deve effettuare chiamate da una campagna verso una lista contatti controllata.",
        "Inizia questo flusso solo dopo che:"
      ],
      items: [
        "il percorso trunk outbound è configurato e registrato",
        "l'agente esiste",
        "il prompt e le funzioni richieste sono collegati all'agente",
        "un CSV di contatti è pronto oppure puoi creare un contatto manualmente nella campagna"
      ]
    },
    importContacts: {
      preListParagraphCount: 2,
      paragraphs: [
        <>Dopo aver salvato la campagna, carica un CSV per la campagna outbound e imposta <code>Usage</code> su <UiPill>AI Dialer Flows</UiPill>. Questo è l'uso richiesto quando i contatti devono essere chiamati dal dialer outbound.</>,
        <>Mappa <code>Phone</code> come campo obbligatorio. Tutti gli altri campi sono opzionali, quindi limita la prima importazione ai valori che il workflow usa davvero:</>,
        "Prima di usare i contatti in una campagna, conferma che:"
      ],
      items: [
        <><code>contactId</code> se devi correlare il contatto con un record esterno in CRM o database</>,
        <><code>name</code> e <code>surname</code> se l'agente deve personalizzare la conversazione</>,
        <><code>data</code> se vuoi passare informazioni aggiuntive all'agente durante la chiamata, ad esempio città, piano, note CRM o tipo lead</>,
        <><code>priority</code> se alcuni contatti devono essere selezionati prima di altri</>,
        <><code>scheduledAt</code> se un contatto deve diventare chiamabile solo a una data e ora specifica</>,
        <>campi custom in <code>data</code> quando l'agente o l'azione API hanno bisogno di contesto business</>
      ],
      orderedItems: [
        "il numero atteso di contatti sia stato processato",
        "le righe valide siano state inserite",
        "le righe fallite siano comprese"
      ],
      image: {
        src: screenshotPaths.contacts,
        alt: "Flusso di importazione contatti e mapping dei campi.",
        size: "half"
      }
    },
    outboundCampaign: {
      paragraphs: [
        <>Percorso da seguire: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns", "Add Campaigns"]} /> Poi configura una campagna semplice per il primo test:</>,
        "I contatti si aggiungono nello step successivo perché devono essere collegati a una campagna già esistente."
      ],
      items: [
        "seleziona l'agente che hai creato",
        "seleziona il trunk che hai creato",
        "seleziona il timezone della campagna",
        "imposta Concurrent Call Capacity a 1",
        "lascia Retry Minutes To Reschedule al valore di default",
        "salva la campagna prima di importare i contatti, perché l'import deve associarli a una campagna"
      ],
      image: {
        src: screenshotPaths.campaignCallCapacitySchedule,
        alt: "Setup di una campagna outbound per un piccolo test controllato.",
        variant: "campaignSplit"
      }
    },
    outboundTest: {
      paragraphs: [
        "Fai partire la chiamata e verifica il risultato nella sezione Registro chiamate.",
        "Una volta effettuato il primo test con il primo contatto, decidi il ritmo da dare alla campagna selezionando quante chiamate concorrenti effettuare."
      ],
      image: {
        src: screenshotPaths.records,
        alt: "Lista call records outbound con filtri campagna, outcome answered e no answer, timing e azioni di dettaglio."
      }
    },
    outboundReview: {
      paragraphs: [
        "Dopo la chiamata di test, apri il registro della chiamata e controlla l'esito, la trascrizione e i tempi."
      ],
      image: {
        src: screenshotPaths.recordingTranscript,
        alt: "Dettaglio call record con playback della registrazione e transcript della chiamata."
      }
    },
    outboundDashboard: {
      paragraphs: [
        "Usa la sezione Dashboard per monitorare in tempo reale il ritmo delle campagne, le chiamate attive, i limiti, il dialing rate e tutti gli esiti delle chiamate.",
        <>In <strong>Real-Time Agents & Trunks</strong>, controlla lo stato del trunk: <UiPill>Not In Use</UiPill> significa che il trunk è disponibile, mentre <UiPill>In Use</UiPill> significa che le chiamate stanno passando da quel trunk.</>,
        "C'è anche una vista performance per analizzare le chiamate in un time range selezionato.",
        <>Tutti i pannelli della dashboard Dialer sono descritti in <InternalInlineLink href="/monitoring/dialer-dashboard-panels">Pannelli Dashboard Dialer</InternalInlineLink>.</>
      ],
      image: {
        src: screenshotPaths.dashboard,
        alt: "Dashboard dialer in tempo reale con esiti campagna, dialing rate, volume chiamate, chiamate attive, limiti e stato endpoint."
      }
    },
    troubleshooting: {
      paragraphs: [
        <>Se il run inbound non si comporta correttamente, parti da <strong>Stato del trunk</strong>. Se il trunk non è <code>Registered</code>, non può ricevere la chiamata di test e il routing inbound non viene raggiunto.</>
      ],
      orderedItems: [
        <>
          il trunk risulta <code>Registered</code> in <strong>Stato del trunk</strong>
          <ProductScreenshot
            src={screenshotPaths.trunkStatusRegistered}
            alt="Schermata Stato del trunk con registration Registered ed endpoint Not in use."
          />
        </>,
        <>il numero o la route inbound è collegata al <UiPill>AI Inbound Routing</UiPill> corretto</>,
        "l'agente corretto è assegnato",
        "l'agente ha il prompt corretto",
        "le funzioni richieste sono collegate, se il workflow usa transfer, hangup o azioni API",
        "il risultato appare negli Inbound Call Records",
        <>apri la <strong>Dashboard real-time</strong> della campagna</>,
        <>
          controlla <strong>Dialer Status</strong>: se mostra <code>Call in progress</code>, la campagna sta chiamando
          <ProductScreenshot
            src={screenshotPaths.dialerStatus}
            alt="Tabella Dialer Status con Calls In Progress, stato campagna Active, chiamate attive e call limit."
          />
        </>,
        "controlla il numero di chiamate generate e le chiamate attive",
        <>
          controlla <strong>Real-Time Agents & Trunks</strong>: il trunk è <UiPill>Not In Use</UiPill> quando è disponibile e diventa <UiPill>In Use</UiPill> mentre le chiamate sono in corso
          <ProductScreenshot
            src={screenshotPaths.agentsTrunks}
            alt="Dashboard Real-Time Agents and Trunks con stati endpoint, Not In Use e timeline In Use."
          />
        </>,
        <>
          controlla che la campagna abbia contatti associati e che <code>Pianificato Per</code> sia precedente al momento attuale
          <ProductScreenshot
            src={screenshotPaths.contactResults}
            alt="Risultato contatti della campagna con customer, numero di telefono, availability, priority e identificativi campagna."
          />
        </>,
        <>
          controlla il numero di chiamate concorrenti, data di inizio e fine, giorni attivi e timezone della campagna
          <CampaignSettingsSplitScreenshot />
        </>,
        "controlla il risultato finale nel Registro chiamate"
      ]
    },
    nextSteps: [
      { title: "Panoramica deploy", href: "/deploy/deployment-overview", description: "Rivedi il percorso deploy che collega trunk, agente, routing, campagna e monitoring." },
      { title: "AI Inbound Routing", href: "/run-workflows/inbound-ai/ai-inbound-routing", description: "Approfondisci il setup inbound dopo che trunk inbound e agente sono pronti." },
      { title: "AI Dialer Flows", href: "/run-workflows/ai-dialer-flows", description: "Approfondisci il setup outbound dopo che trunk outbound e agente sono pronti." },
      { title: "Configura le functions", href: "/build/add-functions", description: "Rivedi call control, transfer, rescheduling, lead qualification e funzioni API custom." },
      { title: "Monitoring and Visibility", href: "/monitoring/monitoring-and-visibility", description: "Rivedi come monitorare il primo workflow una volta live." },
      { title: "Contatti elaborati", href: "/run-workflows/processed-contacts", description: "Rivedi i contatti già gestiti da workflow inbound o outbound prima di aprire il call record dettagliato." }
    ]
  }
};

function ProductScreenshot({ src, alt, caption, size }: ImageCopy) {
  if (src === screenshotPaths.campaignCallCapacitySchedule) {
    return <CampaignSettingsSplitScreenshot alt={alt} />;
  }

  return (
    <figure className={`docs-screenshot${size === "quarter" ? " docs-screenshot-quarter" : ""}${size === "half" ? " docs-screenshot-half" : ""}`}>
      <div className="docs-screenshot-frame">
        {/* Screenshots are served from public and rendered responsively inside MDX layouts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={src} alt={alt} loading="lazy" />
      </div>
      {caption ? <figcaption className="docs-screenshot-caption">{caption}</figcaption> : null}
    </figure>
  );
}

function ProductScreenshotGrid({ images }: { images: ImageCopy[] }) {
  return (
    <div className="docs-screenshot-grid">
      {images.map((image) => <ProductScreenshot key={image.src} {...image} />)}
    </div>
  );
}

function CampaignSettingsSplitScreenshot({ alt }: { alt?: string }) {
  return (
    <div className="docs-screenshot-split-grid docs-screenshot-split-grid-compact">
      {(["top", "bottom"] as const).map((crop) => (
        <figure className="docs-screenshot docs-screenshot-split" key={crop}>
          <div className="docs-screenshot-frame docs-screenshot-split-frame">
            {/* Screenshots are served from public and cropped responsively inside docs layouts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`docs-screenshot-img docs-screenshot-split-img docs-screenshot-split-img-${crop}`}
              src={screenshotPaths.campaignCallCapacitySchedule}
              alt={alt ?? "Edit campaign screen showing concurrent call capacity, active days, start and end dates, and timezone."}
              loading="lazy"
            />
          </div>
        </figure>
      ))}
    </div>
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

function useQuickstartCopy() {
  const locale = useCurrentLocale(defaultLocale);

  return quickstartCopy[locale];
}

function renderParagraphs(paragraphs: ReactNode[] | undefined) {
  return paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>) ?? null;
}

function renderList(items: ReactNode[] | undefined) {
  return items ? <ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul> : null;
}

function renderOrderedList(items: ReactNode[] | undefined, start = 1) {
  return items ? <ol start={start}>{items.map((item, index) => <li key={index}>{item}</li>)}</ol> : null;
}

function StepContent({ step, nested = false }: { step: StepCopy; nested?: boolean }) {
  const paragraphs = step.paragraphs ?? [];
  const preListParagraphCount = step.preListParagraphCount ?? 1;
  const firstParagraphs = paragraphs.slice(0, preListParagraphCount);
  const remainingParagraphs = paragraphs.slice(preListParagraphCount);

  return (
    <section className={`docs-home-section${nested ? " docs-home-section-nested" : ""}`}>
      {renderParagraphs(firstParagraphs)}
      {step.callout ? <div className="docs-feature-callout">{step.callout}</div> : null}
      {renderList(step.items)}
      {renderParagraphs(remainingParagraphs)}
      {renderList(step.secondaryItems)}
      {step.orderedItems ? renderOrderedList(step.orderedItems) : null}
      {step.image ? <ProductScreenshot {...step.image} /> : null}
      {step.imageGrid ? <ProductScreenshotGrid images={step.imageGrid} /> : null}
      {step.images?.map((image) => <ProductScreenshot key={image.src} {...image} />) ?? null}
    </section>
  );
}

function TroubleshootingInboundContent({ step }: { step: StepCopy }) {
  const inboundItems = step.orderedItems?.slice(0, 6);

  return (
    <section className="docs-home-section docs-home-section-nested">
      {renderParagraphs(step.paragraphs)}
      {renderOrderedList(inboundItems)}
    </section>
  );
}

function TroubleshootingOutboundContent({ step }: { step: StepCopy }) {
  const outboundItems = step.orderedItems?.slice(6);
  const locale = useCurrentLocale(defaultLocale);

  return (
    <section className="docs-home-section docs-home-section-nested">
      <p>{locale === "it" ? "Per l'outbound, parti dalla dashboard real-time della campagna:" : "For outbound, start from the campaign real-time dashboard:"}</p>
      {renderOrderedList(outboundItems)}
    </section>
  );
}

export function LocalizedQuickstartTroubleshootingLink() {
  const locale = useCurrentLocale(defaultLocale);
  const card =
    locale === "it"
      ? {
          title: "Risoluzione problemi",
          href: "/troubleshoot/troubleshooting#quickstart-checks",
          description: "Apri i controlli inbound e outbound quando il primo test non funziona come previsto."
        }
      : {
          title: "Troubleshooting",
          href: "/troubleshoot/troubleshooting#quickstart-checks",
          description: "Open the inbound and outbound checks when the first test does not behave as expected."
        };
  const checks =
    locale === "it"
      ? [
          "il trunk mostra Registered",
          "la route inbound o la campagna usa l'agente corretto",
          "il risultato compare in Inbound Call Records o Call Records"
        ]
      : [
          "the trunk shows Registered",
          "the inbound route or campaign uses the correct agent",
          "the result appears in Inbound Call Records or Call Records"
        ];

  return (
    <section className="docs-home-section">
      <p>
        {locale === "it"
          ? "Se il primo test non funziona come previsto, apri la pagina Risoluzione problemi e segui i controlli inbound o outbound."
          : "If the first test does not behave as expected, open the Troubleshooting page and follow the inbound or outbound checks."}
      </p>
      <ul>
        {checks.map((check) => (
          <li key={check}>{check}</li>
        ))}
      </ul>
      <CardGrid cards={[card]} />
    </section>
  );
}

export function LocalizedQuickstartTitle() {
  return <>{useQuickstartCopy().title}</>;
}

export function LocalizedQuickstartHero() {
  return <>{renderParagraphs(useQuickstartCopy().hero)}</>;
}

export function LocalizedQuickstartBeforeStart() {
  return <StepContent step={useQuickstartCopy().beforeStart} />;
}

export function LocalizedQuickstartChoosePath() {
  return <StepContent step={useQuickstartCopy().choosePath} />;
}

export function LocalizedQuickstartSharedFoundation() {
  return <StepContent step={useQuickstartCopy().sharedFoundation} />;
}

export function LocalizedQuickstartTrunk() {
  return <StepContent step={useQuickstartCopy().trunk} nested />;
}

export function LocalizedQuickstartAgent() {
  return <StepContent step={useQuickstartCopy().agent} nested />;
}

export function LocalizedQuickstartPrompt() {
  return <StepContent step={useQuickstartCopy().prompt} nested />;
}

export function LocalizedQuickstartFunctions() {
  return <StepContent step={useQuickstartCopy().functions} nested />;
}

export function LocalizedQuickstartAgentPhoneTest() {
  return <StepContent step={useQuickstartCopy().agentPhoneTest} nested />;
}

export function LocalizedQuickstartInboundIntro() {
  return <StepContent step={useQuickstartCopy().inboundIntro} />;
}

export function LocalizedQuickstartInboundRouting() {
  return <StepContent step={useQuickstartCopy().inboundRouting} nested />;
}

export function LocalizedQuickstartInboundTest() {
  return <StepContent step={useQuickstartCopy().inboundTest} nested />;
}

export function LocalizedQuickstartInboundReview() {
  return <StepContent step={useQuickstartCopy().inboundReview} nested />;
}

export function LocalizedQuickstartOutboundIntro() {
  return <StepContent step={useQuickstartCopy().outboundIntro} />;
}

export function LocalizedQuickstartImportContacts() {
  return <StepContent step={useQuickstartCopy().importContacts} nested />;
}

export function LocalizedQuickstartOutboundCampaign() {
  return <StepContent step={useQuickstartCopy().outboundCampaign} nested />;
}

export function LocalizedQuickstartOutboundTest() {
  return <StepContent step={useQuickstartCopy().outboundTest} nested />;
}

export function LocalizedQuickstartOutboundReview() {
  return <StepContent step={useQuickstartCopy().outboundReview} nested />;
}

export function LocalizedQuickstartOutboundDashboard() {
  return <StepContent step={useQuickstartCopy().outboundDashboard} nested />;
}

export function LocalizedQuickstartTroubleshootingInbound() {
  return <TroubleshootingInboundContent step={useQuickstartCopy().troubleshooting} />;
}

export function LocalizedQuickstartTroubleshootingOutbound() {
  return <TroubleshootingOutboundContent step={useQuickstartCopy().troubleshooting} />;
}

export function LocalizedQuickstartNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={useQuickstartCopy().nextSteps} />
    </section>
  );
}
