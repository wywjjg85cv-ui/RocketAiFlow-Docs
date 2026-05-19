import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const runWorkflowsMeta = {
  "ai-dialer-flows": label("aiDialerFlows"),
  "inbound-ai": label("inboundAi"),
  "import-contacts": label("importContacts"),
  "processed-contacts": label("processedContacts"),
  "call-records": label("callRecords"),
  phone: label("phone")
};

export default runWorkflowsMeta;
