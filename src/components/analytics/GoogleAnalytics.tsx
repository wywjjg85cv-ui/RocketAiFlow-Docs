"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { canTrackAnalytics, trackGaEvent } from "../../lib/analytics";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    const sendPageView = () => {
      if (!window.gtag || !canTrackAnalytics()) {
        return;
      }

      window.gtag("config", measurementId, {
        page_path: `${pathname}${window.location.search}`
      });
    };

    sendPageView();
    window.addEventListener("raf-ga-ready", sendPageView);
    return () => window.removeEventListener("raf-ga-ready", sendPageView);
  }, [measurementId, pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const clickable = target.closest("a,button");
      if (!(clickable instanceof HTMLElement)) {
        return;
      }

      const label = clickable.textContent?.replace(/\s+/g, " ").trim();
      if (!label) {
        return;
      }

      const href = clickable instanceof HTMLAnchorElement ? clickable.getAttribute("href") : null;
      const explicitEvent = clickable.dataset.analyticsEvent;

      if (explicitEvent) {
        trackGaEvent(explicitEvent, {
          cta_label: clickable.dataset.analyticsLabel || label,
          cta_target: href || "button",
          link_url: clickable instanceof HTMLAnchorElement ? clickable.href : undefined,
          page_path: window.location.pathname + window.location.search
        });
        return;
      }

      const isContactAction =
        /contact sales|contatta sales|richiedi|request|demo/i.test(label) ||
        Boolean(href && /rocketaiflow\.com\/(en|it)\/contact|\/contact/.test(href));

      if (!isContactAction) {
        return;
      }

      trackGaEvent("docs_contact_click", {
        cta_label: label,
        cta_target: href || "button",
        page_path: window.location.pathname + window.location.search
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
          window.dispatchEvent(new Event('raf-ga-ready'));
        `}
      </Script>
    </>
  );
}
