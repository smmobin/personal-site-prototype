import { expect, test, type Page } from "@playwright/test";

const APP_BASE = "/personal-site-prototype";

async function open(page: Page, path = "/"): Promise<void> {
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.route("https://fonts.gstatic.com/**", (route) => route.abort());
  await page.addInitScript(() => {
    try {
      localStorage.removeItem("persona-lang");
    } catch {
      /* ignore */
    }
  });
  const target = path.startsWith("#")
    ? `${APP_BASE}/${path}`
    : `${APP_BASE}${path === "/" ? "/" : path}`;
  await page.goto(target, { waitUntil: "domcontentloaded" });
}

test("loads the landing page with primary sections", async ({ page }) => {
  await open(page);
  await expect(page).toHaveTitle(/Mobin Arya/);
  await expect(page.locator(".skip-link")).toHaveAttribute("href", "#main");
  for (const id of ["about", "work", "experience", "skills", "writing", "contact"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("switches the document to Persian RTL", async ({ page }) => {
  await open(page);
  await page.locator("header [data-lang='fa']").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText("موبین آریا");
});

test("filters work to the AI lane", async ({ page }) => {
  await open(page, "/#work");
  await page.locator("[data-filter='ai']").click();
  const cards = page.locator("[data-work-id]");
  await expect(cards).toHaveCount(2);
  await expect(page.locator("[data-work-id='nava']")).toBeVisible();
  await expect(page.locator("[data-work-id='paper']")).toBeVisible();
  await expect(page.locator("[data-work-id='shade']")).toHaveCount(0);
});

test("rejects an empty contact form and accepts a valid one", async ({ page }) => {
  await open(page, "/#contact");
  await page.locator("[data-submit]").click();
  await expect(page.locator('[data-error="name"]')).not.toBeEmpty();
  await expect(page.locator('[data-error="email"]')).not.toBeEmpty();

  await page.locator('[name="name"]').fill("Mobin Arya");
  await page.locator('[name="email"]').fill("hello@example.com");
  await page.locator('[name="subject"]').selectOption("collab");
  await page
    .locator('[name="message"]')
    .fill("This prototype should accept a message that is long enough.");
  await page.locator('[name="consent"]').check();
  await page.locator("[data-submit]").click();

  await expect(page.locator("[data-form-success]")).toHaveClass(/is-visible/, {
    timeout: 3000,
  });
  await expect(page.locator("[data-form-success]")).not.toBeEmpty();
});
