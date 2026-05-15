import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import type { ComponentType, ReactNode } from "react";
import { absoluteUrl, siteDescription, siteName } from "../../config/site";

type PageProps = {
  params: Promise<{
    mdxPath?: string[];
  }>;
};

export const dynamicParams = false;
export const generateStaticParams = generateStaticParamsFor("mdxPath");

const Wrapper = getMDXComponents().wrapper as ComponentType<{
  children: ReactNode;
  metadata?: unknown;
  toc?: unknown;
}>;

function routeFromMdxPath(mdxPath: string[]) {
  return mdxPath.length > 0 ? `/${mdxPath.join("/")}` : "/get-started/introduction";
}

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
  const result = await importPage(mdxPath).catch(() => null);

  if (!result) {
    return {};
  }

  const pageMetadata = result.metadata as Metadata;
  const title = metadataTitleToString(pageMetadata.title);
  const description =
    typeof pageMetadata.description === "string" ? pageMetadata.description : siteDescription;
  const canonical = absoluteUrl(routeFromMdxPath(mdxPath));
  const image = absoluteUrl("/logo512.png");

  return {
    ...pageMetadata,
    alternates: {
      ...(pageMetadata.alternates ?? {}),
      canonical
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
  const result = await importPage(mdxPath).catch(() => null);

  if (!result) {
    notFound();
  }

  const { default: MDXContent, toc, metadata } = result;

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={{ mdxPath }} />
    </Wrapper>
  );
}
