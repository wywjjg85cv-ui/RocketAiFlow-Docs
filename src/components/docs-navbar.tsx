"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar } from "nextra-theme-docs";

const navItems = [
  { href: "/", label: "Documentation" },
  { href: "/api-reference", label: "API Reference" },
  { href: "/changelog", label: "Changelog" }
];

export function DocsNavbar() {
  const pathname = usePathname();

  return (
    <Navbar
      logo={
        <span className="docs-logo-lockup">
          <span className="docs-logo-eyebrow">RocketAiFlow</span>
          <span className="docs-logo">Documentation</span>
        </span>
      }
      logoLink="/"
    >
      <nav key="docs-primary-nav" aria-label="Primary" className="docs-topnav">
        {navItems.map((item) => {
          const isDocsPath = !["/api-reference", "/changelog"].some(
            (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
          );
          const isActive =
            item.href === "/"
              ? isDocsPath
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`docs-topnav-link${isActive ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </Navbar>
  );
}
