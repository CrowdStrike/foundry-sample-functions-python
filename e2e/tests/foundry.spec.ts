import { test, expect } from '../src/fixtures';

test.describe.configure({ mode: 'serial' });

test.describe('Functions with Python - E2E Tests', () => {
  test('should render Hello UI extension', async ({ detectionExtensionPage }) => {
    const frame = await detectionExtensionPage.openExtension('hello');
    await expect(frame.getByText(/Foundry Functions Demo/i)).toBeVisible({ timeout: 10000 });
    await expect(frame.getByText(/Hello.*@/i).first()).toBeVisible();
  });

  test('should execute Test hello function workflow', async ({ workflowsPage }) => {
    test.setTimeout(180000);
    await workflowsPage.executeAndVerifyWorkflow('Test hello function');
  });

  test('should execute Test log-event function workflow', async ({ workflowsPage }) => {
    test.setTimeout(180000);
    await workflowsPage.executeAndVerifyWorkflow('Test log-event function');
  });

  test('should execute Test host-details function workflow', async ({ workflowsPage, hostManagementPage }) => {
    test.setTimeout(180000);
    const hostId = await hostManagementPage.getFirstHostId();

    if (!hostId) {
      test.skip(true, 'Skipping: No hosts available in CID');
      return;
    }

    await workflowsPage.executeAndVerifyWorkflow('Test host-details function', {
      inputs: { 'Host ID': hostId },
    });
  });

  test('should render Test servicenow function workflow (without execution)', async ({ workflowsPage }) => {
    await workflowsPage.navigateToWorkflows();
    await workflowsPage.verifyWorkflowRenders('Test servicenow function');
  });
});
