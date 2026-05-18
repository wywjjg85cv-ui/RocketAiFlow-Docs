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
      { source: "/get-started", destination: "/en/get-started/introduction", permanent: true },
      { source: "/01-getting-started", destination: "/en/get-started/introduction", permanent: true },
      { source: "/02-platform-overview", destination: "/en/get-started/introduction", permanent: true },
      {
        source: "/03-create-your-first-ai-voice-agent",
        destination: "/en/build/create-your-first-ai-voice-agent",
        permanent: true
      },
      {
        source: "/04-configure-agent-prompt",
        destination: "/en/build/configure-agent-prompt",
        permanent: true
      },
      { source: "/05-add-functions", destination: "/en/build/add-functions", permanent: true },
      { source: "/06-ai-inbound-routing", destination: "/en/run-workflows/ai-inbound-routing", permanent: true },
      { source: "/07-ai-dialer-flows", destination: "/en/run-workflows/ai-dialer-flows", permanent: true },
      { source: "/08-import-contacts", destination: "/en/run-workflows/import-contacts", permanent: true },
      { source: "/09-contact-inbounds", destination: "/en/run-workflows/contact-inbounds", permanent: true },
      { source: "/10-call-records", destination: "/en/run-workflows/call-records", permanent: true },
      { source: "/11-trunk-configuration", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/12-phone", destination: "/en/run-workflows/phone", permanent: true },
      { source: "/13-troubleshooting", destination: "/en/troubleshoot/troubleshooting", permanent: true },
      { source: "/14-faq", destination: "/en/troubleshoot/faq", permanent: true },
      { source: "/24-agent-configuration", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/25-functions-and-api-calls", destination: "/en/build/add-functions", permanent: true },
      { source: "/26-dynamic-parameters", destination: "/en/build/dynamic-parameters", permanent: true },
      {
        source: "/27-building-custom-api-actions",
        destination: "/en/build/add-functions",
        permanent: true
      },
      { source: "/28-telephony-architecture", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/29-dialer-pacing-and-limits", destination: "/en/run-workflows/dialer-pacing-and-limits", permanent: true },
      { source: "/30-call-history-and-review", destination: "/en/run-workflows/call-history-and-review", permanent: true },
      { source: "/api-reference", destination: "/en/reference/api-reference", permanent: true },
      { source: "/changelog", destination: "/en/reference/changelog", permanent: true },
      { source: "/deploy/on-premise-deployment", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/deploy/cloud-deployment", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/deploy/telephony-architecture", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/deploy/trunk-configuration", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/deploy/dedicated", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/deploy/self-hosted", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/trunk", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/trunk/:path*", destination: "/en/deploy/deployment-overview", permanent: true },
      {
        source: "/it/risoluzione-problemi/troubleshooting",
        destination: "/it/risoluzione-problemi/diagnostica",
        permanent: true
      },
      { source: "/agent-settings", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/agent-settings/:path*", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/build/core-concepts", destination: "/en/get-started/introduction", permanent: true },
      { source: "/build/inbound-workflows", destination: "/en/run-workflows/ai-inbound-routing", permanent: true },
      { source: "/build/outbound-workflows", destination: "/en/run-workflows/ai-dialer-flows", permanent: true },
      {
        source: "/build/workflow-design",
        destination: "/en/build/create-your-first-ai-voice-agent",
        permanent: true
      },
      { source: "/build/routing-and-handoff", destination: "/en/run-workflows/ai-inbound-routing", permanent: true },
      { source: "/build/provider-flexibility", destination: "/en/integrations/telephony", permanent: true },
      {
        source: "/build/platform-agnostic-architecture",
        destination: "/en/get-started/introduction",
        permanent: true
      },
      { source: "/integrate", destination: "/en/integrations", permanent: true },
      { source: "/integrate/telephony-sip-pbx", destination: "/en/integrations/telephony", permanent: true },
      { source: "/integrate/speech-providers", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/integrate/voice-tts-providers", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/integrate/llm-model-providers", destination: "/en/build/create-your-first-ai-voice-agent", permanent: true },
      { source: "/integrate/crm-and-internal-systems", destination: "/en/build/add-functions", permanent: true },
      { source: "/integrate/webhooks-apis", destination: "/en/reference/api-reference", permanent: true },
      { source: "/deploy/telephony-and-system-fit", destination: "/en/deploy/deployment-overview", permanent: true },
      { source: "/learn/best-practices", destination: "/en/troubleshoot/faq", permanent: true },
      { source: "/learn/common-patterns", destination: "/en/troubleshoot/faq", permanent: true },
      { source: "/learn/example-use-cases", destination: "/en/troubleshoot/faq", permanent: true },
      { source: "/learn/faqs", destination: "/en/troubleshoot/faq", permanent: true },
      { source: "/legal-trust/privacy-and-data-handling", destination: "/en/legal/privacy-and-data-protection", permanent: true },
      { source: "/legal-trust/security-and-trust", destination: "/en/legal/security-and-trust", permanent: true }
    ];
  },
  images: {
    qualities: [50, 75, 90, 95]
  }
});
