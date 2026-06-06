import { chromium } from "playwright-core";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 1400 },
  deviceScaleFactor: 1,
});

await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "screenshots/codex-studio-artifact-pilot-desktop.png",
  fullPage: true,
});
await page.getByRole("button", { name: /Gaussian Splat Studies/ }).click();
await page.getByRole("dialog").waitFor();
await page.screenshot({
  path: "screenshots/codex-studio-artifact-pilot-lightbox.png",
  fullPage: false,
});
await page.getByLabel("Next example").click();
await page.getByRole("dialog").getByRole("heading", { name: "WHHA WebAR" }).waitFor();
await page.keyboard.press("ArrowLeft");
await page.getByRole("dialog").getByRole("heading", { name: "Gaussian Splat Studies" }).waitFor();
await page.keyboard.press("Escape");
await page.getByRole("dialog").waitFor({ state: "detached" });

await page.setViewportSize({ width: 390, height: 1200 });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "screenshots/codex-studio-artifact-pilot-mobile.png",
  fullPage: true,
});

await page.getByLabel("Name").fill("Jacob Test");
await page.getByLabel("Email").fill("hello@example.com");
await page.getByLabel("Object description").fill("A small historical artifact for pilot testing.");
await page.getByLabel("Why is it meaningful?").fill("It has local historical significance.");
await page.getByLabel("Location").fill("Richmond, VA");
await page.getByLabel("Asset availability").selectOption({ index: 1 });
await page.getByLabel("Public case study permission").selectOption({ index: 1 });
await page.getByLabel("Timeline").selectOption({ index: 1 });
await page.getByRole("button", { name: "Submit artifact" }).click();
await page.getByText("Submission captured locally").waitFor();

await browser.close();
console.log("screenshots and form check done");
