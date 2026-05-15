import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });
const hidden = (labelKey) => ({
  title: label(labelKey),
  display: "hidden"
});

const observeMeta = {
  "monitoring-and-visibility": label("monitoringAndVisibility"),
  "pre-provisioned-dashboards": label("preProvisionedDashboards"),
  "dialer-dashboard-panels": label("dialerDashboardPanels"),
  "logs-and-traces": label("logsAndTraces"),
  "campaign-analytics": hidden("campaignAnalytics"),
  "endpoint-and-trunk-monitoring": hidden("endpointAndTrunkMonitoring"),
  "logs-drilldown": hidden("logsDrilldown"),
  "trace-correlation": hidden("traceCorrelation"),
  "infrastructure-monitoring": hidden("infrastructureMonitoring"),
  "asterisk-monitoring": hidden("asteriskMonitoring"),
  "container-monitoring": hidden("containerMonitoring"),
  "database-monitoring": hidden("databaseMonitoring"),
  "real-time-performance-metrics": hidden("realTimePerformanceMetrics"),
  "time-range-reporting": hidden("timeRangeReporting")
};

export default observeMeta;
