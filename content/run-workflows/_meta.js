import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const runWorkflowsMeta = {
  "ai-dialer-flows": label("aiDialerFlows"),
  "ai-inbound-routing": label("aiInboundRouting"),
  "contact-inbounds": label("contactInbounds"),
  "call-history-and-review": label("callHistoryAndReview"),
  phone: label("phone")
};

export default runWorkflowsMeta;
