import { type Locale } from "./routing";

export const messages = {
  en: {
    localeSwitcher: {
      changeLanguage: "Change language",
      selectLanguage: "Select language"
    }
  },
  it: {
    localeSwitcher: {
      changeLanguage: "Cambia lingua",
      selectLanguage: "Seleziona lingua"
    }
  }
} as const satisfies Record<Locale, { localeSwitcher: { changeLanguage: string; selectLanguage: string } }>;

export function getLocaleSwitcherMessages(locale: Locale) {
  return messages[locale].localeSwitcher;
}
