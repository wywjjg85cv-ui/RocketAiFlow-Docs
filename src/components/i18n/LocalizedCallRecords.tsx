"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useCurrentLocale } from "../../i18n/client-locale";
import { localizeHref } from "../../i18n/docs-routes";
import { defaultLocale, type Locale } from "../../i18n/routing";

type SectionKey = "firstCheck" | "operationalUse" | "recordings" | "timing" | "reviewHabit" | "signals" | "nextSteps";

type SectionCopy = {
  title: string;
  paragraphs?: ReactNode[];
  items?: ReactNode[];
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type CallRecordsCopy = {
  title: string;
  intro: ReactNode[];
  headings: Record<SectionKey, string>;
  sections: Record<Exclude<SectionKey, "nextSteps">, SectionCopy>;
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  nextSteps: LinkCard[];
};

const callRecordsCopy: Record<Locale, CallRecordsCopy> = {
  en: {
    title: "Call Records",
    intro: [
      "Call Records is the validation surface after testing or running real calls.",
      "Use it to confirm whether the route, campaign, agent, trunk, transcript, recording state, and timing match the expected workflow."
    ],
    headings: {
      firstCheck: "What to check first",
      operationalUse: "How to use Call Records operationally",
      recordings: "Review recordings and transcripts when available",
      timing: "Use timing metrics, not just outcomes",
      reviewHabit: "Review habit",
      signals: "Common signals to watch",
      nextSteps: "Next steps"
    },
    sections: {
      firstCheck: {
        title: "What to check first",
        paragraphs: ["After a call, review the fields that explain the result before changing configuration."],
        items: ["call status", "timestamps", "outcome", "transcript or recording data when available", "talk time and ring time"]
      },
      operationalUse: {
        title: "How to use Call Records operationally",
        paragraphs: ["Call Records helps answer practical questions during review."],
        items: [
          "did the call start and end as expected",
          "did the correct route or campaign run",
          "did the conversation lead to transfer, hangup, or another intended outcome",
          "do prompt, routing, contacts, or trunk configuration need review"
        ]
      },
      recordings: {
        title: "Review recordings and transcripts when available",
        paragraphs: [
          "Use transcripts to confirm whether the agent stayed on task and reached the intended business outcome.",
          "Use recordings for deeper review only where that is operationally and legally appropriate."
        ]
      },
      timing: {
        title: "Use timing metrics, not just outcomes",
        paragraphs: ["Outcomes alone do not explain how the interaction behaved. Talk time and ring time help identify pacing, telephony, and workflow issues."],
        items: [
          "calls ending too early",
          "contacts taking longer to answer",
          "pacing changes affecting conversation quality",
          "one campaign behaving differently from another"
        ]
      },
      reviewHabit: {
        title: "Review habit",
        paragraphs: ["Review call records after controlled changes. It is easier to connect a result to a specific change when prompt, routing, campaign settings, and trunk configuration are not changed together."]
      },
      signals: {
        title: "Common signals to watch",
        items: [
          "repeated failed calls",
          "missing expected outcomes",
          "transfer attempts that do not complete",
          "unexpected timing or abrupt call endings",
          "transcripts showing the agent drifting away from the intended workflow",
          "recordings confirming audio or execution problems when enabled"
        ]
      }
    },
    screenshot: {
      src: "/screenshots/docs/call-review-timing-status.png",
      alt: "RocketAiFlow call review screen showing timing, status, and cause details.",
      caption: "The detailed call review surface helps teams validate outcome, timing, and final state before changing prompts, campaigns, or telephony settings."
    },
    nextSteps: [
      {
        title: "Call History and Review",
        href: "/run-workflows/call-history-and-review",
        description: "Review completed calls in more detail through call history, transcripts, recordings, and timing metrics."
      },
      {
        title: "Troubleshooting",
        href: "/troubleshoot/troubleshooting",
        description: "Use troubleshooting when call records show an unexpected result."
      },
      {
        title: "Phone",
        href: "/run-workflows/phone",
        description: "Run another controlled test from Phone after adjusting the configuration."
      }
    ]
  },
  it: {
    title: "Registro chiamate",
    intro: [
      "Il Registro chiamate è la superficie di validazione dopo i test o dopo l'esecuzione di chiamate reali.",
      "Usalo per confermare che route, campagna, agente, trunk, transcript, stato registrazione e timing corrispondano al workflow atteso."
    ],
    headings: {
      firstCheck: "Cosa controllare per primo",
      operationalUse: "Come usare il Registro chiamate",
      recordings: "Rivedi registrazioni e transcript quando disponibili",
      timing: "Usa le metriche di timing, non solo gli outcome",
      reviewHabit: "Abitudine di review",
      signals: "Segnali comuni da controllare",
      nextSteps: "Prossimi passi"
    },
    sections: {
      firstCheck: {
        title: "Cosa controllare per primo",
        paragraphs: ["Dopo una chiamata, rivedi i campi che spiegano il risultato prima di cambiare configurazione."],
        items: ["stato chiamata", "timestamp", "outcome", "transcript o registrazione quando disponibili", "talk time e ring time"]
      },
      operationalUse: {
        title: "Come usare il Registro chiamate",
        paragraphs: ["Il Registro chiamate aiuta a rispondere a domande pratiche durante la review."],
        items: [
          "la chiamata è partita e terminata come previsto",
          "la route o la campagna corretta è stata eseguita",
          "la conversazione ha portato a transfer, hangup o altro outcome previsto",
          "prompt, routing, contatti o configurazione trunk devono essere rivisti"
        ]
      },
      recordings: {
        title: "Rivedi registrazioni e transcript quando disponibili",
        paragraphs: [
          "Usa i transcript per confermare se l'agente è rimasto sul task e ha raggiunto l'outcome di business previsto.",
          "Usa le registrazioni per una review più profonda solo quando è appropriato dal punto di vista operativo e legale."
        ]
      },
      timing: {
        title: "Usa le metriche di timing, non solo gli outcome",
        paragraphs: ["Gli outcome da soli non spiegano come si è comportata l'interazione. Talk time e ring time aiutano a individuare problemi di pacing, telefonia e workflow."],
        items: [
          "chiamate che terminano troppo presto",
          "contatti che impiegano più tempo a rispondere",
          "modifiche di pacing che influenzano la qualità della conversazione",
          "una campagna che si comporta diversamente da un'altra"
        ]
      },
      reviewHabit: {
        title: "Abitudine di review",
        paragraphs: ["Rivedi il registro chiamate dopo modifiche controllate. È più facile collegare un risultato a una modifica specifica quando prompt, routing, impostazioni campagna e configurazione trunk non vengono cambiati insieme."]
      },
      signals: {
        title: "Segnali comuni da controllare",
        items: [
          "chiamate fallite ripetute",
          "outcome attesi mancanti",
          "tentativi di transfer che non completano",
          "timing inatteso o chiusure improvvise",
          "transcript che mostrano l'agente fuori dal workflow previsto",
          "registrazioni che confermano problemi audio o di esecuzione quando abilitate"
        ]
      }
    },
    screenshot: {
      src: "/screenshots/docs/call-review-timing-status.png",
      alt: "Schermata RocketAiFlow di review chiamata con timing, stato e dettagli causa.",
      caption: "La review dettagliata della chiamata aiuta a validare outcome, timing e stato finale prima di modificare prompt, campagne o impostazioni telefoniche."
    },
    nextSteps: [
      {
        title: "Storico e revisione chiamate",
        href: "/run-workflows/call-history-and-review",
        description: "Rivedi le chiamate completate attraverso storico, transcript, registrazioni e metriche di timing."
      },
      {
        title: "Diagnostica",
        href: "/troubleshoot/troubleshooting",
        description: "Usa la diagnostica quando il registro chiamate mostra un risultato inatteso."
      },
      {
        title: "Phone",
        href: "/run-workflows/phone",
        description: "Esegui un altro test controllato da Phone dopo aver modificato la configurazione."
      }
    ]
  }
};

function useCallRecordsCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return { copy: callRecordsCopy[locale], locale };
}

export function LocalizedCallRecordsTitle() {
  return useCallRecordsCopy().copy.title;
}

export function LocalizedCallRecordsIntro() {
  const { copy } = useCallRecordsCopy();

  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedCallRecordsHeading({ sectionKey }: { sectionKey: SectionKey }) {
  return useCallRecordsCopy().copy.headings[sectionKey];
}

export function LocalizedCallRecordsSection({ sectionKey }: { sectionKey: Exclude<SectionKey, "nextSteps"> }) {
  const { copy } = useCallRecordsCopy();
  const section = copy.sections[sectionKey];

  return (
    <section className="docs-home-section">
      {section.paragraphs?.map((paragraph, index) => (
        <p key={`p-${index}`}>{paragraph}</p>
      ))}
      {section.items ? (
        <ul>
          {section.items.map((item, index) => (
            <li key={`item-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export function LocalizedCallRecordsScreenshot() {
  const { copy } = useCallRecordsCopy();
  const screenshot = copy.screenshot;

  return (
    <section className="docs-home-section">
      <figure className="docs-screenshot">
        <div className="docs-screenshot-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="docs-screenshot-img" src={screenshot.src} alt={screenshot.alt} loading="lazy" />
        </div>
        <figcaption className="docs-screenshot-caption">{screenshot.caption}</figcaption>
      </figure>
    </section>
  );
}

export function LocalizedCallRecordsNextSteps() {
  const { copy, locale } = useCallRecordsCopy();

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
