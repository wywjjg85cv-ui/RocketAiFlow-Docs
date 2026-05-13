"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  codeBlocks?: {
    title: string;
    code: string;
  }[];
  items?: ReactNode[];
  callout?: ReactNode;
};

type LinkCard = {
  title: string;
  href: string;
  description: string;
};

type AsteriskPbxCopy = {
  title: string;
  intro: ReactNode[];
  howItWorks: SectionCopy;
  trunkConfig: SectionCopy;
  rocketAiFlowSetup: SectionCopy;
  test: SectionCopy;
  nextStepsTitle: string;
  nextSteps: LinkCard[];
};

type HeadingKey = "howItWorks" | "trunkConfig" | "rocketAiFlowSetup" | "test" | "nextSteps";

const integratedPbxPjsipConfig = `;=============== TRANSPORT SECTION
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0:5060
local_net=172.22.0.0/24
;=============== REGISTRATION (Register to Provider at raf-provider-asterisk:5060)
[providerPjsip_reg]
type=registration
transport=transport-udp
outbound_auth=providerPjsip_auth
server_uri=sip:raf-provider-asterisk:5060
client_uri=sip:providerPjsip@raf-provider-asterisk:5060
contact_user=providerPjsip
retry_interval=60
forbidden_retry_interval=600
expiration=3600
line=yes
endpoint=providerPjsip_end

;=============== ENDPOINT DEFINITION
[providerPjsip_end]
type=endpoint
transport=transport-udp
context=from-voip-provider
disallow=all
allow=ulaw
outbound_auth=providerPjsip_auth
aors=providerPjsip_aor
force_rport=no
direct_media=no
;from_user=providerPjsip
from_domain=raf-provider-asterisk
rewrite_contact=no
rtp_symmetric=no

;=============== AOR SECTION
[providerPjsip_aor]
type=aor
max_contacts=1
remove_existing=yes
contact=sip:raf-provider-asterisk:5060
qualify_frequency=3`;

const rocketAiFlowServerPjsipConfig = `;=============== TRANSPORT SECTION
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0:5060
local_net=172.22.0.0/24

; --- AOR used by the client's REGISTER requests ---
[providerPjsip]
type=aor
max_contacts=10

; --- AUTH: same credentials used by the client ---
#tryinclude "pjsip_auth.local.conf"

; --- ENDPOINT that receives calls from the client ---
[providerPjsip_end]
type=endpoint
context=from-sip      ; <--- Dialplan enters here
disallow=all
allow=ulaw
aors=providerPjsip
auth=providerPjsip_auth
direct_media=no
rewrite_contact=no
rtp_symmetric=no

; --- IDENTIFY: links the client IP to this endpoint ---
[providerPjsip_identify]
type=identify
endpoint=providerPjsip_end
match=raf-avr-asterisk          ; <--- Client IP (the one you see in Contact)

;=============== End of configuration file`;

function UiPill({ children }: { children: ReactNode }) {
  return <span className="docs-ui-pill">{children}</span>;
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="docs-code-block">
      <code>{children}</code>
    </pre>
  );
}

function InlineDocsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="docs-inline-link" href={href}>
      <span>{children}</span>
    </Link>
  );
}

const asteriskPbxCopy: Record<Locale, AsteriskPbxCopy> = {
  en: {
    title: "Asterisk-based PBX Systems",
    intro: [
      <><UiPill>Telephony</UiPill></>,
      "Transfer calls between RocketAiFlow and Asterisk-based PBX systems through a PJSIP trunk.",
      "Use this integration when your environment uses Asterisk, FreePBX, or another Asterisk-based PBX and you want RocketAiFlow agents to receive calls, place campaign calls, or hand calls off to human destinations."
    ],
    howItWorks: {
      title: "How call handoff works",
      paragraphs: [
        "RocketAiFlow uses the configured trunk as the telephony path between the AI agent and the PBX.",
        "During a call, the agent can keep the conversation, end the call, or call a transfer function when the customer needs a human destination."
      ],
      items: [
        "The call enters or leaves RocketAiFlow through the configured Asterisk/PJSIP trunk.",
        "The AI voice agent handles the conversation and decides whether a handoff is needed based on the prompt and enabled functions.",
        <><code>transfer</code>, <code>transfer_call</code>, or <code>transfer_to_service</code> sends the destination extension, number, or service selected by the workflow.</>,
        <>Asterisk routes the destination using the configured context. If no custom transfer context is selected in the function, RocketAiFlow uses the default context <code>raf-internal</code>.</>,
        "After the test, validate the call in Call Records and check the trunk state in monitoring."
      ]
    },
    trunkConfig: {
      title: "PJSIP configuration on both servers",
      paragraphs: [
        "This integration uses two complementary PJSIP configurations.",
        <>Place these blocks in the Asterisk PJSIP configuration, usually <code>/etc/asterisk/pjsip.conf</code>, or in a file included by <code>pjsip.conf</code>. On FreePBX-based systems, use the custom PJSIP include file required by your installation instead of editing generated files directly.</>,
        "Install the first configuration on the Asterisk-based PBX you want to integrate. It registers that PBX toward the RocketAiFlow SIP endpoint.",
        "Install the second configuration on the RocketAiFlow/Asterisk server. It accepts registration and calls from the integrated PBX and binds them to the correct endpoint."
      ],
      codeBlocks: [
        {
          title: "Server PBX to integrate",
          code: integratedPbxPjsipConfig
        },
        {
          title: "RocketAiFlow server",
          code: rocketAiFlowServerPjsipConfig
        }
      ],
      callout: (
        <>
          Both sides must use matching credentials for <code>providerPjsip_auth</code>. The IP or host in
          <code>match</code> must identify the PBX that registers or sends calls to RocketAiFlow.
        </>
      )
    },
    rocketAiFlowSetup: {
      title: "Set up the integration in RocketAiFlow",
      paragraphs: [
        "Once the Asterisk trunk is registered, connect it to the RocketAiFlow workflow you want to test."
      ],
      items: [
        <>Create or update the trunk and keep registration enabled when the trunk must receive inbound calls.</>,
        <>Create the AI voice agent in <UiPill>AI Voice Agent</UiPill> and configure Voice, LLM, prompt, transcription, and Agent settings.</>,
        <>Attach the transfer function you need. Use <code>transfer_call</code> for a known extension or number, or <code>transfer_to_service</code> when the caller asks for a supported department.</>,
        <>For inbound, go to <UiPill>Inbound Ai</UiPill>, select <UiPill>AI Inbound Routing</UiPill>, press <UiPill>Add Inbound</UiPill>, then select the Asterisk trunk, the agent, and the concurrent call limit.</>,
        <>For outbound, go to <UiPill>AI Dialer Flows</UiPill>, select <UiPill>Dialer Campaigns</UiPill>, press <UiPill>Add Campaigns</UiPill>, then select the Asterisk trunk, the agent, and a first contact for testing.</>
      ]
    },
    test: {
      title: "Test the integration",
      paragraphs: [
        "Start with one controlled test before widening the routing or campaign scope."
      ],
      items: [
        "Confirm the trunk is registered before the test.",
        "For inbound, call the number routed through the Asterisk trunk and confirm the agent answers.",
        "For outbound, start a campaign with one contact and Concurrent Call Capacity set to 1.",
        "Ask the agent to transfer to a human destination or supported department.",
        "Confirm that Asterisk receives and routes the destination correctly.",
        "Review Call Records, transcript, timing, final status, and trunk monitoring after the call."
      ]
    },
    nextStepsTitle: "Next Steps",
    nextSteps: [
      {
        title: "Trunk Configuration",
        href: "/deploy/trunk-configuration",
        description: "Review the RocketAiFlow trunk setup that must be ready before routing or campaigns."
      },
      {
        title: "Configure Agent Functions",
        href: "/build/add-functions#transfer",
        description: "Configure transfer functions, extension parameters, services, and transfer context."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/ai-inbound-routing",
        description: "Connect the registered trunk and agent to the inbound route."
      }
    ]
  },
  it: {
    title: "Asterisk-based PBX Systems",
    intro: [
      <><UiPill>Telephony</UiPill></>,
      "Trasferisci chiamate tra RocketAiFlow e sistemi PBX basati su Asterisk tramite trunk PJSIP.",
      "Usa questa integrazione quando il tuo ambiente usa Asterisk, FreePBX o un PBX basato su Asterisk e vuoi far ricevere chiamate agli agenti RocketAiFlow, avviare campagne outbound o trasferire chiamate verso destinazioni umane."
    ],
    howItWorks: {
      title: "Come funziona l'handoff della chiamata",
      paragraphs: [
        "RocketAiFlow usa il trunk configurato come percorso telefonico tra agente AI e PBX.",
        "Durante la chiamata, l'agente può continuare la conversazione, terminare la chiamata o chiamare una function di transfer quando il cliente deve parlare con una destinazione umana."
      ],
      items: [
        "La chiamata entra o esce da RocketAiFlow attraverso il trunk Asterisk/PJSIP configurato.",
        "L'AI voice agent gestisce la conversazione e decide se serve un handoff in base al prompt e alle functions abilitate.",
        <><code>transfer</code>, <code>transfer_call</code> o <code>transfer_to_service</code> invia la destinazione, l'interno o il servizio scelto dal workflow.</>,
        <>Asterisk instrada la destinazione usando il contesto configurato. Se nella function non selezioni un contesto custom, RocketAiFlow usa il contesto di default <code>raf-internal</code>.</>,
        "Dopo il test, valida la chiamata nei Call Records e controlla lo stato del trunk nel monitoring."
      ]
    },
    trunkConfig: {
      title: "Configurazione PJSIP sui due server",
      paragraphs: [
        "Questa integrazione usa due configurazioni PJSIP complementari.",
        <>Inserisci questi blocchi nella configurazione PJSIP di Asterisk, di solito <code>/etc/asterisk/pjsip.conf</code>, oppure in un file incluso da <code>pjsip.conf</code>. Su sistemi basati su FreePBX, usa il file custom PJSIP previsto dalla tua installazione invece di modificare direttamente i file generati.</>,
        "La prima configurazione va installata sul PBX basato su Asterisk che vuoi integrare. Registra quel PBX verso l'endpoint SIP RocketAiFlow.",
        "La seconda configurazione va installata sul server RocketAiFlow/Asterisk. Accetta registration e chiamate dal PBX integrato e le collega all'endpoint corretto."
      ],
      codeBlocks: [
        {
          title: "Server PBX da integrare",
          code: integratedPbxPjsipConfig
        },
        {
          title: "Server RocketAiFlow",
          code: rocketAiFlowServerPjsipConfig
        }
      ],
      callout: (
        <>
          Le credenziali di <code>providerPjsip_auth</code> devono combaciare sui due lati. Il valore
          <code>match</code> deve identificare IP o host del PBX che si registra o invia chiamate a RocketAiFlow.
        </>
      )
    },
    rocketAiFlowSetup: {
      title: "Configura l'integrazione in RocketAiFlow",
      paragraphs: [
        "Quando il trunk Asterisk risulta registrato, collegalo al workflow RocketAiFlow che vuoi testare."
      ],
      items: [
        <>Crea o aggiorna il trunk e lascia la registration abilitata quando il trunk deve ricevere chiamate inbound.</>,
        <>Crea l'AI voice agent in <UiPill>AI Voice Agent</UiPill> e configura Voice, LLM, prompt, transcription e Agent settings.</>,
        <>Collega la function di transfer che ti serve. Usa <code>transfer_call</code> per un interno o numero noto, oppure <code>transfer_to_service</code> quando il chiamante chiede un reparto supportato.</>,
        <>Per l'inbound, vai in <UiPill>Inbound Ai</UiPill>, seleziona <UiPill>AI Inbound Routing</UiPill>, premi <UiPill>Add Inbound</UiPill>, poi seleziona trunk Asterisk, agente e limite di chiamate concorrenti.</>,
        <>Per l'outbound, vai in <UiPill>AI Dialer Flows</UiPill>, seleziona <UiPill>Dialer Campaigns</UiPill>, premi <UiPill>Add Campaigns</UiPill>, poi seleziona trunk Asterisk, agente e un primo contatto di test.</>
      ]
    },
    test: {
      title: "Testa l'integrazione",
      paragraphs: [
        "Parti da un test controllato prima di allargare route o campagna."
      ],
      items: [
        "Conferma che il trunk sia registrato prima del test.",
        "Per l'inbound, chiama il numero instradato attraverso il trunk Asterisk e verifica che l'agente risponda.",
        "Per l'outbound, avvia una campagna con un contatto e Concurrent Call Capacity impostato a 1.",
        "Chiedi all'agente di trasferire verso una destinazione umana o un reparto supportato.",
        "Conferma che Asterisk riceva e instradi correttamente la destinazione.",
        "Rivedi Call Records, transcript, timing, stato finale e monitoring trunk dopo la chiamata."
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Configurazione trunk",
        href: "/deploy/trunk-configuration",
        description: "Rivedi il setup trunk RocketAiFlow che deve essere pronto prima di routing o campagne."
      },
      {
        title: "Configura le functions",
        href: "/build/add-functions#transfer",
        description: "Configura transfer functions, parametri exten, servizi e contesto di transfer."
      },
      {
        title: "AI Inbound Routing",
        href: "/run-workflows/ai-inbound-routing",
        description: "Collega trunk registrato e agente alla route inbound."
      }
    ]
  }
};

function useAsteriskPbxCopy() {
  const locale = useCurrentLocale(defaultLocale);
  return asteriskPbxCopy[locale];
}

function Section({ section }: { section: SectionCopy }) {
  return (
    <section className="docs-home-section">
      {section.paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {section.codeBlocks
        ? section.codeBlocks.map((codeBlock) => (
            <div key={codeBlock.title}>
              <p>
                <strong>{codeBlock.title}</strong>
              </p>
              <CodeBlock>{codeBlock.code}</CodeBlock>
            </div>
          ))
        : null}
      {section.items ? (
        <ol>
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
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

export function LocalizedAsteriskPbxTitle() {
  return <>{useAsteriskPbxCopy().title}</>;
}

export function LocalizedAsteriskPbxHeading({ labelKey }: { labelKey: HeadingKey }) {
  const copy = useAsteriskPbxCopy();
  const labels: Record<HeadingKey, string> = {
    howItWorks: copy.howItWorks.title,
    trunkConfig: copy.trunkConfig.title,
    rocketAiFlowSetup: copy.rocketAiFlowSetup.title,
    test: copy.test.title,
    nextSteps: copy.nextStepsTitle
  };

  return <>{labels[labelKey]}</>;
}

export function LocalizedAsteriskPbxIntro() {
  const copy = useAsteriskPbxCopy();
  return (
    <section className="docs-home-section">
      {copy.intro.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export function LocalizedAsteriskPbxHowItWorks() {
  return <Section section={useAsteriskPbxCopy().howItWorks} />;
}

export function LocalizedAsteriskPbxTrunkConfig() {
  return <Section section={useAsteriskPbxCopy().trunkConfig} />;
}

export function LocalizedAsteriskPbxRocketAiFlowSetup() {
  return <Section section={useAsteriskPbxCopy().rocketAiFlowSetup} />;
}

export function LocalizedAsteriskPbxTest() {
  return <Section section={useAsteriskPbxCopy().test} />;
}

export function LocalizedAsteriskPbxNextSteps() {
  return (
    <section className="docs-home-section">
      <CardGrid cards={useAsteriskPbxCopy().nextSteps} />
      <p>
        <InlineDocsLink href="/troubleshoot/troubleshooting">
          {useCurrentLocale(defaultLocale) === "it" ? "Apri troubleshooting" : "Open troubleshooting"}
        </InlineDocsLink>
      </p>
    </section>
  );
}
