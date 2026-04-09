import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
import type { ComponentType, ReactNode } from "react";

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { mdxPath = [] } = await params;
  const result = await importPage(mdxPath).catch(() => null);

  if (!result) {
    return {};
  }

  return result.metadata as Metadata;
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
