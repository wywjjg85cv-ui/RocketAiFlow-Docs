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
          <svg
            viewBox="0 0 276 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="docs-brand-logo"
            aria-label="RocketAiFlow"
            role="img"
          >
            <image
              href="/logo-rocket.svg"
              x="0"
              y="0"
              width="46"
              height="60"
              preserveAspectRatio="xMidYMid meet"
            />
            <text
              x="60"
              y="24"
              fill="white"
              fontSize="18"
              fontWeight="600"
              fontFamily="Urbanist, sans-serif"
              letterSpacing="0.2"
            >
              Rocket
            </text>
            <text
              x="60"
              y="46"
              fill="#7DD3FC"
              fontSize="24"
              fontWeight="700"
              fontFamily="Urbanist, sans-serif"
              letterSpacing="0.1"
            >
              AiFlow
            </text>
          </svg>
          <span className="docs-logo-badge">
            Documentation
          </span>
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
