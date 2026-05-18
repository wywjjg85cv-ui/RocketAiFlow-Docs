import { createElement } from "react";
import { LocalizedNavLabel } from "../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const pageMeta = {
  "get-started": label("getStarted"),
  build: label("build"),
  "run-workflows": label("runWorkflows"),
  integrations: label("integrations"),
  deploy: label("deploy"),
  monitoring: label("monitoring"),
  troubleshoot: label("troubleshoot"),
  legal: label("legal"),
  reference: label("reference")
};

export default pageMeta;
