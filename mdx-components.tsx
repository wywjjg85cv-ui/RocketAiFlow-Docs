import type { MDXComponents } from "mdx/types";
import { Cards } from "nextra/components";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import type { ComponentProps } from "react";

type CardGroupProps = Omit<ComponentProps<typeof Cards>, "num"> & {
  cols?: number;
};

function CardGroup({ cols, ...props }: CardGroupProps) {
  return <Cards num={cols} {...props} />;
}

function Card(props: ComponentProps<typeof Cards.Card>) {
  return <Cards.Card {...props} />;
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    Card,
    CardGroup,
    ...getThemeComponents(),
    ...components
  };
}
