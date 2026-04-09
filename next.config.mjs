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
      { source: "/01-getting-started", destination: "/get-started/quickstart", permanent: false },
      { source: "/02-platform-overview", destination: "/get-started/platform-overview", permanent: false },
      {
        source: "/03-create-your-first-ai-voice-agent",
        destination: "/build/create-your-first-ai-voice-agent",
        permanent: false
      },
      {
        source: "/04-configure-agent-prompt",
        destination: "/build/configure-agent-prompt",
        permanent: false
      },
      { source: "/05-add-functions", destination: "/build/add-functions", permanent: false },
      { source: "/06-ai-inbound-routing", destination: "/run-workflows/ai-inbound-routing", permanent: false },
      { source: "/07-ai-dialer-flows", destination: "/run-workflows/ai-dialer-flows", permanent: false },
      { source: "/08-import-contacts", destination: "/run-workflows/import-contacts", permanent: false },
      { source: "/09-contact-inbounds", destination: "/run-workflows/contact-inbounds", permanent: false },
      { source: "/10-call-records", destination: "/run-workflows/call-records", permanent: false },
      { source: "/11-trunk-configuration", destination: "/deploy/trunk-configuration", permanent: false },
      { source: "/12-phone", destination: "/run-workflows/phone", permanent: false },
      { source: "/13-troubleshooting", destination: "/troubleshoot/troubleshooting", permanent: false },
      { source: "/14-faq", destination: "/troubleshoot/faq", permanent: false },
      { source: "/23-pre-provisioned-dashboards", destination: "/observe/pre-provisioned-dashboards", permanent: false },
      { source: "/24-agent-configuration", destination: "/build/agent-configuration", permanent: false },
      { source: "/25-functions-and-api-calls", destination: "/build/functions-and-api-calls", permanent: false },
      { source: "/26-dynamic-parameters", destination: "/build/dynamic-parameters", permanent: false },
      {
        source: "/27-building-custom-api-actions",
        destination: "/build/building-custom-api-actions",
        permanent: false
      },
      { source: "/28-telephony-architecture", destination: "/deploy/telephony-architecture", permanent: false },
      { source: "/29-dialer-pacing-and-limits", destination: "/run-workflows/dialer-pacing-and-limits", permanent: false },
      { source: "/30-call-history-and-review", destination: "/run-workflows/call-history-and-review", permanent: false },
      { source: "/api-reference", destination: "/reference/api-reference", permanent: false },
      { source: "/changelog", destination: "/reference/changelog", permanent: false },
      { source: "/deploy/on-premise-deployment", destination: "/deploy/self-hosted", permanent: false },
      { source: "/deploy/cloud-deployment", destination: "/deploy/dedicated", permanent: false },
      { source: "/trunk", destination: "/deploy/trunk-configuration", permanent: false },
      { source: "/trunk/:path*", destination: "/deploy/trunk-configuration", permanent: false },
      { source: "/agent-settings", destination: "/build/agent-configuration", permanent: false },
      { source: "/agent-settings/:path*", destination: "/build/agent-configuration", permanent: false },
      { source: "/build/core-concepts", destination: "/get-started/platform-overview", permanent: false },
      { source: "/build/inbound-workflows", destination: "/run-workflows/ai-inbound-routing", permanent: false },
      { source: "/build/outbound-workflows", destination: "/run-workflows/ai-dialer-flows", permanent: false },
      {
        source: "/build/workflow-design",
        destination: "/build/create-your-first-ai-voice-agent",
        permanent: false
      },
      { source: "/build/routing-and-handoff", destination: "/run-workflows/ai-inbound-routing", permanent: false },
      { source: "/build/provider-flexibility", destination: "/deploy/telephony-architecture", permanent: false },
      {
        source: "/build/platform-agnostic-architecture",
        destination: "/get-started/platform-overview",
        permanent: false
      },
      { source: "/integrate", destination: "/get-started/platform-overview", permanent: false },
      { source: "/integrate/telephony-sip-pbx", destination: "/deploy/telephony-architecture", permanent: false },
      { source: "/integrate/speech-providers", destination: "/get-started/platform-overview", permanent: false },
      { source: "/integrate/voice-tts-providers", destination: "/get-started/platform-overview", permanent: false },
      { source: "/integrate/llm-model-providers", destination: "/get-started/platform-overview", permanent: false },
      { source: "/integrate/crm-and-internal-systems", destination: "/build/functions-and-api-calls", permanent: false },
      { source: "/integrate/webhooks-apis", destination: "/reference/api-reference", permanent: false },
      { source: "/deploy/telephony-and-system-fit", destination: "/deploy/telephony-architecture", permanent: false },
      { source: "/operate/monitoring-and-visibility", destination: "/observe/monitoring-and-visibility", permanent: false },
      { source: "/operate/campaign-analytics", destination: "/observe/campaign-analytics", permanent: false },
      { source: "/operate/endpoint-and-trunk-monitoring", destination: "/observe/endpoint-and-trunk-monitoring", permanent: false },
      { source: "/operate/pre-provisioned-dashboards", destination: "/observe/pre-provisioned-dashboards", permanent: false },
      { source: "/operate/logs-overview", destination: "/observe/logs-overview", permanent: false },
      { source: "/operate/traces-overview", destination: "/observe/traces-overview", permanent: false },
      { source: "/operate/logs-and-troubleshooting", destination: "/observe/logs-drilldown", permanent: false },
      { source: "/operate/performance-review", destination: "/observe/campaign-analytics", permanent: false },
      { source: "/operate/workflow-optimization", destination: "/troubleshoot/troubleshooting", permanent: false },
      { source: "/operate/investigating-workflow-issues", destination: "/troubleshoot/investigating-workflow-issues", permanent: false },
      { source: "/operate/infrastructure-monitoring", destination: "/observe/infrastructure-monitoring", permanent: false },
      { source: "/operate/asterisk-monitoring", destination: "/observe/asterisk-monitoring", permanent: false },
      { source: "/operate/container-monitoring", destination: "/observe/container-monitoring", permanent: false },
      { source: "/operate/database-monitoring", destination: "/observe/database-monitoring", permanent: false },
      { source: "/operate/real-time-performance-metrics", destination: "/observe/real-time-performance-metrics", permanent: false },
      { source: "/operate/time-range-reporting", destination: "/observe/time-range-reporting", permanent: false },
      { source: "/learn/best-practices", destination: "/troubleshoot/faq", permanent: false },
      { source: "/learn/common-patterns", destination: "/troubleshoot/faq", permanent: false },
      { source: "/learn/example-use-cases", destination: "/troubleshoot/faq", permanent: false },
      { source: "/learn/faqs", destination: "/troubleshoot/faq", permanent: false },
      { source: "/legal-trust/privacy-and-data-handling", destination: "/reference/api-reference", permanent: false },
      { source: "/legal-trust/security-and-trust", destination: "/reference/api-reference", permanent: false }
    ];
  },
  images: {
    qualities: [50, 75, 90, 95]
  }
});
