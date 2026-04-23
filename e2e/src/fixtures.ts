import { test as baseTest } from '@playwright/test';
import {
  FoundryHomePage,
  AppManagerPage,
  AppCatalogPage,
  DetectionExtensionPage,
  WorkflowsPage,
  HostManagementPage,
  config,
} from '@crowdstrike/foundry-playwright';

type FoundryFixtures = {
  foundryHomePage: FoundryHomePage;
  appManagerPage: AppManagerPage;
  appCatalogPage: AppCatalogPage;
  detectionExtensionPage: DetectionExtensionPage;
  workflowsPage: WorkflowsPage;
  hostManagementPage: HostManagementPage;
  appName: string;
};

export const test = baseTest.extend<FoundryFixtures>({
  foundryHomePage: async ({ page }, use) => {
    await use(new FoundryHomePage(page));
  },

  appManagerPage: async ({ page }, use) => {
    await use(new AppManagerPage(page));
  },

  appCatalogPage: async ({ page }, use) => {
    await use(new AppCatalogPage(page));
  },

  detectionExtensionPage: async ({ page }, use) => {
    await use(new DetectionExtensionPage(page));
  },

  workflowsPage: async ({ page }, use) => {
    await use(new WorkflowsPage(page));
  },

  hostManagementPage: async ({ page }, use) => {
    await use(new HostManagementPage(page));
  },

  appName: async ({}, use) => {
    await use(config.appName);
  },
});

export { expect } from '@playwright/test';
