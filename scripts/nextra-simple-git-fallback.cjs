"use strict";

const fs = require("node:fs");
const path = require("node:path");

let warned = false;

function hasGitRepository(startDir) {
  let currentDir = path.resolve(startDir);

  while (true) {
    if (fs.existsSync(path.join(currentDir, ".git"))) {
      return true;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return false;
    }

    currentDir = parentDir;
  }
}

function hasPlatformBindingFailure(error) {
  if (!error) {
    return false;
  }

  const message =
    typeof error.message === "string"
      ? error.message
      : typeof error === "string"
        ? error
        : "";

  if (
    message.includes("Cannot find native binding") ||
    message.includes("@napi-rs/simple-git-") ||
    message.includes("simple-git.darwin-") ||
    message.includes("simple-git.linux-") ||
    message.includes("simple-git.win32-")
  ) {
    return true;
  }

  return hasPlatformBindingFailure(error.cause);
}

if (!hasGitRepository(process.cwd())) {
  process.versions.webcontainer ||= "nextra-no-git-repo";
} else {
  try {
    require("@napi-rs/simple-git");
  } catch (error) {
    if (!hasPlatformBindingFailure(error)) {
      throw error;
    }

    process.versions.webcontainer ||= "nextra-simple-git-fallback";

    if (!warned) {
      warned = true;
      process.emitWarning(
        "Disabling Nextra git metadata because @napi-rs/simple-git is installed for a different platform. Reinstall dependencies for this runtime to restore last-updated timestamps.",
        { code: "NEXTRA_SIMPLE_GIT_FALLBACK" }
      );
    }
  }
}
