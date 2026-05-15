import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const legalMeta = {
  index: label("legalOverview"),
  "terms-and-commercial-model": label("termsAndCommercialModel"),
  "privacy-and-data-protection": label("privacyAndDataProtection"),
  "ai-transparency": label("aiTransparency"),
  "security-and-trust": label("securityAndTrust"),
  imprint: label("imprint")
};

export default legalMeta;
