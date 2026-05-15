import { defaultLocale, type Locale, locales } from "./routing";

export type DocsRoute = {
  canonicalPath: string;
  paths: Record<Locale, string>;
};

export const docsHomePath = "/get-started/introduction";

export const docsRoutes = [
  {
    canonicalPath: "/get-started/introduction",
    paths: { en: "/get-started/introduction", it: "/per-iniziare/introduzione" }
  },
  {
    canonicalPath: "/get-started/quickstart",
    paths: { en: "/get-started/quickstart", it: "/per-iniziare/quickstart" }
  },
  {
    canonicalPath: "/build/create-your-first-ai-voice-agent",
    paths: {
      en: "/build/create-your-first-ai-voice-agent",
      it: "/costruisci/crea-il-primo-ai-voice-agent"
    }
  },
  {
    canonicalPath: "/build/configure-agent-prompt",
    paths: { en: "/build/configure-agent-prompt", it: "/costruisci/configura-il-prompt" }
  },
  {
    canonicalPath: "/build/add-functions",
    paths: { en: "/build/add-functions", it: "/costruisci/configura-functions" }
  },
  {
    canonicalPath: "/build/dynamic-parameters",
    paths: { en: "/build/dynamic-parameters", it: "/costruisci/parametri-dinamici" }
  },
  {
    canonicalPath: "/run-workflows/ai-inbound-routing",
    paths: { en: "/run-workflows/ai-inbound-routing", it: "/esegui-workflow/ai-inbound-routing" }
  },
  {
    canonicalPath: "/run-workflows/ai-dialer-flows",
    paths: { en: "/run-workflows/ai-dialer-flows", it: "/esegui-workflow/ai-dialer-flows" }
  },
  {
    canonicalPath: "/run-workflows/dialer-pacing-and-limits",
    paths: {
      en: "/run-workflows/dialer-pacing-and-limits",
      it: "/esegui-workflow/pacing-e-limiti-dialer"
    }
  },
  {
    canonicalPath: "/run-workflows/import-contacts",
    paths: { en: "/run-workflows/import-contacts", it: "/esegui-workflow/importa-contatti" }
  },
  {
    canonicalPath: "/run-workflows/contact-inbounds",
    paths: { en: "/run-workflows/contact-inbounds", it: "/esegui-workflow/contact-inbounds" }
  },
  {
    canonicalPath: "/run-workflows/call-records",
    paths: { en: "/run-workflows/call-records", it: "/esegui-workflow/call-records" }
  },
  {
    canonicalPath: "/run-workflows/call-history-and-review",
    paths: {
      en: "/run-workflows/call-history-and-review",
      it: "/esegui-workflow/storico-e-revisione-chiamate"
    }
  },
  {
    canonicalPath: "/run-workflows/phone",
    paths: { en: "/run-workflows/phone", it: "/esegui-workflow/phone" }
  },
  {
    canonicalPath: "/integrations",
    paths: { en: "/integrations", it: "/integrazioni" }
  },
  {
    canonicalPath: "/integrations/telephony",
    paths: { en: "/integrations/telephony", it: "/integrazioni/telefonia" }
  },
  {
    canonicalPath: "/integrations/telephony/asterisk-based-pbx-systems",
    paths: {
      en: "/integrations/telephony/asterisk-based-pbx-systems",
      it: "/integrazioni/telefonia/sistemi-pbx-basati-su-asterisk"
    }
  },
  {
    canonicalPath: "/deploy/deployment-overview",
    paths: { en: "/deploy/deployment-overview", it: "/deploy/panoramica-deploy" }
  },
  {
    canonicalPath: "/observe/monitoring-and-visibility",
    paths: { en: "/observe/monitoring-and-visibility", it: "/osserva/monitoraggio-e-visibilita" }
  },
  {
    canonicalPath: "/observe/pre-provisioned-dashboards",
    paths: { en: "/observe/pre-provisioned-dashboards", it: "/osserva/dashboard-preconfigurate" }
  },
  {
    canonicalPath: "/observe/dialer-dashboard-panels",
    paths: { en: "/observe/dialer-dashboard-panels", it: "/osserva/pannelli-dashboard-dialer" }
  },
  {
    canonicalPath: "/observe/logs-and-traces",
    paths: { en: "/observe/logs-and-traces", it: "/osserva/log-e-trace" }
  },
  {
    canonicalPath: "/troubleshoot/investigating-workflow-issues",
    paths: {
      en: "/troubleshoot/investigating-workflow-issues",
      it: "/risoluzione-problemi/analisi-problemi-workflow"
    }
  },
  {
    canonicalPath: "/troubleshoot/troubleshooting",
    paths: { en: "/troubleshoot/troubleshooting", it: "/risoluzione-problemi/troubleshooting" }
  },
  {
    canonicalPath: "/troubleshoot/faq",
    paths: { en: "/troubleshoot/faq", it: "/risoluzione-problemi/faq" }
  },
  {
    canonicalPath: "/legal",
    paths: { en: "/legal", it: "/legal" }
  },
  {
    canonicalPath: "/legal/terms-and-commercial-model",
    paths: { en: "/legal/terms-and-commercial-model", it: "/legal/termini-e-modello-commerciale" }
  },
  {
    canonicalPath: "/legal/privacy-and-data-protection",
    paths: { en: "/legal/privacy-and-data-protection", it: "/legal/privacy-e-protezione-dati" }
  },
  {
    canonicalPath: "/legal/ai-transparency",
    paths: { en: "/legal/ai-transparency", it: "/legal/trasparenza-ai" }
  },
  {
    canonicalPath: "/legal/security-and-trust",
    paths: { en: "/legal/security-and-trust", it: "/legal/sicurezza-e-trust" }
  },
  {
    canonicalPath: "/legal/imprint",
    paths: { en: "/legal/imprint", it: "/legal/note-legali" }
  },
  {
    canonicalPath: "/reference/api-reference",
    paths: { en: "/reference/api-reference", it: "/riferimenti/riferimento-api" }
  },
  {
    canonicalPath: "/reference/changelog",
    paths: { en: "/reference/changelog", it: "/riferimenti/changelog" }
  }
] satisfies DocsRoute[];

export const docsRouteByCanonical = new Map(docsRoutes.map((route) => [route.canonicalPath, route]));

const canonicalPathAliases = new Map<string, string>([
  ["/get-started", docsHomePath],
  ["/build", "/build/create-your-first-ai-voice-agent"],
  ["/run-workflows", "/run-workflows/ai-inbound-routing"],
  ["/deploy", "/deploy/deployment-overview"],
  ["/observe", "/observe/monitoring-and-visibility"],
  ["/observe/campaign-analytics", "/observe/pre-provisioned-dashboards"],
  ["/observe/endpoint-and-trunk-monitoring", "/observe/pre-provisioned-dashboards"],
  ["/observe/infrastructure-monitoring", "/observe/pre-provisioned-dashboards"],
  ["/observe/asterisk-monitoring", "/observe/pre-provisioned-dashboards"],
  ["/observe/container-monitoring", "/observe/pre-provisioned-dashboards"],
  ["/observe/database-monitoring", "/observe/pre-provisioned-dashboards"],
  ["/observe/real-time-performance-metrics", "/observe/pre-provisioned-dashboards"],
  ["/observe/time-range-reporting", "/observe/pre-provisioned-dashboards"],
  ["/observe/logs-drilldown", "/observe/logs-and-traces"],
  ["/observe/trace-correlation", "/observe/logs-and-traces"],
  ["/osserva/analytics-campagne", "/observe/pre-provisioned-dashboards"],
  ["/osserva/monitoraggio-endpoint-e-trunk", "/observe/pre-provisioned-dashboards"],
  ["/osserva/monitoraggio-infrastruttura", "/observe/pre-provisioned-dashboards"],
  ["/osserva/monitoraggio-asterisk", "/observe/pre-provisioned-dashboards"],
  ["/osserva/monitoraggio-container", "/observe/pre-provisioned-dashboards"],
  ["/osserva/monitoraggio-database", "/observe/pre-provisioned-dashboards"],
  ["/osserva/metriche-real-time", "/observe/pre-provisioned-dashboards"],
  ["/osserva/report-per-intervallo", "/observe/pre-provisioned-dashboards"],
  ["/osserva/analisi-log", "/observe/logs-and-traces"],
  ["/osserva/correlazione-trace", "/observe/logs-and-traces"],
  ["/troubleshoot", "/troubleshoot/troubleshooting"],
  ["/reference", "/reference/api-reference"]
]);

const localizedToCanonical = new Map<string, string>();

for (const route of docsRoutes) {
  for (const locale of locales) {
    localizedToCanonical.set(`${locale}:${route.paths[locale]}`, route.canonicalPath);
  }
}

export function normalizePathname(pathname: string): string {
  const [path] = pathname.split(/[?#]/);
  if (!path || path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function pathToSegments(pathname: string): string[] {
  const normalized = normalizePathname(pathname);
  return normalized === "/" ? [] : normalized.slice(1).split("/");
}

export function getLocalizedPath(canonicalPath: string, locale: Locale): string {
  const normalizedCanonicalPath = normalizePathname(canonicalPath);
  const route = docsRouteByCanonical.get(
    normalizedCanonicalPath === "/" ? docsHomePath : normalizedCanonicalPath
  );
  const localizedPath = route?.paths[locale] ?? normalizePathname(canonicalPath);
  return localizedPath === "/" ? `/${locale}` : `/${locale}${localizedPath}`;
}

export function getCanonicalPathForLocalizedPath(locale: Locale, localizedPath: string): string | undefined {
  const normalized = normalizePathname(localizedPath);
  if (normalized === "/") {
    return docsHomePath;
  }

  return localizedToCanonical.get(`${locale}:${normalized}`);
}

export function getCanonicalPathForPathname(pathname: string): string | undefined {
  const normalized = normalizePathname(pathname);
  const [maybeLocale, ...rest] = pathToSegments(normalized);

  if (locales.includes(maybeLocale as Locale)) {
    const locale = maybeLocale as Locale;
    const localizedPath = rest.length ? `/${rest.join("/")}` : "/";
    return (
      getCanonicalPathForLocalizedPath(locale, localizedPath) ??
      docsRouteByCanonical.get(normalizePathname(localizedPath))?.canonicalPath ??
      canonicalPathAliases.get(normalizePathname(localizedPath))
    );
  }

  return docsRouteByCanonical.get(normalized)?.canonicalPath ?? canonicalPathAliases.get(normalized);
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }

  const [pathname, suffix = ""] = href.split(/(?=[?#])/);
  const canonicalPath = getCanonicalPathForPathname(pathname);

  if (!canonicalPath) {
    return href;
  }

  return `${getLocalizedPath(canonicalPath, locale)}${suffix}`;
}

export function getAlternatePaths(canonicalPath: string): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedPath(canonicalPath, locale)])
  ) as Record<Locale, string>;
}

export function resolveDocsPath(parts: string[] = []): {
  canonicalPath: string;
  locale: Locale;
  mdxPath: string[];
} | null {
  if (!parts.length) {
    return { canonicalPath: docsHomePath, locale: defaultLocale, mdxPath: pathToSegments(docsHomePath) };
  }

  const [maybeLocale, ...rest] = parts;

  if (locales.includes(maybeLocale as Locale)) {
    const locale = maybeLocale as Locale;
    const localizedPath = rest.length ? `/${rest.join("/")}` : "/";
    const canonicalPath =
      getCanonicalPathForLocalizedPath(locale, localizedPath) ??
      docsRouteByCanonical.get(normalizePathname(localizedPath))?.canonicalPath;

    if (!canonicalPath) {
      return null;
    }

    return {
      canonicalPath,
      locale,
      mdxPath: pathToSegments(canonicalPath)
    };
  }

  const canonicalPath = docsRouteByCanonical.get(normalizePathname(`/${parts.join("/")}`))?.canonicalPath;

  if (!canonicalPath) {
    return null;
  }

  return {
    canonicalPath,
    locale: defaultLocale,
    mdxPath: pathToSegments(canonicalPath)
  };
}
