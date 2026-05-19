import {
  docsHomePath,
  docsRouteByCanonical,
  getLocalizedPath,
  normalizePathname,
  pathToSegments
} from "./docs-routes";
import type { Locale } from "./routing";

export type DocsBreadcrumbItem = {
  canonicalPath: string;
  href: string;
  label: string;
};

type BreadcrumbLabels = {
  docsRoot: string;
  sections: Record<string, string>;
  pages: Record<string, string>;
};

const sectionDefaultCanonicalPath: Record<string, string> = {
  "get-started": "/get-started/introduction",
  build: "/build/create-your-first-ai-voice-agent",
  "run-workflows": "/run-workflows/ai-dialer-flows",
  integrations: "/integrations",
  deploy: "/deploy/deployment-overview",
  monitoring: "/monitoring/monitoring-and-visibility",
  troubleshoot: "/troubleshoot/troubleshooting",
  legal: "/legal",
  reference: "/reference/api-reference"
};

const breadcrumbLabels: Record<Locale, BreadcrumbLabels> = {
  en: {
    docsRoot: "Documentation",
    sections: {
      "get-started": "Get Started",
      build: "Build",
      "run-workflows": "Run Workflows",
      integrations: "Integrations",
      deploy: "Deploy",
      monitoring: "Monitoring",
      troubleshoot: "Troubleshoot",
      legal: "Legal",
      reference: "Reference"
    },
    pages: {
      "/get-started/introduction": "Introduction",
      "/get-started/quickstart": "Quickstart",
      "/build/create-your-first-ai-voice-agent": "Create Your First AI Voice Agent",
      "/build/configure-agent-prompt": "Configure Agent Prompt",
      "/build/add-functions": "Configure Agent Functions",
      "/build/dynamic-parameters": "Dynamic Parameters",
      "/run-workflows/inbound-ai/ai-inbound-routing": "AI Inbound Routing",
      "/run-workflows/ai-dialer-flows": "AI Dialer Flows",
      "/run-workflows/ai-dialer-flows/contacts": "Campaign Contacts",
      "/run-workflows/import-contacts": "Import Contacts",
      "/run-workflows/inbound-ai/contact-inbounds": "Contact Inbounds",
      "/run-workflows/call-records": "Call Records",
      "/run-workflows/processed-contacts": "Processed Contacts",
      "/run-workflows/phone": "Phone",
      "/integrations": "Integrations",
      "/integrations/telephony": "Telephony",
      "/integrations/telephony/asterisk-based-pbx-systems": "Asterisk-based PBX Systems",
      "/deploy/deployment-overview": "Deployment Overview",
      "/monitoring/monitoring-and-visibility": "Monitoring and Visibility",
      "/monitoring/pre-provisioned-dashboards": "Pre-Provisioned Dashboards",
      "/monitoring/dialer-dashboard-panels": "Dialer Dashboard Panels",
      "/monitoring/logs-and-traces": "Logs and Traces",
      "/troubleshoot/troubleshooting": "Troubleshooting",
      "/troubleshoot/faq": "FAQ",
      "/legal": "Legal Status",
      "/legal/terms-and-commercial-model": "Pilot Terms",
      "/legal/privacy-and-data-protection": "Data Protection",
      "/legal/ai-transparency": "AI Transparency",
      "/legal/security-and-trust": "Security",
      "/legal/imprint": "Company Notice",
      "/reference/api-reference": "API Reference",
      "/reference/changelog": "Changelog"
    }
  },
  it: {
    docsRoot: "Documentazione",
    sections: {
      "get-started": "Per iniziare",
      build: "Costruisci",
      "run-workflows": "Esegui workflow",
      integrations: "Integrazioni",
      deploy: "Deploy",
      monitoring: "Monitoraggio",
      troubleshoot: "Risoluzione problemi",
      legal: "Legal",
      reference: "Riferimenti"
    },
    pages: {
      "/get-started/introduction": "Introduzione",
      "/get-started/quickstart": "Quickstart",
      "/build/create-your-first-ai-voice-agent": "Crea il primo AI Voice Agent",
      "/build/configure-agent-prompt": "Configura il prompt",
      "/build/add-functions": "Configura le functions",
      "/build/dynamic-parameters": "Parametri dinamici",
      "/run-workflows/inbound-ai/ai-inbound-routing": "AI Inbound Routing",
      "/run-workflows/ai-dialer-flows": "AI Dialer Flows",
      "/run-workflows/ai-dialer-flows/contacts": "Contatti campagna",
      "/run-workflows/import-contacts": "Importa contatti",
      "/run-workflows/inbound-ai/contact-inbounds": "Contatti inbound",
      "/run-workflows/call-records": "Registro chiamate",
      "/run-workflows/processed-contacts": "Contatti elaborati",
      "/run-workflows/phone": "Phone",
      "/integrations": "Integrazioni",
      "/integrations/telephony": "Telefonia",
      "/integrations/telephony/asterisk-based-pbx-systems": "Sistemi PBX basati su Asterisk",
      "/deploy/deployment-overview": "Panoramica deploy",
      "/monitoring/monitoring-and-visibility": "Monitoring e visibilità",
      "/monitoring/pre-provisioned-dashboards": "Dashboard preconfigurate",
      "/monitoring/dialer-dashboard-panels": "Pannelli Dashboard Dialer",
      "/monitoring/logs-and-traces": "Log e trace",
      "/troubleshoot/troubleshooting": "Diagnostica",
      "/troubleshoot/faq": "FAQ",
      "/legal": "Stato legale",
      "/legal/terms-and-commercial-model": "Termini pilot",
      "/legal/privacy-and-data-protection": "Protezione dati",
      "/legal/ai-transparency": "Trasparenza AI",
      "/legal/security-and-trust": "Sicurezza",
      "/legal/imprint": "Note legali",
      "/reference/api-reference": "Riferimento API",
      "/reference/changelog": "Changelog"
    }
  }
};

function titleizeSegment(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLabel(canonicalPath: string, locale: Locale) {
  const normalized = normalizePathname(canonicalPath);
  const labels = breadcrumbLabels[locale];
  const pageLabel = labels.pages[normalized];

  if (pageLabel) {
    return pageLabel;
  }

  const segments = pathToSegments(normalized);
  const lastSegment = segments.at(-1);
  return lastSegment ? titleizeSegment(lastSegment) : labels.docsRoot;
}

export function getDocsBreadcrumbs(canonicalPath: string, locale: Locale): DocsBreadcrumbItem[] {
  const normalizedCanonicalPath = normalizePathname(canonicalPath);
  const segments = pathToSegments(normalizedCanonicalPath);
  const labels = breadcrumbLabels[locale];

  if (!segments.length) {
    return [
      {
        canonicalPath: docsHomePath,
        href: getLocalizedPath(docsHomePath, locale),
        label: labels.docsRoot
      }
    ];
  }

  const [section] = segments;
  const sectionLabel = labels.sections[section] ?? titleizeSegment(section);
  const sectionCanonicalPath = sectionDefaultCanonicalPath[section] ?? normalizedCanonicalPath;
  const breadcrumbs: DocsBreadcrumbItem[] = [];

  if (segments.length === 1 || sectionCanonicalPath === normalizedCanonicalPath) {
    breadcrumbs.push({
      canonicalPath: docsHomePath,
      href: getLocalizedPath(docsHomePath, locale),
      label: labels.docsRoot
    });
  }

  if (sectionCanonicalPath !== normalizedCanonicalPath) {
    breadcrumbs.push({
      canonicalPath: sectionCanonicalPath,
      href: getLocalizedPath(sectionCanonicalPath, locale),
      label: sectionLabel
    });
  }

  for (let index = 1; index < segments.length - 1; index += 1) {
    const parentCanonicalPath = normalizePathname(`/${segments.slice(0, index + 1).join("/")}`);

    if (!docsRouteByCanonical.has(parentCanonicalPath)) {
      continue;
    }

    breadcrumbs.push({
      canonicalPath: parentCanonicalPath,
      href: getLocalizedPath(parentCanonicalPath, locale),
      label: getLabel(parentCanonicalPath, locale)
    });
  }

  breadcrumbs.push({
    canonicalPath: normalizedCanonicalPath,
    href: getLocalizedPath(normalizedCanonicalPath, locale),
    label: getLabel(normalizedCanonicalPath, locale)
  });

  return breadcrumbs.filter((item, index, list) => {
    const previous = list[index - 1];
    return !previous || previous.label !== item.label || previous.canonicalPath !== item.canonicalPath;
  });
}
