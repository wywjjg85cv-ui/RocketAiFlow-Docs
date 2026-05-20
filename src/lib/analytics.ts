export type AnalyticsEventParams = Record<string, string | number | boolean | undefined>;
export type AnalyticsConsentState = "accepted" | "rejected";

export const analyticsConsentStorageKey = "raf_analytics_consent";
export const analyticsConsentEventName = "raf-analytics-consent-change";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (command: string, target: string, params?: AnalyticsEventParams) => void;
  }
}

export function getAnalyticsConsent(): AnalyticsConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(analyticsConsentStorageKey);
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setAnalyticsConsent(value: AnalyticsConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(analyticsConsentStorageKey, value);
  window.dispatchEvent(new Event(analyticsConsentEventName));
}

export function canTrackAnalytics() {
  return getAnalyticsConsent() === "accepted";
}

export function trackGaEvent(name: string, params?: AnalyticsEventParams) {
  if (typeof window === "undefined" || !window.gtag || !canTrackAnalytics()) {
    return;
  }

  window.gtag("event", name, params);
}
