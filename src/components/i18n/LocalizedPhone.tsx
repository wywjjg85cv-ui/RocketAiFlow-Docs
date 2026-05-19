"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type PhoneCopy = {
  title: string;
  intro: ReactNode[];
  screenshotAlt: string;
  webRtc: SectionCopy;
  agentTest: SectionCopy;
  validation: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey = "webRtc" | "agentTest" | "validation" | "nextSteps";

const phoneScreenshotPath = "/screenshots/docs/phone-webrtc-client.png";

const phoneCopy: Record<Locale, PhoneCopy> = {
  en: {
    title: "Phone",
    intro: [
      "Phone is RocketAiFlow's browser-based WebRTC client.",
      "Use it to register a SIP/WebRTC user, place and receive calls from the platform, and run controlled tests before changing inbound routes or outbound campaigns."
    ],
    screenshotAlt: "Phone page showing SIP configuration, voice agent test mode, keypad, transport status, SIP registration status, call status, volume, and auto-answer toggle.",
    webRtc: {
      title: "Use Phone as a WebRTC client",
      paragraphs: [
        "Phone can register against different Asterisk extensions or SIP users by using the credentials configured for that account.",
        "After registration, you can receive incoming calls, dial numbers from the keypad, monitor transport/SIP/call state, adjust remote audio volume, and enable auto-answer when you want the browser client to answer incoming calls automatically."
      ],
      items: [
        "Full Name, User Name, and Password identify the SIP/WebRTC user to register.",
        "Connect starts the browser registration.",
        "The status badges show transport, SIP registration, and current call state.",
        "The keypad is used to place manual outbound calls.",
        "Auto-answer incoming calls can be enabled for controlled tests where the browser client should answer without manual action."
      ]
    },
    agentTest: {
      title: "Test an AI voice agent from Phone",
      paragraphs: [
        "Voice agent test mode lets you pick an available AI voice agent and start a direct test call from the browser.",
        "This is useful for checking inbound-style behavior before attaching the agent to a real inbound trunk route. It validates the agent conversation, prompt, voice, transfer, and hangup behavior without depending on external trunk routing."
      ],
      items: [
        "select the agent you want to test",
        "start the call from Phone",
        "verify that the agent answers and follows the expected workflow",
        "review the result in Inbound Call Records after the call completes"
      ]
    },
    validation: {
      title: "What to validate",
      paragraphs: [
        "Use Phone for small, repeatable tests. Change one setting, place one call, review the result, then continue."
      ],
      items: [
        "SIP/WebRTC registration succeeds with the selected user",
        "incoming and outgoing calls work from the browser",
        "microphone and remote audio are working",
        "auto-answer behaves as expected when enabled",
        "the selected AI voice agent responds correctly",
        "transfer, hangup, transcript, timing, and Inbound Call Record data match the expected result"
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "Inbound Call Records",
        href: "/run-workflows/call-records",
        description: "Review the outcome of the manual test after the call completes."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Connect the validated agent to a real inbound route."
      }
    ]
  },
  it: {
    title: "Phone",
    intro: [
      "Phone è il client WebRTC integrato in RocketAiFlow.",
      "Usalo per registrare un utente SIP/WebRTC, fare e ricevere chiamate dalla piattaforma e fare test controllati prima di modificare route inbound o campagne outbound."
    ],
    screenshotAlt: "Pagina Phone con configurazione SIP, modalità test agente vocale, tastierino, stato transport, stato registrazione SIP, stato chiamata, volume e toggle auto-answer.",
    webRtc: {
      title: "Usa Phone come client WebRTC",
      paragraphs: [
        "Phone può registrarsi su diversi interni o utenti SIP di Asterisk usando le credenziali configurate per quell'account.",
        "Dopo la registrazione puoi ricevere chiamate inbound, comporre numeri dal keypad, monitorare stato transport/SIP/chiamata, regolare il volume dell'audio remoto e abilitare auto-answer quando vuoi che il client browser risponda automaticamente alle chiamate in arrivo."
      ],
      items: [
        "Full Name, User Name e Password identificano l'utente SIP/WebRTC da registrare.",
        "Connect avvia la registrazione dal browser.",
        "I badge di stato mostrano transport, registrazione SIP e stato chiamata corrente.",
        "Il keypad serve per fare chiamate manuali in uscita.",
        "L'auto-answer può essere abilitato quando il browser deve rispondere automaticamente durante test controllati."
      ]
    },
    agentTest: {
      title: "Testa un AI voice agent da Phone",
      paragraphs: [
        "Voice agent test mode ti permette di selezionare un AI voice agent disponibile e avviare una chiamata diretta dal browser.",
        "È utile per controllare un comportamento simile all'inbound prima di collegare l'agente a una route trunk reale. In questo modo validi conversazione, prompt, voce, transfer e hangup senza dipendere dal routing esterno del trunk."
      ],
      items: [
        "seleziona l'agente che vuoi testare",
        "avvia la chiamata da Phone",
        "verifica che l'agente risponda e segua il workflow atteso",
        "rivedi il risultato negli Inbound Call Records quando la chiamata termina"
      ]
    },
    validation: {
      title: "Cosa validare",
      paragraphs: [
        "Usa Phone per test piccoli e ripetibili. Cambia una configurazione, fai una chiamata, rivedi il risultato e poi continua."
      ],
      items: [
        "la registrazione SIP/WebRTC funziona con l'utente selezionato",
        "le chiamate in ingresso e in uscita funzionano dal browser",
        "microfono e audio remoto funzionano correttamente",
        "auto-answer si comporta come previsto quando è abilitato",
        "l'AI voice agent selezionato risponde correttamente",
        "transfer, hangup, transcript, timing e dati dell'Inbound Call Record corrispondono al risultato atteso"
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Inbound Call Records",
        href: "/run-workflows/call-records",
        description: "Rivedi l'esito del test manuale quando la chiamata termina."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/inbound-ai/ai-inbound-routing",
        description: "Collega l'agente validato a una route inbound reale."
      }
    ]
  }
};

function usePhoneCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return phoneCopy[locale];
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

export function LocalizedPhoneTitle() {
  return <>{usePhoneCopy().title}</>;
}

export function LocalizedPhoneIntro() {
  const copy = usePhoneCopy();
  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="docs-screenshot-img" src={phoneScreenshotPath} alt={copy.screenshotAlt} loading="lazy" />
        </div>
      </figure>
    </section>
  );
}

export function LocalizedPhoneHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = usePhoneCopy();
  const labels: Record<HeadingKey, string> = {
    webRtc: copy.webRtc.title,
    agentTest: copy.agentTest.title,
    validation: copy.validation.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedPhoneWebRtc() {
  return <Section section={usePhoneCopy().webRtc} />;
}

export function LocalizedPhoneAgentTest() {
  return <Section section={usePhoneCopy().agentTest} />;
}

export function LocalizedPhoneValidation() {
  return <Section section={usePhoneCopy().validation} />;
}

export function LocalizedPhoneNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={usePhoneCopy().nextSteps} />
    </section>
  );
}
