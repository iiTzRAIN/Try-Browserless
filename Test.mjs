import { chromium } from "playwright-core";

// Access the token from the environment variables
const TOKEN = process.env.BROWSERLESS_TOKEN;

if (!TOKEN) {
  throw new Error("BROWSERLESS_TOKEN is missing. Make sure to set it in your GitHub Secrets and workflow file.");
}

async function takeScreenshot() {
  // Connect to Browserless using CDP
  const browser = await chromium.connectOverCDP(
    `wss://production-sfo.browserless.io?token=${TOKEN}`
  );

  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the target website
  await page.goto("https://www.example.com/");

  // Take a screenshot and save it locally
  await page.screenshot({ path: "screenshot.png" });
  console.log("Screenshot saved as screenshot.png");

  // Clean up resources
  await browser.close();
}

takeScreenshot().catch(console.error);
