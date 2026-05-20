"use client";

import { defaultLocale, type Locale } from "../../i18n/routing";
import { useCurrentLocale } from "../../i18n/client-locale";

const labels: Record<Locale, string> = {
  en: "Cookie settings",
  it: "Impostazioni cookie"
};

export default function CookieSettingsButton() {
  const locale = useCurrentLocale(defaultLocale);

  return (
    <button
      type="button"
      className="docs-footer-cookie-button"
      onClick={() => window.dispatchEvent(new Event("raf-open-cookie-settings"))}
    >
      {labels[locale]}
    </button>
  );
}
