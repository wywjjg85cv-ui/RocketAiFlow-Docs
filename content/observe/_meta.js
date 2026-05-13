import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const observeMeta = {
  "monitoring-and-visibility": label("monitoringAndVisibility"),
  "campaign-analytics": label("campaignAnalytics"),
  "endpoint-and-trunk-monitoring": label("endpointAndTrunkMonitoring"),
  "pre-provisioned-dashboards": label("preProvisionedDashboards"),
  "logs-overview": label("logsOverview"),
  "traces-overview": label("tracesOverview"),
  "logs-drilldown": label("logsDrilldown"),
  "trace-correlation": label("traceCorrelation"),
  "infrastructure-monitoring": {
    title: label("infrastructureMonitoring"),
    display: "hidden"
  },
  "asterisk-monitoring": {
    title: label("asteriskMonitoring"),
    display: "hidden"
  },
  "container-monitoring": {
    title: label("containerMonitoring"),
    display: "hidden"
  },
  "database-monitoring": {
    title: label("databaseMonitoring"),
    display: "hidden"
  },
  "real-time-performance-metrics": {
    title: label("realTimePerformanceMetrics"),
    display: "hidden"
  },
  "time-range-reporting": {
    title: label("timeRangeReporting"),
    display: "hidden"
  }
};

export default observeMeta;
