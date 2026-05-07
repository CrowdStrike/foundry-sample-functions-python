import { test as baseTest } from '@playwright/test';
import {
  DetectionExtensionPage,
  WorkflowsPage,
  HostManagementPage,
} from '@crowdstrike/foundry-playwright';

type FoundryFixtures = {
  detectionExtensionPage: DetectionExtensionPage;
  workflowsPage: WorkflowsPage;
  hostManagementPage: HostManagementPage;
};

export const test = baseTest.extend<FoundryFixtures>({
  detectionExtensionPage: async ({ page }, use) => {
    await use(new DetectionExtensionPage(page));
  },

  workflowsPage: async ({ page }, use) => {
    await use(new WorkflowsPage(page));
  },

  hostManagementPage: async ({ page }, use) => {
    await use(new HostManagementPage(page));
  },
});

export { expect } from '@playwright/test';
