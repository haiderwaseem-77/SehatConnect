#!/usr/bin/env node
/**
 * phone-preview harness — render a page through real Chromium at Android phone
 * sizes, with web fonts painted, so the screenshots reflect what a real
 * Android Chrome user sees. Self-discovers the cached Playwright + Chromium.
 *
 * Usage:
 *   node shoot.mjs [target] [outDir]
 *     target  file path | file://… | http://localhost:3000/…   (default: the direction-6 mockup)
 *     outDir  where PNGs are written                            (default: ./.phone-preview-shots)
 *
 * Overrides (if auto-discovery ever fails): PW_MODULE=/abs/playwright/index.js  PW_CHROME=/abs/chrome
 */
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

// ---- discover the cached Playwright module ----
function findPlaywright() {
  if (process.env.PW_MODULE && existsSync(process.env.PW_MODULE)) return process.env.PW_MODULE;
  const npx = `${process.env.HOME}/.npm/_npx`;
  if (existsSync(npx)) {
    for (const h of readdirSync(npx)) {
      const p = `${npx}/${h}/node_modules/playwright/index.js`;
      if (existsSync(p)) return p;
    }
  }
  throw new Error('playwright not found in npx cache — set PW_MODULE=/abs/path/to/playwright/index.js');
}

// ---- discover the newest cached Chromium (not headless_shell) ----
function findChrome() {
  if (process.env.PW_CHROME && existsSync(process.env.PW_CHROME)) return process.env.PW_CHROME;
  const base = `${process.env.HOME}/.cache/ms-playwright`;
  const revs = readdirSync(base)
    .filter((d) => /^chromium-\d+$/.test(d))
    .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
  for (const r of revs) {
    const p = `${base}/${r}/chrome-linux64/chrome`;
    if (existsSync(p)) return p;
  }
  throw new Error('cached Chromium not found — set PW_CHROME=/abs/path/to/chrome');
}

const DEFAULT_TARGET = '/home/shwid/sehatghar-pk/design-explorations-v2/direction-6-combined.html';
let target = process.argv[2] || DEFAULT_TARGET;
const outDir = resolve(process.argv[3] || './.phone-preview-shots');
mkdirSync(outDir, { recursive: true });

const url = /^https?:|^file:/.test(target)
  ? target
  : pathToFileURL(isAbsolute(target) ? target : resolve(target)).href;

const pw = (await import(pathToFileURL(findPlaywright()).href)).default;
const browser = await pw.chromium.launch({ executablePath: findChrome() });

const ANDROID_UA =
  'Mozilla/5.0 (Linux; Android 13; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36';

// Conservative fold height: real mobile Chrome shows an address bar on load, so
// the initially-visible area is SHORTER than the device's full height. 720 ~= a
// ~844px device with the toolbar showing — tests the tightest real "above the fold".
const FOLD_H = 720;

async function shoot(name, { width, mobile, fold }) {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width, height: FOLD_H }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: ANDROID_UA }
      : { viewport: { width, height: 900 }, deviceScaleFactor: 2 }
  );
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => (document.fonts ? document.fonts.ready : null)); // paint web fonts first
  await page.waitForTimeout(400);
  if (fold) await page.screenshot({ path: `${outDir}/${name}-fold.png` }); // viewport-only = conservative fold
  await page.screenshot({ path: `${outDir}/${name}-full.png`, fullPage: true });
  await ctx.close();
  console.log(`  ${name.padEnd(10)} -> ${name}-${fold ? 'fold + ' : ''}full.png`);
}

console.log(`phone-preview: ${url}\n  -> ${outDir}`);
await shoot('m393', { width: 393, mobile: true, fold: true }); // typical mid-range Android
await shoot('m360', { width: 360, mobile: true, fold: true }); // narrow budget Android (tightest common case)
await shoot('desktop', { width: 1280, mobile: false });
await browser.close();
console.log('done. Read the PNGs above to inspect visually.');
