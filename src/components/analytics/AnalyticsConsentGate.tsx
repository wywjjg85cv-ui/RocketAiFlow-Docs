"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { localizeHref } from "../../i18n/docs-routes";
import type { Locale } from "../../i18n/routing";
import {
  analyticsConsentEventName,
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsentState
} from "../../lib/analytics";
import GoogleAnalytics from "./GoogleAnalytics";

type AnalyticsConsentSnapshot = AnalyticsConsentState | "unknown" | null;

interface AnalyticsConsentGateProps {
  measurementId?: string;
}

const consentCopy: Record<
  Locale,
  {
    title: string;
    body: string;
    unavailable: string;
    detailsBefore: string;
    detailsLink: string;
    detailsAfter: string;
    decline: string;
    accept: string;
    close: string;
  }
> = {
  en: {
    title: "Analytics cookies",
    body:
      "We use optional analytics cookies to measure documentation traffic, understand which guides are useful, and improve the docs. If you decline, Google Analytics stays off.",
    unavailable:
      "Analytics is not currently configured on this deployment, so no analytics cookies are active right now.",
    detailsBefore: "Read the ",
    detailsLink: "Cookie Policy",
    detailsAfter: " page for details.",
    decline: "Decline",
    accept: "Accept analytics",
    close: "Close"
  },
  it: {
    title: "Cookie analytics",
    body:
      "Usiamo cookie analytics opzionali per misurare il traffico della documentazione, capire quali guide sono utili e migliorare le docs. Se rifiuti, Google Analytics resta disattivato.",
    unavailable:
      "Analytics non è configurato in questo deployment, quindi al momento non sono attivi cookie analytics.",
    detailsBefore: "Leggi la ",
    detailsLink: "Cookie Policy",
    detailsAfter: " per i dettagli.",
    decline: "Rifiuta",
    accept: "Accetta analytics",
    close: "Chiudi"
  }
};

function getLocaleFromPath(pathname: string | null): Locale {
  return pathname?.split("/").filter(Boolean)[0] === "it" ? "it" : "en";
}

function subscribeAnalyticsConsent(listener: () => void) {
  window.addEventListener(analyticsConsentEventName, listener);
  return () => window.removeEventListener(analyticsConsentEventName, listener);
}

function getServerAnalyticsConsent(): AnalyticsConsentSnapshot {
  return "unknown";
}

export default function AnalyticsConsentGate({ measurementId }: AnalyticsConsentGateProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const copy = consentCopy[locale];
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const analyticsAvailable = Boolean(measurementId);
  const consent = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, getServerAnalyticsConsent);
  const cookiePolicyHref = localizeHref("/legal/cookie-policy", locale);
  const shouldShowPanel = isPanelOpen || consent === null;

  useEffect(() => {
    const handleOpenSettings = () => setIsPanelOpen(true);

    window.addEventListener("raf-open-cookie-settings", handleOpenSettings);
    return () => window.removeEventListener("raf-open-cookie-settings", handleOpenSettings);
  }, []);

  const handleConsentChange = (nextConsent: AnalyticsConsentState) => {
    const previousConsent = getAnalyticsConsent();

    setAnalyticsConsent(nextConsent);
    setIsPanelOpen(false);

    if (previousConsent && previousConsent !== nextConsent) {
      window.location.reload();
    }
  };

  return (
    <>
      {consent === "accepted" && measurementId ? <GoogleAnalytics measurementId={measurementId} /> : null}

      {shouldShowPanel ? (
        <div className="docs-cookie-panel" role="dialog" aria-live="polite" aria-label={copy.title}>
          <div className="docs-cookie-card">
            <p className="docs-cookie-title">{copy.title}</p>
            <p className="docs-cookie-body">{analyticsAvailable ? copy.body : copy.unavailable}</p>
            <p className="docs-cookie-body docs-cookie-body-muted">
              {copy.detailsBefore}
              <Link href={cookiePolicyHref}>{copy.detailsLink}</Link>
              {copy.detailsAfter}
            </p>
            <div className="docs-cookie-actions">
              {analyticsAvailable ? (
                <>
                  <button
                    type="button"
                    className="docs-cookie-button docs-cookie-button-secondary"
                    onClick={() => handleConsentChange("rejected")}
                  >
                    {copy.decline}
                  </button>
                  <button
                    type="button"
                    className="docs-cookie-button docs-cookie-button-primary"
                    onClick={() => handleConsentChange("accepted")}
                  >
                    {copy.accept}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="docs-cookie-button docs-cookie-button-secondary"
                  onClick={() => handleConsentChange("rejected")}
                >
                  {copy.close}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
