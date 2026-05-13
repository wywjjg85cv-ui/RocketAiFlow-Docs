import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const integrationsMeta = {
  index: label("integrations"),
  telephony: label("telephony")
};

export default integrationsMeta;
