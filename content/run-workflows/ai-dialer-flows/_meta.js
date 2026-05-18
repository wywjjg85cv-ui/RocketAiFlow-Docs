import { createElement } from "react";
import { LocalizedNavLabel } from "../../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const aiDialerFlowsMeta = {
  index: label("aiDialerFlowsOverview"),
  "import-contacts": label("importContacts"),
  "call-records": label("callRecords")
};

export default aiDialerFlowsMeta;
