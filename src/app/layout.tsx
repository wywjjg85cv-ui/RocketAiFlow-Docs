import type { Metadata } from "next";
import { Footer, Layout } from "nextra-theme-docs";
import { Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { DocsNavbar } from "../components/docs-navbar";
import "nextra-theme-docs/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RocketAiFlow Docs",
    template: "%s | RocketAiFlow Docs"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  },
  description:
    "RocketAiFlow documentation for workflow design, deployment planning, integrations, and operational rollout.",
  keywords: [
    "RocketAiFlow documentation",
    "voice workflow automation docs",
    "platform-agnostic voice AI",
    "deployment planning docs",
    "voice ai integrations",
    "operational workflow documentation"
  ]
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
                  review, and operational rollout.
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
            title: "On This Page",
            backToTop: "Back to top"
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
