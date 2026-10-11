const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const target = (path: string) => `${basePath}${path}`;
import { test, expect } from "@playwright/test";
const locales = ["en", "sk", "ru", "uk"];
const paths = [
  "",
  "about",
  "projects",
  "experience",
  "education",
  "now",
  "contact",
  "cv",
  "projects/automata-simulator",
  "projects/trinitypeer",
  "projects/switch",
  "projects/router",
];
for (const locale of locales) {
  test(`${locale}: every page, language and SEO`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400 && !response.url().endsWith("favicon.ico"))
        errors.push(`${response.status()} ${response.url()}`);
    });
    for (const path of paths) {
      const response = await page.goto(target(`/${locale}/${path}`));
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        new RegExp(`/${locale}${path ? "/" + path : ""}/$`),
      );
      await expect(page.locator("link[hreflang]")).toHaveCount(5);
      expect(
        await page.locator('meta[name="description"]').getAttribute("content"),
      ).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
test("browser and saved locale redirects; switching preserves project route", async ({
  browser,
}) => {
  const context = await browser.newContext({
    locale: "sk-SK",
    baseURL: "http://127.0.0.1:3000",
  });
  const page = await context.newPage();
  await page.goto(target("/"));
  await expect(page).toHaveURL(/\/sk\/$/);
  await page.goto(target("/sk/projects/trinitypeer"));
  await page.getByRole("combobox", { name: "Jazyk" }).selectOption("uk");
  await expect(page).toHaveURL(/\/uk\/projects\/trinitypeer\/$/);
  await page.goto(target("/"));
  await expect(page).toHaveURL(/\/uk\/$/);
  await page.goto(target("/en"));
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("themes persist without flash and system follows OS", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto(target("/en"));
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  for (const theme of ["light", "dark", "contrast"]) {
    await page
      .getByRole("combobox", { name: "Appearance" })
      .selectOption(theme);
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  }
  await page
    .getByRole("combobox", { name: "Appearance" })
    .selectOption("system");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("responsive layouts have no overflow on every page and locale", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of locales) {
      for (const path of [
        "",
        "projects",
        "experience",
        "about",
        "contact",
        "projects/automata-simulator",
      ]) {
        await page.goto(target(`/${locale}/${path}`));
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${width}: ${locale}/${path}`,
        ).toBe(true);
      }
    }
  }
});
test("keyboard skip link, mobile menu, reduced motion and original CV", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(target("/en"));
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.locator(".mobile-nav summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".mobile-nav")).toHaveAttribute("open", "");
  await page
    .locator(".mobile-nav")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/projects\/$/);
  expect(
    await page
      .locator(".page-transition")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page.goto(target("/en/cv"));
  await expect(page.getByRole("link", { name: "Download CV" })).toHaveAttribute(
    "href",
    `${basePath}/cv.pdf`,
  );
  const pdf = await page.request.get(target("/cv.pdf"));
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(
    page.getByRole("button", { name: "Print / save as PDF" }),
  ).toBeVisible();
});
test("unknown routes return 404; sitemap contains all 48 routes", async ({
  request,
}) => {
  for (const path of ["/en/no-such-page", "/en/projects/missing", "/de/about"])
    expect((await request.get(target(path))).status()).toBe(404);
  const sitemap = await request.get(target("/sitemap.xml"));
  expect(sitemap.status()).toBe(200);
  expect((await sitemap.text()).match(/<url>/g)?.length).toBe(48);
  expect((await request.get(target("/robots.txt"))).status()).toBe(200);
});

test("WCAG AA automated checks in all themes and representative layouts", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/en",
      "/uk/projects",
      "/sk/experience",
      "/ru/contact",
    ]) {
      await page.goto(target(path));
      for (const theme of ["light", "dark", "contrast"]) {
        await page.locator(".preferences select").last().selectOption(theme);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(results.violations, `${width} ${path} ${theme}`).toEqual([]);
      }
    }
  }
});
