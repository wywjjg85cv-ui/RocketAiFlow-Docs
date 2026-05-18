"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

type SectionCopy = {
  title: string;
  paragraphs: ReactNode[];
  screenshot?: {
    src: string;
    alt: string;
    caption?: string;
  };
  screenshots?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
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

const providerPjsipServerUriScreenshot = "/screenshots/docs/providerpjsip-server-uri.png";
const aiInboundRoutingProviderPjsipScreenshot = "/screenshots/docs/ai-inbound-routing-providerpjsip.png";
const transferFunctionContextScreenshot = "/screenshots/docs/transfer-function-raf-providerpjsip-context.png";

const asteriskPbxServerPjsipConfig = `;=============== TRANSPORT SECTION
[transport-udp]
type=transport
protocol=udp
bind=0.0.0.0:5060
local_net=172.22.0.0/24      ; <--- Replace with your PBX local network

; --- AOR used by RocketAiFlow REGISTER requests ---
[providerPjsip_aor]
type=aor
contact=sip:10.0.0.10:5060      ; <--- Replace with the RocketAiFlow server IP address
qualify_frequency=3

; --- AUTH: same credentials used by RocketAiFlow ---
[providerPjsip_auth]
type=auth
auth_type=userpass
username=providerPjsip
password=CHANGE_ME_PROVIDER_PJSIP_PASSWORD      ; <--- Replace with the RocketAiFlow trunk password

; --- ENDPOINT that receives calls from RocketAiFlow ---
[providerPjsip]
type=endpoint
transport=transport-udp
context=from-rocketaiflow      ; <--- Dialplan context where calls from RocketAiFlow enter
disallow=all
allow=ulaw
aors=providerPjsip_aor
outbound_auth=providerPjsip_auth
auth=providerPjsip_auth
force_rport=no
direct_media=no
from_user=providerPjsip
from_domain=10.0.0.10      ; <--- Replace with the RocketAiFlow server IP address
rewrite_contact=no
rtp_symmetric=no

; --- IDENTIFY: links the RocketAiFlow IP or host to this endpoint ---
[providerPjsip_identify]
type=identify
endpoint=providerPjsip
match=10.0.0.10          ; <--- Replace with the RocketAiFlow server IP address

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
      "This integration was built using a static PJSIP trunk between Asterisk and the remote provider/PBX.",
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
      title: "PJSIP configuration and RocketAiFlow trunk",
      paragraphs: [
        "Install this configuration on the Asterisk PBX server you want to integrate.",
        <>Place the block in the Asterisk PJSIP configuration, usually <code>/etc/asterisk/pjsip.conf</code>, or in a file included by <code>pjsip.conf</code>. On FreePBX-based systems, use the custom PJSIP include file required by your installation instead of editing generated files directly.</>,
        <>On the RocketAiFlow side, a default trunk named <code>providerPjsip</code> is already prepared. Before enabling it, set the correct IP address of your Asterisk/PBX server, then replace the default password with the password used in this PBX configuration.</>,
        "The PBX configuration defines transport, AOR, auth, endpoint, and identify rules for RocketAiFlow, which registers or sends calls to that PBX."
      ],
      screenshot: {
        src: providerPjsipServerUriScreenshot,
        alt: "RocketAiFlow providerPjsip trunk configuration showing the Server URI field where the Asterisk PBX server IP is configured.",
        caption: "In the providerPjsip trunk, set your Asterisk/PBX server IP in Server URI before enabling the trunk."
      },
      codeBlocks: [
        {
          title: "Asterisk PBX server",
          code: asteriskPbxServerPjsipConfig
        }
      ]
    },
    rocketAiFlowSetup: {
      title: "Set up the integration in RocketAiFlow",
      paragraphs: [
        <>After enabling the default <code>providerPjsip</code> trunk, configure the RocketAiFlow workflow based on the direction you want to test.</>,
        <>For inbound, go to <UiPill>Inbound Ai</UiPill>, open <UiPill>AI Inbound Routing</UiPill>, select the <code>providerPjsip</code> trunk and choose the agent. Every call that arrives on extension <code>providerPjsip</code> and context <code>raf-from-voip-provider</code> is handled by the selected agent.</>,
        <>For outbound, go to <UiPill>AI Dialer Flows</UiPill>, open <UiPill>Dialer Campaigns</UiPill> and choose the trunk based on where calls should go. Select <code>providerPjsip</code> if outbound calls must reach your PBX; every number dialed by that campaign lands on the PBX side in the <code>from-rocketaiflow</code> context. Otherwise, select another trunk registered in RocketAiFlow to place calls through the RocketAiFlow system.</>,
        <>When creating transfer functions, select the <code>raf-providerPjsip</code> context. This makes RocketAiFlow dial through the configured trunk, so transferred numbers also land on the PBX side in the <code>from-rocketaiflow</code> context.</>
      ],
      screenshot: {
        src: aiInboundRoutingProviderPjsipScreenshot,
        alt: "AI Inbound Routing configuration selecting the providerPjsip trunk and the agent that handles inbound calls.",
        caption: "In AI Inbound Routing, select providerPjsip and the agent that must handle calls arriving from the PBX."
      },
      screenshots: [
        {
          src: transferFunctionContextScreenshot,
          alt: "Transfer function configuration showing the raf-providerPjsip context selection.",
          caption: "In transfer functions, select raf-providerPjsip as the context so transfers dial through the providerPjsip trunk."
        }
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
        title: "Deployment Overview",
        href: "/deploy/deployment-overview",
        description: "Review how trunk setup fits the selected inbound or outbound deploy path."
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
    title: "Sistemi PBX basati su Asterisk",
    intro: [
      <><UiPill>Telefonia</UiPill></>,
      "Trasferisci chiamate tra RocketAiFlow e sistemi PBX basati su Asterisk tramite trunk PJSIP.",
      "L'integrazione è stata realizzata usando un trunk PJSIP statico tra Asterisk e il provider/PBX remoto.",
      "Usa questa integrazione quando il tuo ambiente usa Asterisk, FreePBX o un PBX basato su Asterisk e vuoi far ricevere chiamate agli agenti RocketAiFlow, avviare campagne outbound o trasferire chiamate verso destinazioni umane."
    ],
    howItWorks: {
      title: "Come funziona il trasferimento della chiamata",
      paragraphs: [
        "RocketAiFlow usa il trunk configurato come percorso telefonico tra agente AI e PBX.",
        "Durante la chiamata, l'agente può continuare la conversazione, terminare la chiamata o chiamare una function di transfer quando il cliente deve parlare con una destinazione umana."
      ],
      items: [
        "La chiamata entra o esce da RocketAiFlow attraverso il trunk Asterisk/PJSIP configurato.",
        "L'AI voice agent gestisce la conversazione e decide se serve un trasferimento in base al prompt e alle functions abilitate.",
        <><code>transfer</code>, <code>transfer_call</code> o <code>transfer_to_service</code> invia la destinazione, l'interno o il servizio scelto dal workflow.</>,
        <>Asterisk instrada la destinazione usando il contesto configurato. Se nella function non selezioni un contesto custom, RocketAiFlow usa il contesto di default <code>raf-internal</code>.</>,
        "Dopo il test, valida la chiamata nel Registro chiamate e controlla lo stato del trunk nel monitoring."
      ]
    },
    trunkConfig: {
      title: "Configurazione PJSIP e trunk RocketAiFlow",
      paragraphs: [
        "Installa questa configurazione sul server PBX Asterisk che vuoi integrare.",
        <>Inserisci il blocco nella configurazione PJSIP di Asterisk, di solito <code>/etc/asterisk/pjsip.conf</code>, oppure in un file incluso da <code>pjsip.conf</code>. Su sistemi basati su FreePBX, usa il file custom PJSIP previsto dalla tua installazione invece di modificare direttamente i file generati.</>,
        <>Sul lato RocketAiFlow abbiamo già predisposto un trunk di default chiamato <code>providerPjsip</code>. Prima di abilitarlo, inserisci l'IP corretto del tuo server Asterisk/PBX, poi cambia la password con quella usata in questa configurazione PBX.</>,
        "La configurazione PBX definisce transport, AOR, auth, endpoint e identify per RocketAiFlow, che si registra o invia chiamate a quel PBX."
      ],
      screenshot: {
        src: providerPjsipServerUriScreenshot,
        alt: "Configurazione trunk providerPjsip in RocketAiFlow con il campo Server URI dove inserire l'IP del server Asterisk PBX.",
        caption: "Nel trunk providerPjsip, inserisci l'IP del tuo server Asterisk/PBX nel campo Server URI prima di abilitare il trunk."
      },
      codeBlocks: [
        {
          title: "Server PBX Asterisk",
          code: asteriskPbxServerPjsipConfig
        }
      ]
    },
    rocketAiFlowSetup: {
      title: "Configura l'integrazione in RocketAiFlow",
      paragraphs: [
        <>Dopo aver abilitato il trunk di default <code>providerPjsip</code>, configura il workflow RocketAiFlow in base alla direzione che vuoi testare.</>,
        <>Per l'inbound, vai in <UiPill>Inbound Ai</UiPill>, apri <UiPill>AI Inbound Routing</UiPill>, seleziona il trunk <code>providerPjsip</code> e scegli l'agente. Tutte le chiamate che arrivano verso l'exten <code>providerPjsip</code> e il contesto <code>raf-from-voip-provider</code> vengono gestite dall'agente selezionato.</>,
        <>Per l'outbound, vai in <UiPill>AI Dialer Flows</UiPill>, apri <UiPill>Dialer Campaigns</UiPill> e scegli il trunk in base a dove devono arrivare le chiamate. Se vuoi farle arrivare nel tuo PBX, seleziona <code>providerPjsip</code>: tutti i numeri chiamati da quella campagna finiscono lato PBX nel contesto <code>from-rocketaiflow</code>. Altrimenti puoi selezionare un altro trunk registrato in RocketAiFlow per far uscire le chiamate dal sistema RocketAiFlow.</>,
        <>Quando crei le funzioni di transfer, scegli il contesto <code>raf-providerPjsip</code>. In questo modo RocketAiFlow fa la dial usando il trunk configurato e anche i numeri trasferiti finiscono lato PBX nel contesto <code>from-rocketaiflow</code>.</>
      ],
      screenshot: {
        src: aiInboundRoutingProviderPjsipScreenshot,
        alt: "Configurazione AI Inbound Routing con selezione del trunk providerPjsip e dell'agente che gestisce le chiamate inbound.",
        caption: "In AI Inbound Routing, seleziona providerPjsip e l'agente che deve gestire le chiamate in arrivo dal PBX."
      },
      screenshots: [
        {
          src: transferFunctionContextScreenshot,
          alt: "Configurazione function di transfer con selezione del contesto raf-providerPjsip.",
          caption: "Nelle funzioni di transfer, seleziona raf-providerPjsip come contesto per far usare il trunk providerPjsip alle trasferte."
        }
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
        "Rivedi Registro chiamate, transcript, timing, stato finale e monitoring trunk dopo la chiamata."
      ]
    },
    nextStepsTitle: "Passaggi successivi",
    nextSteps: [
      {
        title: "Panoramica deploy",
        href: "/deploy/deployment-overview",
        description: "Rivedi come il setup trunk entra nel percorso deploy inbound o outbound scelto."
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
      {section.screenshot ? (
        <figure className="docs-screenshot">
          <div className="docs-screenshot-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="docs-screenshot-img" src={section.screenshot.src} alt={section.screenshot.alt} loading="lazy" />
          </div>
          {section.screenshot.caption ? <figcaption className="docs-screenshot-caption">{section.screenshot.caption}</figcaption> : null}
        </figure>
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
        <p key={index} className={index === 0 ? "docs-intro-badge-row" : undefined}>
          {paragraph}
        </p>
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
