export const siteUrl =
  process.env.SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://docs.rocketaiflow.com");

export const siteName = "RocketAiFlow Docs";
export const siteDescription =
  "RocketAiFlow documentation for workflow design, deployment planning, integrations, real-time monitoring, and operational rollout.";

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
