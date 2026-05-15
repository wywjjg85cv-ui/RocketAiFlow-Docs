import Link from "next/link";
import { absoluteUrl } from "../config/site";
import { getDocsBreadcrumbs } from "../i18n/docs-breadcrumbs";
import type { Locale } from "../i18n/routing";

type DocsBreadcrumbsProps = {
  canonicalPath: string;
  locale: Locale;
};

export function DocsBreadcrumbs({ canonicalPath, locale }: DocsBreadcrumbsProps) {
  const breadcrumbs = getDocsBreadcrumbs(canonicalPath, locale);

  if (breadcrumbs.length < 2) {
    return null;
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.label,
      item: absoluteUrl(breadcrumb.href)
    }))
  };

  return (
    <>
      <nav
        aria-label={locale === "it" ? "Percorso pagina" : "Breadcrumb"}
        className="docs-breadcrumbs"
      >
        <ol>
          {breadcrumbs.map((breadcrumb, index) => {
            const isCurrentPage = index === breadcrumbs.length - 1;

            return (
              <li key={`${breadcrumb.canonicalPath}-${index}`}>
                {isCurrentPage ? (
                  <span aria-current="page">{breadcrumb.label}</span>
                ) : (
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c")
        }}
      />
    </>
  );
}
