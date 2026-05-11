import { test as setup } from '@playwright/test';
import { AppCatalogPage, config } from '@crowdstrike/foundry-playwright';

setup('install app', async ({ page }) => {
  const catalog = new AppCatalogPage(page);
  await catalog.installApp(config.appName, {
    configureSettings: async (page) => {
      await page.getByLabel('Name').first().fill('ServiceNow Integration');
      await page.getByLabel('Instance').fill('dev12345');
      await page.getByLabel('Username').fill('test_user');
      await page.getByLabel('Password').fill('test_password');
    },
  });
});
