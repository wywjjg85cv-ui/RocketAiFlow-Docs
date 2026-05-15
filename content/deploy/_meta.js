import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const deployMeta = {
  "deployment-overview": label("pilotSetupOverview")
};

export default deployMeta;
