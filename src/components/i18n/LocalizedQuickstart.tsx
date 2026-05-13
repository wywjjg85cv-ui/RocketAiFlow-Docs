"use client";

import Link from "next/link";
import type { ReactNode } from "react";
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
  size?: "quarter";
};

type StepCopy = {
  paragraphs?: ReactNode[];
  items?: ReactNode[];
  secondaryItems?: ReactNode[];
  orderedItems?: ReactNode[];
  image?: ImageCopy;
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

const openAiPromptGuidanceUrl = "https://developers.openai.com/api/docs/guides/prompt-guidance";
const deepgramUrl = "https://deepgram.com/";

const screenshotPaths = {
  trunk: "/screenshots/docs/trunk-configuration.png",
  agent: "/screenshots/docs/agent-creation-form.png",
  prompt: "/screenshots/docs/prompt-configuration.png",
  functions: "/screenshots/docs/function-setup.png",
  inbound: "/screenshots/docs/inbound-route-connection.png",
  inboundCallRecord: "/screenshots/docs/inbound-call-record-review.png",
  contacts: "/screenshots/docs/contact-import.png",
  campaign: "/screenshots/docs/outbound-campaign-setup.png",
  phone: "/screenshots/docs/phone-test-call.png",
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
      "The goal is not to configure every possible option. The goal is to prove one real path, review the result, and confirm that trunk setup, agent behavior, functions, call records, and monitoring are clear enough for broader evaluation.",
      "Inbound and outbound should be validated as separate flows. They share the same agent, prompt, and functions, but they depend on different calling paths."
    ],
    beforeStart: {
      items: [
        "credentials for a real trunk",
        <>a <ExternalInlineLink href={deepgramUrl}>Deepgram</ExternalInlineLink> API key</>,
        "for outbound, a contact list in a CSV file to import or one contact to add manually to the campaign you created"
      ],
      paragraphs: [
        "Before you start, make sure you have:"
      ]
    },
    choosePath: {
      preListParagraphCount: 3,
      paragraphs: [
        "Choose the flow based on what you want to test first.",
        <>For inbound, go to <UiPill>Inbound Ai</UiPill> and configure <UiPill>AI Inbound Routing</UiPill>.</>,
        <>For outbound, go to <UiPill>AI Dialer Flows</UiPill> and configure <UiPill>Dialer Campaigns</UiPill>.</>
      ]
    },
    sharedFoundation: {
      paragraphs: [<>First configure the shared parts: trunk and agent. Then continue with <UiPill>AI Inbound Routing</UiPill> for inbound or <UiPill>AI Dialer Flows</UiPill> and <UiPill>Dialer Campaigns</UiPill> for outbound.</>]
    },
    trunk: {
      preListParagraphCount: 2,
      items: [
        <><strong>trunk enabled</strong> — activate the trunk so it is available for routing and campaigns</>,
        <><strong>registration</strong> — enable registration so the trunk can receive inbound calls</>,
        <><strong>registration server URI</strong> — the SIP server address from your provider</>,
        <><strong>auth username and password</strong> — the credentials used to register with the provider</>
      ],
      paragraphs: [
        "Inbound routing and outbound campaigns depend on a configured trunk. Before proceeding, create and enable a trunk with the credentials provided by your SIP provider.",
        "At minimum, configure:",
        <>After entering the correct settings, open the <strong>Trunk status</strong> section and check that the trunk shows <code>Registered</code> and <code>Not in use</code>. This means the trunk is ready.</>
      ],
      image: {
        src: screenshotPaths.trunk,
        alt: "Trunk status check screen showing Registered and Not in use."
      }
    },
    agent: {
      items: ["lead qualification", "appointment intake", "routing to a human team"],
      paragraphs: [
        "Create one focused agent with a narrow business goal such as:",
        "You can select the default template right away if you want to use variables. Templates are covered in another section, so do not use them in this quickstart yet.",
        <>Use a simple example such as <code>lead qualification</code> and keep the scope limited to one workflow.</>
      ],
      image: {
        src: screenshotPaths.agent,
        alt: "Agent configuration screen showing voice settings, a default contact template, and prompt variables."
      }
    },
    prompt: {
      items: ["role", "tone", "information to collect", "when to transfer or end the call"],
      paragraphs: [
        "Write short, clear instructions for the agent.",
        <>If you choose OpenAI as the LLM, use the <ExternalInlineLink href={openAiPromptGuidanceUrl}>OpenAI prompt guidance</ExternalInlineLink> as a reference.</>,
        "For now, define only:"
      ],
      image: {
        src: screenshotPaths.prompt,
        alt: "LLM configuration screen showing OpenAI, GPT-5.5, prompt instructions, and contact template variables."
      }
    },
    functions: {
      preListParagraphCount: 2,
      items: [
        <><code>hangup_call</code> ends the call when the workflow is complete</>,
        <><code>transfer_call</code> transfers the caller to a human team or another destination</>,
        <><code>rescheduled_contact</code> saves that the contact should be called again later</>,
        <><code>save_lead_qualification</code> stores the qualification result and the useful details collected during the call</>,
        "a custom function lets you start from zero and connect the workflow to almost any API your business needs"
      ],
      paragraphs: [
        "Functions are where the agent stops being only a conversation and starts taking useful actions.",
        "RocketAiFlow includes ready-made functions you can use as examples or starting points:"
      ],
      callout: "Functions are not required for the quickstart. Add them only if you want to test actions beyond the basic conversation.",
      secondaryItems: [
        "For this quickstart, attach only the functions that make sense for the first test. You can add more later.",
        "When the workflow needs something specific, create a custom function and connect it to the API you need: CRM, calendar, helpdesk, database, enrichment service, internal system, or any provider that exposes an API.",
        "In the future, RocketAiFlow will also include more functions you can use as starting points for popular CRMs and API-based providers."
      ],
      image: {
        src: screenshotPaths.functions,
        alt: "Function setup screen showing ready-made functions and a custom API action option."
      }
    },
    agentPhoneTest: {
      preListParagraphCount: 2,
      paragraphs: [
        "After configuring the agent, test it directly from the Phone section.",
        "This is not an inbound or outbound workflow test. It simulates an inbound-style call over WebRTC directly to the agent, without using the trunk."
      ],
      items: [
        <>open <strong>Phone</strong></>,
        <>enter the password for the default <code>2000</code> agent</>,
        "select the agent you created in Voice agent test mode",
        "start the call and check only that the agent responds as expected"
      ],
      image: {
        src: screenshotPaths.phone,
        alt: "Phone section showing WebRTC voice agent test mode and keypad for calling an agent directly."
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
        "the number of concurrent calls to handle"
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
        <>Upload a CSV for the outbound campaign and set <code>Usage</code> to <UiPill>AI Dialer Flows</UiPill>. This is required when contacts must be called by the outbound dialer.</>,
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
        alt: "Contact import and field mapping flow."
      }
    },
    outboundCampaign: {
      items: [
        "select the agent you created",
        "select the trunk you created",
        "select the campaign timezone",
        "set Concurrent Call Capacity to 1",
        "leave Retry Minutes To Reschedule at the default value",
        "add or import one contact for the first test"
      ],
      paragraphs: [
        <>Path to follow: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns", "Add Campaigns"]} /> Then configure a simple campaign for the first test:</>
      ],
      image: {
        src: screenshotPaths.campaign,
        alt: "Outbound campaign setup for a small controlled test."
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
        <>In <strong>Real-Time Agents & Trunks</strong>, check the trunk state: <code>Not In Use</code> means the trunk is available, while <code>In Use</code> means calls are running through it.</>,
        "There is also a performance view for analyzing calls over a selected time range. This is useful after the first tests and will be covered in another section."
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
          check <strong>Real-Time Agents & Trunks</strong>: the trunk is <code>Not In Use</code> when available and becomes <code>In Use</code> while calls are running
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
          <ProductScreenshot
            src={screenshotPaths.campaignCallCapacitySchedule}
            alt="Edit campaign screen showing concurrent call capacity, active days, start and end dates, and timezone."
            size="quarter"
          />
        </>,
        "check the final result in Call Records"
      ]
    },
    nextSteps: [
      { title: "Trunk Configuration", href: "/deploy/trunk-configuration", description: "Review the trunk setup that must be ready before routing or campaign execution." },
      { title: "AI Inbound Routing", href: "/run-workflows/ai-inbound-routing", description: "Go deeper on inbound setup after the inbound trunk and agent are ready." },
      { title: "AI Dialer Flows", href: "/run-workflows/ai-dialer-flows", description: "Go deeper on outbound campaign setup after the outbound trunk and agent are ready." },
      { title: "Configure Agent Functions", href: "/build/add-functions", description: "Review call control, transfer, rescheduling, lead qualification, and custom API functions." },
      { title: "Monitoring and Visibility", href: "/observe/monitoring-and-visibility", description: "Review how the first workflow should be monitored once it is live." },
      { title: "Dialer Pacing and Limits", href: "/run-workflows/dialer-pacing-and-limits", description: "Review calls per second and maximum active calls before scaling an outbound campaign." },
      { title: "Call History and Review", href: "/run-workflows/call-history-and-review", description: "Review completed calls through transcripts, recordings when enabled, and timing metrics." }
    ]
  },
  it: {
    title: "Guida rapida",
    hero: [
      "Usa questa pagina quando vuoi arrivare al primo workflow funzionante in RocketAiFlow nel modo più diretto possibile.",
      "L'obiettivo non è configurare ogni opzione disponibile. L'obiettivo è provare un percorso reale, rivedere il risultato e confermare che trunk, agente, funzioni, call records e monitoring siano chiari abbastanza per una valutazione più ampia.",
      "Inbound e outbound vanno validati come flussi separati. Condividono agente, prompt e funzioni, ma dipendono da percorsi di chiamata diversi."
    ],
    beforeStart: {
      paragraphs: [
        "Prima di iniziare, assicurati di avere:"
      ],
      items: [
        "le credenziali di un trunk reale",
        <>una API key di <ExternalInlineLink href={deepgramUrl}>Deepgram</ExternalInlineLink></>,
        "per l'outbound, una lista di contatti in un file CSV da importare oppure aggiungi un contatto manualmente nella campagna creata"
      ]
    },
    choosePath: {
      preListParagraphCount: 3,
      paragraphs: [
        "Scegli il flusso in base a cosa vuoi testare per primo.",
        <>Per l'inbound, vai in <UiPill>Inbound Ai</UiPill> e configura <UiPill>AI Inbound Routing</UiPill>.</>,
        <>Per l'outbound, vai in <UiPill>AI Dialer Flows</UiPill> e configura <UiPill>Dialer Campaigns</UiPill>.</>
      ]
    },
    sharedFoundation: {
      paragraphs: [<>Configura prima le parti comuni: trunk e agente. Poi continua con <UiPill>AI Inbound Routing</UiPill> per l'inbound oppure con <UiPill>AI Dialer Flows</UiPill> e <UiPill>Dialer Campaigns</UiPill> per l'outbound.</>]
    },
    trunk: {
      preListParagraphCount: 2,
      paragraphs: [
        "Inbound routing e campagne outbound dipendono da un trunk configurato. Prima di procedere, crea e abilita un trunk con le credenziali fornite dal tuo provider SIP.",
        "Al minimo, configura:",
        <>Dopo aver inserito le configurazioni corrette, apri la sezione <strong>Stato del trunk</strong> e controlla che il trunk mostri <code>Registered</code> e <code>Not in use</code>. Questo significa che il trunk è pronto.</>
      ],
      items: [
        <><strong>trunk enabled</strong> — attiva il trunk così può essere usato da routing e campagne</>,
        <><strong>registration</strong> — abilita la registration così il trunk può ricevere chiamate inbound</>,
        <><strong>registration server URI</strong> — indirizzo del server SIP fornito dal provider</>,
        <><strong>auth username and password</strong> — credenziali usate per registrarsi al provider</>
      ],
      image: {
        src: screenshotPaths.trunk,
        alt: "Schermata Stato del trunk con Registered e Not in use."
      }
    },
    agent: {
      paragraphs: [
        "Crea un agente focalizzato con un obiettivo di business ristretto, ad esempio:",
        "Puoi selezionare subito il template di default se vuoi usare le variabili. I template vengono approfonditi in un'altra sezione, quindi non usarli ancora in questo quickstart.",
        <>Usa un esempio semplice come <code>lead qualification</code> e limita l'ambito a un solo workflow.</>
      ],
      items: ["qualificazione lead", "raccolta appuntamenti", "instradamento verso un team umano"],
      image: {
        src: screenshotPaths.agent,
        alt: "Schermata di configurazione agente con impostazioni voce, template contatto di default e variabili nel prompt."
      }
    },
    prompt: {
      paragraphs: [
        "Scrivi istruzioni brevi e chiare per l'agente.",
        <>Se scegli OpenAI come LLM, usa la <ExternalInlineLink href={openAiPromptGuidanceUrl}>prompt guidance di OpenAI</ExternalInlineLink> come riferimento.</>,
        "Per ora definisci solo:"
      ],
      items: ["ruolo", "tono", "informazioni da raccogliere", "quando trasferire o terminare la chiamata"],
      image: {
        src: screenshotPaths.prompt,
        alt: "Schermata di configurazione LLM con OpenAI, GPT-5.5, istruzioni del prompt e variabili del template contatto."
      }
    },
    functions: {
      preListParagraphCount: 2,
      paragraphs: [
        "Le funzioni sono il punto in cui l'agente smette di essere solo una conversazione e inizia a compiere azioni utili.",
        "RocketAiFlow include funzioni già preimpostate che puoi usare come esempi o punti di partenza:"
      ],
      callout: "Le funzioni non sono obbligatorie per il quickstart. Aggiungile solo se vuoi testare azioni oltre alla conversazione base.",
      secondaryItems: [
        "Per questo quickstart collega solo le funzioni che servono al primo test. Potrai aggiungerne altre dopo.",
        "Quando il workflow ha bisogno di qualcosa di specifico, crea una funzione custom e collegala all'API che ti serve: CRM, calendario, helpdesk, database, enrichment, sistema interno o qualunque provider esponga API.",
        "In futuro RocketAiFlow includerà anche più funzioni da usare come base di partenza per i CRM più usati e per provider che offrono servizi via API."
      ],
      items: [
        <><code>hangup_call</code> termina la chiamata quando il workflow è completato</>,
        <><code>transfer_call</code> trasferisce la chiamata a un team umano o a un'altra destinazione</>,
        <><code>rescheduled_contact</code> salva che il contatto deve essere richiamato più avanti</>,
        <><code>save_lead_qualification</code> salva l'esito della qualificazione e i dati utili raccolti durante la chiamata</>,
        "una funzione custom ti permette di partire da zero e integrare il workflow con quasi qualsiasi API utile al tuo business"
      ],
      image: {
        src: screenshotPaths.functions,
        alt: "Schermata di setup funzioni con funzioni preimpostate e opzione per una custom API action."
      }
    },
    agentPhoneTest: {
      preListParagraphCount: 2,
      paragraphs: [
        "Dopo aver configurato l'agente, provalo direttamente dalla sezione Phone.",
        "Questo non è un test del flusso inbound o outbound. Simula una chiamata simile all'inbound via WebRTC direttamente verso l'agente, senza passare dal trunk."
      ],
      items: [
        <>vai nella sezione <strong>Phone</strong></>,
        <>inserisci la password dell'agente <code>2000</code>, creato di default</>,
        "seleziona l'agente che hai creato in Voice agent test mode",
        "avvia la chiamata e controlla solo che l'agente risponda come previsto"
      ],
      image: {
        src: screenshotPaths.phone,
        alt: "Sezione Phone con modalità di test WebRTC voice agent e keypad per chiamare direttamente un agente."
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
        "il numero di chiamate concorrenti da gestire"
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
        <>Carica un CSV per la campagna outbound e imposta <code>Usage</code> su <UiPill>AI Dialer Flows</UiPill>. Questo è l'uso richiesto quando i contatti devono essere chiamati dal dialer outbound.</>,
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
        alt: "Flusso di importazione contatti e mapping dei campi."
      }
    },
    outboundCampaign: {
      paragraphs: [
        <>Percorso da seguire: <NavigationPath steps={["AI Dialer Flows", "Dialer Campaigns", "Add Campaigns"]} /> Poi configura una campagna semplice per il primo test:</>
      ],
      items: [
        "seleziona l'agente che hai creato",
        "seleziona il trunk che hai creato",
        "seleziona il timezone della campagna",
        "imposta Concurrent Call Capacity a 1",
        "lascia Retry Minutes To Reschedule al valore di default",
        "aggiungi o importa un contatto per fare il primo test"
      ],
      image: {
        src: screenshotPaths.campaign,
        alt: "Setup di una campagna outbound per un piccolo test controllato."
      }
    },
    outboundTest: {
      paragraphs: [
        "Fai partire la chiamata e verifica il risultato nella sezione Call Records.",
        "Una volta effettuato il primo test con il primo contatto, decidi il ritmo da dare alla campagna selezionando quante chiamate concorrenti effettuare."
      ],
      image: {
        src: screenshotPaths.records,
        alt: "Lista call records outbound con filtri campagna, outcome answered e no answer, timing e azioni di dettaglio."
      }
    },
    outboundReview: {
      paragraphs: [
        "Dopo la chiamata di test, apri il Call Record e controlla outcome, transcript e timing."
      ],
      image: {
        src: screenshotPaths.recordingTranscript,
        alt: "Dettaglio call record con playback della registrazione e transcript della chiamata."
      }
    },
    outboundDashboard: {
      paragraphs: [
        "Usa la sezione Dashboard per monitorare in tempo reale il ritmo delle campagne, le chiamate attive, i limiti, il dialing rate e tutti gli esiti delle chiamate.",
        <>In <strong>Real-Time Agents & Trunks</strong>, controlla lo stato del trunk: <code>Not In Use</code> significa che il trunk è disponibile, mentre <code>In Use</code> significa che le chiamate stanno passando da quel trunk.</>,
        "C'è anche una vista performance per analizzare le chiamate in un time range selezionato. Serve dopo i primi test e verrà approfondita in un'altra sezione."
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
          controlla <strong>Real-Time Agents & Trunks</strong>: il trunk è <code>Not In Use</code> quando è disponibile e diventa <code>In Use</code> mentre le chiamate sono in corso
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
          <ProductScreenshot
            src={screenshotPaths.campaignCallCapacitySchedule}
            alt="Schermata modifica campagna con numero di chiamate concorrenti, giorni attivi, date di inizio e fine e timezone."
            size="quarter"
          />
        </>,
        "controlla il risultato finale nei Call Records"
      ]
    },
    nextSteps: [
      { title: "Configurazione trunk", href: "/deploy/trunk-configuration", description: "Rivedi il setup trunk che deve essere pronto prima di routing o campagne." },
      { title: "AI Inbound Routing", href: "/run-workflows/ai-inbound-routing", description: "Approfondisci il setup inbound dopo che trunk inbound e agente sono pronti." },
      { title: "AI Dialer Flows", href: "/run-workflows/ai-dialer-flows", description: "Approfondisci il setup outbound dopo che trunk outbound e agente sono pronti." },
      { title: "Configura le functions", href: "/build/add-functions", description: "Rivedi call control, transfer, rescheduling, lead qualification e funzioni API custom." },
      { title: "Monitoring and Visibility", href: "/observe/monitoring-and-visibility", description: "Rivedi come monitorare il primo workflow una volta live." },
      { title: "Dialer pacing e limiti", href: "/run-workflows/dialer-pacing-and-limits", description: "Rivedi calls per second e maximum active calls prima di scalare una campagna outbound." },
      { title: "Cronologia e revisione chiamate", href: "/run-workflows/call-history-and-review", description: "Rivedi chiamate completate, trascrizioni, registrazioni quando abilitate e metriche temporali." }
    ]
  }
};

function ProductScreenshot({ src, alt, size }: ImageCopy) {
  return (
    <figure className={`docs-screenshot${size === "quarter" ? " docs-screenshot-quarter" : ""}`}>
      <div className="docs-screenshot-frame">
        {/* Screenshots are served from public and rendered responsively inside MDX layouts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={src} alt={alt} loading="lazy" />
      </div>
    </figure>
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
          title: "Troubleshooting",
          href: "/troubleshoot/troubleshooting#quickstart-checks",
          description: "Apri i controlli inbound e outbound quando il primo test non funziona come previsto."
        }
      : {
          title: "Troubleshooting",
          href: "/troubleshoot/troubleshooting#quickstart-checks",
          description: "Open the inbound and outbound checks when the first test does not behave as expected."
        };

  return (
    <section className="docs-home-section">
      <p>
        {locale === "it"
          ? "Se il primo test non funziona come previsto, apri la pagina Troubleshooting e segui i controlli inbound o outbound."
          : "If the first test does not behave as expected, open the Troubleshooting page and follow the inbound or outbound checks."}
      </p>
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
