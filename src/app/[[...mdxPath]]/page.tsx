import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import type { ComponentType, ReactNode } from "react";
import { DocsBreadcrumbs } from "../../components/docs-breadcrumbs";
import { absoluteUrl, siteDescription, siteName } from "../../config/site";
import {
  docsRoutes,
  getAlternatePaths,
  getLocalizedPath,
  pathToSegments,
  resolveDocsPath
} from "../../i18n/docs-routes";
import { defaultLocale, locales } from "../../i18n/routing";

type PageProps = {
  params: Promise<{
    mdxPath?: string[];
  }>;
};

export const dynamicParams = false;
export function generateStaticParams() {
  return docsRoutes.flatMap((route) =>
    locales.map((locale) => ({
      mdxPath: [locale, ...pathToSegments(route.paths[locale])]
    }))
  );
}

const Wrapper = getMDXComponents().wrapper as ComponentType<{
  children: ReactNode;
  metadata?: unknown;
  toc?: unknown;
}>;

function metadataTitleToString(title: Metadata["title"] | undefined) {
  if (typeof title === "string") {
    return title;
  }

  if (title && typeof title === "object") {
    if ("absolute" in title && typeof title.absolute === "string") {
      return title.absolute;
    }

    if ("default" in title && typeof title.default === "string") {
      return title.default;
    }
  }

  return siteName;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath = [] } = await params;
  const resolvedPath = resolveDocsPath(mdxPath);

  if (!resolvedPath) {
    return {};
  }

  const result = await importPage(resolvedPath.mdxPath).catch(() => null);

  if (!result) {
    return {};
  }

  const pageMetadata = result.metadata as Metadata;
  const title = metadataTitleToString(pageMetadata.title);
  const description =
    typeof pageMetadata.description === "string" ? pageMetadata.description : siteDescription;
  const canonical = absoluteUrl(getLocalizedPath(resolvedPath.canonicalPath, resolvedPath.locale));
  const alternates = getAlternatePaths(resolvedPath.canonicalPath);
  const image = absoluteUrl("/logo512.png");

  return {
    ...pageMetadata,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(alternates[locale])])),
        "x-default": absoluteUrl(getLocalizedPath(resolvedPath.canonicalPath, defaultLocale))
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: "article",
      images: [
        {
          url: image,
          width: 512,
          height: 512,
          alt: "RocketAiFlow"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
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
}

export default async function DocsPage(props: PageProps) {
  const { mdxPath = [] } = await props.params;
  const resolvedPath = resolveDocsPath(mdxPath);

  if (!resolvedPath) {
    notFound();
  }

  const result = await importPage(resolvedPath.mdxPath).catch(() => null);

  if (!result) {
    notFound();
  }

  const { default: MDXContent, toc, metadata } = result;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <DocsBreadcrumbs canonicalPath={resolvedPath.canonicalPath} locale={resolvedPath.locale} />
      <MDXContent {...props} params={{ mdxPath: resolvedPath.mdxPath }} />
    </Wrapper>
  );
}
