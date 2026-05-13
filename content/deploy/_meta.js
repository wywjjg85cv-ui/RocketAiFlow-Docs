import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const deployMeta = {
  "deployment-overview": label("pilotSetupOverview"),
  "telephony-architecture": label("telephonyArchitecture"),
  "trunk-configuration": label("trunkConfiguration"),
  "dedicated": label("guidedPilotSetup"),
  "self-hosted": label("customerEnvironment")
};

export default deployMeta;
