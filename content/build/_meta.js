import { createElement } from "react";
import { LocalizedNavLabel } from "../../src/components/i18n/LocalizedNavLabels";

const label = (labelKey) => createElement(LocalizedNavLabel, { labelKey });

const buildMeta = {
  "create-your-first-ai-voice-agent": label("createFirstAgent"),
  "configure-agent-prompt": label("configureAgentPrompt"),
  "add-functions": label("configureAgentFunctions"),
  "dynamic-parameters": label("dynamicParameters")
};

export default buildMeta;
