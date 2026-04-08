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

  try {
    const { metadata } = await importPage(mdxPath);
    return metadata as Metadata;
  } catch {
    return {};
  }
}

export default async function DocsPage(props: PageProps) {
  const { mdxPath = [] } = await props.params;

  try {
    const result = await importPage(mdxPath);
    const { default: MDXContent, toc, metadata } = result;

    return (
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent {...props} params={{ mdxPath }} />
      </Wrapper>
    );
  } catch {
    notFound();
  }
}
