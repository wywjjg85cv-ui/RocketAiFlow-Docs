import { createElement } from "react";
import { LocalizedNavLabel } from "../../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const telephonyMeta = {
  index: label("telephonyOverview"),
  "asterisk-based-pbx-systems": label("asteriskBasedPbxSystems")
};

export default telephonyMeta;
