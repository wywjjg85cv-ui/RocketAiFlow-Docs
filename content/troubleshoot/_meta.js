import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const troubleshootMeta = {
  troubleshooting: label("troubleshootingPage"),
  faq: label("faq")
};

export default troubleshootMeta;
