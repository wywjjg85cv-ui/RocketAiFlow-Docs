import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: false
  }
});

export default withNextra({
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/trunk", destination: "/11-trunk-configuration", permanent: false },
      { source: "/trunk/:path*", destination: "/11-trunk-configuration", permanent: false },
      {
        source: "/agent-settings",
        destination: "/24-agent-configuration",
        permanent: false
      },
      {
        source: "/agent-settings/:path*",
        destination: "/24-agent-configuration",
        permanent: false
      },
      { source: "/get-started", destination: "/01-getting-started", permanent: false },
      { source: "/get-started/quickstart", destination: "/01-getting-started", permanent: false },
      { source: "/build/core-concepts", destination: "/02-platform-overview", permanent: false },
      { source: "/build/inbound-workflows", destination: "/06-ai-inbound-routing", permanent: false },
      { source: "/build/outbound-workflows", destination: "/07-ai-dialer-flows", permanent: false },
      {
        source: "/build/workflow-design",
        destination: "/03-create-your-first-ai-voice-agent",
        permanent: false
      },
      { source: "/build/routing-and-handoff", destination: "/06-ai-inbound-routing", permanent: false },
      {
        source: "/build/provider-flexibility",
        destination: "/11-trunk-configuration",
        permanent: false
      },
      {
        source: "/build/platform-agnostic-architecture",
        destination: "/02-platform-overview",
        permanent: false
      },
      {
        source: "/deploy/deployment-overview",
        destination: "/11-trunk-configuration",
        permanent: false
      },
      {
        source: "/deploy/on-premise-deployment",
        destination: "/11-trunk-configuration",
        permanent: false
      },
      { source: "/deploy/cloud-deployment", destination: "/11-trunk-configuration", permanent: false },
      {
        source: "/deploy/operational-considerations",
        destination: "/13-troubleshooting",
        permanent: false
      },
      {
        source: "/deploy/telephony-and-system-fit",
        destination: "/11-trunk-configuration",
        permanent: false
      },
      { source: "/integrate", destination: "/02-platform-overview", permanent: false },
      { source: "/integrate/telephony-sip-pbx", destination: "/11-trunk-configuration", permanent: false },
      { source: "/integrate/speech-providers", destination: "/04-configure-agent-prompt", permanent: false },
      {
        source: "/integrate/voice-tts-providers",
        destination: "/04-configure-agent-prompt",
        permanent: false
      },
      {
        source: "/integrate/llm-model-providers",
        destination: "/04-configure-agent-prompt",
        permanent: false
      },
      {
        source: "/integrate/crm-and-internal-systems",
        destination: "/08-import-contacts",
        permanent: false
      },
      { source: "/integrate/webhooks-apis", destination: "/api-reference", permanent: false },
      {
        source: "/operate/performance-review",
        destination: "/operate/campaign-analytics",
        permanent: false
      },
      { source: "/operate/workflow-optimization", destination: "/13-troubleshooting", permanent: false },
      { source: "/learn/best-practices", destination: "/14-faq", permanent: false },
      { source: "/learn/common-patterns", destination: "/14-faq", permanent: false },
      { source: "/learn/example-use-cases", destination: "/14-faq", permanent: false },
      { source: "/learn/faqs", destination: "/14-faq", permanent: false },
      {
        source: "/legal-trust/privacy-and-data-handling",
        destination: "/api-reference",
        permanent: false
      },
      { source: "/legal-trust/security-and-trust", destination: "/api-reference", permanent: false }
    ];
  },
  images: {
    qualities: [50, 75, 90, 95]
  }
});
