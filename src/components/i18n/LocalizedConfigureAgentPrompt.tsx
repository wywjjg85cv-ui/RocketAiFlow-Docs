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
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type PromptCopy = {
  title: string;
  intro: ReactNode[];
  principles: SectionCopy;
  structure: SectionCopy;
  example: SectionCopy;
  functions: SectionCopy;
  variables: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey = "principles" | "structure" | "example" | "functions" | "variables" | "nextSteps";

const openAiPromptGuidanceUrl = "https://developers.openai.com/api/docs/guides/prompt-guidance";
const openAiFunctionCallingUrl = "https://developers.openai.com/api/docs/guides/function-calling";

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="docs-inline-link" href={href}>
      <span>{children}</span>
    </Link>
  );
}

function ExternalDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="docs-inline-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
    </a>
  );
}

function PromptBlock({ children }: { children: ReactNode }) {
  return <pre className="docs-code-block"><code>{children}</code></pre>;
}

const promptCopy: Record<Locale, PromptCopy> = {
  en: {
    title: "Configure Agent Prompt",
    intro: [
      "The prompt is the operating instruction for the voice agent. It should tell the agent what it is, what it must achieve, how it should speak, what data it must collect, and when it should use functions.",
      "Keep the first version practical. A short prompt with clear sections is easier to test than a long prompt with many overlapping rules."
    ],
    principles: {
      title: "Prompt principles",
      paragraphs: [
        <>OpenAI recommends starting with clear instructions, adding specific sections for behaviors that matter, using ordered steps when the workflow has a sequence, and adding examples when behavior needs to be demonstrated. See the <ExternalDocsLink href={openAiPromptGuidanceUrl}>OpenAI prompt guidance</ExternalDocsLink>.</>,
        "For RocketAiFlow, write prompts as operational rules for a real phone call, not as a product description."
      ],
      items: [
        "use short sections with explicit headings",
        "state the business objective in plain language",
        "define the speaking style with concrete rules",
        "list the required information the agent must collect",
        "name the functions the agent can call and when to call them",
        "state what the agent must do when information is missing",
        "avoid conflicting instructions and broad vague goals"
      ]
    },
    structure: {
      title: "Suggested prompt structure",
      paragraphs: [
        "Use this structure as a starting point for complex prompts. Keep each section short. Add detail only where it changes behavior."
      ],
      items: [
        <><strong>Role:</strong> who the agent is and who it represents.</>,
        <><strong>Goal:</strong> the outcome the call should reach.</>,
        <><strong>Conversation style:</strong> how the agent should speak, how long answers should be, and how it should handle uncertainty.</>,
        <><strong>Information to collect:</strong> the fields needed before the workflow can continue.</>,
        <><strong>Functions:</strong> exact function names, when to call them, and what fields must be available first.</>,
        <><strong>Transfer or hangup:</strong> when the call should be transferred, closed, or left unresolved.</>,
        <><strong>Context variables:</strong> contact or campaign values the prompt can use, such as <code>{`{t.name}`}</code> or <code>{`{t.data.birthDate}`}</code>.</>
      ],
      callout: (
        <PromptBlock>{`Role: [1-2 sentences defining the model's function, context, and job]

# Personality
[tone, demeanor, and collaboration style]

# Goal
[user-visible outcome]

# Success criteria
[what must be true before the final answer]

# Constraints
[policy, safety, business, evidence, and side-effect limits]

# Output
[sections, length, and tone]

# Stop rules
[when to retry, fallback, abstain, ask, or stop]`}</PromptBlock>
      )
    },
    example: {
      title: "Starter prompt example",
      paragraphs: [
        "Use this as a compact starting point and adapt the role, objective, required fields, and function names to your workflow."
      ],
      callout: (
        <PromptBlock>{`# Role
You are Rocket Demo Assistant, a voice agent for RocketAiFlow.

# Goal
Qualify the caller and understand whether they want a demo, a callback, or more information.

# Conversation style
- Speak clearly and briefly.
- Ask one question at a time.
- Do not invent information.
- If the caller asks something you cannot answer, say so and offer a transfer.

# Information to collect
- name
- company
- reason for the call
- interest level
- preferred next step

# Functions
- Use save_lead_qualification only after you have collected the required qualification fields.
- If a required field is missing, ask one short follow-up question before calling the function.
- Use transfer_call only when the caller asks to speak with a human or the workflow requires a handoff.
- Use hangup_call only after the conversation has reached a clear closing point.

# Closing
Summarize the next step before ending or transferring the call.`}</PromptBlock>
      )
    },
    functions: {
      title: "Prompt functions clearly",
      paragraphs: [
        <>OpenAI function calling works best when functions have clear names, descriptions, and schemas, and when the prompt explains when the model should call them. See the <ExternalDocsLink href={openAiFunctionCallingUrl}>OpenAI function calling guide</ExternalDocsLink>.</>,
        "In the prompt, mention a function by its exact name and connect it to a concrete condition."
      ],
      items: [
        <><strong>Good:</strong> “Use <code>transfer_to_service</code> when the caller asks for sales, support, or administration. Set <code>exten</code> to the matching supported service.”</>,
        <><strong>Good:</strong> “Use <code>rescheduled_contact</code> only after the caller asks to be contacted later and you have confirmed the callback date and time.”</>,
        <><strong>Avoid:</strong> “Use tools when useful.” This is too vague for reliable behavior.</>,
        "Add a negative rule for every important function: do not call it if the required fields are missing or the caller intent is unclear."
      ]
    },
    variables: {
      title: "Use context variables only when they help",
      paragraphs: [
        "Template variables can personalize the prompt, but they should not make the instruction hard to read.",
        <>Use variables such as <code>{`{t.name}`}</code>, <code>{`{t.phone}`}</code>, or <code>{`{t.externalId}`}</code> only when the prompt or function needs that context.</>
      ],
      items: [
        "use contact variables for known data already saved on the contact",
        "ask the caller for values that are not already available",
        "do not assume a variable will render unless the value exists on the active contact",
        <>review the detailed model in <InlineDocsLink href="/build/dynamic-parameters">Dynamic Parameters</InlineDocsLink></>
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "Configure Agent Functions",
        href: "/build/add-functions",
        description: "Give the agent the functions referenced in the prompt."
      },
      {
        title: "Dynamic Parameters",
        href: "/build/dynamic-parameters",
        description: "Use contact and runtime values inside prompts and functions."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Connect the configured agent to the first inbound route."
      }
    ]
  },
  it: {
    title: "Configura il prompt",
    intro: [
      "Il prompt è l'istruzione operativa dell'agente vocale. Deve dire chi è l'agente, cosa deve ottenere, come deve parlare, quali dati deve raccogliere e quando deve usare le functions.",
      "Mantieni la prima versione pratica. Un prompt breve con sezioni chiare è più facile da testare rispetto a un prompt lungo con regole sovrapposte."
    ],
    principles: {
      title: "Principi per costruire il prompt",
      paragraphs: [
        <>OpenAI consiglia di partire da istruzioni chiare, aggiungere sezioni specifiche per i comportamenti importanti, usare step ordinati quando il workflow ha una sequenza e aggiungere esempi quando vuoi mostrare il comportamento atteso. Vedi la <ExternalDocsLink href={openAiPromptGuidanceUrl}>prompt guidance di OpenAI</ExternalDocsLink>.</>,
        "In RocketAiFlow, scrivi il prompt come regole operative per una chiamata reale, non come descrizione del prodotto."
      ],
      items: [
        "usa sezioni brevi con titoli espliciti",
        "scrivi l'obiettivo di business in modo semplice",
        "definisci lo stile conversazionale con regole concrete",
        "elenca le informazioni che l'agente deve raccogliere",
        "nomina le functions che l'agente può chiamare e quando deve chiamarle",
        "spiega cosa deve fare l'agente quando manca un'informazione",
        "evita istruzioni in conflitto e obiettivi generici"
      ]
    },
    structure: {
      title: "Struttura prompt suggerita",
      paragraphs: [
        "Usa questa struttura come punto di partenza per prompt complessi. Mantieni ogni sezione breve. Aggiungi dettagli solo dove cambiano il comportamento."
      ],
      items: [
        <><strong>Ruolo:</strong> chi è l'agente e chi rappresenta.</>,
        <><strong>Obiettivo:</strong> quale risultato deve raggiungere la chiamata.</>,
        <><strong>Stile conversazionale:</strong> come deve parlare, quanto devono essere lunghe le risposte e come deve gestire l'incertezza.</>,
        <><strong>Informazioni da raccogliere:</strong> i campi necessari prima di continuare il workflow.</>,
        <><strong>Functions:</strong> nomi esatti delle functions, quando chiamarle e quali campi devono essere disponibili prima.</>,
        <><strong>Transfer o hangup:</strong> quando la chiamata deve essere trasferita, chiusa o lasciata senza esito.</>,
        <><strong>Variabili di contesto:</strong> valori contatto o campagna che il prompt può usare, come <code>{`{t.name}`}</code> o <code>{`{t.data.birthDate}`}</code>.</>
      ],
      callout: (
        <PromptBlock>{`Ruolo: [1-2 frasi che definiscono funzione, contesto e compito del modello]

# Personalità
[tono, atteggiamento e stile di collaborazione]

# Obiettivo
[risultato visibile all'utente]

# Criteri di successo
[cosa deve essere vero prima della risposta finale]

# Vincoli
[limiti di policy, sicurezza, business, evidenza e azioni con effetti esterni]

# Output
[sezioni, lunghezza e tono]

# Regole di stop
[quando riprovare, usare un fallback, astenersi, chiedere o fermarsi]`}</PromptBlock>
      )
    },
    example: {
      title: "Esempio prompt iniziale",
      paragraphs: [
        "Usalo come punto di partenza compatto e adatta ruolo, obiettivo, campi richiesti e nomi delle functions al tuo workflow."
      ],
      callout: (
        <PromptBlock>{`# Ruolo
Sei Rocket Demo Assistant, un agente vocale per RocketAiFlow.

# Obiettivo
Qualifica il chiamante e capisci se vuole una demo, un callback o più informazioni.

# Stile conversazionale
- Parla in modo chiaro e breve.
- Fai una domanda alla volta.
- Non inventare informazioni.
- Se il chiamante chiede qualcosa a cui non puoi rispondere, dillo e proponi un transfer.

# Informazioni da raccogliere
- nome
- azienda
- motivo della chiamata
- livello di interesse
- prossimo step preferito

# Functions
- Usa save_lead_qualification solo dopo aver raccolto i campi richiesti per qualificare il lead.
- Se manca un campo obbligatorio, fai prima una breve domanda di follow-up.
- Usa transfer_call solo quando il chiamante chiede di parlare con una persona o il workflow richiede un handoff.
- Usa hangup_call solo quando la conversazione ha raggiunto un punto di chiusura chiaro.

# Chiusura
Riassumi il prossimo step prima di terminare o trasferire la chiamata.`}</PromptBlock>
      )
    },
    functions: {
      title: "Descrivi le functions in modo chiaro",
      paragraphs: [
        <>La function calling di OpenAI funziona meglio quando le functions hanno nome, descrizione e schema chiari, e quando il prompt spiega quando il modello deve chiamarle. Vedi la <ExternalDocsLink href={openAiFunctionCallingUrl}>guida OpenAI sulle function calling</ExternalDocsLink>.</>,
        "Nel prompt, cita la function con il suo nome esatto e collegala a una condizione concreta."
      ],
      items: [
        <><strong>Buono:</strong> “Usa <code>transfer_to_service</code> quando il chiamante chiede sales, support o administration. Imposta <code>exten</code> sul servizio supportato corretto.”</>,
        <><strong>Buono:</strong> “Usa <code>rescheduled_contact</code> solo dopo che il chiamante ha chiesto di essere ricontattato e hai confermato data e ora del callback.”</>,
        <><strong>Evita:</strong> “Usa i tool quando serve.” È troppo vago per ottenere un comportamento affidabile.</>,
        "Aggiungi una regola negativa per ogni function importante: non chiamarla se mancano i campi required o se l'intenzione del chiamante non è chiara."
      ]
    },
    variables: {
      title: "Usa le variabili di contesto solo quando servono",
      paragraphs: [
        "Le variabili template possono personalizzare il prompt, ma non devono renderlo difficile da leggere.",
        <>Usa variabili come <code>{`{t.name}`}</code>, <code>{`{t.phone}`}</code> o <code>{`{t.externalId}`}</code> solo quando il prompt o la function hanno bisogno di quel contesto.</>
      ],
      items: [
        "usa variabili contatto per dati già salvati sul contatto",
        "chiedi al chiamante i valori che non sono già disponibili",
        "non dare per scontato che una variabile venga renderizzata se il valore non esiste sul contatto attivo",
        <>rivedi il modello completo in <InlineDocsLink href="/build/dynamic-parameters">Parametri dinamici</InlineDocsLink></>
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Configura le functions",
        href: "/build/add-functions",
        description: "Collega all'agente le functions citate nel prompt."
      },
      {
        title: "Parametri dinamici",
        href: "/build/dynamic-parameters",
        description: "Usa valori contatto e runtime dentro prompt e functions."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Collega l'agente configurato alla prima route inbound."
      }
    ]
  }
};

function usePromptCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return promptCopy[locale];
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

export function LocalizedConfigureAgentPromptTitle() {
  return <>{usePromptCopy().title}</>;
}

export function LocalizedConfigureAgentPromptHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = usePromptCopy();
  const labels: Record<HeadingKey, string> = {
    principles: copy.principles.title,
    structure: copy.structure.title,
    example: copy.example.title,
    functions: copy.functions.title,
    variables: copy.variables.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedConfigureAgentPromptIntro() {
  const copy = usePromptCopy();
  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedConfigureAgentPromptPrinciples() {
  return <Section section={usePromptCopy().principles} />;
}

export function LocalizedConfigureAgentPromptStructure() {
  return <Section section={usePromptCopy().structure} />;
}

export function LocalizedConfigureAgentPromptExample() {
  return <Section section={usePromptCopy().example} />;
}

export function LocalizedConfigureAgentPromptFunctions() {
  return <Section section={usePromptCopy().functions} />;
}

export function LocalizedConfigureAgentPromptVariables() {
  return <Section section={usePromptCopy().variables} />;
}

export function LocalizedConfigureAgentPromptNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={usePromptCopy().nextSteps} />
    </section>
  );
}
