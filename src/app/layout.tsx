import type { Metadata } from "next";
import { Footer, Layout } from "nextra-theme-docs";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { DocsNavbar } from "../components/docs-navbar";
import { LocalizedInternalLinks } from "../components/i18n/LocalizedInternalLinks";
import { LocalizedBackToTop, LocalizedTocTitle } from "../components/i18n/LocalizedToc";
import { absoluteUrl, siteDescription, siteName, siteUrl } from "../config/site";
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
        url: absoluteUrl("/logo512.png"),
        width: 512,
        height: 512,
        alt: "RocketAiFlow"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [absoluteUrl("/logo512.png")]
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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageMap = await getPageMap();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Layout
          pageMap={pageMap}
          navbar={<DocsNavbar key="docs-navbar" />}
          search={<Search />}
          footer={
            <Footer key="docs-footer">
              <div className="docs-footer">
                <span>
                  RocketAiFlow docs for product education, integration planning, deployment
                  review, monitoring setup, and operational rollout.
                </span>
                <span>{new Date().getFullYear()} © RocketAiFlow</span>
              </div>
            </Footer>
          }
          editLink={null}
          feedback={{ content: null }}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
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
        <LocalizedInternalLinks />
      </body>
    </html>
  );
}
