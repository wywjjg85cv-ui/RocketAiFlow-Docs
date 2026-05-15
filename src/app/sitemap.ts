import type { MetadataRoute } from "next";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { absoluteUrl } from "../config/site";
import {
  docsRoutes,
  getAlternatePaths,
  getLocalizedPath,
  pathToSegments
} from "../i18n/docs-routes";
import { defaultLocale, locales } from "../i18n/routing";

const contentDir = path.join(process.cwd(), "content");

function canonicalPathToFilePath(canonicalPath: string) {
  const segments = pathToSegments(canonicalPath);
  const filePath = path.join(contentDir, ...segments) + ".mdx";

  if (existsSync(filePath)) {
    return filePath;
  }

  return path.join(contentDir, ...segments, "index.mdx");
}

function routePriority(route: string) {
  if (route === "/get-started/introduction") return 1;
  if (route === "/get-started/quickstart") return 0.9;
  if (route.split("/").filter(Boolean).length <= 1) return 0.8;
  return 0.6;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return docsRoutes
    .flatMap((route) => {
      const filePath = canonicalPathToFilePath(route.canonicalPath);
      const stats = existsSync(filePath) ? statSync(filePath) : undefined;
      const alternatePaths = getAlternatePaths(route.canonicalPath);
      const languages = {
        ...Object.fromEntries(locales.map((locale) => [locale, absoluteUrl(alternatePaths[locale])])),
        "x-default": absoluteUrl(getLocalizedPath(route.canonicalPath, defaultLocale))
      };

      return locales.map((locale) => ({
        url: absoluteUrl(getLocalizedPath(route.canonicalPath, locale)),
        lastModified: stats?.mtime ?? new Date(),
        changeFrequency: "weekly" as const,
        priority: routePriority(route.canonicalPath),
        alternates: {
          languages
        }
      }));
    })
    .sort((a, b) => a.url.localeCompare(b.url));
}
