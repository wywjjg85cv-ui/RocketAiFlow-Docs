const fs = require("node:fs");
const path = require("node:path");

const appDir = path.join(process.cwd(), ".next", "server", "app");

function walk(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function localeFromHtmlPath(filePath) {
  const relativePath = `/${path.relative(appDir, filePath).replaceAll(path.sep, "/")}`;

  if (relativePath === "/it.html" || relativePath.startsWith("/it/")) {
    return "it";
  }

  if (relativePath === "/en.html" || relativePath.startsWith("/en/")) {
    return "en";
  }

  return undefined;
}

let updated = 0;

for (const filePath of walk(appDir)) {
  if (!filePath.endsWith(".html")) {
    continue;
  }

  const locale = localeFromHtmlPath(filePath);

  if (!locale) {
    continue;
  }

  const html = fs.readFileSync(filePath, "utf8");
  const nextHtml = html.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`);

  if (nextHtml !== html) {
    fs.writeFileSync(filePath, nextHtml);
    updated += 1;
  }
}

console.log(`Updated ${updated} localized HTML document lang attributes.`);
