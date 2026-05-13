import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const referenceMeta = {
  "api-reference": label("apiReference"),
  changelog: label("changelog")
};

export default referenceMeta;
