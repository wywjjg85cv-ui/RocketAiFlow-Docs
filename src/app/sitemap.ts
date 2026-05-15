import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { absoluteUrl } from "../config/site";

const contentDir = path.join(process.cwd(), "content");

function collectMdxFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectMdxFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function filePathToRoute(filePath: string) {
  const relativePath = path.relative(contentDir, filePath).replace(/\\/g, "/");
  const withoutExtension = relativePath.replace(/\.mdx$/, "");
  const route = withoutExtension.endsWith("/index")
    ? withoutExtension.slice(0, -"/index".length)
    : withoutExtension;

  return route ? `/${route}` : "/";
}

function routePriority(route: string) {
  if (route === "/get-started/introduction") return 1;
  if (route === "/get-started/quickstart") return 0.9;
  if (route.split("/").filter(Boolean).length <= 1) return 0.8;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return collectMdxFiles(contentDir)
    .map((filePath) => {
      const route = filePathToRoute(filePath);
      const stats = statSync(filePath);

      return {
        url: absoluteUrl(route),
        lastModified: stats.mtime,
        changeFrequency: "weekly" as const,
        priority: routePriority(route)
      };
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
