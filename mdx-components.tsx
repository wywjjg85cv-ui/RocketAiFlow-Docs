import type { MDXComponents } from "mdx/types";
import { Callout, Cards } from "nextra/components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import type { ComponentProps } from "react";

type CardGroupProps = Omit<ComponentProps<typeof Cards>, "num"> & {
  cols?: number;
};

type ImagePlaceholderProps = {
  title: string;
  description: string;
};

type ProductScreenshotProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export function CardGroup({ cols, ...props }: CardGroupProps) {
  return <Cards num={cols} {...props} />;
}

export function Card(props: ComponentProps<typeof Cards.Card>) {
  return <Cards.Card {...props} />;
}

export function ImagePlaceholder({ title, description }: ImagePlaceholderProps) {
  return (
    <div className="docs-image-placeholder">
      <Callout type="info">
        <strong>{title}.</strong> Add product screenshot here: {description}
      </Callout>

      <div className="docs-image-placeholder-box" aria-label={`Image placeholder: ${title}`}>
        <p className="docs-image-placeholder-label">Image Placeholder</p>
        <p className="docs-image-placeholder-title">{title}</p>
        <p className="docs-image-placeholder-description">{description}</p>
        <p className="docs-image-placeholder-replace">Replace with real UI capture</p>
      </div>
    </div>
  );
}

export function ProductScreenshot({ src, alt, caption, className }: ProductScreenshotProps) {
  const screenshotClassName = ["docs-screenshot", className].filter(Boolean).join(" ");

  return (
    <figure className={screenshotClassName}>
      <div className="docs-screenshot-frame">
        {/* Screenshots are served from public and rendered responsively inside MDX layouts. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="docs-screenshot-img" src={src} alt={alt} loading="lazy" />
      </div>
      {caption ? <figcaption className="docs-screenshot-caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...getThemeComponents(),
    ...components,
    Card,
    CardGroup,
    Callout,
    ImagePlaceholder,
    ProductScreenshot
  };
}
