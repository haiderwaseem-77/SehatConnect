#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const ROUTES = [
  ["home", "/"],
  ["services", "/services"],
  ["qualified-nurse", "/services/qualified-nurse"],
  ["attendant", "/services/attendant"],
  ["cities", "/cities"],
  ["lahore", "/cities/lahore"],
  ["about", "/about"],
  ["book", "/book"],
];

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hasOption(args, option) {
  return args.includes(option);
}

function usage() {
  console.log(`Capture the standard live Lucaintel mobile screenshot pass.

Usage:
  npm run screenshots:live
  npm run screenshots:live -- --out screenshots/lucaintel-YYYY-MM-DD-mobile

Defaults:
  target: https://lucaintel.com
  output: screenshots/lucaintel-<today>-mobile
  routes: ${ROUTES.map(([name]) => name).join(", ")}

Additional arguments are passed through to the $mobile-app-screenshots script.
`);
}

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  usage();
  process.exit(0);
}

const codexHome = process.env.CODEX_HOME || path.join(os.homedir(), ".codex");
const skillScript =
  process.env.MOBILE_SCREENSHOT_SKILL_SCRIPT ||
  path.join(codexHome, "skills", "mobile-app-screenshots", "scripts", "capture-mobile-screenshots.js");

if (!fs.existsSync(skillScript)) {
  console.error(`Missing mobile screenshot skill script: ${skillScript}`);
  console.error("Create or install the $mobile-app-screenshots skill, or set MOBILE_SCREENSHOT_SKILL_SCRIPT.");
  process.exit(1);
}

const delegatedArgs = [];

if (!hasOption(args, "--base-url") && !hasOption(args, "--lucaintel")) {
  delegatedArgs.push("--lucaintel");
}

if (!hasOption(args, "--out")) {
  delegatedArgs.push("--out", path.join("screenshots", `lucaintel-${today()}-mobile`));
}

if (!hasOption(args, "--route")) {
  for (const [name, route] of ROUTES) {
    delegatedArgs.push("--route", `${name}=${route}`);
  }
}

delegatedArgs.push(...args);

const result = spawnSync(process.execPath, [skillScript, ...delegatedArgs], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
