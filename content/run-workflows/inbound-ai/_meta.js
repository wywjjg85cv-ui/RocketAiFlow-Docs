import { createElement } from "react";
import { LocalizedNavLabel } from "../../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const inboundAiMeta = {
  "contact-inbounds": label("contactInbounds"),
  "ai-inbound-routing": label("aiInboundRouting")
};

export default inboundAiMeta;
