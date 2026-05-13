import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const runWorkflowsMeta = {
  "ai-inbound-routing": label("aiInboundRouting"),
  "ai-dialer-flows": label("aiDialerFlows"),
  "dialer-pacing-and-limits": label("dialerPacingAndLimits"),
  "import-contacts": label("importContacts"),
  "contact-inbounds": label("contactInbounds"),
  "call-records": label("callRecords"),
  "call-history-and-review": label("callHistoryAndReview"),
  phone: label("phone")
};

export default runWorkflowsMeta;
