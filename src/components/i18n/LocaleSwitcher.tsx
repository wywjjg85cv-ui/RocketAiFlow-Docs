"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  defaultLocale,
  localeLabels,
  locales,
  type Locale
} from "../../i18n/routing";
import { getLocaleSwitcherMessages } from "../../i18n/messages";
import { setClientLocale, useCurrentLocale } from "../../i18n/client-locale";
import { docsHomePath, getCanonicalPathForPathname, getLocalizedPath } from "../../i18n/docs-routes";

function FlagUK({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
      <clipPath id="raf-docs-uk-a">
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id="raf-docs-uk-b">
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <g clipPath="url(#raf-docs-uk-a)">
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0 0l60 30m0-30L0 30"
          clipPath="url(#raf-docs-uk-b)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagIT({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className={className}>
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE2B37" />
    </svg>
  );
}

const flags: Record<Locale, (props: { className?: string }) => ReactNode> = {
  en: FlagUK,
  it: FlagIT
};

type LocaleSwitcherProps = {
  initialLocale?: Locale;
};

export function LocaleSwitcher({ initialLocale = defaultLocale }: LocaleSwitcherProps) {
  const locale = useCurrentLocale(initialLocale);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const switchLocale = (nextLocale: Locale) => {
    setOpen(false);

    if (nextLocale === locale) {
      return;
    }

    setClientLocale(nextLocale);
    const canonicalPath = getCanonicalPathForPathname(pathname) ?? docsHomePath;
    const nextPath = getLocalizedPath(canonicalPath, nextLocale);
    const suffix =
      typeof window === "undefined" ? "" : `${window.location.search}${window.location.hash}`;

    router.push(`${nextPath}${suffix}`);
  };

  const CurrentFlag = flags[locale];
  const t = getLocaleSwitcherMessages(locale);

  return (
    <div ref={ref} className="docs-locale-switcher">
      <button
        type="button"
        className="docs-locale-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.changeLanguage}
        title={localeLabels[locale]}
      >
        <CurrentFlag className="docs-locale-flag" />
      </button>

      {open ? (
        <ul className="docs-locale-menu" role="listbox" aria-label={t.selectLanguage}>
          {locales.map((item) => {
            const Flag = flags[item];
            const isActive = item === locale;

            return (
              <li key={item} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`docs-locale-option${isActive ? " is-active" : ""}`}
                  onClick={() => switchLocale(item)}
                  disabled={isActive}
                >
                  <Flag className="docs-locale-option-flag" />
                  <span>{localeLabels[item]}</span>
                  {isActive ? <span className="docs-locale-check" aria-hidden="true" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
