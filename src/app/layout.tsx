import type { Metadata } from "next";
import Script from "next/script";
import { Footer, Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import AnalyticsConsentGate from "../components/analytics/AnalyticsConsentGate";
import CookieSettingsButton from "../components/analytics/CookieSettingsButton";
import { DocsNavbar } from "../components/docs-navbar";
import { LocalizedInternalLinks } from "../components/i18n/LocalizedInternalLinks";
import { LocalizedSearch } from "../components/i18n/LocalizedSearch";
import { LocalizedBackToTop, LocalizedTocTitle } from "../components/i18n/LocalizedToc";
import { absoluteUrl, siteDescription, siteName, siteOgImagePath, siteUrl } from "../config/site";
import "nextra-theme-docs/style.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo192.png"
  },
  description: siteDescription,
  keywords: [
    "RocketAiFlow documentation",
    "voice workflow automation docs",
    "platform-agnostic voice AI",
    "deployment planning docs",
    "voice ai integrations",
    "operational workflow documentation",
    "voice workflow monitoring",
    "campaign analytics documentation"
  ],
  alternates: {
    canonical: absoluteUrl("/get-started/introduction")
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: absoluteUrl("/get-started/introduction"),
    siteName,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteOgImagePath),
        width: 1200,
        height: 630,
        alt: "RocketAiFlow"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [absoluteUrl(siteOgImagePath)]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: ["en", "it"],
  description: siteDescription
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="docs-html-lang" strategy="beforeInteractive">
          {`document.documentElement.lang=location.pathname.startsWith('/it/')||location.pathname==='/it'?'it':'en';`}
        </Script>
        <Layout
          pageMap={pageMap}
          navbar={<DocsNavbar key="docs-navbar" />}
          search={<LocalizedSearch />}
          footer={
            <Footer key="docs-footer">
              <div className="docs-footer">
                <span>
                  RocketAiFlow docs for product education, integration planning, deployment
                  review, monitoring setup, and operational rollout.
                </span>
                <span className="docs-footer-actions">
                  <CookieSettingsButton />
                  <span>{new Date().getFullYear()} © RocketAiFlow</span>
                </span>
              </div>
            </Footer>
          }
          editLink={null}
          feedback={{ content: null }}
          sidebar={{ autoCollapse: false, defaultMenuCollapseLevel: 1 }}
          darkMode
          nextThemes={{
            defaultTheme: "dark",
            storageKey: "rocketaiflow-docs-theme"
          }}
          toc={{
            title: <LocalizedTocTitle />,
            backToTop: <LocalizedBackToTop />
          }}
        >
          {children}
        </Layout>
        <AnalyticsConsentGate measurementId={gaMeasurementId} />
        <LocalizedInternalLinks />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c")
          }}
        />
      </body>
    </html>
  );
}
